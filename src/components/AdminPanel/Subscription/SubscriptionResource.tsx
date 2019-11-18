import React from "react";
import { Route, Switch } from "react-router-dom";
import { SubscriptionEdit } from "./SubscriptionEdit";
import { SubscriptionList } from "./SubscriptionList";
import { SubscriptionShow } from "./SubscriptionShow";
//
export function SubscriptionResource() {
  return (
    <Switch>
      <Route path="/admin-panel/companies/:companyId/subscriptions/:subscriptionsId/edit">
        <SubscriptionEdit />
      </Route>
      <Route path="/admin-panel/companies/:companyId/subscriptions/:subscriptionsId/show">
        <SubscriptionShow />
      </Route>
      <Route path="/admin-panel/companies/:companyId/subscriptions">
        <SubscriptionList />
      </Route>
    </Switch>
  );
}
