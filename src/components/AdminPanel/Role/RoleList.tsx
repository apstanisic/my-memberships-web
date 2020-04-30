import { Role } from "src/core/auth/Role";
import React from "react";
import { ResourceTable } from "../common/table/ResourceTable";
import { UserReference } from "../User/UserReference";

export function RoleList() {
  return (
    <ResourceTable
      title="Roles"
      transform={Role.create}
      columns={[
        { field: "name", title: "Name" },
        { title: "User", render: row => <UserReference id={row.userId} /> },
        { field: "createdAt", title: "Created at", type: "datetime" },
      ]}
    />
  );
}
