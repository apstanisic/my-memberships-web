import React from "react";
import { ResourceTable } from "../TestTable";
import { userReference } from "../User/UserReference";
import { Subscription } from "./Subscription";

export function SubscriptionList() {
  return (
    <ResourceTable
      title="Subscriptions"
      transform={Subscription.create}
      columns={[
        { title: "User", render: row => userReference(row.ownerId) },
        { field: "type", title: "Type" },
        { field: "active", title: "Active", type: "boolean" },
        { field: "expiresAt", title: "Expires at", type: "date" },
        {
          title: "Uses",
          render: row => (
            <span className="whitespace-no-wrap">
              {row.usedAmount} / {row.allowedUses ?? "∞"}
            </span>
          ),
        },
      ]}
    />
  );
}
