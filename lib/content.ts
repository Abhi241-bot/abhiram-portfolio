export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  type: "Research" | "Production AI" | "Analytics" | "Internship";
  highlight: string;
  bullets: string[];
  techStack: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  location: string;
  period: string;
  gpa: string;
  academicScores: { label: string; score: string }[];
  coursework: string[];
}

export interface ResearchPaper {
  id: string;
  title: string;
  status: string;
  authorship: string;
  domain: "Multimodal AI" | "Quantitative Econometrics" | "Derivatives Pricing";
  abstract: string;
  keyContributions: string[];
  metrics: { label: string; value: string }[];
  tags: string[];
}

export interface InProgressResearch {
  title: string;
  institution: string;
  description: string;
  focusArea: string;
  tags: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  iconName: string;
  shortDesc: string;
  fullDesc: string;
  capabilities: string[];
  badge: string;
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: { name: string; level?: string; icon?: string; highlighted?: boolean }[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  badgeText?: string;
  year?: string;
  highlight?: boolean;
}

export const PROFILE = {
  name: "Abhiram Boini",
  firstName: "Abhiram",
  lastName: "Boini",
  location: "Hyderabad, India",
  affiliation: "IIIT Naya Raipur",
  email: "abhiram04122006@gmail.com",
  roles: [
    "Data Science & AI Engineer",
    "Applied ML Researcher",
    "Quantitative Researcher",
  ],
  tagline:
    "I build production ML systems — from a deployed government AI pipeline to agentic LLM tools — and run independent quantitative-finance research on the side.",
  socials: {
    github: "https://github.com/Abhi241-bot",
    linkedin: "https://www.linkedin.com/in/abhiram-boini",
    kaggle: "https://www.kaggle.com/abhiramboini",
    email: "mailto:abhiram04122006@gmail.com",
  },
  resumes: {
    ml: "/resumes/Abhiram_Boini_ML_Resume.pdf",
    quant: "/resumes/Abhiram_Boini_Quant_Resume.pdf",
  },
  bio: `I'm a Data Science & AI undergraduate at IIIT Naya Raipur (CGPA 8.70/10.0), currently conducting research on multi-modal urban semantic segmentation at IIT (BHU) Varanasi. Over the past year I've shipped a production voice-logging AI system for the Chhattisgarh Forest Department, built three end-to-end ML systems spanning MLOps, causal inference, and multi-agent LLM tooling, and written independent research on option pricing and cross-asset market stress. I care about rigor: honest reporting of negative results, proper out-of-sample validation, and statistical significance testing show up throughout my work.`,
};

export const EDUCATION: EducationItem = {
  institution: "International Institute of Information Technology, Naya Raipur (IIIT-NR)",
  degree: "B.Tech in Data Science and Artificial Intelligence",
  location: "Naya Raipur, India",
  period: "2024 – Expected Apr 2028",
  gpa: "CGPA 8.70 / 10.0 (Sem 5)",
  academicScores: [
    { label: "CGPA", score: "8.70 / 10.0" },
    { label: "JEE Main", score: "97.7 percentile" },
    { label: "Class XII", score: "96.9%" },
    { label: "Class X", score: "95.6%" },
  ],
  coursework: [
    "Deep Learning & Neural Architectures",
    "Statistical Machine Learning & Pattern Recognition",
    "Data Structures & Algorithmic Complexity",
    "Time Series Econometrics & Stochastic Calculus",
    "Database Management Systems & Distributed SQL",
    "Operating Systems & Linux Kernel Computing",
    "Probability, Linear Algebra & Multivariate Statistics",
    "Reinforcement Learning & Multi-Agent Systems",
  ],
};

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "iit-bhu",
    role: "Research Intern",
    organization: "Indian Institute of Technology (BHU)",
    location: "Varanasi, India",
    period: "May 2026 – July 2026",
    type: "Research",
    highlight: "Urban morphology via multi-modal optical + SAR satellite imagery segmentation",
    bullets: [
      "Researched urban morphology across India’s Tier-II cities via multi-modal semantic segmentation of high-resolution satellite imagery.",
      "Engineered deep learning segmentation architectures to classify urban land-use, building footprints, road networks, and green canopy cover.",
      "Applied multi-modal fusion of optical and Synthetic Aperture Radar (SAR) data to overcome cloud-cover degradation and boost segmentation accuracy across heterogeneous urban topographies.",
    ],
    techStack: ["PyTorch", "SAR Satellite Data", "Optical Remote Sensing", "CNNs", "Semantic Segmentation", "QGIS"],
  },
  {
    id: "cg-forest",
    role: "AI/ML Engineer",
    organization: "Department of Forests, Chhattisgarh Government",
    location: "Raipur, India",
    period: "Dec 2025 – March 2026",
    type: "Production AI",
    highlight: "Built and deployed in-production Hindi voice-based AI animal-health logging system",
    bullets: [
      "Architected and deployed to live production a Hindi voice-based animal-health logging system for a government zoo, enabling non-literate zookeepers to record critical health observations by natural speech.",
      "Integrated Deepgram ASR for robust regional Hindi speech-to-text and Google Gemini LLM for real-time automated summarization and structured medical record extraction.",
      "Engineered the complete production pipeline (audio ingestion → streaming ASR → LLM parser → relational database) with role-based access for inventory, prescription tracking, and veterinary interventions.",
    ],
    techStack: ["Deepgram ASR", "Google Gemini", "FastAPI", "PostgreSQL", "Docker", "Prompt Engineering"],
  },
  {
    id: "rit-ny",
    role: "AI Data Analyst (Remote)",
    organization: "Rochester Institute of Technology",
    location: "New York, USA",
    period: "Dec 2025 – Jan 2026",
    type: "Analytics",
    highlight: "Student-engagement modeling & retention analytics on imbalanced event datasets",
    bullets: [
      "Modeled student engagement and drop-off behavior on a heavily imbalanced retention dataset; addressed low event base rate using cost-sensitive class weighting.",
      "Prioritized precision-recall curves and PR-AUC over deceptive accuracy metrics to surface the highest-risk 10% cohort for proactive advisor intervention.",
      "Constructed interactive executive Tableau dashboards translating predictive risk scores into concrete retention action plans for program leadership.",
    ],
    techStack: ["Python", "scikit-learn", "Tableau", "Imbalanced Data", "PR-AUC", "Statistical Modeling"],
  },
  {
    id: "infosys-springboard",
    role: "AI/ML Engineer Intern (Remote)",
    organization: "Infosys Springboard",
    location: "Remote",
    period: "Oct 2025 – Dec 2025",
    type: "Internship",
    highlight: "SmileAgeAI — real-time privacy-first facial attribute estimation pipeline",
    bullets: [
      "Built SmileAgeAI, a privacy-first real-time facial-attribute estimation application (smile classification + age regression) executing over live webcam feeds and image uploads.",
      "Designed custom CNN models achieving a Smile F1-score of 0.87 and Age MAE of 5.55 years.",
      "Optimized inference throughput by 40% via a cascaded Haar-cascade face alignment and CLAHE contrast enhancement pre-processing pipeline.",
    ],
    techStack: ["TensorFlow", "Keras", "OpenCV", "Haar Cascades", "CLAHE", "Streamlit"],
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: "mlops",
    title: "Production ML & MLOps Pipelines",
    iconName: "Cpu",
    badge: "Production Ready",
    shortDesc: "End-to-end model serving, automated drift detection, challenger-incumbent promotion gates, and containerized deployment.",
    fullDesc: "Specializing in closing the loop between training and serving. Building containerized microservices that monitor feature and concept drift, trigger automated retraining on verified benchmarks, and hot-reload updated weights with zero downtime.",
    capabilities: [
      "MLflow Model Registry & Promotion Gates",
      "Evidently AI Concept & Data Drift Detection",
      "FastAPI Asynchronous Real-Time Serving",
      "Docker Compose Containerization & CI/CD",
    ],
  },
  {
    id: "llm-agents",
    title: "Autonomous LLM Agents & Tooling",
    iconName: "Bot",
    badge: "Agentic AI",
    shortDesc: "Multi-agent systems with planner-researcher-analyst workflows, QLoRA fine-tuned tools, and rigorous evaluation harnesses.",
    fullDesc: "Designing robust LLM agents that decompose complex queries into tool calls across financial databases, live SEC EDGAR filings, and text-to-SQL engines, equipped with human-in-the-loop validation and prompt injection defenses.",
    capabilities: [
      "LangGraph Directed Acyclic Agent Graphs",
      "QLoRA / PEFT 4-Bit Parameter-Efficient Fine-Tuning",
      "RAGAS & DeepEval Quantitative Benchmarks",
      "LangSmith Observability & Tracing",
    ],
  },
  {
    id: "quant-finance",
    title: "Quantitative Finance & StatArb",
    iconName: "TrendingUp",
    badge: "Quant Research",
    shortDesc: "Econometric cointegration trading, options implied volatility surfaces, multi-factor risk attribution, and stress indexes.",
    fullDesc: "Developing quantitative trading strategies and derivative pricing engines with strict out-of-sample walk-forward validation, bootstrap confidence bounds, and full cost-sensitivity transparency.",
    capabilities: [
      "Statistical Arbitrage & Kalman Filter Hedge Ratios",
      "Black-Scholes, Binomial Tree, Merton & Heston Pricers",
      "Cross-Asset Stress Flow Network Modeling (SFI)",
      "Multi-Factor Long-Short Portfolio Construction",
    ],
  },
  {
    id: "computer-vision",
    title: "Computer Vision & Multimodal AI",
    iconName: "Eye",
    badge: "Deep Learning",
    shortDesc: "Multi-modal satellite imagery segmentation, audio-visual affective computing, and real-time attribute classification.",
    fullDesc: "Engineering neural network architectures combining 3D-CNNs, optical+SAR satellite fusion, and facial-acoustic cue gating for high-stakes visual analytics.",
    capabilities: [
      "Satellite Optical + SAR Remote Sensing Fusion",
      "3D-CNN & EfficientNet Hybrid Architectures",
      "MediaPipe Alignment & Facial Landmark Extraction",
      "CLAHE Preprocessing & Real-Time Inference Optimization",
    ],
  },
  {
    id: "causal-inference",
    title: "Causal Inference & Experimentation",
    iconName: "GitBranch",
    badge: "Scientific Rigor",
    shortDesc: "A/B testing diagnostics, CUPED variance reduction, propensity score matching, and difference-in-differences estimators.",
    fullDesc: "Implementing self-serve experimentation tools that protect product teams against confounded data, sample ratio mismatches, and false discoveries with plain-English ship/don't-ship recommendations.",
    capabilities: [
      "CUPED Variance Reduction Techniques",
      "DoWhy & EconML Causal Graphs",
      "Propensity Score Matching (PSM) & DiD",
      "Statistical Power Analysis & SRM Detection",
    ],
  },
  {
    id: "cloud-devops",
    title: "Cloud Infrastructure & Testing",
    iconName: "Layers",
    badge: "Cloud Certified",
    shortDesc: "Robust automated test suites, containerized cloud infrastructure, and reproducible data science pipelines.",
    fullDesc: "Practicing rigorous engineering standards across all projects: automated pytest test suites covering edge cases and look-ahead invariants, containerized runtime parity, and automated GitHub Actions verification.",
    capabilities: [
      "Oracle Cloud & GCP Architecture Best Practices",
      "Pytest Suites with Look-Ahead Invariant Testing",
      "GitHub Actions Automated CI/CD Pipelines",
      "Clean Code, Type Safety & Ruff Linting",
    ],
  },
];

