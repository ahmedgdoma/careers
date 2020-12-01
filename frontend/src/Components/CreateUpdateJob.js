import { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import BackendApi from '../Api/BackendApi';

 class CreateUpdateJob extends Component{
      
constructor(props){
    super(props);
    this.state = {
        job_id: null,
        is_submit: false,
        applied: false,
        job: {
            title: null,
            required_experience_level: null,
            brief: null,
            start_date: null,
            end_date: null
        }
    }

    this.apply = this.apply.bind(this);
}
apply(event){
    this.setState({is_submit: true});
    let job = this.state.job;
    
    for (var k in this.state.job) {
        
        job[k] = event.target[k].value
    }
    if(this.props.action === 'update'){
        job._method = "PATCH"
        
    }
    this.setState({...job});
    // this.values.job_id = this.state.job_id

    this.saveData();
    event.preventDefault();
   
    
} 
saveData(){
    let backendApi = new BackendApi(true);
        let job_id = this.state.job_id;
        let action = (this.props.action === 'create')? "admin/jobs": "admin/jobs/"+job_id;
        backendApi.post(action, this.state.job)
        .then(res => {
            if(res.status === 200){
                this.setState({applied: true})
            }
        })
        
        .catch((e => console.log(e)));
}   


componentDidMount(){
    if(this.props.action === 'update'){
        let backendApi = new BackendApi(true);
        backendApi.get('admin/jobs/'+this.props.match.params.id)
        .then(res => res.json())
        .then(resJson => {
            let job = this.state.job;
            for (var k in this.state.job) {
                
                job[k] = resJson.data[k]
            }

            this.setState({
                ...job,
                job_id: this.props.match.params.id
            });
        })
        
    }
    
    
}



render() {
    if(this.state.applied){
        return (
            <div>
                <div className="alert alert-info" role="alert">
                {(this.props.action === "create")? "created": "updated"} Successfuly
                    
            </div>
                <div className="text-center"><Link to="/admin">go to jobs list</Link></div>
            </div>
        );
    }
    return (
        <div>
        <div className="page-header">
            <h1>{this.props.action} job</h1>
        </div>
        <div className="panel panel-default">
            <div className="panel-body">
            <form onSubmit={this.apply}>
            <div className="form-group">
                <label htmlFor="title">title</label>
                <input defaultValue={this.state.job.title} name="title" type="text" className="form-control" id="title" placeholder="title" />
            </div>
            <div className="form-group">
                <label htmlFor="required_experience_level">required experience level</label>
                <input defaultValue={this.state.job.required_experience_level} name="required_experience_level" type="text" className="form-control" id="required_experience_level" placeholder="required_experience_level" />
            </div>
            <div className="form-group">
                <label htmlFor="brief">brief</label>
                <input defaultValue={this.state.job.brief} name="brief" type="text" className="form-control" id="brief" placeholder="brief" />
            </div>
            <div className="form-group">
                <label htmlFor="start_date">start date</label>
                <input defaultValue={this.state.job.start_date} name="start_date" type="date" className="form-control" id="start_date" placeholder="start_date" />
            </div>
            <div className="form-group">
                <label htmlFor="end_date">end date</label>
                <input defaultValue={this.state.job.end_date} name="end_date" type="date" className="form-control" id="end_date" placeholder="end_date" />
            </div>
            <input type="submit" disabled={this.state.is_submit} className="btn btn-primary" value="Submit" />
        </form>
            </div>
        </div>
        </div>
    )
}
}
export default withRouter(CreateUpdateJob);