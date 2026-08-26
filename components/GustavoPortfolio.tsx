"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface ProjectItem {
  id: string;
  titleKey: string;
  titleEng: string;
  titlePt: string;
  descriptions: string[];
  descEng: string;
  descPt: string;
  fullDescEng: string;
  fullDescPt: string;
  tags: string[];
  githubUrl: string;
  demoUrl?: string;
  video?: string;
}

const PROJECTS_LIST: ProjectItem[] = [
  {
    id: "proj-1",
    titleKey: "PROJECT-1",
    titleEng: "Real-Time MLOps Fraud Detection & Drift Monitoring",
    titlePt: "Detecção de Fraude em Tempo Real com MLOps",
    descriptions: ["FastAPI", "MLflow", "Docker", "Evidently AI", "pytest", "CI/CD"],
    descEng: "End-to-end production ML system serving real-time fraud predictions at test PR-AUC 0.77 with automated Evidently drift triggers, MLflow registry promotion gates, and FastAPI zero-downtime hot-reload.",
    descPt: "Sistema completo de MLOps em produção que detecta fraudes em tempo real com PR-AUC de 0.77, gatilhos automáticos de drift no Evidently e recarregamento sem downtime.",
    fullDescEng: `<div class="ul-title">About the Project:</div>
<ul class="ul-description">
  <li>Built an end-to-end production system serving real-time fraud predictions at test PR-AUC 0.77 (precision 0.87 / recall 0.75) on a ~0.17%-positive imbalanced dataset.</li>
  <li>Closed the MLOps loop: Evidently AI Kolmogorov-Smirnov drift detection triggers automated retraining.</li>
  <li>MLflow registry promotion gate strictly promotes the challenger model only if it beats the incumbent on identical holdout data.</li>
  <li>FastAPI async microservice hot-reloads model weights with zero downtime.</li>
  <li>Fully containerized with Docker Compose; ruff + pytest CI via GitHub Actions.</li>
</ul>`,
    fullDescPt: `<div class="ul-title">Sobre o Projeto:</div>
<ul class="ul-description">
  <li>Construiu um sistema completo em produção servindo predições de fraude com PR-AUC 0.77 em dados desbalanceados (0.17%).</li>
  <li>Ciclo fechado de MLOps: monitoramento de drift no Evidently AI dispara retreinamento automático.</li>
  <li>Gate de promoção no registro MLflow avalia challenger contra incumbent antes da promoção.</li>
  <li>Microsserviço FastAPI assíncrono com hot-reload dinâmico.</li>
</ul>`,
    tags: ["MLflow", "FastAPI", "Docker", "Evidently AI", "scikit-learn", "pytest"],
    githubUrl: "https://github.com/Abhi241-bot",
    demoUrl: "https://github.com/Abhi241-bot",
    video: "/videos/PythonAPI_720p.mp4",
  },
  {
    id: "proj-2",
    titleKey: "PROJECT-2",
    titleEng: "Multi-Agent Financial Analyst with QLoRA Text-to-SQL",
    titlePt: "Analista Financeiro Multi-Agente com SQL Fine-Tuned",
    descriptions: ["LangGraph", "QLoRA", "RAGAS", "DeepEval", "LangSmith", "ChromaDB", "SEC EDGAR"],
    descEng: "Autonomous LangGraph multi-agent financial researcher with 4-bit QLoRA fine-tuned Text-to-SQL tool, SEC EDGAR 10-K RAG, prompt-injection guardrails, and automated RAGAS evaluations.",
    descPt: "Sistema multi-agente autônomo em LangGraph com Text-to-SQL fine-tuned via QLoRA 4-bit, busca vetorial em 10-Ks da SEC e guardrails contra prompt injection.",
    fullDescEng: `<div class="ul-title">Key Architectural Features:</div>
<ul class="ul-description">
  <li>Autonomous LangGraph multi-agent workflow (planner → researcher → analyst) generating cited financial teardowns from SEC EDGAR filings.</li>
  <li>Fine-tuned Text-to-SQL with 4-bit QLoRA on Spider dataset, boosting execution accuracy from 49.0% to 54.5% (+11% relative boost).</li>
  <li>Input/output guardrails: prompt-injection intercept, regex PII filtering, and read-only SQL execution.</li>
  <li>Integrated human-in-the-loop validation checkpoints and full LangSmith distributed tracing.</li>
</ul>`,
    fullDescPt: `<div class="ul-title">Principais Recursos:</div>
<ul class="ul-description">
  <li>Fluxo multi-agente autônomo LangGraph com relatórios fundamentados em dados da SEC EDGAR.</li>
  <li>Fine-tuning de Text-to-SQL com QLoRA 4-bit elevando acurácia em +11% no benchmark Spider.</li>
  <li>Guardrails de segurança contra injeção de prompt e mascaramento de PII.</li>
</ul>`,
    tags: ["LangGraph", "QLoRA", "Spider", "RAGAS", "DeepEval", "LangSmith"],
    githubUrl: "https://github.com/Abhi241-bot",
    demoUrl: "https://github.com/Abhi241-bot",
    video: "/videos/Fluxudo_480P.mp4",
  },
  {
    id: "proj-3",
    titleKey: "PROJECT-3",
    titleEng: "Causal Inference & A/B Experimentation Platform",
    titlePt: "Plataforma de Inferência Causal e Testes A/B",
    descriptions: ["DoWhy", "EconML", "CUPED", "statsmodels", "Streamlit", "Propensity Score"],
    descEng: "Self-serve causal experimentation engine with automated SRM & power diagnostics, CUPED variance reduction (35-50%), and 5x bias correction under confounding.",
    descPt: "Plataforma de testes A/B e inferência causal com redução de variância CUPED de até 50% e correção de viés de 5x em dados observacionais com confusão.",
    fullDescEng: `<div class="ul-title">Technical Highlights:</div>
<ul class="ul-description">
  <li>Pre-experiment Sample Ratio Mismatch (SRM) checks and statistical power calculations.</li>
  <li>CUPED variance reduction shrinking necessary experiment duration and sample sizes by up to 50%.</li>
  <li>Causal estimators (DoWhy, EconML): Propensity Score Matching, Difference-in-Differences, and Causal Forests.</li>
  <li>Demonstrated 5x bias recovery on confounded observational data (naive 11.0 vs true 2.0; PSM 1.6).</li>
</ul>`,
    fullDescPt: `<div class="ul-title">Destaques Técnicos:</div>
<ul class="ul-description">
  <li>Verificações automáticas de SRM e cálculo de poder estatístico.</li>
  <li>Redução de variância com CUPED acelerando experimentos em até 50%.</li>
  <li>Estimadores causais com DoWhy e EconML para decisões de produto com verdicts em linguagem natural.</li>
</ul>`,
    tags: ["DoWhy", "EconML", "CUPED", "statsmodels", "Streamlit"],
    githubUrl: "https://github.com/Abhi241-bot",
    demoUrl: "https://github.com/Abhi241-bot",
    video: "/videos/Sapientum_480p.mp4",
  },
  {
    id: "proj-4",
    titleKey: "PROJECT-4",
    titleEng: "Statistical Arbitrage / Pairs Trading (NSE Equities)",
    titlePt: "Arbitragem Estatística / Pairs Trading (Ações NSE)",
    descriptions: ["Python", "statsmodels", "Kalman Filter", "Cointegration", "Walk-Forward", "pytest"],
    descEng: "Cost-aware cointegration pairs strategy on TCS/INFY with Engle-Granger Bonferroni clearance (p=0.0002), rolling Kalman filter hedge ratios, and 9-fold walk-forward validation.",
    descPt: "Estratégia de pairs trading cointegrada em ações da NSE com filtro de Kalman dinâmico, validação walk-forward em 9 blocos e análise rigorosa de custos.",
    fullDescEng: `<div class="ul-title">Methodological Breakdown:</div>
<ul class="ul-description">
  <li>Engle-Granger cointegration (p = 0.0002, Bonferroni-cleared) on TCS/INFY; spread parameters estimated strictly on train period.</li>
  <li>Honest result: in-sample Sharpe 0.97 decaying to -0.72 OOS diagnosed via rolling Kalman filter dynamic hedge ratios.</li>
  <li>Cost-sensitivity sweep proving signal breakdown rather than transaction cost drag.</li>
  <li>27-test automated pytest suite enforcing zero look-ahead bias invariants.</li>
</ul>`,
    fullDescPt: `<div class="ul-title">Detalhamento Metodológico:</div>
<ul class="ul-description">
  <li>Cointegração de Engle-Granger (p = 0.0002) em TCS/INFY com confirmação ADF e Johansen.</li>
  <li>Diagnóstico de decaimento fora da amostra via filtro de Kalman e 9 blocos de walk-forward.</li>
  <li>27 testes automatizados no pytest garantindo ausência de viés temporal.</li>
</ul>`,
    tags: ["Statistical Arbitrage", "Kalman Filter", "Cointegration", "statsmodels", "pytest"],
    githubUrl: "https://github.com/Abhi241-bot/Quantfin1",
    video: "/videos/JavaAPI_720p.mp4",
  },
  {
    id: "proj-5",
    titleKey: "PROJECT-5",
    titleEng: "Options Pricing & Implied Volatility Surface",
    titlePt: "Precificação de Opções e Superfície de Volatilidade Implícita",
    descriptions: ["Python", "SciPy", "Black-Scholes", "Monte Carlo", "CRR Binomial", "Delta Hedging"],
    descEng: "Analytical Black-Scholes Greeks, CRR binomial lattice, and Monte Carlo three-way numerical agreement proof. SPY implied volatility surface inversion and discrete delta hedging simulation.",
    descPt: "Precificador de derivativos com prova de concordância tripla (BSM, CRR e Monte Carlo), inversão de superfície de volatilidade implícita no SPY e simulação de delta hedging.",
    fullDescEng: `<div class="ul-title">Derivatives Engineering:</div>
<ul class="ul-description">
  <li>Implemented Black-Scholes (analytical Greeks), multi-step CRR binomial trees, and vectorized Monte Carlo simulation agreeing within standard error.</li>
  <li>Inverted real SPY option chains via Brent's root-finder to map empirical downward equity volatility skew (+9.6% at 7d → +5.1% at 88d).</li>
  <li>Discrete delta-hedging simulation proving error scaling as 1/√n under friction.</li>
</ul>`,
    fullDescPt: `<div class="ul-title">Engenharia de Derivativos:</div>
<ul class="ul-description">
  <li>Implementação de Black-Scholes com Gregas completas, árvores CRR e simulação de Monte Carlo.</li>
  <li>Reconstrução de superfícies de volatilidade e skew empírico em opções reais do SPY.</li>
</ul>`,
    tags: ["Options Pricing", "Black-Scholes", "Monte Carlo", "Implied Volatility", "SciPy"],
    githubUrl: "https://github.com/Abhi241-bot/Quantfin2",
    video: "/videos/VuExpensio_720p.mp4",
  },
  {
    id: "proj-6",
    titleKey: "PROJECT-6",
    titleEng: "Multi-Factor Long-Short Equity Strategy (Nifty 100)",
    titlePt: "Estratégia Long-Short Multi-Fator (Nifty 100)",
    descriptions: ["Python", "pandas", "Factor Investing", "Beta Hedging", "Alpha Attribution", "Nifty 100"],
    descEng: "Cross-sectional z-score factor book (momentum, low-volatility, value) on Nifty 100 with monthly rebalancing, explicit turnover costs, and point-in-time beta hedging teardown.",
    descPt: "Portfólio long-short quantitativo multi-fator no índice Nifty 100 com rebalanceamento mensal, custos de turnover e decomposição rigorosa de alfa vs beta.",
    fullDescEng: `<div class="ul-title">Quantitative Portfolio Construction:</div>
<ul class="ul-description">
  <li>Combined momentum, low-volatility, and value factors into standardized cross-sectional z-scores.</li>
  <li>Rigorous attribution: proved an apparent +3.1% static alpha collapsed to +0.7% once market beta exposure was stripped.</li>
  <li>Full Information Coefficient (IC) decay analysis and survivorship bias disclosures.</li>
</ul>`,
    fullDescPt: `<div class="ul-title">Construção de Portfólio:</div>
<ul class="ul-description">
  <li>Combinação de fatores de momentum, baixa volatilidade e valor em z-scores transversais.</li>
  <li>Atribuição rigorosa separando alfa idiossincrático real de exposição latente a beta de mercado.</li>
</ul>`,
    tags: ["Factor Models", "Long-Short", "Beta Hedging", "Risk Attribution", "pandas"],
    githubUrl: "https://github.com/Abhi241-bot/Quantfin3",
    video: "/videos/JavaParkingLot_720p.mp4",
  },
  {
    id: "proj-7",
    titleKey: "PROJECT-7",
    titleEng: "Multimodal Stress Detection using Deep Learning (IEEE)",
    titlePt: "Detecção Multimodal de Estresse com Deep Learning (IEEE)",
    descriptions: ["PyTorch", "3D-CNN", "EfficientNet", "MediaPipe", "Audio-Visual Fusion", "IEEE"],
    descEng: "Hybrid 3D-CNN + EfficientNet architecture fusing facial video dynamics and acoustic spectral features with Action-Unit gating, achieving 94.7% accuracy vs 87.3% unimodal baseline.",
    descPt: "Arquitetura híbrida 3D-CNN + EfficientNet fundindo dinâmica facial e características acústicas de fala, alcançando 94.7% de acurácia (artigo IEEE).",
    fullDescEng: `<div class="ul-title">Research Contributions:</div>
<ul class="ul-description">
  <li>Hybrid 3D-CNN + EfficientNet with Action-Unit gating for dynamic temporal-spectral fusion.</li>
  <li>Automated preprocessing pipeline with MediaPipe facial landmark alignment and Voice Activity Detection (VAD), reducing baseline error by 38%.</li>
  <li>Published in IEEE conference proceedings (in progress).</li>
</ul>`,
    fullDescPt: `<div class="ul-title">Contribuições Científicas:</div>
<ul class="ul-description">
  <li>Fusão de vídeo facial e áudio com 3D-CNN e EfficientNet atingindo 94.7% de acurácia.</li>
  <li>Pipeline de pré-processamento com MediaPipe e VAD reduzindo erro em 38%.</li>
</ul>`,
    tags: ["Deep Learning", "3D-CNN", "MediaPipe", "Multimodal AI", "IEEE"],
    githubUrl: "https://github.com/Abhi241-bot",
    video: "/videos/Face_Recon_720p.mp4",
  },
  {
    id: "proj-8",
    titleKey: "PROJECT-8",
    titleEng: "Cross-Asset Stress-Flow Index for Drawdown Warning",
    titlePt: "Índice de Fluxo de Estresse Entre Ativos para Alerta de Quedas",
    descriptions: ["Network Econometrics", "21-Asset Panel", "Block Bootstrap", "Diebold-Yilmaz", "Drawdowns"],
    descEng: "Sole-author manuscript designing a parameter-free network statistic across a 21-asset global panel leading own volatility in 64% of 145 drawdown episodes (p=0.002, block-bootstrap).",
    descPt: "Manuscrito de autor único formulando o Stress Flow Index (SFI) em painel global de 21 ativos, antecipando drawdowns em 64% dos 145 episódios históricos (p=0.002).",
    fullDescEng: `<div class="ul-title">Econometric Innovation:</div>
<ul class="ul-description">
  <li>Formulated the Stress Flow Index (SFI): parameter-free network statistic aggregating directed stress transfer across 21 cross-asset markets (2000–2024).</li>
  <li>Out-of-sample walk-forward validation: leads asset volatility ahead of drawdowns in 64% of 145 episodes (p = 0.002 via stationary block-bootstrap).</li>
  <li>Demonstrated near-orthogonality (|ρ| ≤ 0.16) and incremental information beyond Diebold-Yilmaz connectedness.</li>
</ul>`,
    fullDescPt: `<div class="ul-title">Inovação Econométrica:</div>
<ul class="ul-description">
  <li>Índice em forma fechada que agrega contágio de estresse entre 21 classes de ativos globais.</li>
  <li>Validação out-of-sample comprovando antecipação de volatilidade em 64% dos drawdowns históricos.</li>
</ul>`,
    tags: ["Econometrics", "Network Models", "Drawdown Warning", "Bootstrap", "Risk Management"],
    githubUrl: "https://github.com/Abhi241-bot",
    video: "/videos/Hades_720p.mp4",
  },
  {
    id: "proj-9",
    titleKey: "PROJECT-9",
    titleEng: "Jumps vs. Stochastic Volatility on NSE Nifty 50 Options",
    titlePt: "Saltos vs Volatilidade Estocástica em Opções Nifty 50",
    descriptions: ["Derivatives Pricing", "Heston Model", "Merton Jump-Diffusion", "Diebold-Mariano", "115K Options"],
    descEng: "Empirical out-of-sample comparison of BSM, CRR, Merton jump-diffusion, and Heston stochastic volatility on 115,709 NSE option records across crash and calm regimes.",
    descPt: "Comparação empírica out-of-sample de BSM, CRR, Merton e Heston em 115.709 contratos de opções do Nifty 50 na NSE indiana sob múltiplos regimes de mercado.",
    fullDescEng: `<div class="ul-title">Empirical Pricing Findings:</div>
<ul class="ul-description">
  <li>Benchmarked 4 option models from scratch on 115,709 NSE Nifty 50 quotes using trailing realized volatility.</li>
  <li>Regime-dependent result: Heston wins calm regimes (40.4% RMSE reduction), while Merton jumps win COVID shock (27.7%), all verified at p < 0.001 via Diebold-Mariano testing.</li>
  <li>Analytical BSM-CRR equivalence used as exact numerical control.</li>
</ul>`,
    fullDescPt: `<div class="ul-title">Resultados Empíricos:</div>
<ul class="ul-description">
  <li>Avaliação de modelos em 115.709 registros de opções reais na NSE.</li>
  <li>Heston minimiza erro em períodos calmos (redução de 40.4% no RMSE), enquanto Merton vence em choques extremos de mercado (27.7%).</li>
</ul>`,
    tags: ["Option Pricing", "Heston", "Merton Jumps", "Diebold-Mariano", "Quantitative Finance"],
    githubUrl: "https://github.com/Abhi241-bot",
    video: "/videos/Saturn_720p.mp4",
  },
];

