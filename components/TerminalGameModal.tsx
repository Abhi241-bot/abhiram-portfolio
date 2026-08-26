"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal, X, Play, RotateCcw, Sparkles } from "lucide-react";
import { audioController } from "@/lib/audio";

interface TerminalGameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandHistory {
  command: string;
  output: string | React.ReactNode;
  time: string;
}

export default function TerminalGameModal({ isOpen, onClose }: TerminalGameModalProps) {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: "init-system",
      output: (
        <div className="space-y-1 text-slate-300">
          <p className="text-cyan-400 font-bold">=== ABHIRAM BOINI QUANT & MLOPS TERMINAL v2.4 ===</p>
          <p className="text-xs text-slate-400">Type <span className="text-amber-300 font-mono">help</span> to view available simulation commands, or click any preset below.</p>
        </div>
      ),
      time: new Date().toLocaleTimeString(),
    },
  ]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
      audioController?.playTechBeep("high");
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  if (!isOpen) return null;

  const executeCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    audioController?.playClick(650, 0.03);

    let output: React.ReactNode;

    switch (cmd) {
      case "help":
        output = (
          <div className="space-y-1.5 text-xs text-slate-300 py-1">
            <p className="text-cyan-300 font-semibold">Available Commands:</p>
            <p><span className="text-amber-400 font-mono">simulate-arbitrage</span> — Run pairs trading simulation on TCS/INFY with rolling Kalman filter</p>
            <p><span className="text-amber-400 font-mono">evaluate-mlops</span> — Trigger Evidently AI drift check & MLflow promotion gate</p>
            <p><span className="text-amber-400 font-mono">price-options</span> — Calculate Black-Scholes Greeks (Delta, Gamma, Vega, Theta, Rho)</p>
            <p><span className="text-amber-400 font-mono">whoami</span> — Display system engineer profile</p>
            <p><span className="text-amber-400 font-mono">cat resume</span> — Show key resume statistics & links</p>
            <p><span className="text-amber-400 font-mono">clear</span> — Clear terminal output history</p>
          </div>
        );
        break;

      case "simulate-arbitrage":
        output = (
          <div className="space-y-2 text-xs py-1">
            <p className="text-emerald-400 font-mono font-bold">[ENGINE] Executing Engle-Granger Cointegration on TCS/INFY...</p>
            <div className="bg-slate-950 p-2.5 rounded border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1">
              <p>› Cointegration ADF Statistic: <span className="text-cyan-400 font-bold">-4.128</span> (p = 0.000201 ***)</p>
              <p>› Johansen Trace Statistic: <span className="text-cyan-400 font-bold">24.89</span> (Critical 5%: 15.49)</p>
              <p>› Dynamic Kalman Filter β: <span className="text-amber-400">1.184</span> (decay rate λ = 0.98)</p>
              <div className="text-cyan-400 my-1 font-mono text-[10px] leading-tight">
                {"Spread: [---/\\--/\\---/\\____/\\---/\\---] In-Sample Sharpe: 0.97 | OOS: -0.72"}
              </div>
              <p className="text-amber-300">› Conclusion: Signal breakdown diagnosed via 9-fold walk-forward validation.</p>
            </div>
          </div>
        );
        break;

      case "evaluate-mlops":
        output = (
          <div className="space-y-2 text-xs py-1">
            <p className="text-cyan-400 font-mono font-bold">[MLOPS] Triggering Evidently AI Drift Analysis & MLflow Pipeline...</p>
            <div className="bg-slate-950 p-2.5 rounded border border-slate-800 font-mono text-[11px] space-y-1 text-slate-300">
              <p>› Stream Payload: 10,000 transactions (Fraud prevalence: 0.17%)</p>
              <p>› KS-Drift Test: <span className="text-amber-400 font-bold">DRIFT DETECTED</span> (Amount p=0.0018, Latency p=0.0042)</p>
              <p>› Automated Retraining: Challenger model trained (scale_pos_weight=588)</p>
              <p>› Promotion Gate: Challenger PR-AUC <span className="text-emerald-400 font-bold">0.774</span> &gt; Incumbent 0.712</p>
              <p className="text-emerald-400 font-bold">› STATUS: Model Promoted to MLflow Production Registry (Hot-Reloaded in FastAPI)</p>
            </div>
          </div>
        );
        break;

      case "price-options":
        output = (
          <div className="space-y-2 text-xs py-1">
            <p className="text-amber-400 font-mono font-bold">[QUANT] Black-Scholes-Merton Analytical Greeks (Spot=100, Strike=100, Vol=20%, T=1yr, r=5%):</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 bg-slate-950 p-2.5 rounded border border-slate-800 font-mono text-[11px]">
              <div>Call Price: <span className="text-cyan-300">$10.45</span></div>
              <div>Put Price: <span className="text-cyan-300">$5.57</span></div>
              <div>Delta (Δ): <span className="text-emerald-400">+0.6368</span></div>
              <div>Gamma (Γ): <span className="text-emerald-400">+0.0187</span></div>
              <div>Vega (ν): <span className="text-amber-400">+37.52</span></div>
              <div>Theta (θ): <span className="text-rose-400">-6.41/yr</span></div>
            </div>
          </div>
        );
        break;

      case "whoami":
        output = (
          <div className="text-xs text-slate-300 space-y-1 py-1">
            <p className="text-cyan-400 font-bold">Abhiram Boini</p>
            <p>Data Science & AI Engineer · Applied ML Researcher · Quantitative Researcher</p>
            <p>Undergraduate at IIIT Naya Raipur (CGPA: 8.70/10.0) · Research Intern at IIT (BHU) Varanasi</p>
          </div>
        );
        break;

      case "cat resume":
        output = (
          <div className="text-xs text-slate-300 space-y-1 py-1">
            <p>Primary Resumes:</p>
            <p>1. <a href="/resumes/Abhiram_Boini_ML_Resume.pdf" target="_blank" className="text-cyan-400 underline">ML / Data Science Resume (PDF)</a></p>
            <p>2. <a href="/resumes/Abhiram_Boini_Quant_Resume.pdf" target="_blank" className="text-amber-400 underline">Quantitative Finance Resume (PDF)</a></p>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      default:
        output = (
          <p className="text-xs text-rose-400 font-mono">
            Command not recognized: &quot;{rawCmd}&quot;. Type <span className="text-amber-300 font-bold">help</span> to view commands.
          </p>
        );
        break;
    }

    setHistory((prev) => [
      ...prev,
      { command: rawCmd, output, time: new Date().toLocaleTimeString() },
    ]);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputVal.trim()) {
      executeCommand(inputVal);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl h-[550px] max-h-[85vh] bg-[#0c121e] border border-cyan-500/40 rounded-xl shadow-2xl flex flex-col overflow-hidden">
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 cursor-pointer" onClick={onClose} />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="flex items-center gap-1.5 ml-3 text-xs font-mono text-cyan-400 font-medium">
              <Terminal className="w-3.5 h-3.5" />
              <span>abhiram@quantum-node:~</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close terminal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Terminal Quick Action Presets */}
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-950/60 border-b border-slate-800/80 overflow-x-auto text-[11px]">
          <span className="text-slate-400 whitespace-nowrap flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-cyan-400" /> Presets:
          </span>
          <button
            onClick={() => executeCommand("simulate-arbitrage")}
            className="px-2 py-0.5 rounded bg-slate-800 hover:bg-cyan-950 text-cyan-300 border border-slate-700 hover:border-cyan-500 transition-all font-mono whitespace-nowrap"
          >
            simulate-arbitrage
          </button>
          <button
            onClick={() => executeCommand("evaluate-mlops")}
            className="px-2 py-0.5 rounded bg-slate-800 hover:bg-cyan-950 text-cyan-300 border border-slate-700 hover:border-cyan-500 transition-all font-mono whitespace-nowrap"
          >
            evaluate-mlops
          </button>
          <button
            onClick={() => executeCommand("price-options")}
            className="px-2 py-0.5 rounded bg-slate-800 hover:bg-amber-950 text-amber-300 border border-slate-700 hover:border-amber-500 transition-all font-mono whitespace-nowrap"
          >
            price-options
          </button>
          <button
            onClick={() => executeCommand("help")}
            className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all font-mono whitespace-nowrap"
          >
            help
          </button>
        </div>

        {/* Terminal Body */}
        <div className="flex-1 p-4 overflow-y-auto font-mono text-sm space-y-3 scrollbar-thin">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="text-emerald-400">➜</span>
                <span className="text-cyan-400 font-semibold">{item.command}</span>
                <span className="text-[10px] text-slate-500 ml-auto">{item.time}</span>
              </div>
              <div className="pl-4">{item.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Input Bar */}
        <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
          <span className="text-emerald-400 font-mono text-sm">➜</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type command ('help', 'simulate-arbitrage', 'evaluate-mlops')..."
            className="flex-1 bg-transparent font-mono text-xs text-cyan-300 placeholder-slate-500 focus:outline-none"
          />
          <button
            onClick={() => inputVal.trim() && executeCommand(inputVal)}
            className="px-2.5 py-1 text-xs font-mono rounded bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/40 flex items-center gap-1 transition-all"
          >
            <Play className="w-3 h-3" /> Run
          </button>
        </div>
      </div>
    </div>
  );
}
