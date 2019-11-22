import { PayloadAction } from "@reduxjs/toolkit";
import { dataProvider } from "components/dataProvider";
import { Struct, wait } from "core/utils/helpers";
import { Epic, ofType, combineEpics } from "redux-observable";
import { defer, merge } from "rxjs";
import {
  debounceTime,
  filter,
  map,
  mergeMap,
  retry,
  tap,
} from "rxjs/operators";
import { WithId } from "types";
import {
  addToListData,
  addToResource,
  requestDataById,
  requestListData,
  RequestDataByIdPayload,
  RequestManyPayload,
} from "./resourcesSlice";
import { RootState } from "./store";

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

/** List of all fetched urls as a map */
const urlsToFetch: Struct = {};

// It's dirty but i don't know rxjs verry well, so for now
// it does the job
export const fetchManyEpic: Epic<
  PayloadAction<RequestManyPayload>,
  any,
  RootState
> = (action$, state$) =>
  action$.pipe(
    ofType(requestListData.type),
    filter(action => urlsToFetch[action.payload.url] !== true),
    tap(action => (urlsToFetch[action.payload.url] = true)),
    mergeMap(({ payload: { url, resourceName } }) =>
      defer(() =>
        dataProvider
          .getMany(url)
          .then(response => ({ response, url, resourceName })),
      ).pipe(retry(1)),
    ),
    tap(action => wait(30000).then(() => delete urlsToFetch[action.url])),
    map(({ response, resourceName, url }) =>
      addToListData({ response, url, resourceName }),
    ),
  );

export const fetchEpics = combineEpics(fetchByIdEpic, fetchManyEpic);
