import React from "react";
import { LetterBlock } from "./LetterBlock";
import { BlockData } from "../types";

interface GameBoardProps {
  grid: BlockData[];
  onBlockClick: (block: BlockData) => void;
  incorrectClicks: string[];
  hintedBlockId: string | null;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  grid,
  onBlockClick,
  incorrectClicks,
  hintedBlockId,
}) => {
  const qwertyRow1 = "QWERTYUIOP".split("");
  const qwertyRow2 = "ASDFGHJKL".split("");
  const qwertyRow3 = "ZXCVBNM".split("");

  const renderRow = (rowLetters: string[], isCentered: boolean = false) => (
    <div className={`flex justify-center ${isCentered ? "mx-auto" : ""}`}>
      {rowLetters.map((letter) => {
        const block = grid.find((b) => b.letter === letter);
        if (!block) return null; // Should not happen if grid contains all alphabet letters
        return (
          <LetterBlock
            key={block.id}
            block={block}
            onClick={() => onBlockClick(block)}
            isShaking={incorrectClicks.includes(block.id)}
            isHinted={block.id === hintedBlockId}
          />
        );
      })}
    </div>
  );

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
      <div className="w-full flex flex-col items-center p-0 sm:p-2 md:p-4 bg-stone-700/50 rounded-lg block-inset border-stone-900">
        {renderRow(qwertyRow1)}
        {renderRow(qwertyRow2, true)}
        {renderRow(qwertyRow3, true)}
      </div>
    </>
  );
};
