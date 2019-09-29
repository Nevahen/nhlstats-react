import { UserStore } from '../_types/UserStore';

const initialState: UserStore = {
  users: []
 };

export const userStore = (state = initialState, action: any) => {

   switch(action.type) {

    case 'USERS_FETCH_SUCCESS':
      return {
        ...state, users: action.payload
      }

    default: 
      return state;
   }
}
