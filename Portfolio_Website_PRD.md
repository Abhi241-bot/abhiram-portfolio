# Portfolio Website — Product Requirements Document
**Owner:** Abhiram Boini
**Prepared for:** Build agent (Claude Code / IDE agent)
**Reference inspiration:** https://gustavobatista.dev/
**Version:** 1.0 — Aug 2026

---

## 1. Overview

A single-page, scroll-driven personal portfolio site for Abhiram Boini — a Data Science & AI undergraduate at IIIT Naya Raipur with production ML experience (a deployed government AI system, MLOps/LLM-agent projects) **and** a parallel body of independent quantitative-finance research (option pricing, causal econometrics, factor investing).

The reference site (gustavobatista.dev) uses a single-page layout with anchored nav (Home/About/Service/Projects/Contact), an animated hero, a skills grid with icons, and modal-based project cards. We're keeping that overall *skeleton* — anchored single-page nav, hero → about → skills → experience → projects → research → contact — but replacing the game/RPG visual language with a data/ML-native one, and solving a problem the reference site doesn't have: **presenting two distinct professional identities (ML engineer and quant researcher) coherently on one page.**

## 2. Goals

- Communicate, within 5 seconds of landing, that Abhiram ships production ML systems (not just notebooks).
- Give quant recruiters/researchers a credible, separate path into the quant work without diluting the ML-engineer framing for the primary audience.
- Make the strongest projects (live demos, GitHub repos, the government deployment) the first thing a visitor can click into.
- Be fast, accessible, and maintainable by one person with no backend team.

## 3. Non-Goals

- No CMS / no dynamic backend content — content is static, edited in code.
- No blog (can be a Phase 2 add-on, not in this build).
- No e-commerce, auth, or user accounts.
- Not attempting the "language switcher / background music / game intro" gimmicks from the reference site — they don't fit this audience and add build risk for little payoff.

## 4. Target Audience (in priority order)

1. ML/AI hiring managers and recruiters (new-grad / internship roles).
2. Research collaborators / professors (segmentation, deepfake detection, compression work).
3. Quant research recruiters or professors (secondary persona, reached via a distinct section, not the homepage identity).

## 5. Information Architecture / Site Map

Single page, anchor-linked sections, sticky nav with scroll-spy active-state:

```
Navbar: Home · About · Experience · Projects · Research · Skills · Contact
├── 01 Hero (Home)
├── 02 About (bio + education)
├── 03 Experience (timeline)
├── 04 Projects
│     ├── Tab: AI / ML / MLOps  (default active)
│     └── Tab: Quantitative Finance
├── 05 Research (papers — IEEE + 2 quant working papers)
├── 06 Skills (categorized)
├── 07 Certifications & Achievements (compact strip)
├── 08 Contact
└── Footer
```

**Key IA decision:** Projects and content default to the AI/ML/production identity (Main_Resume). Quant work is not hidden — it's a first-class tab/filter, one click away — but it doesn't compete with the ML identity for the homepage's first impression. This mirrors how the two resumes are actually used: one primary, one situational.

## 6. Tech Stack (recommended)

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 14+ (App Router), TypeScript | static export friendly, good SEO, agent-friendly scaffolding |
| Styling | Tailwind CSS | fast to build/iterate, easy for an agent to generate consistently |
| Animation | Framer Motion | scroll-reveal, hero text animation, tab transitions |
| Icons | lucide-react + simple-icons (for tech logos) | covers both generic UI icons and brand/tech logos (Python, PyTorch, Docker, etc.) |
| Data viz accents (optional) | a few hand-built SVGs or lightweight D3/Recharts sparkline for the hero background | avoid heavy three.js unless you want the 3D network graph in §8 |
| Contact form | Formspree or EmailJS (no backend needed) | static-site friendly |
| Deployment | Vercel | zero-config Next.js hosting |
| Fonts | `Inter` or `Geist` for body, `JetBrains Mono` or `IBM Plex Mono` for code/stat accents | reinforces "engineer/researcher," not "designer" |

## 7. Design System

