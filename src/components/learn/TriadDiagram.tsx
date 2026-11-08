"use client";

import { Shield, Activity, Lock, AlertCircle, Check } from "lucide-react";

export function TriadDiagram() {
  return (
    <div className="w-full my-6 p-5 rounded-2xl bg-slate-900/40 border border-white/[0.08]">
      <div className="text-center mb-5">
        <h4 className="text-sm font-semibold text-slate-200">The Core Paradigm Shift: IT vs. OT Priorities</h4>
        <p className="text-xs text-slate-400">Why standard corporate IT security rules can break an industrial plant</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Traditional IT: CIA Triad */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-mono text-cyan-400">TRADITIONAL IT</span>
            <span className="text-[11px] font-mono text-slate-400">"CIA TRIAD"</span>
          </div>

          <div className="space-y-2">
            <div className="p-2.5 rounded-lg bg-cyan-950/30 border border-cyan-500/30 flex items-center gap-3">
              <span className="w-6 h-6 rounded-md bg-cyan-500/20 text-cyan-300 font-mono font-bold text-xs flex items-center justify-center">
                1
              </span>
              <div>
                <p className="text-xs font-semibold text-slate-100">Confidentiality (Top Priority)</p>
                <p className="text-[11px] text-slate-400">Protect customer data, passwords, and secrets from leaks.</p>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900/60 border border-white/5 flex items-center gap-3">
              <span className="w-6 h-6 rounded-md bg-slate-800 text-slate-300 font-mono font-bold text-xs flex items-center justify-center">
                2
              </span>
              <div>
                <p className="text-xs font-semibold text-slate-200">Integrity</p>
                <p className="text-[11px] text-slate-400">Prevent unauthorized modification of records and databases.</p>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900/40 border border-white/5 flex items-center gap-3">
              <span className="w-6 h-6 rounded-md bg-slate-800 text-slate-400 font-mono font-bold text-xs flex items-center justify-center">
                3
              </span>
              <div>
                <p className="text-xs font-semibold text-slate-300">Availability</p>
                <p className="text-[11px] text-slate-400">Acceptable to reboot or take offline overnight for patching.</p>
              </div>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 italic pt-1 border-t border-white/5">
            Failure outcome: Data breach, reputational loss, financial penalties.
          </p>
        </div>

        {/* Industrial OT: AIC Triad */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-emerald-500/20 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-mono text-emerald-400">OPERATIONAL TECH (OT)</span>
            <span className="text-[11px] font-mono text-emerald-400/80">"AIC / SAFETY FIRST"</span>
          </div>

          <div className="space-y-2">
            <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 flex items-center gap-3">
              <span className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-300 font-mono font-bold text-xs flex items-center justify-center">
                1
              </span>
              <div>
                <p className="text-xs font-semibold text-slate-100">Availability & Human Safety (Top Priority)</p>
                <p className="text-[11px] text-slate-400">Continuous 24/7 runtime. Systems cannot reboot during production.</p>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900/60 border border-white/5 flex items-center gap-3">
              <span className="w-6 h-6 rounded-md bg-slate-800 text-slate-300 font-mono font-bold text-xs flex items-center justify-center">
                2
              </span>
              <div>
                <p className="text-xs font-semibold text-slate-200">Integrity</p>
                <p className="text-[11px] text-slate-400">Sensor values & control commands must never be spoofed or delayed.</p>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900/40 border border-white/5 flex items-center gap-3">
              <span className="w-6 h-6 rounded-md bg-slate-800 text-slate-400 font-mono font-bold text-xs flex items-center justify-center">
                3
              </span>
              <div>
                <p className="text-xs font-semibold text-slate-300">Confidentiality</p>
                <p className="text-[11px] text-slate-400">Secondary. Packets are often plain text to prevent crypto latency.</p>
              </div>
            </div>
          </div>
          <p className="text-[11px] text-emerald-400/80 italic pt-1 border-t border-white/5">
            Failure outcome: Explosion, pipeline rupture, blackout, loss of human life.
          </p>
        </div>
      </div>
    </div>
  );
}
