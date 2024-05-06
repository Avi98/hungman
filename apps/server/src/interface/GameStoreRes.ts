export interface IGameStore {
  owner: string;
  word: string;
  remainingLetters: string[];
  letters: string[];
  selectedLetters: string[];
  skip: number;
  isCorrect: boolean;
  incorrect: number;
  correctSelectedLetters: string[];
  gameOver: boolean;
}
