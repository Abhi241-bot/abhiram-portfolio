"use client";

import React from "react";
import Background3D from "@/components/Background3D";
import Navbar from "@/components/Navbar";
import DotNav from "@/components/DotNav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Services from "@/components/Services";
import ProjectSection from "@/components/Projects/ProjectSection";
import Research from "@/components/Research";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0A0E14] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* 3D WebGL Canvas in Fixed Background */}
      <Background3D />

      {/* Floating Sticky Navigation */}
      <Navbar />

      {/* Side Scroll-Spy Dot Indicator */}
      <DotNav />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* 01 Hero Section */}
        <Hero />

        {/* 02 About & Education */}
        <About />

        {/* 03 Experience Timeline */}
        <Experience />

        {/* 04 Capabilities & Services */}
        <Services />

        {/* 05 Projects (Dual Identity Tabs & Modals) */}
        <ProjectSection />

        {/* 06 Research Papers & In-Progress Work */}
        <Research />

        {/* 07 Technical Skills */}
        <Skills />

        {/* 08 Certifications & Achievements Strip */}
        <Certifications />

        {/* 09 Contact & Collaboration */}
        <Contact />
      </main>

      {/* 10 Footer */}
      <Footer />
    </div>
  );
}
