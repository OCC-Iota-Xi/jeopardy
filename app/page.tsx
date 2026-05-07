"use client";

import Image from "next/image";
import Link from "next/link";
import { playAudio } from "./data/audioPlayer";

export default function Home() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center relative overflow-y-auto p-4 md:p-12">
      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-iota-blue/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-iota-gold/15 rounded-full blur-[120px]" />
      </div>

      <main className="z-10 flex flex-col items-center text-center gap-12 max-w-4xl w-full mt-8 mb-16">
        {/* Logo and Title */}
        <div className="animate-in fade-in zoom-in duration-1000 flex flex-col items-center gap-6">
          <div className="relative w-48 h-48 md:w-64 md:h-64 drop-shadow-[0_0_30px_rgba(29,78,216,0.5)]">
            <Image
              src="/iota_xi_logo_color.png"
              alt="Iota Xi Computer Science Honor Society Logo"
              fill
              className="object-contain hover:scale-105 transition-transform duration-500"
              priority
            />
          </div>

          <div>
            <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-linear-to-br from-white to-neutral-400 tracking-tighter uppercase mb-2">
              <span className="text-iota-blue">Iota Xi</span>
              <br />
              Jeopardy
            </h1>
            <p className="text-iota-light-gold text-lg md:text-2xl font-semibold tracking-widest uppercase">
              Computer Science Honor Society
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-300 fill-mode-both">
          <Link
            href="/game"
            onClick={() => playAudio('Start Game.mp3')}
            className="group relative px-8 py-4 bg-iota-blue hover:bg-iota-dark-blue text-white rounded-full font-bold text-xl overflow-hidden transition-all shadow-[0_0_20px_rgba(29,78,216,0.4)] hover:shadow-[0_0_40px_rgba(29,78,216,0.8)] hover:-translate-y-1"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Game
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </Link>
        </div>

        {/* Rules Section */}
        <div className="w-full max-w-3xl mt-8 bg-neutral-900/60 backdrop-blur-md border border-iota-blue/30 p-8 rounded-2xl text-left animate-in slide-in-from-bottom-12 fade-in duration-1000 delay-500 fill-mode-both shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          <h2 className="text-3xl font-bold text-iota-light-gold mb-8 text-center uppercase tracking-wider">How to Play</h2>

          <div className="space-y-6 text-neutral-300">
            <section>
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-iota-blue text-white text-sm">1</span>
                Team Division
              </h3>
              <p className="pl-11">Players are divided into teams of 4 players.</p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-iota-blue text-white text-sm">2</span>
                First Turn Decision
              </h3>
              <p className="pl-11">The first team to choose a question is decided by Rock, Paper, Scissors, Shoot then the winning team will choose a question.</p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-iota-blue text-white text-sm">3</span>
                Game Process
              </h3>
              <p className="pl-11">Each round, one player from each team comes forward to answer the question.</p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-iota-blue text-white text-sm">4</span>
                Winning Conditions
              </h3>
              <p className="pl-11">Having the highest score at the end of the game.</p>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 text-neutral-300 space-y-3">
            <p className="flex items-start gap-2">
              <span className="text-red-400 mt-0.5">⚠️</span>
              <span>Team members are <strong className="text-red-400 font-bold">not allowed to give hints</strong> to the player.</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-iota-light-gold mt-0.5">⏱️</span>
              <span>If the player cannot answer the question within the time limit, the turn passes to the other team, giving them a chance to answer.</span>
            </p>
          </div>
        </div>
      </main>

      <footer className="mt-auto z-10 text-neutral-500 text-sm pb-4">
        Built for Iota Xi • {new Date().getFullYear()}
      </footer>
    </div>
  );
}
