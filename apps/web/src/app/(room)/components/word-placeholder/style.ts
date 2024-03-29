import styled, { StyledComponent } from "@emotion/styled";
import { Box, Flex } from "@repo/ui";

export const WordBoxContainer: StyledComponent<any> = styled(Box)<{
  letter: string;
}>`
  background-color: white;
  border-radius: 0.2rem;
  padding: 0.5rem;
  color: black;
  font-size: 2.1rem;
  font-weight: normal;
  margin: 2rem 1rem;
  text-transform: capitalize;
  :after {
    content: ${(props) => (props.letter ? " " : " ")};
    opacity: 0;
  }
`;

export const PlaceholderContainer: StyledComponent<any> = styled(Flex)({});
