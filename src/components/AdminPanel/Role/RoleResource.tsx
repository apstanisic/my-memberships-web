import React from "react";
import { ResourceRouter } from "../Common/ResourceRouter";
import { Role } from "src/core/auth/Role";
import { RoleList } from "./RoleList";
import { RoleEdit } from "./RoleEdit";
//
export function RoleResource() {
  return (
    <ResourceRouter
      name={Role.NAME}
      Edit={RoleEdit}
      //   Show={SubscriptionShow}
      List={RoleList}
    />
  );
}
