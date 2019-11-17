import { IconButton } from "@material-ui/core";
import { Http } from "core/http";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { PaginationResult } from "types";
import { EmailField } from "../EmailField";
import { tableIcons } from "../Icons";
import { Location } from "./Location";
// import { Pagination } from "components/AdminPanel/common/Pagination";

export function LocationList(props: any) {
  const [isLoading, setIsLoading] = useState(true);
  const [locations, setLocations] = useState<Location[]>([]);
  const history = useHistory();

  const path = useLocation().pathname.replace("/admin-panel", "");

  useEffect(() => {
    Http.get<PaginationResult<Partial<Location>>>(path).then(res => {
      setLocations(res.data.data.map(l => new Location(l)));
      setIsLoading(false);
    });
  }, [path]);
  console.log();

  async function onDelete(row: Location) {
    setIsLoading(true);
    try {
      const deleted = await Http.delete<Location>(`${path}/${row.id}`).then(
        r => r.data
      );
      setLocations(locations.filter(l => l.id !== deleted.id));
    } catch (error) {
      alert("errror");
    } finally {
      setIsLoading(false);
    }
  }

  function onEdit(row: Location) {
    history.push(`locations/${row.id}/edit`);
  }

  function onView(row: Location) {
    history.push(`locations/${row.id}/show`);
  }

  return (
    <MaterialTable
      icons={tableIcons}
      data={locations}
      localization={{
        pagination: { labelDisplayedRows: "" },
        header: { actions: "Delete" }
      }}
      isLoading={isLoading}
      editable={{
        isDeletable: () => true,
        onRowDelete: onDelete
      }}
      options={{
        selection: true,
        pageSize: 12,
        pageSizeOptions: [12, 24],
        sorting: false,
        actionsColumnIndex: -1,
        search: false,
        showFirstLastPageButtons: false,
        emptyRowsWhenPaging: false
      }}
      title="Locations"
      actions={[
        {
          tooltip: "Remove All Selected locations",
          icon: tableIcons.Delete as any,
          onClick: (evt, data) => alert("You want to delete " + data + " rows")
        },
        {
          icon: tableIcons.Add as any,
          onClick: () => history.push(`${path}/create`),
          // onClick: () => {},
          isFreeAction: true
        }
      ]}
      columns={[
        {
          field: "name",
          emptyValue: "No name",
          title: "Name"
        },
        { field: "address", title: "Address" },
        { field: "phoneNumber", title: "Phone number" },
        {
          title: "Email",
          render: (row: Location) => <EmailField email={row.email} />
        },
        {
          title: "View",
          render: (row: Location) => (
            <IconButton onClick={() => onView(row)}>
              <tableIcons.Visibility />
            </IconButton>
          )
        },
        {
          title: "Edit",
          render: (row: Location) => (
            <IconButton onClick={() => onEdit(row)}>
              <tableIcons.Edit />
            </IconButton>
          )
        }
      ]}
    ></MaterialTable>
  );
}
// return (
//   <MUIDataTable
//     options={{
//       page: 2,
//       serverSide: true,
//       onTableChange: (action, tableState) => {
//         console.log(action, tableState);

//         // this.xhrRequest("my.api.com/tableData", result => {
//         //   this.setState({ data: result });
//         // });
//       }
//     }}
//     data={locations}
//     title="Locations"
//     columns={[
//       { name: "name", label: "Name" },
//       { name: "address", label: "Address" },
//       { name: "phoneNumber", label: "Phone number" },
//       {
//         label: "Email",
//         name: "email",
//         options: {
//           customBodyRender: val => <EmailField email={val} />
//         }
//       },
//       { name: "createdAt", label: "Created at" }
//     ]}
//   />
// );
