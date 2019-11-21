import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  IconButton,
} from "@material-ui/core";
import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { RootState, AppDispatch } from "store/store";
import { Menu } from "@material-ui/icons";
import { toggleSidebar } from "store/uiSlice";
import { logoutUser } from "components/Auth/authSlice";

export function ScaffoldAppBar({ classes }: { classes?: any }) {
  const { auth } = useSelector((state: RootState) => state);
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={() => dispatch(toggleSidebar())}
          className={classes.menuButton}
        >
          <Menu />
        </IconButton>
        <Link to="/">
          <Typography variant="h6" component="span">
            <h1>My subscriptions</h1>
          </Typography>
        </Link>
        <div className="ml-auto">
          {auth.isLogged ? (
            <Fragment>
              <Link to="/admin-panel">
                <Button color="inherit">Admin Panel</Button>
              </Link>
              <Button
                color="inherit"
                onClick={() => {
                  dispatch(logoutUser());
                  history.push("/");
                }}
              >
                Logout
              </Button>
            </Fragment>
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
