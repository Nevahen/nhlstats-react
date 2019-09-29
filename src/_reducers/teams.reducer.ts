import { TeamStore } from '../_types/TeamStore';

const initialState: TeamStore = {
  teams: []
 };

export const teamStore = (state = initialState, action: any) => {

  if(action.type === 'TEAMS_SUCCESS') {
    return { ...state, teams: action.payload};
  }

  return state;
}
