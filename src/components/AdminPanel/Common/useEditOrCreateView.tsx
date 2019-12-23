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

type ReturnData<T> = [
  T | Struct<keyof T>,
  (data: Partial<T>, redirect?: boolean | any) => Promise<T | undefined>,
  () => any,
];

interface Props<T> {
  transform?: (val: any) => T;
  method?: "POST" | "PUT";
  changeDefaultValue?: (val: any) => any;
}

export function useEditOrCreateView<T extends WithId>({
  transform,
  method,
  changeDefaultValue,
}: Props<T> = {}): ReturnData<T> {
  const history = useHistory();
  const dispatch = useDispatch();
  const { resourceId } = useParams();
  const snackbar = useSnackbar();
  dispatch(setUrlData({ resourceId }));
  const url = useUrls();
  const resourceName = url.resourceName();

  const resource = useProvider<T>({ resourceName });

  const [oldData, setOldData] = useState<T | undefined>(resource);

  const onSubmit = async (newData: Partial<T>, redirect = true) => {
    // if editing
    if (resource) {
      setOldData({ ...resource });
      dispatch(
        addToResource({ resourceName, data: [{ ...resource, ...newData }] }),
      );
    }
    // if (method === "PUT") history.push(url.show() + "?refetch=false");
    try {
      const val = await dataProvider.createOrUpdate<T>(url.remoteBase(), {
        method: method ?? "PUT",
        data: newData,
      });
      dispatch(addToResource({ resourceName, data: [val.data] }));

      if (typeof redirect !== "boolean" || redirect === true) {
        history.push(url.show(val.data.id));
      }
      snackbar.enqueueSnackbar(
        method === "POST"
          ? `Successfully added new item to ${resourceName}.`
          : "Successfully updated item.",
        { variant: "success" },
      );
      return val.data;
    } catch (error) {
      snackbar.enqueueSnackbar("Problem creating item.", {
        variant: "error",
      });
      console.log(JSON.stringify(error));

      if (oldData) dispatch(addToResource({ resourceName, data: [oldData] }));
    }
  };

  const goBack = () => {
    if (window.confirm("Are you sure?")) history.goBack();
  };
  const value = method === "PUT" ? resource ?? {} : {};
  changeDefaultValue?.(value);

  return [value, onSubmit, goBack];
}
