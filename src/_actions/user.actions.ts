import Axios from '../Axios';

const login = (username: string, password: string) => {
  return async (dispatch: any) => {
    dispatch(request({ username }));

    try {
      const response = await Axios.post('/auth', {
        username,
        password
      });    
      dispatch(success(response.data));
    } catch (error) {
      dispatch(failure(username));
    }    
  };

  function request(user: any) { return { type: 'LOGIN_REQUEST', user } }
  function success(user: any) { return { type: 'LOGIN_SUCCESS', user } }
  function failure(user: any) { return { type: 'LOGIN_FAILURE', user } }
}

const checkLogin = async () => {
  try {
    const response = await Axios.get('/auth/checkLogin');
    return response.data.loggedIn;
  } catch (error) {
    return false;
  }
}

const logout = () => {
  return (dispatch: any) => {
    Axios.get('/auth/logout')
    .then(() => dispatch({ type: 'LOGIN_LOGOUT' }))
  }
}

export default {
  login,
  checkLogin,
  logout,
}