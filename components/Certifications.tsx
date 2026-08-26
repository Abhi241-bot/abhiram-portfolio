"use client";

import React from "react";
import { Award, CheckCircle2, Sparkles } from "lucide-react";
import { CERTIFICATIONS } from "@/lib/content";

export default function Certifications() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-white">
              Certifications &amp; Key Honors
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Verified Credentials &amp; Percentiles
          </span>
        </div>

        {/* Horizontal Scrolling / Flex Strip */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {CERTIFICATIONS.map((cert, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-xl bg-slate-950/80 border transition-all text-center flex flex-col justify-between ${
                cert.highlight
                  ? "border-cyan-500/30 hover:border-cyan-400 hover:shadow-glow"
                  : "border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="text-xs font-bold text-slate-100 line-clamp-2 mb-2">
                {cert.title}
              </div>
              <div>
                <span
                  className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full inline-block ${
                    cert.highlight
                      ? "bg-cyan-950/80 text-cyan-300 border border-cyan-500/30"
                      : "bg-slate-900 text-slate-400"
                  }`}
                >
                  {cert.badgeText || cert.issuer}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
