import { PayloadAction, Action, createNextState } from "@reduxjs/toolkit";
import { combineEpics, Epic, ofType } from "redux-observable";
import { defer } from "rxjs";
import {
  debounceTime,
  filter,
  map,
  mergeMap,
  retry,
  tap,
  merge,
  mergeAll,
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
import { cachedResourcesById } from "./tempCache";

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
    // Create map for storing ids for specific resource if it does not exist
    // Store id in that map
    tap(action => {
      const { resourceId, resourceName } = action.payload;
      if (!resourceMeta[resourceName]) {
        resourceMeta[resourceName] = new Map();
      }
      resourceMeta[resourceName]?.set(resourceId, true);
    }),
    // Wait 100ms before fetching to aggregate ids
    debounceTime(100),
    // For every resource name in meta object make one request with every ids
    map(() => {
      const resources = Object.keys(resourceMeta)
        .filter(resourceName => resourceMeta[resourceName]?.size > 0)
        .map(resourceName => {
          // Create array from map (easier then converting pojo)
          const ids = Array.from(resourceMeta[resourceName]?.keys());
          // Delete ids as soon as we have them locally
          resourceMeta[resourceName]?.clear();
          let baseUrl = `companies/${state$.value.admin.url.companyId}/${resourceName}`;
          // For now all resources except users are nested in company. (manual fix)
          if (resourceName === "users") baseUrl = "auth/users";
          // There is maybe better way to do this
          return defer(() =>
            dataProvider
              .getByIds<WithId>(baseUrl, { ids })
              .then(data => ({ data, resourceName })),
          ).pipe(retry(1));
        });
      return resources;
    }),
    // Merge all observables in one
    mergeAll(),
    mergeMap(action =>
      // For every server response
      action.pipe(
        tap(action => {
          const { data, resourceName } = action;
          const currentMap = cachedResourcesById.getValue();
          // Store them in observable
          data.forEach(item => {
            currentMap.set(`${resourceName}/${item.id}`, item);
          });
          // And create new map for observable (React can't detect map.set())
          cachedResourcesById.next(new Map(currentMap));
        }),
        // Clear keys for given resource
        // tap(value => resourceMeta[value.resourceName]?.clear()),
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
