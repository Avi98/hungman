"use client";

import { ReactNode } from "react";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";

interface IMuiThemeProvider {
  children: ReactNode;
}
export const MuiThemeProvider = ({ children }: IMuiThemeProvider) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
      <CssBaseline />
    </ThemeProvider>
  );
};
