import { Hidden, List, ListItem, ListItemText, Paper, Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import { ResourceTable } from "../common/table/ResourceTable";
import { ArrivalFilterButton } from "./ArrivalFilterButton";
import { Location } from "./Location";

export function LocationList() {
  return (
    <Fragment>
      <Hidden xsDown>
        <ResourceTable
          title="Locations"
          transform={Location.create}
          columns={[
            { emptyValue: "No name", field: "name", title: "Name" },
            { field: "address", title: "Address" },
            { field: "phoneNumber", title: "Phone number" },
            {
              title: "Arrivals",
              render: ({ id }) => <ArrivalFilterButton id={id} filterField={Location.ID} />,
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
          </List>
        </Paper>
      </Hidden>
    </Fragment>
  );
}
