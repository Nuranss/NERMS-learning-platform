"use client";

import { useState, useEffect } from "react";
import { Activity, RotateCw, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useTranslation } from "@/i18n/translations";
import { GlassScene, GlassSwitch, GlassContent } from "@glass-sdk/liquid-glass";

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

  const tabs = [
    { value: "physical" as const, label: t.showcase.tabs.physical },
    { value: "purdue" as const, label: t.showcase.tabs.purdue },
    { value: "protocols" as const, label: t.showcase.tabs.protocols },
  ];

  return (
    <div className="nerms-glass-panel w-full max-w-6xl xl:max-w-7xl mx-auto rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl">
      {/* Header & Tab Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-6 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.9)]" />
          <span className="text-xs sm:text-sm font-mono font-semibold tracking-wider text-slate-100 uppercase">
            {t.showcase.title}
          </span>
          <span className="text-[10px] font-mono px-3 py-1 rounded-full nerms-liquid-pod text-slate-300 hidden sm:inline">
            {t.showcase.preview}
          </span>
        </div>

        {/* Plain glassmorphism segmented tab control */}
        <div className="flex items-center gap-1 p-1 rounded-full bg-black/40 backdrop-blur-xl border border-white/10">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-3.5 py-1.5 text-xs font-mono font-semibold rounded-full transition-all duration-200 ${
                activeTab === tab.value
                  ? "nerms-liquid-tab-active text-white"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Slide 1: Physical Process Preview */}
      {activeTab === "physical" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {/* Telemetry Card 1 — Pump RPM with liquid glass switch */}
            <GlassScene material="regular" appearance="dark" className="rounded-2xl">
              <GlassContent style={{ background: "rgba(6,9,17,0.6)" }} />
              <div className="nerms-liquid-pod rounded-2xl p-5 sm:p-6 flex flex-col gap-4 relative">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">{t.showcase.rpmLabel}</span>
                  <GlassSwitch
                    material="regular"
                    appearance="dark"
                    tint="#059669"
                    refraction={16}
                    motion="full"
                    interactive
                    checked={pumpRunning}
                    onCheckedChange={setPumpRunning}
                    aria-label="Toggle pump"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl sm:text-3xl font-mono font-bold text-emerald-400 tracking-tight drop-shadow-[0_0_12px_rgba(16,185,129,0.3)]">
                      {pumpRunning ? rpm : 0}{" "}
                      <span className="text-xs text-slate-400 font-normal">{t.showcase.rpmUnit}</span>
                    </span>
                    <span className="text-xs font-mono text-emerald-300/80 block mt-1">
                      {pumpRunning ? t.showcase.nominalFreq : "STOPPED"}
                    </span>
                  </div>
                  <div className={`w-12 h-12 rounded-2xl border border-t-emerald-300/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] flex items-center justify-center shrink-0 transition-colors duration-500 ${pumpRunning ? "bg-emerald-500/15 border-emerald-400/30 text-emerald-300" : "bg-slate-800/40 border-slate-600/30 text-slate-500"}`}>
                    <RotateCw className={`w-6 h-6 transition-all duration-500 ${pumpRunning ? "animate-spin" : ""}`} style={pumpRunning ? { animationDuration: "6s" } : {}} />
                  </div>
                </div>
              </div>
            </GlassScene>

            {/* Telemetry Card 2 — Pressure PSI with liquid glass switch */}
            <GlassScene material="regular" appearance="dark" className="rounded-2xl">
              <GlassContent style={{ background: "rgba(6,9,17,0.6)" }} />
              <div className="nerms-liquid-pod rounded-2xl p-5 sm:p-6 flex flex-col gap-4 relative">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">{t.showcase.psiLabel}</span>
                  <GlassSwitch
                    material="regular"
                    appearance="dark"
                    tint="#0891b2"
                    refraction={16}
                    motion="full"
                    interactive
                    checked={pressureMonitor}
                    onCheckedChange={setPressureMonitor}
                    aria-label="Toggle pressure monitor"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl sm:text-3xl font-mono font-bold text-slate-100 tracking-tight">
                      {pressureMonitor ? psi : "—"}{" "}
                      <span className="text-xs text-slate-400 font-normal">PSI</span>
                    </span>
                    <span className="text-xs font-mono text-slate-400 block mt-1">
                      {pressureMonitor ? t.showcase.psiRange : "MONITOR OFF"}
                    </span>
                  </div>
                  <div className={`w-12 h-12 rounded-2xl border border-t-cyan-300/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] flex items-center justify-center shrink-0 transition-colors duration-500 ${pressureMonitor ? "bg-cyan-500/15 border-cyan-400/30 text-cyan-300" : "bg-slate-800/40 border-slate-600/30 text-slate-500"}`}>
                    <Activity className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </GlassScene>

            {/* Telemetry Card 3 — SIS with liquid glass switch */}
            <GlassScene material="regular" appearance="dark" className="rounded-2xl">
              <GlassContent style={{ background: "rgba(6,9,17,0.6)" }} />
              <div className="nerms-liquid-pod rounded-2xl p-5 sm:p-6 flex flex-col gap-4 relative">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">{t.showcase.sisLabel}</span>
                  <GlassSwitch
                    material="regular"
                    appearance="dark"
                    tint="#059669"
                    refraction={16}
                    motion="full"
                    interactive
                    checked={sisArmed}
                    onCheckedChange={setSisArmed}
                    aria-label="Toggle SIS armed state"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className={`text-base sm:text-lg font-mono font-bold tracking-tight block mt-1 drop-shadow-[0_0_10px_rgba(16,185,129,0.3)] transition-colors duration-500 ${sisArmed ? "text-emerald-400" : "text-amber-400"}`}>
                      {sisArmed ? t.showcase.sisStatus : "BYPASSED"}
                    </span>
                    <span className="text-xs font-mono text-slate-400 block mt-1">
                      {t.showcase.sisCircuit}
                    </span>
                  </div>
                  <div className={`w-12 h-12 rounded-2xl border shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] flex items-center justify-center shrink-0 transition-colors duration-500 ${sisArmed ? "bg-emerald-500/15 border-emerald-400/30 border-t-emerald-300/50 text-emerald-300" : "bg-amber-500/15 border-amber-400/30 border-t-amber-300/50 text-amber-300"}`}>
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </GlassScene>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2">
            <strong className="text-white">{t.showcase.whyTitle}</strong>{" "}
            {t.showcase.physicalWhy}
          </p>
        </div>
      )}

      {/* Slide 2: Purdue Model Architecture Preview */}
      {activeTab === "purdue" && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="space-y-2.5 font-mono text-xs sm:text-sm">
            <div className="p-3.5 sm:p-4 rounded-2xl bg-indigo-950/30 border border-indigo-400/25 border-t-indigo-300/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-indigo-300 font-bold">{t.showcase.purdueLevels[0].name}</span>
              <span className="text-slate-300/80 text-xs">{t.showcase.purdueLevels[0].desc}</span>
            </div>
            <div className="p-3.5 sm:p-4 rounded-2xl bg-sky-950/30 border border-sky-400/25 border-t-sky-300/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-sky-300 font-bold">{t.showcase.purdueLevels[1].name}</span>
              <span className="text-slate-300/80 text-xs">{t.showcase.purdueLevels[1].desc}</span>
            </div>
            <div className="p-3.5 sm:p-4 rounded-2xl bg-cyan-950/30 border border-cyan-400/25 border-t-cyan-300/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-cyan-300 font-bold">{t.showcase.purdueLevels[2].name}</span>
              <span className="text-slate-300/80 text-xs">{t.showcase.purdueLevels[2].desc}</span>
            </div>
            <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-950/30 border border-amber-400/25 border-t-amber-300/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-amber-300 font-bold">{t.showcase.purdueLevels[3].name}</span>
              <span className="text-slate-300/80 text-xs">{t.showcase.purdueLevels[3].desc}</span>
            </div>
            <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-950/30 border border-emerald-400/25 border-t-emerald-300/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-emerald-300 font-bold">{t.showcase.purdueLevels[4].name}</span>
              <span className="text-slate-300/80 text-xs">{t.showcase.purdueLevels[4].desc}</span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2">
            <strong className="text-white">{t.showcase.whyTitle}</strong>{" "}
            {t.showcase.purdueWhy}
          </p>
        </div>
      )}

      {/* Slide 3: Insecure Protocols Preview */}
      {activeTab === "protocols" && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="p-5 sm:p-6 rounded-2xl nerms-liquid-pod font-mono text-xs space-y-3">
            <div className="flex items-center justify-between text-slate-300 text-xs pb-3 border-b border-white/[0.08]">
              <span>{t.showcase.modbusTitle}</span>
              <span className="text-rose-400 font-bold px-2.5 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/30">
                {t.showcase.insecureBadge}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs sm:text-sm">
              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]">
                <span className="text-slate-400 text-xs block mb-1">{t.showcase.unitId}</span>
                <span className="text-slate-100 font-bold">0x01</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]">
                <span className="text-slate-400 text-xs block mb-1">{t.showcase.functionCode}</span>
                <span className="text-amber-400 font-bold">{t.showcase.writeCoil}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]">
                <span className="text-slate-400 text-xs block mb-1">{t.showcase.coilAddress}</span>
                <span className="text-slate-100 font-bold">{t.showcase.pump1}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]">
                <span className="text-slate-400 text-xs block mb-1">{t.showcase.value}</span>
                <span className="text-emerald-400 font-bold">{t.showcase.forceOn}</span>
              </div>
            </div>
            <div className="text-xs text-slate-400 pt-2 flex items-center justify-between border-t border-white/[0.04]">
              <span><strong className="text-rose-400">{t.showcase.authNone}</strong></span>
              <span><strong className="text-rose-400">{t.showcase.encNone}</strong></span>
              <span><strong className="text-rose-400">{t.showcase.hashNone}</strong></span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2">
            <strong className="text-white">{t.showcase.whyTitle}</strong>{" "}
            {t.showcase.protocolsWhy}
          </p>
        </div>
      )}
    </div>
  );
}
