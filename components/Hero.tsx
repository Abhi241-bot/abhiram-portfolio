"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Download,
  FileText,
  TrendingUp,
  Cpu,
  MapPin,
  Sparkles,
  ChevronDown,
  Activity,
  Layers,
} from "lucide-react";
import { PROFILE } from "@/lib/content";
import { audioController } from "@/lib/audio";

export default function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [resumeDropdownOpen, setResumeDropdownOpen] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const roles = PROFILE.roles;
    const fullText = roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(fullText.substring(0, displayedText.length + 1));
        if (displayedText === fullText) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayedText(fullText.substring(0, displayedText.length - 1));
        if (displayedText === "") {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentRoleIndex]);

  const handleScrollToProjects = () => {
    audioController?.playClick(600, 0.04);
    const el = document.getElementById("projects");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollToAbout = () => {
    audioController?.playClick(500, 0.04);
    const el = document.getElementById("about");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 pt-28 pb-16 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center z-10">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 backdrop-blur-md text-xs font-mono text-cyan-300 mb-8 shadow-glow hover:border-cyan-400 transition-all cursor-default">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Open to Remote ML / Data Science / AI Roles</span>
        </div>

        {/* Name with Glowing Initials */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-4 select-none">
          <span className="hero-glow-letter">A</span>
          <span className="tracking-wider">BHIRAM</span>{" "}
          <span className="hero-glow-letter">B</span>
          <span className="tracking-wider">OINI</span>
        </h1>

        {/* Typewriter Dynamic Subtitle */}
        <div className="h-10 sm:h-12 flex items-center justify-center mb-6">
          <p className="text-lg sm:text-2xl md:text-3xl font-mono text-slate-300">
            <span className="text-cyan-400 font-semibold">{displayedText}</span>
            <span className="inline-block w-[3px] h-6 sm:h-8 bg-cyan-400 ml-1 animate-pulse align-middle" />
          </p>
        </div>

        {/* Bio Tagline */}
        <p className="max-w-2xl text-sm sm:text-base md:text-lg text-slate-300 font-light leading-relaxed mb-8 text-balance">
          {PROFILE.tagline}
        </p>

        {/* Affiliation & Location Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400 font-mono mb-10">
          <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-900/60 rounded-full border border-slate-800">
            <MapPin className="w-3.5 h-3.5 text-rose-400" /> Hyderabad, India
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-900/60 rounded-full border border-slate-800">
            <Layers className="w-3.5 h-3.5 text-cyan-400" /> IIIT Naya Raipur (CGPA 8.70)
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-900/60 rounded-full border border-slate-800">
            <Activity className="w-3.5 h-3.5 text-amber-400" /> IIT (BHU) Research Intern
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto relative mb-14">
          <button
            onClick={handleScrollToProjects}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full font-semibold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-glow hover:shadow-glow-lg transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>View Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Resume Dropdown Selector */}
          <div className="relative w-full sm:w-auto">
            <button
              onClick={() => {
                audioController?.playClick(620, 0.04);
                setResumeDropdownOpen(!resumeDropdownOpen);
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full font-semibold text-sm bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-cyan-400/60 transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-md"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Download Resume</span>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform ${
                  resumeDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {resumeDropdownOpen && (
              <div className="absolute top-full mt-2 left-0 right-0 sm:w-72 bg-slate-900/95 border border-cyan-500/40 rounded-xl shadow-2xl p-2 z-50 backdrop-blur-xl animate-fadeIn text-left">
                <a
                  href={PROFILE.resumes.ml}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setResumeDropdownOpen(false)}
                  className="flex items-start gap-2.5 p-2.5 rounded-lg hover:bg-cyan-950/40 border border-transparent hover:border-cyan-500/30 transition-all group"
                >
                  <div className="p-2 rounded bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-100 group-hover:text-cyan-300">
                      ML / Data Science Resume
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Production AI, MLOps, LLMs & CV
                    </div>
                  </div>
                </a>

                <a
                  href={PROFILE.resumes.quant}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setResumeDropdownOpen(false)}
                  className="flex items-start gap-2.5 p-2.5 rounded-lg hover:bg-amber-950/40 border border-transparent hover:border-amber-500/30 transition-all group mt-1"
                >
                  <div className="p-2 rounded bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-100 group-hover:text-amber-300">
                      Quant Finance Resume
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Options pricing, StatArb, Factor models
                    </div>
                  </div>
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Highlights Ticker Strip */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl pt-4 border-t border-slate-800/80">
          <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800/60 text-center">
            <div className="text-lg sm:text-xl font-bold font-mono text-cyan-400">Govt Zoo AI</div>
            <div className="text-[11px] text-slate-400">Deployed to Live Production</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800/60 text-center">
            <div className="text-lg sm:text-xl font-bold font-mono text-cyan-400">0.77 PR-AUC</div>
            <div className="text-[11px] text-slate-400">MLOps Fraud Pipeline</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800/60 text-center">
            <div className="text-lg sm:text-xl font-bold font-mono text-amber-400">115K Options</div>
            <div className="text-[11px] text-slate-400">Nifty 50 Pricing Study</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800/60 text-center">
            <div className="text-lg sm:text-xl font-bold font-mono text-cyan-400">94.7% Acc</div>
            <div className="text-[11px] text-slate-400">IEEE Multimodal Stress AI</div>
          </div>
        </div>
      </div>

      {/* Mouse Scroll Down Animation */}
      <div
        onClick={handleScrollToAbout}
        className="mt-12 sm:mt-16 flex flex-col items-center gap-2 cursor-pointer group z-10"
        title="Scroll down to About"
      >
        <span className="mouse">
          <span className="move" />
        </span>
        <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase group-hover:text-cyan-400 transition-colors">
          Scroll Down
        </span>
      </div>
    </section>
  );
}
