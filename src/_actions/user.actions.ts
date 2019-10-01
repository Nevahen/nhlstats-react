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

const fetchUsers = () => {
  return async (dispatch: any) => {

    const request = () => { return { type: 'USERS_FETCH_REQUEST' }}
    const success = (payload: any) => { return { type: 'USERS_FETCH_SUCCESS', payload}}
    const failure = () => { return { type: 'USERS_FETCH_FAILURE' }}

    try {
      dispatch(request());
      const response = await Axios.get('/users');
      dispatch(success(response.data));
    } catch (error) {
      dispatch(failure);
    }
  }
}

const registerUser = (user: {username: string, password: string }) => {
  const { password, username} = user;
  return async (dispatch: any) => {
    dispatch({
      type: "REGISTER_USER_REQUEST",
    });

    try {
      const respone = await Axios.post('/users', {
        password,
        username,
      });

      dispatch({
        type: "REGISTER_USER_SUCCESS",
        payload: respone.data,
      })
    } catch (error) {

    }

  }
}

export default {
  login,
  checkLogin,
  logout,
  fetchUsers,
  registerUser,
}