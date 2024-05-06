import { useEffect, useReducer } from "react";
import RealTimeConnection from "../use-initalize-connection/realtime-connection";
import { gameReducer, initialGameState } from "./game-reducer";

export const useGetGameState = (client: RealTimeConnection) => {
  const game = useReducer(gameReducer, initialGameState);

  useEffect(() => {
    if (!(client instanceof RealTimeConnection)) return;
  }, [client]);
};
