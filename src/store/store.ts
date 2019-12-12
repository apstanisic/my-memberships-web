import {
  Action,
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { createEpicMiddleware } from "redux-observable";
import { ThunkAction } from "redux-thunk";
import { authReducer } from "src/components/Auth/authSlice";
import { adminReducer } from "./adminSlice";
import { fetchEpics } from "./fetchEpics";
import { resourcesReducer } from "./resourcesSlice";
import { uiReducer } from "./uiSlice";

const epicMiddleware = createEpicMiddleware();

const reducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  admin: adminReducer,
  resources: resourcesReducer,
});

export const store = configureStore({
  reducer,
  middleware: [epicMiddleware, ...getDefaultMiddleware()],
});

epicMiddleware.run(fetchEpics);

// auth.init().then(user => store.dispatch(initLoginState(user)));

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
//     // throw new Error("my error");
//     // alert("e rroorrr");
//     console.log(error);
//     return error;
//   },
// );
