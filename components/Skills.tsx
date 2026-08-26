"use client";

import React from "react";
import {
  Code2,
  Cpu,
  Bot,
  Layers,
  TrendingUp,
  Wrench,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { SKILL_CATEGORIES, SkillCategory } from "@/lib/content";
import { audioController } from "@/lib/audio";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Languages: <Code2 className="w-5 h-5 text-cyan-400" />,
  "Machine Learning & Deep Learning": <Cpu className="w-5 h-5 text-cyan-400" />,
  "LLM & Agentic AI": <Bot className="w-5 h-5 text-cyan-400" />,
  "MLOps & Serving": <Layers className="w-5 h-5 text-cyan-400" />,
  "Quantitative Finance & Statistics": <TrendingUp className="w-5 h-5 text-amber-400" />,
  "Tools & Frameworks": <Wrench className="w-5 h-5 text-cyan-400" />,
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-3 shadow-glow">
          <Sparkles className="w-3.5 h-3.5" />
          <span>07 / TECHNICAL ARSENAL</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Skills &amp; Technologies
        </h2>
        <p className="max-w-2xl text-sm sm:text-base text-slate-400 mt-3">
          Categorized technical stack spanning production ML engineering, agentic systems, and quantitative modeling.
        </p>
        <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mt-4" />
      </div>

      {/* 6 Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SKILL_CATEGORIES.map((cat, idx) => (
          <div
            key={idx}
            onMouseEnter={() => audioController?.playClick(700, 0.02)}
            className="p-6 sm:p-7 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl hover:border-cyan-500/40 transition-all duration-300 shadow-card flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 group-hover:border-cyan-500/30 group-hover:scale-105 transition-all">
                  {CATEGORY_ICONS[cat.category] || <Code2 className="w-5 h-5 text-cyan-400" />}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {cat.category}
                  </h3>
                </div>
              </div>

              <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                {cat.description}
              </p>
            </div>

            {/* Skill Chips */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800/80">
              {cat.skills.map((skill, sIdx) => (
                <div
                  key={sIdx}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                    skill.highlighted
                      ? "bg-slate-950 text-cyan-300 border border-cyan-500/40 shadow-sm"
                      : "bg-slate-950/70 text-slate-300 border border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      skill.highlighted ? "bg-cyan-400 shadow-glow" : "bg-slate-500"
                    }`}
                  />
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
