import React from "react";
import {
  BooleanField,
  Datagrid,
  DateField,
  EditButton,
  List,
  NumberField,
  FunctionField,
  TextField,
  ReferenceField,
  ReferenceArrayField,
  SingleFieldList,
  ChipField,
  UrlField,
  DeleteButton
  // Button
} from "react-admin";
import { Subscription } from "./Subscription";
import { useLocation, useHistory, Link } from "react-router-dom";
import { stringify } from "query-string";
import { Button } from "@material-ui/core";
import { Pagination } from "AdminPanel/common/Pagination";

export function SubscriptionList(props: any) {
  const url = useLocation().pathname.substring(1);
  const arrivals = url.replace("subscriptions", "arrivals");
  // const subscriptions = url.replace("arrivals", "subscriptions");
  const ArrivalsField = ({ source, record = {} }: any) => {
    const filter = JSON.stringify({ subscriptionId: record.id });
    const url = `/${arrivals}?filter=${filter}`;
    return <Link to={url}>Pogledaj</Link>;
  };

  return (
    <List {...props} title="Subscriptions" pagination={<Pagination />}>
      <Datagrid rowClick="show">
        {/* <DateField source="createdAt" /> */}
        <ReferenceField source="ownerId" reference="auth/users">
          <TextField source="name" />
        </ReferenceField>
        <BooleanField source="active" />
        <TextField source="type" />
        <DateField source="startsAt" />
        <DateField source="expiresAt" />
        <FunctionField
          label="Uses"
          textAlign="right"
          render={({ allowedUses, usedAmount }: Subscription) =>
            `${usedAmount} / ${allowedUses ? allowedUses : "∞"}`
          }
        />
        <NumberField source="price" />
        <ArrivalsField source="arrivalIds" />
        <EditButton />
        {/* <DeleteButton /> */}
      </Datagrid>
    </List>
  );
}