export default function GustavoPortfolio() {
  const [lang, setLang] = useState<"eng" | "pt">("eng");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [activeTab, setActiveTab] = useState<"education" | "skills">("education");
  const [courseworkOpen, setCourseworkOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectItem | null>(null);
  const [gameModalOpen, setGameModalOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [startClicked, setStartClicked] = useState(false);
  const [loadingPercent, setLoadingPercent] = useState(0);

  // Form submission state
  const [formState, setFormState] = useState<"idle" | "delivering" | "positive" | "negative">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  // 3D Carousel active index
  const [carouselIndex, setCarouselIndex] = useState(2);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Loading Counter Animation
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 2;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setLoadingComplete(true);
      }
      setLoadingPercent(current);
    }, 18);
    return () => clearInterval(interval);
  }, []);

  const playSfx = (src: string) => {
    if (isMuted) return;
    try {
      const sfx = new Audio(src);
      sfx.volume = 0.5;
      sfx.play().catch(() => {});
    } catch {}
  };

  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (audioRef.current) {
      if (!nextMuted) {
        audioRef.current.volume = 0.4;
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
    playSfx("/sound/gearSound.mp3");
  };

  const handleStart = () => {
    setStartClicked(true);
    toggleSound();
  };

  // Scroll-Spy Dot Navigation
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.4;
      const sections = ["home", "about", "service", "projects", "contact"];
      const dots = document.querySelectorAll(".nav__dot li");

      sections.forEach((secId, idx) => {
        const el = document.getElementById(secId) || document.getElementById(`section-${secId}`);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            dots.forEach((d) => d.classList.remove("current"));
            if (dots[idx]) dots[idx].classList.add("current");
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Complete Three.js 3D WebGL Multi-Scene Engine with GLTF Models, Upward Crest Terrain & Concentric Brain Orbit
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x121212, 0.0012);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 510, 110);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor("#121212");

    const textureLoader = new THREE.TextureLoader();
    const gltfLoader = new GLTFLoader();

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(0, 550, 200);
    scene.add(dirLight);

    // 1. HOME SCENE: Celestial Star + Mountain Wave Terrain
    const starGeo = new THREE.SphereGeometry(2.0, 16, 16);
    const starMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const starMesh = new THREE.Mesh(starGeo, starMat);
    starMesh.position.set(0, 560, 0);
    scene.add(starMesh);

    // Glowing Star Point Light
    const starLight = new THREE.PointLight(0xffffff, 3.5, 400);
    starLight.position.set(0, 560, 15);
    scene.add(starLight);

    // Terrain Wireframe Plane with Alpha and Displacement Map (Arching upward behind name)
    const heightMap = textureLoader.load("/images/height.png");
    const alphaMap = textureLoader.load("/images/alpha.png");
    const binMap = textureLoader.load("/images/bin.png");

    const terrainGeo = new THREE.PlaneGeometry(220, 220, 96, 128);
    const terrainMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.22,
      displacementMap: heightMap,
      alphaMap: alphaMap,
      displacementScale: -40,
      wireframe: true,
      depthTest: false,
    });
    const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
    terrainMesh.rotation.set(-Math.PI / 2.3, 0, 0);
    terrainMesh.position.set(0, 480, -20);
    scene.add(terrainMesh);

    // Binary Particle Cloud scattered over Terrain
    const binCount = 1400;
    const binGeo = new THREE.BufferGeometry();
    const binPos = new Float32Array(binCount * 3);
    for (let i = 0; i < binCount * 3; i += 3) {
      binPos[i] = (Math.random() - 0.5) * 260;
      binPos[i + 1] = (Math.random() - 0.5) * 260;
      binPos[i + 2] = (Math.random() - 0.5) * 60;
    }
    binGeo.setAttribute("position", new THREE.BufferAttribute(binPos, 3));
    const binParticleMat = new THREE.PointsMaterial({
      size: 1.3,
      map: binMap,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const binParticles = new THREE.Points(binGeo, binParticleMat);
    terrainMesh.add(binParticles);

    // 2. ABOUT SCENE: Wireframe Head & Glowing Lightbulb
    const headGroup = new THREE.Group();
    headGroup.position.set(-26, 260, 0);
    headGroup.scale.set(25, 25, 25);
    headGroup.rotation.y = Math.PI / 6;
    scene.add(headGroup);

    // Lamp Point Light inside the head
    const lampLight = new THREE.PointLight(0xffffff, 2.5, 150);
    lampLight.position.set(-26, 275, 10);
    scene.add(lampLight);

    gltfLoader.load(
      "/models/head/Head.gltf",
      (gltf) => {
        headGroup.add(gltf.scene);
      },
      undefined,
      (err) => console.warn("Head.gltf fallback:", err)
    );

    gltfLoader.load(
      "/models/head/scene3.gltf",
      (gltf) => {
        headGroup.add(gltf.scene);
      },
      undefined,
      (err) => console.warn("scene3.gltf fallback:", err)
    );

    // 3. SERVICE SCENE: 3D Brain Model with Rotating Gears & Concentric Orbiting Particle Sphere
    const brainGroup = new THREE.Group();
    brainGroup.position.set(32, 110, 0);
    brainGroup.scale.set(13, 13, 13);
    brainGroup.rotation.y = 1;
    scene.add(brainGroup);

    let mixer: THREE.AnimationMixer | null = null;

    gltfLoader.load(
      "/models/brain/te3.glb",
      (gltf) => {
        // Compute bounding box and center internal mesh at (0, 0, 0)
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = box.getCenter(new THREE.Vector3());
        gltf.scene.position.sub(center);

        brainGroup.add(gltf.scene);

        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(gltf.scene);
          gltf.animations.forEach((clip) => {
            mixer?.clipAction(clip).play();
          });
        }
      },
      undefined,
      (err) => console.warn("te3.glb fallback:", err)
    );

    // Concentric Spherical Particle Ring around Brain
    const sphereParticleCount = 1400;
    const sphereGeo = new THREE.BufferGeometry();
    const spherePos: number[] = [];
    const radius = 3.2;
    for (let i = 0; i < sphereParticleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * radius;
      const sinPhi = Math.sin(phi);
      spherePos.push(r * sinPhi * Math.cos(theta), r * sinPhi * Math.sin(theta), r * Math.cos(phi));
    }
    sphereGeo.setAttribute("position", new THREE.Float32BufferAttribute(spherePos, 3));
    const sphereMat = new THREE.PointsMaterial({
      color: 0x94a3b8,
      size: 0.04,
      transparent: true,
      opacity: 0.9,
    });
    const brainOrbitParticles = new THREE.Points(sphereGeo, sphereMat);
    // Concentrically attached at (0,0,0) directly inside brainGroup
    brainGroup.add(brainOrbitParticles);

    // 4. AMBIENT SMOKE & SPACE DUST
    const smokeTexture = textureLoader.load("/images/smoke3.png");
    const smokeGeo = new THREE.PlaneGeometry(350, 350);
    const smokeMat = new THREE.MeshLambertMaterial({
      map: smokeTexture,
      transparent: true,
      opacity: 0.04,
      depthWrite: false,
    });
    const smokeParticles: THREE.Mesh[] = [];
    for (let i = 0; i < 30; i++) {
      const smokeMesh = new THREE.Mesh(smokeGeo, smokeMat);
      smokeMesh.position.set(
        Math.random() * 600 - 300,
        Math.random() * 800 - 200,
        Math.random() * 100 - 80
      );
      smokeMesh.rotation.z = Math.random() * Math.PI * 2;
      scene.add(smokeMesh);
      smokeParticles.push(smokeMesh);
    }

    // Interactive Raycaster for Lamp & Gears
    const raycaster = new THREE.Raycaster();
    const mouseCoord = new THREE.Vector2();

    let mouseX = 0;
    let mouseY = 0;
    let targetHeadRotY = Math.PI / 6;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      targetHeadRotY = (e.clientX / window.innerWidth) * (Math.PI / 3) + Math.PI / 8;
    };

    const onClick = (e: MouseEvent) => {
      mouseCoord.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseCoord.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouseCoord, camera);

      const headIntersects = raycaster.intersectObjects(headGroup.children, true);
      if (headIntersects.length > 0) {
        playSfx("/sound/lampSound.wav");
        lampLight.intensity = lampLight.intensity > 3.0 ? 2.5 : 4.5;
      }

      const brainIntersects = raycaster.intersectObjects(brainGroup.children, true);
      if (brainIntersects.length > 0) {
        playSfx("/sound/gearSound.mp3");
      }
    };

    const onResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("click", onClick);
    window.addEventListener("resize", onResize);

    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      if (mixer) mixer.update(delta);

      // 1. Terrain Wave dynamic oscillation
      const t = Date.now() / 200;
      const posAttr = terrainGeo.attributes.position;
      for (let f = 0; f < posAttr.count; f++) {
        const u = terrainGeo.attributes.uv.getX(f) * Math.PI * 16;
        const v = terrainGeo.attributes.uv.getY(f) * Math.PI * 16;
        const y = u + t * 0.05;
        const x = Math.sin(y) * 0.2;
        const S = v + t * 0.05;
        const T = Math.cos(S) * 0.2;
        posAttr.setZ(f, (x + T) * 12);
      }
      terrainGeo.computeVertexNormals();
      posAttr.needsUpdate = true;

      // 2. Head Smooth Rotation with Mouse
      headGroup.rotation.y += (targetHeadRotY - headGroup.rotation.y) * 0.05;
      headGroup.rotation.x = mouseY * 0.12;

      // 3. Brain & Particle Orbit Rotation
      brainOrbitParticles.rotation.y = elapsedTime * 0.15;
      brainOrbitParticles.rotation.x = Math.sin(elapsedTime * 0.1) * 0.1;
      brainGroup.rotation.y = 1 + Math.sin(elapsedTime * 0.3) * 0.15;

      // 4. Smoke Drift
      smokeParticles.forEach((sm, idx) => {
        sm.rotation.z += (idx % 2 === 0 ? 0.0005 : -0.0005);
      });

      // 5. Exact Scroll-driven Camera Interpolation matching Gustavo's site
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight || 1;
      const scrollProgress = scrollY / maxScroll;

      // Camera positions mapped:
      // Home: y: 510, z: 110 -> About: y: 260, z: 95 -> Service: y: 110, z: 95 -> Projects: y: -30, z: 100 -> Contact: y: -160, z: 95
      let targetY = 510;
      let targetZ = 110;
      let targetX = 0;
      let targetLookY = 490;

      if (scrollProgress < 0.25) {
        // Home -> About
        const progress = scrollProgress / 0.25;
        targetY = 510 - progress * (510 - 260);
        targetZ = 110 - progress * (110 - 95);
        targetX = -progress * 5;
        targetLookY = 490 - progress * (490 - 260);
      } else if (scrollProgress < 0.5) {
        // About -> Service
        const progress = (scrollProgress - 0.25) / 0.25;
        targetY = 260 - progress * (260 - 110);
        targetZ = 95;
        targetX = -5 + progress * 12;
        targetLookY = 260 - progress * (260 - 110);
      } else if (scrollProgress < 0.75) {
        // Service -> Projects
        const progress = (scrollProgress - 0.5) / 0.25;
        targetY = 110 - progress * (110 - (-30));
        targetZ = 95 + progress * 5;
        targetX = 7 - progress * 7;
        targetLookY = 110 - progress * (110 - (-30));
      } else {
        // Projects -> Contact
        const progress = (scrollProgress - 0.75) / 0.25;
        targetY = -30 - progress * (-30 - (-160));
        targetZ = 100 - progress * 5;
        targetX = -progress * 2;
        targetLookY = -30 - progress * (-30 - (-160));
      }

      camera.position.y += (targetY - camera.position.y) * 0.08;
      camera.position.z += (targetZ - camera.position.z) * 0.08;
      camera.position.x += (targetX + mouseX * 2 - camera.position.x) * 0.08;
      camera.lookAt(0, targetLookY, 0);

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onClick);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, []);

  // Form Submit Action
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSfx("/sound/woosh.mp3");

    if (!formData.name || !formData.email || !formData.message) return;

    setFormState("delivering");
    setTimeout(() => {
      setFormState("positive");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setFormState("idle"), 5000);
    }, 1200);
  };

  const isEng = lang === "eng";

  return (
    <>
      {/* Background Audio */}
      <audio
        ref={audioRef}
        src="/sound/Alphaxone-Ashes-of-Time.mp3"
        loop
        preload="auto"
      />

      {/* Three.js Fixed Background Canvas */}
      <canvas id="main-content" ref={canvasRef}></canvas>

      {/* Floating Circle Sound Prompt */}
      {isMuted && (
        <span
          id="circle"
          className="circle cursor-pointer"
          onClick={toggleSound}
          title="Click to enable sound"
        >
          <span id="circle" className="circle-inner"></span>
          <div className="label">
            {isEng ? "Click To Enable Sounds" : "Clique Para Ativar o Som"}
          </div>
        </span>
      )}

      {/* Header & Sticky Navigation */}
      <header id="home">
        <nav className="menu">
          {/* Mobile Hamburger Menu */}
          <div
            className={`mobile-menu ${mobileMenuOpen ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
          </div>

          {/* Navigation Links */}
          <ul className={`nav-list ${mobileMenuOpen ? "active" : ""}`}>
            <li>
              <a
                href="#home"
                className="nav-list-href"
                onClick={() => {
                  playSfx("/sound/woosh.mp3");
                  setMobileMenuOpen(false);
                }}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="nav-list-href"
                onClick={() => {
                  playSfx("/sound/woosh.mp3");
                  setMobileMenuOpen(false);
                }}
              >
                {isEng ? "About" : "Sobre"}
              </a>
            </li>
            <li>
              <a
                href="#service"
                className="nav-list-href"
                onClick={() => {
                  playSfx("/sound/woosh.mp3");
                  setMobileMenuOpen(false);
                }}
              >
                {isEng ? "Service" : "Serviço"}
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className="nav-list-href"
                onClick={() => {
                  playSfx("/sound/woosh.mp3");
                  setMobileMenuOpen(false);
                }}
              >
                {isEng ? "Projects" : "Projetos"}
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="nav-list-href"
                onClick={() => {
                  playSfx("/sound/woosh.mp3");
                  setMobileMenuOpen(false);
                }}
              >
                {isEng ? "Contact" : "Contato"}
              </a>
            </li>

            {/* Social Logos in Header */}
            <div className="social">
              <a
                href="https://github.com/Abhi241-bot"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="github-logo">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
              </a>
              <a href="mailto:abhiram04122006@gmail.com" target="_blank" rel="noopener noreferrer">
                <div className="email-logo">
                  <svg fill="#ffffff" width="22" height="22" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1920 428.266v1189.54l-464.16-580.146-88.203 70.585 468.679 585.904H83.684l468.679-585.904-88.202-70.585L0 1617.805V428.265l959.944 832.441L1920 428.266ZM1919.932 226v52.627l-959.943 832.44L.045 278.628V226h1919.887Z" fillRule="evenodd"/>
                  </svg>
                </div>
              </a>
              <a
                href="https://www.linkedin.com/in/abhiram-boini"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="linkedIn-logo">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="24px" height="24px" fill="#ffffff">
                    <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.105,4,24,4z M10.954,22h-2.95 v-9.492h2.95V22z M9.449,11.151c-0.951,0-1.72-0.771-1.72-1.72c0-0.949,0.77-1.719,1.72-1.719c0.948,0,1.719,0.771,1.719,1.719 C11.168,10.38,10.397,11.151,9.449,11.151z M22.004,22h-2.948v-4.616c0-1.101-0.02-2.517-1.533-2.517 c-1.535,0-1.771,1.199-1.771,2.437V22h-2.948v-9.492h2.83v1.297h0.04c0.394-0.746,1.356-1.533,2.791-1.533 c2.987,0,3.539,1.966,3.539,4.522V22z"/>
                  </svg>
                </div>
              </a>
              <a
                href="https://www.kaggle.com/abhiramboini"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="whatsapp-logo" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: "16px", fontWeight: "900", color: "#a8a8a8", fontFamily: "monospace" }}>K</span>
                </div>
              </a>
            </div>

            {/* Music Credits */}
            <div className="music-credits">
              <a
                href="https://cryochamber.bandcamp.com/album/dream-chambers"
                className="music-txt"
                target="_blank"
                rel="noopener noreferrer"
              >
                {isEng ? "Music: Alphaxone - Ashes Of Time" : "Música: Alphaxone - Ashes Of Time"}
              </a>
            </div>
          </ul>
        </nav>

        {/* 5-Dot Scroll-Spy Navigation */}
        <ul className="nav__dot">
          <li
            className="current"
            data-nav-href="#home"
            onClick={() => {
              playSfx("/sound/woosh.mp3");
              document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
            }}
          ></li>
          <li
            data-nav-href="#about"
            onClick={() => {
              playSfx("/sound/woosh.mp3");
              document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
            }}
          ></li>
          <li
            data-nav-href="#service"
            onClick={() => {
              playSfx("/sound/woosh.mp3");
              document.getElementById("service")?.scrollIntoView({ behavior: "smooth" });
            }}
          ></li>
          <li
            data-nav-href="#projects"
            onClick={() => {
              playSfx("/sound/woosh.mp3");
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
            }}
          ></li>
          <li
            data-nav-href="#contact"
            onClick={() => {
              playSfx("/sound/woosh.mp3");
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          ></li>
        </ul>

        {/* Language Switcher Dropdown */}
        <div className="dropdown">
          <button
            className="dropdown__button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {isEng ? "ENG ▼" : "PT-BR ▼"}
          </button>
          <div className={`dropdown__items ${dropdownOpen ? "dropdown--show" : "dropdown--hide"}`}>
            <button
              className="dropdown__item"
              id="eng"
              onClick={() => {
                setLang("eng");
                setDropdownOpen(false);
                playSfx("/sound/woosh.mp3");
              }}
            >
              ENG
            </button>
            <button
              className="dropdown__item"
              id="pt"
              onClick={() => {
                setLang("pt");
                setDropdownOpen(false);
                playSfx("/sound/woosh.mp3");
              }}
            >
              PT-BR
            </button>
          </div>
        </div>

        {/* Speaker with 6 Equalizer Bars */}
        <a
          className={`speaker ${isMuted ? "mute" : ""}`}
          onClick={toggleSound}
          title={isMuted ? "Unmute" : "Mute"}
        >
          <div className="bar-c">
            <div id="bar-1" className={`bar ${isMuted ? "noAnim" : ""}`}></div>
            <div id="bar-2" className={`bar ${isMuted ? "noAnim" : ""}`}></div>
            <div id="bar-3" className={`bar ${isMuted ? "noAnim" : ""}`}></div>
            <div id="bar-4" className={`bar ${isMuted ? "noAnim" : ""}`}></div>
            <div id="bar-5" className={`bar ${isMuted ? "noAnim" : ""}`}></div>
            <div id="bar-6" className={`bar ${isMuted ? "noAnim" : ""}`}></div>
          </div>
          <button className="muted"></button>
        </a>

        {/* Game Button */}
        <button
          className="game-button"
          aria-label="Abrir Jogo / Open Experience"
          onClick={() => {
            playSfx("/sound/woosh.mp3");
            setGameModalOpen(true);
          }}
        >
          <svg fill="#ffffff" width="22px" height="22px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
            <path d="M483.13,245.38C461.92,149.49,430,98.31,382.65,84.33A107.13,107.13,0,0,0,352,80c-13.71,0-25.65,3.34-38.28,6.88C298.5,91.15,281.21,96,256,96s-42.51-4.84-57.76-9.11C185.6,83.34,173.67,80,160,80a115.74,115.74,0,0,0-31.73,4.32c-47.1,13.92-79,65.08-100.52,161C4.61,348.54,16,413.71,59.69,428.83a56.62,56.62,0,0,0,18.64,3.22c29.93,0,53.93-24.93,70.33-45.34,18.53-23.1,40.22-34.82,107.34-34.82,59.95,0,84.76,8.13,106.19,34.82,13.47,16.78,26.2,28.52,38.9,35.91,16.89,9.82,33.77,12,50.16,6.37,25.82-8.81,40.62-32.1,44-69.24C497.82,331.27,493.86,293.86,483.13,245.38ZM208,240H176v32a16,16,0,0,1-32,0V240H112a16,16,0,0,1,0-32h32V176a16,16,0,0,1,32,0v32h32a16,16,0,0,1,0,32Zm84,4a20,20,0,1,1,20-20A20,20,0,0,1,292,244Zm44,44a20,20,0,1,1,20-19.95A20,20,0,0,1,336,288Zm0-88a20,20,0,1,1,20-20A20,20,0,0,1,336,200Zm44,44a20,20,0,1,1,20-20A20,20,0,0,1,380,244Z"/>
          </svg>
        </button>
      </header>

      {/* Main Content */}
      <main>
        {/* Section 1: Home (Hero) */}
        <section className="section" id="section-home">
          <div className="name-container">
            <div className="name-highlight">
              <span id="letter">A</span>
              <span id="name">BHIRAM</span>
              <span id="letter2">B</span>
              <span className="name2" id="name">OINI</span>
            </div>

            <div className="typed-wrapper">
              <span className="typed" id="typed">
                {isEng ? "| DATA SCIENCE & AI ENGINEER |" : "| ENGENHEIRO DE DADOS & IA |"}
              </span>
            </div>

            <div className="contact-Btn-wrapper">
              <a href="#contact" onClick={() => playSfx("/sound/woosh.mp3")}>
                <button className="contact-Btn">
                  {isEng ? "Get in Touch" : "Entre em Contato"}
                </button>
              </a>
            </div>

            <div id="scroll-down-animation" style={{ marginTop: "40px" }}>
              <span className="mouse">
                <span className="move"></span>
              </span>
            </div>
          </div>
        </section>

        {/* Section 2: About */}
        <section className="section" id="about" data-nav="data-nav">
          <h1 className="about-title">{isEng ? "About" : "Sobre"}</h1>
          <h2 className="about-text">
            {isEng
              ? "“Hello, my name is Abhiram Boini and I am a Data Science & AI undergraduate at IIIT Naya Raipur with production ML experience (a deployed government AI zoo system, MLOps pipelines, LLM multi-agent tooling) and quantitative finance research on option pricing and cross-asset market stress. I care about rigor: honest reporting of negative results, proper out-of-sample walk-forward validation, and statistical significance testing show up throughout my work below. Check out my projects in this portfolio or on my GitHub. If you are interested in collaborating or working together, feel free to contact me via email or LinkedIn.”"
              : "“Olá, me chamo Abhiram Boini e sou estudante de Ciência de Dados e IA no IIIT Naya Raipur com experiência em sistemas de ML em produção (sistema de IA implantado para o zoológico do governo, MLOps, agentes LLM) e pesquisa quantitativa em precificação de opções e estresse de mercado. Priorizo o rigor científico: validação out-of-sample, testes de significância estatística e métricas reais. Confira meus projetos abaixo ou no GitHub.”"}
          </h2>

          {/* Tabs Header */}
          <div className="tab-titles" style={{ width: "100%", justifyContent: "flex-end" }}>
            <p
              className={`tab-links ${activeTab === "education" ? "active-link" : ""}`}
              onClick={() => {
                playSfx("/sound/woosh.mp3");
                setActiveTab("education");
              }}
            >
              <svg className="education-icon" viewBox="0 0 245.827 245.827" width="18" height="18" fill="currentColor">
                <path d="M223.336,148.384l-0.137-23.527l22.628-12.662L122.576,47.195L0,113.495l49.144,28.216 l0.098,16.766l0.01,1.339l0.449-0.215c-0.518,0.703-0.85,1.426-0.84,2.149c0.039,8.246,33.326,14.772,74.41,14.548 c41.064-0.215,74.302-7.122,74.273-15.349c0-0.723-0.381-1.426-0.889-2.149l0.449,0.215v-1.339l-0.088-16.834l21.309-13.258 l0.117,20.83c-2.345,1.006-3.976,3.312-3.957,6.009c0.02,3.537,2.892,6.399,6.458,6.37c3.586-0.02,6.429-2.912,6.409-6.439 C227.332,151.657,225.691,149.371,223.336,148.384z"/>
              </svg>
              {isEng ? "Education" : "Educação"}
            </p>

            <p
              className={`tab-links skill-link ${activeTab === "skills" ? "active-link" : ""}`}
              onClick={() => {
                playSfx("/sound/woosh.mp3");
                setActiveTab("skills");
              }}
            >
              <svg className="skill-icon" viewBox="0 0 1024 1024" width="18" height="18" fill="currentColor">
                <path d="M448.512 479.232a54.272 54.272 0 1 1 56.32-55.296 55.296 55.296 0 0 1-56.32 55.296z m343.04 91.136l-73.728-110.592V450.56a245.76 245.76 0 0 0-244.736-245.76 225.28 225.28 0 0 0-58.368 7.168A244.736 244.736 0 0 0 228.352 450.56a224.256 224.256 0 0 0 36.864 130.048c43.008 61.44 71.68 110.592 54.272 177.152a47.104 47.104 0 0 0 9.216 43.008 45.056 45.056 0 0 0 36.864 18.432h200.704a48.128 48.128 0 0 0 48.128-38.912 51.2 51.2 0 0 0 2.048-12.288 24.576 24.576 0 0 1 24.576-20.48H655.36a48.128 48.128 0 0 0 48.128-34.816 422.912 422.912 0 0 0 15.36-98.304h52.224a28.672 28.672 0 0 0 22.528-16.384 29.696 29.696 0 0 0-2.048-27.648z"/>
              </svg>
              {isEng ? "Skills" : "Habilidades"}
            </p>
          </div>

          {/* Education Tab Content */}
          <div className={`tab-contents ${activeTab === "education" ? "active-tab" : ""}`} id="education" style={{ width: "100%" }}>
            <ul>
              <li className="graduation-title">
                <span>2024–2028</span>
                <br />
                IIIT Naya Raipur — B.Tech, Data Science &amp; Artificial Intelligence (CGPA: 8.70/10.0)
              </li>
              <li className="graduation-title">
                <span>May 2026 – July 2026</span>
                <br />
                IIT (BHU) Varanasi — Research Intern (Multi-Modal Satellite Image Segmentation)
              </li>
              <li className="graduation-title">
                <span>Dec 2025 – March 2026</span>
                <br />
                Department of Forests, Chhattisgarh Govt. — AI/ML Engineer (Production Voice-Logging Zoo AI)
              </li>
              <li className="graduation-title">
                <span>Dec 2025 – Jan 2026</span>
                <br />
                Rochester Institute of Technology (RIT) NY — AI Data Analyst (Student Retention Modeling)
              </li>
              <li className="graduation-title">
                <span>Oct 2025 – Dec 2025</span>
                <br />
                Infosys Springboard — AI/ML Engineer Intern (SmileAgeAI Face Attribute Pipeline)
              </li>

              {/* Expandable Coursework Accordion */}
              <li className="parent">
                <span>2024–2026</span>
                <button
                  className="toggle-button"
                  onClick={() => setCourseworkOpen(!courseworkOpen)}
                >
                  {courseworkOpen ? "−" : "+"}
                </button>
                <br />
                <span className="course-text">
                  {isEng ? "Key Honors & Certified Specializations" : "Honras & Certificações Especializadas"}
                </span>
                {courseworkOpen && (
                  <ul className="child" style={{ display: "block" }}>
                    <li>JEE Main: 97.7 percentile (Top 2.3% Nationwide)</li>
                    <li>Class XII: 96.9% | Class X: 95.6%</li>
                    <li>Kaggle Expert (Notebooks &amp; Datasets)</li>
                    <li>IBM Data Science Professional Certificate</li>
                    <li>Oracle Cloud Infrastructure 2025 Data Science Professional</li>
                    <li>Google Gen AI Academy 2.0</li>
                    <li>Intel AI Fundamentals</li>
                  </ul>
                )}
              </li>
            </ul>
          </div>

          {/* Skills Tab Content */}
          <div className={`tab-contents ${activeTab === "skills" ? "active-tab" : ""}`} id="skills" style={{ width: "100%" }}>
            {/* Group 1: Core Languages */}
            <div className="our-skills">
              <p>{isEng ? "Languages & Systems" : "Linguagens & Sistemas"}</p>
              {["Python", "SQL", "C++", "R", "Java", "MATLAB", "HTML5", "CSS3", "JavaScript"].map((tech) => (
                <div key={tech} className="card" onMouseEnter={() => playSfx("/sound/woosh.mp3")}>
                  <div className="card-content">
                    <h2>{tech}</h2>
                  </div>
                </div>
              ))}
            </div>

            {/* Group 2: Machine Learning & MLOps */}
            <div className="our-skills">
              <p>{isEng ? "Machine Learning & MLOps" : "Machine Learning & MLOps"}</p>
              {["PyTorch", "TensorFlow", "FastAPI", "MLflow", "Docker", "Evidently AI", "scikit-learn", "pytest", "GitHub Actions"].map((tech) => (
                <div key={tech} className="card" onMouseEnter={() => playSfx("/sound/woosh.mp3")}>
                  <div className="card-content">
                    <h2>{tech}</h2>
                  </div>
                </div>
              ))}
            </div>

            {/* Group 3: LLM & Agentic AI */}
            <div className="our-skills">
              <p>{isEng ? "LLM & Agentic AI" : "LLM & IA Agêntica"}</p>
              {["LangGraph", "QLoRA", "RAG", "RAGAS", "DeepEval", "LangSmith", "ChromaDB", "Hugging Face"].map((tech) => (
                <div key={tech} className="card" onMouseEnter={() => playSfx("/sound/woosh.mp3")}>
                  <div className="card-content">
                    <h2>{tech}</h2>
                  </div>
                </div>
              ))}
            </div>

            {/* Group 4: Quantitative Finance */}
            <div className="our-skills">
              <p>{isEng ? "Quantitative Finance & Stats" : "Finanças Quantitativas"}</p>
              {["Black-Scholes", "Heston Model", "Kalman Filter", "Cointegration", "Factor Models", "CUPED", "DoWhy", "EconML"].map((tech) => (
                <div key={tech} className="card" onMouseEnter={() => playSfx("/sound/woosh.mp3")}>
                  <div className="card-content">
                    <h2>{tech}</h2>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Animated Download CV Button */}
          <div className="btn-cv-border" style={{ marginTop: "20px" }}>
            <a
              className="dcv"
              href="/resumes/Abhiram_Boini_ML_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playSfx("/sound/woosh.mp3")}
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              {isEng ? "Download CV" : "Baixar CV"}
            </a>
          </div>
        </section>

        {/* Section 3: Service */}
        <section className="section service">
          <section className="content" id="service" data-nav="data-nav">
            <h2 className="service-title">{isEng ? "Service" : "Serviço"}</h2>
            <p className="service-text">
              {isEng
                ? "“You might be wondering how I can help you. As an AI Engineer and Quantitative Researcher, I transform complex data and research hypotheses into robust production systems, scalable MLOps architectures, and mathematically rigorous predictive models.”"
                : "“Como posso ajudá-lo? Como engenheiro de IA e pesquisador quantitativo, transformo desafios complexos de dados em sistemas robustos de produção, pipelines escaláveis de MLOps e modelos preditivos com rigor estatístico.”"}
            </p>

            <div className="service-card-wrapper">
              {/* Service Card 1 */}
              <div className="service-card" onMouseEnter={() => playSfx("/sound/woosh.mp3")}>
                <h1 className="service-card-text api-title">
                  {isEng ? "Production ML & MLOps" : "Desenvolvimento de MLOps"}
                </h1>
                <div className="service-card-content">
                  <p className="api-text">
                    {isEng
                      ? "I build end-to-end containerized ML pipelines with automated drift monitoring, MLflow registry promotion gates, and FastAPI zero-downtime hot-reloading."
                      : "Desenvolvo pipelines de ML conteinerizados com monitoramento de drift no Evidently, gates de promoção no MLflow e serving com FastAPI."}
                  </p>
                </div>
              </div>

              {/* Service Card 2 */}
              <div className="service-card" onMouseEnter={() => playSfx("/sound/woosh.mp3")}>
                <h1 className="service-card-text web-title">
                  {isEng ? "Autonomous LLM Agents" : "Agentes LLM Autônomos"}
                </h1>
                <div className="service-card-content">
                  <p className="web-text">
                    {isEng
                      ? "I design multi-agent LangGraph systems with 4-bit QLoRA fine-tuned tools, RAG over enterprise filings, safety guardrails, and automated RAGAS evaluations."
                      : "Crio sistemas multi-agentes com LangGraph, fine-tuning QLoRA de ferramentas Text-to-SQL, guardrails de segurança e avaliações RAGAS."}
                  </p>
                </div>
              </div>

              {/* Service Card 3 */}
              <div className="service-card" onMouseEnter={() => playSfx("/sound/woosh.mp3")}>
                <h1 className="service-card-text desktop-title">
                  {isEng ? "Quantitative Finance & StatArb" : "Finanças Quantitativas"}
                </h1>
                <div className="service-card-content">
                  <p className="desktop-text">
                    {isEng
                      ? "I develop statistical arbitrage pairs strategies, options implied volatility surfaces, multi-factor risk attribution models, and cross-asset stress flow indices."
                      : "Desenvolvo estratégias de arbitragem estatística, superfícies de volatilidade implícita, modelos multi-fator e índices de contágio de estresse."}
                  </p>
                </div>
              </div>

              {/* Service Card 4 */}
              <div className="service-card" onMouseEnter={() => playSfx("/sound/woosh.mp3")}>
                <h1 className="service-card-text devops-title">
                  {isEng ? "Computer Vision & Remote Sensing" : "Visão Computacional"}
                </h1>
                <div className="service-card-content">
                  <p className="devops-text">
                    {isEng
                      ? "I engineer deep learning segmentation architectures fusing optical and SAR satellite imagery, 3D-CNNs for multimodal stress detection, and real-time facial analytics."
                      : "Crio modelos de segmentação semântica fundindo imagens de satélite ópticas e SAR, 3D-CNNs para detecção multimodal de estresse e análise facial em tempo real."}
                  </p>
                </div>
              </div>

              {/* Service Card 5 */}
              <div className="service-card" onMouseEnter={() => playSfx("/sound/woosh.mp3")}>
                <h1 className="service-card-text database-title">
                  {isEng ? "Causal Inference & A/B Testing" : "Inferência Causal"}
                </h1>
                <div className="service-card-content">
                  <p className="database-text">
                    {isEng
                      ? "I implement self-serve causal experimentation platforms with CUPED variance reduction (35–50%), sample ratio mismatch checks, and observational bias correction."
                      : "Implemento plataformas de testes A/B com redução de variância CUPED, verificação de SRM e correção de viés via Propensity Score Matching."}
                  </p>
                </div>
              </div>

              {/* Service Card 6 */}
              <div className="service-card" onMouseEnter={() => playSfx("/sound/woosh.mp3")}>
                <h1 className="service-card-text cloud-title">
                  {isEng ? "Cloud & Data Infrastructure" : "Infraestrutura Cloud & Dados"}
                </h1>
                <div className="service-card-content">
                  <p className="cloud-text">
                    {isEng
                      ? "I architect scalable cloud microservices, PostgreSQL/DuckDB pipelines, automated invariant test suites (pytest), and CI/CD automation."
                      : "Estruturo microsserviços na nuvem, bancos de dados relacionais e vetoriais, suites de testes invariantes e automação CI/CD."}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </section>

        {/* Section 4: Projects (Exact 3D Perspective Carousel) */}
        <section className="section">
          <section className="content" id="projects" data-nav="data-nav">
            <h1 className="project-title">{isEng ? "Projects" : "Projetos"}</h1>
            <p className="project-text">
              {isEng
                ? "“Check out some of my projects. They reflect my experience in production AI engineering, MLOps, LLM agents, and quantitative finance research.”"
                : "“Confira alguns dos meus projetos. Eles refletem minha experiência e dedicação ao desenvolvimento de IA em produção, MLOps e pesquisa quantitativa.”"}
            </p>

            <div className="carousel">
              <div className="carousel__body">
                {/* Arrow Controls */}
                <div
                  className="prev"
                  onClick={() => {
                    playSfx("/sound/woosh.mp3");
                    setCarouselIndex((prev) => (prev > 0 ? prev - 1 : PROJECTS_LIST.length - 1));
                  }}
                >
                  <svg aria-hidden="true" fill="none" height="1em" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="1em">
                    <polyline points="15 6 9 12 15 18"></polyline>
                  </svg>
                </div>

                <div
                  className="next"
                  onClick={() => {
                    playSfx("/sound/woosh.mp3");
                    setCarouselIndex((prev) => (prev < PROJECTS_LIST.length - 1 ? prev + 1 : 0));
                  }}
                >
                  <svg aria-hidden="true" fill="none" height="1em" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="1em">
                    <polyline points="9 6 15 12 9 18"></polyline>
                  </svg>
                </div>

                {/* 3D Perspective Slider Container */}
                <div
                  className="carousel__slider"
                  style={{
                    display: "flex",
                    gap: "20px",
                    transform: `translate3d(${-carouselIndex * 310 + 150}px, 0, 0)`,
                    transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  {PROJECTS_LIST.map((proj, idx) => {
                    const isActive = idx === carouselIndex;
                    const rotateY = idx < carouselIndex ? 35 : idx > carouselIndex ? -35 : 0;

                    return (
                      <div
                        key={proj.id}
                        className={`carousel__slider__item ${isActive ? "carousel__slider__item--active" : ""}`}
                        style={{
                          width: "290px",
                          minWidth: "290px",
                          height: "360px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setCarouselIndex(idx);
                          playSfx("/sound/woosh.mp3");
                        }}
                      >
                        <div
                          className="item__3d-frame"
                          style={{
                            width: "100%",
                            height: "100%",
                            background: "rgba(18, 18, 18, 0.95)",
                            border: isActive ? "2px solid #c2c2c2" : "1px solid rgba(255,255,255,0.12)",
                            borderRadius: "10px",
                            padding: "20px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            boxShadow: isActive ? "0 0 25px rgba(255, 255, 255, 0.25)" : "20px 20px 50px rgba(0,0,0,0.8)",
                            transform: `perspective(1200px) rotateY(${rotateY}deg) scale(${isActive ? 1.05 : 0.92})`,
                            transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                          }}
                        >
                          <div>
                            <div style={{ fontSize: "11px", color: "#a8a8a8", fontFamily: "monospace", textTransform: "uppercase", marginBottom: "8px" }}>
                              {proj.tags[0]}
                            </div>
                            <h3 style={{ fontSize: "17px", fontWeight: "700", color: "#fff", marginBottom: "10px", lineHeight: "1.3" }}>
                              {isEng ? proj.titleEng : proj.titlePt}
                            </h3>
                            <p style={{ fontSize: "12px", color: "#888888", lineHeight: "1.5", display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                              {isEng ? proj.descEng : proj.descPt}
                            </p>
                          </div>

                          <div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "12px" }}>
                              {proj.descriptions.slice(0, 3).map((d, dIdx) => (
                                <span key={dIdx} style={{ fontSize: "10px", background: "#111", border: "1px solid rgba(255,255,255,0.1)", padding: "2px 6px", borderRadius: "4px", color: "#a8a8a8" }}>
                                  {d}
                                </span>
                              ))}
                            </div>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                playSfx("/sound/woosh.mp3");
                                setActiveProjectModal(proj);
                              }}
                              style={{
                                width: "100%",
                                padding: "8px",
                                background: "transparent",
                                border: "1px solid #c2c2c2",
                                borderRadius: "50px",
                                color: "#c2c2c2",
                                fontSize: "11px",
                                fontWeight: "700",
                                letterSpacing: "0.05em",
                                cursor: "pointer",
                                transition: "all 0.3s",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = "#c2c2c2";
                                e.currentTarget.style.color = "#121212";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = "transparent";
                                e.currentTarget.style.color = "#c2c2c2";
                              }}
                            >
                              {isEng ? "VIEW PROJECT" : "VISUALIZAR PROJETO"}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Lightbox Project Modal */}
            {activeProjectModal && (
              <>
                <div
                  className="lightbox-backdrop"
                  onClick={() => setActiveProjectModal(null)}
                ></div>
                <div className="lightbox">
                  <span
                    className="close"
                    onClick={() => setActiveProjectModal(null)}
                  >
                    ×
                  </span>
                  <div className="lightbox-grid">
                    {activeProjectModal.video && (
                      <div className="lightbox-video-area" style={{ borderRadius: "8px", overflow: "hidden", maxHeight: "320px", background: "#000" }}>
                        <video
                          src={activeProjectModal.video}
                          controls
                          autoPlay
                          loop
                          muted
                          playsInline
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </div>
                    )}
                    <div className="project-description-container">
                      <div className="project-name">
                        {isEng ? activeProjectModal.titleEng : activeProjectModal.titlePt}
                      </div>
                      <p className="project-description-text">
                        {isEng ? activeProjectModal.descEng : activeProjectModal.descPt}
                      </p>

                      <div
                        dangerouslySetInnerHTML={{
                          __html: isEng ? activeProjectModal.fullDescEng : activeProjectModal.fullDescPt,
                        }}
                      />

                      <div className="project-tags">
                        {activeProjectModal.tags.map((t, idx) => (
                          <span key={idx} className="project-tag-item">
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="project-action-links">
                        {activeProjectModal.githubUrl && (
                          <a
                            href={activeProjectModal.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-link-btn primary"
                          >
                            <span>GitHub Repo</span>
                          </a>
                        )}
                        {activeProjectModal.demoUrl && (
                          <a
                            href={activeProjectModal.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-link-btn secondary"
                          >
                            <span>Documentation</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </section>
        </section>

        {/* Spacer Section */}
        <section className="section spacer-section">
          <div className="spacer"></div>
        </section>

        {/* Section 5: Contact */}
        <section className="contact section">
          <section className="content" id="contact" data-nav="data-nav">
            <h2 className="contact-title">{isEng ? "Contact" : "Contato"}</h2>

            {/* Delivering Animation */}
            {formState === "delivering" && (
              <div className="delivering" style={{ display: "block" }}>
                {isEng ? "Sending message..." : "Enviando..."}
              </div>
            )}

            {/* Positive Success State */}
            {formState === "positive" && (
              <div className="positive" style={{ display: "block" }}>
                <div className="check-icon">
                  <span className="icon-line line-tip"></span>
                  <span className="icon-line line-long"></span>
                  <div className="icon-circle"></div>
                  <div className="icon-fix"></div>
                  <p className="message">
                    {isEng
                      ? "Your message has been sent successfully. I will get back to you soon!"
                      : "Sua mensagem foi enviada, assim que possível lhe respondo"}
                  </p>
                </div>
              </div>
            )}

            {/* Contact Form */}
            <form id="contact-form" onSubmit={handleFormSubmit}>
              <input
                type="text"
                name="from_name"
                placeholder={isEng ? "Name:" : "Nome:"}
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <input
                type="email"
                name="email_id"
                placeholder="Email:"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <textarea
                name="message"
                placeholder={isEng ? "Message:" : "Mensagem:"}
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              ></textarea>

              <div className="button-container">
                <div className="social-contact">
                  <a href="https://github.com/Abhi241-bot" target="_blank" rel="noopener noreferrer">
                    <div className="github-logo-contact">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </div>
                  </a>
                  <a href="mailto:abhiram04122006@gmail.com" target="_blank" rel="noopener noreferrer">
                    <div className="email-logo-contact">
                      <svg fill="#ffffff" width="22" height="22" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1920 428.266v1189.54l-464.16-580.146-88.203 70.585 468.679 585.904H83.684l468.679-585.904-88.202-70.585L0 1617.805V428.265l959.944 832.441L1920 428.266ZM1919.932 226v52.627l-959.943 832.44L.045 278.628V226h1919.887Z" fillRule="evenodd"/>
                      </svg>
                    </div>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/abhiram-boini"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="linkedIn-logo-contact">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="24px" height="24px" fill="#ffffff">
                        <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.105,4,24,4z M10.954,22h-2.95 v-9.492h2.95V22z M9.449,11.151c-0.951,0-1.72-0.771-1.72-1.72c0-0.949,0.77-1.719,1.72-1.719c0.948,0,1.719,0.771,1.719,1.719 C11.168,10.38,10.397,11.151,9.449,11.151z M22.004,22h-2.948v-4.616c0-1.101-0.02-2.517-1.533-2.517 c-1.535,0-1.771,1.199-1.771,2.437V22h-2.948v-9.492h2.83v1.297h0.04c0.394-0.746,1.356-1.533,2.791-1.533 c2.987,0,3.539,1.966,3.539,4.522V22z"/>
                      </svg>
                    </div>
                  </a>
                  <a href="https://www.kaggle.com/abhiramboini" target="_blank" rel="noopener noreferrer">
                    <div className="whatsapp-logo-contact" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: "16px", fontWeight: "900", color: "#a8a8a8", fontFamily: "monospace" }}>K</span>
                    </div>
                  </a>
                </div>

                <div className="center">
                  <button className="sendBtn" type="submit">
                    <span className="sentSpan">{isEng ? "SEND" : "ENVIAR"}</span>
                  </button>
                </div>
              </div>
            </form>

            <h1 className="copyright">
              © {new Date().getFullYear()} Abhiram Boini — {isEng ? "All rights reserved." : "Todos os direitos reservados."}
            </h1>
            <a
              className="footer-privacy-link"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setPrivacyModalOpen(true);
              }}
            >
              {isEng ? "Privacy Policy" : "Política de Privacidade"}
            </a>
          </section>
        </section>
      </main>

      {/* Loading Screen */}
      {!startClicked && (
        <>
          <section
            id="loading-screen"
            className={loadingComplete ? "fade-out" : ""}
            style={{ display: loadingComplete ? "none" : "flex" }}
          >
            <div id="loader-text">
              ABHIRAM BOINI
              <div className="loader-desc">
                {isEng ? "DATA SCIENTIST & AI ENGINEER" : "CIENTISTA DE DADOS & ENGENHEIRO DE IA"}
              </div>
            </div>
            <div id="loader"></div>
            <div className="counter" id="percentage">
              {loadingPercent}%
            </div>
          </section>

          {/* Loading Screen Start Button */}
          {loadingComplete && !startClicked && (
            <section
              id="loading-screen-start"
              className="visible"
              style={{ display: "flex" }}
            >
              <div id="loader-text">
                ABHIRAM BOINI
                <div className="loader-desc">
                  {isEng ? "DATA SCIENTIST & AI ENGINEER" : "CIENTISTA DE DADOS & ENGENHEIRO DE IA"}
                </div>
              </div>
              <button
                className="start-button"
                id="start-button"
                onClick={handleStart}
              >
                {isEng ? "Start" : "Iniciar"}
              </button>
            </section>
          )}
        </>
      )}

      {/* Privacy Policy Modal */}
      {privacyModalOpen && (
        <div className="privacy-modal" style={{ display: "flex" }}>
          <div className="privacy-modal-content">
            <span
              className="privacy-modal-close"
              onClick={() => setPrivacyModalOpen(false)}
            >
              ×
            </span>
            <h2>{isEng ? "Privacy Policy" : "Política de Privacidade"}</h2>
            <div className="privacy-modal-body html-content" style={{ color: "#cbd5e1", fontSize: "14px", lineHeight: "1.6" }}>
              <p>
                {isEng
                  ? "This personal portfolio does not collect personal data from visitors without direct consent. Messages submitted through the contact form are used solely for professional communication with Abhiram Boini."
                  : "Este portfólio pessoal não coleta dados de visitantes sem consentimento explícito. Mensagens enviadas através do formulário de contato são utilizadas exclusivamente para comunicação profissional com Abhiram Boini."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Virtual Experience / Game Modal */}
      {gameModalOpen && (
        <div className="privacy-modal" style={{ display: "flex" }}>
          <div className="privacy-modal-content" style={{ maxWidth: "600px", background: "#181818", border: "1px solid #c2c2c2" }}>
            <span
              className="privacy-modal-close"
              onClick={() => setGameModalOpen(false)}
            >
              ×
            </span>
            <h2 style={{ color: "#ffffff", fontFamily: "Bitter, serif" }}>
              {isEng ? "Virtual Simulation Terminal" : "Terminal de Simulação Virtual"}
            </h2>
            <div style={{ color: "#cbd5e1", fontSize: "13px", lineHeight: "1.6", marginTop: "16px" }}>
              <p style={{ marginBottom: "12px" }}>
                {isEng
                  ? "Interactive Quant & MLOps System node initialized. All 9 production pipelines and research papers are running active live calibrations."
                  : "Nó de sistema quantitativo e MLOps inicializado. Todos os 9 pipelines e artigos de pesquisa estão com calibração ativa."}
              </p>
              <div style={{ background: "#0c0c0c", padding: "12px", borderRadius: "8px", fontFamily: "monospace", fontSize: "12px", border: "1px solid rgba(255,255,255,0.15)" }}>
                <p style={{ color: "#ffffff" }}>› System: MLOps Fraud Drift Model (PR-AUC 0.77)</p>
                <p style={{ color: "#a8a8a8" }}>› Multi-Agent LangGraph QLoRA SQL (+11% boost)</p>
                <p style={{ color: "#888888" }}>› Statistical Arbitrage (Engle-Granger p=0.0002)</p>
                <p style={{ color: "#c2c2c2" }}>› NSE Nifty 50 Options (115,709 contracts analyzed)</p>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" }}>
                <button
                  onClick={() => setGameModalOpen(false)}
                  style={{
                    padding: "8px 20px",
                    borderRadius: "50px",
                    background: "#c2c2c2",
                    color: "#121212",
                    fontWeight: "700",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {isEng ? "Close Terminal" : "Fechar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
