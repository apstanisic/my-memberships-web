import { configureStore, Action, combineReducers } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { authReducer } from "../components/Auth/authSlice";
import { uiReducer } from "./uiSlice";
import { Http } from "core/http";
import { AxiosError } from "axios";

const reducer = combineReducers({
  auth: authReducer,
  ui: uiReducer
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

// This will intergrate Http into Redux (handle errors)
Http.interceptors.response.use(
  r => r,
  (error: AxiosError) => {
    console.log(error);
  }
);
