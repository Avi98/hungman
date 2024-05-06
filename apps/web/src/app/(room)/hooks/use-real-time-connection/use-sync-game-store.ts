import { useCallback, useEffect } from "react";
import RealTimeConnection from "../use-initalize-connection/realtime-connection";
import { useHangmanStore } from "../../../../store/use-hangman-store";
import { transformGameRes } from "../utils/transformGameRes";
import { IGameResponse } from "../../../interface/GameStore";

export const useSyncGameListener = (client: RealTimeConnection | null) => {
  const { setGameState } = useHangmanStore((state) => state);

  const updateGameState = useCallback(async () => {
    if (!client?.onSelectedLetter) return;

    client.onSelectedLetter((gameState: IGameResponse) =>
      setGameState(transformGameRes(gameState))
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client?.letterSelected, setGameState]);

  useEffect(() => {
    updateGameState();
  }, [updateGameState]);

  return;
};
