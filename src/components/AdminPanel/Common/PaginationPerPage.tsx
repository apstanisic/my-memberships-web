import { MenuItem, Select } from "@material-ui/core";
import { Padding } from "components/common/Padding";
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePerPage } from "store/adminSlice";
import { RootState } from "store/store";

export function PaginationPerPage() {
  //   Per page code
  const dispatch = useDispatch();
  const perPage = useSelector((state: RootState) => state.admin.perPage);
  const handleChangePerPage = (event: React.ChangeEvent<{ value: any }>) => {
    const value = parseInt(event.target.value);
    if (value !== 6 && value !== 12 && value !== 24 && value !== 36) {
      return;
    }
    dispatch(changePerPage(value));
  };

  //   {/* Per page is commented for now. */}
  return (
    <Fragment>
      <div className="pr-3">Per page</div>
      <Padding size={5} side="r" className="h-full">
        <div className="h-8 overflow-hidden">
          <Select
            className="h-8 w-16"
            variant="outlined"
            value={perPage}
            onChange={handleChangePerPage}
            //   labelWidth={labelWidth}
          >
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={12}>12</MenuItem>
            <MenuItem value={24}>24</MenuItem>
            <MenuItem value={36}>36</MenuItem>
          </Select>
        </div>
      </Padding>
    </Fragment>
  );
}
