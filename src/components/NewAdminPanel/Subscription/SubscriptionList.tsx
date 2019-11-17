import { IconButton } from "@material-ui/core";
import { Http } from "core/http";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { PaginationResult } from "types";
import { tableIcons } from "../Icons";
import { Subscription } from "./Subscription";
// import { Pagination } from "components/AdminPanel/common/Pagination";

export function SubscriptionList(props: any) {
  const [isLoading, setIsLoading] = useState(true);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const history = useHistory();
  const path = useLocation().pathname.replace("/admin-panel", "");

  useEffect(() => {
    Http.get<PaginationResult<Partial<Subscription>>>(path).then(res => {
      setSubscriptions(res.data.data.map(l => new Subscription(l)));
      setIsLoading(false);
    });
  }, [path]);

  async function onDelete(row: Subscription) {
    setIsLoading(true);
    try {
      const deleted = await Http.delete<Subscription>(`${path}/${row.id}`).then(
        r => r.data
      );
      setSubscriptions(subscriptions.filter(l => l.id !== deleted.id));
    } catch (error) {
      alert("errror");
    } finally {
      setIsLoading(false);
    }
  }

  function onEdit(row: Subscription) {
    history.push(`subscriptions/${row.id}/edit`);
  }

  function onView(row: Subscription) {
    history.push(`subscriptions/${row.id}/show`);
  }

  return (
    <MaterialTable
      icons={tableIcons}
      data={subscriptions}
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
          tooltip: "Remove All Selected subscriptions",
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
        { field: "active", title: "Active", type: "boolean" },
        { field: "type", title: "Type" },
        { field: "startsAt", title: "Starts At", type: "date" },
        { field: "expiresAt", title: "Expires at", type: "date" },
        {
          title: "Uses",
          render: ({ allowedUses, usedAmount }: Subscription) =>
            `${usedAmount} / ${allowedUses ? allowedUses : "∞"}`
        },
        { field: "price", title: "Price" },
        {
          title: "View",
          render: (row: Subscription) => (
            <IconButton onClick={() => onView(row)}>
              <tableIcons.Visibility />
            </IconButton>
          )
        },
        {
          title: "Edit",
          render: (row: Subscription) => (
            <IconButton onClick={() => onEdit(row)}>
              <tableIcons.Edit />
            </IconButton>
          )
        }
      ]}
    ></MaterialTable>
  );
}
