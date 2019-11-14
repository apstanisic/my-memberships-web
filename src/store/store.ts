import { configureStore, Action, combineReducers } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { authReducer } from "./authSlice";
import { uiReducer } from "./uiSlice";

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
