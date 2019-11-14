import React from "react";
import { Route, Switch } from "react-router-dom";
import { Login } from "./Login";
import { Register } from "./Register";

export function Auth() {
  return (
    <Switch>
      <Route path="/auth/login">
        <Login />
      </Route>
      <Route path="/auth/register">
        <Register />
      </Route>
    </Switch>
  );
}
