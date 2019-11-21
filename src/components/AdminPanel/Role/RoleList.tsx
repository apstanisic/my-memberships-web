import { Role } from "core/auth/Role";
import React from "react";
import { ResourceTable } from "../TestTable";
import { userReference } from "../User/UserReference";

export function RoleList() {
  return (
    <ResourceTable
      title="Roles"
      transform={Role.create}
      columns={[
        { title: "User", render: row => userReference(row.userId) },
        { field: "name", title: "Name" },
        { field: "description", title: "Description" },
        { field: "createdAt", title: "Created at", type: "datetime" },
      ]}
    />
  );
}
