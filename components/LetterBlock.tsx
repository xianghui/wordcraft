
import React from 'react';
import { BlockData } from '../types';

interface LetterBlockProps {
  block: BlockData;
  onClick: () => void;
  isShaking: boolean;
  isHinted: boolean;
}

export const LetterBlock: React.FC<LetterBlockProps> = ({ block, onClick, isShaking, isHinted }) => {
    const baseClasses = "relative flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-md cursor-pointer transition-all duration-300 select-none";
    const textureBg = "bg-[url('https://www.transparenttextures.com/patterns/rocky-wall.png')]";

    const minedClasses = "opacity-0 transform scale-75";
    const unminedClasses = `bg-stone-500 text-white text-2xl hover:bg-stone-400 hover:-translate-y-1 block-style border-stone-800 ${textureBg}`;

    const shakingClass = isShaking ? 'shake-anim bg-red-600 border-red-800' : '';
    const hintedClass = isHinted ? 'hint-pulse' : '';

    return (
        <div
            onClick={onClick}
            className={`${baseClasses} ${block.isMined ? minedClasses : unminedClasses} ${shakingClass} ${hintedClass}`}
            >
            <span className="drop-shadow-[2px_2px_0_rgba(0,0,0,0.4)]">{block.letter}</span>
        </div>
    );
};