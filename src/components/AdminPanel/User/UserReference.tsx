import { Box, Link as MLink, Avatar } from "@material-ui/core";
import React from "react";
import { ReferenceField } from "../Common/ReferenceField";
import { Link } from "react-router-dom";
import { Padding } from "src/components/common/Padding";
import { Person } from "@material-ui/icons";
import { User } from "src/core/auth/User";

export function userReference(id: string) {
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
