"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import GameBoard from "../components/GameBoard";
import ClueModal from "../components/ClueModal";
import TeamScoreboard, { Team } from "../components/TeamScoreboard";
import { jeopardyData, Clue, Category } from "../data/questions";

export default function Game() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [answeredClues, setAnsweredClues] = useState<string[]>([]);
  const [activeClue, setActiveClue] = useState<Clue | null>(null);
  
  // Load teams from localStorage if available (optional enhancement)
  useEffect(() => {
    const savedTeams = localStorage.getItem("jeopardyTeams");
    if (savedTeams) {
      try {
        setTeams(JSON.parse(savedTeams));
      } catch (e) {
        console.error("Failed to parse teams", e);
      }
    }
  }, []);

  // Save teams to localStorage
  useEffect(() => {
    localStorage.setItem("jeopardyTeams", JSON.stringify(teams));
  }, [teams]);

  const handleAddTeam = (name: string) => {
    setTeams([...teams, { id: Date.now().toString(), name, score: 0 }]);
  };

  const handleUpdateScore = (teamId: string, amount: number) => {
    setTeams(teams.map(team => 
      team.id === teamId ? { ...team, score: team.score + amount } : team
    ));
    // If we just awarded points from a modal, we might want to close it, 
    // but the host might want to award/deduct points to multiple teams if multiple buzzed in and got it wrong.
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
        <div>
          <button 
            onClick={() => {
              if(confirm("Are you sure you want to reset the game? This clears all scores and the board.")) {
                setAnsweredClues([]);
                setTeams(teams.map(t => ({ ...t, score: 0 })));
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
        />
      </footer>

      {/* Modal Overlay */}
      {activeClue && (
        <ClueModal 
          clue={activeClue} 
          teams={teams} 
          onAwardPoints={handleUpdateScore} 
          onClose={closeClue} 
        />
      )}
      
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-20">
        <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-iota-blue/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-iota-gold/10 rounded-full blur-[120px]" />
      </div>
    </div>
  );
}
