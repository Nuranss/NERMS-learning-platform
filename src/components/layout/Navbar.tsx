"use client";

import Link from "next/link";
import Image from "next/image";
import { BookOpen, ExternalLink } from "lucide-react";

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

          <a
            href="https://aztu.edu.az/az"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.1] hover:border-emerald-500/30 transition-all text-xs font-medium active:scale-95 group"
            title="Azərbaycan Texniki Universiteti"
          >
            <span className="font-semibold tracking-wide">AzTU</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-400 transition-colors" />
          </a>
        </div>
      </div>
    </header>
  );
}
