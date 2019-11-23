import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UrlParams {
  adminRoot: string;
  companyId?: string;
  resourceName: string;
  resourceId: string;
}

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    perPage: 12 as 6 | 12 | 24 | 36,
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
    setUrlData(state, action: PayloadAction<Partial<UrlParams>>) {
      const { adminRoot, companyId, resourceId, resourceName } = action.payload;
      if (adminRoot) state.url.adminRoot = adminRoot;
      if (companyId) state.url.companyId = companyId;
      if (resourceId) state.url.resourceId = resourceId;
      if (resourceName) state.url.resourceName = resourceName;
    },
  },
});

export const { setUrlData, changePerPage } = adminSlice.actions;
export const adminReducer = adminSlice.reducer;

export const urlHelper = {
  root: (url: UrlParams) => `${url.adminRoot}/companies/${url.companyId}`,
  list: (url: UrlParams) => `${urlHelper.root(url)}/${url.resourceName}`,
  create: (url: UrlParams) => `${urlHelper.list(url)}/create`,
  edit: (url: UrlParams, customId?: string) =>
    `${urlHelper.list(url)}/${customId ?? url.resourceId}/edit`,
  show: (url: UrlParams, customId?: string) =>
    `${urlHelper.list(url)}/${customId ?? url.resourceId}/show`,
  remoteBase: (url: UrlParams, resource?: string) =>
    `companies/${url.companyId}/${resource ?? url.resourceName}`,
  remote: (url: UrlParams, resource?: string, id?: string) =>
    `${urlHelper.remoteBase(url, resource)}/${id ?? url.resourceId}`,
  changeResource: (url: UrlParams, newResource: string, id?: string) =>
    `${urlHelper.root(url)}/${newResource}${id ? `/${id}` : ""}`,
};
