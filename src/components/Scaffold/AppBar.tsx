import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  IconButton,
} from "@material-ui/core";
import { ShouldShow } from "../AdminPanel/Common/ShouldShow";
import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { RootState, AppDispatch } from "src/store/store";
import { Menu } from "@material-ui/icons";
import { toggleSidebar } from "src/store/uiSlice";
import { logoutUser } from "src/components/Auth/authSlice";
import { useIsInAdminPanel } from "../AdminPanel/Common/hooks/useIsInAdminPanel";

export function ScaffoldAppBar({ classes }: { classes?: any }) {
  const { auth } = useSelector((state: RootState) => state);
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const inAdminPanel = useIsInAdminPanel();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <ShouldShow show={inAdminPanel}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => dispatch(toggleSidebar())}
            className={classes.menuButton}
          >
            <Menu />
          </IconButton>
        </ShouldShow>
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
