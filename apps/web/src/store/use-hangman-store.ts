import { create } from "zustand";
import initialState, { Store } from "./defaultState";

type HangmanStoreType = Store & {
  updateSelectedLetters: (letters: string[]) => void;
  addNewUser: (userInfo: any) => void;
  setGameState: (gameState: Store["gameState"]) => void;
};

export const useHangmanStore = create<HangmanStoreType>((set) => ({
  ...initialState,

  addNewUser: (userInfo: any) =>
    set((state) => ({
      ...state,
      currRoom: {
        ...state.currRoom,
        allUsers: [...state.currRoom.allUsers, userInfo],
      },
    })),

  updateSelectedLetters: (updateSelectedLetters: string[]) =>
    set((state: Store) => ({
      ...state,
      gameState: {
        ...state.gameState,
        selectedState: updateSelectedLetters,
      },
    })),

  setGameState: (gameState: Store["gameState"]) =>
    set((state: Store) => ({
      ...state,
      gameState,
    })),
}));
