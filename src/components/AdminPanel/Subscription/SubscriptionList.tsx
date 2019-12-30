import React from "react";
import { Link as MLink } from "@material-ui/core";
import { ResourceTable } from "../Common/Table/ResourceTable";
import { UserReference } from "../User/UserReference";
import { Subscription } from "./Subscription";
import { ArrivalFilterButton } from "../Location/ArrivalFilterButton";
import { Link } from "react-router-dom";

export function SubscriptionList() {
  return (
    <ResourceTable
      title="Subscriptions"
      transform={Subscription.create}
      columns={[
        // {
        //   title: "Id",
        //   render: row => (
        //     <MLink>
        //       <Link to={"subscriptions/" + row.id + "/show"}>
        //         {row.id.substr(0, 6)}
        //       </Link>
        //     </MLink>
        //   ),
        // },
        { field: "type", title: "Type" },
        { title: "User", render: row => <UserReference id={row.ownerId} /> },
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
