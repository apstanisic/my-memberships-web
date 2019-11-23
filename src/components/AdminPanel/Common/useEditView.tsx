import { dataProvider } from "src/components/dataProvider";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { setUrlData } from "src/store/adminSlice";
import { WithId } from "src/types";
import { useProvider } from "../useProvider";
import { useUrls } from "./useUrls";
import { addToResource } from "src/store/resourcesSlice";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { Struct } from "src/core/utils/helpers";

type ReturnData<T> = [T | Struct, (data: Partial<T>) => any, () => any];

export function useEditOrCreateView<T extends WithId>(
  transform?: (val: any) => T,
  method?: "POST" | "PUT",
): ReturnData<T> {
  const history = useHistory();
  const dispatch = useDispatch();
  const { resourceId } = useParams();
  const snackbar = useSnackbar();
  dispatch(setUrlData({ resourceId }));
  const url = useUrls();
  const resourceName = url.resourceName();

  const resource = useProvider<T>({ resourceName });
  const [oldData, setOldData] = useState<T | undefined>(resource);

  const onSubmit = (newData: Partial<T>) => {
    // if editing
    if (resource) {
      setOldData({ ...resource });
      dispatch(
        addToResource({ resourceName, data: [{ ...resource, ...newData }] }),
      );
    }
    if (method === "PUT") history.push(url.show() + "?refetch=false");
    dataProvider
      .createOrUpdate(url.remoteBase(), {
        method: method ?? "PUT",
        data: newData,
      })
      .then(val => {
        dispatch(addToResource({ resourceName, data: [val.data] }));
        history.push(url.show(val.data.id) + "?refetch=false");
        snackbar.enqueueSnackbar(
          method === "POST"
            ? `Successfully added new item to ${resourceName}.`
            : "Successfully updated item.",
          { variant: "success" },
        );
      })
      .catch(error => {
        snackbar.enqueueSnackbar(error, { variant: "error" });
        if (oldData) dispatch(addToResource({ resourceName, data: [oldData] }));
      });
  };

  const goBack = () => {
    if (window.confirm("Are you sure?")) history.goBack();
  };

  return [method === "PUT" ? resource ?? {} : {}, onSubmit, goBack];
}
