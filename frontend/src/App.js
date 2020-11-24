import {Router, BrowserRouter, Route} from 'react-router-dom';
import ApplyJob from './Components/ApplyJob';
import ListJobs from './Components/ListJobs';
function App() {
  return (
    <BrowserRouter>
        
        <Route path="/apply/:id" exact={true}>
          <ApplyJob />
        </Route>
        <Route path="/" exact={true}>
          <ListJobs />
        </Route>
    </BrowserRouter>
  );
}

export default App;
