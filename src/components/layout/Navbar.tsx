"use client";

import Link from "next/link";
import Image from "next/image";
import { BookOpen } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-[#080b13]/90 backdrop-blur-xl px-6 sm:px-10 lg:px-16 py-3.5 transition-colors">
      <div className="w-full max-w-[1600px] mx-auto flex items-center justify-between">
        {/* Left: NERMS Logo stretched to the natural left */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center group py-0.5">
            <Image
              src="/nerms-logo.png"
              alt="NERMS"
              width={260}
              height={86}
              priority
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </Link>
        </div>

        {/* Right: Clean, restrained action & status stretched to the natural right */}
        <div className="flex items-center gap-3.5 text-xs font-mono">
          <Link
            href="/rooms/intro-to-ics"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/25 transition-all text-xs font-medium active:scale-95"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Intro Course</span>
          </Link>

          <span className="hidden sm:flex items-center gap-2 text-emerald-400/90 bg-emerald-500/[0.06] border border-emerald-500/20 px-3 py-1.5 rounded-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] tracking-wider font-semibold">ONLINE</span>
          </span>
        </div>
      </div>
    </header>
  );
}
