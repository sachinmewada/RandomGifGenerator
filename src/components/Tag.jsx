import React, { useState } from "react";
import useGif from "../hooks/useGif";
import Spinner from "./Spinner";

const Tag = () => {
  const [tag, setTag] = useState("car");
  const { gif, loading, error, fetchData } = useGif(tag);
  const [downloading, setDownloading] = useState(false);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && tag.trim()) {
      fetchData(tag);
    }
  };

  const handleDownload = async () => {
    if (!gif) return;
    setDownloading(true);
    try {
      const response = await fetch(gif);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${tag || "giphy"}-gif.gif`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Failed to download GIF:", err);
      // Fallback: Open in new tab if CORS prevents direct download
      window.open(gif, "_blank");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="w-full md:w-[500px] backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col items-center gap-y-6 transition-all duration-300 hover:scale-[1.01] hover:border-white/20 hover:bg-white/10">
      <h2 className="text-2xl font-bold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400">
        Random {tag || "Tag"} Gif
      </h2>
      
      <div className="w-full min-h-[300px] flex items-center justify-center bg-black/35 rounded-2xl overflow-hidden border border-white/5 relative">
        {loading ? (
          <Spinner />
        ) : error ? (
          <div className="text-center p-6 text-rose-300 font-semibold text-sm flex flex-col gap-2">
            <span className="text-2xl">⚠️</span>
            <span>{error}</span>
          </div>
        ) : (
          gif && (
            <img
              src={gif}
              alt={`${tag} Gif`}
              className="max-h-[320px] object-contain rounded-2xl w-full hover:scale-[1.02] transition-transform duration-300 ease-out"
            />
          )
        )}
      </div>

      <div className="w-full flex flex-col gap-y-3">
        <input
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Search tag (e.g. cat, coding...)"
          className="w-full text-center bg-white/5 border border-white/10 hover:border-white/25 focus:border-pink-400 focus:bg-white/10 text-white rounded-2xl py-4 px-6 outline-none transition-all placeholder:text-white/30 font-semibold"
        />

        <div className="w-full flex gap-x-4">
          <button
            onClick={() => fetchData(tag)}
            disabled={!tag.trim()}
            className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 disabled:from-gray-700 disabled:to-gray-800 disabled:cursor-not-allowed text-white font-bold tracking-widest py-4 px-6 rounded-2xl shadow-xl hover:shadow-pink-500/20 transform active:scale-[0.98] transition-all duration-200"
          >
            GENERATE
          </button>
          <button
            onClick={handleDownload}
            disabled={!gif || loading || downloading}
            className="bg-white/5 border border-white/10 hover:border-white/20 text-white font-bold py-4 px-6 rounded-2xl shadow-xl hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transform active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
            title="Download GIF"
          >
            {downloading ? (
              <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            )}
            <span>DOWNLOAD</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tag;