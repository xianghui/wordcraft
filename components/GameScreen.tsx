import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GameBoard } from './GameBoard';
import { WordDisplay } from './WordDisplay';
import { HUD } from './HUD';
import { BlockData } from '../types';
import { ALPHABET } from '../constants';

interface GameScreenProps {
  targetWord: string;
  imageUrl: string;
  onWordComplete: () => void;
  onPreviousWord: () => void;
  isFirstWord: boolean;
  onBackToMenu: () => void;
  progress: { current: number; total: number };
}

export const GameScreen: React.FC<GameScreenProps> = ({
  targetWord,
  imageUrl,
  onWordComplete,
  onPreviousWord,
  isFirstWord,
  onBackToMenu,
  progress,
}) => {
  const [grid, setGrid] = useState<BlockData[]>([]);
  const [spelledWord, setSpelledWord] = useState('');
  const [isLevelComplete, setIsLevelComplete] = useState(false);
  const [incorrectClicks, setIncorrectClicks] = useState<string[]>([]);
  const [letterUsage, setLetterUsage] = useState<Record<string, { required: number, spelled: number }>>({});
  const [isHintUsed, setIsHintUsed] = useState(false);
  const [hintedBlockId, setHintedBlockId] = useState<string | null>(null);
  const [wrongTries, setWrongTries] = useState(0);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const timeoutIdsRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    // This cleanup function runs when the component unmounts (e.g., next word loads)
    return () => {
      // Clear any lingering timers from incorrect clicks
      timeoutIdsRef.current.forEach(clearTimeout);
      // Close the audio context to release resources
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(e => console.error("Failed to close audio context", e));
        audioContextRef.current = null;
      }
    };
  }, []);

  const getAudioContext = useCallback((): AudioContext | null => {
    if (!audioContextRef.current) {
        try {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            if (AudioContext) {
                audioContextRef.current = new AudioContext();
            } else {
                console.error("Web Audio API is not supported in this browser.");
                return null;
            }
        } catch (e) {
            console.error("Could not create AudioContext.", e);
            return null;
        }
    }
    const context = audioContextRef.current;
    if (context.state === 'suspended') {
        context.resume().catch(e => console.error("Could not resume audio context", e));
    }
    return context;
  }, []);

  const playIncorrectSound = useCallback(() => {
    const context = getAudioContext();
    if (!context) return;
    
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(120, context.currentTime);
    gainNode.gain.setValueAtTime(0.3, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.2);

    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + 0.2);
  }, [getAudioContext]);

  const playCorrectSound = useCallback(() => {
    const context = getAudioContext();
    if (!context) return;

    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.type = 'sine'; // A softer sound for success
    gainNode.gain.setValueAtTime(0.2, context.currentTime);

    // Play a little ascending arpeggio
    oscillator.frequency.setValueAtTime(440, context.currentTime); // A4
    oscillator.frequency.linearRampToValueAtTime(554.37, context.currentTime + 0.1); // C#5
    oscillator.frequency.linearRampToValueAtTime(659.25, context.currentTime + 0.2); // E5

    gainNode.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.3);

    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + 0.3);
  }, [getAudioContext]);


  const generateGrid = useCallback(() => {
    const alphabetBlocks = ALPHABET.split('').map(letter => ({
      letter,
      id: letter,
      isMined: false,
    }));
    setGrid(alphabetBlocks);
  }, []);

  useEffect(() => {
    // Setup letter usage tracking for the new word
    const counts: Record<string, { required: number, spelled: number }> = {};
    for (const letter of ALPHABET) {
      counts[letter] = { required: 0, spelled: 0 };
    }
    for (const letter of targetWord) {
      if (counts[letter]) {
        counts[letter].required++;
      }
    }
    setLetterUsage(counts);

    // Generate the A-Z grid
    generateGrid();
    
    // Reset state for the new word
    setSpelledWord('');
    setIsLevelComplete(false);
    setIsHintUsed(false);
    setHintedBlockId(null);
    setWrongTries(0);
  }, [targetWord, generateGrid]);

  useEffect(() => {
    if (targetWord.length > 0 && spelledWord.length === targetWord.length && !isLevelComplete) {
      playCorrectSound();
      // Delay setting level complete to allow sound to play
      const timer = setTimeout(() => {
          setIsLevelComplete(true);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [spelledWord, targetWord, isLevelComplete, playCorrectSound]);

  const handleBlockClick = useCallback((block: BlockData) => {
    if (isLevelComplete || block.isMined) return;

    const nextLetterIndex = spelledWord.length;
    if (nextLetterIndex >= targetWord.length) return;
    
    const nextLetterNeeded = targetWord[nextLetterIndex];

    if (block.letter === nextLetterNeeded) {
      // Correct letter clicked
      setSpelledWord(prev => prev + block.letter);
      
      const updatedUsage = {
        ...letterUsage,
        [block.letter]: {
          ...letterUsage[block.letter],
          spelled: letterUsage[block.letter].spelled + 1,
        },
      };

      setLetterUsage(updatedUsage);
      
      if (updatedUsage[block.letter].spelled === updatedUsage[block.letter].required) {
        setGrid(prevGrid => prevGrid.map(b => 
          b.id === block.id ? { ...b, isMined: true } : b
        ));
      }
    } else {
      // Incorrect letter clicked
      playIncorrectSound();
      setWrongTries(prev => prev + 1);
      if (!block.isMined) {
          setIncorrectClicks(prev => [...prev, block.id]);
          const timerId = window.setTimeout(() => {
              setIncorrectClicks(prev => prev.filter(id => id !== block.id));
              timeoutIdsRef.current.delete(timerId); // Clean up from the set
          }, 500);
          timeoutIdsRef.current.add(timerId); // Add to the set
      }
    }
  }, [isLevelComplete, spelledWord, targetWord, playIncorrectSound, letterUsage]);
  
  const handleSpeakWord = useCallback(() => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(targetWord.toLowerCase());
      utterance.rate = 0.5;
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Sorry, your browser doesn't support text-to-speech.");
    }
  }, [targetWord]);

  const handleHintRequest = useCallback(() => {
    if (isHintUsed || isLevelComplete) return;

    const nextLetterNeeded = targetWord[spelledWord.length];
    if (nextLetterNeeded) {
        setIsHintUsed(true);
        setHintedBlockId(nextLetterNeeded);
        const timerId = window.setTimeout(() => {
            setHintedBlockId(null);
            timeoutIdsRef.current.delete(timerId);
        }, 2000);
        timeoutIdsRef.current.add(timerId);
    }
  }, [isHintUsed, isLevelComplete, targetWord, spelledWord.length]);
  
  const handleShowAnswer = useCallback(() => {
    if (isLevelComplete) return;
    setSpelledWord(targetWord);
    // The useEffect watching spelledWord will handle the rest (sound, isLevelComplete flag)
  }, [isLevelComplete, targetWord]);
  
  const shouldShowHint = wrongTries >= 3;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-2 sm:p-4 text-white">
        <HUD 
            onNextWord={onWordComplete} 
            isLevelComplete={isLevelComplete} 
            onBackToMenu={onBackToMenu}
            progress={progress}
            onPreviousWord={onPreviousWord}
            isFirstWord={isFirstWord}
            onHintRequest={handleHintRequest}
            isHintUsed={isHintUsed}
            onShowAnswer={handleShowAnswer}
            showHintButton={shouldShowHint}
        />
        <WordDisplay 
            targetWord={targetWord} 
            spelledWord={spelledWord} 
            onSpeakWord={handleSpeakWord} 
            imageUrl={imageUrl}
            isImageLoading={false}
        />
        <GameBoard 
            grid={grid} 
            onBlockClick={handleBlockClick} 
            incorrectClicks={incorrectClicks}
            hintedBlockId={hintedBlockId}
        />
    </div>
  );
};
