const initialState = { 
  loggedIn: false, 
  loggingIn: false,
  errors: '',
  user: null,
 };

export const authentication = (state = initialState, action: any) => {
  if(action.type === 'LOGIN_REQUEST') {
    return { ...state, loggingIn: true}
  }
  if(action.type === 'LOGIN_SUCCESS') {
    const { user } = action;
    localStorage.setItem('user', JSON.stringify(user));
    return { ...state, loggingIn: false, loggedIn: true, user}
  }
  if(action.type === 'LOGIN_FAILURE') {
    return { ...state,
       loggedIn: false,
       loggingIn: false,
       errors: 'Authentication failed.'}
  }
  return state;
}
