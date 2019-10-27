import React from "react";
import { Create, SimpleForm, TextInput, DateInput } from "react-admin";

export function CompanyCreate(props: any) {
  return (
    <Create {...props}>
      <SimpleForm>
        {/* <TextInput source="id" /> */}
        {/* <DateInput source="createdAt" /> */}
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
    </Create>
  );
}
