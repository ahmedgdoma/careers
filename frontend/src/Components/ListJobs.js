import { Component } from 'react';
import BackendApi from '../Api/BackendApi';
import { Link } from 'react-router-dom';


export default class ListJobs extends Component{
    constructor(props){
        super(props);
        this.state = {jobs: {}};
    }
    componentDidMount(){
        let backendApi = new BackendApi();
        let jobs = backendApi.get('available-jobs')
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
            <td><Link to={"/apply/" + job.id}>Apply</Link></td>
            </tr>
            );
        return (
            <table className="table table-striped">
                <tr>
                    <th>title</th>
                    <th>required experience level</th>
                    <th>brief</th>
                    <th>apply</th>

                </tr>
                {jobItems}
            </table>
        )
        }
        
        else
        return (
                <div class="alert alert-info" role="alert">no jobs avaiable now...</div>
        )
    }
}