export const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    id: "multimodal-stress",
    title: "Multimodal Stress Detection using Deep Learning",
    status: "IEEE Conference Paper, In Progress",
    authorship: "Primary Author",
    domain: "Multimodal AI",
    abstract:
      "A non-intrusive multimodal stress-detection architecture combining facial-visual landmarks and acoustic-speech representations. Employs a hybrid 3D-CNN + EfficientNet backbone with Action-Unit gating to dynamically fuse temporal video dynamics and acoustic spectral features.",
    keyContributions: [
      "Achieved 94.7% classification accuracy, representing a 7.4% absolute gain over the 87.3% unimodal baseline.",
      "Engineered automated preprocessing pipeline combining MediaPipe facial alignment and Voice Activity Detection (VAD), driving a 38% reduction in error rate.",
      "Validated generalization across diverse emotional intensity levels with cross-corpus validation.",
    ],
    metrics: [
      { label: "Accuracy", value: "94.7%" },
      { label: "Baseline Gain", value: "+7.4%" },
      { label: "Error Reduction", value: "38%" },
    ],
    tags: ["PyTorch", "3D-CNN", "EfficientNet", "MediaPipe", "Audio-Visual Fusion", "IEEE"],
  },
  {
    id: "stress-flow-index",
    title: "Cross-Asset Stress-Flow Index for Early Warning of Market Drawdowns",
    status: "Sole-Author Working Paper (In Preparation)",
    authorship: "Sole Author",
    domain: "Quantitative Econometrics",
    abstract:
      "Formulated the Stress Flow Index (SFI), a closed-form, parameter-free network statistic aggregating directed, correlation-weighted stress propagation across a 21-asset global cross-class panel (equities, emerging markets, commodities, FX, sovereign rates, and credit spreads spanning 2000–2024).",
    keyContributions: [
      "Walk-forward out-of-sample validation demonstrates that SFI leads an asset's own realized volatility ahead of idiosyncratic drawdowns in 64% of 145 historical episodes (p = 0.002 via stationary block-bootstrap).",
      "Benchmarked against Diebold-Yilmaz connectedness and Billio et al. Granger-causality networks; demonstrated near-orthogonality (|ρ| ≤ 0.16) and statistically significant incremental predictive power (likelihood ratio test p = 0.03).",
      "Preserves computational tractability with zero numerical estimation instability.",
    ],
    metrics: [
      { label: "Lead Rate", value: "64% of 145 drawdowns" },
      { label: "Bootstrap p-value", value: "p = 0.002" },
      { label: "DY Orthogonality", value: "|ρ| ≤ 0.16" },
    ],
    tags: ["Network Econometrics", "Cross-Asset Panel", "Block Bootstrap", "Diebold-Yilmaz", "Drawdown Warning"],
  },
  {
    id: "options-jumps-vol",
    title: "Jumps vs. Stochastic Volatility: Out-of-Sample Option-Pricing Comparison on NSE Nifty 50 Options",
    status: "Sole-Author Working Paper (In Preparation)",
    authorship: "Sole Author",
    domain: "Derivatives Pricing",
    abstract:
      "A head-to-head empirical evaluation of four option-pricing formulations implemented from first principles (Black-Scholes-Merton, Cox-Ross-Rubinstein binomial tree, Merton jump-diffusion, and Heston stochastic volatility with Little-Heston-Trap characteristic functions and Gauss-Legendre quadrature) calibrated on 115,709 NSE Nifty 50 option contracts across pre-COVID, COVID crash, and recovery regimes.",
    keyContributions: [
      "Avoided circular implied-volatility logic by pricing strictly with trailing realized volatility and evaluating directly against traded closing quotes.",
      "Identified distinct regime dependencies: Heston stochastic volatility minimizes pricing RMSE during calm regimes (40.4% and 18.2% reduction vs. BSM), while Merton jump-diffusion dominates the COVID shock regime (27.7% reduction), all confirmed at p < 0.001 via Diebold-Mariano testing.",
      "Utilized exact analytical BSM-CRR convergence as an automated numerical integrity control.",
    ],
    metrics: [
      { label: "Dataset Records", value: "115,709 quotes" },
      { label: "Heston Calm RMSE Gain", value: "40.4% reduction" },
      { label: "Merton Shock RMSE Gain", value: "27.7% reduction" },
    ],
    tags: ["Option Pricing", "Heston Model", "Merton Jump-Diffusion", "Diebold-Mariano", "NSE Nifty 50"],
  },
];

