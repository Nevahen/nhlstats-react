import './App.css';

import PrivateRoute from './components/PrivateRoute';
import MainPage from './components/MainPage';
import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import NavBar from './components/NavBar';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <NavBar />
        </header>
        <div className="page">
          <Link to={'/test'}><h1>NHL STATS</h1></Link>
          <Route path="/login" component={LoginForm} />
          <PrivateRoute path="/test" component={MainPage}/>
        </div>
      </Router>
    </div>
  );
}

export default App;
