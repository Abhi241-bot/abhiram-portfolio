"use client";

import React from "react";
import {
  Cpu,
  Bot,
  TrendingUp,
  Eye,
  GitBranch,
  Layers,
  Sparkles,
  Check,
} from "lucide-react";
import { SERVICES, ServiceItem } from "@/lib/content";
import { audioController } from "@/lib/audio";

const ICON_MAP: Record<string, React.ReactNode> = {
  Cpu: <Cpu className="w-6 h-6 text-cyan-400" />,
  Bot: <Bot className="w-6 h-6 text-cyan-400" />,
  TrendingUp: <TrendingUp className="w-6 h-6 text-amber-400" />,
  Eye: <Eye className="w-6 h-6 text-cyan-400" />,
  GitBranch: <GitBranch className="w-6 h-6 text-emerald-400" />,
  Layers: <Layers className="w-6 h-6 text-cyan-400" />,
};

export default function Services() {
  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-3 shadow-glow">
          <Sparkles className="w-3.5 h-3.5" />
          <span>04 / CORE CAPABILITIES</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Engineering &amp; Research Capabilities
        </h2>
        <p className="max-w-2xl text-sm sm:text-base text-slate-400 mt-3">
          Delivering production-grade AI systems, quantitative finance modeling, and mathematically validated empirical research.
        </p>
        <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mt-4" />
      </div>

      {/* 6 Capability Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map((srv) => (
          <div
            key={srv.id}
            onMouseEnter={() => audioController?.playClick(720, 0.02)}
            className="p-6 sm:p-7 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl hover:border-cyan-500/40 hover:bg-slate-900/90 transition-all duration-300 group flex flex-col justify-between shadow-card relative overflow-hidden"
          >
            {/* Top row */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 group-hover:border-cyan-500/30 group-hover:scale-105 transition-all">
                  {ICON_MAP[srv.iconName] || <Cpu className="w-6 h-6 text-cyan-400" />}
                </div>
                <span className="text-[11px] font-mono text-slate-400 px-2.5 py-0.5 rounded-full bg-slate-950 border border-slate-800">
                  {srv.badge}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                {srv.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                {srv.shortDesc}
              </p>
            </div>

            {/* Capabilities List */}
            <div className="pt-4 border-t border-slate-800/80 space-y-2">
              {srv.capabilities.map((cap, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-400 group-hover:text-slate-300 transition-colors">
                  <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>{cap}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
