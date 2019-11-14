import {
  BooleanInput,
  DateTimeInput,
  Edit,
  NumberInput,
  SimpleForm,
  TextInput
} from "react-admin";
import React from "react";

export function LocationEdit(props: any) {
  return (
    <Edit {...props}>
      <SimpleForm>
        {/* <TextInput source="id" /> */}
        {/* <DateInput source="createdAt" /> */}
        {/* <ReferenceInput source="companyId" reference="companies">
          <SelectInput optionText="id" />
        </ReferenceInput> */}
        <TextInput source="address" />
        <TextInput source="workingHours.monday" />
        <TextInput source="phoneNumber" />
        <TextInput source="email" />
        <NumberInput source="lat" />
        <NumberInput source="long" />
        <TextInput source="images" />
      </SimpleForm>
    </Edit>
  );
}
