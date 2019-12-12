import { Avatar, Box, Link as MLink } from "@material-ui/core";
import { Person } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import { User } from "src/core/auth/User";
import { ReferenceField } from "../Common/ReferenceField";

export function UserReference({ id }: { id?: string }) {
  if (!id) return <span></span>;
  return (
    <ReferenceField
      resourceId={id}
      resourceName="users"
      render={(user: User) => (
        <MLink
          className="flex items-center"
          style={{ minWidth: 100 }}
          component={Link}
          to={`/admin-panel/users/${user.id}/show`}
        >
          <Box height={40} width={40}>
            {/* <Box position="absolute">
              <Person />
            </Box>
            <Avatar src={user.avatar?.xs} /> */}
            {user.avatar?.xs ? (
              <Avatar
                className="bg-blue-200 rounded-full"
                src={user.avatar.xs}
              />
            ) : (
              <Person />
            )}
          </Box>
          <Box pl={1}>{user.name}</Box>
        </MLink>
      )}
    />
  );
}
