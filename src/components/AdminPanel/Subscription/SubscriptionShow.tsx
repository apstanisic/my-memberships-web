import { Card, CardContent, List } from "@material-ui/core";
import dayjs from "dayjs";
import React from "react";
import { capitalize } from "src/core/utils/helpers";
import { ShowViewRow } from "../common/ShowViewItem";
import { useShowView } from "../common/hooks/useShowView";
import { ArrivalFilterButton } from "../Location/ArrivalFilterButton";
import { UserReference } from "../User/UserReference";
import { Subscription } from "./Subscription";

export function SubscriptionShow() {
  const { Header, resource: subscription } = useShowView({
    resourceName: Subscription.NAME,
    transform: Subscription.create,
  });
  // const url = useUrls().root();
  function format(date: Date | string | undefined) {
    return dayjs(date).format("DD.MM.YYYY.");
  }
  console.log(subscription);

  return (
    <Card className="max-w-3xl mx-auto">
      <CardContent>
        <Header
          title={`${capitalize(subscription?.type ?? "")} ${format(
            subscription?.startsAt,
          )} - ${format(subscription?.expiresAt)}`}
        />
        <List>
          <ShowViewRow name="User" val={<UserReference id={subscription?.ownerId} reverse />} />
          <ShowViewRow val={dayjs(subscription?.startsAt).format("DD.MM.YYYY")} name="Starts at" />
          <ShowViewRow
            val={dayjs(subscription?.expiresAt).format("DD.MM.YYYY")}
            name="Expiers at"
          />
          <ShowViewRow val={subscription?.price} name="Price" />
          <ShowViewRow val={subscription?.type} name="Type" />
          <ShowViewRow
            val={`${subscription?.usedAmount ?? 0} / ${subscription?.allowedUses ?? "∞"} `}
            name="Used / allowed uses"
          />
          <ShowViewRow
            name="Arrivals"
            val={<ArrivalFilterButton id={subscription?.id} filterField={Subscription.ID} />}
          />
        </List>
      </CardContent>
    </Card>
  );
}
