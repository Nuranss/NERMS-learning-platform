"use client";

import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#070a12]/85 backdrop-blur-xl px-4 sm:px-8 py-3">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
        {/* Left balance spacer */}
        <div className="w-28 flex items-center">
          <span className="text-[11px] font-mono tracking-wider text-slate-500 uppercase">
            ICS // OT
          </span>
        </div>

        {/* Center: NERMS Logo */}
        <div className="flex-1 flex justify-center items-center">
          <Link href="/" className="flex items-center justify-center group py-0.5">
            <Image
              src="/nerms-logo.png"
              alt="NERMS"
              width={180}
              height={60}
              priority
              className="h-8 sm:h-10 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </Link>
        </div>

        {/* Right balance: Status Indicator */}
        <div className="w-28 flex items-center justify-end">
          <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold">ONLINE</span>
          </span>
        </div>
      </div>
    </header>
  );
}
