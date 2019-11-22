import {
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { SwapVert } from "@material-ui/icons";
import { Padding } from "src/components/common/Padding";
import { Spacer } from "src/components/common/Spacer";
import React from "react";
import { Link } from "react-router-dom";
import { EmailField } from "../Common/EmailField";
import { ShowViewItem } from "../Common/ShowViewItem";
import { useShowView } from "../Common/useShowView";
import { useUrls } from "../Common/useUrls";
import { Subscription } from "./Subscription";
import dayjs from "dayjs";
import { capitalize } from "src/core/utils/helpers";

export function SubscriptionShow() {
  const [subscription, Header] = useShowView(
    Subscription.NAME,
    Subscription.create,
  );
  // const url = useUrls().root();
  function format(date: Date | string | undefined) {
    return dayjs(date).format("DD.MM.YYYY.");
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <CardContent>
        <Header
          title={`${capitalize(subscription?.type ?? "")} ${format(
            subscription?.startsAt,
          )} - ${format(subscription?.expiresAt)}`}
        />
        <List>
          <ShowViewItem
            val={dayjs(subscription?.startsAt).format("DD.MM.YYYY")}
            name="Starts at"
          />
          <ShowViewItem
            val={dayjs(subscription?.expiresAt).format("DD.MM.YYYY")}
            name="Expiers at"
          />
          <ShowViewItem val={subscription?.price} name="Price" />
          <ShowViewItem val={subscription?.type} name="Type" />
          <ShowViewItem
            val={`${subscription?.usedAmount ??
              0} / ${subscription?.allowedUses ?? "∞"} `}
            name="Used / allowed uses"
          />
        </List>
      </CardContent>
    </Card>
  );
}
