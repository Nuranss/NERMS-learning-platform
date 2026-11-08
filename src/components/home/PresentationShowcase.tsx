"use client";

import { useState, useEffect } from "react";
import { Activity, ShieldAlert, Cpu, Layers, Radio, Lock, CheckCircle2, RotateCw } from "lucide-react";

export function PresentationShowcase() {
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
    <div className="w-full max-w-4xl mx-auto nerms-glass-panel rounded-2xl p-5 sm:p-7 shadow-2xl relative overflow-hidden transition-all duration-300">
      {/* Presentation Showcase Header & Concept Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono font-semibold tracking-wider text-slate-300 uppercase">
            INDUSTRIAL SYSTEM EXPLORER
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-slate-400 border border-white/[0.06] hidden sm:inline">
            INTERACTIVE PREVIEW
          </span>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-950/60 border border-white/[0.06] text-xs font-mono">
          <button
            type="button"
            onClick={() => setActiveTab("physical")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "physical"
                ? "bg-emerald-500/15 text-emerald-300 font-semibold border border-emerald-500/25 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            01 Physical Control
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("purdue")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "purdue"
                ? "bg-emerald-500/15 text-emerald-300 font-semibold border border-emerald-500/25 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            02 Purdue Model
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("protocols")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "protocols"
                ? "bg-emerald-500/15 text-emerald-300 font-semibold border border-emerald-500/25 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            03 Insecure Protocols
          </button>
        </div>
      </div>

      {/* Slide 1: Physical Process Preview */}
      {activeTab === "physical" && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Live Telemetry Card 1 */}
            <div className="p-4 rounded-xl bg-slate-950/40 border border-white/[0.06] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-slate-400 block">GENERATOR ROTOR SPEED</span>
                <span className="text-xl font-mono font-bold text-emerald-400 tracking-tight">
                  {rpm} <span className="text-xs text-slate-400 font-normal">RPM</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-400/80 block mt-0.5">
                  50.0 Hz Nominal Frequency
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <RotateCw className="w-5 h-5 animate-spin" style={{ animationDuration: "6s" }} />
              </div>
            </div>

            {/* Live Telemetry Card 2 */}
            <div className="p-4 rounded-xl bg-slate-950/40 border border-white/[0.06] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-slate-400 block">HYDROSTATIC PRESSURE</span>
                <span className="text-xl font-mono font-bold text-slate-100 tracking-tight">
                  {psi} <span className="text-xs text-slate-400 font-normal">PSI</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                  Operating Range: 40-60 PSI
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Activity className="w-5 h-5" />
              </div>
            </div>

            {/* Live Telemetry Card 3 */}
            <div className="p-4 rounded-xl bg-slate-950/40 border border-white/[0.06] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-slate-400 block">SAFETY INTERLOCK (SIS)</span>
                <span className="text-sm font-mono font-bold text-emerald-400 tracking-tight block mt-1">
                  ARMED // HEALTHY
                </span>
                <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                  Fail-Safe Circuit: Online
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed pt-1">
            <strong className="text-white">Why it matters:</strong> Unlike corporate IT where an attack leaks data,
            an attack on an industrial PLC directly alters physical velocity, heat, and pressure. A single modified setpoint
            can over-spin a centrifuge or rupture a chemical valve.
          </p>
        </div>
      )}

      {/* Slide 2: Purdue Model Architecture Preview */}
      {activeTab === "purdue" && (
        <div className="space-y-3 animate-in fade-in duration-200">
          <div className="space-y-1.5 font-mono text-xs">
            <div className="p-2.5 rounded-lg bg-indigo-950/20 border border-indigo-500/20 flex items-center justify-between">
              <span className="text-indigo-300 font-bold">Level 4 // Enterprise IT</span>
              <span className="text-slate-400 text-[11px]">Corporate Laptops, Email, ERP Systems</span>
            </div>
            <div className="p-2.5 rounded-lg bg-sky-950/20 border border-sky-500/20 flex items-center justify-between">
              <span className="text-sky-300 font-bold">Level 3.5 // Industrial DMZ</span>
              <span className="text-slate-400 text-[11px]">Jump Hosts, Historian Mirror (Air-Gap Boundary)</span>
            </div>
            <div className="p-2.5 rounded-lg bg-cyan-950/20 border border-cyan-500/20 flex items-center justify-between">
              <span className="text-cyan-300 font-bold">Level 2 // Supervisory (SCADA)</span>
              <span className="text-slate-400 text-[11px]">Human-Machine Interfaces (HMIs), Plant Monitors</span>
            </div>
            <div className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-500/20 flex items-center justify-between">
              <span className="text-amber-300 font-bold">Level 1 // Basic Automation</span>
              <span className="text-slate-400 text-[11px]">Programmable Logic Controllers (PLCs), RTUs</span>
            </div>
            <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/20 flex items-center justify-between">
              <span className="text-emerald-300 font-bold">Level 0 // Physical Process</span>
              <span className="text-slate-400 text-[11px]">Valves, Pumps, Sensors, Electrical Breakers</span>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed pt-1">
            <strong className="text-white">Why it matters:</strong> The Purdue Model ensures that an adversary on the corporate network cannot route packets directly to controllers operating physical machinery.
          </p>
        </div>
      )}

      {/* Slide 3: Insecure Protocols Preview */}
      {activeTab === "protocols" && (
        <div className="space-y-3 animate-in fade-in duration-200">
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/[0.06] font-mono text-xs space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-[11px] pb-2 border-b border-white/[0.04]">
              <span>SAMPLE MODBUS TCP PACKET (PORT 502)</span>
              <span className="text-rose-400 font-bold">INSECURE BY DESIGN</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
              <div className="p-2 rounded bg-white/[0.02] border border-white/[0.04]">
                <span className="text-slate-500 block">Unit ID</span>
                <span className="text-slate-200 font-bold">0x01</span>
              </div>
              <div className="p-2 rounded bg-white/[0.02] border border-white/[0.04]">
                <span className="text-slate-500 block">Function Code</span>
                <span className="text-amber-400 font-bold">0x05 (Write Coil)</span>
              </div>
              <div className="p-2 rounded bg-white/[0.02] border border-white/[0.04]">
                <span className="text-slate-500 block">Coil Address</span>
                <span className="text-slate-200 font-bold">0x0001 (Pump 1)</span>
              </div>
              <div className="p-2 rounded bg-white/[0.02] border border-white/[0.04]">
                <span className="text-slate-500 block">Value</span>
                <span className="text-emerald-400 font-bold">0xFF00 (Force ON)</span>
              </div>
            </div>
            <div className="text-[11px] text-slate-400 pt-1">
              Authentication: <span className="text-rose-400 font-bold">None</span> • Encryption: <span className="text-rose-400 font-bold">None</span> (Cleartext)
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed pt-1">
            <strong className="text-white">Why it matters:</strong> Because protocols from the 1970s lacked authentication, anyone on the local network can force industrial coils and change critical setpoints without credentials.
          </p>
        </div>
      )}
    </div>
  );
}
