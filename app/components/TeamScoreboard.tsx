"use client";

import { useState } from "react";

export type Team = {
  id: string;
  name: string;
  score: number;
};

type TeamScoreboardProps = {
  teams: Team[];
  onAddTeam: (name: string) => void;
  onUpdateScore: (teamId: string, amount: number) => void;
};

export default function TeamScoreboard({ teams, onAddTeam, onUpdateScore }: TeamScoreboardProps) {
  const [newTeamName, setNewTeamName] = useState("");

  const handleAddTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTeamName.trim()) {
      onAddTeam(newTeamName.trim());
      setNewTeamName("");
    }
  };

  return (
    <div className="bg-neutral-900 border-t-4 border-iota-blue p-4 flex flex-col items-center shadow-[0_-10px_30px_-15px_rgba(29,78,216,0.5)]">
      <div className="flex flex-wrap gap-4 justify-center w-full max-w-6xl mb-4">
        {teams.map((team) => (
          <div
            key={team.id}
            className="flex-1 min-w-[200px] max-w-[300px] bg-neutral-800 rounded-xl p-4 border border-neutral-700 flex flex-col items-center justify-between"
          >
            <h3 className="text-xl font-bold text-white mb-2 truncate w-full text-center" title={team.name}>
              {team.name}
            </h3>
            <div className={`text-4xl font-mono font-black mb-4 ${team.score < 0 ? "text-red-500" : "text-iota-light-gold"}`}>
              {team.score < 0 ? "-" : ""}${Math.abs(team.score)}
            </div>
            
            <div className="flex gap-2 w-full">
              <button
                onClick={() => onUpdateScore(team.id, -100)}
                className="flex-1 bg-red-900/50 hover:bg-red-800 text-red-200 py-1 rounded transition-colors text-sm font-bold"
              >
                -100
              </button>
              <button
                onClick={() => onUpdateScore(team.id, 100)}
                className="flex-1 bg-green-900/50 hover:bg-green-800 text-green-200 py-1 rounded transition-colors text-sm font-bold"
              >
                +100
              </button>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleAddTeam} className="flex gap-2 max-w-md w-full">
        <input
          type="text"
          value={newTeamName}
          onChange={(e) => setNewTeamName(e.target.value)}
          placeholder="New team name..."
          className="flex-1 bg-neutral-800 text-white border border-neutral-700 rounded px-3 py-2 focus:outline-none focus:border-iota-blue"
        />
        <button
          type="submit"
          className="bg-iota-blue hover:bg-iota-dark-blue text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Add Team
        </button>
      </form>
    </div>
  );
}
