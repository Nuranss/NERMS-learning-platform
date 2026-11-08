"use client";

import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#070a12]/85 backdrop-blur-xl px-4 sm:px-8 py-3.5">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Bigger, Left-aligned NERMS Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center group py-0.5">
            <Image
              src="/nerms-logo.png"
              alt="NERMS"
              width={260}
              height={86}
              priority
              className="h-10 sm:h-14 w-auto object-contain transition-transform group-hover:scale-[1.03]"
            />
          </Link>
        </div>

        {/* Right: Status Indicator / Tag */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-xs font-mono text-slate-400 border-r border-white/10 pr-3">
            ICS & OT CYBER RANGE
          </span>
          <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold">ONLINE</span>
          </span>
        </div>
      </div>
    </header>
  );
}
