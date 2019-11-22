import { Hidden, ListItem, ListItemText } from "@material-ui/core";
import React, { Fragment } from "react";

interface Props {
  name: any;
  val: any;
  secondary?: string;
}

export function ShowViewItem({ name, val, secondary }: Props) {
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
          <div>
            <div className="text-gray-600 pt-1">{name}</div>
            <ListItemText primary={val} secondary={secondary} />
          </div>
        </ListItem>
      </Hidden>
    </Fragment>
  );
}
