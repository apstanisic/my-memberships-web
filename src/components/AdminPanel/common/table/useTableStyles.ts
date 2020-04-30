import { makeStyles, Theme } from "@material-ui/core";

export const useResourceTableStyles = makeStyles((theme: Theme) => ({
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
