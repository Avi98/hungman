import { useCallback, useEffect } from "react";
import RealTimeConnection from "../use-initalize-connection/realtime-connection";
import { useHangmanStore } from "../../../../store/use-hangman-store";
import { transformGameRes } from "../utils/transformGameRes";

export const useSyncGameListener = (client: RealTimeConnection | null) => {
  const { setGameState } = useHangmanStore((state) => state);

  const updateGameState = useCallback(async () => {
    if (!client?.listenLetterSelected) return;

    const gameStore = await client.listenLetterSelected();

    setGameState(transformGameRes(gameStore));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client?.letterSelected, setGameState]);

  useEffect(() => {
    updateGameState();
  }, [updateGameState]);

  return;
};
