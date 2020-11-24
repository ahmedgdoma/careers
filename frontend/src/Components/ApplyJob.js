import { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import BackendApi from '../Api/BackendApi';

// let { job_id } = useParams();  
 class ApplyJob extends Component{
      
constructor(props){
    super(props);
    this.state = {
        job_id: null,
        is_submit: false,
        applied: false
    }
    this.values = {
        name: null,
        university: null,
        email: null,
        dob: null,
        notes: null,
    }
    this.apply = this.apply.bind(this); 
    this.saveData = this.saveData.bind(this); 
    this.onChange = this.onChange.bind(this); 
}
apply(event){
    this.setState({is_submit: true});
    for (var k in this.values) {
        
        this.values[k] = event.target[k].value
    }
    this.values.cv = this.state.cv;
    this.values.job_id = this.state.job_id

    this.saveData();
    event.preventDefault();
   
    
} 
saveData(){
    let backendApi = new BackendApi();
        backendApi.post('application', this.values)
        .then(res => {
            if(res.status == 200){
                this.setState({applied: true})
            }
        })

        .catch((e => console.log(e)));
}   

onChange(e) {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length)
          return;
    this.createCV(files[0]);
  }
  createCV(file) {
    let reader = new FileReader();
    reader.onload = (e) => {
      this.setState({
        cv: e.target.result
      })
    };
    reader.readAsDataURL(file);
  }

componentDidMount(){
    this.setState({
        job_id: this.props.match.params.id
    });
    
}



render() {
    if(this.state.applied){
        return (
            <div>
                <div class="alert alert-info" role="alert">
                applied Successfuly
                    
            </div>
                <div className="text-center"><Link to="/">go to jobs list</Link></div>
            </div>
        );
    }
    return (
        <div>
        <div className="page-header">
            <h1>apply job here</h1>
        </div>
        <div className="panel panel-default">
            <div className="panel-body">
            <form encType="multipart/form-data" onSubmit={this.apply}>
            <div className="form-group">
                <label htmlFor="Name">Name</label>
                <input defaultValue="" name="name" type="text" className="form-control" id="Name" placeholder="Name" />
            </div>
            <div className="form-group">
                <label htmlFor="University">University</label>
                <input defaultValue="" name="university" type="text" className="form-control" id="University" placeholder="University" />
            </div>
            <div className="form-group">
                <label htmlFor="Email">Email address</label>
                <input defaultValue="" name="email" type="email" className="form-control" id="Email" placeholder="Email" />
            </div>
            <div className="form-group">
                <label htmlFor="dob">Date of birth</label>
                <input defaultValue="" name="dob" type="date" className="form-control" id="dob" placeholder="dob" />
            </div>
            <div className="form-group">
                <label htmlFor="notes">notes "why should we accept you"</label>
                <textarea defaultValue="" name="notes" id="notes" className="form-control" ></textarea>
            </div>
            
            <div className="form-group">
                <label htmlFor="exampleInputFile">File input</label>
                <input onChange={this.onChange} defaultValue="" type="file" id="exampleInputFile" />
                <p className="help-block">Example block-level help text here.</p>
            </div>

            {/* <button type="submit" >Submit</button> */}
            <input type="submit" disabled={this.state.is_submit} className="btn btn-primary" value="Submit" />
        </form>
            </div>
        </div>
        </div>
    )
}
}
export default withRouter(ApplyJob);