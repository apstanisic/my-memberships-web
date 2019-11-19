import MaterialTable from "material-table";
import React from "react";
import { useLocation } from "react-router-dom";
import { useResource } from "../Common/useResource";
import { Subscription } from "./Subscription";

export function SubscriptionList(props: any) {
  const path = useLocation().pathname;
  const [subscriptions, helpers] = useResource(Subscription.create);

  return (
    <MaterialTable
      {...helpers.config}
      title="Subscriptions"
      columns={[
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
        ...helpers.CustomActions,
      ]}
    ></MaterialTable>
  );
}
