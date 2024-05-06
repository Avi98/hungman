"use client";
import { useCallback } from "react";
import { useInitializeConnection } from "../use-initalize-connection";
import { useHangmanStore } from "../../../../store/use-hangman-store";
import { useSyncGameListener } from "./use-sync-game-store";

export const useRealTimeConnection = () => {
  const { gameState } = useHangmanStore((state) => state);
  console.log({ gameState });

  const { client, isConnected, connectionId } = useInitializeConnection();
  useSyncGameListener(client);

  const selectedLetters = useCallback(
    (letter: string) => {
      client.letterSelected(letter);
    },
    [client]
  );

  return {
    gameState,
    currentConnectionId: connectionId,
    selectedLetters,
  };
};
