import './App.css';

import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { AuthenticationState } from './_types/AuthenticationState';
import { GameState } from './_types/GameState';
import { TeamStore } from './_types/TeamStore';
import { UserStore } from './_types/UserStore';
import LoginForm from './components/LoginForm';
import MainPage from './components/MainPage';
import NavBar from './components/NavBar';
import PrivateRoute from './components/PrivateRoute';
import GameContainer from './containers/GameContainer';
import UsersContainer from './containers/UsersContainer';

export interface AppState {
  authentication : AuthenticationState;
  newgame: GameState;
  teamStore: TeamStore;
  userStore: UserStore;
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
          <Switch>
            <Route path="/login" component={LoginForm} />
            <PrivateRoute path="/test" component={MainPage}/>
            <PrivateRoute path="/game" component={GameContainer} />
            <PrivateRoute path="/users" component={UsersContainer} />
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
  teamStore: state.teamStore,
  newgame: state.newgame,
  userStore: state.userStore,
})

export default connect(mapStateToProps)(App);
