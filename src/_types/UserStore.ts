export interface UserStore {
  users: IUser[];
  fetching: boolean;
}

export interface IUser {
  id: number;
  username: string;
}
