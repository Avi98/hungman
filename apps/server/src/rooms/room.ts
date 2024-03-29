import { Inject, Injectable } from '@nestjs/common';
import { getAllLetters } from './utils';
import { IUser } from './interface/user';
import { IGameStore } from '../interface/GameStoreRes';

class Room {
  private static ALL_LETTERS = getAllLetters();
  private static MAX_CHANCE = 5;

  private users = [];
  private roomName = '';
  private gameState: IGameStore = {
    owner: '',
    word: null,
    letters: [...Room.ALL_LETTERS],
    skip: 0,
    isCorrect: false,
    incorrect: 0,
    gameOver: false,
    remainingLetters: [...Room.ALL_LETTERS],
    selectedLetters: [],
    correctSelectedLetters: [],
  };

  getConnectedUsers() {
    return this.users;
  }

  private hasSelectedCorrectLetter(letter: string, guessWord: string) {
    if (!guessWord) return;

    return guessWord.split('').includes(letter);
  }

  private getRemainingLetters = (
    selectedLetters: string[],
    allLetters: string[],
  ) => {
    return allLetters.filter(
      (allLetter) => !selectedLetters.includes(allLetter),
    );
  };

  private updateSuccessStateLetter = (
    letter: string,
    gameState: IGameStore,
  ) => {
    gameState.isCorrect = true;
    gameState.correctSelectedLetters.push(letter);
    gameState.selectedLetters.push(letter);
    gameState.remainingLetters = gameState.remainingLetters;
    gameState.remainingLetters = this.getRemainingLetters(
      gameState.selectedLetters,
      gameState.letters,
    );

    return gameState;
  };

  private updateFailedStateLetter = (letter: string, gameState: IGameStore) => {
    gameState.isCorrect = false;
    gameState.incorrect += 1;
    gameState.selectedLetters.push(letter);
    gameState.remainingLetters = this.getRemainingLetters(
      gameState.selectedLetters,
      gameState.letters,
    );

    return gameState;
  };

  private updateStateOnSelect = (letter: string, gameState: IGameStore) => {
    let updateGameState: IGameStore;

    if (this.hasSelectedCorrectLetter(letter, gameState.word)) {
      updateGameState = this.updateSuccessStateLetter(letter, gameState);
    } else {
      updateGameState = this.updateFailedStateLetter(letter, gameState);
    }
    return updateGameState;
  };

  onSelectLetter(letter: string) {
    if (this.gameState.gameOver) throw new Error('Game Over');

    if (this.gameState.incorrect === Room.MAX_CHANCE)
      throw new Error('Reached max chances Game Over');

    const gameState = this.updateStateOnSelect(letter, this.gameState);

    return gameState;
  }

  setWord(word) {
    this.gameState.word = word;
  }

  get word() {
    return this.gameState.word;
  }

  get game() {
    return this.gameState;
  }

  setName(name: string) {
    this.roomName = name;
  }

  addUser(user: IUser) {
    this.users.push(user);
  }
}

export default Room;
