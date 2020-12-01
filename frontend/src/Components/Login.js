import { Component } from 'react';
import BackendApi from '../Api/BackendApi';
import { Redirect } from 'react-router-dom';
import Auth from '../Auth/Auth';

 class Login extends Component{
      
constructor(props){
    super(props);
    this.state = {
        is_submit: false,
        login: false,
    }
    this.values = {
        password: null,
        email: null
    }
    this.apply = this.apply.bind(this); 
    this.saveData = this.saveData.bind(this); 
    this.completeLogin = this.completeLogin.bind(this); 
}
apply(event){
    this.setState({is_submit: true});
    for (var k in this.values) {
        
        this.values[k] = event.target[k].value
    }

    this.saveData();
    event.preventDefault();
   
    
} 
saveData(){
    let backendApi = new BackendApi();
    backendApi.post('admin/login', this.values)
        .then(res => {
            if(res.status === 200){
                return res.json()
                .then(ResJson => this.completeLogin(ResJson))
            }
            this.setState({is_submit: false})
        })
        
}   
completeLogin(loginToken){
    Auth.setAuth(loginToken.access_token);
    this.setState({
        login: true
    })
}




componentDidMount(){
    this.setState({
        login: Auth.valid()
    });
    
}



render() {
if(this.state.login){
    return <Redirect to="/admin/login" />
}
    return (
        <div>
        <div className="page-header">
            <h1>admin login</h1>
        </div>
        <div className="panel panel-default">
            <div className="panel-body">
            <form onSubmit={this.apply}>
            
            <div className="form-group">
                <label htmlFor="Email">Email address</label>
                <input defaultValue="" name="email" type="email" className="form-control" id="Email" placeholder="Email" />
            </div>
            <div className="form-group">
                <label htmlFor="password">password</label>
                <input  autoComplete="off" defaultValue="" name="password" type="password" className="form-control" id="password" placeholder="password" />
            </div>
            

            <input type="submit" disabled={this.state.is_submit} className="btn btn-primary" value="Submit" />
        </form>
            </div>
        </div>
        </div>
    )
}
}
export default Login;