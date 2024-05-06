import styled, { StyledComponent } from "@emotion/styled";
import { Box } from "@repo/ui";

export const KeysWrapper: StyledComponent<any> = styled(Box)({
  placeItems: "center",
  display: "grid",
  gridTemplateColumns: "repeat(10, 1fr)",
  gap: "1rem",
  width: "calc(100% - 40rem)",
});
export const LastRow: StyledComponent<any> = styled(Box)({
  gridColumn: "span 2",
});
