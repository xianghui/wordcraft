
import React from 'react';

interface WordDisplayProps {
  targetWord: string;
  spelledWord: string;
  onSpeakWord: () => void;
  imageUrl: string | null;
  isImageLoading: boolean;
}

export const WordDisplay: React.FC<WordDisplayProps> = ({ 
  targetWord, 
  spelledWord, 
  onSpeakWord,
  imageUrl,
  isImageLoading
}) => {
  return (
    <div className="w-full max-w-3xl flex flex-col items-center">
      <div className="w-full h-40 sm:h-48 bg-stone-800/80 rounded-lg flex items-center justify-center mb-4 block-inset border-stone-900 overflow-hidden">
        {isImageLoading && <div className="text-4xl animate-spin">🖼️</div>}
        {!isImageLoading && imageUrl && <img src={imageUrl} alt={`Illustration of ${targetWord}`} className="max-w-full max-h-full object-contain p-2" />}
        {!isImageLoading && !imageUrl && <div className="text-stone-500 text-center px-4">Could not load image.</div>}
      </div>

      <div className="flex justify-center items-center my-2 sm:my-4">
          <div className="flex justify-center items-center space-x-2 flex-wrap gap-y-2">
            {targetWord.split('').map((letter, index) => {
              const isSpelled = index < spelledWord.length;
              return (
                <div
                  key={index}
                  className={`flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-md transition-all duration-300 text-3xl
                    ${
                      isSpelled
                        ? 'bg-yellow-400 border-yellow-600 text-stone-800 transform scale-110'
                        : 'bg-stone-800/80 border-stone-900 text-stone-500'
                    }
                    block-inset
                  `}
                >
                  {isSpelled ? letter : ''}
                </div>
              );
            })}
          </div>
          <button
            onClick={onSpeakWord}
            aria-label="Say the word"
            className="ml-4 p-3 bg-sky-500 text-white text-2xl rounded-md hover:bg-sky-600 active:bg-sky-700 transform hover:-translate-y-0.5 transition-transform duration-150 shadow-md block-style border-sky-700"
          >
            🔊
          </button>
      </div>
    </div>
  );
};