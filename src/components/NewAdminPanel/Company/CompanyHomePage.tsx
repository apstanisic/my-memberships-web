import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useParams } from "react-router-dom";
import { setCompany } from "store/adminSlice";
import { LocationResource } from "../Location/LocationResource";
import { SubscriptionResource } from "../Subscription/SubscriptionResource";

export function CompanyHomePage() {
  const { companyId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCompany(companyId));
  }, [companyId, dispatch]);

  return (
    <Switch>
      <Route path="/admin-panel/companies/:companyId/locations">
        <LocationResource />
      </Route>
      <Route path="/admin-panel/companies/:companyId/subscriptions">
        <SubscriptionResource />
      </Route>
      <Route path="/admin-panel/companies/:companyId/roles">
        {/* <LocationList /> */}
      </Route>
      <Route path="/admin-panel/companies/:companyId/pricing-plans">
        {/* <LocationResource /> */}
      </Route>
    </Switch>
  );
}
