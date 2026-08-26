"use client";

import React, { useEffect } from "react";
import {
  X,
  Github,
  ExternalLink,
  Cpu,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Layers,
  Sparkles,
} from "lucide-react";
import { Project } from "./data";
import { audioController } from "@/lib/audio";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      audioController?.playTechBeep("high");
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const isQuant = project.category === "quant";
  const accentColor = isQuant ? "amber" : "cyan";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div
        className={`relative w-full max-w-4xl max-h-[90vh] bg-[#0c121e] border ${
          isQuant ? "border-amber-500/40" : "border-cyan-500/40"
        } rounded-2xl shadow-2xl flex flex-col overflow-hidden my-auto`}
      >
        {/* Top Accent Strip */}
        <div
          className={`h-1.5 w-full bg-gradient-to-r ${
            isQuant
              ? "from-amber-400 via-yellow-500 to-amber-600"
              : "from-cyan-400 via-blue-500 to-cyan-300"
          }`}
        />

        {/* Modal Header */}
        <div className="flex items-start justify-between p-6 sm:p-8 border-b border-slate-800 bg-slate-900/60">
          <div className="space-y-1.5 pr-6">
            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full border ${
                  isQuant
                    ? "bg-amber-950/60 text-amber-300 border-amber-500/30"
                    : "bg-cyan-950/60 text-cyan-300 border-cyan-500/30"
                }`}
              >
                {isQuant ? "Quantitative Finance" : "AI / ML / MLOps"}
              </span>
              <span className="text-xs font-mono text-slate-400">
                Production Case Study
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              {project.subtitle}
            </p>
          </div>

          <button
            onClick={() => {
              audioController?.playClick(450, 0.03);
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors shrink-0"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-8 scrollbar-thin">
          {/* Key Metrics Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {project.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-center"
              >
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  {metric.label}
                </div>
                <div
                  className={`text-lg sm:text-xl font-bold font-mono mt-0.5 ${
                    isQuant ? "text-amber-400" : "text-cyan-400"
                  }`}
                >
                  {metric.value}
                </div>
                {metric.detail && (
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {metric.detail}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Problem Statement Box */}
          <div className="p-5 rounded-xl bg-slate-900/50 border border-slate-800">
            <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-rose-400" />
              <span>The Problem &amp; Industry Challenge</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {project.problemStatement}
            </p>
          </div>

          {/* Solution & System Architecture */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Technical Solution &amp; System Architecture</span>
            </h4>
            <div className="space-y-2.5">
              {project.solutionArchitecture.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-lg bg-slate-950/60 border border-slate-800/60 text-xs sm:text-sm text-slate-300 leading-relaxed"
                >
                  <CheckCircle2
                    className={`w-4 h-4 shrink-0 mt-0.5 ${
                      isQuant ? "text-amber-400" : "text-cyan-400"
                    }`}
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Findings & Empirical Results */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Sparkles
                className={`w-4 h-4 ${
                  isQuant ? "text-amber-400" : "text-cyan-400"
                }`}
              />
              <span>Empirical Results &amp; Takeaways</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {project.keyResults.map((result, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border text-xs text-slate-300 leading-relaxed ${
                    isQuant
                      ? "bg-amber-950/20 border-amber-500/20 text-amber-200"
                      : "bg-cyan-950/20 border-cyan-500/20 text-cyan-200"
                  }`}
                >
                  {result}
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Chips */}
          <div>
            <div className="text-xs font-mono text-slate-400 mb-2 uppercase tracking-wider">
              Technologies &amp; Libraries Used:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-xs font-mono rounded-lg bg-slate-950 border border-slate-800 text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6 bg-slate-900 border-t border-slate-800">
          <div className="text-xs font-mono text-slate-400">
            Open-source and reproducible implementation.
          </div>

          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                  isQuant
                    ? "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-glow-amber"
                    : "bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-glow"
                }`}
              >
                <Github className="w-4 h-4" />
                <span>View Source Code</span>
              </a>
            )}

            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
