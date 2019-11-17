import React from "react";
import { Resource } from "react-admin";
import { CompanyCreate } from "./CompanyCreate";
import { CompanyEdit } from "./CompanyEdit";
import { CompanyList } from "./CompanyList";
import { Route } from "react-router-dom";

export function CompanyResource() {
  return (
    <Resource
      name="companies"
      list={CompanyList}
      edit={CompanyEdit}
      create={CompanyCreate}
    ></Resource>
  );
}
