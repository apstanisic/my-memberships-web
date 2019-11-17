import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UUID } from "types";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    companyId: undefined as string | undefined
  },
  reducers: {
    setCompany(state, action: PayloadAction<UUID | undefined>) {
      state.companyId = action.payload;
    }
  }
});

export const { setCompany } = adminSlice.actions;
export const adminReducer = adminSlice.reducer;
