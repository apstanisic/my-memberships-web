import React from "react";
import { ResourceRouter } from "../Common/ResourceRouter";
import { LocationEdit } from "./LocationEdit";
import { LocationList } from "./LocationList";
import { LocationShow } from "./LocationShow";
import { Location } from "./Location";

export function LocationResource() {
  return (
    <ResourceRouter
      name={Location.NAME}
      Edit={LocationEdit}
      Show={LocationShow}
      List={LocationList}
      Create={LocationEdit}
    />
  );
}