**Direction:** "Research lab, not game studio." Dark-mode-first, technical, data-driven — think a cross between a clean ML paper landing page and a well-designed engineering blog. Avoid neon/gamer aesthetics from the reference site; avoid generic Bootstrap-card portfolios too.

- **Theme:** Dark base (`#0A0E14` / near-black navy) with a light-mode toggle (invert to off-white `#FAFAFA`).
- **Accent colors — dual identity, not dual theme:**
  - Primary accent (ML/AI identity, default): electric blue/cyan (`#3DD9EB`-ish) — evokes tensors/data.
  - Secondary accent (Quant identity, shown only inside the Quant tab/section): amber/gold (`#E8B94E`-ish) — evokes finance/terminals.
  - This gives the "two personas" a subtle visual signature without needing a full theme-switcher toggle.
- **Typography:** Large, confident hero headline in sans; monospace used sparingly for stats, metrics, and code-like labels (e.g., `PR-AUC 0.77`, `p = 0.002`) — this is a nice, on-brand detail given how metric-heavy his work is.
- **Motifs:**
  - Hero background: a subtle animated node-graph / neural-net line pattern (low-opacity, slow-moving), not a game world.
  - Section dividers: thin gradient rules, not skeuomorphic borders.
  - Cards: flat, 1px border, soft glow on hover — no heavy shadows.
- **Motion:** Fade/slide-up on scroll (Framer Motion `whileInView`), 200–400ms, no bouncy easing. Respect `prefers-reduced-motion`.

## 8. Section-by-Section Specification

### 8.1 Hero (Home)
- Headline: **"Abhiram Boini"**
- Animated/typewriter subheadline cycling through: `Data Science & AI Engineer` → `Applied ML Researcher` → `Quantitative Researcher`
- One-liner (from resume Summary, tightened):
  > "I build production ML systems — from a deployed government AI pipeline to agentic LLM tools — and run independent quantitative-finance research on the side."
