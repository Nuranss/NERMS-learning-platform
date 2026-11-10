"use client";

import Link from "next/link";
import Image from "next/image";
import { BookOpen, ExternalLink } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useTranslation } from "@/i18n/translations";
import {
  GlassScene,
  GlassSurface,
  GlassButton,
  GlassSwitch,
  GlassContent,
} from "@glass-sdk/liquid-glass";

export function Navbar() {
  const { language, setLanguage } = useLanguage();
  const t = useTranslation(language);
  const isAz = language === "az";

  return (
    <GlassScene
      material="regular"
      appearance="dark"
      className="sticky top-0 sm:top-3 z-50 w-full px-2 sm:px-6 lg:px-10 transition-all duration-300"
    >
      {/* Background layer for live liquid refraction */}
      <GlassContent
        className="pointer-events-none"
        style={{ background: "rgba(7, 10, 16, 0.4)" }}
      />

      <GlassSurface
        radius={24}
        material="regular"
        appearance="dark"
        refraction={26}
        interactive
        className="w-full max-w-[1600px] mx-auto nerms-liquid-island sm:rounded-2xl px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-3 shadow-2xl"
      >
        {/* Left: NERMS Logo */}
        <div className="flex items-center shrink-0">
          <Link
            href="/"
            className="flex items-center group py-0.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <Image
              src="/nerms-logo.png"
              alt="NERMS"
              width={260}
              height={86}
              priority
              className="h-8 sm:h-9 md:h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.03]"
            />
          </Link>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-4 text-xs font-mono shrink-0">
          {/* iOS 26 Liquid Glass Switch for language */}
          <div className="flex items-center gap-2">
            <span
              className={`text-[11px] font-mono font-bold tracking-wider transition-colors duration-200 select-none ${
                !isAz ? "text-emerald-300" : "text-slate-500"
              }`}
            >
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
            <span
              className={`text-[11px] font-mono font-bold tracking-wider transition-colors duration-200 select-none ${
                isAz ? "text-emerald-300" : "text-slate-500"
              }`}
            >
              AZ
            </span>
          </div>

          {/* Liquid Glass Button: Intro Course */}
          <GlassButton
            material="regular"
            appearance="dark"
            radius="capsule"
            tint="#059669"
            interactive
            nativeButton={false}
            render={<Link href="/rooms/intro-to-ics" />}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-medium text-emerald-200 border border-emerald-400/30 shadow-[0_4px_14px_rgba(16,185,129,0.25)] transition-all duration-200 active:scale-95 shrink-0"
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-300" />
            <span className="hidden sm:inline">{t.nav.introCourse}</span>
            <span className="sm:hidden">{language === "az" ? "Kurs" : "Course"}</span>
          </GlassButton>

          {/* Liquid Glass Button: AzTU */}
          <GlassButton
            material="clear"
            appearance="dark"
            radius="capsule"
            interactive
            nativeButton={false}
            render={
              <a
                href="https://aztu.edu.az/az"
                target="_blank"
                rel="noopener noreferrer"
                title={t.nav.aztuTitle}
              />
            }
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-medium text-slate-200 border border-white/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] transition-all duration-200 active:scale-95 group shrink-0"
          >
            <span className="font-semibold tracking-wide">AzTU</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-300 transition-colors" />
          </GlassButton>
        </div>
      </GlassSurface>
    </GlassScene>
  );
}
