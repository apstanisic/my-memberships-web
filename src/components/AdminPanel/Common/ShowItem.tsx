import { Hidden, ListItem, ListItemText } from "@material-ui/core";
import React, { Fragment } from "react";

interface Props {
  name: string;
  val: any;
}

export function ShowItem({ name, val }: Props) {
  return (
    <Fragment>
      <Hidden xsDown>
        <ListItem className="flex justify-between">
          <ListItemText primary={name} />
          <ListItemText primary={val} className="text-right" />
        </ListItem>
      </Hidden>
      <Hidden smUp>
        <ListItem>
          <ListItemText primary={val} secondary={name} />
        </ListItem>
      </Hidden>
    </Fragment>
  );
}
