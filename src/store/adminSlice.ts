import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UUID, WithId } from "types";

interface Resources<T extends WithId = any> {
  [name: string]: Record<UUID, T>;
}

interface UrlParams {
  adminRoot: string;
  companyId: string;
  resourceName: string;
  resourceId?: string;
}

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    // Url where admin panel is located
    adminUrl: "/admin-panel",
    // Data that helps construct next url
    url: {
      adminRoot: "/admin-panel",
      companyId: "",
      resourceName: "",
    } as UrlParams,
    companyId: undefined as string | undefined,
    perPage: 12 as 6 | 12 | 24 | 36,
    resources: {} as Resources,
  },
  reducers: {
    setCompany(state, action: PayloadAction<UUID | undefined>) {
      state.companyId = action.payload;
    },
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
    // changeAlert(state, action: PayloadAction<Alert>) {
    //   state.alert = action.payload;
    // },
    // Material table throws errors if I don't deep clone new data
    // It wants to nobady touch it
    addToResource(state, action: PayloadAction<{ data: WithId[] }>) {
      if (!state.resources[state.url.resourceName]) {
        state.resources[state.url.resourceName] = {};
      }
      action.payload.data
        .map(item => ({ ...item }))
        .map(item => (state.resources[state.url.resourceName][item.id] = item));
    },
  },
});

export const { setCompany, addToResource, setUrlData } = adminSlice.actions;
export const adminReducer = adminSlice.reducer;

export const urlHelper = {
  root: (url: UrlParams) => `${url.adminRoot}/companies/${url.companyId}`,
  list: (url: UrlParams) => `${urlHelper.root(url)}/${url.resourceName}`,
  create: (url: UrlParams) => `${urlHelper.list(url)}/create`,
  edit: (url: UrlParams, customId?: string) =>
    `${urlHelper.list(url)}/${customId ?? url.resourceId}/edit`,
  show: (url: UrlParams, customId?: string) =>
    `${urlHelper.list(url)}/${customId ?? url.resourceId}/show`,
  remoteBase: (url: UrlParams) =>
    `/companies/${url.companyId}/${url.resourceName}`,
  remote: (url: UrlParams) => `${urlHelper.remoteBase(url)}/${url.resourceId}`,
};
