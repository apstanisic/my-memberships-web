import React from "react";
import { ResourceTable } from "../TestTable";
import { userReference } from "../User/UserReference";
import { Subscription } from "./Subscription";
import { ArrivalFilterButton } from "../Location/ArrivalFilterButton";

export function SubscriptionList() {
  return (
    <ResourceTable
      title="Subscriptions"
      transform={Subscription.create}
      columns={[
        { title: "User", render: row => userReference(row.ownerId) },
        { field: "type", title: "Type" },
        { field: "active", title: "Active", align: "center" },
        { field: "expiresAt", title: "Expires at", type: "date" },
        {
          title: "Arrivals",
          render: ({ id }) => (
            <ArrivalFilterButton id={id} filterField={Subscription.ID} />
          ),
        },
        {
          title: "Uses",
          align: "center",
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
