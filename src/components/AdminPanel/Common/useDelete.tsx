import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Typography,
  DialogContentText,
  DialogContent,
} from "@material-ui/core";
import { Padding } from "components/common/Padding";
import React, { useState } from "react";
import { AppIcons } from "../Icons";

/** Data is info that user wants to pass */
export function useDelete<T = undefined>(
  handle: (data?: T) => any,
  initialData: T | undefined = undefined,
) {
  const [data, setData] = useState(initialData);
  const [open, setOpen] = useState(false);

  function handleClick(option: boolean) {
    setOpen(false);
    if (option) {
      handle(data);
    }
  }

  const button = (
    <IconButton onClick={() => setOpen(true)}>
      <AppIcons.Delete />
    </IconButton>
  );

  const alert = (
    <div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle id="alert-dialog-title">
          <Typography component="span" variant="h5">
            Are you sure?
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography component="span" variant="h6">
              This action is unrevirsable
            </Typography>
          </DialogContentText>
          <DialogActions>
            <Button onClick={() => handleClick(false)} color="primary">
              No
            </Button>
            <Button onClick={() => handleClick(true)} color="primary">
              Yes
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
  return { button, alert, setData, setOpen };
}
