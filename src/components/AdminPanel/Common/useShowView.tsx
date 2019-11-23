import { IconButton, Typography } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import qs from "query-string";
import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { dataProvider } from "src/components/dataProvider";
import { setUrlData } from "src/store/adminSlice";
import { WithId } from "../../../types";
import { AppIcons } from "../Icons";
import { useProvider } from "../useProvider";
import { useDeleteConfirmation } from "./useDeleteConfirmation";
import { useUrls } from "./useUrls";

type ShowData<T> = [T | undefined, React.ComponentType<any>];

export function useShowView<T extends WithId>(
  name: string,
  transform?: (val: any) => T,
): ShowData<T> {
  const dispatch = useDispatch();
  const { resourceId } = useParams<{ resourceId: string }>();
  const { search } = useLocation();
  dispatch(setUrlData({ resourceId }));
  const urls = useUrls();
  const editPath = urls.edit();
  const listPath = urls.list();
  const deletePath = urls.remote();

  // const deleting = useDelete(() => dataProvider.delete(remotePath));
  const deleteFunc = (res?: WithId) => dataProvider.delete(deletePath);
  const onDelete = useDeleteConfirmation(deleteFunc);

  const resource = useProvider({
    transform,
    resourceName: name,
    refetch: qs.parse(search).refetch !== "false",
  });
  const history = useHistory();

  const editButton = (
    <IconButton onClick={() => history.push(editPath)}>
      <AppIcons.Edit />
    </IconButton>
  );

  const backButton = (
    <IconButton onClick={() => history.push(listPath)}>
      <AppIcons.ArrowBack />
    </IconButton>
  );

  const deleteButton = (
    <IconButton onClick={() => resource && onDelete(resource)}>
      <Delete />
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
          {deleteButton}
          {/* {deleting.button} */}
        </div>
      </div>
    </Fragment>
  );

  return [resource, Header];
}
