import { Component } from 'react';
import BackendApi from '../Api/BackendApi';
import { Link , withRouter} from 'react-router-dom';
import {apiLink} from '../Api/global'


class JobApplications extends Component{
    constructor(props){
        super(props);
        this.state = {applications: {}};
    }
    componentDidMount(){
        let job_id = this.props.match.params.id
        let backendApi = new BackendApi(true);
        backendApi.get('admin/job/'+job_id+'/applications')
        .then(res => {
            if(res.status === 200){
                return res.json()
                .then(ResJson => this.setState({applications: ResJson.data}))
            }
            this.setState({job_id})

        })
        .catch((e => console.log(e)));
        
        
    }
    render() {
        const applications = this.state.applications
        
        if(applications.length > 0){
            const jobItems = applications.map((application, i) =>    
            <tr key={i} className="jumbotron">
            <td>{application.name}</td>
            <td>{application.university}</td>
            <td>{application.email}</td>
            <td>{application.dob}</td>
            <td>{application.notes}</td>
        <td>{(application.cv)? <a target="parent" href={apiLink + application.cv}>view cv</a>:null}</td>
            <td>{application.created_at}</td>
            </tr>
            );
        return (
            <div>
                <Link className="btn btn-danger" to="/admin/logout">Logout</Link>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>name</th>
                    <th>university</th>
                    <th>email</th>
                    <th>dob</th>
                    <th>notes</th>
                    <th>cv</th>
                    <th>date of apply</th>

                </tr>
                </thead>
                <tbody>
                {jobItems}
                </tbody>
            </table>
            </div>
        )
        }
        
        else
        return (
                <div className="alert alert-info" role="alert">no applications avaiable now...</div>
        )
    }
}
export default withRouter(JobApplications)