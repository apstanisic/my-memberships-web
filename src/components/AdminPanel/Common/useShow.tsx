import { IconButton, Typography } from "@material-ui/core";
import { dataProvider } from "components/dataProvider";
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { setUrlData, urlHelper } from "store/adminSlice";
import { RootState } from "store/store";
import { AppIcons } from "../Icons";
import { useProvider } from "../useProvider";
import { useDeleteConfirmation } from "./useDeleteConfirmation";
import { WithId } from "./../../../types";

type ShowData<T> = [
  T | undefined,
  React.ComponentType<any>,
  // {
  //   editButton: JSX.Element;
  //   backButton: JSX.Element;
  //   deleteButton: JSX.Element;
  //   deleting: {
  //     button: JSX.Element;
  //     alert: JSX.Element;
  //   };
  // },
];

export function useShow<T extends WithId>(
  name: string,
  transform?: (val: any) => T,
): ShowData<T> {
  const dispatch = useDispatch();
  const { resourceId } = useParams<{ resourceId: string }>();
  dispatch(setUrlData({ resourceId }));
  const path = useSelector((state: RootState) => state.admin.url);
  const editPath = urlHelper.edit(path);
  const remotePath = urlHelper.remote(path);

  // const deleting = useDelete(() => dataProvider.delete(remotePath));
  const resource = useProvider({ transform, resourceName: name });
  const history = useHistory();

  const editButton = (
    <IconButton onClick={() => history.push(editPath)}>
      <AppIcons.Edit />
    </IconButton>
  );

  const backButton = (
    <IconButton onClick={() => history.goBack()}>
      <AppIcons.ArrowBack />
    </IconButton>
  );

  const Header = ({ title }: { title: string }) => (
    <Fragment>
      {/* {deleting.alert} */}
      <div className="flex justify-between items-center pb-4">
        {backButton}
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <div className="flex">
          {editButton}
          {/* {deleting.button} */}
        </div>
      </div>
    </Fragment>
  );

  return [resource, Header];
}
