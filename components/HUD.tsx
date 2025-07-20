import React from "react";

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
  showHintButton,
}) => {
  const buttonBaseClasses =
    "px-3 py-2 text-white text-xs uppercase rounded-md transform hover:-translate-y-0.5 transition-all duration-150 shadow-md block-style";
  const disabledClasses =
    "disabled:bg-stone-600 disabled:border-stone-700 disabled:cursor-not-allowed disabled:transform-none disabled:opacity-50";

  return (
    <div className="w-full p-2 bg-stone-800/70 rounded-md block-style border-stone-900 mb-4">
      {/* Center progress */}
      <div className="text-center text-lg text-white mb-2">
        Word:{" "}
        <span className="text-yellow-400 font-bold">{progress.current}</span> /{" "}
        {progress.total}
      </div>

      {/* All controls */}
      <div className="w-full flex flex-wrap justify-center items-center gap-1">
        <button
          onClick={onBackToMenu}
          className={`${buttonBaseClasses} flex-1 bg-red-600 hover:bg-red-700 active:bg-red-800 border-red-800`}
        >
          Menu
        </button>
        <button
          onClick={onPreviousWord}
          disabled={isFirstWord}
          className={`${buttonBaseClasses} flex-1 bg-sky-600 hover:bg-sky-700 active:bg-sky-800 border-sky-800 ${disabledClasses}`}
          aria-disabled={isFirstWord}
        >
          Prev
        </button>
        {showHintButton && (
          <button
            onClick={onHintRequest}
            disabled={isHintUsed || isLevelComplete}
            className={`${buttonBaseClasses} flex-1 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 border-purple-800 ${disabledClasses}`}
            aria-disabled={isHintUsed || isLevelComplete}
          >
            Hint<span className="hidden sm:inline"> 💡</span>
          </button>
        )}
        <button
          onClick={onShowAnswer}
          disabled={isLevelComplete}
          className={`${buttonBaseClasses} flex-1 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 border-orange-700 ${disabledClasses}`}
          aria-disabled={isLevelComplete}
        >
          Answer<span className="hidden sm:inline"> 🔑</span>
        </button>
        {isLevelComplete ? (
          <button
            onClick={onNextWord}
            className={`${buttonBaseClasses} flex-1 bg-green-500 hover:bg-green-600 active:bg-green-700 border-green-700 animate-pulse`}
          >
            Next
          </button>
        ) : (
          <div className={`${buttonBaseClasses} flex-1 invisible`}>Next</div>
        )}
      </div>
    </div>
  );
};
