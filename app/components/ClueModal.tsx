"use client";

import { useState } from "react";
import { Clue } from "../data/questions";
import { Team } from "./TeamScoreboard";

type ClueModalProps = {
  clue: Clue;
  teams: Team[];
  onAwardPoints: (teamId: string, value: number) => void;
  onClose: () => void;
};

export default function ClueModal({ clue, teams, onAwardPoints, onClose }: ClueModalProps) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-iota-dark-blue w-full max-w-5xl rounded-2xl shadow-[0_0_50px_rgba(29,78,216,0.5)] border-4 border-iota-blue flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Header / Value */}
        <div className="bg-blue-950 p-4 text-center border-b-2 border-iota-blue relative">
          <h2 className="text-4xl md:text-5xl font-black text-iota-light-gold drop-shadow-md">
            ${clue.value}
          </h2>
          <button 
            onClick={onClose}
            className="absolute top-1/2 -translate-y-1/2 right-6 text-white hover:text-red-400 font-bold text-xl transition-colors"
          >
            ✕ Close
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-8 md:p-16 flex flex-col items-center justify-center min-h-[40vh] text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight uppercase drop-shadow-lg mb-12">
            {clue.question}
          </h1>

          {showAnswer ? (
            <div className="animate-in slide-in-from-bottom-4 fade-in duration-500">
              <h2 className="text-2xl md:text-4xl font-bold text-iota-light-gold mb-8">
                {clue.answer}
              </h2>
            </div>
          ) : (
            <button
              onClick={() => setShowAnswer(true)}
              className="bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 rounded-full px-8 py-3 font-bold transition-all hover:scale-105"
            >
              Reveal Answer
            </button>
          )}
        </div>

        {/* Scoring Footer */}
        {showAnswer && (
          <div className="bg-neutral-900 p-6 border-t-2 border-iota-blue animate-in slide-in-from-bottom-8 duration-300">
            <h3 className="text-center text-white/70 mb-4 font-semibold uppercase tracking-wider text-sm">Award Points To Team</h3>
            <div className="flex flex-wrap gap-4 justify-center">
              {teams.length === 0 && (
                <p className="text-neutral-500 italic">No teams created. Close this clue to continue.</p>
              )}
              {teams.map((team) => (
                <div key={team.id} className="flex flex-col items-center gap-2 bg-neutral-800 p-3 rounded-lg border border-neutral-700">
                  <span className="text-white font-bold max-w-[150px] truncate" title={team.name}>{team.name}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onAwardPoints(team.id, -clue.value)}
                      className="bg-red-900/80 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm transition-colors"
                    >
                      Incorrect
                    </button>
                    <button
                      onClick={() => onAwardPoints(team.id, clue.value)}
                      className="bg-green-700/80 hover:bg-green-600 text-white font-bold py-1 px-3 rounded text-sm transition-colors"
                    >
                      Correct
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
