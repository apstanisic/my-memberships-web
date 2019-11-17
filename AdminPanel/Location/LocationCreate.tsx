import {
  BooleanInput,
  DateTimeInput,
  Edit,
  NumberInput,
  SimpleForm,
  TextInput,
  Create
} from "react-admin";
import React from "react";

export function LocationCreate(props: any) {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="address" />
        <TextInput source="workingHours.monday" />
        <TextInput source="phoneNumber" />
        <TextInput source="email" />
        <NumberInput source="lat" />
        <NumberInput source="long" />
        <TextInput source="images" />
      </SimpleForm>
    </Create>
  );
}
