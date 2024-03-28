import { Store } from "../../../../store/defaultState";
import { IGameResponse } from "../../../interface/GameStore";

export const transformGameRes = (
  gameRes: IGameResponse
): Store["gameState"] => {
  return {
    owner: gameRes.owner,
    correctSelectedLetters: gameRes.word
      .split(",")
      .filter((wordLetter) => gameRes.selectedLetters.includes(wordLetter)),
    gameOver: gameRes.gameOver,
    incorrect: gameRes.incorrect,
    guessWord: gameRes.word,
    wrongSelectedLetters: gameRes.word
      .split(",")
      .filter((wordLetter) => !gameRes.selectedLetters.includes(wordLetter)),
    isCorrect: gameRes.isCorrect,
    isChoosing: false,
    myTurn: false,
    remainingLetters: gameRes.remainingLetters,
    selectedLetters: gameRes.selectedLetters,
    turn: {
      name: gameRes.whoseTurn || "",
    },
  };
};
