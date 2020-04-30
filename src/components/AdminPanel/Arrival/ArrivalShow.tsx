import React, { Fragment } from "react";
import { Arrival } from "./Arrival";
import { Location } from "../Location/Location";
import { useShowView } from "../common/hooks/useShowView";
import { Card, CardContent, List, Link as MLink } from "@material-ui/core";
import { ShowViewRow } from "../common/ShowViewItem";
import dayjs from "dayjs";
import { ReferenceField } from "../common/ReferenceField";
import { User } from "src/core/auth/User";
import { EmailField } from "../common/EmailField";
import { Link } from "react-router-dom";
import { useUrls } from "../common/hooks/useUrls";
import { Subscription } from "../Subscription/Subscription";

export function ArrivalShow() {
  const { Header, resource: arrival } = useShowView({
    resourceName: Arrival.NAME,
    transform: Arrival.create,
    hasEdit: false,
  });
  const urls = useUrls();

  return (
    <Fragment>
      <Card className="max-w-3xl mx-auto">
        <CardContent>
          <Header title={`Arrival at ${dayjs(arrival?.arrivedAt).format("HH:mm DD.MM.") ?? ""}`} />
          <List>
            <ShowViewRow
              val={
                <ReferenceField
                  resourceId={arrival?.locationId}
                  resourceName={Location.NAME}
                  render={(location: Location) => (
                    <MLink
                      component={Link}
                      to={urls.show({
                        resourceName: Location.NAME,
                        resourceId: arrival?.locationId,
                      })}
                    >
                      {location.name}
                    </MLink>
                  )}
                />
              }
              name="Location"
            />
            <ShowViewRow
              val={
                <MLink
                  component={Link}
                  to={urls.show({
                    resourceName: Subscription.NAME,
                    resourceId: arrival?.subscriptionId,
                  })}
                >
                  {arrival?.subscriptionId ?? ""}
                </MLink>
              }
              name="Subscription"
            />
            <ShowViewRow
              val={
                <ReferenceField
                  resourceId={arrival?.userId}
                  resourceName="users"
                  render={(user: User) => (
                    <MLink
                      component={Link}
                      to={urls.show({
                        resourceName: User.NAME,
                        resourceId: arrival?.userId,
                      })}
                    >
                      {user.name ?? ""}
                    </MLink>
                  )}
                />
              }
              name="User"
            />
            <ShowViewRow val={arrival?.address} name="Adrress" />
            <ShowViewRow
              val={dayjs(arrival?.arrivedAt).format("HH:mm DD.MM.YYYY.")}
              name="Arrived at"
            />
            <ShowViewRow
              val={
                arrival?.leftAt ? dayjs(arrival?.leftAt).format("HH:mm DD.MM.YYYY.") : "Not entered"
              }
              name="Left at"
            />
            {arrival?.leftAt && (
              <ShowViewRow
                name="Time spent"
                val={dayjs(arrival.arrivedAt).diff(arrival.leftAt, "minute") + " minutes"}
              />
            )}
          </List>
        </CardContent>
      </Card>
    </Fragment>
  );
}
