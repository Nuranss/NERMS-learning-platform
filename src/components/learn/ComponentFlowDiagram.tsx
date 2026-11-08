"use client";

import { Cpu, Monitor, Database, Gauge } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export function ComponentFlowDiagram() {
  const { language } = useLanguage();
  const isAz = language === "az";

  return (
    <div className="w-full my-6 p-5 sm:p-6 rounded-2xl bg-slate-900/30 border border-white/[0.06] space-y-4">
      <div className="text-center">
        <h4 className="text-xs sm:text-sm font-semibold text-slate-100 tracking-tight">
          {isAz ? "Sənaye İdarəetmə Əks-Əlaqə Dövrəsi" : "The Industrial Control Feedback Loop"}
        </h4>
        <p className="text-xs text-slate-400 mt-0.5">
          {isAz
            ? "Fiziki sensorlar, kontrollerlər və ekranların real vaxt rejimində qarşılıqlı əlaqəsi"
            : "How physical sensors, automation controllers, and human displays interact in real-time"}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-center text-xs">
        {/* Step 1: Physical Process */}
        <div className="p-4 rounded-xl bg-slate-950/40 border border-emerald-500/20 flex flex-col items-center justify-between">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-2.5">
            <Gauge className="w-4 h-4" />
          </div>
          <div>
            <span className="font-mono text-[10px] text-emerald-400 font-bold block">
              {isAz ? "SƏVİYYƏ 0" : "LEVEL 0"}
            </span>
            <strong className="text-slate-100 block mt-0.5">
              {isAz ? "Sensorlar və İcraedicilər" : "Sensors & Actuators"}
            </strong>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              {isAz
                ? "PSI, istilik, axını ölçür. Mühərriklər və klapanlar iş görür."
                : "Measures PSI, heat, flow. Motors & valves execute physical work."}
            </p>
          </div>
        </div>

        {/* Step 2: The PLC */}
        <div className="p-4 rounded-xl bg-slate-950/40 border border-amber-500/20 flex flex-col items-center justify-between">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-2.5">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <span className="font-mono text-[10px] text-amber-400 font-bold block">
              {isAz ? "SƏVİYYƏ 1" : "LEVEL 1"}
            </span>
            <strong className="text-slate-100 block mt-0.5">
              {isAz ? "PLC (Beyin)" : "PLC (The Brain)"}
            </strong>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              {isAz
                ? "Dövri avtomatlaşdırma məntiqini millisaniyələrdə icra edir."
                : "Executes cyclic automation logic (Ladder Logic) in milliseconds."}
            </p>
          </div>
        </div>

        {/* Step 3: HMI */}
        <div className="p-4 rounded-xl bg-slate-950/40 border border-cyan-500/20 flex flex-col items-center justify-between">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-2.5">
            <Monitor className="w-4 h-4" />
          </div>
          <div>
            <span className="font-mono text-[10px] text-cyan-400 font-bold block">
              {isAz ? "SƏVİYYƏ 2" : "LEVEL 2"}
            </span>
            <strong className="text-slate-100 block mt-0.5">HMI / SCADA</strong>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              {isAz
                ? "Operatorlar üçün animasiyalı sxemləri göstərən qrafik ekranlar."
                : "Graphical touchscreens showing animated mimics for operators."}
            </p>
          </div>
        </div>

        {/* Step 4: Historian */}
        <div className="p-4 rounded-xl bg-slate-950/40 border border-purple-500/20 flex flex-col items-center justify-between">
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-2.5">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <span className="font-mono text-[10px] text-purple-400 font-bold block">
              {isAz ? "SƏVİYYƏ 3" : "LEVEL 3"}
            </span>
            <strong className="text-slate-100 block mt-0.5">
              {isAz ? "Proses Tarixçisi" : "Process Historian"}
            </strong>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              {isAz
                ? "Uyğunluq, siqnallar və auditlər üçün yüksək sürətli zaman sıralı qeyd."
                : "High-speed time-series logging for compliance, alarms, and audits."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
