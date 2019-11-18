import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UUID, WithId } from "types";

interface Resources<T extends WithId = any> {
  [name: string]: T[] | undefined;
}

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    companyId: undefined as string | undefined,
    resources: {} as Resources
  },
  reducers: {
    setCompany(state, action: PayloadAction<UUID | undefined>) {
      state.companyId = action.payload;
    },
    // Material table throws errors if I don't deep clone new data
    // It wants to nobady touch it
    addToResource(
      state,
      action: PayloadAction<{ resource: string; data: WithId[] }>
    ) {
      let resource: WithId[] | undefined =
        state.resources[action.payload.resource];
      if (resource) {
        let newState = resource;
        resource.forEach((storedItem, i) => {
          action.payload.data
            .map(item => ({ ...item }))
            .forEach(item => {
              if (storedItem.id !== item.id) {
                newState.push(item);
              } else {
                newState.splice(i, 1, item);
              }
            });
        });
        state.resources[action.payload.resource] = newState;
      } else {
        state.resources[
          action.payload.resource
        ] = action.payload.data.map(i => ({ ...i }));
      }
    }
  }
});

export const { setCompany, addToResource } = adminSlice.actions;
export const adminReducer = adminSlice.reducer;
