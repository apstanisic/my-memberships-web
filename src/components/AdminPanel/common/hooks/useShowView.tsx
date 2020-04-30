import { IconButton, Typography, Box, Button } from "@material-ui/core";
import { Delete, Edit, ArrowBack } from "@material-ui/icons";
import qs from "query-string";
import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { dataProvider } from "src/components/dataProvider";
import { setUrlData } from "src/store/adminSlice";
import { WithId } from "../../../../types";
import { useProvider } from "./useProvider";
import { useUrls } from "./useUrls";
import { useSnackbar } from "notistack";

interface Response<T> {
  resource: T | undefined;
  Header: React.ComponentType<any>;
}

interface Params<T> {
  resourceName: string;
  transform?: (val: any) => T;
  hasDelete?: boolean;
  hasEdit?: boolean;
}

/** This hook provided necessary data for displaying detailed page of resource */
export function useShowView<T extends WithId>({
  transform,
  resourceName,
  ...params
}: Params<T>): Response<T> {
  const dispatch = useDispatch();
  const { resourceId } = useParams<{ resourceId: string }>();
  const { search } = useLocation();
  dispatch(setUrlData({ resourceId }));
  const urls = useUrls();
  const editPath = urls.edit();
  const listPath = urls.list();
  const deletePath = urls.remoteItem();
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
      .catch(() => snackbar.enqueueSnackbar("Error deleting item", { variant: "error" }));
  };
  // Refactor, leftover from useDeleteConfirmation
  const onDelete = deleteFunc;

  const resource = useProvider({
    transform,
    resourceName,
    refetch: qs.parse(search).refetch !== "false",
  });

  const editButton = (
    <IconButton onClick={() => history.push(editPath)}>
      <Edit />
    </IconButton>
  );

  // Add resource name to not confuse users where back is leading
  const backButton = (
    <Button onClick={() => history.push(listPath)} startIcon={<ArrowBack />}>
      {resourceName}
    </Button>
    // <IconButton onClick={() => history.push(listPath)}>
    //     <ArrowBack />
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
            {params.hasEdit !== false && editButton}
            {params.hasDelete !== false && deleteButton}
            {/* {deleting.button} */}
          </div>
        </div>
      </Fragment>
    );
  };

  return { resource, Header };
}
