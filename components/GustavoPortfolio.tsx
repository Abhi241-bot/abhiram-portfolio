"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface ProjectItem {
  id: string;
  title: string;
  descriptions: string[];
  desc: string;
  fullDesc: string;
  tags: string[];
  githubUrl: string;
  demoUrl?: string;
  video?: string;
}

const PROJECTS_LIST: ProjectItem[] = [
  {
    id: "proj-1",
    title: "Real-Time MLOps Fraud Detection & Drift Monitoring",
    descriptions: ["FastAPI", "MLflow", "Docker", "Evidently AI", "pytest", "CI/CD"],
    desc: "End-to-end production ML system serving real-time fraud predictions at test PR-AUC 0.77 with automated Evidently drift triggers, MLflow registry promotion gates, and FastAPI zero-downtime hot-reload.",
    fullDesc: `<div class="ul-title">About the Project:</div>
<ul class="ul-description">
  <li>Built an end-to-end production system serving real-time fraud predictions at test PR-AUC 0.77 (precision 0.87 / recall 0.75) on a ~0.17%-positive imbalanced dataset.</li>
  <li>Closed the MLOps loop: Evidently AI Kolmogorov-Smirnov drift detection triggers automated retraining.</li>
  <li>MLflow registry promotion gate strictly promotes the challenger model only if it beats the incumbent on identical holdout data.</li>
  <li>FastAPI async microservice hot-reloads model weights with zero downtime.</li>
  <li>Fully containerized with Docker Compose; ruff + pytest CI via GitHub Actions.</li>
</ul>`,
    tags: ["MLflow", "FastAPI", "Docker", "Evidently AI", "scikit-learn", "pytest"],
    githubUrl: "https://github.com/Abhi241-bot",
    demoUrl: "https://github.com/Abhi241-bot",
    video: "/videos/PythonAPI_720p.mp4",
  },
  {
    id: "proj-2",
    title: "Multi-Agent Financial Analyst with QLoRA Text-to-SQL",
    descriptions: ["LangGraph", "QLoRA", "RAGAS", "DeepEval", "LangSmith", "ChromaDB", "SEC EDGAR"],
    desc: "Autonomous LangGraph multi-agent financial researcher with 4-bit QLoRA fine-tuned Text-to-SQL tool, SEC EDGAR 10-K RAG, prompt-injection guardrails, and automated RAGAS evaluations.",
    fullDesc: `<div class="ul-title">Key Architectural Features:</div>
<ul class="ul-description">
  <li>Autonomous LangGraph multi-agent workflow (planner → researcher → analyst) generating cited financial teardowns from SEC EDGAR filings.</li>
  <li>Fine-tuned Text-to-SQL with 4-bit QLoRA on Spider dataset, boosting execution accuracy from 49.0% to 54.5% (+11% relative boost).</li>
  <li>Input/output guardrails: prompt-injection intercept, regex PII filtering, and read-only SQL execution.</li>
  <li>Integrated human-in-the-loop validation checkpoints and full LangSmith distributed tracing.</li>
</ul>`,
    tags: ["LangGraph", "QLoRA", "Spider", "RAGAS", "DeepEval", "LangSmith"],
    githubUrl: "https://github.com/Abhi241-bot",
    demoUrl: "https://github.com/Abhi241-bot",
    video: "/videos/Fluxudo_480P.mp4",
  },
  {
    id: "proj-3",
    title: "Causal Inference & A/B Experimentation Platform",
    descriptions: ["DoWhy", "EconML", "CUPED", "statsmodels", "Streamlit", "Propensity Score"],
    desc: "Self-serve causal experimentation engine with automated SRM & power diagnostics, CUPED variance reduction (35-50%), and 5x bias correction under confounding.",
    fullDesc: `<div class="ul-title">Technical Highlights:</div>
<ul class="ul-description">
  <li>Pre-experiment Sample Ratio Mismatch (SRM) checks and statistical power calculations.</li>
  <li>CUPED variance reduction shrinking necessary experiment duration and sample sizes by up to 50%.</li>
  <li>Causal estimators (DoWhy, EconML): Propensity Score Matching, Difference-in-Differences, and Causal Forests.</li>
  <li>Demonstrated 5x bias recovery on confounded observational data (naive 11.0 vs true 2.0; PSM 1.6).</li>
</ul>`,
    tags: ["DoWhy", "EconML", "CUPED", "statsmodels", "Streamlit"],
    githubUrl: "https://github.com/Abhi241-bot",
    demoUrl: "https://github.com/Abhi241-bot",
    video: "/videos/Sapientum_480p.mp4",
  },
  {
    id: "proj-4",
    title: "Statistical Arbitrage / Pairs Trading (NSE Equities)",
    descriptions: ["Python", "statsmodels", "Kalman Filter", "Cointegration", "Walk-Forward", "pytest"],
    desc: "Cost-aware cointegration pairs strategy on TCS/INFY with Engle-Granger Bonferroni clearance (p=0.0002), rolling Kalman filter hedge ratios, and 9-fold walk-forward validation.",
    fullDesc: `<div class="ul-title">Methodological Breakdown:</div>
<ul class="ul-description">
  <li>Engle-Granger cointegration (p = 0.0002, Bonferroni-cleared) on TCS/INFY; spread parameters estimated strictly on train period.</li>
  <li>Honest result: in-sample Sharpe 0.97 decaying to -0.72 OOS diagnosed via rolling Kalman filter dynamic hedge ratios.</li>
  <li>Cost-sensitivity sweep proving signal breakdown rather than transaction cost drag.</li>
  <li>27-test automated pytest suite enforcing zero look-ahead bias invariants.</li>
</ul>`,
    tags: ["Statistical Arbitrage", "Kalman Filter", "Cointegration", "statsmodels", "pytest"],
    githubUrl: "https://github.com/Abhi241-bot/Quantfin1",
    video: "/videos/JavaAPI_720p.mp4",
  },
  {
    id: "proj-5",
    title: "Options Pricing & Implied Volatility Surface",
    descriptions: ["Python", "SciPy", "Black-Scholes", "Monte Carlo", "CRR Binomial", "Delta Hedging"],
    desc: "Analytical Black-Scholes Greeks, CRR binomial lattice, and Monte Carlo three-way numerical agreement proof. SPY implied volatility surface inversion and discrete delta hedging simulation.",
    fullDesc: `<div class="ul-title">Derivatives Engineering:</div>
<ul class="ul-description">
  <li>Implemented Black-Scholes (analytical Greeks), multi-step CRR binomial trees, and vectorized Monte Carlo simulation agreeing within standard error.</li>
  <li>Inverted real SPY option chains via Brent's root-finder to map empirical downward equity volatility skew (+9.6% at 7d → +5.1% at 88d).</li>
  <li>Discrete delta-hedging simulation proving error scaling as 1/√n under friction.</li>
</ul>`,
    tags: ["Options Pricing", "Black-Scholes", "Monte Carlo", "Implied Volatility", "SciPy"],
    githubUrl: "https://github.com/Abhi241-bot/Quantfin2",
    video: "/videos/VuExpensio_720p.mp4",
  },
  {
    id: "proj-6",
    title: "Multi-Factor Long-Short Equity Strategy (Nifty 100)",
    descriptions: ["Python", "pandas", "Factor Investing", "Beta Hedging", "Alpha Attribution", "Nifty 100"],
    desc: "Cross-sectional z-score factor book (momentum, low-volatility, value) on Nifty 100 with monthly rebalancing, explicit turnover costs, and point-in-time beta hedging teardown.",
    fullDesc: `<div class="ul-title">Quantitative Portfolio Construction:</div>
<ul class="ul-description">
  <li>Combined momentum, low-volatility, and value factors into standardized cross-sectional z-scores.</li>
  <li>Rigorous attribution: proved an apparent +3.1% static alpha collapsed to +0.7% once market beta exposure was stripped.</li>
  <li>Full Information Coefficient (IC) decay analysis and survivorship bias disclosures.</li>
</ul>`,
    tags: ["Factor Models", "Long-Short", "Beta Hedging", "Risk Attribution", "pandas"],
    githubUrl: "https://github.com/Abhi241-bot/Quantfin3",
    video: "/videos/JavaParkingLot_720p.mp4",
  },
  {
    id: "proj-7",
    title: "Multimodal Stress Detection using Deep Learning (IEEE)",
    descriptions: ["PyTorch", "3D-CNN", "EfficientNet", "MediaPipe", "Audio-Visual Fusion", "IEEE"],
    desc: "Hybrid 3D-CNN + EfficientNet architecture fusing facial video dynamics and acoustic spectral features with Action-Unit gating, achieving 94.7% accuracy vs 87.3% unimodal baseline.",
    fullDesc: `<div class="ul-title">Research Contributions:</div>
<ul class="ul-description">
  <li>Hybrid 3D-CNN + EfficientNet with Action-Unit gating for dynamic temporal-spectral fusion.</li>
  <li>Automated preprocessing pipeline with MediaPipe facial landmark alignment and Voice Activity Detection (VAD), reducing baseline error by 38%.</li>
  <li>Published in IEEE conference proceedings (in progress).</li>
</ul>`,
    tags: ["Deep Learning", "3D-CNN", "MediaPipe", "Multimodal AI", "IEEE"],
    githubUrl: "https://github.com/Abhi241-bot",
    video: "/videos/Face_Recon_720p.mp4",
  },
  {
    id: "proj-8",
    title: "Cross-Asset Stress-Flow Index for Drawdown Warning",
    descriptions: ["Network Econometrics", "21-Asset Panel", "Block Bootstrap", "Diebold-Yilmaz", "Drawdowns"],
    desc: "Sole-author manuscript designing a parameter-free network statistic across a 21-asset global panel leading own volatility in 64% of 145 drawdown episodes (p=0.002, block-bootstrap).",
    fullDesc: `<div class="ul-title">Econometric Innovation:</div>
<ul class="ul-description">
  <li>Formulated the Stress Flow Index (SFI): parameter-free network statistic aggregating directed stress transfer across 21 cross-asset markets (2000–2024).</li>
  <li>Out-of-sample walk-forward validation: leads asset volatility ahead of drawdowns in 64% of 145 episodes (p = 0.002 via stationary block-bootstrap).</li>
  <li>Demonstrated near-orthogonality (|ρ| ≤ 0.16) and incremental information beyond Diebold-Yilmaz connectedness.</li>
</ul>`,
    tags: ["Econometrics", "Network Models", "Drawdown Warning", "Bootstrap", "Risk Management"],
    githubUrl: "https://github.com/Abhi241-bot",
    video: "/videos/Hades_720p.mp4",
  },
  {
    id: "proj-9",
    title: "Jumps vs. Stochastic Volatility on NSE Nifty 50 Options",
    descriptions: ["Derivatives Pricing", "Heston Model", "Merton Jump-Diffusion", "Diebold-Mariano", "115K Options"],
    desc: "Empirical out-of-sample comparison of BSM, CRR, Merton jump-diffusion, and Heston stochastic volatility on 115,709 NSE option records across crash and calm regimes.",
    fullDesc: `<div class="ul-title">Empirical Pricing Findings:</div>
<ul class="ul-description">
  <li>Benchmarked 4 option models from scratch on 115,709 NSE Nifty 50 quotes using trailing realized volatility.</li>
  <li>Regime-dependent result: Heston wins calm regimes (40.4% RMSE reduction), while Merton jumps win COVID shock (27.7%), all verified at p < 0.001 via Diebold-Mariano testing.</li>
  <li>Analytical BSM-CRR equivalence used as exact numerical control.</li>
</ul>`,
    tags: ["Option Pricing", "Heston", "Merton Jumps", "Diebold-Mariano", "Quantitative Finance"],
    githubUrl: "https://github.com/Abhi241-bot",
    video: "/videos/Saturn_720p.mp4",
  },
];

