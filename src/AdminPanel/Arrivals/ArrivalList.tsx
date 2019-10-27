import React from "react";
import {
  Datagrid,
  DateField,
  List,
  NumberField,
  ReferenceField,
  TextField
} from "react-admin";
import { useParams, useLocation } from "react-router-dom";
import { Pagination } from "AdminPanel/common/Pagination";

export function ArrivalList(props: any) {
  const url = useLocation().pathname.substring(1);
  const locations = url.replace("arrivals", "locations");
  const subscriptions = url.replace("arrivals", "subscriptions");

  return (
    <List {...props} pagination={<Pagination />}>
      <Datagrid rowClick="edit">
        {/* <TextField source="id" /> */}
        <ReferenceField
          source="subscriptionId"
          label="User"
          reference={subscriptions}
        >
          <TextField source="owner.name" />
        </ReferenceField>
        {/* <ReferenceField source="companyId" reference="companies">
          <TextField source="id" />
        </ReferenceField> */}
        <DateField showTime source="arrivedAt" locales="sr-RS" />
        <TextField showTime source="leftAt" locales="sr-RS" />
        <ReferenceField source="locationId" reference={locations}>
          <TextField source="name" />
        </ReferenceField>
        <TextField source="address" />
        {/* <DateField source="createdAt" /> */}
        {/* <NumberField source="lat" /> */}
        {/* <NumberField source="long" /> */}
      </Datagrid>
    </List>
  );
}
