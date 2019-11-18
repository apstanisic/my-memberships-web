import MaterialTable from "material-table";
import React from "react";
import { EmailField } from "../EmailField";
import { useResource } from "../useResource";
import { Location } from "./Location";

export function LocationList(props: any) {
  const [_, helpers] = useResource<Location>("Locations");

  return (
    <MaterialTable
      {...helpers.config}
      columns={[
        { field: "name", emptyValue: "No name", title: "Name" },
        { field: "address", title: "Address" },
        { field: "phoneNumber", title: "Phone number" },
        {
          title: "Email",
          render: row => <EmailField email={row.email} />
        },
        ...helpers.viewAndEdit
      ]}
    ></MaterialTable>
  );
}
