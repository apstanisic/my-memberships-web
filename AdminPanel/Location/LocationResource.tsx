import React from "react";
import { Resource } from "react-admin";
import { useParams } from "react-router-dom";
import { LocationEdit } from "./LocationEdit";
import { LocationList } from "./LocationList";
import { LocationCreate } from "./LocationCreate";

export function LocationResource() {
  const { id } = useParams();

  return (
    <Resource
      name={`companies/${id}/locations`}
      list={LocationList}
      edit={LocationEdit}
      create={LocationCreate}
      options={{ label: "Locations" }}
    ></Resource>
  );
}
