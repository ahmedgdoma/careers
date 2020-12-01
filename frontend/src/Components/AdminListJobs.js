import { Component } from 'react';
import BackendApi from '../Api/BackendApi';
import { Link } from 'react-router-dom';


export default class AdminListJobs extends Component{
    constructor(props){
        super(props);
        this.state = {jobs: {}};
    }
    componentDidMount(){
        let backendApi = new BackendApi(true);
        backendApi.get('admin/jobs')
        .then(res => res.json())
        .then((jsonRes) => this.setState({jobs: jsonRes.data}))
        .catch((e => console.log(e)));
        
    }
    render() {
        const jobs = this.state.jobs
        
        if(jobs.length > 0){
            const jobItems = jobs.map((job, i) =>    
            <tr key={i} className="jumbotron">
            <td>{job.title}</td>
            <td>{job.required_experience_level}</td>
            <td>{job.brief}</td>
            <td>
                <Link className="btn btn-primary" to={"/admin/update-job/" + job.id}>update</Link>
                <Link className="btn btn-success" to={"/admin/jobs/" + job.id + "/applications"}>view applications</Link>
                <Link className="btn btn-danger" to={"/admin/jobs/" + job.id + "/delete"}>delete</Link>
                
            </td>
            </tr>
            );
        return (
            <div>
                <Link className="btn btn-danger" to="/admin/logout">Logout</Link>
                <Link className="btn btn-success" to="/admin/create-job">create job</Link>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>title</th>
                    <th>required experience level</th>
                    <th>brief</th>
                    <th>actions</th>

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
                <div className="alert alert-info" role="alert">no jobs avaiable now...</div>
        )
    }
}