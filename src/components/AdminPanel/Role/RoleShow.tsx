import React, { Fragment } from "react";
import { useShowView } from "../Common/useShowView";
import { Role } from "src/core/auth/Role";
import { useUrls } from "../Common/useUrls";
import { Card, CardContent, List } from "@material-ui/core";
import dayjs from "dayjs";
import { ShowViewItem } from "../Common/ShowViewItem";
import { ReferenceField } from "../Common/ReferenceField";
import { Link } from "react-router-dom";
import { Subscription } from "rxjs";
import { User } from "src/core/auth/User";
import { UserReference } from "../User/UserReference";

export function RoleShow() {
  const [role, Header] = useShowView(Role.NAME, Role.create, {
    hasEdit: false,
  });
  const urls = useUrls();
  return (
    <Fragment>
      <Card className="max-w-3xl mx-auto">
        <CardContent>
          <Header title={role?.name} />
          <List>
            <ShowViewItem
              name="User"
              val={<UserReference id={role?.userId} reverse />}
            />
            <ShowViewItem name="role" val={role?.name} />
            {role?.description && (
              <ShowViewItem name="Description" val={role?.description} />
            )}
          </List>
        </CardContent>
      </Card>
    </Fragment>
  );
}
