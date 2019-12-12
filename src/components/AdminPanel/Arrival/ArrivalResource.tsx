import React from "react";
import { ResourceRouter } from "../Common/ResourceRouter";
import { Arrival } from "./Arrival";
import { ArrivalList } from "./ArrivalList";
import { ArrivalCreate } from "./ArrivalCreate";
import { ArrivalShow } from "./ArrivalShow";
//
export function ArrivalResource() {
  return (
    <ResourceRouter
      name={Arrival.NAME}
      //   Edit={SubscriptionEdit}
      Show={ArrivalShow}
      List={ArrivalList}
      Create={ArrivalCreate}
    />
  );
}
