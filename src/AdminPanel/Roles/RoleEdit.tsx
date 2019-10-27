import React from "react";
import {
  BooleanInput,
  DateTimeInput,
  Edit,
  NumberInput,
  SimpleForm,
  TextInput
} from "react-admin";

export function RoleEdit(props: any) {
  return (
    <Edit {...props}>
      <SimpleForm>
        {/* <TextInput source="id" /> */}
        {/* <DateInput source="createdAt" /> */}
        {/* <ReferenceInput source="userId" reference="users">
          <SelectInput optionText="id" />
        </ReferenceInput> */}
        <TextInput source="name" />
        {/* <TextInput source="domain" /> */}
        <TextInput source="description" />
      </SimpleForm>
    </Edit>
  );
}
