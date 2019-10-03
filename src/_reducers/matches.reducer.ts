import { MatchStore } from '../_types/MatchStore';

const initialState = { 
  currentMatch: null,
  matchList: [],
  fetching: false
 };

export const matches = (state: MatchStore = initialState, action: any) => {

  if (action.type === "MATCHLIST_FETCH") {
    return {
      ...state, fetching: true,
    }
  }

  if (action.type === "MATCHLIST_SUCCESS") {
    return {
      ...state, fetching: false, matchList: action.payload,
    }
  }

  if (action.type === "MATCHLIST_FAILURE") {
    return {
      ...state, fetching: false,
    }
  }

  if (action.type === "MATCH_FETCH") {
    return {
      ...state, fetching: true, currentMatch: null,
    }
  }

  if (action.type === "MATCH_SUCCESS") {
    return {
      ...state, fetching: false, currentMatch: action.payload
    }
  }

  if (action.type === "MATCH_FAILURE") {
    return {
      ...state, fetching: false, currentMatch: action.payload,
    }
  }
  
  return state;
}
