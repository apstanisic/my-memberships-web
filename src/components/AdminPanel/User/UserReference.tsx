import { Avatar, Box, Link as MLink } from "@material-ui/core";
import { Person } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import { User } from "src/core/auth/User";
import { ReferenceField } from "../common/ReferenceField";

interface Props {
  id?: string; // Id is optional because maybe user is still not fetched
  reverse?: boolean; // Should reverse padding
}

export function UserReference({ id, reverse }: Props) {
  if (!id) return <span></span>;

  return (
    <div className={`flex ${reverse ? "justify-end" : ""}`}>
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
            {reverse && <Box pr={1}>{user.name}</Box>}
            <Box height={40} width={40} className="center">
              {/* <Box position="absolute">
              <Person />
            </Box>
            <Avatar src={user.avatar?.xs} /> */}
              {user.avatar?.xs ? (
                <Avatar className="bg-blue-200 rounded-full border" src={user.avatar.xs} />
              ) : (
                <Box className="bg-blue-100 border rounded-full center w-full h-full">
                  <Person />
                </Box>
              )}
            </Box>
            {!reverse && <Box pl={1}>{user.name}</Box>}
          </MLink>
        )}
      />
    </div>
  );
}
