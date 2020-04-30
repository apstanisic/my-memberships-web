import { Hidden, ListItem, ListItemText } from "@material-ui/core";
import React, { Fragment } from "react";

interface Props {
  name: any;
  val: any;
  secondary?: string;
}

/**
 * This is single row in detailed view. It is responsive, so it should be always used.
 */
export function ShowViewRow({ name, val, secondary }: Props) {
  return (
    <Fragment>
      <Hidden xsDown>
        <ListItem className="flex justify-between">
          <ListItemText primary={name} />
          <ListItemText primary={val ?? "Not entered"} className="text-right" />
        </ListItem>
      </Hidden>
      <Hidden smUp>
        <ListItem>
          <div>
            <div className="text-gray-600 pt-1">{name}</div>
            <ListItemText primary={val ?? "Not entered"} secondary={secondary} />
          </div>
        </ListItem>
      </Hidden>
    </Fragment>
  );
}
