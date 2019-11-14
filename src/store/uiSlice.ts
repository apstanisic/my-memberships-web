import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    showSidebar: false,
    showLoader: false,
    darkTheme: false
  },
  reducers: {
    toggleTheme(state) {
      state.darkTheme = !state.darkTheme;
    },
    toggleSidebar(state) {
      state.showSidebar = !state.showSidebar;
    },
    showLoader(state, action: PayloadAction<boolean>) {
      state.showLoader = action.payload;
    }
  }
});

export const { toggleSidebar, toggleTheme, showLoader } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
