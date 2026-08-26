"use client";

import React, { useState } from "react";
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { EXPERIENCES, ExperienceItem } from "@/lib/content";
import { audioController } from "@/lib/audio";

export default function Experience() {
  const [selectedId, setSelectedId] = useState<string>(EXPERIENCES[0].id);

  const handleSelect = (id: string) => {
    audioController?.playClick(580, 0.03);
    setSelectedId(id);
  };

  const currentExp = EXPERIENCES.find((e) => e.id === selectedId) || EXPERIENCES[0];

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-3 shadow-glow">
          <Briefcase className="w-3.5 h-3.5" />
          <span>03 / CAREER TIMELINE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Professional Experience
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mt-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Role Selector Cards */}
        <div className="lg:col-span-5 space-y-3">
          {EXPERIENCES.map((exp) => {
            const isSelected = exp.id === selectedId;
            return (
              <div
                key={exp.id}
                onClick={() => handleSelect(exp.id)}
                className={`p-4 sm:p-5 rounded-xl border transition-all duration-300 cursor-pointer text-left ${
                  isSelected
                    ? "bg-slate-900/90 border-cyan-400/60 shadow-glow"
                    : "bg-slate-900/50 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/70"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span
                    className={`text-xs font-mono font-semibold px-2 py-0.5 rounded ${
                      exp.type === "Production AI"
                        ? "bg-emerald-950/60 text-emerald-400 border border-emerald-500/30"
                        : exp.type === "Research"
                        ? "bg-cyan-950/60 text-cyan-400 border border-cyan-500/30"
                        : "bg-slate-800 text-slate-300"
                    }`}
                  >
                    {exp.type}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {exp.period}
                  </span>
                </div>

                <h3
                  className={`text-base font-bold transition-colors ${
                    isSelected ? "text-cyan-300" : "text-white"
                  }`}
                >
                  {exp.role}
                </h3>
                <p className="text-xs text-slate-300 font-medium">{exp.organization}</p>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{exp.highlight}</p>
              </div>
            );
          })}
        </div>

        {/* Right Side: Active Experience Deep Breakdown */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-card relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
            <div>
              <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                {currentExp.type} Experience
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
                {currentExp.role}
              </h3>
              <div className="text-sm font-semibold text-slate-300 mt-0.5">
                {currentExp.organization}
              </div>
            </div>

            <div className="flex flex-col items-end text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" /> {currentExp.period}
              </span>
              <span className="flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-rose-400" /> {currentExp.location}
              </span>
            </div>
          </div>

          {/* Key Highlight Banner */}
          <div className="my-5 p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/20 flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="text-xs sm:text-sm text-cyan-200 font-medium">
              {currentExp.highlight}
            </span>
          </div>

          {/* Bullet Points */}
          <div className="space-y-3 my-6">
            {currentExp.bullets.map((bullet, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{bullet}</span>
              </div>
            ))}
          </div>

          {/* Tech Stack Chips */}
          <div className="pt-5 border-t border-slate-800/80">
            <div className="text-[11px] font-mono text-slate-400 mb-2 uppercase tracking-wider">
              Technologies &amp; Methodologies:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {currentExp.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs font-mono rounded-md bg-slate-950 border border-slate-800 text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
