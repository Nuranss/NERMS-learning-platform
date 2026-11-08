"use client";

import Link from "next/link";
import { BookOpen, Terminal, Sparkles, Award } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-[#090c15]/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        {/* Brand identity: nerms */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-extrabold text-2xl tracking-tight text-white flex items-center">
              nerms
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 ml-1 group-hover:scale-125 transition-transform" />
            </span>
            <span className="hidden sm:inline-block text-xs text-slate-400 font-medium pl-2 border-l border-white/10">
              ICS & OT Security
            </span>
          </Link>

          {/* Navigation links */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            <Link
              href="/rooms/intro-to-ics"
              className="px-3 py-1.5 rounded-lg text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 transition-colors flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4" />
              Intro to ICS
            </Link>
            <Link
              href="/rooms/water-treatment"
              className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-1.5"
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              Hands-On Labs
            </Link>
          </nav>
        </div>

        {/* User profile / rank */}
        <div className="flex items-center gap-4">
          <Link
            href="/rooms/intro-to-ics"
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 transition-all active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Start Learning
          </Link>

          <div className="flex items-center gap-2.5 pl-3 border-l border-white/10 text-xs font-mono">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 flex items-center justify-center font-bold">
              N
            </div>
            <span className="hidden sm:inline text-slate-300">Learner</span>
          </div>
        </div>
      </div>
    </header>
  );
}
