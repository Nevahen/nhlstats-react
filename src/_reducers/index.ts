import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';

export const rootReducer = combineReducers({
  authentication,
});
