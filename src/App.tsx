import './App.css';

import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import LoginForm from './components/LoginForm';
import MainPage from './components/MainPage';
import NavBar from './components/NavBar';
import PrivateRoute from './components/PrivateRoute';
import GameContainer from './containers/GameContainer';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <NavBar />
        </header>
        <div className="page">
        <Link to={'/test'}><h1>NHL STATS</h1></Link>

          <Switch>
            <Route path="/login" component={LoginForm} />
            <PrivateRoute path="/test" component={MainPage}/>
            <PrivateRoute path="/game" component={GameContainer} />
            <PrivateRoute component={() => <h2>no found man</h2>} />
            
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
