import MaterialTable from "material-table";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import CardMembershipIcon from "@material-ui/icons/CardMembership";
import React, { Fragment } from "react";
import { useResource } from "../Common/useResource";
import { Arrival } from "./Arrival";
import { useUrls } from "../Common/useUrls";
import { Link } from "react-router-dom";
import { Button, Link as MLink } from "@material-ui/core";
import { SwapVert } from "@material-ui/icons";
import { Subscription } from "../Subscription/Subscription";
import { Location } from "../Location/Location";
import { ReferenceField } from "../Common/ReferenceField";

export function ArrivalList(props: any) {
  const [arrivals, helpers] = useResource(Arrival.create);
  const url = useUrls();

  return (
    <MaterialTable
      {...helpers.config}
      title="Arrivals"
      columns={[
        {
          title: "Subscription",
          render: row => {
            const path = `${url.root()}/${Subscription.NAME}/${
              row.subscriptionId
            }/show`;
            return (
              <Link to={path}>
                <Button color="primary" startIcon={<CardMembershipIcon />}>
                  Subscription
                </Button>
              </Link>
            );
          },
        },
        {
          title: "Location",
          // render: row => (
          //   ),
          render: row => {
            const path = `${url.root()}/${Location.NAME}/${
              row.locationId
            }/show`;
            return (
              <MLink
                component={Link}
                to={path}
                className="whitespace-no-wrap flex items-center"
              >
                <ReferenceField
                  id={row.locationId ?? "dsa"}
                  resourceName="locations"
                  render={(location: Location) => (
                    <Fragment>
                      <LocationCityIcon />
                      <span className="pl-1">{location.name}</span>
                    </Fragment>
                  )}
                />
              </MLink>
            );
          },
        },
        { field: "arrivedAt", title: "Arrived at", type: "datetime" },
        {
          field: "leftAt",
          title: "Left at",
          type: "datetime",
          emptyValue: "Not entered",
        },
        // { field: "approvedBy", title: "Validated by" },
        ...helpers.CustomActions,
      ]}
    ></MaterialTable>
  );
}
