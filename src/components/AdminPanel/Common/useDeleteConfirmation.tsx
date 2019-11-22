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
import React, { useState, useEffect } from "react";
import { AppIcons } from "../Icons";
import { useDispatch, useSelector } from "react-redux";
import { setAlertPayload, showAlert } from "store/alertSlice";
import { RootState } from "store/store";
import { WithId } from "types";

/**
 * @param deleteFunc Method to be executed if user confirms yes
 */
export function useDeleteConfirmation<T extends WithId = any>(
  deleteFunc?: (data?: T) => any,
) {
  const dispatch = useDispatch();
  const alert = useSelector((state: RootState) => state.alert);
  const [watchResponse, setWatchResponse] = useState(false);
  const [alertData, setAlertData] = useState<T>();

  useEffect(() => {
    if (!watchResponse) return;
    if (
      alert.answered &&
      alert.alertPayload === alertData?.id &&
      alert.response
    ) {
      setWatchResponse(false);
      deleteFunc?.(alertData);
    }
  }, [watchResponse, alert, alertData, deleteFunc]);

  return (row: T) => {
    setWatchResponse(true);
    setAlertData(row);
    dispatch(setAlertPayload(row.id));
  };
  // return { button, alert, setData, setOpen: showConfirmDialog };
}
