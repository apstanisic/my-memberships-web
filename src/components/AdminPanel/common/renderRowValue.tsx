import { Check, Close } from "@material-ui/icons";
import React from "react";
import isNil from "lodash-es/isNil";
import { Column } from "./table/TableInterfaces";
import { Struct } from "src/core/utils/helpers";
import dayjs from "dayjs";

/**
 * Decide type of field for provided column
 * @param column Column config passed to ResourceTable
 * @param row Row with data
 */
export function renderRowValue(column: Column, row: Struct) {
  let field: any;

  if (column.field) {
    field = row[column.field];
  }

  if (field instanceof Date) {
    if (column.type === "datetime") {
      field = dayjs(field).format("DD.MM.YYYY HH:mm");
    } else {
      field = field.toDateString();
    }
  }

  if (isNil(field)) field = column.emptyValue ?? "";

  if (typeof field === "boolean") {
    field = field ? <Check /> : <Close />;
    // I do not know why I need empty line after statement above. But it throws an error
  }

  return field;
}
