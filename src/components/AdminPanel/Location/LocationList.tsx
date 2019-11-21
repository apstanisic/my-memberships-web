import {
  Button,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography,
} from "@material-ui/core";
import MaterialTable from "material-table";
import React, { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { EmailField } from "../Common/EmailField";
import { useResource } from "../Common/useResource";
import { AppIcons } from "../Icons";
import { Location } from "./Location";
import { SwapVert } from "@material-ui/icons";
import { useUrls } from "../Common/useUrls";

export function LocationList() {
  const [locations, helpers] = useResource<Location>(Location.create);
  const urls = useUrls();

  return (
    <Fragment>
      {helpers.alertDialog}
      <Hidden xsDown>
        <MaterialTable
          {...helpers.config}
          title="Locations"
          columns={[
            { emptyValue: "No name", field: "name", title: "Name" },
            { field: "address", title: "Address" },
            { field: "phoneNumber", title: "Phone number" },
            {
              title: "Arrivals",
              render: ({ id }) => (
                <Link
                  to={`${urls.changeResource("arrivals")}?locationId=${id}`}
                >
                  <Button color="primary" startIcon={<SwapVert />}>
                    Arrivals
                  </Button>
                </Link>
              ),
            },
            helpers.CustomActions,
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
                onClick={() => helpers.show(location)}
                key={location.id}
              >
                <ListItemText
                  primary={location.name ?? "No name"}
                  secondary={location.address}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => helpers.edit(location)}
                  >
                    <AppIcons.Edit />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Hidden>
    </Fragment>
  );
}
