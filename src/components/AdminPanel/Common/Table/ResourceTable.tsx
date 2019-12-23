import {
  Box,
  Checkbox,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
} from "@material-ui/core";
import React, { useState } from "react";
import { Struct } from "src/core/utils/helpers";
import { Printable, WithId } from "src/types";
import { decideFieldType } from "../../decideFieldType";
import { useTableRowActions } from "../../useTableRowActions";
import { useTableSelection } from "../../useTableSelection";
import { Pagination } from "../Pagination/Pagination";
import { TableToolbar } from "../TableToolbar";
import { useResource } from "../useResource";
import { Column } from "./TableInterfaces";
import { useResourceTableStyles } from "./useTableStyles";
import { useOpenCreateForm } from "../../useOpenCreateForm";

interface Props<T extends Struct = any> {
  columns: Column<T>[];
  title?: Printable;
  transform?: (val: any) => T;
  actions?: {
    hasEdit?: boolean;
    hasCreate?: boolean;
    hasDelete?: boolean;
  };
}

export function ResourceTable<ResourceType extends WithId = any>(
  props: Props<ResourceType>,
) {
  // Is table waiting for data
  // Css classes
  const classes = useResourceTableStyles();
  const openCreateForm = useOpenCreateForm();
  const { data, loading, onDelete, pg } = useResource<ResourceType>(
    props.transform,
  );
  const rowActions = useTableRowActions({
    // onDelete: val => {
    //   console.log(val);
    // },
    onDelete: props.actions?.hasDelete ? onDelete : undefined,
    hasEdit: props.actions?.hasEdit,
  });
  const selection = useTableSelection(data);
  // All columns that user passed and additional buttons (view, edit, delete)
  const columns = [...props.columns, rowActions];

  return (
    <Paper className={classes.root} elevation={4}>
      {loading.isLoading && (
        <div className={classes.loaderWrapper}>
          <div className={classes.loader}>
            <CircularProgress />
          </div>
        </div>
      )}
      <TableToolbar
        hasCreate={props.actions?.hasCreate}
        selection={selection}
        create={openCreateForm}
        title={props.title}
        deleteMany={onDelete}
      />
      <div className={classes.tableWrapper}>
        <Table size="small" className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell padding="none">
                <Box pl={1}>
                  <Checkbox
                    checked={selection.allSelected}
                    onChange={(_, checked) => selection.changeAll(checked)}
                    indeterminate={selection.intermidiate}
                  />
                </Box>
              </TableCell>
              {columns.map((column, i) => (
                <TableCell align={column.align} key={i}>
                  <Toolbar variant="dense">{column.title}</Toolbar>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, j) => (
              <TableRow
                key={row?.id ?? j}
                selected={selection.selected[row.id]}
              >
                {/* padding="checkbox" not working. That's why I added box */}
                <TableCell padding="none">
                  <Box pl={1}>
                    <Checkbox
                      className="px-3"
                      checked={selection.selected[row.id] ?? false}
                      onChange={(_, checked) =>
                        selection.changeOne(row.id, checked)
                      }
                    />
                  </Box>
                </TableCell>
                {columns.map((col, i) => (
                  <TableCell
                    align={col.align}
                    key={`${row.id}${i}`}
                    component="th"
                    scope="row"
                  >
                    <div>{col.render?.(row) ?? decideFieldType(col, row)} </div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Pagination meta={pg} />
    </Paper>
  );
}
