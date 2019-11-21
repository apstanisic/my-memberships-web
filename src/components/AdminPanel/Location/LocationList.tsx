import {
  Button,
  Hidden,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@material-ui/core";
import { SwapVert } from "@material-ui/icons";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useUrls } from "../Common/useUrls";
import { ResourceTable } from "../TestTable";

export function LocationList() {
  const urls = useUrls();

  return (
    <Fragment>
      <Hidden xsDown>
        {/* <MaterialTable {...helpers.config} title="Locations" /> */}
        <ResourceTable
          title="Locations"
          columns={[
            { emptyValue: "No name", field: "name", title: "Name" },
            { field: "address", title: "Address" },
            { field: "phoneNumber", title: "Phone number" },
            {
              title: "Arrivals",
              field: "name",
              render: ({ id }: any) => (
                <Link
                  to={`${urls.changeResource("arrivals")}?locationId=${id}`}
                >
                  <Button color="primary" startIcon={<SwapVert />}>
                    Arrivals
                  </Button>
                </Link>
              ),
            },
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
            {/* {locations.map(location => (
              <ListItem
                button
                // onClick={() => helpers.show(location)}
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
                    // onClick={() => helpers.edit(location)}
                  >
                    <AppIcons.Edit />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))} */}
          </List>
        </Paper>
      </Hidden>
    </Fragment>
  );
}
