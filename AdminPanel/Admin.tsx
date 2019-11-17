import { authProvider } from "components/AdminPanel/authProvider";
import { dataProvider } from "components/AdminPanel/dataProvider";
import React from "react";
// import { Admin, Resource } from "react-admin";
// import { Admin, Resource } from "react-admin";
import {
  AuthContext,
  DataProviderContext,
  TranslationProvider,
  Resource
} from "react-admin";
import { Provider, useSelector } from "react-redux";
import { history, store } from "store/store";
import { ArrivalResource } from "./Arrivals/ArrivalResource";
import { CompanyResource } from "./Company/CompanyResource";
import { LocationResource } from "./Location/LocationResource";
import { SubscriptionResource } from "./Subscription/SubscriptionResource";
import { auth } from "core/auth/Auth";
import { Http } from "core/http";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { AppScaffold } from "components/Scaffold/Scaffold";
import { Switch, Route, useLocation } from "react-router-dom";
import { CompanyCreate } from "./Company/CompanyCreate";

export function AdminPanel() {
  const location = useLocation();
  // auth.user?
  // Http.get("companies/64db674e-740a-4e79-9535-c7097444188c")
  //   .then(r => r.data)
  //   .then(console.log);
  // const history = useHistory();
  // const history = createHa
  return (
    // <AuthContext.Provider value={authProvider}>
    <DataProviderContext.Provider value={dataProvider}>
      {/* <TranslationProvider locale={locale} i18nProvider={i18nProvider}> */}
      {/* <ThemeProvider> */}
      {/* <Resource name={location.pathname} intent="registration" /> */}
      {/* <Switch> */}
      {/* <Route exact path="/" component={Dashboard} /> */}
      {/* <Route path="/companies/:companyId/subscriptions"> */}
      {/* <CompanyCreate /> */}
      {/* <CompanyResource /> */}
      <SubscriptionResource />
      {/* </Route> */}
      {/* </Switch> */}
      <AppScaffold />
      {/* </ThemeProvider> */}
      {/* </TranslationProvider> */}
    </DataProviderContext.Provider>
    // {/* </AuthContext.Provider> */}
  );
  // return (
  // <Provider store={store}>
  // <Admin
  //   dataProvider={dataProvider}
  //   authProvider={authProvider}
  //   history={history}
  //   dashboard={() => <div>admin</div>}
  // >
  // {/* <LocationResource /> */}
  // {/* <SubscriptionResource /> */}
  // {/* <ArrivalResource /> */}
  // {/* <CompanyResource /> */}
  // {/* <Resource name="auth/users"></Resource> */}
  // </Admin>
  // </Provider>
  // );
}

export default AdminPanel;
