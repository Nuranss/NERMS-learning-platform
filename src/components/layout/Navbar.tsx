"use client";

import Link from "next/link";
import { Shield, Radio, Terminal, Cpu, Search, Award } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full px-4 sm:px-6 lg:px-8 pt-3 pb-2">
      <div className="max-w-7xl mx-auto glass-panel-elevated rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between border border-white/10 shadow-2xl backdrop-blur-2xl">
        {/* Brand identity */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-400/40 flex items-center justify-center text-cyan-400 group-hover:border-cyan-300 transition-all duration-200 shadow-[0_0_15px_rgba(6,182,212,0.25)]">
              <Shield className="w-5 h-5 transition-transform duration-200 group-hover:scale-105" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-wider text-slate-100 text-lg">AEGIS</span>
                <span className="text-xs px-1.5 py-0.5 rounded font-mono font-bold bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 tracking-wider">
                  OT-RANGE
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium tracking-tight">Industrial Cyber Range</p>
            </div>
          </Link>

          {/* Navigation links */}
          <nav className="hidden md:flex items-center gap-1 pl-4 border-l border-white/10 text-sm">
            <Link
              href="/"
              className="px-3 py-1.5 rounded-lg text-slate-200 hover:text-white hover:bg-white/5 font-medium transition-all duration-150 flex items-center gap-1.5"
            >
              <Cpu className="w-4 h-4 text-cyan-400" />
              Target Labs
            </Link>
            <Link
              href="/rooms/water-treatment"
              className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/10 font-medium transition-all duration-150 flex items-center gap-1.5 border border-transparent hover:border-cyan-500/20"
            >
              <Terminal className="w-4 h-4 text-emerald-400" />
              Featured Lab: Water Plant
            </Link>
          </nav>
        </div>

        {/* Global status & user profile */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Live grid status indicator */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-white/5 text-xs text-slate-300 font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>VIRTUAL_PLCS: <strong className="text-emerald-400 font-semibold">ONLINE</strong></span>
          </div>

          {/* User profile with rank and XP */}
          <div className="flex items-center gap-3 pl-2 sm:pl-3 border-l border-white/10">
            <div className="text-right hidden sm:block">
              <div className="flex items-center justify-end gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-xs font-semibold text-slate-200">OT RedTeamer</span>
              </div>
              <p className="text-[11px] font-mono text-cyan-400">2,450 XP • Rank #8</p>
            </div>
            
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 p-[1px] shadow-lg">
              <div className="w-full h-full rounded-[11px] bg-slate-950 flex items-center justify-center font-bold text-xs text-white font-mono">
                NR
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