export const IN_PROGRESS_RESEARCH: InProgressResearch[] = [
  {
    title: "Multi-Modal Urban Satellite Semantic Segmentation",
    institution: "IIT (BHU) Varanasi",
    description: "Developing cross-attention deep learning architectures fusing optical spectral bands with Synthetic Aperture Radar (SAR) backscatter to map Tier-II Indian urban morphology, impervious surface expansion, and green cover dynamics.",
    focusArea: "Remote Sensing & Geospatial AI",
    tags: ["Optical + SAR Fusion", "U-Net / SegFormer", "Tier-II Cities", "Geospatial AI"],
  },
  {
    title: "SVD & Neural Hybrid Image Compression",
    institution: "IIIT Naya Raipur",
    description: "Exploring hybrid low-rank singular value decomposition coupled with lightweight convolutional autoencoders for high-efficiency image compression under constrained edge bandwidth.",
    focusArea: "Signal Processing & Deep Compression",
    tags: ["Matrix Decomposition", "Autoencoders", "Edge AI", "Low-Rank SVD"],
  },
  {
    title: "Multimodal Deepfake Detection via Frequency & Audio-Visual Discrepancy",
    institution: "Independent Research",
    description: "Investigating spatial frequency artifacts and lip-sync temporal desynchronization in synthesized talking-head media using bispectral analysis and transformer attention.",
    focusArea: "Media Forensics & AI Safety",
    tags: ["Deepfake Forensics", "Bispectral Analysis", "Cross-Modal Attention", "AI Safety"],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Languages",
    description: "Core programming languages for ML, data engineering, and systems development",
    skills: [
      { name: "Python", level: "Expert", highlighted: true },
      { name: "SQL (PostgreSQL/DuckDB)", level: "Advanced", highlighted: true },
      { name: "R", level: "Intermediate" },
      { name: "C++", level: "Intermediate" },
      { name: "Java", level: "Intermediate" },
      { name: "MATLAB", level: "Intermediate" },
    ],
  },
  {
    category: "Machine Learning & Deep Learning",
    description: "Neural network architectures, training frameworks, and optimization libraries",
    skills: [
      { name: "PyTorch", level: "Expert", highlighted: true },
      { name: "TensorFlow / Keras", level: "Advanced" },
      { name: "scikit-learn", level: "Expert", highlighted: true },
      { name: "XGBoost / LightGBM", level: "Advanced" },
      { name: "CNNs & Vision Models", level: "Advanced" },
      { name: "LoRA / QLoRA / PEFT", level: "Advanced", highlighted: true },
    ],
  },
  {
    category: "LLM & Agentic AI",
    description: "Multi-agent frameworks, retrieval-augmented generation, and automated evaluations",
    skills: [
      { name: "LangGraph", level: "Advanced", highlighted: true },
      { name: "RAG & Vector DBs (Chroma)", level: "Advanced" },
      { name: "RAGAS & DeepEval", level: "Advanced", highlighted: true },
      { name: "LangSmith Tracing", level: "Advanced" },
      { name: "Prompt Engineering", level: "Expert" },
      { name: "Guardrails & Checkpoints", level: "Advanced" },
    ],
  },
  {
    category: "MLOps & Serving",
    description: "Production model deployment, lifecycle registry, drift monitoring, and CI/CD",
    skills: [
      { name: "MLflow Registry", level: "Advanced", highlighted: true },
      { name: "FastAPI Async Serving", level: "Advanced", highlighted: true },
      { name: "Docker & Docker Compose", level: "Advanced", highlighted: true },
      { name: "Evidently AI Monitoring", level: "Advanced" },
      { name: "GitHub Actions CI/CD", level: "Advanced" },
      { name: "Model Retraining Loops", level: "Advanced" },
    ],
  },
  {
    category: "Quantitative Finance & Statistics",
    description: "Time series econometrics, derivative pricing, statistical testing, and factor models",
    skills: [
      { name: "Options Pricing (BSM/CRR/MC/Heston)", level: "Expert", highlighted: true },
      { name: "Greeks & IV Surface", level: "Expert", highlighted: true },
      { name: "Cointegration & Kalman Filtering", level: "Advanced", highlighted: true },
      { name: "Factor Models & Long-Short", level: "Advanced" },
      { name: "Diebold-Mariano & Bootstrap", level: "Advanced" },
      { name: "Causal Inference (DoWhy/EconML)", level: "Advanced" },
    ],
  },
  {
    category: "Tools & Frameworks",
    description: "Development environments, dashboarding, testing tools, and data platforms",
    skills: [
      { name: "Git & GitHub", level: "Expert" },
      { name: "Linux Shell Scripting", level: "Advanced" },
      { name: "Streamlit & Gradio", level: "Advanced" },
      { name: "Tableau", level: "Advanced" },
      { name: "pytest Suite Testing", level: "Advanced", highlighted: true },
      { name: "Hugging Face Hub", level: "Advanced" },
    ],
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    title: "Kaggle Expert",
    issuer: "Kaggle (Notebooks & Datasets)",
    badgeText: "Kaggle Expert",
    highlight: true,
  },
  {
    title: "IBM Data Science Professional Certificate",
    issuer: "IBM",
    badgeText: "Professional Certificate",
    highlight: true,
  },
  {
    title: "Oracle Cloud Infrastructure 2025 Data Science Professional",
    issuer: "Oracle",
    badgeText: "OCI Certified 2025",
    highlight: true,
  },
  {
    title: "Google Gen AI Academy 2.0",
    issuer: "Google Cloud",
    badgeText: "Generative AI",
    highlight: true,
  },
  {
    title: "Intel AI Fundamentals",
    issuer: "Intel",
    badgeText: "AI Fundamentals",
    highlight: false,
  },
  {
    title: "JEE Main — 97.7 Percentile",
    issuer: "National Testing Agency",
    badgeText: "Top 2.3% Nationwide",
    highlight: true,
  },
];
