import React from "react";
import { Edit, SimpleForm, TextInput, DateInput } from "react-admin";

export function CompanyEdit(props: any) {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="id" />
        <DateInput source="createdAt" />
        <TextInput source="name" />
        {/* <ReferenceInput source="ownerId" reference="owners"> */}
        {/* <SelectInput optionText="id" /> */}
        {/* </ReferenceInput> */}
        <TextInput source="category" />
        <TextInput source="description" />
        <TextInput source="phoneNumbers" />
        <TextInput source="emails" />
        <TextInput source="images" />
      </SimpleForm>
    </Edit>
  );
}
