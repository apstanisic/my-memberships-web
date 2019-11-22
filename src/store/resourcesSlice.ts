import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import cloneDeep from "lodash-es/cloneDeep";
import defaults from "lodash-es/defaults";
import { PaginationResult, UUID, WithId } from "types";

/** Cached resource interface */
interface Resources<T extends WithId = any> {
  [name: string]: Record<UUID, T>;
}

interface GetManyResponses {
  [url: string]: PaginationResult;
}

export interface RequestManyPayload {
  url: string;
  resourceName?: string;
}

/** Resouce and id for data that we want */
export interface RequestDataByIdPayload {
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
  initialState: {
    resources: {} as Resources,
    responsesFromGetMany: {} as GetManyResponses,
  },
  reducers: {
    // Notify epic to fetch data
    requestDataById(_, __: PayloadAction<RequestDataByIdPayload>) {},
    requestListData(_, __: PayloadAction<RequestManyPayload>) {},
    // When fetchEpic finishes, it calls this method to add resource to store
    // Anyone can call this method when he/she wants to store new data to store
    addToResource(state, action: PayloadAction<AddToResourcePayload>) {
      const { resourceName, data } = action.payload;
      // If resurce does not already exist, create it
      defaults(state.resources, { [resourceName]: {} });

      data.forEach(
        item => (state.resources[resourceName][item.id] = cloneDeep(item)),
      );
    },
    addToListData(
      state,
      action: PayloadAction<{
        url: string;
        response: PaginationResult;
        resourceName?: string;
      }>,
    ) {
      state.responsesFromGetMany[action.payload.url] = action.payload.response;
      const { resourceName } = action.payload;
      if (resourceName) {
        defaults(state.resources, { [resourceName]: {} });
        action.payload.response.data.forEach(item => {
          if (typeof item?.id !== "string") return;
          state.resources[resourceName][item.id] = item;
        });
      }
    },
  },
});

export const {
  addToResource,
  requestDataById,
  requestListData,
  addToListData,
} = resourcesSlice.actions;
export const resourcesReducer = resourcesSlice.reducer;
