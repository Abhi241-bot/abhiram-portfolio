"use client";

import React from "react";
import {
  Github,
  ExternalLink,
  ArrowUpRight,
  TrendingUp,
  Cpu,
  Layers,
  Sparkles,
} from "lucide-react";
import { Project } from "./data";
import { audioController } from "@/lib/audio";

interface ProjectCardProps {
  project: Project;
  onOpenModal: (project: Project) => void;
}

export default function ProjectCard({ project, onOpenModal }: ProjectCardProps) {
  const isQuant = project.category === "quant";

  const handleClick = () => {
    audioController?.playClick(650, 0.03);
    onOpenModal(project);
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => audioController?.playClick(750, 0.02)}
      className={`p-6 sm:p-7 rounded-2xl bg-slate-900/75 border transition-all duration-300 backdrop-blur-xl shadow-card cursor-pointer group flex flex-col justify-between relative overflow-hidden ${
        isQuant
          ? "border-slate-800 hover:border-amber-400/50 hover:shadow-glow-amber"
          : "border-slate-800 hover:border-cyan-400/50 hover:shadow-glow"
      }`}
    >
      {/* Glow highlight line at top */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 transition-opacity opacity-0 group-hover:opacity-100 ${
          isQuant ? "bg-amber-400" : "bg-cyan-400"
        }`}
      />

      <div>
        {/* Header Tags & Category */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span
            className={`text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full border ${
              isQuant
                ? "bg-amber-950/60 text-amber-300 border-amber-500/30"
                : "bg-cyan-950/60 text-cyan-300 border-cyan-500/30"
            }`}
          >
            {isQuant ? "Quantitative Finance" : "Production AI / MLOps"}
          </span>

          <div className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 group-hover:text-white group-hover:border-slate-700 transition-all">
            <ArrowUpRight
              className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                isQuant ? "group-hover:text-amber-400" : "group-hover:text-cyan-400"
              }`}
            />
          </div>
        </div>

        {/* Title & Subtitle */}
        <h3
          className={`text-lg sm:text-xl font-bold text-white transition-colors mb-2 ${
            isQuant ? "group-hover:text-amber-300" : "group-hover:text-cyan-300"
          }`}
        >
          {project.title}
        </h3>

        <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed mb-5">
          {project.summary}
        </p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 mb-5">
          {project.metrics.slice(0, 2).map((m, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80"
            >
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                {m.label}
              </div>
              <div
                className={`text-base font-extrabold font-mono mt-0.5 ${
                  isQuant ? "text-amber-400" : "text-cyan-400"
                }`}
              >
                {m.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Tech Chips & CTA */}
      <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1">
          {project.techStack.slice(0, 3).map((tech, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 text-[11px] font-mono rounded bg-slate-950 text-slate-400 border border-slate-800"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 3 && (
            <span className="px-1.5 py-0.5 text-[11px] font-mono text-slate-400">
              +{project.techStack.length - 3}
            </span>
          )}
        </div>

        <span
          className={`text-xs font-semibold flex items-center gap-1 ${
            isQuant ? "text-amber-400" : "text-cyan-400"
          }`}
        >
          <span>View Details</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
}
