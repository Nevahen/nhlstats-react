export interface AuthenticationState {
  loggedIn: boolean;
  loggingIn: boolean;
  errors: string;
  user: any;
}