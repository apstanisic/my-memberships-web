import React from "react";
import { Route, Switch } from "react-router-dom";

interface Props {
  Edit?: React.ComponentType;
  Show?: React.ComponentType;
  List?: React.ComponentType;
  remoteUrl: string;
}

export function ResourceRouter({ Edit, Show, List, remoteUrl }: Props) {
  return (
    <Switch>
      <Route path={`/admin-panel/${remoteUrl}/:resourceId/edit`}>
        {Edit ? <Edit /> : ""}
      </Route>
      <Route path={`/admin-panel/${remoteUrl}/:resourceId/show`}>
        {Show ? <Show /> : ""}
      </Route>
      <Route path={`/admin-panel/${remoteUrl}`}>{List ? <List /> : ""}</Route>
    </Switch>
  );
}
