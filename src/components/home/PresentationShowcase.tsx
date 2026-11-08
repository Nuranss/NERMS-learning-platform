"use client";

import { useState, useEffect } from "react";
import { Activity, RotateCw, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useTranslation } from "@/i18n/translations";

export function PresentationShowcase() {
  const { language } = useLanguage();
  const t = useTranslation(language);

  const [activeTab, setActiveTab] = useState<"physical" | "purdue" | "protocols">("physical");
  const [rpm, setRpm] = useState(3600);
  const [psi, setPsi] = useState(48.2);

  // Gentle live telemetry simulation for the physical presentation
  useEffect(() => {
    const interval = setInterval(() => {
      setRpm((prev) => 3595 + Math.floor(Math.random() * 12));
      setPsi((prev) => 48.0 + +(Math.random() * 0.5).toFixed(1));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-6xl xl:max-w-7xl mx-auto nerms-glass-panel rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden transition-all duration-300">
      {/* Presentation Showcase Header & Concept Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-6 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs sm:text-sm font-mono font-semibold tracking-wider text-slate-200 uppercase">
            {t.showcase.title}
          </span>
          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-white/[0.04] text-slate-400 border border-white/[0.06] hidden sm:inline">
            {t.showcase.preview}
          </span>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950/60 border border-white/[0.06] text-xs font-mono">
          <button
            type="button"
            onClick={() => setActiveTab("physical")}
            className={`px-3.5 py-2 rounded-lg transition-all ${
              activeTab === "physical"
                ? "bg-emerald-500/15 text-emerald-300 font-semibold border border-emerald-500/25 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {t.showcase.tabs.physical}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("purdue")}
            className={`px-3.5 py-2 rounded-lg transition-all ${
              activeTab === "purdue"
                ? "bg-emerald-500/15 text-emerald-300 font-semibold border border-emerald-500/25 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {t.showcase.tabs.purdue}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("protocols")}
            className={`px-3.5 py-2 rounded-lg transition-all ${
              activeTab === "protocols"
                ? "bg-emerald-500/15 text-emerald-300 font-semibold border border-emerald-500/25 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {t.showcase.tabs.protocols}
          </button>
        </div>
      </div>

      {/* Slide 1: Physical Process Preview */}
      {activeTab === "physical" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {/* Live Telemetry Card 1 */}
            <div className="p-5 sm:p-6 rounded-xl bg-slate-950/50 border border-white/[0.06] flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-slate-400 block mb-1">
                  {t.showcase.rpmLabel}
                </span>
                <span className="text-2xl sm:text-3xl font-mono font-bold text-emerald-400 tracking-tight">
                  {rpm} <span className="text-xs text-slate-400 font-normal">{t.showcase.rpmUnit}</span>
                </span>
                <span className="text-xs font-mono text-emerald-400/80 block mt-1">
                  {t.showcase.nominalFreq}
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <RotateCw className="w-6 h-6 animate-spin" style={{ animationDuration: "6s" }} />
              </div>
            </div>

            {/* Live Telemetry Card 2 */}
            <div className="p-5 sm:p-6 rounded-xl bg-slate-950/50 border border-white/[0.06] flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-slate-400 block mb-1">
                  {t.showcase.psiLabel}
                </span>
                <span className="text-2xl sm:text-3xl font-mono font-bold text-slate-100 tracking-tight">
                  {psi} <span className="text-xs text-slate-400 font-normal">PSI</span>
                </span>
                <span className="text-xs font-mono text-slate-400 block mt-1">
                  {t.showcase.psiRange}
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                <Activity className="w-6 h-6" />
              </div>
            </div>

            {/* Live Telemetry Card 3 */}
            <div className="p-5 sm:p-6 rounded-xl bg-slate-950/50 border border-white/[0.06] flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-slate-400 block mb-1">
                  {t.showcase.sisLabel}
                </span>
                <span className="text-base sm:text-lg font-mono font-bold text-emerald-400 tracking-tight block mt-1">
                  {t.showcase.sisStatus}
                </span>
                <span className="text-xs font-mono text-slate-400 block mt-1">
                  {t.showcase.sisCircuit}
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </div>
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
          <div className="space-y-2 font-mono text-xs sm:text-sm">
            <div className="p-3 sm:p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-indigo-300 font-bold">{t.showcase.purdueLevels[0].name}</span>
              <span className="text-slate-400 text-xs">{t.showcase.purdueLevels[0].desc}</span>
            </div>
            <div className="p-3 sm:p-3.5 rounded-xl bg-sky-950/20 border border-sky-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-sky-300 font-bold">{t.showcase.purdueLevels[1].name}</span>
              <span className="text-slate-400 text-xs">{t.showcase.purdueLevels[1].desc}</span>
            </div>
            <div className="p-3 sm:p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-cyan-300 font-bold">{t.showcase.purdueLevels[2].name}</span>
              <span className="text-slate-400 text-xs">{t.showcase.purdueLevels[2].desc}</span>
            </div>
            <div className="p-3 sm:p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-amber-300 font-bold">{t.showcase.purdueLevels[3].name}</span>
              <span className="text-slate-400 text-xs">{t.showcase.purdueLevels[3].desc}</span>
            </div>
            <div className="p-3 sm:p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-emerald-300 font-bold">{t.showcase.purdueLevels[4].name}</span>
              <span className="text-slate-400 text-xs">{t.showcase.purdueLevels[4].desc}</span>
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
          <div className="p-4 sm:p-5 rounded-xl bg-slate-950/60 border border-white/[0.06] font-mono text-xs space-y-3">
            <div className="flex items-center justify-between text-slate-400 text-xs pb-3 border-b border-white/[0.04]">
              <span>{t.showcase.modbusTitle}</span>
              <span className="text-rose-400 font-bold">{t.showcase.insecureBadge}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs sm:text-sm">
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                <span className="text-slate-500 text-xs block mb-1">{t.showcase.unitId}</span>
                <span className="text-slate-200 font-bold">0x01</span>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                <span className="text-slate-500 text-xs block mb-1">{t.showcase.functionCode}</span>
                <span className="text-amber-400 font-bold">{t.showcase.writeCoil}</span>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                <span className="text-slate-500 text-xs block mb-1">{t.showcase.coilAddress}</span>
                <span className="text-slate-200 font-bold">{t.showcase.pump1}</span>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                <span className="text-slate-500 text-xs block mb-1">{t.showcase.value}</span>
                <span className="text-emerald-400 font-bold">{t.showcase.forceOn}</span>
              </div>
            </div>
            <div className="text-xs text-slate-400 pt-1 flex items-center justify-between">
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
