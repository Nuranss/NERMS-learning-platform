"use client";

import Link from "next/link";
import Image from "next/image";
import { BookOpen, ExternalLink } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useTranslation } from "@/i18n/translations";
import { GlassScene, GlassSwitch, GlassContent } from "@glass-sdk/liquid-glass";

export function Navbar() {
  const { language, setLanguage } = useLanguage();
  const t = useTranslation(language);
  const isAz = language === "az";

  return (
    <header className="sticky top-0 sm:top-3 z-50 w-full px-2 sm:px-6 lg:px-10">
      <div className="w-full max-w-[1600px] mx-auto nerms-liquid-island sm:rounded-2xl px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-3 shadow-2xl">
        {/* Left: NERMS Logo */}
        <div className="flex items-center shrink-0">
          <Link href="/" className="flex items-center group py-0.5">
            <Image
              src="/nerms-logo.png"
              alt="NERMS"
              width={260}
              height={86}
              priority
              className="h-8 sm:h-10 md:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03] drop-shadow-[0_2px_12px_rgba(16,185,129,0.2)]"
            />
          </Link>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-4 text-xs font-mono shrink-0">

          {/* iOS 26 Liquid Glass Switch for language — this stays liquid */}
          <GlassScene material="regular" appearance="dark" className="flex items-center">
            <GlassContent style={{ background: "transparent" }} />
            <div className="flex items-center gap-2">
              <span className={`text-[11px] font-mono font-bold tracking-wider transition-colors duration-300 select-none ${!isAz ? "text-emerald-300" : "text-slate-500"}`}>
                EN
              </span>
              <GlassSwitch
                material="regular"
                appearance="dark"
                tint="#059669"
                refraction={18}
                motion="full"
                interactive
                checked={isAz}
                onCheckedChange={(checked) => setLanguage(checked ? "az" : "en")}
                aria-label="Switch language between EN and AZ"
              />
              <span className={`text-[11px] font-mono font-bold tracking-wider transition-colors duration-300 select-none ${isAz ? "text-emerald-300" : "text-slate-500"}`}>
                AZ
              </span>
            </div>
          </GlassScene>

          {/* Glassmorphism button: Intro Course */}
          <Link
            href="/rooms/intro-to-ics"
            className="nerms-glass-nav-btn flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-medium text-emerald-200 border border-emerald-400/30 rounded-full shrink-0 transition-all duration-200 hover:border-emerald-400/60 hover:text-emerald-100 active:scale-95"
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-300" />
            <span className="hidden sm:inline">{t.nav.introCourse}</span>
            <span className="sm:hidden">{language === "az" ? "Kurs" : "Course"}</span>
          </Link>

          {/* Glassmorphism button: AzTU */}
          <a
            href="https://aztu.edu.az/az"
            target="_blank"
            rel="noopener noreferrer"
            title={t.nav.aztuTitle}
            className="nerms-glass-nav-btn flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-medium text-slate-200 border border-white/15 rounded-full shrink-0 transition-all duration-200 hover:border-white/30 hover:text-white active:scale-95 group"
          >
            <span className="font-semibold tracking-wide">AzTU</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-300 transition-colors" />
          </a>
        </div>
      </div>
    </header>
  );
}
