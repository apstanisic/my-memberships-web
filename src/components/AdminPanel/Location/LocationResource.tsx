import React from "react";
import { ResourceRouter } from "../common/ResourceRouter";
import { LocationEdit } from "./LocationEdit";
import { LocationCreate } from "./LocationCreate";
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
      Create={LocationCreate}
    />
  );
}
