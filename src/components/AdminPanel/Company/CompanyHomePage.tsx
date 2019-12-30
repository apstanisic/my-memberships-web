import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useParams } from "react-router-dom";
// import { setCompany } from "src/store/adminSlice";
import { LocationResource } from "../Location/LocationResource";
import { SubscriptionResource } from "../Subscription/SubscriptionResource";
import { ArrivalResource } from "../Arrival/ArrivalResource";
import { RoleResource } from "../Role/RoleResource";
import { setUrlData, setSettings } from "src/store/adminSlice";
import { PaymentResource } from "../Payment/PaymentResource";
import { http } from "src/core/http";

export function CompanyRouter() {
  const { companyId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUrlData({ companyId }));
  }, [companyId, dispatch]);

  useEffect(() => {
    dispatch(setUrlData({ companyId }));

    http
      .get(`companies/${companyId}/config`)
      .then(res => dispatch(setSettings(res.data)));

    http
      .get(`companies/${companyId}`)
      .then(res => dispatch(setUrlData({ company: res.data })));
  }, [companyId, dispatch]);

  return (
    <Switch>
      <Route path="/admin-panel/companies/:companyId/locations">
        <LocationResource />
      </Route>
      <Route path="/admin-panel/companies/:companyId/subscriptions">
        <SubscriptionResource />
      </Route>
      <Route path="/admin-panel/companies/:companyId/arrivals">
        <ArrivalResource />
      </Route>
      <Route path="/admin-panel/companies/:companyId/roles">
        <RoleResource />
      </Route>
      <Route path="/admin-panel/companies/:companyId/pricing-plans">
        {/* <LocationResource /> */}
      </Route>
      <Route path="/admin-panel/companies/:companyId/payments">
        <PaymentResource />
      </Route>
      <Route>Dashboard</Route>
    </Switch>
  );
}
