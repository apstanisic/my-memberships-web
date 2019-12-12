import React, { Fragment } from "react";
import { Arrival } from "./Arrival";
import { Location } from "../Location/Location";
import { useShowView } from "../Common/useShowView";
import { Card, CardContent, List, Link as MLink } from "@material-ui/core";
import { ShowViewItem } from "../Common/ShowViewItem";
import dayjs from "dayjs";
import { ReferenceField } from "../Common/ReferenceField";
import { User } from "src/core/auth/User";
import { EmailField } from "../Common/EmailField";
import { Link } from "react-router-dom";
import { useUrls } from "../Common/useUrls";
import { Subscription } from "../Subscription/Subscription";

export function ArrivalShow() {
  const [arrival, Header] = useShowView(Arrival.NAME, Arrival.create, {
    hasEdit: false,
  });
  const urls = useUrls();

  return (
    <Fragment>
      <Card className="max-w-3xl mx-auto">
        <CardContent>
          <Header
            title={`Arrival at ${dayjs(arrival?.arrivedAt).format(
              "HH:mm DD.MM.",
            ) ?? ""}`}
          />
          <List>
            <ShowViewItem
              val={
                <ReferenceField
                  resourceId={arrival?.locationId}
                  resourceName="locations"
                  render={(location: Location) => (
                    <MLink
                      component={Link}
                      to={
                        urls.changeResource(
                          Location.NAME,
                          arrival?.locationId,
                        ) + "/show"
                      }
                    >
                      {location.name}
                    </MLink>
                  )}
                />
              }
              name="Location"
            />
            <ShowViewItem
              val={
                <MLink
                  component={Link}
                  to={
                    urls.changeResource(
                      Subscription.NAME,
                      arrival?.subscriptionId,
                    ) + "/show"
                  }
                >
                  {arrival?.subscriptionId ?? ""}
                </MLink>
              }
              name="Subscription"
            />
            <ShowViewItem
              val={
                <ReferenceField
                  resourceId={arrival?.userId}
                  resourceName="users"
                  render={(user: User) => (
                    <MLink
                      component={Link}
                      to={
                        urls.changeResource(User.NAME, arrival?.userId) +
                        "/show"
                      }
                    >
                      {user.name ?? ""}
                    </MLink>
                  )}
                />
              }
              name="User"
            />
            <ShowViewItem val={arrival?.address} name="Adrress" />
            <ShowViewItem
              val={dayjs(arrival?.arrivedAt).format("HH:mm DD.MM.YYYY.")}
              name="Arrived at"
            />
            <ShowViewItem
              val={
                arrival?.leftAt
                  ? dayjs(arrival?.leftAt).format("HH:mm DD.MM.YYYY.")
                  : "Not entered"
              }
              name="Left at"
            />
            {arrival?.leftAt && (
              <ShowViewItem
                name="Time spent"
                val={
                  dayjs(arrival.arrivedAt).diff(arrival.leftAt, "minute") +
                  " minutes"
                }
              />
            )}
          </List>
        </CardContent>
      </Card>
    </Fragment>
  );
}
