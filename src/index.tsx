import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import userActions from './_actions/user.actions';
import { store } from './_store/store';
import App from './App';
import * as serviceWorker from './serviceWorker';

const user = localStorage.getItem('user');


const init = async () => {

  if(user) {
    const loggedIn = await userActions.checkLogin();
    if(loggedIn) {
      store.dispatch({ 
        type: 'LOGIN_SUCCESS',
        user: JSON.parse(user),
      })
    }
  
  }
  
  
  ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>, document.getElementById('root'));
  
  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
  
}

init();

