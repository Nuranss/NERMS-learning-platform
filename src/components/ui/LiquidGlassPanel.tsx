"use client";

import React from "react";

export function LiquidGlassStage({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`relative w-full ${className}`}>{children}</div>;
}

export interface LiquidGlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  config?: any;
  interactive?: boolean;
  glowTint?: "emerald" | "cyan" | "amber" | "neutral";
}

export const LiquidGlassPanel = React.forwardRef<HTMLDivElement, LiquidGlassPanelProps>(
  (
    {
      children,
      className = "",
      interactive = false,
      glowTint = "emerald",
      style,
      ...rest
    },
    forwardedRef
  ) => {
    // Tint-specific specular border & chromatic aberration edge
    const tintConfig = {
      emerald: {
        border: "border-emerald-400/30 hover:border-emerald-400/50",
        rimGradient: "linear-gradient(90deg, transparent 0%, rgba(16, 185, 129, 0.4) 30%, rgba(255, 255, 255, 0.9) 50%, rgba(6, 182, 212, 0.4) 70%, transparent 100%)",
        chromaticInset: "inset 1.5px 0 0 rgba(16, 185, 129, 0.4), inset -1.5px 0 0 rgba(6, 182, 212, 0.4)",
        glowShadow: "0 16px 40px -10px rgba(0, 0, 0, 0.65), 0 0 24px -6px rgba(16, 185, 129, 0.18)",
      },
      cyan: {
        border: "border-cyan-400/30 hover:border-cyan-400/50",
        rimGradient: "linear-gradient(90deg, transparent 0%, rgba(6, 182, 212, 0.4) 30%, rgba(255, 255, 255, 0.9) 50%, rgba(59, 130, 246, 0.4) 70%, transparent 100%)",
        chromaticInset: "inset 1.5px 0 0 rgba(6, 182, 212, 0.4), inset -1.5px 0 0 rgba(59, 130, 246, 0.4)",
        glowShadow: "0 16px 40px -10px rgba(0, 0, 0, 0.65), 0 0 24px -6px rgba(6, 182, 212, 0.18)",
      },
      amber: {
        border: "border-amber-400/30 hover:border-amber-400/50",
        rimGradient: "linear-gradient(90deg, transparent 0%, rgba(245, 158, 11, 0.4) 30%, rgba(255, 255, 255, 0.9) 50%, rgba(239, 68, 68, 0.4) 70%, transparent 100%)",
        chromaticInset: "inset 1.5px 0 0 rgba(245, 158, 11, 0.4), inset -1.5px 0 0 rgba(239, 68, 68, 0.4)",
        glowShadow: "0 16px 40px -10px rgba(0, 0, 0, 0.65), 0 0 24px -6px rgba(245, 158, 11, 0.18)",
      },
      neutral: {
        border: "border-white/20 hover:border-white/35",
        rimGradient: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 30%, rgba(255, 255, 255, 0.95) 50%, rgba(255, 255, 255, 0.3) 70%, transparent 100%)",
        chromaticInset: "inset 1.5px 0 0 rgba(255, 255, 255, 0.25), inset -1.5px 0 0 rgba(255, 255, 255, 0.15)",
        glowShadow: "0 16px 40px -10px rgba(0, 0, 0, 0.65)",
      },
    }[glowTint];

    return (
      <div
        ref={forwardedRef}
        data-liquid-glass="true"
        className={`
          relative
          rounded-2xl sm:rounded-3xl
          border ${tintConfig.border}
          transition-all duration-300 ease-out
          ${interactive ? "cursor-pointer hover:translate-y-[-2px] active:translate-y-[0px] active:scale-[0.99]" : ""}
          ${className}
        `}
        style={{
          /* 0-Blur Crystal Clear Transparent Liquid Glass: NO opaque white, NO heavy background */
          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 50%, rgba(255, 255, 255, 0.035) 100%)",
          backdropFilter: "none",
          WebkitBackdropFilter: "none",
          boxShadow: `
            ${tintConfig.glowShadow},
            ${tintConfig.chromaticInset},
            inset 0 1.5px 1.5px 0 rgba(255, 255, 255, 0.45),
            inset 0 -1.5px 2px 0 rgba(0, 0, 0, 0.35)
          `,
          ...style,
        }}
        {...rest}
      >
        {/* Specular Rim Light Gradient across the top edge (Fresnel Rim Highlight) */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[1.5px] rounded-t-[inherit] pointer-events-none opacity-90 z-20"
          style={{
            background: tintConfig.rimGradient,
          }}
        />

        {/* Convex Optical Liquid Bevel Reflection */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-[inherit] pointer-events-none z-10"
          style={{
            background:
              "radial-gradient(ellipse 90% 40% at 50% 0%, rgba(255, 255, 255, 0.06) 0%, transparent 80%)",
          }}
        />

        {/* Panel Content - 100% crisp, selectable & interactive */}
        <div className="relative z-20 w-full h-full">{children}</div>
      </div>
    );
  }
);

LiquidGlassPanel.displayName = "LiquidGlassPanel";
