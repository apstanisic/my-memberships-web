import React from "react";
import {
  BooleanInput,
  DateTimeInput,
  Create,
  NumberInput,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput
} from "react-admin";

export function RoleCreate(props: any) {
  return (
    <Create {...props}>
      <SimpleForm>
        {/* <TextInput source="id" /> */}
        {/* <DateInput source="createdAt" /> */}
        <ReferenceInput source="userId" reference="auth/users">
          <SelectInput optionText="id" />
        </ReferenceInput>
        <TextInput source="name" />
        {/* <TextInput source="domain" /> */}
        <TextInput source="description" />
      </SimpleForm>
    </Create>
  );
}
