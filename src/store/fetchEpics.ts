import { PayloadAction, Action } from "@reduxjs/toolkit";
import { combineEpics, Epic, ofType } from "redux-observable";
import { defer } from "rxjs";
import {
  debounceTime,
  filter,
  map,
  mergeMap,
  retry,
  tap,
} from "rxjs/operators";
import { dataProvider } from "src/components/dataProvider";
import { Struct, wait } from "src/core/utils/helpers";
import { WithId } from "src/types";
import {
  addToListData,
  addToResource,
  requestDataById,
  RequestDataByIdPayload,
  requestListData,
  RequestManyPayload,
} from "./resourcesSlice";
import { RootState } from "./store";

/**
 * Field used for keeping track of ids for epic
 * @example
 *  const resources = { companies: { companyId4444: true } };
 */
const resourceMeta: Struct<Map<string, boolean>> = {};

/**
 * Debaunce all request for 100ms, to see if there is
 * more request for same resource by id. Combine ids
 * in one request
 */
export const fetchByIdEpic: Epic<
  PayloadAction<RequestDataByIdPayload>,
  any,
  RootState
> = (action$, state$) =>
  action$.pipe(
    ofType(requestDataById.type),
    tap(action => {
      const { resourceId, resourceName } = action.payload;
      if (!resourceMeta[resourceName]) {
        resourceMeta[resourceName] = new Map();
      }
      resourceMeta[resourceName]?.set(resourceId, true);
    }),
    debounceTime(100),
    map(action => {
      const { resourceName } = action.payload;
      const ids = Array.from(resourceMeta[resourceName]?.keys());
      let baseUrl = `companies/${state$.value.admin.url.companyId}/${resourceName}`;
      if (resourceName === "users") baseUrl = "auth/users";
      return defer(() =>
        dataProvider
          .getByIds<WithId>(baseUrl, { ids })
          .then(data => ({ data, resourceName })),
      ).pipe(retry(1));
    }),
    mergeMap(action =>
      action.pipe(
        tap(value => resourceMeta[value.resourceName]?.clear()),
        map(({ data, resourceName }) => addToResource({ data, resourceName })),
      ),
    ),
  );

/** List of all fetched urls as a map */
const urlsToFetch = new Map<string, boolean>();
// It's dirty but i don't know rxjs verry well, so for now
// it does the job
export const fetchManyEpic: Epic<
  PayloadAction<RequestManyPayload>,
  any,
  RootState
> = (action$, state$) =>
  action$.pipe(
    ofType(requestListData.type),
    filter(action => urlsToFetch.get(action.payload.url) !== true),
    tap(action => urlsToFetch.set(action.payload.url, true)),
    mergeMap(({ payload: { url, resourceName } }) =>
      defer(() =>
        dataProvider
          .getMany(url)
          .then(response => ({ response, url, resourceName })),
      ).pipe(retry(1)),
    ),
    tap(action => wait(30000).then(() => urlsToFetch.delete(action.url))),
    map(({ response, resourceName, url }) =>
      addToListData({ response, url, resourceName }),
    ),
  );

// export const waitAuth: Epic<Action, any, RootState> = (action$, state$) =>
//   action$.pipe(
//     ofType(requestListData.type, requestDataById.type),
//     filter(action => {
//       console.log(state$.value.auth.isInited);

//       return !state$.value.auth.isInited;
//     }),
//     debounceTime(5500),
//     tap(val => console.log(val)),
//   );

export const fetchEpics = combineEpics(fetchByIdEpic, fetchManyEpic);
