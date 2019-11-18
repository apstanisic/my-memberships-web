import {
  Hidden,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography
} from "@material-ui/core";
import MaterialTable from "material-table";
import React, { Fragment } from "react";
import { EmailField } from "../Common/EmailField";
import { useResource } from "../Common/useResource";
import { Location } from "./Location";

export function LocationList() {
  const [locations, helpers] = useResource<Location>(Location.NAME);

  return (
    <Fragment>
      <Hidden xsDown>
        <MaterialTable
          {...helpers.config}
          title="Locations"
          columns={[
            { field: "name", emptyValue: "No name", title: "Name" },
            { field: "address", title: "Address" },
            { field: "phoneNumber", title: "Phone number" },
            {
              title: "Email",
              render: ({ email }) => <EmailField email={email} />
            },
            ...helpers.viewAndEdit
          ]}
        />
      </Hidden>
      <Hidden smUp>
        <Paper>
          <List>
            <ListItem>
              <ListItemText
                primary={
                  <Typography component="span" variant="h5">
                    Locations
                  </Typography>
                }
              />
            </ListItem>
            {locations.map(location => (
              <ListItem
                button
                onClick={() => helpers.view(location)}
                key={location.id}
              >
                <ListItemText
                  primary={
                    location.name ??
                    `No name ${parseInt(Math.random() * 100 + "")}`
                  }
                  secondary={location.address}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Hidden>
    </Fragment>
  );
}
