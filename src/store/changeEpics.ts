import { PayloadAction } from "@reduxjs/toolkit";
import { Epic } from "redux-observable";
import { tap } from "rxjs/operators";
import { RequestDataByIdPayload } from "./resourcesSlice";
import { RootState } from "./store";
import { tempCache } from "./tempCache";

export const deleteEpic: Epic<
  PayloadAction<RequestDataByIdPayload>,
  any,
  RootState
> = (action$, state$) =>
  action$.pipe(
    // ofType(requestListData.type),
    // filter(action => urlsToFetch.get(action.payload.url) !== true),
    // tap(action => {
    // const { resourceId, resourceName } = action.payload;
    // tempCache.ids.delete(`${resourceName}/${resourceId}`);
    // }),
    // After resource is updated, find pages where it belongs and delete
    // page. So it does not show old results (maybe update instead of delete)
    tap(action => {
      for (const key of tempCache.pages.keys()) {
        if (key.startsWith(action.payload.resourceName)) {
          const existInPage = tempCache.pages
            .get(key)
            ?.data.find(item => item.id === action.payload.resourceId);
          if (existInPage) {
            // If exist in page, delete that page
            tempCache.pages.delete(key);
          }
        }
      }
    }),
  );
