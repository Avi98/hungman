import { ExtractType } from "./utility/expandType";

const defaultState = {
  isConnected: false,
  currRoom: {
    roomName: "",
    currUser: {},
    allUsers: [
      {
        name: "",
        userId: "",
      },
    ],
  },
  gameState: {
    owner: "",
    remainingLetters: [""],
    isChoosing: false,
    guessWord: "",
    myTurn: false,
    selectedLetters: [""],
    correctSelectedLetters: [""],
    wrongSelectedLetters: [""],
    turn: {
      name: "",
    },
    isCorrect: false,
    incorrect: 0,
    gameOver: false,
  },
};

export type Store = ExtractType<typeof defaultState>;
export default defaultState;
