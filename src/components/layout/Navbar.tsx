"use client";

import { useEffect, useRef } from "react";
import type { LiquidGlass as LiquidGlassInstance } from "@ybouane/liquidglass";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, ExternalLink } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useTranslation } from "@/i18n/translations";
import { GlassScene, GlassSwitch } from "@glass-sdk/liquid-glass";

export function Navbar() {
  const { language, setLanguage } = useLanguage();
  const t = useTranslation(language);
  const isAz = language === "az";

  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    const root = header?.parentElement;
    if (!header || !root) return;

    let instance: LiquidGlassInstance | undefined;
    let disposed = false;
    let readyFrame = 0;
    const redraw = () => instance?.markChanged();
    const resize = new ResizeObserver(redraw);

    async function startGlass(root: HTMLElement, header: HTMLElement) {
      try {
        const { LiquidGlass } = await import("@ybouane/liquidglass");
        if (disposed) return;

        const glass = await LiquidGlass.init({
          root,
          glassElements: [header],
          defaults: {
            blurAmount: 0,
            refraction: 0.15,
            chromAberration: 0.02,
            edgeHighlight: 0.15,
            specular: 0.16,
            fresnel: 1,
            distortion: 0.02,
            cornerRadius: 65,
            zRadius: 40,
            bevelMode: 0,
          },
        });

        if (disposed) {
          glass.destroy();
          return;
        }

        instance = glass;
        window.addEventListener("scroll", redraw, { passive: true });
        resize.observe(header);
        readyFrame = requestAnimationFrame(() => header.setAttribute("data-webgl-glass", ""));
      } catch (error) {
        if (!disposed) console.warn("[Navbar] LiquidGlass unavailable:", error);
      }
    }

    void startGlass(root, header);
    return () => {
      disposed = true;
      cancelAnimationFrame(readyFrame);
      window.removeEventListener("scroll", redraw);
      resize.disconnect();
      header.removeAttribute("data-webgl-glass");
      instance?.destroy();
    };
  }, []);

  return (
    <header ref={headerRef} className="navbar-glass sticky top-0 sm:top-3 z-50 mx-auto w-[calc(100%-1rem)] sm:w-[calc(100%-3rem)] lg:w-[calc(100%-5rem)] max-w-[1600px] rounded-full">
      <div className="relative rounded-[inherit] bg-[#07121c]/25">
        <div className="relative z-20 flex w-full items-center justify-between gap-2 px-2.5 py-2.5 sm:gap-3 sm:px-6 sm:py-3">
          <div className="relative z-30 shrink-0">
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
                className="h-6 sm:h-8 md:h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.03]"
              />
            </Link>

          </div>

          {/* Right: Actions */}
          <div className="relative z-30 flex items-center gap-2 sm:gap-5 text-xs font-mono shrink-0">
            {/* iOS 26 Liquid Glass Switch for language */}
            <div className="flex items-center gap-2">
              <span
                className={`text-[11px] font-mono font-bold tracking-wider transition-colors duration-200 select-none ${
                  !isAz ? "text-emerald-300" : "text-slate-400"
                }`}
              >
                EN
              </span>
              <GlassScene material="regular" appearance="dark">
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
              </GlassScene>
              <span
                className={`text-[11px] font-mono font-bold tracking-wider transition-colors duration-200 select-none ${
                  isAz ? "text-emerald-300" : "text-slate-400"
                }`}
              >
                AZ
              </span>
            </div>

            {/* Liquid Glass Button: Intro Course */}
            <Link
              href="/rooms/intro-to-ics"
              className="
                relative inline-flex items-center gap-1.5 px-2 sm:px-4 py-1.5 sm:py-2
                text-xs font-mono font-medium text-emerald-200
                rounded-full bg-emerald-500/20 hover:bg-emerald-500/35
                border border-emerald-400/40 hover:border-emerald-400/70
                shadow-[0_4px_16px_rgba(16,185,129,0.3),inset_0_1px_1px_rgba(255,255,255,0.3)]
                transition-all duration-200 active:scale-95 shrink-0
              "
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-300" />
              <span className="hidden sm:inline">{t.nav.introCourse}</span>
              <span className="sm:hidden">{language === "az" ? "Kurs" : "Course"}</span>
            </Link>

            {/* Tactile Button: AzTU Academic Link */}
            <a
              href="https://aztu.edu.az/az"
              target="_blank"
              rel="noopener noreferrer"
              title={t.nav.aztuTitle}
              className="
                inline-flex items-center gap-1.5 px-2 sm:px-3.5 py-1.5 sm:py-2
                text-xs font-mono font-medium text-slate-200
                rounded-full bg-white/[0.04] hover:bg-white/[0.08]
                border border-white/15 hover:border-white/30
                shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]
                transition-all duration-200 active:scale-95 group shrink-0
              "
            >
              <span className="font-semibold tracking-wide">AzTU</span>
              <ExternalLink className="w-3.5 h-3.5 hidden text-slate-400 group-hover:text-emerald-300 sm:block transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
