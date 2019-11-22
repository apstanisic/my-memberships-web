import React from "react";
import { Route, Switch, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUrlData } from "src/store/adminSlice";
import { useUrls } from "./useUrls";

interface Props {
  Edit?: React.ComponentType;
  Show?: React.ComponentType;
  List?: React.ComponentType;
  Create?: React.ComponentType;
  name: string;
}

export function ResourceRouter({ Create, Edit, Show, List, name }: Props) {
  const dispatch = useDispatch();
  dispatch(setUrlData({ resourceName: name }));
  const url = useUrls().list();

  return (
    <Switch>
      <Route path={`${url}/:resourceId/edit`}>{Edit ? <Edit /> : ""}</Route>
      <Route path={`${url}/:resourceId/show`}>{Show ? <Show /> : ""}</Route>
      <Route path={`${url}/create`}>{Create ? <Create /> : ""}</Route>
      <Route path={url}>{List ? <List /> : ""}</Route>
    </Switch>
  );
}
