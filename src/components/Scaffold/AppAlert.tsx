import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store/store";
import { closeAlert, respondToAlert } from "src/store/alertSlice";

export function AppAlert() {
  const alert = useSelector((state: RootState) => state.alert);
  const dispatch = useDispatch();

  return (
    <div>
      <Dialog open={alert.show} onClose={() => dispatch(closeAlert())}>
        <DialogTitle id="alert-dialog-title">
          <Typography component="span" variant="h5">
            {alert.header}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography component="span" variant="h6">
              {alert.subheader}
            </Typography>
          </DialogContentText>
          <DialogActions>
            <Button
              onClick={() => dispatch(respondToAlert({ response: false }))}
              color="primary"
            >
              No
            </Button>
            <Button
              onClick={() => dispatch(respondToAlert({ response: true }))}
              color="primary"
            >
              Yes
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
}
