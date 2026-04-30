"use client";

import { Category } from "../data/questions";

type GameBoardProps = {
  categories: Category[];
  answeredClues: string[];
  onClueClick: (categoryId: string, clueId: string) => void;
};

export default function GameBoard({ categories, answeredClues, onClueClick }: GameBoardProps) {
  return (
    <div className="w-full max-w-7xl mx-auto p-4 flex-1 flex flex-col justify-center">
      <div className="grid grid-cols-6 gap-2 sm:gap-4 w-full h-full min-h-[60vh]">
        {/* Category Headers */}
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-iota-dark-blue border-2 border-iota-blue rounded-lg flex items-center justify-center p-2 sm:p-4 text-center shadow-lg"
          >
            <h2 className="text-white font-bold text-sm sm:text-lg md:text-xl uppercase tracking-wider drop-shadow-md">
              {category.name}
            </h2>
          </div>
        ))}

        {/* Clues */}
        {/* Assuming all categories have the same number of clues, we iterate by row then column */}
        {Array.from({ length: 5 }).map((_, rowIndex) =>
          categories.map((category) => {
            const clue = category.clues[rowIndex];
            if (!clue) return <div key={`${category.id}-empty-${rowIndex}`} />; // Fallback
            
            const isAnswered = answeredClues.includes(clue.id);

            return (
              <button
                key={clue.id}
                disabled={isAnswered}
                onClick={() => onClueClick(category.id, clue.id)}
                className={`
                  relative overflow-hidden rounded-lg border-2 flex items-center justify-center
                  transition-all duration-300 transform
                  ${
                    isAnswered
                      ? "bg-neutral-900 border-neutral-800 opacity-40 cursor-not-allowed"
                      : "bg-gradient-to-b from-blue-900 to-iota-dark-blue border-iota-blue hover:scale-105 hover:border-iota-light-gold cursor-pointer shadow-lg hover:shadow-iota-blue/50"
                  }
                `}
              >
                {!isAnswered && (
                  <span className="text-3xl sm:text-4xl md:text-5xl font-black text-iota-light-gold drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                    ${clue.value}
                  </span>
                )}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
