import { IconButton } from "@material-ui/core";
import { Delete, Edit, Visibility } from "@material-ui/icons";
import React from "react";
import { useHistory } from "react-router-dom";
import { WithId } from "src/types";
import { useUrls } from "./useUrls";
import { Column } from "../table/TableInterfaces";

interface Props<T> {
  onDelete?: (row: T | T[]) => any;
  hasEdit?: boolean;
}

/**
 * Generate view, edit, delete actions for this table.
 * Row is possed when action column is rendering. We just need to
 * tell him how to delete data. It already knows how to open show and
 * edit form
 * @param props Accepts onDelete method that will be executed
 *  with passed row
 */
export function useTableRowActions<T extends WithId = any>(props: Props<T>): Column<T> {
  const history = useHistory();
  const urls = useUrls();
  // const rowDelete = useDeleteConfirmation(props?.onDelete);

  const view = (row: WithId) => history.push(urls.show({ resourceId: row.id }));
  const edit = (row: WithId) => history.push(urls.edit({ resourceId: row.id }));

  return {
    title: "Actions",
    align: "center",
    render: (row: T) => (
      <div className="flex justify-center">
        <IconButton onClick={() => view(row)}>
          <Visibility />
        </IconButton>
        {props.hasEdit !== false && (
          <IconButton onClick={() => edit(row)}>
            <Edit />
          </IconButton>
        )}
        {props?.onDelete && (
          <IconButton onClick={() => props?.onDelete?.(row)}>
            <Delete />
          </IconButton>
        )}
      </div>
    ),
  };
}
