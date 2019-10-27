import React from "react";
import {
  Datagrid,
  DateField,
  FunctionField,
  List,
  TextField,
  EditButton
} from "react-admin";
import { Pagination } from "AdminPanel/common/Pagination";

export function CompanyList(props: any) {
  return (
    <List {...props} pagination={<Pagination />}>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <DateField source="createdAt" showTime locales="sr-RS" />
        <TextField source="name" />
        {/* <ReferenceField source="ownerId" reference="owners"> */}
        <TextField source="ownerId" />
        {/* </ReferenceField> */}
        <TextField source="category" />
        <TextField source="description" />
        <TextField source="phoneNumbers" />
        <FunctionField
          render={(value: any) => `${(value.emails as []).join(", ")}`}
        />
        {/* <SelectField source="emails" /> */}
        {/* <TextField source="emails" /> */}
        <TextField source="images" />
        <EditButton />
      </Datagrid>
    </List>
  );
}
