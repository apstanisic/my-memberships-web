import { IconButton } from "@material-ui/core";
import { Delete, Edit, Visibility } from "@material-ui/icons";
import React from "react";
import { useHistory } from "react-router-dom";
import { WithId } from "types";
import { useDeleteConfirmation } from "./Common/useDeleteConfirmation";
import { useUrls } from "./Common/useUrls";
import { Column } from "./TestTable";

export function useTableRowActions<T extends WithId = any>(): Column<T> {
  const history = useHistory();
  const urls = useUrls();
  const rowDelete = useDeleteConfirmation(data => console.log(data));

  const view = (row: WithId) => history.push(urls.show(row.id));
  const edit = (row: WithId) => history.push(urls.edit(row.id));

  return {
    title: "View",
    align: "center",
    render: (row: T) => (
      <div className="flex justify-center">
        <IconButton onClick={() => view(row)}>
          <Visibility />
        </IconButton>
        <IconButton onClick={() => edit(row)}>
          <Edit />
        </IconButton>
        <IconButton onClick={() => rowDelete(row)}>
          <Delete />
        </IconButton>
      </div>
    ),
  };
}

export function useGlobalCreateButton() {
  const history = useHistory();
  const urls = useUrls();
  return () => history.push(urls.create());
}