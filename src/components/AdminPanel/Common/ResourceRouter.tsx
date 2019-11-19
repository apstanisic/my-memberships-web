import React from "react";
import { Route, Switch, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUrlData } from "store/adminSlice";

interface Props {
  Edit?: React.ComponentType;
  Show?: React.ComponentType;
  List?: React.ComponentType;
  Create?: React.ComponentType;
  // remoteUrl: string;
  name: string;
}

export function ResourceRouter({ Create, Edit, Show, List, name }: Props) {
  const { companyId } = useParams<{ companyId: string }>();
  const dispatch = useDispatch();
  dispatch(setUrlData({ companyId, resourceName: name }));
  const basePath = `/admin-panel/companies/${companyId}/${name}`;

  return (
    <Switch>
      <Route exact path={`${basePath}`}>
        {List ? <List /> : ""}
      </Route>
      <Route exact path={`${basePath}/create`}>
        {Create ? <Create /> : ""}
      </Route>
      <Route path={`${basePath}/:resourceId/edit`}>
        {Edit ? <Edit /> : ""}
      </Route>
      <Route path={`${basePath}/:resourceId/show`}>
        {Show ? <Show /> : ""}
      </Route>
    </Switch>
  );
}
