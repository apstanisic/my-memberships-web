import {
  BooleanInput,
  DateTimeInput,
  Edit,
  NumberInput,
  SimpleForm,
  TextInput
} from "react-admin";
import React from "react";

export function ArrivalEdit(props: any) {
  return (
    <Edit {...props}>
      <SimpleForm>
        {/* <TextInput source="id" /> */}
        {/* <DateInput source="createdAt" /> */}
        {/* <ReferenceInput source="subscriptionId" reference="subscriptions">
          <SelectInput optionText="id" />
        </ReferenceInput> */}
        {/* <ReferenceInput source="locationId" reference="locations">
          <SelectInput optionText="id" />
        </ReferenceInput> */}
        {/* <ReferenceInput source="companyId" reference="companies">
          <SelectInput optionText="id" />
        </ReferenceInput> */}
        <DateTimeInput source="arrivedAt" />
        <DateTimeInput source="leftAt" />
        {/* <TextInput source="address" /> */}
        {/* <NumberInput source="lat" /> */}
        {/* <NumberInput source="long" /> */}
      </SimpleForm>
    </Edit>
  );
}
