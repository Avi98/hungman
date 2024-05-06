import Stack, { type StackProps } from "@mui/material/Stack";
import { ReactNode } from "react";

interface IStack extends StackProps {
  children: ReactNode;
}
export const StackComponent = ({ children, ...props }: IStack) => {
  return <Stack {...props}>{children}</Stack>;
};
