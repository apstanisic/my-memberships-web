import { Box, MenuItem, Select } from "@material-ui/core";
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePerPage } from "src/store/adminSlice";
import { RootState } from "src/store/store";

/**
 * Form for changing how much results to show per page
 * @Todo Store in idb
 */
export function PaginationPerPage() {
  const dispatch = useDispatch();
  const perPage = useSelector((state: RootState) => state.admin.perPage);

  const handleChangePerPage = (event: React.ChangeEvent<{ value: any }>) => {
    const value = parseInt(event.target.value);
    if (value !== 6 && value !== 12 && value !== 24 && value !== 36) {
      return;
    }
    dispatch(changePerPage(value));
  };

  return (
    <Fragment>
      <div className="pr-4">Per page</div>
      <Box pr={3} height="100%">
        <div className="h-8 overflow-hidden">
          <Select
            className="h-8 w-16"
            variant="outlined"
            value={perPage}
            onChange={handleChangePerPage}
          >
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={12}>12</MenuItem>
            <MenuItem value={24}>24</MenuItem>
            <MenuItem value={36}>36</MenuItem>
          </Select>
        </div>
      </Box>
    </Fragment>
  );
}
