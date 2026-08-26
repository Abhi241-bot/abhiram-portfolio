"use client";

import React, { useEffect, useState } from "react";
import { audioController } from "@/lib/audio";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioPlayer() {
  const [isMuted, setIsMuted] = useState(true);
  const [showPrompt, setShowPrompt] = useState(true);

  useEffect(() => {
    if (!audioController) return;
    const unsub = audioController.subscribe((muted) => {
      setIsMuted(muted);
      if (!muted) {
        setShowPrompt(false);
      }
    });
    return () => unsub();
  }, []);

  const handleToggle = () => {
    if (!audioController) return;
    const muted = audioController.toggleSound();
    setIsMuted(muted);
    if (!muted) {
      setShowPrompt(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      {/* Audio Toggle with 6 Equalizer Bars */}
      <button
        onClick={handleToggle}
        className="group relative flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 hover:border-cyan-400/50 backdrop-blur-md transition-all duration-300 shadow-sm"
        aria-label={isMuted ? "Unmute ambient sound" : "Mute ambient sound"}
        title={isMuted ? "Click to play ambient audio" : "Click to mute audio"}
      >
        <div className="relative flex items-center justify-center w-4 h-4 text-cyan-400">
          {isMuted ? (
            <VolumeX className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
          ) : (
            <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          )}
        </div>

        {/* 6-bar visualizer */}
        <div
          className={`flex items-end gap-[3px] h-3.5 w-5 overflow-hidden ${
            !isMuted ? "equalizer-playing" : "opacity-40"
          }`}
        >
          <div className="equalizer-bar bar-1 h-[40%] bg-cyan-400" />
          <div className="equalizer-bar bar-2 h-[75%] bg-cyan-400" />
          <div className="equalizer-bar bar-3 h-[25%] bg-cyan-400" />
          <div className="equalizer-bar bar-4 h-[90%] bg-cyan-400" />
          <div className="equalizer-bar bar-5 h-[50%] bg-cyan-400" />
          <div className="equalizer-bar bar-6 h-[30%] bg-cyan-400" />
        </div>
      </button>

      {/* Floating Sound Prompt pill on first load */}
      {showPrompt && isMuted && (
        <div
          onClick={handleToggle}
          className="hidden md:flex items-center gap-2 px-3 py-1 text-xs text-slate-300 bg-slate-900/90 border border-cyan-500/30 rounded-full cursor-pointer hover:border-cyan-400 hover:text-white transition-all shadow-glow animate-pulse"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span>Click to enable ambient sound</span>
        </div>
      )}
    </div>
  );
}
