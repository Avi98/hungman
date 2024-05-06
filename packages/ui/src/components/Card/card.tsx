"use client";

import { type PaperProps } from "@mui/material/Paper";
import { ReactNode } from "react";
import { StyledPaper } from "./style";

interface ICard extends PaperProps {
  children: ReactNode;
}
export const Card = ({ children, ...muiPaperProps }: ICard) => {
  return <StyledPaper {...muiPaperProps}>{children}</StyledPaper>;
};
