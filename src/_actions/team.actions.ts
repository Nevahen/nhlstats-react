import Axios from '../Axios';

export const fetchTeams = () => {
  return async (dispatch: any) => {
    dispatch(request());

    try {
      const response = await Axios.get('/teams')
      dispatch(success(response.data));
    } catch (error) {
      dispatch(failure());
    }    
  };

  function request() { return { type: 'TEAMS_REQUEST' } }
  function success(payload: any) { return { type: 'TEAMS_SUCCESS', payload } }
  function failure() { return { type: 'TEAMS_FAILURE'} }
}

export const selectTeam = (target: number, teamID: number) => {
  return {
    type: 'SELECT_TEAM',
    target,
    teamID,
  }  
}

export const startSelectTeam = (target: number) => {
  return {
    type: 'START_SELECT_TEAM',
    target,
  }
}