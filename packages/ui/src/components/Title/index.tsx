"use client";
import { ReactNode } from "react";
import { Typography } from "@mui/material";

interface ITitle {
  children: ReactNode;
}
const Title = ({ children }: ITitle) => {
  return (
    <Typography variant="h2" sx={{ textAlign: "center" }}>
      {children}
    </Typography>
  );
};

export default Title;
