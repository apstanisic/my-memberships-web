import { Struct } from "src/core/utils/helpers";

import { Printable } from "src/types";

export interface Column<Row extends Struct = any> {
  field?: string;
  title?: Printable;
  render?: (data: Row) => any;
  align?: "inherit" | "left" | "center" | "right" | "justify";
  emptyValue?: Printable;
  [key: string]: any;
}
