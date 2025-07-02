import React, { useState, useCallback, useEffect } from 'react';
import { GameScreen } from './components/GameScreen';
import { fetchSpellingWords } from './services/geminiService';
import { GameState, Difficulty, WordData } from './types';
import { WORD_LISTS } from './constants';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('start');
  const [words, setWords] = useState<WordData[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [error, setError] = useState<string | null>(null);

  const handleNextWord = useCallback(() => {
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
    } else {
      // Game over, all words spelled
      setGameState('start');
      alert("Congratulations! You've spelled all the words!");
    }
  }, [currentWordIndex, words.length]);
  
  const handlePreviousWord = useCallback(() => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(prev => prev - 1);
    }
  }, [currentWordIndex]);

  const startNewGame = useCallback(async () => {
    setGameState('loading');
    setError(null);
    try {
      const fetchedWords = await fetchSpellingWords(difficulty);
      if (fetchedWords.length > 0) {
        setWords(fetchedWords);
        setCurrentWordIndex(0);
        setGameState('playing');
      } else {
        throw new Error("Word list returned was empty.");
      }
    } catch (e) {
        console.error("Failed to load words.", e);
        setError("Could not load words. Using a default list.");
        setWords(WORD_LISTS[difficulty].slice(0, 10));
        setCurrentWordIndex(0);
        setGameState('playing');
    }
  }, [difficulty]);
  
  const backToMenu = () => {
    setGameState('start');
  }

  const renderContent = () => {
    switch (gameState) {
      case 'loading':
        return (
          <div className="flex flex-col items-center justify-center text-white text-2xl">
            <div className="animate-spin mb-4 text-6xl">⛏️</div>
            <p>GENERATING WORLD...</p>
            {error && <p className="text-yellow-400 text-sm mt-4">{error}</p>}
          </div>
        );
      case 'playing':
        if (words.length === 0) {
            return <p className="text-white">No words loaded.</p>
        }
        return (
          <GameScreen
            key={currentWordIndex}
            targetWord={words[currentWordIndex].word.toUpperCase()}
            imageUrl={words[currentWordIndex].imageUrl}
            onWordComplete={handleNextWord}
            onPreviousWord={handlePreviousWord}
            isFirstWord={currentWordIndex === 0}
            onBackToMenu={backToMenu}
            progress={{current: currentWordIndex + 1, total: words.length}}
          />
        );
      case 'start':
      default:
        return (
          <div className="w-full max-w-md bg-stone-800 bg-opacity-75 p-8 rounded-lg shadow-2xl block-style border-stone-900 text-center">
            <h1 className="text-5xl text-yellow-400 mb-6 drop-shadow-[2px_2px_0_rgba(0,0,0,0.8)]">WordCraft</h1>
            <p className="text-stone-300 mb-8">Select a difficulty and start spelling!</p>
            
            <div className="flex justify-center space-x-2 sm:space-x-4 mb-8">
              {(['easy', 'medium', 'hard'] as Difficulty[]).map(level => (
                <button
                  key={level}
                  onClick={() => setDifficulty(level)}
                  className={`px-4 py-2 sm:px-6 sm:py-3 rounded-md text-sm sm:text-base uppercase font-bold transition-all duration-200 block-style ${
                    difficulty === level
                      ? 'bg-yellow-400 text-stone-900 border-yellow-600 scale-105'
                      : 'bg-stone-600 text-stone-300 hover:bg-stone-500 hover:text-white border-stone-800'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>

            <button 
                onClick={startNewGame}
                className="w-full px-6 py-4 bg-green-600 text-white text-xl uppercase rounded-md hover:bg-green-700 active:bg-green-800 transform hover:-translate-y-1 transition-transform duration-150 shadow-lg block-style border-green-800"
            >
                Start Mining
            </button>
            {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
          </div>
        );
    }
  };

  return (
    <div className="bg-stone-900 min-h-screen w-full flex items-center justify-center font-sans bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">
       <style>{`
        .block-style {
          border-width: 4px;
          border-bottom-width: 8px;
          border-right-width: 8px;
        }
        .block-inset {
          border-width: 4px;
          border-top-width: 8px;
          border-left-width: 8px;
        }
      `}</style>
      <main className="w-full h-full flex flex-col items-center justify-center p-4">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
