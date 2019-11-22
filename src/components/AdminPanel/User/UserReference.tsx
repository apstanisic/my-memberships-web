import { Box, Link as MLink, Avatar } from "@material-ui/core";
import React from "react";
import { ReferenceField } from "../Common/ReferenceField";
import { Link } from "react-router-dom";
import { Padding } from "components/common/Padding";
import { Person } from "@material-ui/icons";
import { User } from "core/auth/User";

export function userReference(id: string) {
  return (
    <ReferenceField
      resourceId={id}
      resourceName="users"
      render={(user: User) => (
        <MLink
          className="flex items-center"
          component={Link}
          to={`/admin-panel/users/${user.id}/show`}
        >
          {user.avatar?.xs ? <Avatar src={user.avatar.xs} /> : <Person />}
          <Box pl={1}>{user.name}</Box>
        </MLink>
      )}
    />
  );
}
