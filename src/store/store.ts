import { Action, combineReducers, configureStore } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { authReducer, initLoginState } from "../components/Auth/authSlice";
import { uiReducer } from "./uiSlice";
import { auth } from "core/auth/Auth";
import { adminReducer } from "./adminSlice";

const reducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  admin: adminReducer
});

export const store = configureStore({ reducer });

export type RootState = ReturnType<typeof reducer>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<Return = void> = ThunkAction<
  Return,
  RootState,
  null,
  Action<string>
>;

auth.init().then(user => store.dispatch(initLoginState(user)));

// This will intergrate Http into Redux (handle errors)
// Http.interceptors.response.use(
//   r => r,
//   (error: AxiosError) => {
//     // console.log(error);
//   }
// );
