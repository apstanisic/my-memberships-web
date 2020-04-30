import React from "react";
import { ResourceTable } from "../common/table/ResourceTable";

export function PaymentList() {
  // return <div>payment list</div>;
  return (
    <ResourceTable
      actions={{ hasEdit: false, hasCreate: false, hasDelete: false }}
      title="Payments"
      columns={[
        {
          title: "Price",
          field: "price",
        },
        {
          title: "Credit added",
          field: "creditAdded",
        },
      ]}
    />
  );
}
