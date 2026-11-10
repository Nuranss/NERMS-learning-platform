"use client";

import { useMemo } from "react";
import { SCADAPlantState } from "@/mock/plantInitialState";
import { Activity, AlertOctagon, Gauge, Droplets, RotateCw, Power, CheckCircle, ShieldAlert } from "lucide-react";
import {
  GlassScene,
  GlassSwitch,
  GlassContent,
} from "@glass-sdk/liquid-glass";

interface WaterPlantMimicProps {
  state: SCADAPlantState;
  onTogglePump?: () => void;
  onToggleValve?: () => void;
}

export function WaterPlantMimic({ state, onTogglePump, onToggleValve }: WaterPlantMimicProps) {
  // Compute percentage height (0 - 1000 cm scaled to 0% - 100%)
  const levelPercentage = Math.min(100, Math.max(5, (state.waterLevelCm / 1000) * 100));
  const maxSafePercentage = Math.min(100, (state.maxSafeLevelCm / 1000) * 100);
  
  const isHighLevel = state.waterLevelCm >= state.maxSafeLevelCm;
  const isCritical = state.waterLevelCm >= 900 || state.isOverflowing;

  return (
    <GlassScene material="regular" appearance="dark" className="w-full">
      <div className="w-full nerms-glass-panel rounded-3xl p-5 sm:p-6 shadow-2xl relative overflow-hidden flex flex-col">
        {/* Header bar with SCADA station details */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-white/[0.08] gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-slate-100 flex items-center gap-2">
                HMI // TANK-04 SURGE & CHLORINATION MIMIC
                <span className="text-[10px] px-2 py-0.5 rounded-full font-mono nerms-liquid-pod text-emerald-300">
                  PLC-MODBUS:502
                </span>
              </h4>
              <p className="text-[11px] text-slate-400 font-mono">STATION ID: WTP-DIS-04 • LOOP RATE: 250ms</p>
            </div>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center gap-2">
            {isCritical ? (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-mono font-bold animate-pulse shadow-[0_0_15px_rgba(244,63,94,0.3)]">
                <AlertOctagon className="w-4 h-4" />
                <span>CRITICAL OVERFLOW</span>
              </div>
            ) : isHighLevel ? (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold animate-pulse">
                <ShieldAlert className="w-4 h-4" />
                <span>HIGH LEVEL WARNING</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full nerms-liquid-badge text-emerald-300 text-xs font-mono font-semibold">
                <CheckCircle className="w-4 h-4" />
                <span>SYSTEM NOMINAL</span>
              </div>
            )}
          </div>
        </div>

      {/* Main Process Diagram (Industrial SVG SCADA Canvas) */}
      <div className="relative w-full h-72 sm:h-80 rounded-xl bg-slate-950/60 border border-white/5 p-4 flex items-center justify-center overflow-hidden">
        {/* Background measurement grid */}
        <div className="absolute inset-0 dots-pattern opacity-40 pointer-events-none" />

        <svg viewBox="0 0 800 360" className="w-full h-full max-h-80 select-none">
          <defs>
            {/* Water gradient */}
            <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isCritical ? "#f43f5e" : isHighLevel ? "#f59e0b" : "#38bdf8"} stopOpacity="0.85" />
              <stop offset="100%" stopColor={isCritical ? "#9f1239" : isHighLevel ? "#b45309" : "#0369a1"} stopOpacity="0.95" />
            </linearGradient>

            {/* Pipe metallic gradient */}
            <linearGradient id="pipeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="50%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
          </defs>

          {/* ================= INLET PIPE (Left to Tank Top) ================= */}
          <path
            d="M 40 100 L 260 100 L 260 140"
            fill="none"
            stroke="url(#pipeGrad)"
            strokeWidth="18"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {state.pumpInletState && (
            <path
              d="M 40 100 L 260 100 L 260 140"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-pipe-flow"
              opacity="0.9"
            />
          )}

          {/* Booster Pump Component (at X: 110, Y: 100) */}
          <g transform="translate(120, 100)">
            <circle r="26" fill="#0f172a" stroke="#0ea5e9" strokeWidth="2.5" />
            <circle r="20" fill={state.pumpInletState ? "#0369a1" : "#1e293b"} />
            <g className={state.pumpInletState ? "animate-spin-slow origin-center" : ""}>
              <line x1="-14" y1="0" x2="14" y2="0" stroke="#f8fafc" strokeWidth="3" />
              <line x1="0" y1="-14" x2="0" y2="14" stroke="#f8fafc" strokeWidth="3" />
            </g>
            <text x="0" y="38" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="monospace" fontWeight="bold">
              PUMP-01 [{state.pumpInletState ? "RUN" : "IDLE"}]
            </text>
          </g>

          {/* ================= CENTRAL WATER TANK (X: 300 to 520, Y: 80 to 300) ================= */}
          {/* Tank Outer Shell */}
          <rect
            x="300"
            y="80"
            width="220"
            height="220"
            rx="12"
            fill="#090d16"
            stroke="#38bdf8"
            strokeWidth="3"
            opacity="0.9"
          />

          {/* Fluid Level Clip / Rect */}
          <g>
            {/* Computed water height from bottom (Y: 300 is bottom, Y: 80 is top) */}
            {(() => {
              const tankBottom = 298;
              const tankHeight = 216;
              const waterHeight = (levelPercentage / 100) * tankHeight;
              const waterY = tankBottom - waterHeight;

              return (
                <rect
                  x="302"
                  y={waterY}
                  width="216"
                  height={waterHeight}
                  rx="6"
                  fill="url(#waterGrad)"
                />
              );
            })()}
          </g>

          {/* Max Safe Threshold Line (Set in Register 40002) */}
          {(() => {
            const tankBottom = 298;
            const tankHeight = 216;
            const safeY = tankBottom - (maxSafePercentage / 100) * tankHeight;

            return (
              <g>
                <line
                  x1="300"
                  y1={safeY}
                  x2="520"
                  y2={safeY}
                  stroke="#ef4444"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                <text
                  x="525"
                  y={safeY + 4}
                  fill="#f87171"
                  fontSize="10"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  MAX LIMIT: {state.maxSafeLevelCm}cm
                </text>
              </g>
            );
          })()}

          {/* Level Measurement Ruler Ticks */}
          {[0, 250, 500, 750, 1000].map((val) => {
            const yPos = 298 - (val / 1000) * 216;
            return (
              <g key={val}>
                <line x1="288" y1={yPos} x2="300" y2={yPos} stroke="#64748b" strokeWidth="1.5" />
                <text x="282" y={yPos + 3} textAnchor="end" fill="#64748b" fontSize="9" fontFamily="monospace">
                  {val}
                </text>
              </g>
            );
          })}

          {/* Overflow Steam/Spill Animation if Critical */}
          {isCritical && (
            <g>
              <circle cx="410" cy="80" r="14" fill="#f43f5e" opacity="0.6" className="animate-ping" />
              <text x="410" y="65" textAnchor="middle" fill="#f43f5e" fontSize="12" fontFamily="monospace" fontWeight="bold">
                ⚠️ SPILL / OVERFLOW DETECTED
              </text>
            </g>
          )}

          {/* Tank Label */}
          <text x="410" y="190" textAnchor="middle" fill="#ffffff" opacity="0.18" fontSize="24" fontFamily="monospace" fontWeight="bold">
            SURGE TANK-04
          </text>

          {/* ================= OUTLET PIPE (Tank Bottom Right to Edge) ================= */}
          <path
            d="M 520 270 L 740 270"
            fill="none"
            stroke="url(#pipeGrad)"
            strokeWidth="18"
            strokeLinecap="round"
          />
          {state.valveOutletState && (
            <path
              d="M 520 270 L 740 270"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="10"
              strokeLinecap="round"
              className="animate-pipe-flow"
              opacity="0.9"
            />
          )}

          {/* Discharge Valve Component (at X: 630, Y: 270) */}
          <g transform="translate(630, 270)">
            {/* Solenoid Valve Shape */}
            <polygon
              points="-18,-14 0,0 -18,14"
              fill={state.valveOutletState ? "#0284c7" : "#475569"}
              stroke="#0ea5e9"
              strokeWidth="2"
            />
            <polygon
              points="18,-14 0,0 18,14"
              fill={state.valveOutletState ? "#0284c7" : "#475569"}
              stroke="#0ea5e9"
              strokeWidth="2"
            />
            <circle r="6" fill="#f8fafc" />
            <text x="0" y="30" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="monospace" fontWeight="bold">
              VALVE-02 [{state.valveOutletState ? "OPEN" : "CLOSED"}]
            </text>
          </g>
        </svg>
      </div>

      {/* Telemetry Indicator Readouts & Physical Liquid Glass Controls */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
        {/* Sensor 1: Water Level */}
        <div className="nerms-liquid-pod rounded-2xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span className="font-mono text-[11px]">REG 40001 (LEVEL)</span>
              <Droplets className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className={`text-xl font-bold font-mono telemetry-num ${isCritical ? "text-rose-400 animate-pulse" : isHighLevel ? "text-amber-400" : "text-cyan-400"}`}>
                {state.waterLevelCm}
              </span>
              <span className="text-xs text-slate-500 font-mono">/ 1000 cm</span>
            </div>
          </div>
          <div className="w-full bg-slate-900 rounded-full h-1.5 mt-3 overflow-hidden border border-white/[0.08]">
            <div
              className={`h-full transition-all duration-300 ${isCritical ? "bg-rose-500" : isHighLevel ? "bg-amber-400" : "bg-cyan-400"}`}
              style={{ width: `${levelPercentage}%` }}
            />
          </div>
        </div>

        {/* Sensor 2: Tank Pressure */}
        <div className="nerms-liquid-pod rounded-2xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span className="font-mono text-[11px]">REG 40005 (PRESSURE)</span>
              <Gauge className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold font-mono telemetry-num text-slate-100">
                {state.pressurePsi.toFixed(1)}
              </span>
              <span className="text-xs text-slate-500 font-mono">PSI</span>
            </div>
          </div>
          <p className="text-[10px] text-slate-500 font-mono mt-3">Hydrostatic dynamic</p>
        </div>

        {/* Coil 1: Booster Pump State with iOS 26 Liquid Glass Switch */}
        <div className="nerms-liquid-pod rounded-2xl p-4 flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono text-[11px]">COIL 00001 (PUMP)</span>
            <Power className={`w-3.5 h-3.5 ${state.pumpInletState ? "text-emerald-400" : "text-slate-500"}`} />
          </div>
          <div className="flex items-center justify-between gap-2">
            <div>
              <span className={`text-xs font-mono font-bold block ${state.pumpInletState ? "text-emerald-400" : "text-slate-500"}`}>
                {state.pumpInletState ? "ENERGIZED" : "DE-ENERGIZED"}
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                {state.pumpInletState ? `${state.inletFlowRate} L/min` : "0.0 L/min"}
              </span>
            </div>
            {onTogglePump && (
              <GlassSwitch
                material="regular"
                appearance="dark"
                tint="#059669"
                refraction={16}
                motion="full"
                interactive
                checked={state.pumpInletState}
                onCheckedChange={() => onTogglePump()}
                aria-label="Toggle Booster Pump"
              />
            )}
          </div>
        </div>

        {/* Coil 2: Drain Valve State with iOS 26 Liquid Glass Switch */}
        <div className="nerms-liquid-pod rounded-2xl p-4 flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono text-[11px]">COIL 00002 (VALVE)</span>
            <RotateCw className={`w-3.5 h-3.5 ${state.valveOutletState ? "text-cyan-400" : "text-slate-500"}`} />
          </div>
          <div className="flex items-center justify-between gap-2">
            <div>
              <span className={`text-xs font-mono font-bold block ${state.valveOutletState ? "text-cyan-400" : "text-slate-500"}`}>
                {state.valveOutletState ? "100% OPEN" : "CLOSED (0%)"}
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                {state.valveOutletState ? `${state.outletFlowRate} L/min` : "0.0 L/min"}
              </span>
            </div>
            {onToggleValve && (
              <GlassSwitch
                material="regular"
                appearance="dark"
                tint="#0284c7"
                refraction={16}
                motion="full"
                interactive
                checked={state.valveOutletState}
                onCheckedChange={() => onToggleValve()}
                aria-label="Toggle Drain Valve"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  </GlassScene>
  );
}
