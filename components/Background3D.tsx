"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Background3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0e14, 0.002);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 80);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0a0e14, 1);

    // Group to hold all 3D objects
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // 1. Particle Constellation Network
    const particleCount = 280;
    const maxDistance = 22;
    const positions = new Float32Array(particleCount * 3);
    const velocities: THREE.Vector3[] = [];

    const bounds = { x: 120, y: 100, z: 90 };

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * bounds.x;
      const y = (Math.random() - 0.5) * bounds.y;
      const z = (Math.random() - 0.5) * bounds.z;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      velocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.08,
          (Math.random() - 0.5) * 0.08,
          (Math.random() - 0.5) * 0.08
        )
      );
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    // Cyan & Amber particle colors
    const colors = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const isAmber = i % 7 === 0;
      if (isAmber) {
        colors[i * 3] = 0.91; // R (Amber)
        colors[i * 3 + 1] = 0.72; // G
        colors[i * 3 + 2] = 0.31; // B
      } else {
        colors[i * 3] = 0.24; // R (Cyan)
        colors[i * 3 + 1] = 0.85; // G
        colors[i * 3 + 2] = 0.92; // B
      }
    }
    particleGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3)
    );

    // Point Material
    const pointMaterial = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, pointMaterial);
    worldGroup.add(particles);

    // Dynamic Connecting Lines
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x3dd9eb,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
    });

    const maxLines = 450;
    const linePositions = new Float32Array(maxLines * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3)
    );
    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    worldGroup.add(lineSegments);

    // 2. Central Neural / Geometric Core (Floating Hologram)
    const coreGeometry = new THREE.IcosahedronGeometry(18, 2);
    const coreWireframe = new THREE.WireframeGeometry(coreGeometry);
    const coreMaterial = new THREE.LineBasicMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.15,
    });
    const coreMesh = new THREE.LineSegments(coreWireframe, coreMaterial);
    coreMesh.position.set(30, 5, -20);
    worldGroup.add(coreMesh);

    // Inner glowing sphere
    const innerSphereGeo = new THREE.SphereGeometry(12, 16, 16);
    const innerSphereMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const innerSphere = new THREE.Mesh(innerSphereGeo, innerSphereMat);
    coreMesh.add(innerSphere);

    // 3. Subtle ambient dust background
    const dustCount = 400;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount * 3; i += 3) {
      dustPos[i] = (Math.random() - 0.5) * 200;
      dustPos[i + 1] = (Math.random() - 0.5) * 200;
      dustPos[i + 2] = (Math.random() - 0.5) * 200;
    }
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      size: 1.0,
      color: 0x94a3b8,
      transparent: true,
      opacity: 0.25,
    });
    const dustPoints = new THREE.Points(dustGeo, dustMat);
    worldGroup.add(dustPoints);

    // Interactive mouse parallax & scroll tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;
    let scrollY = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onScroll = () => {
      scrollY = window.scrollY;
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      // Rotate group slowly
      worldGroup.rotation.y = elapsedTime * 0.03 + currentMouseX * 0.25;
      worldGroup.rotation.x = currentMouseY * 0.15;

      // Scroll based camera dynamics
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight || 1;
      const scrollFraction = scrollY / maxScroll;
      camera.position.y = -scrollFraction * 35;
      camera.position.z = 80 + Math.sin(scrollFraction * Math.PI) * 15;
      camera.lookAt(0, -scrollFraction * 20, 0);

      // Core hologram rotation
      coreMesh.rotation.x = elapsedTime * 0.12;
      coreMesh.rotation.y = elapsedTime * 0.18;
      innerSphere.rotation.y = -elapsedTime * 0.25;

      // Move constellation particles
      const posArray = particleGeometry.attributes.position.array as Float32Array;
      let lineIndex = 0;

      for (let i = 0; i < particleCount; i++) {
        // Apply velocity
        posArray[i * 3] += velocities[i].x;
        posArray[i * 3 + 1] += velocities[i].y;
        posArray[i * 3 + 2] += velocities[i].z;

        // Bounce on boundaries
        if (Math.abs(posArray[i * 3]) > bounds.x / 2) velocities[i].x *= -1;
        if (Math.abs(posArray[i * 3 + 1]) > bounds.y / 2) velocities[i].y *= -1;
        if (Math.abs(posArray[i * 3 + 2]) > bounds.z / 2) velocities[i].z *= -1;

        // Connect nearby points
        for (let j = i + 1; j < particleCount; j++) {
          if (lineIndex >= maxLines * 6) break;

          const dx = posArray[i * 3] - posArray[j * 3];
          const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
          const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < maxDistance) {
            linePositions[lineIndex++] = posArray[i * 3];
            linePositions[lineIndex++] = posArray[i * 3 + 1];
            linePositions[lineIndex++] = posArray[i * 3 + 2];

            linePositions[lineIndex++] = posArray[j * 3];
            linePositions[lineIndex++] = posArray[j * 3 + 1];
            linePositions[lineIndex++] = posArray[j * 3 + 2];
          }
        }
      }

      // Clear remaining line coordinates
      for (let k = lineIndex; k < maxLines * 6; k++) {
        linePositions[k] = 0;
      }

      particleGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.position.needsUpdate = true;

      dustPoints.rotation.y = elapsedTime * 0.01;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);

      // Dispose Three.js objects cleanly
      particleGeometry.dispose();
      pointMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      coreGeometry.dispose();
      coreWireframe.dispose();
      coreMaterial.dispose();
      innerSphereGeo.dispose();
      innerSphereMat.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas id="main-content" ref={canvasRef} aria-hidden="true" />;
}
