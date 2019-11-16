import React from "react";
import { Resource } from "react-admin";
import { useParams } from "react-router-dom";
import { RoleCreate } from "./RoleCreate";
import { RoleEdit } from "./RoleEdit";
import { RoleList } from "./RoleList";

export function RoleResource() {
  const { id } = useParams();

  return (
    <Resource
      name={`companies/${id}/roles`}
      list={RoleList}
      edit={RoleEdit}
      create={RoleCreate}
      options={{ label: "Roles" }}
    ></Resource>
  );
}
