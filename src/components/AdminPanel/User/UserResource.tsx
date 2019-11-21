import React from "react";
import { UserShow } from "./UserShow";
import { Switch, Route } from "react-router-dom";

export function UserResource() {
  return (
    <Switch>
      {/* Use resource id so you can use useShow, useResource... */}
      <Route path="/admin-panel/users/:resourceId/show">
        <UserShow />
      </Route>
    </Switch>
  );
}
