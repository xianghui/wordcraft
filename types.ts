
export interface BlockData {
  letter: string;
  id: string;
  isMined: boolean;
}

export type GameState = 'start' | 'loading' | 'playing' | 'level-complete';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface WordData {
  word: string;
  imageUrl: string;
}
