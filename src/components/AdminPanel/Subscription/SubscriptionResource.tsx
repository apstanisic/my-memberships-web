import React from "react";
import { ResourceRouter } from "../Common/ResourceRouter";
import { Subscription } from "./Subscription";
import { SubscriptionEdit } from "./SubscriptionEdit";
import { SubscriptionList } from "./SubscriptionList";
import { SubscriptionShow } from "./SubscriptionShow";
import { SubscriptionCreate } from "./SubscriptionCreate";
//
export function SubscriptionResource() {
  return (
    <ResourceRouter
      name={Subscription.NAME}
      Edit={SubscriptionEdit}
      Show={SubscriptionShow}
      List={SubscriptionList}
      Create={SubscriptionCreate}
    />
  );
}
