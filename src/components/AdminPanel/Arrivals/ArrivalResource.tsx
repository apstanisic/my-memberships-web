import React from "react";
import { Resource } from "react-admin";
import { useParams } from "react-router-dom";
import { ArrivalCreate } from "./ArrivalCreate";
import { ArrivalEdit } from "./ArrivalEdit";
import { ArrivalList } from "./ArrivalList";

export function ArrivalResource() {
  const { id } = useParams();

  return (
    <Resource
      name={`companies/${id}/arrivals`}
      list={ArrivalList}
      edit={ArrivalEdit}
      create={ArrivalCreate}
      options={{ label: "Arrivals" }}
    ></Resource>
  );
}
