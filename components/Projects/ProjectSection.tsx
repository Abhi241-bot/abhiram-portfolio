"use client";

import React, { useState } from "react";
import {
  Cpu,
  TrendingUp,
  Sparkles,
  Layers,
  FileText,
  Download,
} from "lucide-react";
import { PROJECTS_DATA, Project } from "./data";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { audioController } from "@/lib/audio";
import { PROFILE } from "@/lib/content";

export default function ProjectSection() {
  const [activeTab, setActiveTab] = useState<"ai-ml" | "quant">("ai-ml");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleTabChange = (tab: "ai-ml" | "quant") => {
    audioController?.playClick(600, 0.04);
    setActiveTab(tab);
  };

  const filteredProjects = PROJECTS_DATA.filter(
    (p) => p.category === activeTab
  );

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-3 shadow-glow">
          <Sparkles className="w-3.5 h-3.5" />
          <span>05 / PROJECTS &amp; CASE STUDIES</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Featured Engineering Projects
        </h2>
        <p className="max-w-2xl text-sm sm:text-base text-slate-400 mt-3">
          Explore production-grade ML systems, agentic tools, and quantitative finance research engines.
        </p>
        <div
          className={`w-16 h-1 rounded-full mt-4 transition-colors duration-500 ${
            activeTab === "quant"
              ? "bg-gradient-to-r from-amber-400 to-yellow-500"
              : "bg-gradient-to-r from-cyan-400 to-blue-500"
          }`}
        />
      </div>

      {/* Dual Identity Tab Switcher */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5 p-1.5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
          {/* Tab 1: AI / ML */}
          <button
            onClick={() => handleTabChange("ai-ml")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
              activeTab === "ai-ml"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-glow"
                : "text-slate-400 hover:text-white hover:bg-slate-850"
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>AI / ML / MLOps</span>
            <span className="ml-1 text-[11px] px-1.5 py-0.2 rounded-full bg-cyan-950 text-cyan-300 font-mono">
              3
            </span>
          </button>

          {/* Tab 2: Quantitative Finance */}
          <button
            onClick={() => handleTabChange("quant")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
              activeTab === "quant"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-glow-amber"
                : "text-slate-400 hover:text-white hover:bg-slate-850"
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Quantitative Finance</span>
            <span className="ml-1 text-[11px] px-1.5 py-0.2 rounded-full bg-amber-950 text-amber-300 font-mono">
              3
            </span>
          </button>
        </div>

        {/* Quant Resume Direct Link when in Quant Tab */}
        {activeTab === "quant" ? (
          <a
            href={PROFILE.resumes.quant}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold text-amber-300 bg-amber-950/40 border border-amber-500/30 hover:bg-amber-950/70 transition-all"
          >
            <Download className="w-3.5 h-3.5" /> Download Quant Resume (PDF)
          </a>
        ) : (
          <a
            href={PROFILE.resumes.ml}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 hover:bg-cyan-950/70 transition-all"
          >
            <Download className="w-3.5 h-3.5" /> Download ML / DS Resume (PDF)
          </a>
        )}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpenModal={(p) => setSelectedProject(p)}
          />
        ))}
      </div>

      {/* Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
