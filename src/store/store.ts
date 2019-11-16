import {
  Action,
  combineReducers,
  configureStore,
  createStore
} from "@reduxjs/toolkit";
import { authProvider } from "components/AdminPanel/authProvider";
import { dataProvider } from "components/AdminPanel/dataProvider";
import { ThunkAction } from "redux-thunk";
import { authReducer, initLoginState } from "../components/Auth/authSlice";
import createAdminStore from "./createAdminStore";
import { uiReducer } from "./uiSlice";
import { auth } from "core/auth/Auth";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

const admin = createAdminStore({
  authProvider,
  dataProvider,
  history
});

// setTimeout(() => history.push("/panel"), 3000);

const reducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  router: admin.reducers.router,
  admin: admin.reducers.admin as () => object
});

export const store = configureStore({ reducer });

// admin.init();

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
