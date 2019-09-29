import { UserStore } from '../_types/UserStore';

const initialState: UserStore = {
  users: []
 };

export const userStore = (state = initialState, action: any) => {
   return state;
}
