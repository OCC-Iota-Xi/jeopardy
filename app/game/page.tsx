"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import GameBoard from "../components/GameBoard";
import ClueModal from "../components/ClueModal";
import TeamScoreboard, { Team } from "../components/TeamScoreboard";
import { jeopardyData, Questions, Category } from "../data/questions";

export default function Game() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [answeredClues, setAnsweredClues] = useState<string[]>([]);
  const [activeClue, setActiveClue] = useState<Questions | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [manualGameOver, setManualGameOver] = useState(false);
  const router = useRouter();

  // Load teams from localStorage if available
  useEffect(() => {
    const savedTeams = localStorage.getItem("jeopardyTeams");
    let loadedTeams: Team[] = [];
    if (savedTeams) {
      try {
        loadedTeams = JSON.parse(savedTeams);
        setTeams(loadedTeams);
      } catch (e) {
        console.error("Failed to parse teams", e);
      }
    }

    if (loadedTeams.length === 0) {
      // Check if this is a page refresh
      const navEntries = window.performance.getEntriesByType("navigation");
      if (navEntries.length > 0 && (navEntries[0] as PerformanceNavigationTiming).type === "reload") {
        router.push("/");
        return;
      }
      setShowSetupModal(true);
    }
    setHasLoaded(true);
  }, [router]);

  // Save teams to localStorage
  useEffect(() => {
    if (hasLoaded) {
      localStorage.setItem("jeopardyTeams", JSON.stringify(teams));
    }
  }, [teams, hasLoaded]);

  const handleAddTeam = (name: string) => {
    setTeams([...teams, { id: Date.now().toString(), name, score: 0 }]);
  };

  const handleRemoveTeam = (teamId: string) => {
    if (confirm("Are you sure you want to remove this team?")) {
      setTeams(teams.filter(t => t.id !== teamId));
    }
  };

  const handleUpdateScore = (teamId: string, amount: number) => {
    setTeams(teams.map(team =>
      team.id === teamId ? { ...team, score: team.score + amount } : team
    ));
  };

  const handleClueClick = (categoryId: string, clueId: string) => {
    const category = jeopardyData.find(c => c.id === categoryId);
    if (!category) return;
    const clue = category.clues.find(c => c.id === clueId);
    if (!clue) return;

    setActiveClue(clue);
    if (!answeredClues.includes(clueId)) {
      setAnsweredClues([...answeredClues, clueId]);
    }
  };

  const closeClue = () => {
    setActiveClue(null);
  };

  const totalClues = jeopardyData.reduce((acc, cat) => acc + cat.clues.length, 0);
  const isGameOver = manualGameOver || (answeredClues.length > 0 && answeredClues.length === totalClues);
  const maxScore = teams.length > 0 ? Math.max(...teams.map(t => t.score)) : 0;
  const winners = teams.filter(t => t.score === maxScore && teams.length > 0);

  return (
    <div className="flex flex-col min-h-screen bg-black overflow-hidden relative">
      {/* Header bar */}
      <header className="bg-neutral-900 border-b border-iota-blue/30 p-4 flex justify-between items-center z-10 relative">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Image
              src="/iota_xi_logo_color.png"
              alt="Iota Xi Logo"
              width={60}
              height={60}
              className="object-contain hover:scale-105 transition-transform"
            />
          </Link>
          <h1 className="text-2xl font-bold text-white tracking-widest uppercase">
            <span className="text-iota-blue">Iota Xi</span> Jeopardy
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              if (confirm("Are you sure you want to finish the game now?")) {
                setManualGameOver(true);
              }
            }}
            className="text-white font-bold bg-iota-gold hover:bg-iota-light-gold px-4 py-1.5 rounded-full transition-colors text-sm shadow-[0_0_10px_rgba(217,119,6,0.5)]"
          >
            Finish Game
          </button>
          <button
            onClick={() => {
              if (confirm("Are you sure you want to reset the game? This clears all scores and the board.")) {
                setAnsweredClues([]);
                setTeams([]);
                setManualGameOver(false);
                setShowSetupModal(true);
              }
            }}
            className="text-white/50 hover:text-white transition-colors text-sm underline"
          >
            Reset Game
          </button>
        </div>
      </header>

      {/* Main Game Area */}
      <main className="flex-1 flex flex-col relative z-0">
        <GameBoard
          categories={jeopardyData}
          answeredClues={answeredClues}
          onClueClick={handleClueClick}
        />
      </main>

      {/* Bottom Scoreboard */}
      <footer className="z-10 relative mt-auto">
        <TeamScoreboard
          teams={teams}
          onAddTeam={handleAddTeam}
          onUpdateScore={handleUpdateScore}
          onRemoveTeam={handleRemoveTeam}
        />
      </footer>

      {/* Modal Overlay for Clues */}
      {activeClue && (
        <ClueModal
          clue={activeClue}
          teams={teams}
          onAwardPoints={handleUpdateScore}
          onClose={closeClue}
        />
      )}

      {/* Team Setup Modal Overlay */}
      {hasLoaded && showSetupModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in zoom-in duration-300">
          <div className="bg-neutral-900 border-2 border-iota-blue p-8 rounded-2xl max-w-lg w-full flex flex-col items-center shadow-[0_0_50px_rgba(29,78,216,0.5)]">
            <h2 className="text-3xl font-bold text-white mb-4 uppercase tracking-widest text-center">Team Setup</h2>
            <p className="text-neutral-400 mb-8 text-center text-sm">Add at least two teams to begin the game. (4 players per team recommended)</p>

            <div className="w-full space-y-3 mb-6 max-h-[30vh] overflow-y-auto pr-2">
              {teams.length === 0 && (
                <p className="text-neutral-600 text-center italic py-4">No teams added yet.</p>
              )}
              {teams.map((team) => (
                <div key={team.id} className="flex justify-between items-center bg-neutral-800 p-3 rounded border border-neutral-700 animate-in slide-in-from-left-4 fade-in">
                  <span className="text-white font-bold">{team.name}</span>
                  <button
                    onClick={() => handleRemoveTeam(team.id)}
                    className="text-red-400 hover:text-red-300 font-bold px-2"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const input = new FormData(e.currentTarget).get('teamName') as string;
                if (input.trim()) {
                  handleAddTeam(input.trim());
                  (e.target as HTMLFormElement).reset();
                }
              }}
              className="flex gap-2 w-full mb-8"
            >
              <input
                type="text"
                name="teamName"
                placeholder="Enter team name..."
                autoComplete="off"
                className="flex-1 bg-neutral-800 text-white border border-neutral-700 rounded px-3 py-2 focus:outline-none focus:border-iota-blue"
              />
              <button
                type="submit"
                className="bg-iota-blue hover:bg-iota-dark-blue text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Add
              </button>
            </form>

            <button
              onClick={() => setShowSetupModal(false)}
              disabled={teams.length < 2}
              className="w-full py-3 rounded font-bold text-lg uppercase tracking-wider transition-all
                disabled:bg-neutral-800 disabled:text-neutral-500 disabled:cursor-not-allowed
                bg-green-600 hover:bg-green-500 text-white shadow-[0_0_15px_rgba(22,163,74,0.5)]"
            >
              Start Playing
            </button>
          </div>
        </div>
      )}

      {/* Celebration Overlay */}
      {hasLoaded && isGameOver && (
        <div className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in zoom-in duration-1000">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className={`absolute w-3 h-3 ${i % 2 === 0 ? 'bg-iota-gold' : 'bg-iota-blue'} rounded-sm animate-fall`}
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDuration: `${Math.random() * 3 + 2}s`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-linear-to-br from-iota-light-gold to-yellow-600 uppercase tracking-widest drop-shadow-[0_0_50px_rgba(253,224,71,0.5)] mb-8 animate-bounce">
            Game Over!
          </h1>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 text-center">
            {winners.length > 1 ? "The Winners are..." : "The Winner is..."}
          </h2>

          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {winners.map(winner => (
              <div key={winner.id} className="bg-iota-blue/20 border-4 border-iota-light-gold rounded-2xl p-8 flex flex-col items-center shadow-[0_0_50px_rgba(253,224,71,0.4)] animate-pulse">
                <span className="text-4xl md:text-6xl font-black text-white mb-4">{winner.name}</span>
                <span className="text-3xl text-iota-light-gold font-mono font-bold">${winner.score}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              if (confirm("Play again? This will reset all scores and the board.")) {
                setAnsweredClues([]);
                setTeams([]);
                setManualGameOver(false);
                setShowSetupModal(true);
              }
            }}
            className="relative z-10 px-8 py-4 bg-iota-blue hover:bg-iota-dark-blue text-white rounded-full font-bold text-xl transition-all shadow-[0_0_20px_rgba(29,78,216,0.6)] hover:scale-105"
          >
            Play Again
          </button>
        </div>
      )}

      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-20">
        <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-iota-blue/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-iota-gold/10 rounded-full blur-[120px]" />
      </div>
    </div>
  );
}
