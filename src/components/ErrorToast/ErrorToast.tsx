import React from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

export interface Props {
  open?: boolean;
  handleClose: () => void;
  duration: Number;
  message: String;
}

export const ErrorToast = ({ open, handleClose, duration, message }: Props) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={handleClose}
        severity="error"
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};