- CTA buttons: `View Projects` (scrolls to #projects), `Resume` (dropdown or two buttons: "ML/DS Resume" and "Quant Resume" — see §13 open item on hosting the PDFs)
- Social row: GitHub, LinkedIn, Kaggle, Email (icons only, from resume header — **URLs need to be filled in**, see §13)
- Location tag: Hyderabad, India / IIIT Naya Raipur
- Background: subtle animated node-graph (see §7)

### 8.2 About
Bio paragraph (synthesized, ready to paste):
> "I'm a Data Science & AI undergraduate at IIIT Naya Raipur (CGPA 8.70/10.0), currently doing research on multi-modal urban semantic segmentation at IIT (BHU) Varanasi. Over the past year I've shipped a production voice-logging AI system for the Chhattisgarh Forest Department, built three end-to-end ML systems spanning MLOps, causal inference, and multi-agent LLM tooling, and — outside coursework — written independent research on option pricing and cross-asset market stress. I care about rigor: honest reporting of negative results, proper out-of-sample validation, and statistical significance testing show up throughout my work below."

**Education timeline (single entry, but format as a timeline component for future-proofing):**
- 2024–Apr 2028 · IIIT Naya Raipur · B.Tech, Data Science & AI · CGPA 8.70/10.0
- Sub-line: Class XII 96.9% · JEE Main 97.7 percentile · Class X 95.6%

### 8.3 Experience (timeline component, reverse chronological)

| Role | Org | Dates | Key bullets |
|---|---|---|---|
| Research Intern | IIT (BHU), Varanasi | May 2026 – *[confirm end date — see §13]* | Urban morphology via multi-modal semantic segmentation of satellite imagery; optical+SAR fusion for Tier-II Indian cities |
| AI/ML Engineer | Dept. of Forests, Chhattisgarh Govt. | Dec 2025 – *[confirm end date — see §13]* | Built & **deployed to production** a Hindi voice-based animal-health logging system for a government zoo; Deepgram ASR + Gemini LLM; end-to-end audio→database pipeline |
| AI Data Analyst (Remote) | Rochester Institute of Technology, NY | Dec 2025 – Jan 2026 | Modeled student engagement/drop-off on imbalanced data; class weighting, PR-AUC reporting; Tableau dashboards |
| AI/ML Engineer Intern (Remote) | Infosys Springboard | Oct 2025 – Dec 2025 | Built SmileAgeAI (smile F1 0.87, age MAE 5.55yrs); custom CNNs, Haar Cascade + CLAHE pipeline |

Each row → expandable/hover card with the full bullet points from the resume.

### 8.4 Projects (tabbed: AI/ML default, Quant Finance second tab)

**Tab 1 — AI / ML / MLOps** (cards, each opens a modal with full detail):

1. **Real-Time MLOps Fraud Detection & Drift Monitoring** — `MLflow · FastAPI · Docker · CI/CD`
   - Test PR-AUC 0.77 (precision 0.87 / recall 0.75) on a ~0.17%-positive dataset
   - Evidently drift detection → auto-retraining → MLflow registry promotion gate → FastAPI hot-reload
   - Fully containerized (`docker compose up`), ruff + pytest CI
   - [Live Demo link — TODO] · [GitHub link — TODO]

2. **Multi-Agent Financial Analyst with Evals & Fine-Tuned SQL Tool** — `LangGraph · QLoRA · RAGAS`
   - LangGraph planner→researcher→analyst agent; 10-K retrieval, web search, Text-to-SQL tool routing; cited reports from live SEC EDGAR data
   - QLoRA (4-bit, r=16) fine-tune lifted Text-to-SQL execution accuracy 49.0% → 54.5% (+11% rel.)
   - Prompt-injection/PII/read-only-SQL guardrails, human-in-the-loop checkpoint, RAGAS + DeepEval + LangSmith tracing
   - [Live Demo link — TODO] · [GitHub link — TODO]

3. **Causal Inference & A/B Experimentation Platform** — `DoWhy · EconML · statsmodels · Streamlit`
   - Self-serve A/B design checks (power, SRM), CUPED variance reduction, DiD/PSM/causal forests
   - On confounded data, naive A/B overstated effect 5× (11.0 vs 2.0); PSM recovered true effect (1.6)
   - Plain-English ship/don't-ship verdict output
   - [Live Demo link — TODO] · [GitHub link — TODO]

**Tab 2 — Quantitative Finance** (cards, links already available from resume):

1. **Statistical Arbitrage / Pairs Trading (NSE Equities)** — `Python · statsmodels`
   - Engle–Granger cointegration (p = 0.0002, Bonferroni-cleared) on TCS/INFY; hedge ratio frozen on train only
   - In-sample Sharpe 0.97 decaying to −0.72 OOS — diagnosed via Kalman-filter time-varying hedge ratio + 9-fold walk-forward
   - Cost-sensitivity sweep proves signal failure, not cost artifact; 27-test pytest suite
   - GitHub: `github.com/Abhi241-bot/Quantfin1`

2. **Options Pricing & Implied Volatility Surface** — `Python · SciPy`
   - Black–Scholes (full Greeks), CRR binomial, Monte Carlo — three-way agreement as correctness proof
   - Backed out real SPY implied vols via Brent root-finder; documented skew (+9.6% at 7d → +5.1% at 88d)
   - Delta-hedging simulation: hedging error scales as 1/√n, turns negative under transaction costs
   - GitHub: `github.com/Abhi241-bot/Quantfin2`

3. **Multi-Factor Long-Short Equity Strategy (Nifty 100)** — `Python · pandas`
   - Momentum/low-vol/value z-score factors, dollar-neutral long-short, monthly rebalance
   - Apparent +3.1% static alpha collapsed to +0.7% once beta-hedged — reported honestly, not hidden
   - Full per-factor attribution, survivorship-bias disclosure
   - GitHub: `github.com/Abhi241-bot/Quantfin3`

### 8.5 Research

- **Multimodal Stress Detection using Deep Learning** — *IEEE paper, in progress*
  - 3D-CNN + EfficientNet + Action-Unit gating, facial + acoustic fusion → 94.7% accuracy vs 87.3% unimodal baseline
  - MediaPipe alignment + VAD preprocessing → 38% error-rate reduction over baseline

- **Cross-Asset Stress-Flow Index for Early Warning of Market Drawdowns** — *sole-author manuscript*
  - Closed-form, estimation-free network statistic across a 21-asset panel (2000–2024)
  - Leads own-asset volatility ahead of drawdowns in 64% of 145 episodes (p = 0.002, block-bootstrap)
  - Near-orthogonal to Diebold–Yilmaz / Billio et al. networks (|ρ| ≤ 0.16); incremental info (p = 0.03)

- **Jumps vs. Stochastic Volatility: Out-of-Sample Option-Pricing Comparison on NSE Nifty 50 Options** — *sole-author manuscript*
  - Four pricing models from scratch (BSM, CRR, Merton jump-diffusion, Heston) on 115,709 option records
  - Regime-dependent result: Heston wins calm regimes (18–40% RMSE reduction), Merton wins COVID crash (27.7%), all p < 0.001

*(Optional, if Abhiram wants it: a small "Current Research" note pointing at in-progress work not yet published — e.g. SVD+neural image compression, multimodal deepfake detection — framed as "what I'm working on now" rather than a finished project card.)*

### 8.6 Skills (categorized grid with icons)

- **Languages:** Python, SQL, R, C++, Java, MATLAB
- **ML / DL:** PyTorch, TensorFlow, Keras, scikit-learn, XGBoost, CNNs, LoRA/QLoRA/PEFT
- **LLM / Agentic AI:** LangGraph, RAG, RAGAS, DeepEval, LangSmith, Chroma, prompt engineering
- **MLOps / Serving:** MLflow, FastAPI, Docker, GitHub Actions, Evidently AI, model monitoring
- **Quant & Stats:** cointegration/ADF, options pricing (BS/binomial/MC/Merton/Heston), Greeks, IV, factor models, backtesting, Diebold–Mariano, Kalman filtering, bootstrap inference
- **Tools:** Git, Linux, Streamlit, Gradio, Tableau, Hugging Face, Jupyter, pytest

Render as icon chips grouped under headers — not raw progress bars (hard to justify a % score for something like "hypothesis testing").

### 8.7 Certifications & Achievements (compact horizontal strip, not a whole section)

Kaggle Expert (Notebooks & Datasets) · IBM Data Science Professional Certificate · Oracle Cloud Infrastructure 2025 Data Science Professional · Google Gen AI Academy 2.0 · Intel AI Fundamentals · JEE Main 97.7 percentile

### 8.8 Contact

- Short line: "Open to remote ML / Data Science / AI engineering roles."
- Form (Name, Email, Message) via Formspree/EmailJS — no backend
- Direct: email, phone (optional — consider omitting raw phone number from a public site; use email + LinkedIn as primary), LinkedIn, GitHub

### 8.9 Footer

`© 2026 Abhiram Boini · Built with Next.js & Tailwind`

## 9. Interactions & Animations

- Scroll-spy nav highlighting active section.
- Framer Motion fade/slide-up on section entry (`whileInView`, once).
- Project tab switch (AI/ML ↔ Quant Finance) with a smooth accent-color cross-fade (cyan ↔ amber) tied to the active tab, not the whole site.
- Project cards open a modal/drawer with full bullet detail + links — mirrors the reference site's project-modal pattern but content-first instead of image-first.
- Typewriter effect for the hero subheadline role-cycling.
- Respect `prefers-reduced-motion: reduce` — disable non-essential motion.

## 10. Functional Requirements

- Fully responsive: mobile (< 640px), tablet, desktop breakpoints.
- Dark mode default, light mode toggle, persisted via `localStorage`.
- Two downloadable resume PDFs (ML/DS-focused and Quant-focused) — host both, let the visitor pick, OR default to serving the ML/DS resume from the main CTA and surface the Quant resume only within the Quant tab. **Recommend the latter** — keeps the primary CTA unambiguous.
- Working contact form with client-side validation and success/error states.
- All external links (GitHub, live demos, LinkedIn, Kaggle) open in new tabs.
- 404 page (simple, on-brand).

## 11. Non-Functional Requirements

- **Performance:** Lighthouse ≥ 90 across Performance/Accessibility/Best Practices/SEO. Lazy-load below-the-fold images/animations.
- **Accessibility:** WCAG AA — sufficient contrast in both themes, keyboard-navigable nav and modals, alt text on all icons/images, focus states visible.
- **SEO:** proper `<title>`/meta description, Open Graph tags (for LinkedIn/Twitter link previews), semantic HTML (`<section>`, `<nav>`, `<main>`), sitemap.xml, robots.txt.
- **Browser support:** latest 2 versions of Chrome/Firefox/Safari/Edge.

## 12. Proposed File/Folder Structure (Next.js App Router)

```
/app
  /page.tsx                 → assembles all sections
  /layout.tsx
  /globals.css
/components
  /Navbar.tsx
  /Hero.tsx
  /About.tsx
  /Experience.tsx
  /Projects/
    /ProjectTabs.tsx
    /ProjectCard.tsx
    /ProjectModal.tsx
    /data.ts               → project content as typed data, not hardcoded JSX
  /Research.tsx
  /Skills.tsx
  /Certifications.tsx
  /Contact.tsx
  /Footer.tsx
  /ui/                       → shared buttons, chips, section-wrapper, theme toggle
/lib
  /content.ts                → resume-derived copy as a single source of truth (bio, experience, skills arrays)
/public
  /resume-ml-ds.pdf
  /resume-quant.pdf
  /icons/, /og-image.png
```

Recommendation: put ALL resume-derived copy (bio text, experience array, skills arrays, project data) into `/lib/content.ts` and `/components/Projects/data.ts` as typed data structures, not hardcoded inline JSX. This makes future edits (new project, new job) a data change, not a layout change — much easier for an agent (or Abhiram) to maintain later.

## 13. Open Items — Confirm Before Build

1. **Date conflicts between the two resumes** — please confirm current status:
   - Research Intern @ IIT (BHU): Main resume shows "May 2026 – July 2026" (ended); Quant resume shows "May 2026 – Present". Which is accurate today (Aug 26, 2026)?
   - AI/ML Engineer @ Dept. of Forests: Main resume shows "Dec 2025 – March 2026" (ended); Quant resume shows "Dec 2025 – Present". Same question.(follow main resume)
2. **Missing URLs:** LinkedIn, GitHub, Kaggle profile links, and the three AI/ML project "Live Demo" + GitHub links were shown as generic labels in the PDF text extraction (no href captured). Need the actual URLs before the agent can wire up the nav/social icons and project cards(i will give it later.. don't worry about this)
3. **Phone number on a public site** — recommend omitting it from the live Contact section (keep it on the PDF resume only) to reduce spam/scraping; confirm you're OK with that.(yes)
4. **Two-resume hosting decision** (§10) — confirm the "ML/DS resume is the default CTA, Quant resume lives inside the Quant tab" approach, or state a preference.(yes)
5. Optional: whether to include a "Current Research" teaser section for in-progress work (image compression, deepfake detection, urban segmentation) not yet on either resume.(yes include it )

## 14. Build Milestones

| Phase | Scope |
|---|---|
| 1 — Scaffold | Next.js + Tailwind + Framer Motion setup, design tokens (colors, fonts, spacing), theme toggle, folder structure from §12 |
| 2 — Static content | Hero, About, Experience, Skills, Certifications with real copy from §8, no animation polish yet |
| 3 — Projects & Research | Tabbed project grid + modals, Research section, data-driven content files |
| 4 — Interactions | Scroll-spy nav, scroll-reveal animation, tab cross-fade, typewriter hero, reduced-motion handling |
| 5 — Contact & polish | Contact form wiring (Formspree/EmailJS), OG tags/SEO, accessibility pass, Lighthouse pass, resolve §13 open items, deploy to Vercel |

## 15. Success Metrics (informal, personal site)

- Loads in < 2s on a typical connection; Lighthouse ≥ 90.
- A recruiter can identify "what he does" and reach a live demo or GitHub link within one scroll of landing.
- Quant-specific visitors can find that work within one click, without it competing with the ML-engineer framing on first load.

