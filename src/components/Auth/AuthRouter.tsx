import React from "react";
import { Route, Switch } from "react-router-dom";
import { LoginPage } from "./LoginPage";
import { RegisterPage } from "./RegisterPage";

export function Auth() {
  return (
    <Switch>
      <Route path="/auth/login">
        <LoginPage />
      </Route>
      <Route path="/auth/register">
        <RegisterPage />
      </Route>
    </Switch>
  );
}
