import {
  Action,
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { auth } from "core/auth/Auth";
import { createEpicMiddleware } from "redux-observable";
import { ThunkAction } from "redux-thunk";
import { authReducer, initLoginState } from "../components/Auth/authSlice";
import { adminReducer } from "./adminSlice";
import { fetchEpic, resourcesReducer } from "./resourcesSlice";
import { uiReducer } from "./uiSlice";
import { alertReducer } from "./alertSlice";

const epicMiddleware = createEpicMiddleware();

const reducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  admin: adminReducer,
  resources: resourcesReducer,
  alert: alertReducer,
});

export const store = configureStore({
  reducer,
  middleware: [epicMiddleware, ...getDefaultMiddleware()],
});

epicMiddleware.run(fetchEpic as any);

auth.init().then(user => store.dispatch(initLoginState(user)));

export type RootState = ReturnType<typeof reducer>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<Return = void> = ThunkAction<
  Return,
  RootState,
  null,
  Action<string>
>;

// This will intergrate Http into Redux (handle errors)
// Http.interceptors.response.use(
//   r => r,
//   (error: AxiosError) => {
//     // console.log(error);
//   }
// );
