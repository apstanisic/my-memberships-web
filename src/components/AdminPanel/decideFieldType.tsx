import { Check, Close } from "@material-ui/icons";
import React from "react";
import isNil from "lodash-es/isNil";
import { Column } from "./Common/Table/TableInterfaces";
import { Struct } from "src/core/utils/helpers";
import dayjs from "dayjs";

export function decideFieldType(column: Column, row: Struct, type?: string) {
  let field: any;

  if (column.field) {
    field = row[column.field];
  }

  if (field instanceof Date) {
    if (type === "datetime") {
      field = dayjs(field).format("DD.MM.YYYY mm:HH");
    } else {
      field = field.toDateString();
    }
  }

  if (isNil(field)) field = column.emptyValue ?? "";

  if (typeof field === "boolean") {
    field = field ? <Check /> : <Close />;
  }

  return field;
}
