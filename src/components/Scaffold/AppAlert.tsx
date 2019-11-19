import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import { Padding } from "components/common/Padding";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store/store";
// import { changeAlert } from "store/adminSlice";

export function AppAlert() {
  const dispatch = useDispatch();
  // const alert = useSelector((state: RootState) => state.admin.alert);

  function handleClick(response: boolean) {
    // dispatch(changeAlert({ response, text: alert.text, show: false }));
  }

  return (
    <div>
      {/* <Dialog open={alert.show} onClose={() => handleClick(false)}>
        <Padding size={2}>
          <DialogTitle id="alert-dialog-title">{alert.text}</DialogTitle>
          <DialogActions>
            <Button onClick={() => handleClick(false)} color="primary">
              No
            </Button>
            <Button onClick={() => handleClick(true)} color="primary">
              Yes
            </Button>
          </DialogActions>
        </Padding>
      </Dialog> */}
    </div>
  );
}
