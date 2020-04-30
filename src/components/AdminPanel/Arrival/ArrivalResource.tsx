import React from "react";
import { ResourceRouter } from "../common/ResourceRouter";
import { Arrival } from "./Arrival";
import { ArrivalList } from "./ArrivalList";
import { ArrivalCreate } from "./ArrivalCreate";
import { ArrivalShow } from "./ArrivalShow";
//
export function ArrivalResource() {
  return (
    <ResourceRouter
      name={Arrival.NAME}
      Show={ArrivalShow}
      List={ArrivalList}
      Create={ArrivalCreate}
    />
  );
}
