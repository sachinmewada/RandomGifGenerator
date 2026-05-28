import React from "react";

const Spinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 space-y-4">
      <div className="relative w-16 h-16">
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-white/10 border-t-cyan-400 animate-spin"></div>
        {/* Inner Ring (Reverse direction) */}
        <div className="absolute inset-2 rounded-full border-4 border-white/5 border-b-pink-500 animate-spin [animation-duration:1.2s] [animation-direction:reverse]"></div>
      </div>
      <span className="text-white/60 text-sm font-semibold tracking-wider animate-pulse uppercase">
        Fetching from Giphy...
      </span>
    </div>
  );
};

export default Spinner;
