import { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from '../Auth/Auth';
import AdminListJobs from './AdminListJobs';
import CreateUpdateJob from './CreateUpdateJob';
import JobApplications from './JobApplications';
import DeleteJob from './DeleteJob';

import Login from './Login';
import Logout from './Logout';

 class AdminRoutes extends Component{
      
constructor(props){
    super(props);
    this.state = {
        login: false,
    }

}





componentDidMount(){
    this.setState({
        login: Auth.valid()
    });
    
}




render() {
    if(!Auth.valid())
    return (
        <div>
            <Route path="/admin/login" >
                <Login />
            </Route>
            <Route path="/admin/" >
                <Redirect to="/admin/login" />
            </Route>
        </div>
    )
        
    else{
        return (
                
            <div>
        <Route path="/admin"  exact={true}>
            <AdminListJobs />
        </Route>
        <Route path="/admin/create-job" >
            <CreateUpdateJob action="create" />
        </Route>
        <Route path="/admin/update-job/:id" >
            <CreateUpdateJob action="update" />
        </Route>
        <Route path="/admin/jobs/:id/applications">
          <JobApplications />
        </Route>
        <Route path="/admin/jobs/:id/delete">
          <DeleteJob />
        </Route>
        <Route path="/admin/login" >
            <Redirect to="/admin" />
        </Route>
        <Route path="/admin/logout" >
            <Logout />
        </Route>
        </div>
    )
    }    
}
}
export default AdminRoutes;