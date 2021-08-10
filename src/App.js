import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Home from './component/Home';
import Login from './component/Login';
import Registration from './component/Registration'

function App() {
  return (
    <div className="App">
      <Router>
        {(localStorage.getItem('token') == null)
          ? <Redirect to='/login' />
          : <Redirect to='/home' />
        }
        <Switch>
          <Route path="/home" exact={true} component={Home} />
          <Route path="/login" exact={true} component={Login} />
          <Route path="/registration" exact={true} component={Registration} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
