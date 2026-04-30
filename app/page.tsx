import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden p-4">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-iota-blue/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-iota-gold/15 rounded-full blur-[120px]" />
      </div>

      <main className="z-10 flex flex-col items-center text-center gap-12 max-w-4xl w-full">
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
            <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-neutral-400 tracking-tighter uppercase mb-2">
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
        <div className="flex flex-col sm:flex-row gap-6 mt-8 animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-300 fill-mode-both">
          <Link 
            href="/game"
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
      </main>

      <footer className="absolute bottom-4 z-10 text-neutral-500 text-sm">
        Built for Iota Xi • {new Date().getFullYear()}
      </footer>
    </div>
  );
}
