"use client";

import React, { useState } from "react";
import {
  Mail,
  Send,
  MapPin,
  Github,
  Linkedin,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
} from "lucide-react";
import { PROFILE } from "@/lib/content";
import { audioController } from "@/lib/audio";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage("");
  };

  const handleCopyEmail = () => {
    audioController?.playClick(800, 0.03);
    navigator.clipboard.writeText(PROFILE.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    audioController?.playClick(600, 0.04);

    // Simple validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage("Please complete all required fields.");
      return;
    }

    setIsSubmitting(true);
    audioController?.playTechBeep("high");

    // Client-side simulation of message submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      audioController?.playTechBeep("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-3 shadow-glow">
          <Mail className="w-3.5 h-3.5" />
          <span>08 / GET IN TOUCH</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Let&apos;s Build Something Impactful
        </h2>
        <p className="max-w-xl text-sm sm:text-base text-slate-300 mt-3">
          Open to remote ML / Data Science / AI engineering roles and research collaborations.
        </p>
        <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mt-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Direct Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-card">
            <h3 className="text-xl font-bold text-white mb-3">
              Direct Contact Channels
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
              Feel free to reach out directly via email or connect with me on LinkedIn and GitHub.
            </p>

            <div className="space-y-4">
              {/* Email item with copy button */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[11px] font-mono text-slate-400">
                      Email Address
                    </div>
                    <a
                      href={PROFILE.socials.email}
                      className="text-xs sm:text-sm font-semibold text-slate-200 hover:text-cyan-400 transition-colors truncate block"
                    >
                      {PROFILE.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors shrink-0"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Location item */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-rose-500/10 text-rose-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-400">
                    Location
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-200">
                    {PROFILE.location} (Open to Global Remote)
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links Row */}
            <div className="mt-8 pt-6 border-t border-slate-800 flex items-center gap-3">
              <a
                href={PROFILE.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white flex items-center justify-center gap-2 text-xs font-semibold transition-all"
              >
                <Github className="w-4 h-4" /> GitHub
              </a>
              <a
                href={PROFILE.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-400 flex items-center justify-center gap-2 text-xs font-semibold transition-all"
              >
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-card">
            <h3 className="text-xl font-bold text-white mb-2">
              Send a Message
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">
              Have a question, opportunity, or research idea? Drop a note below.
            </p>

            {submitted ? (
              <div className="p-6 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-3 animate-fadeIn">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">Message Sent Successfully!</h4>
                <p className="text-xs sm:text-sm text-slate-300">
                  Thank you for reaching out. I will get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors mt-2"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2 animate-fadeIn">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Morgan"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/40 transition-all font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="alex@company.com"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/40 transition-all font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    Subject / Topic
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. ML Engineering Role / Research Collaboration"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/40 transition-all font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/40 transition-all font-sans resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-glow transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>Sending Message...</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
