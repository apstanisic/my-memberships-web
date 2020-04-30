import { Button, Link as MLink } from "@material-ui/core";
import CardMembershipIcon from "@material-ui/icons/CardMembership";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { ReferenceField } from "../common/ReferenceField";
import { useUrls } from "../common/hooks/useUrls";
import { Location } from "../Location/Location";
import { Subscription } from "../Subscription/Subscription";
import { ResourceTable } from "../common/table/ResourceTable";
import { UserReference } from "../User/UserReference";
import { Arrival } from "./Arrival";

export function ArrivalList() {
  const url = useUrls();

  return (
    <Fragment>
      <ResourceTable
        title="Arrivals"
        // data={arrivals}
        actions={{ hasEdit: false }}
        transform={Arrival.create}
        columns={[
          { field: "arrivedAt", title: "Arrived at", type: "datetime" },
          { title: "User", render: row => <UserReference id={row.userId} /> },
          {
            title: "Location",
            render: row => {
              const path = url.show({ resourceName: Location.NAME, resourceId: row.locationId });
              return (
                <MLink component={Link} to={path} className="whitespace-no-wrap flex items-center">
                  <ReferenceField
                    resourceId={row.locationId}
                    resourceName={Location.NAME}
                    render={(location: Location) => (
                      <Fragment>
                        {/* <LocationCityIcon /> */}
                        <span className="pl-1">{location.name}</span>
                      </Fragment>
                    )}
                  />
                </MLink>
              );
            },
          },
          { field: "leftAt", title: "Left at", emptyValue: "Not entered" },
          {
            title: "Subscription",
            render: row => {
              const path = url.show({
                resourceName: Subscription.NAME,
                resourceId: row.subscriptionId,
              });
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
