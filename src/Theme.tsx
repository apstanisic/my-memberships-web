import { blue } from "@material-ui/core/colors";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

export function AppTheme({ children }: any) {
  const { darkTheme } = useSelector((state: RootState) => state.ui);

  const theme = createMuiTheme({
    palette: { type: darkTheme ? "dark" : "light", primary: blue },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
