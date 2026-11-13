"use client";

import React, { useEffect, useRef, useState } from "react";

interface IndustrialAuroraProps {
  className?: string;
  enableMouseParallax?: boolean;
}

export function IndustrialAurora({
  className = "",
  enableMouseParallax = true,
}: IndustrialAuroraProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!enableMouseParallax) return;

    let rafId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse to -1 to +1 range
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 40;
      targetY = (e.clientY / innerHeight - 0.5) * 40;
    };

    const updateLoop = () => {
      // Smooth lerp (linear interpolation)
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;
      setMousePos({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(updateLoop);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [enableMouseParallax]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none overflow-hidden z-0 select-none ${className}`}
    >
      {/* Base Obsidian Carbon Surface */}
      <div className="absolute inset-0 bg-[#070a10]" />

      {/* Technical SCADA Engineering Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Subtle Circular Radial Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 50% 20%, transparent 40%, rgba(7, 10, 16, 0.85) 100%)",
        }}
      />

      {/* Fluid Industrial Cyber Aurora Orbs - The Refraction Source */}
      <div
        className="absolute inset-0 will-change-transform transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
        }}
      >
        {/* Orb 1: Primary Safety Emerald Glow */}
        <div
          className="absolute -top-[15%] left-[10%] w-[680px] h-[680px] rounded-full blur-[110px] animate-aurora-drift-1"
          style={{
            background:
              "radial-gradient(circle, rgba(16, 185, 129, 0.35) 0%, rgba(5, 150, 105, 0.15) 50%, transparent 75%)",
          }}
        />

        {/* Orb 2: Deep Cyber Cyan Telemetry Light */}
        <div
          className="absolute top-[25%] -right-[10%] w-[740px] h-[740px] rounded-full blur-[130px] animate-aurora-drift-2"
          style={{
            background:
              "radial-gradient(circle, rgba(6, 182, 212, 0.28) 0%, rgba(14, 116, 144, 0.12) 55%, transparent 75%)",
          }}
        />

        {/* Orb 3: Subdued Industrial Amber Warning Light */}
        <div
          className="absolute bottom-[5%] left-[25%] w-[620px] h-[620px] rounded-full blur-[120px] animate-aurora-drift-3"
          style={{
            background:
              "radial-gradient(circle, rgba(245, 158, 11, 0.20) 0%, rgba(180, 83, 9, 0.08) 50%, transparent 75%)",
          }}
        />

        {/* Orb 4: Deep Industrial Cobalt Core */}
        <div
          className="absolute top-[50%] left-[5%] w-[580px] h-[580px] rounded-full blur-[120px] animate-aurora-drift-4"
          style={{
            background:
              "radial-gradient(circle, rgba(30, 58, 138, 0.25) 0%, rgba(15, 23, 42, 0.10) 60%, transparent 75%)",
          }}
        />
      </div>

      {/* Fine-grain noise texture for anti-banding & analog industrial feel */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