// Skills Groups with Official SVG Icon Assets matching Screenshot 3
const SKILLS_AI_BACKEND = [
  { name: "Python", icon: "/images/skills/python.svg" },
  { name: "PyTorch", icon: "/images/skills/pytorch.svg" },
  { name: "TensorFlow", icon: "/images/skills/tensorflow.svg" },
  { name: "Docker", icon: "/images/skills/docker.svg" },
  { name: "FastAPI", icon: "/images/skills/fastapi.svg" },
  { name: "Pandas", icon: "/images/skills/pandas.svg" },
  { name: "NumPy", icon: "/images/skills/numpy.svg" },
  { name: "GCP", icon: "/images/skills/gcp.svg" },
  { name: "Linux", icon: "/images/skills/linux.svg" },
];

const SKILLS_FRONT_LANGS = [
  { name: "C++", icon: "/images/skills/cplusplus.svg" },
  { name: "Java", icon: "/images/skills/java.svg" },
  { name: "R", icon: "/images/skills/r.svg" },
  { name: "MySQL", icon: "/images/skills/mysql.svg" },
  { name: "PostgreSQL", icon: "/images/skills/postgresql.svg" },
  { name: "MongoDB", icon: "/images/skills/mongodb.svg" },
  { name: "JavaScript", icon: "/images/skills/javascript.svg" },
  { name: "React", icon: "/images/skills/react.svg" },
  { name: "Git", icon: "/images/skills/git.svg" },
];

