import MaterialTable from "material-table";
import React from "react";
import { useLocation } from "react-router-dom";
import { useResource } from "../useResource";
import { Subscription } from "./Subscription";

export function SubscriptionList(props: any) {
  const path = useLocation().pathname;
  const [subscriptions, helpers] = useResource<Subscription>(path);

  return (
    <MaterialTable
      {...helpers.config}
      title="Subscriptions"
      columns={[
        { field: "active", title: "Active", type: "boolean" },
        { field: "type", title: "Type" },
        { field: "startsAt", title: "Starts At", type: "date" },
        { field: "expiresAt", title: "Expires at", type: "date" },
        {
          title: "Uses",
          render: ({ allowedUses, usedAmount }) =>
            `${usedAmount} / ${allowedUses ? allowedUses : "∞"}`
        },
        { field: "price", title: "Price" },
        ...helpers.viewAndEdit
      ]}
    ></MaterialTable>
  );
}
