import MaterialTable from "material-table";
import PersonIcon from "@material-ui/icons/Person";
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useResource } from "../Common/useResource";
import { Subscription } from "./Subscription";
import { ReferenceField } from "../Common/ReferenceField";
import { User } from "core/auth/User";
import { Link as MLink, Avatar } from "@material-ui/core";
import { Padding } from "components/common/Padding";

export function SubscriptionList(props: any) {
  const path = useLocation().pathname;
  const [subscriptions, helpers] = useResource(Subscription.create);

  return (
    <MaterialTable
      {...helpers.config}
      title="Subscriptions"
      columns={[
        {
          title: "User",
          render: row => (
            <ReferenceField
              id={row.ownerId}
              resourceName="users"
              rootResource
              prefix="auth/"
              render={(user: User) => (
                <MLink
                  className="flex items-center"
                  component={Link}
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
        { field: "type", title: "Type" },
        { field: "active", title: "Active", type: "boolean" },
        // { field: "startsAt", title: "Starts At", type: "date" },
        { field: "expiresAt", title: "Expires at", type: "date" },
        {
          title: "Uses",
          render: ({ allowedUses, usedAmount }) => (
            <span className="whitespace-no-wrap">
              {usedAmount} / {allowedUses ?? "∞"}
            </span>
          ),
        },
        // { field: "price", title: "Price" },
        helpers.CustomActions,
      ]}
    ></MaterialTable>
  );
}
