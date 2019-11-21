import React from "react";
import { ResourceRouter } from "../Common/ResourceRouter";
import { Arrival } from "./Arrival";
import { ArrivalList } from "./ArrivalList";
//
export function ArrivalResource() {
  return (
    <ResourceRouter
      name={Arrival.NAME}
      //   Edit={SubscriptionEdit}
      //   Show={SubscriptionShow}
      List={ArrivalList}
    />
  );
}
