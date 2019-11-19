import { Localization, Options } from "material-table";
import { AppIcons } from "./Icons";

export const options: Options = {
  selection: true,
  pageSize: 12,
  pageSizeOptions: [12, 24],
  sorting: false,
  actionsColumnIndex: -1,
  search: false,
  showFirstLastPageButtons: false,
  emptyRowsWhenPaging: false,
  padding: "dense",
};

export const localization: Localization = {
  pagination: { labelDisplayedRows: "" },
  header: { actions: "Delete" },
};

export const icons = AppIcons;
