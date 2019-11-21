import { Button, Link as MLink } from "@material-ui/core";
import CardMembershipIcon from "@material-ui/icons/CardMembership";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { ReferenceField } from "../Common/ReferenceField";
import { useUrls } from "../Common/useUrls";
import { Location } from "../Location/Location";
import { Subscription } from "../Subscription/Subscription";
import { ResourceTable } from "../TestTable";
import { userReference } from "../User/UserReference";
import { Arrival } from "./Arrival";

export function ArrivalList() {
  const url = useUrls();

  return (
    <Fragment>
      <ResourceTable
        title="Arrivals"
        // data={arrivals}
        transform={Arrival.create}
        columns={[
          { title: "User", render: row => userReference(row.userId) },
          {
            title: "Location",
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
                    resourceId={row.locationId ?? "dsa"}
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
          { field: "leftAt", title: "Left at", emptyValue: "Not entered" },
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
        ]}
      />
    </Fragment>
  );
}
