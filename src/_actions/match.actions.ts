import Axios from '../Axios';
import { IGameEvent } from '../_types';

export const fetchMatches = () => {
  return async (dispatch: any) => {
    dispatch(request());

    try {
      const response = await Axios.get('/matches')
      dispatch(success(response.data));
    } catch (error) {
      dispatch(failure());
    }    
  };

  function request() { return { type: 'MATCHLIST_FETCH' } }
  function success(payload: any) { return { type: 'MATCHLIST_SUCCESS', payload } }
  function failure() { return { type: 'MATCHLIST_FAILURE'} }
}

export const fetchMatch = (id: number) => {
  return async (dispatch: any) => {
    dispatch(request());

    try {
      const response = await Axios.get('/matches/' + id)
      dispatch(success(response.data));
    } catch (error) {
      dispatch(failure({ error: error.message }));
    }    
  };

  function request() { return { type: 'MATCH_FETCH' } }
  function success(payload: any) { return { type: 'MATCH_SUCCESS', payload } }
  function failure(payload: any) { return { type: 'MATCH_FAILURE', payload} }
}

export const updateEvent = (id: number, updatedEvent: Partial<IGameEvent>) => {
  return async (dispatch: any) => {
    dispatch(request());
    try {
      const response = await Axios.patch('/events/' + id, updatedEvent);
      dispatch(success(response.data));
    } catch (error) {
      dispatch(failure())
    }

    function request() { return { type: 'UPDATE_EVENT_FETCH' } }
    function success(payload: any) { return { type: 'UPDATE_EVENT_SUCCESS', payload } }
    function failure() { return { type: 'UPDATE_EVENT_FAILURE'} }
  }
}