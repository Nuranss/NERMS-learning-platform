"use client";

import { Cpu, Monitor, Database, Gauge } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export function ComponentFlowDiagram() {
  const { language } = useLanguage();
  const isAz = language === "az";

  return (
    <div className="w-full my-6 p-6 sm:p-8 rounded-3xl nerms-liquid-pod space-y-5 shadow-lg">
      <div className="text-center">
        <h4 className="text-xs sm:text-sm font-semibold text-slate-100 tracking-tight">
          {isAz ? "Sənaye İdarəetmə Əks-Əlaqə Dövrəsi" : "The Industrial Control Feedback Loop"}
        </h4>
        <p className="text-xs text-slate-400 mt-1">
          {isAz
            ? "Fiziki sensorlar, kontrollerlər və ekranların real vaxt rejimində qarşılıqlı əlaqəsi"
            : "How physical sensors, automation controllers, and human displays interact in real-time"}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5 text-center text-xs">
        {/* Step 1: Physical Process */}
        <div className="p-5 rounded-2xl nerms-liquid-pod border-emerald-500/25 flex flex-col items-center justify-between">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-400/30 border-t-emerald-300/45 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] flex items-center justify-center text-emerald-300 mb-3">
            <Gauge className="w-5 h-5" />
          </div>
          <div>
            <span className="font-mono text-[10px] text-emerald-400 font-semibold block">
              {isAz ? "Səviyyə 0" : "Level 0"}
            </span>
            <strong className="text-slate-100 block mt-0.5">
              {isAz ? "Sensorlar və İcraedicilər" : "Sensors & Actuators"}
            </strong>
            <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
              {isAz
                ? "PSI, istilik, axını ölçür. Mühərriklər və klapanlar iş görür."
                : "Measures PSI, heat, flow. Motors & valves execute physical work."}
            </p>
          </div>
        </div>

        {/* Step 2: The PLC */}
        <div className="p-5 rounded-2xl nerms-liquid-pod border-amber-500/25 flex flex-col items-center justify-between">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-400/30 border-t-amber-300/45 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] flex items-center justify-center text-amber-300 mb-3">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <span className="font-mono text-[10px] text-amber-400 font-semibold block">
              {isAz ? "Səviyyə 1" : "Level 1"}
            </span>
            <strong className="text-slate-100 block mt-0.5">
              {isAz ? "PLC (Beyin)" : "PLC (The Brain)"}
            </strong>
            <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
              {isAz
                ? "Dövri avtomatlaşdırma məntiqini millisaniyələrdə icra edir."
                : "Executes cyclic automation logic (Ladder Logic) in milliseconds."}
            </p>
          </div>
        </div>

        {/* Step 3: HMI */}
        <div className="p-5 rounded-2xl nerms-liquid-pod border-cyan-500/25 flex flex-col items-center justify-between">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-400/30 border-t-cyan-300/45 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] flex items-center justify-center text-cyan-300 mb-3">
            <Monitor className="w-5 h-5" />
          </div>
          <div>
            <span className="font-mono text-[10px] text-cyan-400 font-semibold block">
              {isAz ? "Səviyyə 2" : "Level 2"}
            </span>
            <strong className="text-slate-100 block mt-0.5">HMI / SCADA</strong>
            <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
              {isAz
                ? "Operatorlar üçün animasiyalı sxemləri göstərən qrafik ekranlar."
                : "Graphical touchscreens showing animated mimics for operators."}
            </p>
          </div>
        </div>

        {/* Step 4: Historian */}
        <div className="p-5 rounded-2xl nerms-liquid-pod border-purple-500/25 flex flex-col items-center justify-between">
          <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-400/30 border-t-purple-300/45 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] flex items-center justify-center text-purple-300 mb-3">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <span className="font-mono text-[10px] text-purple-400 font-semibold block">
              {isAz ? "Səviyyə 3" : "Level 3"}
            </span>
            <strong className="text-slate-100 block mt-0.5">
              {isAz ? "Zavod Tarixçisi" : "Process Historian"}
            </strong>
            <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
              {isAz
                ? "Bütün sensor və siqnal tarixçəsini saxlayan zaman sıralı baza."
                : "Time-series database archiving decades of plant telemetry & alarms."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
