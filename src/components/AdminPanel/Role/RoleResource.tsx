import React from "react";
import { ResourceRouter } from "../Common/ResourceRouter";
import { Role } from "src/core/auth/Role";
import { RoleList } from "./RoleList";
import { RoleEdit } from "./RoleEdit";
import { RoleCreate } from "./RoleCreate";
import { RoleShow } from "./RoleShow";
//
export function RoleResource() {
  return (
    <ResourceRouter
      name={Role.NAME}
      Edit={RoleEdit}
      Create={RoleCreate}
      Show={RoleShow}
      List={RoleList}
    />
  );
}
