"use client";

import Link from "next/link";
import Image from "next/image";
import { BookOpen, ExternalLink, Globe } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useTranslation } from "@/i18n/translations";

export function Navbar() {
  const { language, setLanguage } = useLanguage();
  const t = useTranslation(language);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-[#080b13]/90 backdrop-blur-xl px-4 sm:px-10 lg:px-16 py-3 sm:py-3.5 transition-colors">
      <div className="w-full max-w-[1600px] mx-auto flex items-center justify-between gap-2">
        {/* Left: NERMS Logo */}
        <div className="flex items-center shrink-0">
          <Link href="/" className="flex items-center group py-0.5">
            <Image
              src="/nerms-logo.png"
              alt="NERMS"
              width={260}
              height={86}
              priority
              className="h-8 sm:h-11 md:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </Link>
        </div>

        {/* Right: Actions, Language Switcher & AzTU */}
        <div className="flex items-center gap-2 sm:gap-3.5 text-xs font-mono shrink-0">
          {/* Language Switcher Pill */}
          <div className="flex items-center p-0.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono shrink-0">
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`px-1.5 sm:px-2 py-1 rounded-md transition-all ${
                language === "en"
                  ? "bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage("az")}
              className={`px-1.5 sm:px-2 py-1 rounded-md transition-all ${
                language === "az"
                  ? "bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              AZ
            </button>
          </div>

          <Link
            href="/rooms/intro-to-ics"
            className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3.5 sm:py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/25 transition-all text-xs font-medium active:scale-95 shrink-0"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.nav.introCourse}</span>
            <span className="sm:hidden">{language === "az" ? "Kurs" : "Course"}</span>
          </Link>

          <a
            href="https://aztu.edu.az/az"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3.5 sm:py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.1] hover:border-emerald-500/30 transition-all text-xs font-medium active:scale-95 group shrink-0"
            title={t.nav.aztuTitle}
          >
            <span className="font-semibold tracking-wide">AzTU</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-400 transition-colors" />
          </a>
        </div>
      </div>
    </header>
  );
}
