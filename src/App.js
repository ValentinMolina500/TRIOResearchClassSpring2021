import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import SignUp from "./components/SignUp";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/signup' component={SignUp}/>
          <Route path='/' component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
