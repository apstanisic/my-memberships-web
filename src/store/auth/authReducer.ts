import { AuthState, AuthAction, AuthActionType } from "./authTypes";

const defaultState: AuthState = {
  isLogged: false
};

export default function authReducer(
  state = defaultState,
  action: AuthAction
): AuthState {
  switch (action.type) {
    case AuthActionType.USER_LOGGED_IN:
      return { isLogged: true, user: action.payload };
    case AuthActionType.USER_LOGGED_OUT:
      return { isLogged: false };
    case AuthActionType.USER_REGISTERED:
      return { isLogged: true, user: action.payload };
    default:
      break;
  }

  return state;
}
