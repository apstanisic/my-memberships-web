import { Localization, Options } from "material-table";
import { tableIcons } from "./Icons";

export const options: Options = {
  selection: true,
  pageSize: 12,
  pageSizeOptions: [12, 24],
  sorting: false,
  actionsColumnIndex: -1,
  search: false,
  showFirstLastPageButtons: false,
  emptyRowsWhenPaging: false
};

export const localization: Localization = {
  pagination: { labelDisplayedRows: "" },
  header: { actions: "Delete" }
};

export const icons = tableIcons;
