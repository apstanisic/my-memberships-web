import CssBaseline from "@material-ui/core/CssBaseline";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { ScaffoldAppBar } from "./AppBar";
import { AppDrawer } from "./AppDrawer";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    drawer: {
      [theme.breakpoints.up("md")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up("md")]: {
        zIndex: theme.zIndex.drawer + 1,
        // Is this bellow if app bar does not go over drawer
        // width: `calc(100% - ${drawerWidth}px)`,
        // marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
      background: "#e0e0e0",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3, 1, 3, 1),
      // paddingBottom: theme.spacing(2),
      [theme.breakpoints.up("md")]: {
        maxWidth: `calc(100% - ${drawerWidth}px)`,
      },
      [theme.breakpoints.down("sm")]: {
        maxWidth: `100%`,
      },
    },
  }),
);

export function AppScaffold(props: any) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <CssBaseline /> */}
      <ScaffoldAppBar classes={classes} />
      <AppDrawer classes={classes} />

      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children || <span></span>}
      </main>
    </div>
  );
}
