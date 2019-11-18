import React from "react";
import { ResourceRouter } from "../ResourceRouter";
import { LocationEdit } from "./LocationEdit";
import { LocationList } from "./LocationList";
import { LocationShow } from "./LocationShow";

export function LocationResource() {
  return (
    <ResourceRouter
      remoteUrl="companies/:companyId/locations"
      Edit={LocationEdit}
      Show={LocationShow}
      List={LocationList}
    />
  );
}
