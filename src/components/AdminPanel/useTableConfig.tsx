import React from "react";
import {
  Localization,
  Options,
  Column,
  MaterialTableProps,
} from "material-table";
import { AppIcons } from "./Icons";
import { WithId } from "types";
import { IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useUrls } from "./Common/useUrls";
import { Pagination } from "./Common/Pagination";
import { TableToolbar } from "./Common/TableToolbar";

interface ConfigOptions<T extends object>
  extends Omit<Partial<MaterialTableProps<T>>, "data"> {
  // data: T[];
}

interface Return<T extends WithId> {
  config: ConfigOptions<T>;
  navigate: {
    show: (row: T) => any;
    edit: (row: T) => any;
    create: (row: T) => any;
  };
  custom: any;
}

export function useTableConfig<T extends WithId>({
  pagination,
  deleting,
}: {
  deleting: any;
  pagination: any;
}): Return<T> {
  const history = useHistory();
  const urls = useUrls();

  const options: Options = {
    selection: true,
    pageSize: 12,
    pageSizeOptions: [6, 12, 24, 36],
    sorting: false,
    minBodyHeight: 400,
    // maxBodyHeight: "70vh",
    // actionsColumnIndex: -1,
    search: false,
    showFirstLastPageButtons: false,
    emptyRowsWhenPaging: false,
    padding: "dense",
  };

  const localization: Localization = {
    pagination: { labelDisplayedRows: "" },
    header: { actions: "Delete" },
  };

  const icons = AppIcons;

  const view = (row: WithId) => history.push(urls.show(row.id));
  const edit = (row: WithId) => history.push(urls.edit(row.id));
  const create = (row: WithId) => history.push(urls.create());

  const actions = [
    {
      tooltip: "Remove All Selected locations",
      icon: AppIcons.Delete as any,
      onClick: (evt: any, data: T | T[]) => {
        deleting.setData(data);
        deleting.setOpen(true);
      },
    },
    {
      icon: AppIcons.Add as any,
      onClick: create,
      isFreeAction: true,
    },
  ];

  const ActionButtons: Column<T> = {
    title: "View",
    cellStyle: { maxWidth: 100 },
    headerStyle: { maxWidth: 100, textAlign: "center" },
    render: (row: WithId) => (
      <div className="flex">
        <IconButton onClick={() => view(row)}>
          <AppIcons.Visibility />
        </IconButton>
        <IconButton onClick={() => edit(row)}>
          <AppIcons.Edit />
        </IconButton>
        <div onClick={() => deleting.setData(row)}>{deleting.button}</div>
      </div>
    ),
  };
  const components = {
    Pagination: () =>
      !pagination ? <td></td> : <Pagination meta={pagination} />,
    Toolbar: (props: any) => <TableToolbar {...props} />,
  };

  const editable = {};

  return {
    config: {
      localization,
      editable,
      icons,
      options,
      actions,
      components,
    },
    navigate: { show: view, edit, create },
    custom: ActionButtons,
  };
}
