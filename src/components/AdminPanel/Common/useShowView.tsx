import { IconButton, Typography, Box, Button } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import qs from "query-string";
import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { dataProvider } from "src/components/dataProvider";
import { setUrlData } from "src/store/adminSlice";
import { WithId } from "../../../types";
import { AppIcons } from "../Icons";
import { useProvider } from "../useProvider";
import { useUrls } from "./useUrls";
import { useSnackbar } from "notistack";

type ShowData<T> = [T | undefined, React.ComponentType<any>];

interface Options {
  hasDelete?: boolean;
  hasEdit?: boolean;
}

export function useShowView<T extends WithId>(
  name: string,
  transform?: (val: any) => T,
  options?: Options,
): ShowData<T> {
  const dispatch = useDispatch();
  const { resourceId } = useParams<{ resourceId: string }>();
  const { search } = useLocation();
  dispatch(setUrlData({ resourceId }));
  const urls = useUrls();
  const editPath = urls.edit();
  const listPath = urls.list();
  const deletePath = urls.remote();
  const snackbar = useSnackbar();
  const history = useHistory();

  // const deleting = useDelete(() => dataProvider.delete(remotePath));
  // const deleteFunc = (res?: WithId) => dataProvider.delete(deletePath);
  const deleteFunc = (res?: WithId) => {
    dataProvider
      .delete(deletePath)
      .then(res => {
        snackbar.enqueueSnackbar("Successfully deleted item", {
          variant: "success",
        });
        history.push(listPath);
      })
      .catch(() =>
        snackbar.enqueueSnackbar("Error deleting item", { variant: "error" }),
      );
  };
  // Refactor, leftover from useDeleteConfirmation
  const onDelete = deleteFunc;

  const resource = useProvider({
    transform,
    resourceName: name,
    refetch: qs.parse(search).refetch !== "false",
  });

  const editButton = (
    <IconButton onClick={() => history.push(editPath)}>
      <AppIcons.Edit />
    </IconButton>
  );

  // Add resource name to not confuse users where back is leading
  const backButton = (
    <Button
      onClick={() => history.push(listPath)}
      startIcon={<AppIcons.ArrowBack />}
    >
      {name}
    </Button>
    // <IconButton onClick={() => history.push(listPath)}>
    //     <AppIcons.ArrowBack />
    // </IconButton>
  );

  const deleteButton = (
    <IconButton onClick={() => resource && onDelete(resource)}>
      <Delete />
    </IconButton>
  );

  const Header = ({ title }: { title: string }) => {
    return (
      <Fragment>
        {/* {deleting.alert} */}
        <div className="flex justify-between items-center pb-4">
          {backButton}
          <Typography variant="h5" component="h2">
            {title}
          </Typography>
          <div className="flex">
            {options?.hasEdit !== false && editButton}
            {options?.hasDelete !== false && deleteButton}
            {/* {deleting.button} */}
          </div>
        </div>
      </Fragment>
    );
  };

  return [resource, Header];
}
