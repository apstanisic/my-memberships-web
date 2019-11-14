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
  ReferenceField
} from "react-admin";
import { Pagination } from "components/AdminPanel/common/Pagination";

export function RoleList(props: any) {
  return (
    <List {...props} pagination={<Pagination />}>
      <Datagrid rowClick="edit">
        <ReferenceField source="userId" reference="auth/users">
          <TextField source="name" />
        </ReferenceField>
        <TextField source="name" />
        {/* <TextField source="description" /> */}
        <DateField source="createdAt" locales="sr-RS" showTime />
        {/* <TextField source="id" /> */}
        {/* <TextField source="domain" /> */}
      </Datagrid>
    </List>
  );
}
