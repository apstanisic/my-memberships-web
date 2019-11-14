import React from "react";
import {
  Datagrid,
  DateField,
  FunctionField,
  List,
  TextField,
  EmailField,
  NumberField,
  EditButton,
  ReferenceField
} from "react-admin";
import { Pagination } from "components/AdminPanel/common/Pagination";

export function LocationList(props: any) {
  return (
    <List {...props} pagination={<Pagination />}>
      <Datagrid rowClick="edit">
        <TextField source="name" />
        <TextField source="address" />
        <TextField source="phoneNumber" />
        <EmailField source="email" />
        {/* <TextField source="id" /> */}
        {/* <DateField source="createdAt" /> */}
        {/* <ReferenceField source="companyId" reference="companies">
          <TextField source="name" />
        </ReferenceField> */}
        {/* <TextField source="workingHours.monday" /> */}
        {/* <NumberField source="lat" /> */}
        {/* <NumberField source="long" /> */}
        {/* <TextField source="images" /> */}
        <EditButton />
      </Datagrid>
    </List>
  );
}
