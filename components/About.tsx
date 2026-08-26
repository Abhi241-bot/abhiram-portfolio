"use client";

import React, { useState } from "react";
import {
  GraduationCap,
  BookOpen,
  Award,
  ChevronDown,
  ChevronUp,
  Cpu,
  TrendingUp,
  FileCheck2,
  Sparkles,
} from "lucide-react";
import { PROFILE, EDUCATION } from "@/lib/content";
import { audioController } from "@/lib/audio";

export default function About() {
  const [activeTab, setActiveTab] = useState<"education" | "methodology">("education");
  const [courseworkExpanded, setCourseworkExpanded] = useState(false);

  const handleTabSwitch = (tab: "education" | "methodology") => {
    audioController?.playClick(600, 0.04);
    setActiveTab(tab);
  };

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-3 shadow-glow">
          <Sparkles className="w-3.5 h-3.5" />
          <span>02 / BACKGROUND</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          About &amp; Academic Background
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mt-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Bio Narrative */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl shadow-card relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-amber-400" />
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span>Bridging Production AI &amp; Quantitative Rigor</span>
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
              {PROFILE.bio}
            </p>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed border-t border-slate-800/80 pt-4 font-mono">
              &quot;I don&apos;t just train models in notebooks. I ship containerized pipelines with automated drift detection, challenger promotion gates, and mathematically verified out-of-sample guarantees.&quot;
            </p>
          </div>

          {/* Key Metric Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-400">8.70</div>
              <div className="text-xs text-slate-400 mt-1">B.Tech CGPA / 10.0</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-400">97.7%ile</div>
              <div className="text-xs text-slate-400 mt-1">JEE Main Nationwide</div>
            </div>
          </div>
        </div>

        {/* Right Column: Tabbed Details */}
        <div className="lg:col-span-7">
          {/* Tab Selector Buttons */}
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3 mb-6">
            <button
              onClick={() => handleTabSwitch("education")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === "education"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-glow"
                  : "text-slate-400 hover:text-white hover:bg-slate-900/60"
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Education &amp; Scores</span>
            </button>

            <button
              onClick={() => handleTabSwitch("methodology")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeTab === "methodology"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-glow"
                  : "text-slate-400 hover:text-white hover:bg-slate-900/60"
              }`}
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Engineering Philosophy</span>
            </button>
          </div>

          {/* Education Tab Content */}
          {activeTab === "education" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono text-cyan-400 font-semibold px-2.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30">
                    {EDUCATION.period}
                  </span>
                  <span className="text-xs text-slate-400">{EDUCATION.location}</span>
                </div>
                <h4 className="text-lg font-bold text-white">{EDUCATION.degree}</h4>
                <p className="text-sm text-slate-300 mb-4">{EDUCATION.institution}</p>

                {/* Score Pills Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4 border-t border-slate-800/80">
                  {EDUCATION.academicScores.map((score, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-center"
                    >
                      <div className="text-[11px] text-slate-400 uppercase font-mono tracking-wider">
                        {score.label}
                      </div>
                      <div className="text-sm font-bold font-mono text-cyan-300 mt-0.5">
                        {score.score}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expandable Coursework Module */}
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
                <div
                  onClick={() => {
                    audioController?.playClick(550, 0.03);
                    setCourseworkExpanded(!courseworkExpanded);
                  }}
                  className="flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                      Core Academic Coursework &amp; Foundations
                    </span>
                  </div>
                  <button
                    className="p-1 rounded-lg bg-slate-800 text-slate-400 group-hover:text-white"
                    aria-label="Toggle coursework"
                  >
                    {courseworkExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {courseworkExpanded && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-800 animate-fadeIn">
                    {EDUCATION.coursework.map((course, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-xs text-slate-300 p-2 rounded-lg bg-slate-950/60 border border-slate-800/80"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                        <span>{course}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Methodology / Philosophy Tab Content */}
          {activeTab === "methodology" && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm mb-2">
                  <Cpu className="w-4 h-4" />
                  <span>1. Production ML vs Notebook AI</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Real value comes from closing the feedback loop: serving low-latency REST endpoints, tracking KS-drift across features, and enforcing automated promotion gates so unverified models never hit live traffic.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>2. Honest Out-of-Sample Quantitative Validation</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  In-sample significance does not imply tradability. We mandate walk-forward cross-validation, rolling Kalman filter state-space models, explicit transaction friction sweeps, and bootstrap confidence intervals to avoid overfitted alpha claims.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-2">
                  <Award className="w-4 h-4" />
                  <span>3. Multi-Agent Reliability &amp; Guardrails</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Autonomous agents must be constrained by typed graph state machines (LangGraph), domain fine-tuning (QLoRA), deterministic safety guardrails, and programmatic quantitative eval harnesses (RAGAS / DeepEval).
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
