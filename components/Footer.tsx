"use client";

import React from "react";
import { ArrowUp, Github, Linkedin, Mail, Heart, Sparkles } from "lucide-react";
import { PROFILE } from "@/lib/content";
import { audioController } from "@/lib/audio";

export default function Footer() {
  const scrollToTop = () => {
    audioController?.playClick(700, 0.04);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-slate-850 bg-[#070b10] py-12 px-4 sm:px-6 lg:px-8 relative z-10 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Side: Brand & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="font-bold text-sm text-slate-200 tracking-wider">
            ABHIRAM BOINI
          </div>
          <span className="hidden sm:inline text-slate-600">|</span>
          <div className="font-mono text-[11px] text-slate-500">
            &copy; {new Date().getFullYear()} All rights reserved.
          </div>
        </div>

        {/* Center: Tech Stack & Credits */}
        <div className="text-center font-mono text-[11px] text-slate-500">
          Built with <span className="text-cyan-400">Next.js</span>,{" "}
          <span className="text-cyan-400">TypeScript</span>,{" "}
          <span className="text-cyan-400">Three.js</span> &amp;{" "}
          <span className="text-cyan-400">Tailwind CSS</span>
        </div>

        {/* Right Side: Back to Top Button */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <a
              href={PROFILE.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white transition-colors"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PROFILE.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-cyan-400 transition-colors"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={PROFILE.socials.email}
              className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-emerald-400 transition-colors"
              title="Email Contact"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-400 transition-all flex items-center gap-1.5 shadow-sm group"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            <span className="text-[11px] font-mono hidden sm:inline">Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
