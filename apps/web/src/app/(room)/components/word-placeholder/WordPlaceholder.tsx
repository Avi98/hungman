"use client";

import { Flex } from "@repo/ui";
import { useRealTimeConnection } from "../../hooks/use-real-time-connection/use-real-time-connection";
import { WordBoxContainer } from "./style";

interface IWordPlaceholder {
  letter: string;
}
const Placeholder = (props: IWordPlaceholder) => {
  return (
    <WordBoxContainer letter={props.letter}>
      {/* <div></div> */}
    </WordBoxContainer>
  );
};

export const WordPlaceholder = () => {
  const {
    gameState: { guessWord, selectedLetters },
  } = useRealTimeConnection();

  return (
    <Flex>
      {guessWord.split("").map((l) => (
        <Placeholder letter={selectedLetters.includes(l) ? l : ""} />
      ))}
      <Placeholder letter={""} />
    </Flex>
  );
};
