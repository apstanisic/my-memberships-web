import { Role } from "src/core/auth/Role";
import React from "react";
import { ResourceTable } from "../Common/Table/ResourceTable";
import { UserReference } from "../User/UserReference";

export function RoleList() {
  return (
    <ResourceTable
      title="Roles"
      transform={Role.create}
      columns={[
        { title: "User", render: row => <UserReference id={row.userId} /> },
        { field: "name", title: "Name" },
        { field: "createdAt", title: "Created at", type: "datetime" },
      ]}
    />
  );
}
