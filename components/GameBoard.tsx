
import React from 'react';
import { LetterBlock } from './LetterBlock';
import { BlockData } from '../types';

interface GameBoardProps {
  grid: BlockData[];
  onBlockClick: (block: BlockData) => void;
  incorrectClicks: string[];
  hintedBlockId: string | null;
}

export const GameBoard: React.FC<GameBoardProps> = ({ grid, onBlockClick, incorrectClicks, hintedBlockId }) => {
  return (
    <>
      <style>{`
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .shake-anim {
            animation: shake 0.5s ease-in-out;
        }
        @keyframes pulse-glow {
            0%, 100% {
                box-shadow: 0 0 10px 0px rgba(168, 85, 247, 0.4);
            }
            50% {
                box-shadow: 0 0 20px 8px rgba(168, 85, 247, 0.7);
            }
        }
        .hint-pulse {
            animation: pulse-glow 1s ease-in-out infinite;
            border-color: #c084fc; /* A brighter purple */
        }
      `}</style>
      <div 
          className="flex flex-wrap justify-center gap-2 p-4 bg-stone-700/50 rounded-lg block-inset border-stone-900 max-w-3xl"
      >
        {grid.map((block) => (
          <LetterBlock
            key={block.id}
            block={block}
            onClick={() => onBlockClick(block)}
            isShaking={incorrectClicks.includes(block.id)}
            isHinted={block.id === hintedBlockId}
          />
        ))}
      </div>
    </>
  );
};