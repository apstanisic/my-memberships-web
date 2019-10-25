import { CompanyCreate } from "CompanyAdmin/Company/CompanyCreate";
import { CompanyEdit } from "CompanyAdmin/Company/CompanyEdit";
import { CompanyList } from "CompanyAdmin/Company/CompanyList";
import { dataProvider } from "CompanyAdmin/dataProvider";
import React from "react";
import { Admin, Resource } from "react-admin";
import { authProvider } from "CompanyAdmin/authProvider";

export function AdminPanel() {
  return (
    <Admin dataProvider={dataProvider} authProvider={authProvider}>
      {/* <Resource
        name="companies/ff12a2ab-99ae-4a25-9fc1-ec153fd08d17/locations"
        list={ListGuesser}
      ></Resource> */}
      <Resource
        name="companies"
        list={CompanyList}
        edit={CompanyEdit}
        create={CompanyCreate}
      ></Resource>
    </Admin>
  );
}
