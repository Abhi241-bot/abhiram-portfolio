"use client";

import React, { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Gamepad2,
  Menu,
  X,
  Sparkles,
  Download,
  FileCode,
} from "lucide-react";
import { PROFILE } from "@/lib/content";
import AudioPlayer from "./AudioPlayer";
import TerminalGameModal from "./TerminalGameModal";
import { audioController } from "@/lib/audio";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Capabilities", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Research", href: "#research" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [terminalModalOpen, setTerminalModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const scrollPosition = window.scrollY + 100;
      for (const item of [...NAV_ITEMS].reverse()) {
        const el = document.querySelector(item.href);
        if (el) {
          const top = (el as HTMLElement).offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(item.href.replace("#", ""));
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    audioController?.playClick(580, 0.04);
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0A0E14]/85 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-lg"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Brand */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#home");
            }}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 p-[1px] shadow-glow group-hover:shadow-glow-lg transition-all duration-300">
              <div className="w-full h-full bg-[#0A0E14] rounded-lg flex items-center justify-center font-mono font-bold text-sm text-cyan-400 group-hover:text-white transition-colors">
                AB
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-wider text-slate-100 group-hover:text-cyan-300 transition-colors">
                ABHIRAM BOINI
              </span>
              <span className="text-[10px] font-mono text-slate-400 tracking-tight">
                ML Engineer & Quant
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-md">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-glow"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            {/* Audio Player Component */}
            <AudioPlayer />

            {/* Interactive Terminal / Game Button */}
            <button
              onClick={() => {
                audioController?.playClick(750, 0.05);
                setTerminalModalOpen(true);
              }}
              className="group relative p-2 rounded-full bg-slate-900/80 border border-slate-700/60 hover:border-amber-400/50 hover:bg-amber-950/30 transition-all duration-300 backdrop-blur-md shadow-sm"
              title="Open Quant/AI Terminal Simulator"
              aria-label="Open Quant and AI Terminal Simulator"
            >
              <Gamepad2 className="w-4 h-4 text-slate-300 group-hover:text-amber-400 group-hover:scale-110 transition-all" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400" />
            </button>

            {/* Social Icons */}
            <div className="hidden sm:flex items-center gap-1.5 pl-1 border-l border-slate-800">
              <a
                href={PROFILE.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={PROFILE.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={PROFILE.socials.kaggle}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors font-mono font-bold text-xs"
                title="Kaggle Expert Profile"
              >
                <span className="px-1 py-0.5 text-[11px] font-bold">K</span>
              </a>
            </div>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#0A0E14]/95 border-b border-slate-800 px-6 py-5 backdrop-blur-xl animate-fadeIn">
            <div className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="text-left py-2.5 px-3 text-sm font-medium text-slate-300 hover:text-cyan-300 hover:bg-slate-900/60 rounded-lg transition-colors"
                >
                  {item.label}
                </button>
              ))}

              <div className="pt-4 mt-2 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <a
                    href={PROFILE.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={PROFILE.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-cyan-400"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={PROFILE.socials.email}
                    className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-emerald-400"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>

                <a
                  href="/resumes/Abhiram_Boini_ML_Resume.pdf"
                  target="_blank"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-cyan-300 bg-cyan-950/60 border border-cyan-500/40 rounded-lg"
                >
                  <Download className="w-3.5 h-3.5" /> Resume
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Terminal Easter Egg Modal */}
      <TerminalGameModal
        isOpen={terminalModalOpen}
        onClose={() => setTerminalModalOpen(false)}
      />
    </>
  );
}
