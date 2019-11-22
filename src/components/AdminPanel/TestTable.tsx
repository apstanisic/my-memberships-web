import {
  CircularProgress,
  Checkbox,
  Box,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Theme,
  Toolbar,
} from "@material-ui/core";
import { Struct } from "core/utils/helpers";
import React, { useReducer, useState } from "react";
import { PaginationMetadata, WithId } from "types";
import { Pagination } from "./Common/Pagination/Pagination";
import { TableToolbar } from "./Common/TableToolbar";
import { decideFieldType } from "./decideFieldType";
import {
  useGlobalCreateButton,
  useTableRowActions,
} from "./useTableRowActions";
import { useResource } from "./Common/useResource";
import { Padding } from "components/common/Padding";
import { useTableSelection } from "./useTableSelection";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    overflowX: "auto",
    margin: "10px auto",
    position: "relative",
  },
  table: {
    minWidth: 650,
  },
  tableWrapper: {
    minHeight: 400,
    maxHeight: 640,
    overflow: "auto",
  },
  loaderWrapper: {
    zIndex: theme.zIndex.modal - 5,
    position: "absolute",
    background: "#FFFFFF",
    opacity: "0.6",
    width: "100%",
    height: "100%",
  },
  loader: {
    zIndex: theme.zIndex.modal - 4,
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export type Printable = string | React.ReactElement<any>;

export interface Column<Row extends Struct = any> {
  field?: string;
  title?: Printable;
  render?: (data: Row) => any;
  align?: "inherit" | "left" | "center" | "right" | "justify";
  emptyValue?: Printable;
  [key: string]: any;
}

interface Props<T extends Struct = any> {
  columns: Column<T>[];
  // data?: T[];
  title?: Printable;
  // pagination?: PaginationMetadata;
  // isLoading?: boolean;
  // views?: any;
  transform?: (val: any) => T;
}

export function ResourceTable<ResourceType extends WithId = any>(
  props: Props<ResourceType>,
) {
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();
  const rowActions = useTableRowActions({ onDelete: console.log });
  const create = useGlobalCreateButton();
  const [data, pg] = useResource<ResourceType>({
    setIsLoading,
    transform: props.transform,
  });
  const selection = useTableSelection(data);
  const columns = [...props.columns, rowActions];

  return (
    <Paper className={classes.root} elevation={4}>
      {isLoading && (
        <div className={classes.loaderWrapper}>
          <div className={classes.loader}>
            <CircularProgress />
          </div>
        </div>
      )}
      <TableToolbar create={create} title={props.title} />
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
      <Pagination meta={pg.pg} />
    </Paper>
  );
}
