import { UserStore } from '../_types/UserStore';

const initialState: UserStore = {
  users: [],
  fetching: false,
 };

export const userStore = (state = initialState, action: any) => {

   switch(action.type) {

    case 'USERS_FETCH_SUCCESS':
      return {
        ...state, users: action.payload, fetching: false,
      }

    case 'USERS_FETCH_REQUEST': {
      return {
        ...state, fetching: true,
      }
    }

    case 'USERS_FETCH_FAILURE': {
      return {
        ...state, fetching: false,
      }
    }

    default: 
      return state;
   }
}
