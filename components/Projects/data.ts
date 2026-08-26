export interface Project {
  id: string;
  title: string;
  category: "ai-ml" | "quant";
  subtitle: string;
  summary: string;
  metrics: { label: string; value: string; detail?: string }[];
  techStack: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  featured: boolean;
  problemStatement: string;
  solutionArchitecture: string[];
  keyResults: string[];
  architectureDiagramSvg?: string;
  tags: string[];
}

export const PROJECTS_DATA: Project[] = [
  // ===================== AI / ML / MLOps Track =====================
  {
    id: "mlops-fraud-drift",
    title: "Real-Time MLOps Fraud Detection & Drift Monitoring",
    category: "ai-ml",
    subtitle: "Closed-loop production ML with drift detection, automated retraining gate & hot-reloading",
    summary:
      "A complete production MLOps pipeline serving real-time fraud predictions on heavily imbalanced transactions (~0.17% positive rate). Features automated Evidently AI drift triggers, MLflow challenger-vs-incumbent promotion gates, and FastAPI zero-downtime hot reloading.",
    metrics: [
      { label: "Test PR-AUC", value: "0.77", detail: "On ~0.17% positive minority class" },
      { label: "Precision", value: "0.87", detail: "High-confidence positive calls" },
      { label: "Recall", value: "0.75", detail: "Catching 75% of fraudulent attempts" },
      { label: "Latency", value: "<15ms", detail: "P99 asynchronous FastAPI serving" },
    ],
    techStack: ["MLflow", "FastAPI", "Evidently AI", "Docker Compose", "scikit-learn", "GitHub Actions", "pytest"],
    githubUrl: "https://github.com/Abhi241-bot",
    liveDemoUrl: "https://github.com/Abhi241-bot",
    featured: true,
    problemStatement:
      "In extreme-imbalance fraud datasets (~0.17% positive instances), naive accuracy is meaningless, and models rapidly degrade under distributional shift. Standard retraining pipelines either over-react to noise or introduce untested weights directly to production.",
    solutionArchitecture: [
      "Addressed class imbalance using cost-sensitive scale_pos_weight optimization instead of synthetic oversampling artifacts.",
      "Evidently AI continuously monitors incoming inference payloads for Kolmogorov-Smirnov feature drift and Wasserstein distance shifts.",
      "Drift triggers an automated retraining pipeline registered in MLflow.",
      "MLflow registry promotion gate strictly evaluates the challenger model against the incumbent on identical recent holdout data before promotion.",
      "FastAPI microservice hot-reloads the new artifact dynamically without killing active client connections.",
      "Fully containerized with Docker Compose; end-to-end linting and unit testing via GitHub Actions CI.",
    ],
    keyResults: [
      "Achieved PR-AUC 0.77 (Precision 0.87 / Recall 0.75) on realistic 0.17% fraud prevalence.",
      "Zero downtime during model promotion; automated drift alerts catch covariate shift before business degradation occurs.",
      "100% reproducible execution via docker compose up with ruff and pytest CI validation.",
    ],
    tags: ["MLOps", "Fraud Detection", "Drift Monitoring", "FastAPI", "MLflow", "Docker"],
  },
  {
    id: "multi-agent-financial-analyst",
    title: "Multi-Agent Financial Analyst with Fine-Tuned SQL Tool",
    category: "ai-ml",
    subtitle: "Autonomous LangGraph multi-agent system with QLoRA fine-tuned SQL tool & RAGAS evals",
    summary:
      "An autonomous multi-agent financial research system built on LangGraph (planner → researcher → analyst). Routes across real SEC EDGAR 10-K filings, web search, and a custom QLoRA fine-tuned Text-to-SQL tool with human-in-the-loop checkpoints and DeepEval/RAGAS evaluation suites.",
    metrics: [
      { label: "SQL Accuracy", value: "54.5%", detail: "+11% relative boost via 4-bit QLoRA" },
      { label: "Dev Queries", value: "200", detail: "Held-out Spider benchmark test set" },
      { label: "Faithfulness", value: "0.91", detail: "RAGAS hallucination defense score" },
      { label: "Guardrails", value: "100%", detail: "Prompt injection & PII intercept" },
    ],
    techStack: ["LangGraph", "QLoRA (4-bit)", "Spider Dataset", "RAGAS", "DeepEval", "LangSmith", "ChromaDB", "SEC EDGAR"],
    githubUrl: "https://github.com/Abhi241-bot",
    liveDemoUrl: "https://github.com/Abhi241-bot",
    featured: true,
    problemStatement:
      "Generic LLM financial pipelines suffer from hallucinations, brittle Text-to-SQL queries on complex database schemas, lack of grounding in official 10-K filings, and vulnerability to prompt injection attacks.",
    solutionArchitecture: [
      "Architected a cyclical LangGraph state machine separating planning, document retrieval, SQL synthesis, and report compilation into specialized agents.",
      "Fine-tuned a 4-bit quantized Text-to-SQL model with LoRA (r=16, alpha=32) on Spider, improving execution accuracy from 49.0% to 54.5% on 200 held-out queries.",
      "Integrated vector retrieval with ChromaDB over SEC EDGAR 10-K filings with metadata filtering and citation tracking.",
      "Implemented comprehensive input/output safety guardrails: prompt-injection defense, regex PII masking, and read-only SQL enforcement.",
      "Embedded human-in-the-loop approval checkpoints before executing high-impact analytical actions.",
      "Instrumented end-to-end observability via LangSmith tracing and quantitative benchmarking using RAGAS and DeepEval.",
    ],
    keyResults: [
      "11% relative increase in Text-to-SQL execution accuracy via domain-targeted QLoRA fine-tuning.",
      "Produces fully cited financial teardowns grounded in SEC filings with verified source citations.",
      "Enterprise-grade safety harness with automated tracing and regression testing.",
    ],
    tags: ["Agentic AI", "LangGraph", "QLoRA", "Text-to-SQL", "RAGAS", "SEC EDGAR"],
  },
  {
    id: "causal-inference-ab-platform",
    title: "Causal Inference & A/B Experimentation Platform",
    category: "ai-ml",
    subtitle: "Self-serve experimentation platform with CUPED variance reduction & causal estimators",
    summary:
      "A self-serve causal inference and experimentation analytics platform for evaluating product features and policy changes under confounding. Implements CUPED variance reduction, Propensity Score Matching (PSM), Difference-in-Differences (DiD), and causal forests with simulated ground-truth verification.",
    metrics: [
      { label: "Bias Correction", value: "5x", detail: "Overstatement corrected (11.0 -> 1.6)" },
      { label: "Variance Reduction", value: "35-50%", detail: "Via CUPED pre-experiment covariates" },
      { label: "Statistical Checks", value: "100%", detail: "Automated Power & SRM diagnostics" },
      { label: "Verdict Output", value: "Automated", detail: "Plain-English ship/don't-ship decision" },
    ],
    techStack: ["DoWhy", "EconML", "statsmodels", "Streamlit", "scikit-learn", "NumPy", "pandas"],
    githubUrl: "https://github.com/Abhi241-bot",
    liveDemoUrl: "https://github.com/Abhi241-bot",
    featured: true,
    problemStatement:
      "Standard A/B testing frameworks fail when treatment assignment is confounded or when sample sizes require weeks of runtime. Naive estimators frequently overstate business impact by orders of magnitude.",
    solutionArchitecture: [
      "Engineered automated pre-experiment diagnostics including Sample Ratio Mismatch (SRM) chi-squared tests and statistical power calculations.",
      "Integrated CUPED (Controlled-experiment Using Pre-Experiment Data) variance reduction, shrinking required sample sizes and accelerating test velocity by up to 50%.",
      "Implemented causal estimators (Propensity Score Matching, Difference-in-Differences, Causal Forests) via DoWhy and EconML.",
      "Validated all estimators against simulated confounded ground-truth scenarios with known counterfactual effects.",
      "Built an intuitive Streamlit self-serve interface generating automated, plain-English ship / don't-ship recommendations.",
    ],
    keyResults: [
      "Demonstrated 5x bias correction on confounded observational data (naive A/B estimated 11.0 vs true 2.0; PSM recovered 1.6).",
      "35–50% reduction in experimental metric variance via CUPED.",
      "Full unit test suite validating mathematical correctness against analytical benchmarks.",
    ],
    tags: ["Causal Inference", "A/B Testing", "CUPED", "DoWhy", "EconML", "Streamlit"],
  },

  // ===================== Quantitative Finance Track =====================
  {
    id: "statarb-pairs-trading",
    title: "Statistical Arbitrage / Pairs Trading (NSE Equities)",
    category: "quant",
    subtitle: "Cost-aware cointegration pairs strategy on TCS/INFY with walk-forward & Kalman filter diagnostics",
    summary:
      "An econometric pairs trading engine on NSE equity pairs (TCS / INFY). Features Engle-Granger cointegration with Bonferroni correction, train-only hedge ratio estimation, rolling Kalman filter time-varying hedge ratios, and 9-fold walk-forward validation with full cost sensitivity analysis.",
    metrics: [
      { label: "Cointegration p-value", value: "p = 0.0002", detail: "Bonferroni-cleared & ADF confirmed" },
      { label: "In-Sample Sharpe", value: "0.97", detail: "Annualized train period" },
      { label: "Walk-Forward Folds", value: "9-Fold", detail: "Strict chronological walk-forward" },
      { label: "Pytest Invariants", value: "27 Tests", detail: "Zero look-ahead bias enforced" },
    ],
    techStack: ["Python", "statsmodels", "SciPy", "pandas", "NumPy", "pytest"],
    githubUrl: "https://github.com/Abhi241-bot/Quantfin1",
    liveDemoUrl: "https://github.com/Abhi241-bot/Quantfin1",
    featured: true,
    problemStatement:
      "Many quantitative backtests present inflated in-sample Sharpe ratios that collapse in real execution due to non-stationarity of hedge ratios, look-ahead bias, and ignored friction costs.",
    solutionArchitecture: [
      "Selected TCS/INFY via Engle-Granger two-step cointegration (p = 0.0002) with Johansen and Augmented Dickey-Fuller (ADF) confirmation.",
      "Strictly estimated spread parameters and hedge ratios on training data only with mandatory one-bar signal execution lag and 25bps round-trip transaction costs.",
      "Diagnosed out-of-sample decay (in-sample Sharpe 0.97 → -0.72 OOS) through rolling cointegration and dynamic Kalman filter time-varying hedge ratios.",
      "Conducted a cost-sensitivity sweep from 0bps to 50bps, proving that OOS decay was a fundamental signal breakdown rather than a transaction cost artifact.",
      "Enforced mathematical and look-ahead invariants through an automated 27-test pytest suite.",
    ],
    keyResults: [
      "Demonstrated why statistical significance in-sample does not guarantee out-of-sample tradability.",
      "Identified regime shifts in co-integrating vectors using dynamic Kalman state-space models.",
      "Rigorous look-ahead invariant testing preventing forward-leakage in backtesting engines.",
    ],
    tags: ["Statistical Arbitrage", "Pairs Trading", "Kalman Filter", "Cointegration", "NSE Equities", "pytest"],
  },
  {
    id: "options-pricing-iv-surface",
    title: "Options Pricing & Implied Volatility Surface",
    category: "quant",
    subtitle: "Three-way analytical agreement proof, real SPY IV surface inversion & delta-hedging simulation",
    summary:
      "A quantitative derivatives pricing engine implementing Black-Scholes-Merton (with analytical Greeks), Cox-Ross-Rubinstein (CRR) binomial trees, and Monte Carlo simulation with three-way numerical agreement proof. Backs out real SPY implied volatility surfaces via Brent root-finding and simulates discrete delta hedging under friction.",
    metrics: [
      { label: "Pricing Models", value: "3 Models", detail: "BSM, CRR Binomial, Monte Carlo" },
      { label: "SPY IV Skew", value: "+9.6% -> +5.1%", detail: "Downward equity skew 7d to 88d" },
      { label: "Delta Hedging Error", value: "1 / √n", detail: "Matches Boyle-Emanuel scaling" },
      { label: "Validation", value: "Put-Call Parity", detail: "Finite-difference Greeks verified" },
    ],
    techStack: ["Python", "SciPy", "NumPy", "Matplotlib", "SPY Options Data"],
    githubUrl: "https://github.com/Abhi241-bot/Quantfin2",
    liveDemoUrl: "https://github.com/Abhi241-bot/Quantfin2",
    featured: true,
    problemStatement:
      "Theoretical option models assume constant volatility and continuous frictionless rebalancing, while real markets display pronounced volatility smiles/skews and discrete hedging friction.",
    solutionArchitecture: [
      "Implemented analytical Black-Scholes (with Delta, Gamma, Vega, Theta, Rho), multi-step CRR binomial lattice, and vectorized Monte Carlo pricers.",
      "Established three-way numerical agreement within Monte Carlo standard error as formal correctness proof.",
      "Inverted real SPY option chains using Brent's root-finding method to reconstruct empirical implied volatility smiles and term structures.",
      "Documented equity volatility skew (+9.6% at 7-day expiry decaying to +5.1% at 88-day expiry).",
      "Simulated discrete delta hedging over geometric Brownian motion paths, demonstrating that tracking error standard deviation decays at rate 1/√n and quantifying negative drag under proportional transaction costs.",
    ],
    keyResults: [
      "Rigorous numerical proof of theoretical option pricing convergence.",
      "Reconstruction of live market implied volatility surfaces.",
      "Empirical demonstration of Black-Scholes price as the cost of dynamic replication under friction.",
    ],
    tags: ["Options Pricing", "Black-Scholes", "Implied Volatility", "Monte Carlo", "Delta Hedging", "SciPy"],
  },
  {
    id: "multi-factor-long-short",
    title: "Multi-Factor Long-Short Equity Strategy (Nifty 100)",
    category: "quant",
    subtitle: "Point-in-time cross-sectional factor ranking, turnover costs & beta-hedging alpha teardown",
    summary:
      "A quantitative multi-factor long-short equity strategy on the Nifty 100 universe. Synthesizes momentum, low-volatility, and value factors into cross-sectional z-scores, executing monthly dollar-neutral rebalancing with full turnover costs, point-in-time beta hedging, and survivorship bias disclosure.",
    metrics: [
      { label: "Static Alpha", value: "+3.1%", detail: "Apparent unhedged headline return" },
      { label: "Beta-Hedged Alpha", value: "+0.7%", detail: "True net alpha after market neutralization" },
      { label: "Factor Dimensions", value: "3 Factors", detail: "Momentum, Low-Vol, Value" },
      { label: "Signal Lag", value: "1-Period", detail: "No forward-looking information leak" },
    ],
    techStack: ["Python", "pandas", "NumPy", "statsmodels", "SciPy", "Nifty 100"],
    githubUrl: "https://github.com/Abhi241-bot/Quantfin3",
    liveDemoUrl: "https://github.com/Abhi241-bot/Quantfin3",
    featured: true,
    problemStatement:
      "Factor backtests frequently hide market beta exposure, assume zero execution slippage, and succumb to survivorship bias, generating illusory alpha claims.",
    solutionArchitecture: [
      "Constructed momentum (12-1m), low-volatility (rolling daily return std), and value factor signals normalized into cross-sectional z-scores.",
      "Constructed a dollar-neutral long-short portfolio rebalanced monthly with explicit turnover-based transaction costs and one-period signal execution lag.",
      "Conducted rigorous performance attribution: demonstrated that an apparent +3.1% static alpha collapsed to +0.7% once point-in-time market beta exposure was stripped.",
      "Transparently disclosed survivorship bias and fundamental data latency constraints.",
      "Executed Information Coefficient (IC) decay analysis and per-factor return decomposition.",
    ],
    keyResults: [
      "Honest, unembellished factor attribution separating true idiosyncratic alpha from latent market beta.",
      "Comprehensive Information Coefficient (IC) decay profiling.",
      "Transparent methodological documentation of market frictions and survivorship bias.",
    ],
    tags: ["Factor Investing", "Long-Short Equity", "Nifty 100", "Risk Attribution", "Beta Hedging", "pandas"],
  },
];
