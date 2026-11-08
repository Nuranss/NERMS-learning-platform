"use client";

import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-[#080b13]/80 backdrop-blur-xl px-4 sm:px-8 py-3.5 transition-colors">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: NERMS Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center group py-0.5">
            <Image
              src="/nerms-logo.png"
              alt="NERMS"
              width={240}
              height={80}
              priority
              className="h-9 sm:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </Link>
        </div>

        {/* Right: Clean, restrained status badge */}
        <div className="flex items-center gap-3.5 text-xs font-mono">
          <span className="hidden sm:inline-block text-slate-400 text-[11px] tracking-wide border-r border-white/[0.08] pr-3.5">
            ICS // OT SECURITY
          </span>
          <span className="flex items-center gap-2 text-emerald-400/90 bg-emerald-500/[0.08] border border-emerald-500/20 px-3 py-1 rounded-full shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium text-[11px] tracking-wider">ONLINE</span>
          </span>
        </div>
      </div>
    </header>
  );
}
