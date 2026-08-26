"use client";

import React, { useEffect, useState } from "react";
import { audioController } from "@/lib/audio";

interface SectionDot {
  id: string;
  label: string;
}

const SECTIONS: SectionDot[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About & Education" },
  { id: "experience", label: "Experience" },
  { id: "services", label: "Capabilities" },
  { id: "projects", label: "Projects" },
  { id: "research", label: "Research Papers" },
  { id: "skills", label: "Technical Skills" },
  { id: "contact", label: "Contact" },
];

export default function DotNav() {
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredDot, setHoveredDot] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const section = document.getElementById(SECTIONS[i].id);
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(SECTIONS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    audioController?.playClick(700, 0.04);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="nav__dot hidden lg:flex" aria-label="Page section navigation">
      {SECTIONS.map((sec) => {
        const isActive = activeSection === sec.id;
        const isHovered = hoveredDot === sec.id;

        return (
          <div
            key={sec.id}
            className="relative flex items-center justify-end group cursor-pointer"
            onMouseEnter={() => setHoveredDot(sec.id)}
            onMouseLeave={() => setHoveredDot(null)}
            onClick={() => scrollTo(sec.id)}
          >
            {/* Tooltip Label */}
            {(isHovered || isActive) && (
              <span
                className={`absolute right-6 px-2.5 py-1 text-[11px] font-mono whitespace-nowrap rounded border transition-all duration-200 pointer-events-none ${
                  isActive
                    ? "bg-slate-900/90 text-cyan-300 border-cyan-500/40 shadow-glow"
                    : "bg-slate-900/80 text-slate-300 border-slate-700/50"
                }`}
              >
                {sec.label}
              </span>
            )}

            {/* Dot element */}
            <li
              className={`${isActive ? "current" : ""}`}
              aria-label={`Scroll to ${sec.label}`}
            />
          </div>
        );
      })}
    </nav>
  );
}
