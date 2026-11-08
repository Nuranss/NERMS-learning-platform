"use client";

import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-[#090c15]/90 backdrop-blur-xl px-4 py-2.5">
      <div className="relative max-w-5xl mx-auto flex items-center justify-between">
        {/* Left spacer / subtle tag */}
        <div className="w-24 hidden sm:flex items-center">
          <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase">
            ICS // OT
          </span>
        </div>

        {/* Center: NERMS Logo */}
        <div className="flex-1 flex justify-center items-center">
          <Link href="/" className="flex items-center justify-center group py-1">
            <Image
              src="/nerms-logo.png"
              alt="NERMS"
              width={160}
              height={53}
              priority
              className="h-7 sm:h-9 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </Link>
        </div>

        {/* Right: Minimalist status chip */}
        <div className="w-24 flex items-center justify-end">
          <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="hidden sm:inline">ONLINE</span>
          </span>
        </div>
      </div>
    </header>
  );
}
