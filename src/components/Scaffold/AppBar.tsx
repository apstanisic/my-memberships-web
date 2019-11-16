import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import { auth } from "core/auth/Auth";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export function ScaffoldAppBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" component="span">
          <h1>HomePage</h1>
        </Typography>
        <div className="ml-auto">
          {auth.isLogged ? (
            <Link to="/panel">
              <Button color="inherit">Admin Panel</Button>
            </Link>
          ) : (
            <Fragment>
              <Link to="/auth/login">
                <Button color="inherit">Login</Button>
              </Link>
              <Link to="/auth/register">
                <Button color="inherit">Register</Button>
              </Link>
            </Fragment>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}
