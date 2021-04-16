import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/' component={Login} />
          <Route path='/testing' component={Signup}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
