import { IUser } from "core/auth/IUser";

export interface AuthState {
  isLogged: boolean;
  user?: IUser;
}

interface UserLoggedIn {
  type: AuthActionType.USER_LOGGED_IN;
  payload: IUser;
}

interface UserRegistered {
  type: AuthActionType.USER_REGISTERED;
  payload: IUser;
}

interface UserLoggedOut {
  type: AuthActionType.USER_LOGGED_OUT;
}

interface UserChangedInfo {
  type: AuthActionType.USER_CHANGED_INFO;
  payload: IUser;
}

export type AuthAction =
  | UserLoggedIn
  | UserLoggedOut
  | UserRegistered
  | UserChangedInfo;

export enum AuthActionType {
  USER_LOGGED_IN = "USER_LOGGED_IN",
  USER_REGISTERED = "USER_REGISTERED",
  USER_LOGGED_OUT = "USER_LOGGED_OUT",
  USER_CHANGED_INFO = "USER_CHANGED_INFO"
}
