import CssBaseline from "@material-ui/core/CssBaseline";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { ScaffoldAppBar } from "./AppBar";
import { AppDrawer } from "./AppDrawer";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0
      }
    },
    appBar: {
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth
      }
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none"
      }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      [theme.breakpoints.up("sm")]: {
        maxWidth: `calc(100% - ${drawerWidth}px)`
      }
    }
  })
);

export function AppScaffold(props: any) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <ScaffoldAppBar classes={classes} />
      <AppDrawer classes={classes} />

      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children || <span></span>}
      </main>
    </div>
  );
}
