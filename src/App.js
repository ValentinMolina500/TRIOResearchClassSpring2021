import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ViewForms from "./components/ViewForms";
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
        
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/testing' component={ViewForms} />
          <Route path='/' component={Login} />
          
        </Switch>
      </div>
    </Router>
  );
}

export default App;
