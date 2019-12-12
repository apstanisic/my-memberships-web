import { Toolbar, Typography, IconButton, Button } from "@material-ui/core";
import { Struct } from "src/core/utils/helpers";
import qs from "query-string";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useChangeSearch } from "../useChangeSearch";
import { FilterInput } from "./FilterInput";
import { Add, Delete } from "@material-ui/icons";
import { Printable } from "src/types";
import { useTableSelection } from "../useTableSelection";

interface Props {
  create: (val?: any) => any;
  title?: Printable;
  selection: ReturnType<typeof useTableSelection>;
  deleteMany?: (val: any[]) => any;
}

export function TableToolbar({ title, create, selection, deleteMany }: Props) {
  const { search } = useLocation();
  const [filter, setFilter] = useState<Struct>(qs.parse(search));
  const allQueries = Object.entries(filter);
  const filterArr = allQueries.filter(([key, val]) => !key.startsWith("pg_"));
  const changeSearch = useChangeSearch();
  const hasSelected = selection.intermidiate || selection.allSelected;
  // console.log(filterArr);
  const toDelete = Object.keys(selection.selected).map(id => ({ id }));

  return (
    <div className="bg-gray-200 border-b border-gray-300">
      <Toolbar>
        <Typography component="h1" variant="h5">
          {title}
        </Typography>
        <div className="flex ml-auto">
          {hasSelected && deleteMany ? (
            <Button endIcon={<Delete />} onClick={() => deleteMany(toDelete)}>
              Delete
            </Button>
          ) : (
            <IconButton onClick={() => create()}>
              <Add />
            </IconButton>
          )}
        </div>
      </Toolbar>
      {filterArr.length > 0 && (
        <Toolbar className="pb-2 flex items-center">
          {filterArr.map(([name, val]) => {
            const sf = (key: string, val: any): any => {
              setFilter({ ...filter, [key]: val });
            };
            return (
              <FilterInput
                key={name}
                name={name}
                val={val}
                setFilter={sf}
                buttonClick={name => {
                  if (name) {
                    changeSearch({ ...filter, [name]: "" });
                  } else {
                    changeSearch(filter);
                  }
                }}
              />
            );
          })}
        </Toolbar>
      )}
    </div>
  );
}
