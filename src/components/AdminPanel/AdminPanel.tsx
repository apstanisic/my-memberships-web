import { Padding } from "components/common/Padding";
import { AppScaffold } from "components/Scaffold/Scaffold";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { CompanyRouter } from "./Company/CompanyHomePage";
import { Dashboard } from "./Dashboard";
import { UserResource } from "./User/UserResource";
import { Box } from "@material-ui/core";

export function AdminPanel() {
  return (
    <AppScaffold>
      <Box p={1}>
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
      </Box>
    </AppScaffold>
  );
}
