import { AuthState, AuthAction } from "./auth/authTypes";
import { Action, AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

export interface StoreState {
  auth: AuthState;
}

export type AllActions = AuthAction;

export type AsyncAction<Result> = ThunkAction<
  Promise<Result>,
  StoreState,
  undefined,
  AllActions
>;

/**
 * @example
 *  const dispatch: AsyncDispatch = useDispatch();
 */
export type AsyncDispatch<T extends AnyAction = Action> = ThunkDispatch<
  StoreState,
  undefined,
  T
>;
