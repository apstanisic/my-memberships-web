import React from "react";
import { ResourceRouter } from "../common/ResourceRouter";
import { Payment } from "./Payment";
import { PaymentShow } from "./PaymentShow";
import { PaymentList } from "./PaymentList";

export function PaymentResource() {
  return (
    <ResourceRouter
      name={Payment.NAME}
      //   name={Role.NAME}
      //   Edit={RoleEdit}
      //   Create={RoleCreate}
      //   Show={RoleShow}
      Show={PaymentShow}
      List={PaymentList}
    />
  );
}
