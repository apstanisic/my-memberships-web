import { Card, CardContent, List } from "@material-ui/core";
import React, { Fragment } from "react";
import { Role } from "src/core/auth/Role";
import { ShowViewRow } from "../common/ShowViewItem";
import { useShowView } from "../common/hooks/useShowView";
import { useUrls } from "../common/hooks/useUrls";
import { UserReference } from "../User/UserReference";

export function RoleShow() {
  const { Header, resource: role } = useShowView({
    resourceName: Role.NAME,
    transform: Role.create,
    hasEdit: false,
  });
  const urls = useUrls();
  return (
    <Fragment>
      <Card className="max-w-3xl mx-auto">
        <CardContent>
          <Header title={role?.name} />
          <List>
            <ShowViewRow name="User" val={<UserReference id={role?.userId} reverse />} />
            <ShowViewRow name="role" val={role?.name} />
            {role?.description && <ShowViewRow name="Description" val={role?.description} />}
          </List>
        </CardContent>
      </Card>
    </Fragment>
  );
}
