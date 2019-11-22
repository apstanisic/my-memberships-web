import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "src/core/auth/IUser";
import { AppThunk } from "src/store/store";
import { auth } from "src/core/auth/Auth";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isInited: false,
    isLogged: false,
    user: undefined as IUser | undefined,
  },
  reducers: {
    initLoginState(state, action: PayloadAction<IUser | undefined>) {
      state.isInited = true;
      if (action.payload) {
        state.isLogged = true;
        state.user = action.payload;
      }
    },
    loginUser(state, action: PayloadAction<IUser>) {
      state.isLogged = true;
      state.user = action.payload;
    },
    registerUser(state, action: PayloadAction<IUser>) {
      state.isLogged = true;
      state.user = action.payload;
    },
    logoutUser(state) {
      state.isLogged = false;
    },
    changeUserInfo(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
  },
});

const { actions } = authSlice;

export const { initLoginState } = actions;

/** Logs out current user */
export const logoutUser = (): AppThunk => async dispatch => {
  await auth.logout();
  dispatch(actions.logoutUser());
};

/** Login user */
export const attemptLogin = (
  email: string,
  password: string,
): AppThunk<Promise<IUser>> => async dispatch => {
  const user = await auth.attemptLogin(email, password);
  dispatch(actions.loginUser(user));
  return user;
};

/** Register new user and store him in the state */
export const registerUser = (
  email: string,
  password: string,
): AppThunk<Promise<IUser>> => async dispatch => {
  const user = await auth.register(email, password);
  dispatch(actions.registerUser(user));
  return user;
};

/** Change user's informations */
export const changeUserInfo = (
  data: Partial<IUser>,
): AppThunk<Promise<IUser>> => async dispatch => {
  const user = await auth.manageUser.changeUsersInfo(data);
  dispatch(actions.changeUserInfo(user));
  return user;
};

export const authReducer = authSlice.reducer;
