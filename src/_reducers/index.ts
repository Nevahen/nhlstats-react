import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { newgame } from './newgame.reducer';
import { teamStore } from './teams.reducer';
import { userStore } from './users.reducer';

export const rootReducer = combineReducers({
  teamStore,
  authentication,
  newgame,
  userStore,
});
