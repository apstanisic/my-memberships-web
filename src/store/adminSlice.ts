import { createSlice, PayloadAction, Action } from "@reduxjs/toolkit";
import { UUID, WithId } from "types";
import { Observable, defer, merge } from "rxjs";
import {
  tap,
  debounceTime,
  mapTo,
  retry,
  map,
  concatAll,
  mergeMap,
} from "rxjs/operators";
import { ofType, Epic } from "redux-observable";
import { RootState } from "./store";
import { Struct } from "core/utils/helpers";
import { dataProvider } from "components/dataProvider";

interface Resources<T extends WithId = any> {
  [name: string]: Record<UUID, T>;
}

interface UrlParams {
  adminRoot: string;
  companyId?: string;
  resourceName: string;
  resourceId: string;
}

interface GetReferenceParam {
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
    resources: {} as Resources,
    tempRefField: {} as any,
  },
  reducers: {
    // setCompany(state, action: PayloadAction<UUID | undefined>) {
    //   state.companyId = action.payload;
    // },
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
    // Material table throws errors if I don't deep clone new data
    // It wants to nobady touch it
    addToResource(
      state,
      action: PayloadAction<{ data: WithId[]; resourceName?: string }>,
    ) {
      const resource = action.payload.resourceName ?? state.url.resourceName;
      if (!state.resources[resource]) {
        state.resources[resource] = {};
      }
      action.payload.data
        .map(item => ({ ...item }))
        .map(item => (state.resources[resource][item.id] = item));
    },
    requestDataById(state, action: PayloadAction<GetReferenceParam>) {},
  },
});

export const {
  addToResource,
  setUrlData,
  requestDataById,
} = adminSlice.actions;
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
    `/companies/${url.companyId}/${resource ?? url.resourceName}`,
  remote: (url: UrlParams, resource?: string, id?: string) =>
    `${urlHelper.remoteBase(url, resource)}/${id ?? url.resourceId}`,
  changeResource: (url: UrlParams, newResource: string, id?: string) =>
    `${urlHelper.root(url)}/${newResource}${id ? `/${id}` : ""}`,
};

/**
 * resources = {
 *   companies: {
 *    companyId4444: true
 *    }
 * }
 */
const resources: Struct<Struct<boolean>> = {};

/**
 * Get by id combines into ids?ids=fdsf;fdsfsd;fsd
 */
export const fetchEpic: Epic<
  PayloadAction<GetReferenceParam>,
  any,
  RootState
> = (action$, state$) =>
  action$.pipe(
    ofType(requestDataById.type),
    tap(action => {
      const { resourceId, resourceName } = action.payload;
      if (!resources[resourceName]) {
        resources[resourceName] = {};
      }
      resources[resourceName][resourceId] = true;
    }),
    debounceTime(100),
    mergeMap(action =>
      Object.keys(resources).map(resourceName => {
        const ids = Object.keys(resources[resourceName]);
        let baseUrl = `/companies/${state$.value.admin.url.companyId}/${resourceName}`;
        if (resourceName === "users") baseUrl = "/auth/users";
        return defer(() =>
          dataProvider
            .getByIds<WithId>(baseUrl, { ids })
            .then(data => ({ data, resourceName })),
        ).pipe(retry(1));
      }),
    ),
    mergeMap(action =>
      action.pipe(
        tap(value => delete resources[value.resourceName]),
        map(({ data, resourceName }) => addToResource({ data, resourceName })),
      ),
    ),
  );
