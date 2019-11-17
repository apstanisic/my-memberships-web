import { Padding } from "components/common/Padding";
import { AppScaffold } from "components/Scaffold/Scaffold";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { CompanyHomePage } from "./Company/CompanyHomePage";
import { Dashboard } from "./Dashboard";

export function NewAdminPanel() {
  return (
    <AppScaffold>
      <Padding size={3}>
        <Switch>
          <Route path="/admin-panel/companies/:companyId">
            <CompanyHomePage />
          </Route>
          <Route path="/admin-panel">
            <Dashboard />
          </Route>
        </Switch>
      </Padding>
    </AppScaffold>
  );
}
