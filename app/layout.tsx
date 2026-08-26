import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0A0E14",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Abhiram Boini | Data Science, Production AI & Quantitative Researcher",
  description:
    "Portfolio of Abhiram Boini — Data Science & AI Engineer with production ML systems experience (deployed government zoo AI, MLOps, LLM agents) and quantitative finance research.",
  keywords: [
    "Abhiram Boini",
    "Machine Learning Engineer",
    "Quantitative Finance",
    "MLOps",
    "LangGraph",
    "Deep Learning",
    "IIIT Naya Raipur",
    "IIT BHU",
    "Statistical Arbitrage",
    "Options Pricing",
    "Artificial Intelligence",
  ],
  authors: [{ name: "Abhiram Boini", url: "https://github.com/Abhi241-bot" }],
  creator: "Abhiram Boini",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://abhiramboini.dev",
    title: "Abhiram Boini | Data Science & Quantitative Researcher",
    description:
      "Production ML systems, LLM agents, and quantitative finance research portfolio of Abhiram Boini.",
    siteName: "Abhiram Boini Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhiram Boini | AI Engineer & Quant Researcher",
    description:
      "Production ML systems, LLM agents, and quantitative finance research.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⚡</text></svg>" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-[#0A0E14] text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200`}
      >
        {children}
      </body>
    </html>
  );
}
