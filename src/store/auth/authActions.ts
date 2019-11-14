// import Auth from 'core/auth/Auth';
import { auth } from "core/auth/Auth";
import { IUser } from "core/auth/IUser";
import { Dispatch } from "redux";
import { AuthActionType } from "./authTypes";
import { AsyncDispatch } from "store/stateTypes";

/** Initialize auth state */
export function initAuthState() {
  return async function(dispatch: Dispatch) {
    const loggedUser = await auth.init();

    if (loggedUser) {
      dispatch({ type: AuthActionType.USER_LOGGED_IN, payload: loggedUser });
      return loggedUser;
    }
  };
}

/** Log out current user */
export function logoutUser() {
  return async function(dispatch: Dispatch) {
    await auth.logout();
    dispatch({
      type: AuthActionType.USER_LOGGED_OUT
    });
  };
}

/** Login user */
export function attemptLogin(email: string, password: string) {
  return async function(dispatch: Dispatch) {
    // return handleErrorActions({
    //   dispatch,
    //   errorMessage: "Losi parametri",
    //   async exec() {
    const user = await auth.attemptLogin(email, password);
    dispatch({ type: AuthActionType.USER_LOGGED_IN, payload: user });

    return user;
    //   }
    // });
  };
}

/** Register new user and store him in the state */
export function registerUser(email: string, password: string) {
  return async function(dispatch: Dispatch) {
    // return handleErrorActions({
    //   dispatch,
    //   errorMessage: "Losi parametri",
    //   async exec() {
    const user = await auth.register(email, password);
    dispatch({ type: AuthActionType.USER_REGISTERED, payload: user });
    return user;
    //   }
    // });
  };
}

/**  Change users informations */
export function changeUsersInfo({ phoneNumber, email, name }: Partial<IUser>) {
  return async function(dispatch: Dispatch) {
    // return handleErrorActions({
    //   dispatch,
    //   async exec() {
    const user = await auth.manageUser.changeUsersInfo({
      email,
      phoneNumber,
      name
    });

    dispatch({ type: AuthActionType.USER_CHANGED_INFO, payload: user });
    return user;
  };
  // });
}

/**  Delete user */
export function deleteUser(password: string) {
  return async function(dispatch: AsyncDispatch) {
    // return handleErrorActions({
    //   dispatch,
    //   errorMessage: "Problem sa brisanjem naloga",
    //   async exec() {
    await auth.manageUser.deleteUser(password);
    return dispatch(logoutUser());
    //   }
    // });
  };
}
