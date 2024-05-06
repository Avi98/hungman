export const initialGameState = {} as const;

type GameStateType = typeof initialGameState;

export const gameReducer = (
  gameState: GameStateType,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case "any":
      return gameState;
    default:
      return gameState;
  }
};
