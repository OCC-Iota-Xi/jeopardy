"use client";

import { useState, useEffect, useRef } from "react";
import { Questions } from "../data/questions";
import { Team } from "./TeamScoreboard";
import { playAudio } from "../data/audioPlayer";

type ClueModalProps = {
  clue: Questions;
  teams: Team[];
  onAwardPoints: (teamId: string, value: number) => void;
  onClose: () => void;
};

export default function ClueModal({ clue, teams, onAwardPoints, onClose }: ClueModalProps) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/Squid Game Theme.mp3');
    audioRef.current.loop = true;

    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise.catch(e => {
        if (e.name !== 'AbortError') {
          console.error("Theme playback failed:", e);
        }
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (showAnswer && audioRef.current) {
      audioRef.current.pause();
    }
  }, [showAnswer]);

  useEffect(() => {
    if (showAnswer) return;

    const timerId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [showAnswer]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-iota-dark-blue w-full max-w-5xl max-h-[90vh] rounded-2xl shadow-[0_0_50px_rgba(29,78,216,0.5)] border-4 border-iota-blue flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">

        {/* Header / Value */}
        <div className="bg-blue-950 p-4 text-center border-b-2 border-iota-blue relative">
          <div className="absolute top-1/2 -translate-y-1/2 left-6 text-xl md:text-2xl font-bold font-mono text-white bg-black/50 px-3 py-1 rounded border border-iota-blue/50 flex items-center gap-2">
            ⏱ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </div>
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
        <div className="flex-1 p-4 md:p-8 w-full flex flex-col items-center justify-center min-h-[40vh] overflow-y-auto text-center">
          {clue.imageUrl && (
            <img
              src={clue.imageUrl}
              alt="Clue"
              className="max-h-72 object-contain mb-8 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.2)] border border-white/20"
            />
          )}
          {clue.codeSnippet && (
            <div className="bg-neutral-900 border border-neutral-700 p-4 rounded-xl w-full max-w-5xl text-left shadow-inner mb-4">
              <pre className="text-emerald-400 font-mono text-sm md:text-base lg:text-lg whitespace-pre-wrap leading-tight">
                <code>{clue.codeSnippet}</code>
              </pre>
            </div>
          )}
          {clue.question && (
            <h1 className={`font-bold text-white leading-tight uppercase drop-shadow-lg mb-6 ${clue.codeSnippet ? 'text-xl md:text-2xl' : 'text-3xl md:text-5xl'}`}>
              {clue.question}
            </h1>
          )}

          {showAnswer ? (
            <div className="animate-in slide-in-from-bottom-4 fade-in duration-500">
              <h2 className="text-2xl md:text-4xl font-bold text-iota-light-gold mb-8">
                {clue.answer}
              </h2>
            </div>
          ) : (
            <button
              onClick={() => {
                playAudio('Squid Game X Button Sound Effect.mp3');
                setShowAnswer(true);
              }}
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
                  <span className="text-white font-bold max-w-37.5 truncate" title={team.name}>{team.name}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        playAudio('incorrect.mp3');
                        onAwardPoints(team.id, 0);
                        onClose();
                      }}
                      className="bg-red-900/80 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm transition-colors"
                    >
                      Incorrect
                    </button>
                    <button
                      onClick={() => {
                        playAudio('correct.mp3');
                        onAwardPoints(team.id, clue.value);
                        onClose();
                      }}
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
