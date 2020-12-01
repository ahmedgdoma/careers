import {BrowserRouter, Route} from 'react-router-dom';
import Auth from './Auth/Auth';
import ApplyJob from './Components/ApplyJob';
import ListJobs from './Components/ListJobs';
import AdminRoutes from './Components/AdminRoutes';
function App() {

  return (
    <BrowserRouter>
        
        <Route path="/apply/:id" exact={true}>
          <ApplyJob />
        </Route>
        <Route path="/" exact={true}>
          <ListJobs />
        </Route>
        <AdminRoutes />
    </BrowserRouter>
  );
}

export default App;
