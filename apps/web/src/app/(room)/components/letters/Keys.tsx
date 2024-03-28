"use client";

import { Keys } from "@repo/ui";
import { KeysWrapper, LastRow } from "./style";
import { useRealTimeConnection } from "../../hooks/use-real-time-connection/use-real-time-connection";

const letters = "abcdefghijklmnopqrstuvwxyz".toLowerCase().split("");

export const AllLetters = () => {
  const {
    selectedLetters: updatedSelectedLetters,
    gameState: { selectedLetters, guessWord },
  } = useRealTimeConnection();

  return (
    <KeysWrapper>
      {letters.slice(0, 20).map((l) => (
        <Keys
          key={l}
          letter={l.toUpperCase()}
          onClick={updatedSelectedLetters}
          isRightLetter={Boolean(
            selectedLetters.includes(l.toLowerCase()) &&
              guessWord.split("").includes(l.toLowerCase())
          )}
          isWrongLetter={Boolean(
            selectedLetters.includes(l.toLowerCase()) &&
              !guessWord.split("").includes(l.toLowerCase())
          )}
        />
      ))}
      <LastRow />
      {letters.slice(-6).map((l) => (
        <Keys
          key={l}
          letter={l.toUpperCase()}
          onClick={updatedSelectedLetters}
          isRightLetter={Boolean(
            selectedLetters.includes(l.toLowerCase()) &&
              guessWord.split("").includes(l.toLowerCase())
          )}
          isWrongLetter={Boolean(
            selectedLetters.includes(l.toLowerCase()) &&
              !guessWord.split("").includes(l.toLowerCase())
          )}
        />
      ))}
    </KeysWrapper>
  );
};
