export interface IGameResponse {
  skip: number;
  owner: string;
  word: string;
  isCorrect: boolean;
  incorrect: number;
  gameOver: boolean;
  letters: string[];
  remainingLetters: string[];
  selectedLetters: string[];
}
