import Box, { type BoxProps } from "@mui/material/Box";
import { ReactNode } from "react";

interface IBoxComponent extends BoxProps {
  children: ReactNode;
}

export const Flex = ({ children, ...props }: IBoxComponent) => {
  return (
    <Box {...props} sx={{ display: "flex", flexDirection: "row" }}>
      {children}
    </Box>
  );
};
