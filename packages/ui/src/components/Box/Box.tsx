import Box, { type BoxProps } from "@mui/material/Box";
import { ReactNode } from "react";

interface IBoxComponent extends BoxProps {
  children: ReactNode;
}

export const BoxComponent = ({ children, ...props }: IBoxComponent) => {
  return <Box {...props}>{children}</Box>;
};
