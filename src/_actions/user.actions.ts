
const login = (username: string, password: string) => {
  return (dispatch: any) => {
    dispatch(request({ username }));

    fetch('//192.168.56.101:3001/auth', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username, password
      }),
    })
    .then(response => response.json())
    .then(json => dispatch(success(json)))
    .catch(err => dispatch(failure(username)))
  };

  function request(user: any) { return { type: 'LOGIN_REQUEST', user } }
  function success(user: any) { return { type: 'LOGIN_SUCCESS', user } }
  function failure(user: any) { return { type: 'LOGIN_FAILURE', user } }
}

const checkLogin = async () => {
  const response = await fetch('//192.168.56.101:3001/auth/checkLogin', {
    credentials: 'include',
  });
  const json = await response.json();
  
  return json.loggedIn;
}

const logout = () => {
  return (dispatch: any) => {
    fetch('//192.168.56.101:3001/auth/logout', {
      credentials: 'include',
    })
    .then(() => dispatch({ type: 'LOGIN_LOGOUT' }))
  }
}

export default {
  login,
  checkLogin,
  logout,
}