export default function GustavoPortfolio() {
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

  // Callback ref for triggering Contact 3D shatter explosion from UI click
  const triggerShatterRef = useRef<(() => void) | null>(null);

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
    }, 20);
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
    document.body.style.overflowY = "scroll";
    toggleSound();
  };

  // Cache section scroll breakpoints once after layout settles
  const sectionBreakpointsRef = React.useRef({
    aboutStart: 0.20,
    serviceStart: 0.40,
    projectsStart: 0.60,
    contactStart: 0.80,
  });

  // Scroll-Spy Dot Navigation — using scrollProgress thresholds matching camera ranges
  useEffect(() => {
    // Measure section positions once after layout is complete
    const measureBreakpoints = () => {
      const totalH = document.documentElement.scrollHeight - window.innerHeight;
      if (totalH <= 0) return;
      const aboutEl = document.getElementById('about');
      const serviceEl = document.getElementById('service');
      const projectsEl = document.getElementById('projects');
      const contactEl = document.getElementById('contact');
      sectionBreakpointsRef.current = {
        aboutStart: aboutEl ? aboutEl.offsetTop / totalH : 0.20,
        serviceStart: serviceEl ? serviceEl.offsetTop / totalH : 0.40,
        projectsStart: projectsEl ? projectsEl.offsetTop / totalH : 0.60,
        contactStart: contactEl ? contactEl.offsetTop / totalH : 0.80,
      };
    };
    // Delay to let the DOM fully layout
    const t = setTimeout(measureBreakpoints, 600);
    window.addEventListener('resize', measureBreakpoints);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight || 1;
      const sp = scrollY / maxScroll;
      const dots = document.querySelectorAll(".nav__dot li");
      if (!dots.length) return;

      const { aboutStart, serviceStart, projectsStart, contactStart } = sectionBreakpointsRef.current;
      dots.forEach((d) => d.classList.remove("current"));
      if (sp < aboutStart) {
        dots[0]?.classList.add("current"); // Home
      } else if (sp < serviceStart) {
        dots[1]?.classList.add("current"); // About
      } else if (sp < projectsStart) {
        dots[2]?.classList.add("current"); // Service
      } else if (sp < contactStart) {
        dots[3]?.classList.add("current"); // Projects
      } else {
        dots[4]?.classList.add("current"); // Contact
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', measureBreakpoints);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Complete Three.js 3D WebGL Multi-Scene Engine with Raised Terrain Horizon & Concentric Shatter Mesh
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x121212, 0.0015);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(-3, 510, 100);

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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(0, 550, 200);
    scene.add(dirLight);

    // 1. HOME SCENE: Glowing Celestial Star in Sky + Flowing Heightmap Mountain Wave Terrain
    const starGeo = new THREE.SphereGeometry(1.8, 16, 16);
    const starMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const starMesh = new THREE.Mesh(starGeo, starMat);
    starMesh.position.set(-2.5, 555, -30);
    scene.add(starMesh);

    // Glowing Star Point Light
    const starLight = new THREE.PointLight(0xffffff, 3.5, 350);
    starLight.position.set(-2.5, 555, -20);
    scene.add(starLight);

    // Terrain Wireframe Plane raised upward behind the name
    const heightMap = textureLoader.load("/images/height.png");
    const alphaMap = textureLoader.load("/images/alpha.png");
    const binMap = textureLoader.load("/images/bin.png");

    const terrainGeo = new THREE.PlaneGeometry(200, 200, 96, 128);
    const terrainMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.12,
      displacementMap: heightMap,
      alphaMap: alphaMap,
      displacementScale: 24,
      wireframe: true,
      depthTest: false,
    });
    const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
    terrainMesh.rotation.x = 11;
    terrainMesh.position.set(0, 430, -80);
    terrainMesh.scale.set(1.35, 1.35, 1.35);
    scene.add(terrainMesh);

    // Binary Particle Cloud on Terrain with dynamic float animation
    const binCount = 1400;
    const binGeo = new THREE.BufferGeometry();
    const binPos = new Float32Array(binCount * 3);
    const binBasePos = new Float32Array(binCount * 3);
    for (let i = 0; i < binCount * 3; i += 3) {
      binPos[i] = (Math.random() - 0.5) * 260;
      binPos[i + 1] = (Math.random() - 0.5) * 260;
      binPos[i + 2] = (Math.random() - 0.5) * 80;
      binBasePos[i] = binPos[i];
      binBasePos[i + 1] = binPos[i + 1];
      binBasePos[i + 2] = binPos[i + 2];
    }
    binGeo.setAttribute("position", new THREE.BufferAttribute(binPos, 3));
    const binParticleMat = new THREE.PointsMaterial({
      size: 1.2,
      map: binMap,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const binParticles = new THREE.Points(binGeo, binParticleMat);
    terrainMesh.add(binParticles);

    // 2. ABOUT SCENE: Wireframe Head & Glowing Lightbulb
    const headGroup = new THREE.Group();
    headGroup.position.set(-30, 315, 0);
    headGroup.scale.set(22, 22, 22);
    headGroup.rotation.y = Math.PI / 6;
    scene.add(headGroup);

    // Lamp Point Light inside the head
    const lampLight = new THREE.PointLight(0xffffff, 2.2, 160);
    lampLight.position.set(-28, 275, 10);
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

    // 3. SERVICE SCENE: 3D Brain Model with Rotating Gears & Concentric Particle Shell
    const brainGroup = new THREE.Group();
    brainGroup.position.set(45, 150, 0);
    brainGroup.scale.set(13, 13, 13);
    brainGroup.rotation.y = 1;
    scene.add(brainGroup);

    let mixer: THREE.AnimationMixer | null = null;

    gltfLoader.load(
      "/models/brain/te3.glb",
      (gltf) => {
        // Mathematically center the brain mesh around (0, 0, 0)
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = new THREE.Vector3();
        box.getCenter(center);
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

    // Spherical Particle Shell Concentric with Brain at (45, 110, 0)
    const sphereRadius = 45;
    const sphereParticleCount = 1300;
    const sphereGeo = new THREE.BufferGeometry();
    const spherePos: number[] = [];

    for (let i = 0; i < sphereParticleCount; i++) {
      const lf = Math.acos(THREE.MathUtils.randFloatSpread(2));
      const Lv = THREE.MathUtils.randFloatSpread(360);
      const px = sphereRadius * Math.sin(lf) * Math.cos(Lv);
      const py = sphereRadius * Math.sin(lf) * Math.sin(Lv);
      const pz = sphereRadius * Math.cos(lf);
      spherePos.push(px, py, pz);
    }
    sphereGeo.setAttribute("position", new THREE.Float32BufferAttribute(spherePos, 3));
    const sphereMat = new THREE.PointsMaterial({
      color: 0x868686,
      size: 0.42,
      transparent: true,
      opacity: 0.9,
    });
    const brainOrbitParticles = new THREE.Points(sphereGeo, sphereMat);
    brainOrbitParticles.position.set(45, 150, 0);
    scene.add(brainOrbitParticles);

    // 4. CONTACT SCENE: 3D Ripple Mesh + Click Shatter Exploding Particle System
    const contactGroup = new THREE.Group();
    contactGroup.position.set(45, -180, 0);
    scene.add(contactGroup);

    // Concentric wireframe ripple disc safely on the right side
    const outerRingGeo = new THREE.TorusGeometry(14, 2.0, 16, 60);
    const outerRingMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.16,
    });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
    outerRing.rotation.x = Math.PI / 3;
    contactGroup.add(outerRing);

    const innerSphereGeo = new THREE.SphereGeometry(8, 24, 24);
    const innerSphereMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const innerSphere = new THREE.Mesh(innerSphereGeo, innerSphereMat);
    contactGroup.add(innerSphere);

    // 1,200 Exploding Shatter Shards
    const shatterCount = 1200;
    const shatterGeo = new THREE.BufferGeometry();
    const shatterPos = new Float32Array(shatterCount * 3);
    const shatterVelocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < shatterCount; i++) {
      shatterPos[i * 3] = (Math.random() - 0.5) * 14;
      shatterPos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      shatterPos[i * 3 + 2] = (Math.random() - 0.5) * 14;

      const dir = new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
      ).normalize();
      const speed = Math.random() * 2.5 + 1.0;
      shatterVelocities.push({ x: dir.x * speed, y: dir.y * speed, z: dir.z * speed });
    }

    shatterGeo.setAttribute("position", new THREE.BufferAttribute(shatterPos, 3));
    const shatterMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.6,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    });
    const shatterParticles = new THREE.Points(shatterGeo, shatterMat);
    contactGroup.add(shatterParticles);

    // Shatter explosion trigger state
    let isShattered = false;
    let shatterTime = 0;

    const triggerShatter = () => {
      if (isShattered) return;
      isShattered = true;
      shatterTime = 0;
      playSfx("/sound/shatter.mp3");

      outerRing.visible = false;
      innerSphere.visible = false;
      shatterMat.opacity = 0.95;

      const posArr = shatterGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < shatterCount; i++) {
        posArr[i * 3] = (Math.random() - 0.5) * 6;
        posArr[i * 3 + 1] = (Math.random() - 0.5) * 6;
        posArr[i * 3 + 2] = (Math.random() - 0.5) * 6;
      }
      shatterGeo.attributes.position.needsUpdate = true;

      setTimeout(() => {
        outerRing.visible = true;
        innerSphere.visible = true;
        shatterMat.opacity = 0;
        isShattered = false;
      }, 3500);
    };

    triggerShatterRef.current = triggerShatter;

    // 5. AMBIENT DRIFTING SPACE PARTICLES
    const dustCount = 800;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    const dustVelocities: { x: number; y: number; z: number }[] = [];
    for (let i = 0; i < dustCount * 3; i += 3) {
      dustPos[i] = (Math.random() - 0.5) * 500;
      dustPos[i + 1] = Math.random() * 900 - 400;
      dustPos[i + 2] = (Math.random() - 0.5) * 150;
      dustVelocities.push({
        x: (Math.random() - 0.5) * 0.05,
        y: Math.random() * 0.08 + 0.02,
        z: (Math.random() - 0.5) * 0.05,
      });
    }
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0x888888,
      size: 0.5,
      transparent: true,
      opacity: 0.45,
    });
    const dustParticles = new THREE.Points(dustGeo, dustMat);
    scene.add(dustParticles);

    // 5b. VOID FILLER — glowing debris field filling the space between Projects and Contact (y = -60 to -180)
    const voidCount = 600;
    const voidGeo = new THREE.BufferGeometry();
    const voidPos = new Float32Array(voidCount * 3);
    const voidBaseY: number[] = [];
    for (let i = 0; i < voidCount; i++) {
      const px = (Math.random() - 0.5) * 400;
      const py = -60 - Math.random() * 120; // between y=-60 and y=-180
      const pz = (Math.random() - 0.5) * 120;
      voidPos[i * 3] = px;
      voidPos[i * 3 + 1] = py;
      voidPos[i * 3 + 2] = pz;
      voidBaseY.push(py);
    }
    voidGeo.setAttribute("position", new THREE.BufferAttribute(voidPos, 3));
    const voidMat = new THREE.PointsMaterial({
      color: 0xaaaaaa,
      size: 0.8,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });
    const voidParticles = new THREE.Points(voidGeo, voidMat);
    scene.add(voidParticles);

    // 6. AMBIENT SMOKE & SPACE DUST
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

    // Interactive Raycaster
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
        lampLight.intensity = lampLight.intensity > 3.0 ? 2.2 : 5.0;
      }

      const brainIntersects = raycaster.intersectObjects(brainGroup.children, true);
      if (brainIntersects.length > 0) {
        playSfx("/sound/gearSound.mp3");
      }

      const contactIntersects = raycaster.intersectObjects(contactGroup.children, true);
      if (contactIntersects.length > 0) {
        triggerShatter();
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

      // 1. Terrain Real-time Vertex Wave Calculation
      const t = Date.now() / 200;
      const positionAttr = terrainGeo.attributes.position;
      for (let f = 0; f < positionAttr.count; f++) {
        const u = terrainGeo.attributes.uv.getX(f) * Math.PI * 16;
        const v = terrainGeo.attributes.uv.getY(f) * Math.PI * 16;
        const y = u + t;
        const x = Math.sin(y) * 0.2;
        const S = v + t;
        const T = Math.cos(S) * 0.2;
        positionAttr.setZ(f, (x + T) * 3.0);
      }
      terrainGeo.computeVertexNormals();
      positionAttr.needsUpdate = true;

      // Dynamic Binary Particle Float Animation
      const binPosArr = binGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < binCount; i++) {
        const idx = i * 3 + 2;
        binPosArr[idx] = binBasePos[idx] + Math.sin(elapsedTime * 1.5 + i * 0.2) * 4.0;
      }
      binGeo.attributes.position.needsUpdate = true;

      // 2. Head Smooth Rotation with Mouse
      headGroup.rotation.y += (targetHeadRotY - headGroup.rotation.y) * 0.05;
      headGroup.rotation.x = mouseY * 0.12;

      // 3. Brain & Particle Shell Rotation around same origin with Breathing Pulse
      brainOrbitParticles.rotation.y = elapsedTime * 0.08;
      brainOrbitParticles.rotation.x = Math.sin(elapsedTime * 0.05) * 0.1;
      const pulse = 1 + Math.sin(elapsedTime * 1.8) * 0.035;
      brainOrbitParticles.scale.set(pulse, pulse, pulse);
      brainGroup.rotation.y = 1 + Math.sin(elapsedTime * 0.3) * 0.15;

      // 4. Contact Ripple Mesh Rotation & Shatter Particle Explosion Physics
      outerRing.rotation.z = elapsedTime * 0.25;
      outerRing.rotation.y = Math.sin(elapsedTime * 0.3) * 0.2;
      innerSphere.rotation.y = -elapsedTime * 0.4;

      if (isShattered) {
        shatterTime += delta;
        const shatterPosArr = shatterGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < shatterCount; i++) {
          shatterPosArr[i * 3] += shatterVelocities[i].x * 1.2;
          shatterPosArr[i * 3 + 1] += shatterVelocities[i].y * 1.2;
          shatterPosArr[i * 3 + 2] += shatterVelocities[i].z * 1.2;
        }
        shatterGeo.attributes.position.needsUpdate = true;
        shatterMat.opacity = Math.max(0, 0.95 - shatterTime * 0.3);
      }

      // 5. Continuous Drifting Space Dust Particles
      const dustPosArr = dustGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < dustCount; i++) {
        dustPosArr[i * 3 + 1] += dustVelocities[i].y;
        if (dustPosArr[i * 3 + 1] > 650) {
          dustPosArr[i * 3 + 1] = -200;
        }
      }
      dustGeo.attributes.position.needsUpdate = true;

      // 5b. Void Filler Particles — slow drift + sinusoidal floating
      const voidPosArr = voidGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < voidCount; i++) {
        voidPosArr[i * 3 + 1] = voidBaseY[i] + Math.sin(elapsedTime * 0.4 + i * 0.5) * 6;
        voidPosArr[i * 3] += Math.sin(elapsedTime * 0.2 + i) * 0.02;
      }
      voidGeo.attributes.position.needsUpdate = true;

      // 5c. Star Orbit Animation — gentle circular orbit + mouse parallax
      starMesh.position.x = -2.5 + Math.sin(elapsedTime * 0.35) * 22 + mouseX * 14;
      starMesh.position.z = -30 + Math.cos(elapsedTime * 0.35) * 18;
      starMesh.position.y = 555 + Math.sin(elapsedTime * 0.6) * 4;
      starLight.position.set(starMesh.position.x, starMesh.position.y, starMesh.position.z + 12);

      // 6. Smoke Drift
      smokeParticles.forEach((sm, idx) => {
        sm.rotation.z += (idx % 2 === 0 ? 0.0005 : -0.0005);
      });

      // 7. Scroll-driven Camera — uses cached section breakpoints (measured once, not every frame)
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight || 1;
      const scrollProgress = scrollY / maxScroll;

      let targetY = 510;
      let targetZ = 100;
      let targetX = -3;
      let targetLookY = 510;

      const { aboutStart, serviceStart, projectsStart, contactStart } = sectionBreakpointsRef.current;

      if (scrollProgress < aboutStart) {
        // Home
        const p = aboutStart > 0 ? scrollProgress / aboutStart : 0;
        targetY = 510 - p * (510 - 315);
        targetLookY = targetY;
      } else if (scrollProgress < serviceStart) {
        // About (head at y=315)
        const range = serviceStart - aboutStart || 0.001;
        const p = (scrollProgress - aboutStart) / range;
        targetY = 315 - p * (315 - 150);
        targetLookY = targetY;
      } else if (scrollProgress < projectsStart) {
        // Service (brain at y=150)
        const range = projectsStart - serviceStart || 0.001;
        const p = (scrollProgress - serviceStart) / range;
        targetY = 150 - p * (150 - (-60));
        targetLookY = targetY;
      } else if (scrollProgress < contactStart) {
        // Projects
        const range = contactStart - projectsStart || 0.001;
        const p = (scrollProgress - projectsStart) / range;
        targetY = -60 - p * (-60 - (-120));
        targetLookY = targetY;
      } else {
        // Contact (ripple mesh at y=-180)
        const range = 1 - contactStart || 0.001;
        const p = Math.min(1, (scrollProgress - contactStart) / range);
        targetY = -120 - p * (-120 - (-180));
        targetLookY = targetY;
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

    if (triggerShatterRef.current) {
      triggerShatterRef.current();
    }

    setFormState("delivering");
    setTimeout(() => {
      setFormState("positive");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setFormState("idle"), 5000);
    }, 1200);
  };

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

      {/* Header & Sticky Navigation */}
      <header id="home">
        <nav className="menu">
          {/* Hamburger Menu Icon (3 horizontal white lines) in Top-Right */}
          <div
            className={`mobile-menu ${mobileMenuOpen ? "active" : ""}`}
            onClick={() => {
              playSfx("/sound/woosh.mp3");
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            aria-label="Toggle Navigation Menu"
          >
            <span style={{ display: "block", width: "100%", height: "2px", backgroundColor: "#ffffff", borderRadius: "2px", transition: "all 0.3s ease", transform: mobileMenuOpen ? "rotate(-45deg) translate(-5px, 6px)" : "none" }}></span>
            <span style={{ display: "block", width: "100%", height: "2px", backgroundColor: "#ffffff", borderRadius: "2px", transition: "all 0.3s ease", opacity: mobileMenuOpen ? 0 : 1 }}></span>
            <span style={{ display: "block", width: "100%", height: "2px", backgroundColor: "#ffffff", borderRadius: "2px", transition: "all 0.3s ease", transform: mobileMenuOpen ? "rotate(45deg) translate(-5px, -6px)" : "none" }}></span>
          </div>

          {/* Slide-out Navigation Drawer Menu */}
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
                About
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
                Service
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
                Projects
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
                Contact
              </a>
            </li>

            {/* Social Logos inside drawer */}
            <div className="social" style={{ display: "flex", gap: "16px", marginTop: "24px" }}>
              <a href="https://github.com/Abhi241-bot" target="_blank" rel="noopener noreferrer">
                <div className="github-logo">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
              </a>
              <a href="mailto:abhiram04122006@gmail.com" target="_blank" rel="noopener noreferrer">
                <div className="email-logo">
                  <svg fill="#ffffff" width="20" height="20" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1920 428.266v1189.54l-464.16-580.146-88.203 70.585 468.679 585.904H83.684l468.679-585.904-88.202-70.585L0 1617.805V428.265l959.944 832.441L1920 428.266ZM1919.932 226v52.627l-959.943 832.44L.045 278.628V226h1919.887Z" fillRule="evenodd"/>
                  </svg>
                </div>
              </a>
              <a href="https://www.linkedin.com/in/abhiram-boini" target="_blank" rel="noopener noreferrer">
                <div className="linkedIn-logo">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="22px" height="22px" fill="#ffffff">
                    <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.105,4,24,4z M10.954,22h-2.95 v-9.492h2.95V22z M9.449,11.151c-0.951,0-1.72-0.771-1.72-1.72c0-0.949,0.77-1.719,1.72-1.719c0.948,0,1.719,0.771,1.719,1.719 C11.168,10.38,10.397,11.151,9.449,11.151z M22.004,22h-2.948v-4.616c0-1.101-0.02-2.517-1.533-2.517 c-1.535,0-1.771,1.199-1.771,2.437V22h-2.948v-9.492h2.83v1.297h0.04c0.394-0.746,1.356-1.533,2.791-1.533 c2.987,0,3.539,1.966,3.539,4.522V22z"/>
                  </svg>
                </div>
              </a>
              <a href="https://www.kaggle.com/abhiramboini" target="_blank" rel="noopener noreferrer">
                <div className="whatsapp-logo" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: "15px", fontWeight: "900", color: "#a8a8a8", fontFamily: "monospace" }}>K</span>
                </div>
              </a>
            </div>

            {/* Music Credits */}
            <div className="music-credits" style={{ marginTop: "16px" }}>
              <a
                href="https://cryochamber.bandcamp.com/album/dream-chambers"
                className="music-txt"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "11px", color: "#777", textDecoration: "none" }}
              >
                Music: Alphaxone - Ashes Of Time
              </a>
            </div>
          </ul>
        </nav>

        {/* 5-Dot Scroll-Spy Navigation on Right */}
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

        {/* Game Button in bottom left */}
        <button
          className="game-button"
          aria-label="Open Experience"
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
        {/* Section 1: Home (Hero) - 100% Dead-Center Lock */}
        <section
          className="section"
          id="section-home"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100vw",
            maxWidth: "100%",
            minHeight: "100vh",
            margin: "0 auto",
            padding: 0,
            top: 0,
            left: 0,
            right: 0,
            transform: "none",
            position: "relative",
            zIndex: 50,
          }}
        >
          <section
            className="home"
            data-nav="data-nav"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              margin: "0 auto",
              transform: "none",
            }}
          >
            <div
              className="home-href"
              id="Home"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                margin: "0 auto",
                transform: "none",
              }}
            >
              <div
                className="name-container"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  width: "100%",
                  margin: "0 auto",
                  transform: "none",
                  left: "auto",
                  right: "auto",
                }}
              >
                <div
                  className="name-highlight"
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "center",
                    gap: "24px",
                    width: "100%",
                    margin: "0 auto 16px auto",
                    padding: 0,
                    transform: "none",
                    position: "static",
                    left: "auto",
                    right: "auto",
                  }}
                >
                  <div
                    className="name-word"
                    style={{
                      display: "inline-flex",
                      alignItems: "baseline",
                      justifyContent: "center",
                      margin: 0,
                      padding: 0,
                      transform: "none",
                    }}
                  >
                    <span
                      id="letter"
                      style={{
                        fontFamily: "'Nanum Myeongjo', serif",
                        fontWeight: 700,
                        color: "#ffffff",
                        margin: 0,
                        padding: 0,
                      }}
                    >
                      A
                    </span>
                    <span
                      id="name"
                      style={{
                        fontFamily: "'Nanum Myeongjo', serif",
                        fontWeight: 400,
                        color: "#b5b5b5",
                        letterSpacing: "0.22em",
                        margin: "0 0 0 4px",
                        padding: 0,
                      }}
                    >
                      BHIRAM
                    </span>
                  </div>

                  <div
                    className="name-word"
                    style={{
                      display: "inline-flex",
                      alignItems: "baseline",
                      justifyContent: "center",
                      margin: 0,
                      padding: 0,
                      transform: "none",
                    }}
                  >
                    <span
                      id="letter2"
                      style={{
                        fontFamily: "'Nanum Myeongjo', serif",
                        fontWeight: 700,
                        color: "#ffffff",
                        margin: 0,
                        padding: 0,
                      }}
                    >
                      B
                    </span>
                    <span
                      className="name2"
                      id="name"
                      style={{
                        fontFamily: "'Nanum Myeongjo', serif",
                        fontWeight: 400,
                        color: "#b5b5b5",
                        letterSpacing: "0.22em",
                        margin: "0 0 0 4px",
                        padding: 0,
                      }}
                    >
                      OINI
                    </span>
                  </div>
                </div>

                <div
                  className="typed-wrapper"
                  style={{
                    marginTop: "10px",
                    marginBottom: "20px",
                    width: "100%",
                    textAlign: "center",
                    margin: "0 auto",
                    transform: "none",
                  }}
                >
                  <span
                    className="typed"
                    id="typed"
                    style={{
                      fontFamily: "'Lato', sans-serif",
                      fontSize: "clamp(1.05rem, 1.8vw, 1.65rem)",
                      color: "#ffffff",
                      letterSpacing: "0.38em",
                      fontWeight: 700,
                      textShadow: "0 0 12px #ffffff, 0 0 25px rgba(255, 255, 255, 0.85), 0 0 45px rgba(255, 255, 255, 0.5)",
                      display: "inline-block",
                      margin: "0 auto",
                    }}
                  >
                    | DATA SCIENCE &amp; AI ENGINEER |
                  </span>
                </div>
              </div>
            </div>
          </section>
        </section>

        {/* Section 2: About & Skills */}
        <section className="section" id="about" data-nav="data-nav">
          <h1 className="about-title">About</h1>
          <h2 className="about-text">
            “Hello, my name is Abhiram Boini and I am a Data Science &amp; AI undergraduate at IIIT Naya Raipur with production ML experience (a deployed government AI zoo system, MLOps pipelines, LLM multi-agent tooling) and quantitative finance research on option pricing and cross-asset market stress. I care about rigor: honest reporting of negative results, proper out-of-sample walk-forward validation, and statistical significance testing show up throughout my work below. Check out my projects in this portfolio or on my GitHub. If you are interested in collaborating or working together, feel free to contact me via email or LinkedIn.”
          </h2>

          {/* Tabs Header */}
          <div className="tab-titles">
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
              Education &amp; Timeline
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
              Skills
            </p>
          </div>

          {/* Education Tab Content */}
          <div className={`tab-contents ${activeTab === "education" ? "active-tab" : ""}`} id="education">
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
                  Key Honors &amp; Certified Specializations
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

          {/* Skills Tab Content - Exact Match to Screenshot 3 with Official Icons */}
          <div className={`tab-contents ${activeTab === "skills" ? "active-tab" : ""}`} id="skills">
            <div className="skills-columns-wrapper">
              {/* Column 1: AI & Back-End */}
              <div className="skills-column">
                <h3 className="skills-column-title">AI &amp; MACHINE LEARNING</h3>
                <div className="skills-icon-grid">
                  {SKILLS_AI_BACKEND.map((sk) => (
                    <div
                      key={sk.name}
                      className="skill-card-icon"
                      title={sk.name}
                      onMouseEnter={() => playSfx("/sound/woosh.mp3")}
                    >
                      <img src={sk.icon} alt={sk.name} />
                      <span className="skill-name-tooltip">{sk.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2: Languages & Systems */}
              <div className="skills-column">
                <h3 className="skills-column-title">LANGUAGES &amp; SYSTEMS</h3>
                <div className="skills-icon-grid">
                  {SKILLS_FRONT_LANGS.map((sk) => (
                    <div
                      key={sk.name}
                      className="skill-card-icon"
                      title={sk.name}
                      onMouseEnter={() => playSfx("/sound/woosh.mp3")}
                    >
                      <img src={sk.icon} alt={sk.name} />
                      <span className="skill-name-tooltip">{sk.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Animated Download CV Button */}
          <div className="btn-cv-border">
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
              Download CV
            </a>
          </div>
        </section>

        {/* Section 3: Service */}
        <section className="section service">
          <section className="content" id="service" data-nav="data-nav">
            <h2 className="service-title">Service</h2>
            <p className="service-text">
              “You might be wondering how I can help you. As an AI Engineer and Quantitative Researcher, I transform complex data and research hypotheses into robust production systems, scalable MLOps architectures, and mathematically rigorous predictive models.”
            </p>

            <div className="service-card-wrapper">
              {/* Service Card 1 */}
              <div className="service-card" onMouseEnter={() => playSfx("/sound/woosh.mp3")}>
                <h1 className="service-card-text api-title">Production ML &amp; MLOps</h1>
                <div className="service-card-content">
                  <p className="api-text">
                    I build end-to-end containerized ML pipelines with automated drift monitoring, MLflow registry promotion gates, and FastAPI zero-downtime hot-reloading.
                  </p>
                </div>
              </div>

              {/* Service Card 2 */}
              <div className="service-card" onMouseEnter={() => playSfx("/sound/woosh.mp3")}>
                <h1 className="service-card-text web-title">Autonomous LLM Agents</h1>
                <div className="service-card-content">
                  <p className="web-text">
                    I design multi-agent LangGraph systems with 4-bit QLoRA fine-tuned tools, RAG over enterprise filings, safety guardrails, and automated RAGAS evaluations.
                  </p>
                </div>
              </div>

              {/* Service Card 3 */}
              <div className="service-card" onMouseEnter={() => playSfx("/sound/woosh.mp3")}>
                <h1 className="service-card-text desktop-title">Quantitative Finance &amp; StatArb</h1>
                <div className="service-card-content">
                  <p className="desktop-text">
                    I develop statistical arbitrage pairs strategies, options implied volatility surfaces, multi-factor risk attribution models, and cross-asset stress flow indices.
                  </p>
                </div>
              </div>

              {/* Service Card 4 */}
              <div className="service-card" onMouseEnter={() => playSfx("/sound/woosh.mp3")}>
                <h1 className="service-card-text devops-title">Computer Vision &amp; Remote Sensing</h1>
                <div className="service-card-content">
                  <p className="devops-text">
                    I engineer deep learning segmentation architectures fusing optical and SAR satellite imagery, 3D-CNNs for multimodal stress detection, and real-time facial analytics.
                  </p>
                </div>
              </div>

              {/* Service Card 5 */}
              <div className="service-card" onMouseEnter={() => playSfx("/sound/woosh.mp3")}>
                <h1 className="service-card-text database-title">Causal Inference &amp; A/B Testing</h1>
                <div className="service-card-content">
                  <p className="database-text">
                    I implement self-serve causal experimentation platforms with CUPED variance reduction (35–50%), sample ratio mismatch checks, and observational bias correction.
                  </p>
                </div>
              </div>

              {/* Service Card 6 */}
              <div className="service-card" onMouseEnter={() => playSfx("/sound/woosh.mp3")}>
                <h1 className="service-card-text cloud-title">Cloud &amp; Data Infrastructure</h1>
                <div className="service-card-content">
                  <p className="cloud-text">
                    I architect scalable cloud microservices, PostgreSQL/DuckDB pipelines, automated invariant test suites (pytest), and CI/CD automation.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </section>

        {/* Section 4: Projects (Exact 3D Perspective Carousel) */}
        <section className="section">
          <section className="content" id="projects" data-nav="data-nav">
            <h1 className="project-title">Projects</h1>
            <p className="project-text">
              “Check out some of my projects. They reflect my experience in production AI engineering, MLOps, LLM agents, and quantitative finance research.”
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
                              {proj.title}
                            </h3>
                            <p style={{ fontSize: "12px", color: "#888888", lineHeight: "1.5", display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                              {proj.desc}
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
                              VIEW PROJECT
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
                        {activeProjectModal.title}
                      </div>
                      <p className="project-description-text">
                        {activeProjectModal.desc}
                      </p>

                      <div
                        dangerouslySetInnerHTML={{
                          __html: activeProjectModal.fullDesc,
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



        {/* Section 5: Contact with Interactive 3D Exploding Mesh */}
        <section className="contact section" id="contact" onClick={() => {
          if (triggerShatterRef.current) triggerShatterRef.current();
        }}>
          <section className="content" data-nav="data-nav">
            <h2 className="contact-title">Contact</h2>

            {/* Delivering Animation */}
            {formState === "delivering" && (
              <div className="delivering" style={{ display: "block" }}>
                Sending message...
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
                    Your message has been sent successfully. I will get back to you soon!
                  </p>
                </div>
              </div>
            )}

            {/* Contact Form */}
            <form id="contact-form" onSubmit={handleFormSubmit} onClick={(e) => e.stopPropagation()}>
              <input
                type="text"
                name="from_name"
                placeholder="Name:"
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
                placeholder="Message:"
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
                    <span className="sentSpan">SEND</span>
                  </button>
                </div>
              </div>
            </form>

            <h1 className="copyright">
              © {new Date().getFullYear()} Abhiram Boini — All rights reserved.
            </h1>
            <a
              className="footer-privacy-link"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setPrivacyModalOpen(true);
              }}
            >
              Privacy Policy
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
                DATA SCIENTIST &amp; AI ENGINEER
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
                  DATA SCIENTIST &amp; AI ENGINEER
                </div>
              </div>
              <button
                className="start-button"
                id="start-button"
                onClick={handleStart}
              >
                Start
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
            <h2>Privacy Policy</h2>
            <div className="privacy-modal-body html-content" style={{ color: "#cbd5e1", fontSize: "14px", lineHeight: "1.6" }}>
              <p>
                This personal portfolio does not collect personal data from visitors without direct consent. Messages submitted through the contact form are used solely for professional communication with Abhiram Boini.
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
              Virtual Simulation Terminal
            </h2>
            <div style={{ color: "#cbd5e1", fontSize: "13px", lineHeight: "1.6", marginTop: "16px" }}>
              <p style={{ marginBottom: "12px" }}>
                Interactive Quant &amp; MLOps System node initialized. All 9 production pipelines and research papers are running active live calibrations.
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
                  Close Terminal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
