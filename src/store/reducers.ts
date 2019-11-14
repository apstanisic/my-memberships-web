import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import uiReducer from "./ui/uiReducer";

export const reducers = combineReducers({
  auth: authReducer,
  ui: uiReducer
});
