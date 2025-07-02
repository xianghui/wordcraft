import React from 'react';

interface HUDProps {
  onNextWord: () => void;
  isLevelComplete: boolean;
  onBackToMenu: () => void;
  progress: { current: number; total: number };
  onPreviousWord: () => void;
  isFirstWord: boolean;
  onHintRequest: () => void;
  isHintUsed: boolean;
  onShowAnswer: () => void;
  showHintButton: boolean;
}

export const HUD: React.FC<HUDProps> = ({ 
  onNextWord, 
  isLevelComplete, 
  onBackToMenu, 
  progress, 
  onPreviousWord, 
  isFirstWord,
  onHintRequest,
  isHintUsed,
  onShowAnswer,
  showHintButton
}) => {
  const buttonBaseClasses = "px-3 py-2 text-white text-xs uppercase rounded-md transform hover:-translate-y-0.5 transition-all duration-150 shadow-md block-style";
  const disabledClasses = "disabled:bg-stone-600 disabled:border-stone-700 disabled:cursor-not-allowed disabled:transform-none disabled:opacity-50";

  return (
    <div className="w-full max-w-3xl flex justify-between items-center px-4 py-2 bg-stone-800/70 rounded-md block-style border-stone-900 mb-4">
      {/* Left controls */}
      <div className="flex-1 flex justify-start items-center gap-2">
        <button 
          onClick={onBackToMenu}
          className={`${buttonBaseClasses} bg-red-600 hover:bg-red-700 active:bg-red-800 border-red-800`}
        >
          Menu
        </button>
        <button
          onClick={onPreviousWord}
          disabled={isFirstWord}
          className={`${buttonBaseClasses} bg-sky-600 hover:bg-sky-700 active:bg-sky-800 border-sky-800 ${disabledClasses}`}
          aria-disabled={isFirstWord}
        >
          Prev
        </button>
        {showHintButton && (
          <button
            onClick={onHintRequest}
            disabled={isHintUsed || isLevelComplete}
            className={`${buttonBaseClasses} bg-purple-600 hover:bg-purple-700 active:bg-purple-800 border-purple-800 ${disabledClasses}`}
            aria-disabled={isHintUsed || isLevelComplete}
          >
            Hint 💡
          </button>
        )}
        <button
          onClick={onShowAnswer}
          disabled={isLevelComplete}
          className={`${buttonBaseClasses} bg-orange-500 hover:bg-orange-600 active:bg-orange-700 border-orange-700 ${disabledClasses}`}
          aria-disabled={isLevelComplete}
        >
          Answer 🔑
        </button>
      </div>

      {/* Center progress */}
      <div className="flex-none text-lg text-white px-4">
        Word: <span className="text-yellow-400 font-bold">{progress.current}</span> / {progress.total}
      </div>

      {/* Right controls */}
      <div className="flex-1 flex justify-end">
        {isLevelComplete ? (
          <button
            onClick={onNextWord}
            className={`${buttonBaseClasses} bg-green-500 hover:bg-green-600 active:bg-green-700 border-green-700 animate-pulse`}
          >
            Next Word
          </button>
        ) : (
          <div className={`${buttonBaseClasses} invisible`}>Next Word</div>
        )}
      </div>
    </div>
  );
};
