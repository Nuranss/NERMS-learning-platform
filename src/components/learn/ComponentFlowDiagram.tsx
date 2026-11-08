"use client";

import { Activity, ArrowRight, ArrowLeftRight, Cpu, Monitor, Database, Gauge } from "lucide-react";

export function ComponentFlowDiagram() {
  return (
    <div className="w-full my-6 p-5 rounded-2xl bg-slate-900/40 border border-white/[0.08] space-y-4">
      <div className="text-center">
        <h4 className="text-sm font-semibold text-slate-200">The Industrial Control Feedback Loop</h4>
        <p className="text-xs text-slate-400">How sensors, controllers, and human interfaces communicate in real time</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-center text-xs">
        {/* Step 1: Physical Process */}
        <div className="p-3.5 rounded-xl bg-slate-950/70 border border-emerald-500/30 flex flex-col items-center justify-between">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
            <Gauge className="w-4 h-4" />
          </div>
          <div>
            <span className="font-mono text-[10px] text-emerald-400 font-bold block">LEVEL 0</span>
            <strong className="text-slate-100 block">Sensors & Actuators</strong>
            <p className="text-[11px] text-slate-400 mt-1">Measures PSI, heat, flow. Opens/closes physical valves.</p>
          </div>
        </div>

        {/* Step 2: The PLC */}
        <div className="p-3.5 rounded-xl bg-slate-950/70 border border-amber-500/30 flex flex-col items-center justify-between">
          <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-2">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <span className="font-mono text-[10px] text-amber-400 font-bold block">LEVEL 1</span>
            <strong className="text-slate-100 block">PLC (The Brain)</strong>
            <p className="text-[11px] text-slate-400 mt-1">Executes cyclic logic (Ladder Logic) in milliseconds.</p>
          </div>
        </div>

        {/* Step 3: HMI */}
        <div className="p-3.5 rounded-xl bg-slate-950/70 border border-cyan-500/30 flex flex-col items-center justify-between">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-400 mb-2">
            <Monitor className="w-4 h-4" />
          </div>
          <div>
            <span className="font-mono text-[10px] text-cyan-400 font-bold block">LEVEL 2</span>
            <strong className="text-slate-100 block">HMI / SCADA</strong>
            <p className="text-[11px] text-slate-400 mt-1">Operator screens showing animated graphical plant mimics.</p>
          </div>
        </div>

        {/* Step 4: Historian */}
        <div className="p-3.5 rounded-xl bg-slate-950/70 border border-purple-500/30 flex flex-col items-center justify-between">
          <div className="w-8 h-8 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-2">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <span className="font-mono text-[10px] text-purple-400 font-bold block">LEVEL 3</span>
            <strong className="text-slate-100 block">Data Historian</strong>
            <p className="text-[11px] text-slate-400 mt-1">Immutable time-series telemetry archive for auditing.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
