"use client";

import { useState, useEffect } from "react";
import { Activity, RotateCw, CheckCircle2, ShieldAlert } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useTranslation } from "@/i18n/translations";
import { LiquidGlassPanel } from "@/components/ui/LiquidGlassPanel";
import { GlassScene, GlassSwitch } from "@glass-sdk/liquid-glass";

export function PresentationShowcase() {
  const { language } = useLanguage();
  const t = useTranslation(language);

  const [activeTab, setActiveTab] = useState<"physical" | "purdue" | "protocols">("physical");
  const [rpm, setRpm] = useState(3600);
  const [psi, setPsi] = useState(48.2);
  const [pumpRunning, setPumpRunning] = useState(true);
  const [pressureMonitor, setPressureMonitor] = useState(true);
  const [sisArmed, setSisArmed] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (pumpRunning) setRpm(3595 + Math.floor(Math.random() * 12));
      else setRpm(0);
      if (pressureMonitor) setPsi(48.0 + +(Math.random() * 0.5).toFixed(1));
    }, 1200);
    return () => clearInterval(interval);
  }, [pumpRunning, pressureMonitor]);

  return (
    <LiquidGlassPanel
      glowTint="cyan"
      config={{
        blurAmount: 0.00,
        refraction: 0.85,
        chromAberration: 0.07,
        edgeHighlight: 0.22,
        specular: 0.30,
        cornerRadius: 28,
      }}
      className="w-full max-w-6xl xl:max-w-7xl mx-auto p-6 sm:p-8 lg:p-10 shadow-2xl"
    >
      {/* Header & Segmented Glass Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-6 border-b border-white/[0.08]">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs sm:text-sm font-mono font-medium text-slate-200">
            {t.showcase.title}
          </span>
        </div>

        {/* Tactile 0-Blur Liquid Glass Segmented Tab Selector */}
        <div
          role="tablist"
          className="relative inline-flex items-center p-1 rounded-full bg-black/30 border border-white/20 shadow-inner select-none self-start sm:self-auto"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "physical"}
            onClick={() => setActiveTab("physical")}
            className={`
              relative z-10 px-3.5 py-1.5 text-xs font-mono font-medium rounded-full transition-all duration-200
              ${
                activeTab === "physical"
                  ? "text-white bg-emerald-500/25 border border-emerald-400/40 shadow-[0_0_12px_rgba(16,185,129,0.3)] font-semibold"
                  : "text-slate-400 hover:text-slate-200"
              }
            `}
          >
            {t.showcase.tabs.physical}
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "purdue"}
            onClick={() => setActiveTab("purdue")}
            className={`
              relative z-10 px-3.5 py-1.5 text-xs font-mono font-medium rounded-full transition-all duration-200
              ${
                activeTab === "purdue"
                  ? "text-white bg-cyan-500/25 border border-cyan-400/40 shadow-[0_0_12px_rgba(6,182,212,0.3)] font-semibold"
                  : "text-slate-400 hover:text-slate-200"
              }
            `}
          >
            {t.showcase.tabs.purdue}
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "protocols"}
            onClick={() => setActiveTab("protocols")}
            className={`
              relative z-10 px-3.5 py-1.5 text-xs font-mono font-medium rounded-full transition-all duration-200
              ${
                activeTab === "protocols"
                  ? "text-white bg-amber-500/25 border border-amber-400/40 shadow-[0_0_12px_rgba(245,158,11,0.3)] font-semibold"
                  : "text-slate-400 hover:text-slate-200"
              }
            `}
          >
            {t.showcase.tabs.protocols}
          </button>
        </div>
      </div>

      {/* Slide 1: Physical Process Preview */}
      {activeTab === "physical" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {/* Telemetry Card 1 — Pump RPM with original GlassSwitch */}
            <div className="rounded-2xl p-5 sm:p-6 bg-white/[0.04] border border-white/20 flex flex-col gap-4 relative shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-300">{t.showcase.rpmLabel}</span>
                <GlassScene material="regular" appearance="dark">
                  <GlassSwitch
                    material="regular"
                    appearance="dark"
                    tint="#059669"
                    refraction={16}
                    motion="full"
                    interactive
                    checked={pumpRunning}
                    onCheckedChange={setPumpRunning}
                    aria-label="Toggle turbine pump state"
                  />
                </GlassScene>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl sm:text-3xl font-mono font-bold text-emerald-400 tracking-tight tabular-nums">
                    {pumpRunning ? rpm : 0}{" "}
                    <span className="text-xs text-slate-400 font-normal">{t.showcase.rpmUnit}</span>
                  </span>
                  <span className="text-xs font-mono text-emerald-300/80 block mt-1">
                    {pumpRunning ? t.showcase.nominalFreq : "STOPPED"}
                  </span>
                </div>
                <div
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 transition-colors duration-200 ${
                    pumpRunning
                      ? "bg-emerald-500/10 text-emerald-300 border-emerald-400/25 shadow-[0_0_12px_rgba(16,185,129,0.2)]"
                      : "bg-white/[0.03] text-slate-500 border-white/10"
                  }`}
                >
                  <RotateCw
                    className={`w-5 h-5 transition-all duration-300 ${
                      pumpRunning ? "animate-spin" : ""
                    }`}
                    style={pumpRunning ? { animationDuration: "6s" } : {}}
                  />
                </div>
              </div>
            </div>

            {/* Telemetry Card 2 — Pressure PSI with original GlassSwitch */}
            <div className="rounded-2xl p-5 sm:p-6 bg-white/[0.04] border border-white/20 flex flex-col gap-4 relative shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-300">{t.showcase.psiLabel}</span>
                <GlassScene material="regular" appearance="dark">
                  <GlassSwitch
                    material="regular"
                    appearance="dark"
                    tint="#0891b2"
                    refraction={16}
                    motion="full"
                    interactive
                    checked={pressureMonitor}
                    onCheckedChange={setPressureMonitor}
                    aria-label="Toggle hydrostatic pressure monitor"
                  />
                </GlassScene>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl sm:text-3xl font-mono font-bold text-slate-100 tracking-tight tabular-nums">
                    {pressureMonitor ? psi : "—"}{" "}
                    <span className="text-xs text-slate-400 font-normal">PSI</span>
                  </span>
                  <span className="text-xs font-mono text-slate-400 block mt-1">
                    {pressureMonitor ? t.showcase.psiRange : "MONITOR OFF"}
                  </span>
                </div>
                <div
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 transition-colors duration-200 ${
                    pressureMonitor
                      ? "bg-cyan-500/10 text-cyan-300 border-cyan-400/25 shadow-[0_0_12px_rgba(6,182,212,0.2)]"
                      : "bg-white/[0.03] text-slate-500 border-white/10"
                  }`}
                >
                  <Activity className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Telemetry Card 3 — SIS with original GlassSwitch */}
            <div className="rounded-2xl p-5 sm:p-6 bg-white/[0.04] border border-white/20 flex flex-col gap-4 relative shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-300">{t.showcase.sisLabel}</span>
                <GlassScene material="regular" appearance="dark">
                  <GlassSwitch
                    material="regular"
                    appearance="dark"
                    tint="#059669"
                    refraction={16}
                    motion="full"
                    interactive
                    checked={sisArmed}
                    onCheckedChange={setSisArmed}
                    aria-label="Toggle Safety Instrumented System circuit"
                  />
                </GlassScene>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span
                    className={`text-base sm:text-lg font-mono font-bold tracking-tight block mt-1 transition-colors duration-200 ${
                      sisArmed ? "text-emerald-400" : "text-amber-400"
                    }`}
                  >
                    {sisArmed ? t.showcase.sisStatus : "BYPASSED"}
                  </span>
                  <span className="text-xs font-mono text-slate-400 block mt-1">
                    {t.showcase.sisCircuit}
                  </span>
                </div>
                <div
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 transition-colors duration-200 ${
                    sisArmed
                      ? "bg-emerald-500/10 text-emerald-300 border-emerald-400/25 shadow-[0_0_12px_rgba(16,185,129,0.2)]"
                      : "bg-amber-500/10 text-amber-300 border-amber-400/25 shadow-[0_0_12px_rgba(245,158,11,0.2)]"
                  }`}
                >
                  {sisArmed ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <ShieldAlert className="w-5 h-5" />
                  )}
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2 max-w-prose">
            <strong className="text-white font-semibold">{t.showcase.whyTitle}</strong>{" "}
            {t.showcase.physicalWhy}
          </p>
        </div>
      )}

      {/* Slide 2: Purdue Model Architecture Preview */}
      {activeTab === "purdue" && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="space-y-2 font-mono text-xs sm:text-sm">
            <div className="p-3.5 sm:p-4 rounded-xl bg-indigo-950/20 border border-indigo-400/20 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-indigo-300 font-semibold">{t.showcase.purdueLevels[0].name}</span>
              <span className="text-slate-400 text-xs">{t.showcase.purdueLevels[0].desc}</span>
            </div>
            <div className="p-3.5 sm:p-4 rounded-xl bg-sky-950/20 border border-sky-400/20 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-sky-300 font-semibold">{t.showcase.purdueLevels[1].name}</span>
              <span className="text-slate-400 text-xs">{t.showcase.purdueLevels[1].desc}</span>
            </div>
            <div className="p-3.5 sm:p-4 rounded-xl bg-cyan-950/20 border border-cyan-400/20 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-cyan-300 font-semibold">{t.showcase.purdueLevels[2].name}</span>
              <span className="text-slate-400 text-xs">{t.showcase.purdueLevels[2].desc}</span>
            </div>
            <div className="p-3.5 sm:p-4 rounded-xl bg-amber-950/20 border border-amber-400/20 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-amber-300 font-semibold">{t.showcase.purdueLevels[3].name}</span>
              <span className="text-slate-400 text-xs">{t.showcase.purdueLevels[3].desc}</span>
            </div>
            <div className="p-3.5 sm:p-4 rounded-xl bg-emerald-950/20 border border-emerald-400/20 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-emerald-300 font-semibold">{t.showcase.purdueLevels[4].name}</span>
              <span className="text-slate-400 text-xs">{t.showcase.purdueLevels[4].desc}</span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2 max-w-prose">
            <strong className="text-white font-semibold">{t.showcase.whyTitle}</strong>{" "}
            {t.showcase.purdueWhy}
          </p>
        </div>
      )}

      {/* Slide 3: Insecure Protocols Preview */}
      {activeTab === "protocols" && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/15 backdrop-blur-xl font-mono text-xs space-y-3 shadow-lg">
            <div className="flex items-center justify-between text-slate-300 text-xs pb-3 border-b border-white/[0.08]">
              <span>{t.showcase.modbusTitle}</span>
              <span className="text-rose-400 font-medium px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20">
                {t.showcase.insecureBadge}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs sm:text-sm">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <span className="text-slate-400 text-xs block mb-1">{t.showcase.unitId}</span>
                <span className="text-slate-100 font-semibold tabular-nums">0x01</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <span className="text-slate-400 text-xs block mb-1">{t.showcase.functionCode}</span>
                <span className="text-amber-300 font-semibold tabular-nums">{t.showcase.writeCoil}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <span className="text-slate-400 text-xs block mb-1">{t.showcase.coilAddress}</span>
                <span className="text-slate-100 font-semibold tabular-nums">{t.showcase.pump1}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <span className="text-slate-400 text-xs block mb-1">{t.showcase.value}</span>
                <span className="text-emerald-400 font-semibold tabular-nums">{t.showcase.forceOn}</span>
              </div>
            </div>
            <div className="text-xs text-slate-400 pt-2 flex items-center justify-between border-t border-white/[0.04]">
              <span><strong className="text-rose-400">{t.showcase.authNone}</strong></span>
              <span><strong className="text-rose-400">{t.showcase.encNone}</strong></span>
              <span><strong className="text-rose-400">{t.showcase.hashNone}</strong></span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2 max-w-prose">
            <strong className="text-white font-semibold">{t.showcase.whyTitle}</strong>{" "}
            {t.showcase.protocolsWhy}
          </p>
        </div>
      )}
    </LiquidGlassPanel>
  );
}
