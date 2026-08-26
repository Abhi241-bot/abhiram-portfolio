"use client";

import React from "react";
import {
  FileText,
  Sparkles,
  BookOpen,
  Award,
  CheckCircle2,
  TrendingUp,
  Layers,
  ArrowUpRight,
  FlaskConical,
} from "lucide-react";
import {
  RESEARCH_PAPERS,
  IN_PROGRESS_RESEARCH,
  ResearchPaper,
} from "@/lib/content";
import { audioController } from "@/lib/audio";

export default function Research() {
  return (
    <section id="research" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-3 shadow-glow">
          <BookOpen className="w-3.5 h-3.5" />
          <span>06 / SCIENTIFIC RESEARCH</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Research Papers &amp; Working Manuscripts
        </h2>
        <p className="max-w-2xl text-sm sm:text-base text-slate-400 mt-3">
          Peer-reviewed conference research and independent econometric manuscripts validated with strict statistical significance testing.
        </p>
        <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mt-4" />
      </div>

      {/* Main Research Papers Grid */}
      <div className="space-y-8 mb-16">
        {RESEARCH_PAPERS.map((paper) => {
          const isQuant = paper.domain !== "Multimodal AI";
          return (
            <div
              key={paper.id}
              onMouseEnter={() => audioController?.playClick(720, 0.02)}
              className={`p-6 sm:p-8 rounded-2xl bg-slate-900/80 border transition-all duration-300 backdrop-blur-xl shadow-card relative overflow-hidden ${
                isQuant
                  ? "border-slate-800 hover:border-amber-500/40 hover:shadow-glow-amber"
                  : "border-slate-800 hover:border-cyan-500/40 hover:shadow-glow"
              }`}
            >
              {/* Header Badge */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded border ${
                      isQuant
                        ? "bg-amber-950/60 text-amber-300 border-amber-500/30"
                        : "bg-cyan-950/60 text-cyan-300 border-cyan-500/30"
                    }`}
                  >
                    {paper.domain}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {paper.authorship}
                  </span>
                </div>

                <span className="text-xs font-mono font-semibold text-cyan-400 bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
                  {paper.status}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                {paper.title}
              </h3>

              {/* Abstract */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                {paper.abstract}
              </p>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {paper.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-center"
                  >
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                      {m.label}
                    </div>
                    <div
                      className={`text-base sm:text-lg font-bold font-mono mt-0.5 ${
                        isQuant ? "text-amber-400" : "text-cyan-400"
                      }`}
                    >
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Key Contributions */}
              <div className="space-y-2 mb-6">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Key Methodological Innovations:
                </div>
                {paper.keyContributions.map((contrib, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 text-xs text-slate-300"
                  >
                    <CheckCircle2
                      className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                        isQuant ? "text-amber-400" : "text-cyan-400"
                      }`}
                    />
                    <span>{contrib}</span>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                {paper.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 text-xs font-mono rounded bg-slate-950 text-slate-400 border border-slate-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Current In-Progress Research Section */}
      <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-xl">
        <div className="flex items-center gap-2 mb-6">
          <FlaskConical className="w-5 h-5 text-cyan-400" />
          <h3 className="text-xl font-bold text-white">
            Current In-Progress Research
          </h3>
          <span className="text-xs font-mono text-slate-400 ml-2">
            Active Projects &amp; Collaborations
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {IN_PROGRESS_RESEARCH.map((res, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex flex-col justify-between hover:border-cyan-500/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="text-[11px] font-mono text-cyan-400 font-semibold">
                    {res.institution}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    Active
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-100 mb-2">
                  {res.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {res.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1 pt-3 border-t border-slate-850">
                {res.tags.map((t, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-slate-900 text-slate-400 border border-slate-800"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
