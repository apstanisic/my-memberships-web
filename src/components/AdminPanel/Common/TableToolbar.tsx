import React, { Fragment, useState } from "react";
import { FilterInput } from "./FilterInput";
import { Struct } from "core/utils/helpers";
import qs from "query-string";
import { useLocation } from "react-router-dom";
import { useChangeSearch } from "../useChangeSearch";
import { Toolbar } from "@material-ui/core";
import { MTableToolbar } from "material-table";

export function TableToolbar(props: any) {
  const { search } = useLocation();
  const [filter, setFilter] = useState<Struct>(qs.parse(search));
  const allQueries = Object.entries(filter);
  const filterArr = allQueries.filter(([key, val]) => !key.startsWith("pg_"));
  const changeSearch = useChangeSearch();
  return (
    <div className="bg-blue-100 border-b border-gray-400">
      <MTableToolbar {...props} />
      {filterArr.length > 0 && (
        <Toolbar className="pb-2">
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
