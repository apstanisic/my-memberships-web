import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useParams } from "react-router-dom";
// import { setCompany } from "store/adminSlice";
import { LocationResource } from "../Location/LocationResource";
import { SubscriptionResource } from "../Subscription/SubscriptionResource";
import { ArrivalResource } from "../Arrival/ArrivalResource";
import { RoleResource } from "../Role/RoleResource";
import { setUrlData } from "store/adminSlice";

export function CompanyRouter() {
  const { companyId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUrlData({ companyId }));
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
    </Switch>
  );
}
