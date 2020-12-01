import { Component } from 'react';
import BackendApi from '../Api/BackendApi';
import { Redirect, withRouter } from 'react-router-dom';

 class DeleteJob extends Component{
      
constructor(props){
    super(props);
    this.state = {
        deleted: false,
    }
 
}

componentDidMount(){
    let backendApi = new BackendApi(true);
    backendApi.post('admin/jobs/' + this.props.match.params.id, {"_method": "DELETE"})
        .then(res => {
            if(res.status === 200){
                this.setState({deleted: true})
            }
        })
    
}



render() {
if(this.state.deleted){
    return <Redirect to="/admin" />
}
    return null
}
}
export default withRouter(DeleteJob);