import React from "react";
import {
  DateTimeInput,
  Create,
  ReferenceInput,
  SelectInput,
  SimpleForm
} from "react-admin";
import { useLocation } from "react-router-dom";

export function ArrivalCreate(props: any) {
  const url = useLocation().pathname.substring(1);
  const locations = url.replace("arrivals", "locations");
  //   const subscriptions = url.replace("arrivals", "subscriptions");

  return (
    <Create {...props}>
      <SimpleForm>
        {/* <ReferenceInput source="subscriptionId" reference="subscriptions">
            <SelectInput optionText="id" />
          </ReferenceInput> */}
        <ReferenceInput source="locationId" reference="locations">
          <SelectInput optionText="id" />
        </ReferenceInput>
        {/* <ReferenceInput source="companyId" reference="companies">
            <SelectInput optionText="id" />
          </ReferenceInput> */}
        <DateTimeInput source="arrivedAt" />
        <DateTimeInput source="leftAt" />
        {/* <TextInput source="address" /> */}
        {/* <NumberInput source="lat" /> */}
        {/* <NumberInput source="long" /> */}
      </SimpleForm>
    </Create>
  );
}
