"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WaterPlantMimic } from "@/components/scada/WaterPlantMimic";
import { ExploitConsole } from "@/components/terminal/ExploitConsole";
import { TaskCard } from "@/components/room/TaskCard";
import { ICSRoom } from "@/mock/roomsData";
import { INITIAL_PLANT_STATE, SCADAPlantState } from "@/mock/plantInitialState";
import { ArrowLeft, Shield, Radio, Terminal, Award, BookOpen, Layers, Code2, AlertTriangle } from "lucide-react";

interface RoomClientProps {
  room: ICSRoom;
}

export function RoomClient({ room }: RoomClientProps) {
  // Interactive SCADA Physical Simulation State
  const [plantState, setPlantState] = useState<SCADAPlantState>(INITIAL_PLANT_STATE);
  const [solvedTaskIds, setSolvedTaskIds] = useState<number[]>([]);
  const [unlockedFlags, setUnlockedFlags] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"briefing" | "architecture" | "modbus">("briefing");

  // Continuous fluid dynamics physics loop (runs every 1 second)
  useEffect(() => {
    const timer = setInterval(() => {
      setPlantState((prev) => {
        let newLevel = prev.waterLevelCm;
        const inflow = prev.pumpInletState ? 12 : 0;
        const outflow = prev.valveOutletState ? 10 : 0;
        const delta = inflow - outflow;

        newLevel = Math.max(50, Math.min(1000, newLevel + delta));

        // Hydrostatic pressure calculation (Atmosphere + rho * g * h)
        const newPressure = 14.7 + (newLevel / 1000) * 45.0;

        const isOverSafe = newLevel >= prev.maxSafeLevelCm;
        const isSpilling = newLevel >= 950;

        return {
          ...prev,
          waterLevelCm: newLevel,
          pressurePsi: newPressure,
          alarmStatusCode: isSpilling ? 2 : isOverSafe ? 1 : 0,
          isOverflowing: isSpilling,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleUnlockFlag = (flag: string) => {
    setUnlockedFlags((prev) => (prev.includes(flag) ? prev : [...prev, flag]));
  };

  const handleSolveTask = (taskId: number) => {
    if (!solvedTaskIds.includes(taskId)) {
      setSolvedTaskIds((prev) => [...prev, taskId]);
    }
  };

  const totalPoints = room.tasks.reduce((acc, t) => acc + t.points, 0);
  const earnedPoints = room.tasks
    .filter((t) => solvedTaskIds.includes(t.id))
    .reduce((acc, t) => acc + t.points, 0);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between mb-4">
          <Link
            href="/"
            className="text-xs font-medium text-slate-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Target Catalog
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-lg bg-slate-900 border border-white/10 text-cyan-300">
              TARGET IP: <strong className="text-white">{room.targetIp}</strong>
            </span>
            <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              {earnedPoints} / {totalPoints} XP
            </span>
          </div>
        </div>

        {/* Room Header Banner */}
        <div className="glass-panel-elevated rounded-2xl p-6 border border-white/10 shadow-xl mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-amber-500/15 border border-amber-400/30 text-amber-300">
                  {room.purdueLevel}
                </span>
                <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-slate-800 border border-white/10 text-slate-300 flex items-center gap-1">
                  <Radio className="w-3 h-3 text-cyan-400" />
                  {room.protocol}:{room.port}
                </span>
                <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-rose-500/15 border border-rose-500/30 text-rose-300 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  Kinetic Impact: {room.kineticSeverity}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
                {room.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1">
                {room.facility} • Sector: {room.sector}
              </p>
            </div>

            {/* Progress completion bar */}
            <div className="w-full md:w-56 glass-panel rounded-xl p-3 border border-white/10">
              <div className="flex items-center justify-between text-xs text-slate-300 mb-1.5 font-mono">
                <span>PROGRESS</span>
                <span className="text-cyan-400 font-bold">
                  {Math.round((solvedTaskIds.length / room.tasks.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full transition-all duration-300"
                  style={{ width: `${(solvedTaskIds.length / room.tasks.length) * 100}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-500 font-mono mt-1 text-right">
                {solvedTaskIds.length} of {room.tasks.length} tasks completed
              </p>
            </div>
          </div>
        </div>

        {/* Split Screen Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (5 Cols): Task Briefing & Mission Walkthrough */}
          <div className="lg:col-span-5 space-y-4">
            {/* Briefing Tabs Header */}
            <div className="glass-panel rounded-2xl p-1.5 border border-white/10 flex items-center gap-1 text-xs">
              <button
                onClick={() => setActiveTab("briefing")}
                className={`flex-1 py-2 px-3 rounded-xl font-medium flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === "briefing"
                    ? "bg-cyan-500/20 text-cyan-200 border border-cyan-400/30"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                Briefing
              </button>
              <button
                onClick={() => setActiveTab("architecture")}
                className={`flex-1 py-2 px-3 rounded-xl font-medium flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === "architecture"
                    ? "bg-cyan-500/20 text-cyan-200 border border-cyan-400/30"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                Purdue Model
              </button>
              <button
                onClick={() => setActiveTab("modbus")}
                className={`flex-1 py-2 px-3 rounded-xl font-medium flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === "modbus"
                    ? "bg-cyan-500/20 text-cyan-200 border border-cyan-400/30"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                Registers
              </button>
            </div>

            {/* Tab 1: Briefing Content */}
            {activeTab === "briefing" && (
              <div className="glass-panel rounded-2xl p-5 border border-white/10 text-xs text-slate-300 space-y-3">
                <h3 className="font-bold text-sm text-slate-100">Scenario Context & Red Team Objective</h3>
                <p className="leading-relaxed">{room.technicalBriefing}</p>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 font-mono text-[11px] text-slate-400 space-y-1">
                  <p>• Protocol: {room.protocol} (Port {room.port})</p>
                  <p>• Target IP: {room.targetIp}</p>
                  <p>• Vulnerability: Cleartext protocol with zero authentication</p>
                  <p>• Objective: Trigger kinetic process impact and release shutdown tokens</p>
                </div>
              </div>
            )}

            {/* Tab 2: Purdue Model Architecture */}
            {activeTab === "architecture" && (
              <div className="glass-panel rounded-2xl p-5 border border-white/10 text-xs text-slate-300 space-y-3 font-mono">
                <h3 className="font-bold text-sm text-slate-100 font-sans">PERA / Purdue Model Hierarchy</h3>
                <div className="space-y-2 text-[11px]">
                  <div className="p-2.5 rounded-lg bg-purple-950/20 border border-purple-500/30">
                    <strong className="text-purple-300">Level 3: Operations DMZ</strong>
                    <p className="text-slate-400">Data Historian & Engineering Workstation (10.0.3.0/24)</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-cyan-950/20 border border-cyan-500/30">
                    <strong className="text-cyan-300">Level 2: Supervisory SCADA</strong>
                    <p className="text-slate-400">Web HMI Mimic Station & Annunciator Display</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-500/30">
                    <strong className="text-amber-300">Level 1: Basic Control [TARGET]</strong>
                    <p className="text-slate-400">{room.title} ({room.targetIp}:{room.port})</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/30">
                    <strong className="text-emerald-300">Level 0: Physical Process</strong>
                    <p className="text-slate-400">Physical Actuators, Pumps, Valves, High-Pressure Sensors</p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Modbus Registers Cheatsheet */}
            {activeTab === "modbus" && (
              <div className="glass-panel rounded-2xl p-5 border border-white/10 text-xs space-y-3 font-mono">
                <h3 className="font-bold text-sm text-slate-100 font-sans">Memory Mapping (Port {room.port})</h3>
                <div className="space-y-1.5 text-[11px]">
                  <div className="p-2 rounded bg-slate-900 border border-white/5">
                    <span className="text-cyan-400 font-bold">Coil 00001:</span> PUMP_INLET (0=OFF, 1=ON)
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-white/5">
                    <span className="text-cyan-400 font-bold">Coil 00002:</span> VALVE_OUTLET (0=CLOSED, 1=OPEN)
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-white/5">
                    <span className="text-emerald-400 font-bold">Reg 40001:</span> WATER_LEVEL_CM (0-1000 cm)
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-white/5">
                    <span className="text-amber-400 font-bold">Reg 40002:</span> MAX_SAFE_LEVEL_CM (Default 800)
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-white/5">
                    <span className="text-slate-300 font-bold">Reg 40004:</span> PRESSURE_PSI
                  </div>
                </div>
              </div>
            )}

            {/* Room Task Cards (TryHackMe Style) */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider px-1">
                CHALLENGE TASKS ({solvedTaskIds.length}/{room.tasks.length})
              </h3>
              {room.tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  isSolved={solvedTaskIds.includes(task.id)}
                  onSolve={handleSolveTask}
                  unlockedFlags={unlockedFlags}
                />
              ))}
            </div>
          </div>

          {/* Right Column (7 Cols): Live SCADA Mimic & Attack Console */}
          <div className="lg:col-span-7 space-y-6">
            {/* Live Visual SCADA Mimic */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2 px-1">
                <span>LIVE TELEMETRY FEED (WEBSOCKET STREAM)</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  REAL-TIME SYNC
                </span>
              </div>
              <WaterPlantMimic
                state={plantState}
                onTogglePump={() =>
                  setPlantState((prev) => ({ ...prev, pumpInletState: !prev.pumpInletState }))
                }
                onToggleValve={() =>
                  setPlantState((prev) => ({ ...prev, valveOutletState: !prev.valveOutletState }))
                }
              />
            </div>

            {/* In-Browser Exploit Terminal */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2 px-1">
                <span>IN-BROWSER EXPLOIT ENVIRONMENT</span>
                <span className="text-cyan-400">ZERO-SETUP ATTACK BOX</span>
              </div>
              <ExploitConsole
                plantState={plantState}
                setPlantState={setPlantState}
                onUnlockFlag={handleUnlockFlag}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
