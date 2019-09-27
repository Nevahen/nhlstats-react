import './App.css';

import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import { AuthenticationState } from './_types/AuthenticationState';
import { GameState } from './_types/GameState';
import LoginForm from './components/LoginForm';
import MainPage from './components/MainPage';
import NavBar from './components/NavBar';
import PrivateRoute from './components/PrivateRoute';
import GameContainer from './containers/GameContainer';

interface AppState {
  authentication : AuthenticationState;
  newgame: GameState;
}

class App extends React.Component<AppState> {

  render() {
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
}

const mapStateToProps = (state: AppState) => ({
  authentication: state.authentication,
  newgame: state.newgame,
})

export default connect(mapStateToProps)(App);
