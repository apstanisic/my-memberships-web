import React from "react";
import { Route, Switch } from "react-router-dom";
import { LocationEdit } from "./LocationEdit";
import { LocationList } from "./LocationList";
import { LocationShow } from "./LocationShow";

export function LocationResource() {
  return (
    <Switch>
      <Route path="/admin-panel/companies/:companyId/locations/:locationId/edit">
        <LocationEdit />
      </Route>
      <Route path="/admin-panel/companies/:companyId/locations/:locationId/show">
        <LocationShow />
      </Route>
      <Route path="/admin-panel/companies/:companyId/locations">
        <LocationList />
      </Route>
    </Switch>
  );
}
