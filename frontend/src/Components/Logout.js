import { Component } from 'react';
import BackendApi from '../Api/BackendApi';
import { Redirect } from 'react-router-dom';
import Auth from '../Auth/Auth';

 class Logout extends Component{
      
constructor(props){
    super(props);
    this.state = {
        login: true,
    }
 
}
  
componentDidMount(){
    let backendApi = new BackendApi(true);
    backendApi.post('admin/logout')
        .then(res => {
            if(res.status === 200){
                Auth.unsetAuth();
                this.setState({login: false})
            }
        })
    
}



render() {
if(!this.state.login){
    return <Redirect to="/" />
}
    return null
}
}
export default Logout;