import React from "react";
import { Resource } from "react-admin";
import {
  useParams,
  useLocation,
  Switch,
  useRouteMatch,
  Route
} from "react-router-dom";
import { SubscriptionCreate } from "./SubscriptionCreate";
import { SubscriptionEdit } from "./SubscriptionEdit";
import { SubscriptionList } from "./SubscriptionList";
import { SubscriptionShow } from "./SubscriptionShow";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "store/store";
import { registerResource } from "ra-core";

export function SubscriptionResource() {
  const dispatch: AppDispatch = useDispatch();
  const match = useRouteMatch();
  const location = useLocation();
  console.log(useParams());

  // dispatch(
  //   registerResource({
  //     name: location.pathname,
  //     hasCreate: false,
  //     hasEdit: false,
  //     hasList: true,
  //     hasShow: false
  //   })
  // );
  // console.log("usao");

  // console.log(useSelector(s => s));

  const { companyId } = useParams();
  console.log(match!.params);
  // const name = "/companies/64db674e-740a-4e79-9535-c7097444188c/subscriptions";
  const name = location.pathname;
  console.log(name);

  // match!.isExact(name);
  console.log();

  // return <div>0</div>;

  // return (
  // <Switch>
  //   <Route exact path="/panel/companies/:companyId/subscriptions">
  //     <SubscriptionList
  //       hasCreate={false}
  //       hasEdit={false}
  //       resource="comments"
  //       hasShow={false}
  //       hasList
  //       location={location}
  //       basePath={match!.path}
  //       match={match}
  //     />
  //   </Route>
  // {
  //   /* <Route exact path="/panel/companies/:companyId/subscriptions/create">
  //       <SubscriptionCreate
  //         hasEdit
  //         location={location}
  //         hasList
  //         resource="comments"
  //         basePath={match!.path}
  //         hasShow
  //         match={match}
  //       />
  //     </Route>
  //     <Route exact path="/panel/companies/:companyId/subscriptions/:id">
  //       <SubscriptionEdit
  //         hasList
  //         location={location}
  //         hasCreate
  //         resource="comments"
  //         basePath={match!.path}
  //         match={match}
  //         hasShow
  //       />
  //     </Route>
  //     <Route exact path="/panel/companies/:companyId/subscriptions/:id/show">
  //       <SubscriptionEdit
  //         hasList
  //         location={location}
  //         hasCreate
  //         resource="comments"
  //         basePath={match!.path}
  //         match={match}
  //         hasEdit
  //       />
  //     </Route> */
  // }
  // </Switch>

  // <Resource
  //   // name={`panel/companies/${id}/subscriptions`}
  //   name="panel/companies/64db674e-740a-4e79-9535-c7097444188c/subscriptions"
  //   // name={d.pathname}
  //   list={SubscriptionList}
  //   edit={SubscriptionEdit}
  //   create={SubscriptionCreate}
  //   show={SubscriptionShow}
  //   options={{ label: "Subscriptions" }}
  // ></Resource>
  // );
  return (
    <div>
      <Resource
        // basePath="/panel"
        // name={`panel/companies/${id}/subscriptions`}
        name={name}
        // name={d.pathname}
        list={SubscriptionList}
        edit={SubscriptionEdit}
        create={SubscriptionCreate}
        show={SubscriptionShow}
        options={{ label: "Subscriptions" }}
      ></Resource>
    </div>
  );
}
