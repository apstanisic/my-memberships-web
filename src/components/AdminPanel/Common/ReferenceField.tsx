import React, { useEffect } from "react";
import { useUrls } from "./useUrls";
import { urlHelper } from "store/adminSlice";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { UUID } from "types";
import { useProvider } from "../useProvider";
import { LinearProgress } from "@material-ui/core";

interface Props {
  resourceName: string;
  id: string;
  // store: Record<string, any[]>;
  render: (val: any) => JSX.Element;
  rootResource?: boolean; // Resource is not nested inside company
  prefix?: string;
}

/**
 * Store is object where keys are resoure names
 * Every resource name is an object where keys are
 * entity id, and value is object with 2 fields
 * First is id where we have entity id again.
 * Second is callback function to be called when
 * data is fetched
 */

export function ReferenceField({
  resourceName,
  id,
  render,
  rootResource,
  prefix,
}: Props) {
  const data = useProvider({
    resourceName,
    rootResource,
    prefix,
    resourceId: id,
    refetch: false,
  });

  if (!data) return <LinearProgress className="w-full" style={{ height: 5 }} />;
  return render(data);

  // useEffect(() => {}, [resourceName, id]);
  // const resource = useSelector(
  //   (state: RootState) => state.admin.resources[resourceName],
  // );
  // const value: any | undefined = useGetRefValue(resourceName, id);
  // const data: ReferenceStore = {};
  //   data[resourceName]?.[id]?.
  //   Object.keys(storeTest.roles).map(id => {
  // const keys = storeTest.roles?.[id];
  /*
    fetchDataById(keys).then(data => {
        data.forEach(entity => {
            storeTest.roles?.[entity.id].func.map(fucn1)
        })
    })
 */
  // if (!value) return <div>Placeholder</div>;
  // return <div>{value}</div>;
  //   });
  //   if (!store[resourceName]) store[resourceName] = [];
  //   (store?.[resourceName] as any[]).push(id);
  //   const urls = useSelector((state: RootState) => state.admin.url);
  //   urlHelper.remote({ ...urls, resourceName, resourceId: id });
}
