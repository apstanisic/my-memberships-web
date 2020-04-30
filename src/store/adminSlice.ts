import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Company } from "src/components/AdminPanel/Company/Company";
import { Settings } from "./CompanySettings";

interface UrlParams {
  adminRoot: string;
  companyId?: string;
  company?: Company;
  resourceName: string;
  resourceId: string;
}

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    perPage: 12 as 6 | 12 | 24 | 36,
    settings: {} as Settings,
    // Data that helps construct next url
    url: {
      adminRoot: "/admin-panel",
      companyId: "",
      resourceName: "",
    } as UrlParams,
  },
  reducers: {
    changePerPage(state, action: PayloadAction<6 | 12 | 24 | 36>) {
      state.perPage = action.payload;
    },
    setSettings(state, action: PayloadAction<Settings>) {
      state.settings = action.payload;
    },
    setUrlData(state, action: PayloadAction<Partial<UrlParams>>) {
      const { adminRoot, companyId, resourceId, resourceName, company } = action.payload;

      if (adminRoot) state.url.adminRoot = adminRoot;
      if (companyId) state.url.companyId = companyId;
      if (resourceId) state.url.resourceId = resourceId;
      if (resourceName) state.url.resourceName = resourceName;
      if (company) state.url.company = company;
    },
  },
});

export const { setUrlData, changePerPage, setSettings } = adminSlice.actions;
export const adminReducer = adminSlice.reducer;
