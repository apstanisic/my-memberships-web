import React from "react";
import PersonIcon from "@material-ui/icons/Person";
import MaterialTable from "material-table";
import { useLocation, Link } from "react-router-dom";
import { useResource } from "../Common/useResource";
import { Role } from "core/auth/Role";
import { ReferenceField } from "../Common/ReferenceField";
import { User } from "core/auth/User";
import { Link as MLink, Avatar } from "@material-ui/core";
import { Padding } from "components/common/Padding";

export function RoleList(props: any) {
  const path = useLocation().pathname;
  const [subscriptions, helpers] = useResource(Role.create);

  return (
    <MaterialTable
      {...helpers.config}
      data={subscriptions.filter(sub => sub.name !== "user")}
      title="Roles"
      columns={[
        {
          title: "User",
          render: row => (
            <ReferenceField
              id={row.userId}
              resourceName="users"
              prefix="auth/"
              rootResource
              render={(user: User) => (
                <MLink
                  component={Link}
                  className="flex items-center"
                  to={`/admin-panel/users/${user.id}/show`}
                >
                  {user.avatar?.xs ? (
                    <Avatar src={user.avatar.xs} />
                  ) : (
                    <PersonIcon />
                  )}
                  <Padding side="l">{user.name}</Padding>
                </MLink>
              )}
            />
          ),
        },
        { field: "name", title: "Name" },
        { field: "description", title: "Description" },
        { field: "createdAt", title: "Created at", type: "datetime" },
        ...helpers.CustomActions,
      ]}
    ></MaterialTable>
  );
}
