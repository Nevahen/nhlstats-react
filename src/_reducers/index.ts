import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { newgame } from './newgame.reducer';

export const rootReducer = combineReducers({
  authentication,
  newgame,
});
