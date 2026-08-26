import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#0A0E14",
        surface: {
          DEFAULT: "rgba(15, 23, 42, 0.65)",
          card: "rgba(18, 24, 38, 0.75)",
          hover: "rgba(30, 41, 59, 0.8)",
          glass: "rgba(255, 255, 255, 0.03)",
        },
        cyan: {
          accent: "#3DD9EB",
          glow: "rgba(61, 217, 235, 0.4)",
          subtle: "rgba(61, 217, 235, 0.12)",
        },
        amber: {
          accent: "#E8B94E",
          glow: "rgba(232, 185, 78, 0.4)",
          subtle: "rgba(232, 185, 78, 0.12)",
        },
        border: {
          subtle: "rgba(255, 255, 255, 0.08)",
          accent: "rgba(61, 217, 235, 0.25)",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "IBM Plex Mono", "monospace"],
      },
      boxShadow: {
        glow: "0 0 25px rgba(61, 217, 235, 0.25)",
        "glow-amber": "0 0 25px rgba(232, 185, 78, 0.25)",
        "glow-lg": "0 0 45px rgba(61, 217, 235, 0.35)",
        card: "0 20px 50px rgba(0, 0, 0, 0.6)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "equalizer": "equalizer 1.2s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        equalizer: {
          "0%": { height: "20%" },
          "100%": { height: "100%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
