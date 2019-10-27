import { authProvider } from "AdminPanel/authProvider";
import { CompanyCreate } from "AdminPanel/Company/CompanyCreate";
import { CompanyEdit } from "AdminPanel/Company/CompanyEdit";
import { CompanyList } from "AdminPanel/Company/CompanyList";
import { dataProvider } from "AdminPanel/dataProvider";
import { SubscriptionList } from "AdminPanel/Subscription/SubscriptionList";
import React from "react";
import { Admin, EditGuesser, Resource, ListGuesser } from "react-admin";
import { useHistory, useParams } from "react-router-dom";
import { SubscriptionEdit } from "AdminPanel/Subscription/SubscriptionEdit";
import { SubscriptionCreate } from "AdminPanel/Subscription/SubscriptionCreate";
import { ArrivalList } from "AdminPanel/Arrivals/ArrivalList";
import { ArrivalEdit } from "AdminPanel/Arrivals/ArrivalEdit";
import { ArrivalCreate } from "AdminPanel/Arrivals/ArrivalCreate";
import { LocationList } from "AdminPanel/Location/LocationList";
import { LocationEdit } from "AdminPanel/Location/LocationEdit";
import { RoleList } from "AdminPanel/Roles/RoleList";
import { RoleEdit } from "AdminPanel/Roles/RoleEdit";
import { RoleCreate } from "AdminPanel/Roles/RoleCreate";
import { SubscriptionShow } from "AdminPanel/Subscription/SubscriptionShow";

export function AdminPanel() {
  const { id } = useParams();
  const history = useHistory();
  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      history={history}
    >
      {/* <Resource
        name="companies/ff12a2ab-99ae-4a25-9fc1-ec153fd08d17/locations"
        list={ListGuesser}
      ></Resource> */}
      <Resource
        name={`companies/${id}/subscriptions`}
        list={SubscriptionList}
        edit={SubscriptionEdit}
        create={SubscriptionCreate}
        show={SubscriptionShow}
        options={{ label: "Subscriptions" }}
      ></Resource>

      <Resource
        name={`companies/${id}/arrivals`}
        list={ArrivalList}
        edit={ArrivalEdit}
        create={ArrivalCreate}
        options={{ label: "Arrivals" }}
      ></Resource>

      <Resource
        name={`companies/${id}/locations`}
        list={LocationList}
        edit={LocationEdit}
        // create={ArrivalCreate}
        options={{ label: "Locations" }}
      ></Resource>

      <Resource
        name={`companies/${id}/roles`}
        list={RoleList}
        edit={RoleEdit}
        create={RoleCreate}
        options={{ label: "Roles" }}
      ></Resource>

      <Resource name="auth/users"></Resource>
      <Resource
        name="companies"
        list={CompanyList}
        edit={CompanyEdit}
        create={CompanyCreate}
      ></Resource>
    </Admin>
  );
}
