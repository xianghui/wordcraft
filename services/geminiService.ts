import { Difficulty, WordData } from "../types";
import { WORD_LISTS } from '../constants';

const WORD_COUNT: Record<Difficulty, number> = {
    easy: 10,
    medium: 15,
    hard: 20,
};

// Fisher-Yates shuffle algorithm to ensure word order is random
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const fetchSpellingWords = async (difficulty: Difficulty): Promise<WordData[]> => {
    // Simulate a short delay to allow the "loading" screen to be visible
    await new Promise(res => setTimeout(res, 500));
    
    const wordList = WORD_LISTS[difficulty];
    if (!wordList) {
        console.error(`No word list found for difficulty: ${difficulty}`);
        return [];
    }
    
    const shuffledWords = shuffleArray(wordList);
    const selectedWords = shuffledWords.slice(0, WORD_COUNT[difficulty]);
    
    return selectedWords;
};
