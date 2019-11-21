import {
  Action,
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { authReducer, initLoginState } from "../components/Auth/authSlice";
import { uiReducer } from "./uiSlice";
import { auth } from "core/auth/Auth";
import { adminReducer, fetchEpic } from "./adminSlice";
import { createEpicMiddleware } from "redux-observable";
import { filter, mapTo, delay, debounce, debounceTime } from "rxjs/operators";

const reducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  admin: adminReducer,
});
const epicMiddleware = createEpicMiddleware();

const pingEpic = (action$: any) =>
  action$.pipe(
    debounceTime(1000),
    // delay(1000),
    filter((action: any) => action.type === "PING"),
    mapTo({ type: "PONG" }),
  );

export const store = configureStore({
  reducer,
  middleware: [epicMiddleware, ...getDefaultMiddleware()],
});

epicMiddleware.run(fetchEpic as any);

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
