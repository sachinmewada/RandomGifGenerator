import React from "react";
import Random from "./components/Random";
import Tag from "./components/Tag";

function App() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-between py-10 px-4 select-none relative overflow-x-hidden font-sans">
      {/* Background radial glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-pink-500/10 blur-[120px] pointer-events-none"></div>

      {/* Premium Header */}
      <header className="w-full max-w-[1040px] text-center mb-10 mt-4 relative z-10">
        <div className="inline-block backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-3xl py-6 px-8 md:px-12 shadow-2xl relative group overflow-hidden">
          {/* Light sweep sweep animation effect */}
          <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-25deg] -left-1/2 group-hover:left-[120%] transition-all duration-1000 ease-in-out"></div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-500 filter drop-shadow-sm">
            Random GIF Generator
          </h1>
          <p className="text-white/40 text-xs sm:text-sm font-bold tracking-[0.4em] uppercase mt-3">
            Powered by GIPHY API
          </p>
        </div>
      </header>

      {/* Grid container for Cards */}
      <main className="w-full max-w-[1040px] flex flex-col lg:flex-row justify-center items-stretch gap-8 my-6 relative z-10">
        <Random />
        <Tag />
      </main>

      {/* Footer */}
      <footer className="mt-8 text-white/30 text-xs font-bold tracking-widest uppercase relative z-10">
        © {new Date().getFullYear()} • Crafted with ❤️
      </footer>
    </div>
  );
}

export default App;
