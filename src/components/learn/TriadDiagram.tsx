"use client";

import { Shield, Activity, Lock, AlertCircle } from "lucide-react";

export function TriadDiagram() {
  return (
    <div className="w-full my-6 p-5 sm:p-6 rounded-2xl bg-slate-900/30 border border-white/[0.06] shadow-sm">
      <div className="text-center mb-5">
        <h4 className="text-xs sm:text-sm font-semibold text-slate-100 tracking-tight">
          The Core Paradigm Shift: IT vs. OT Priorities
        </h4>
        <p className="text-xs text-slate-400 mt-0.5">
          Why standard corporate IT security policies can disrupt an industrial facility
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Traditional IT: CIA Triad */}
        <div className="p-4 sm:p-5 rounded-xl bg-slate-950/40 border border-white/[0.06] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-mono text-cyan-400 tracking-wide">TRADITIONAL IT</span>
            <span className="text-[11px] font-mono text-slate-400">"CIA TRIAD"</span>
          </div>

          <div className="space-y-2">
            <div className="p-2.5 rounded-lg bg-cyan-950/20 border border-cyan-500/20 flex items-center gap-3">
              <span className="w-6 h-6 rounded-md bg-cyan-500/15 text-cyan-300 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                1
              </span>
              <div>
                <p className="text-xs font-semibold text-slate-100">Confidentiality (Priority #1)</p>
                <p className="text-[11px] text-slate-400 leading-tight">Protect customer records, credentials, and business IP.</p>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900/40 border border-white/[0.04] flex items-center gap-3">
              <span className="w-6 h-6 rounded-md bg-slate-800/80 text-slate-300 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                2
              </span>
              <div>
                <p className="text-xs font-semibold text-slate-200">Integrity</p>
                <p className="text-[11px] text-slate-400 leading-tight">Ensure financial records and databases remain untampered.</p>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900/30 border border-white/[0.04] flex items-center gap-3">
              <span className="w-6 h-6 rounded-md bg-slate-800/60 text-slate-400 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                3
              </span>
              <div>
                <p className="text-xs font-semibold text-slate-300">Availability</p>
                <p className="text-[11px] text-slate-400 leading-tight">Acceptable to reboot or take servers offline for scheduled maintenance.</p>
              </div>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 italic pt-1 border-t border-white/[0.04]">
            Failure outcome: Data exposure, regulatory fines, business disruption.
          </p>
        </div>

        {/* Industrial OT: AIC Triad */}
        <div className="p-4 sm:p-5 rounded-xl bg-slate-950/40 border border-emerald-500/20 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-mono text-emerald-400 tracking-wide">OPERATIONAL TECH (OT)</span>
            <span className="text-[11px] font-mono text-emerald-400/80">"AIC / SAFETY FIRST"</span>
          </div>

          <div className="space-y-2">
            <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/25 flex items-center gap-3">
              <span className="w-6 h-6 rounded-md bg-emerald-500/15 text-emerald-300 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                1
              </span>
              <div>
                <p className="text-xs font-semibold text-slate-100">Availability & Safety (Priority #1)</p>
                <p className="text-[11px] text-slate-300 leading-tight">Uninterrupted 24/7/365 runtime. Unplanned reboots can cause damage.</p>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900/40 border border-white/[0.04] flex items-center gap-3">
              <span className="w-6 h-6 rounded-md bg-slate-800/80 text-slate-300 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                2
              </span>
              <div>
                <p className="text-xs font-semibold text-slate-200">Integrity</p>
                <p className="text-[11px] text-slate-400 leading-tight">Sensor readings and valve control commands must be 100% accurate.</p>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900/30 border border-white/[0.04] flex items-center gap-3">
              <span className="w-6 h-6 rounded-md bg-slate-800/60 text-slate-400 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                3
              </span>
              <div>
                <p className="text-xs font-semibold text-slate-300">Confidentiality</p>
                <p className="text-[11px] text-slate-400 leading-tight">Secondary. Packets are often plain text to eliminate crypto latency.</p>
              </div>
            </div>
          </div>
          <p className="text-[11px] text-emerald-400/80 italic pt-1 border-t border-white/[0.04]">
            Failure outcome: Equipment damage, pipeline rupture, regional blackout, injury.
          </p>
        </div>
      </div>
    </div>
  );
}
