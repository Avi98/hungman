import styled, { StyledComponent } from "@emotion/styled";
import { Flex } from "@repo/ui";

export const FlexCol: StyledComponent<any> = styled(Flex)<{
  letter: string;
}>`
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  gap: 2rem;
  margin: 2rem 0;
`;
