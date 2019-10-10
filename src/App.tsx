import './App.css';

import { Layout } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { AuthenticationState } from './_types/AuthenticationState';
import { GameState } from './_types/GameState';
import { MatchStore } from './_types/MatchStore';
import { TeamStore } from './_types/TeamStore';
import { UserStore } from './_types/UserStore';
import LoginForm from './components/LoginForm';
import { MatchPage } from './components/Match/MatchPage';
import NavBar from './components/NavBar';
import PrivateRoute from './components/PrivateRoute';
import GameContainer from './containers/GameContainer';
import MatchesContainer from './containers/MatchesContainer';
import UsersContainer from './containers/UsersContainer';

export interface AppState {
  authentication : AuthenticationState;
  newgame: GameState;
  teamStore: TeamStore;
  userStore: UserStore;
  matchStore: MatchStore;
}

class App extends React.Component<AppState> {

  render() {
  return (
    <Layout>
      <Router>
        <Layout.Header style={{padding: 0}}>
          <NavBar />
        </Layout.Header >
        <Layout.Content style={{ margin:'auto', marginTop: 50, padding: '2%' , width: 600, maxWidth: '100vw', minHeight: '93vh'}}>
          <Switch>
            <Route path="/login" component={LoginForm} />
            <PrivateRoute exact path="/matches" component={MatchesContainer}/>
            <PrivateRoute path="/matches/:id" component={MatchPage}/>
            <PrivateRoute path="/game" component={GameContainer} />           
            <PrivateRoute path="/users" component={UsersContainer} />
            <PrivateRoute component={() => <h2>no found man</h2>} />
            
          </Switch>
        </Layout.Content>  
      </Router>
    </Layout>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  authentication: state.authentication,
  teamStore: state.teamStore,
  newgame: state.newgame,
  userStore: state.userStore,
  matchStore: state.matchStore,
})

export default connect(mapStateToProps)(App);
