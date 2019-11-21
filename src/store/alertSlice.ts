import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: "alert",
  initialState: {
    header: "Are you sure?",
    subheader: "",
    alertPayload: true as boolean | string | undefined | any,
    answered: false,
    response: false,
    show: false,
  },
  reducers: {
    closeAlert(state) {
      state.show = false;
    },
    showAlert(state) {
      state.show = true;
    },
    setAlertPayload(state, action: PayloadAction<any>) {
      state.alertPayload = action.payload;
      state.answered = false;
      state.show = true;
    },
    respondToAlert(
      state,
      action: PayloadAction<{ response: boolean; alertPayload?: string }>,
    ) {
      state.show = false;
      state.response = action.payload.response;
      //   state.alertPayload = action.payload.alertPayload;
      state.answered = true;
    },
  },
});

export const {
  closeAlert,
  respondToAlert,
  setAlertPayload,
  showAlert,
} = alertSlice.actions;
export const alertReducer = alertSlice.reducer;
