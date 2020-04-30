import { useSnackbar } from "notistack";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { dataProvider } from "src/components/dataProvider";
import { setUrlData } from "src/store/adminSlice";
import { addToResource } from "src/store/resourcesSlice";
import { WithId } from "src/types";
import { useProvider } from "./useProvider";
import { useUrls } from "./useUrls";
import { Struct } from "src/core/utils/helpers";
import { useFormik, FormikConfig } from "formik";
import { getFormikConfig } from "../formikConfig";

interface ReturnData<T> {
  resource: T | Struct<keyof T>;
  onSubmit: (data: Partial<T>, redirect?: boolean | any) => Promise<T | undefined>;
  goBack: () => any;
  form: ReturnType<typeof useFormik>;
}

interface Props<T> {
  transform?: (val: any) => T;
  method?: "POST" | "PUT";
  changeDefaultValue?: (val: any) => any;
  config?: Partial<FormikConfig<any>>;
}

/**
 * Generates form and other things for creating or editing view.
 * Often times, edit and create views are very similar, so it easier to have
 * one hook, to dynamically get necessary data
 */
export function useEditOrCreateView<T extends WithId>({
  transform,
  method,
  changeDefaultValue,
  config: formikConfig,
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
      dispatch(addToResource({ resourceName, data: [{ ...resource, ...newData }] }));
    }
    // if (method === "PUT") history.push(url.show() + "?refetch=false");
    try {
      const val = await dataProvider.createOrUpdate<T>({
        method: method ?? "PUT",
        data: newData,
        resource: url.remoteBase(),
      });
      dispatch(addToResource({ resourceName, data: [val.data] }));

      if (typeof redirect !== "boolean" || redirect === true) {
        history.push(url.show({ resourceId: val.data.id }));
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

  const form = useFormik(
    getFormikConfig({
      ...(formikConfig ?? {}),
      onSubmit: (values, formikHelpers) => onSubmit(values),
      initialValues: value,
    }),
  );

  return { resource: value, onSubmit, goBack, form };
}
