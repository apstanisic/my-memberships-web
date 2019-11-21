import { Padding } from "components/common/Padding";
import { AppScaffold } from "components/Scaffold/Scaffold";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { CompanyRouter } from "./Company/CompanyHomePage";
import { Dashboard } from "./Dashboard";
import { UserResource } from "./User/UserResource";

export function AdminPanel() {
  return (
    <AppScaffold>
      <Padding size={3}>
        <Switch>
          <Route path="/admin-panel/companies/:companyId">
            <CompanyRouter />
          </Route>
          <Route path="/admin-panel/users">
            <UserResource />
          </Route>
          <Route path="/admin-panel">
            <Dashboard />
          </Route>
        </Switch>
      </Padding>
    </AppScaffold>
  );
}
