import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { dataProvider } from "components/dataProvider";
import { Struct } from "core/utils/helpers";
import { Epic, ofType } from "redux-observable";
import { defer } from "rxjs";
import { debounceTime, map, mergeMap, retry, tap } from "rxjs/operators";
import { UUID, WithId } from "types";
import { RootState } from "./store";
import cloneDeep from "lodash-es/cloneDeep";

/** Cached resource interface */
interface Resources<T extends WithId = any> {
  [name: string]: Record<UUID, T>;
}

/** Resouce and id for data that we want */
interface RequestDataByIdPayload {
  resourceName: string;
  resourceId: string;
}

interface AddToResourcePayload {
  resourceName: string;
  data: WithId[];
}

//
const resourcesSlice = createSlice({
  name: "resources",
  initialState: { resources: {} as Resources },
  reducers: {
    // Notify epic to fetch data
    requestDataById(_, __: PayloadAction<RequestDataByIdPayload>) {},
    // When fetchEpic finishes, it calls this method to add resource to store
    // Anyone can call this method when he/she wants to store new data to store
    addToResource(state, action: PayloadAction<AddToResourcePayload>) {
      const { resourceName, data } = action.payload;
      // If resurce does not already exist, create it
      if (!state.resources[resourceName]) {
        state.resources[resourceName] = {};
      }

      data
        .map(cloneDeep)
        .map(item => (state.resources[resourceName][item.id] = item));
    },
  },
});

export const { addToResource, requestDataById } = resourcesSlice.actions;
export const resourcesReducer = resourcesSlice.reducer;

/**
 * Field used for keeping track of ids for epic
 * @example
 *  const resources = { companies: { companyId4444: true } };
 */
const resourceMeta: Struct<Struct<boolean>> = {};

/**
 * Debaunce all request for 100ms, to see if there is
 * more request for same resource by id. Combine ids
 * in one request
 */
export const fetchEpic: Epic<
  PayloadAction<RequestDataByIdPayload>,
  any,
  RootState
> = (action$, state$) =>
  action$.pipe(
    ofType(requestDataById.type),
    tap(action => {
      const { resourceId, resourceName } = action.payload;
      if (!resourceMeta[resourceName]) {
        resourceMeta[resourceName] = {};
      }
      resourceMeta[resourceName][resourceId] = true;
    }),
    debounceTime(100),
    mergeMap(action =>
      Object.keys(resourceMeta).map(resourceName => {
        const ids = Object.keys(resourceMeta[resourceName]);
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
        tap(value => delete resourceMeta[value.resourceName]),
        map(({ data, resourceName }) => addToResource({ data, resourceName })),
      ),
    ),
  );
