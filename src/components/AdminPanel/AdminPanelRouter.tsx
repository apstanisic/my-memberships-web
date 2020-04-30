import { Box } from "@material-ui/core";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { AppScaffold } from "src/components/Scaffold/AppScaffold";
import { CompanyRouter } from "./Company/CompanyHomePage";
import { AdminPanelDashboard } from "./AdminPanelDashboard";
import { UserResource } from "./User/UserResource";

export function AdminPanelRouter() {
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
            <AdminPanelDashboard />
          </Route>
        </Switch>
      </Box>
    </AppScaffold>
  );
}
