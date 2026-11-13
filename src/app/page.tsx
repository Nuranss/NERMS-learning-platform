"use client";

import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PresentationShowcase } from "@/components/home/PresentationShowcase";
import { CourseCard } from "@/components/home/CourseCard";
import { COURSES_CATALOG } from "@/mock/coursesCatalog";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useTranslation } from "@/i18n/translations";
import { IndustrialAurora } from "@/components/ui/IndustrialAurora";
import { LiquidGlassStage } from "@/components/ui/LiquidGlassPanel";

import { KineticTextCycler } from "@/components/ui/KineticTextCycler";

export default function HomePage() {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <LiquidGlassStage className="relative flex min-h-screen w-full flex-col overflow-x-clip">
      {/* Dynamic Fluid Industrial Aurora & SCADA Grid Refraction Source */}
      <IndustrialAurora enableMouseParallax={false} />

      {/* Floating Liquid Glass Top Navigation */}
      <Navbar />

      <main className="relative z-10 flex-1 w-full max-w-[1600px] mx-auto px-4 sm:px-10 lg:px-16 pt-8 sm:pt-14 pb-24 flex flex-col">
        <section aria-labelledby="home-title" className="mb-12 grid items-center gap-8 lg:mb-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <div className="home-hero-copy min-w-0">
            <h1 id="home-title" className="text-balance text-4xl font-bold leading-[1.04] tracking-tight text-white sm:text-5xl xl:text-6xl">
              {t.hero.title}
            </h1>
            <KineticTextCycler className="max-w-lg text-balance text-2xl font-semibold leading-tight sm:text-3xl" />
            <p className="mb-7 mt-5 max-w-md text-base leading-relaxed text-slate-300 lg:text-lg">
              {t.hero.desc}
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <Link
                href="/rooms/intro-to-ics"
                className="group inline-flex min-h-12 items-center gap-3 rounded-full border border-emerald-300/50 bg-emerald-400 px-6 py-3 text-sm font-bold text-emerald-950 transition-colors hover:bg-emerald-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
              >
                {t.hero.cta}
                <ArrowRight aria-hidden="true" className="size-4 motion-safe:transition-transform motion-safe:group-hover:translate-x-1" />
              </Link>
            </div>
            <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-300">
              <span>{t.hero.modules}</span>
              <span aria-hidden="true" className="text-emerald-400">·</span>
              <span>{t.hero.checks}</span>
            </p>
          </div>

          <div className="home-hero-photo relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/20 bg-[#0b1820] shadow-2xl">
            <Image
              src="/industrial-control-room.jpg"
              alt={t.hero.imageAlt}
              fill
              loading="eager"
              sizes="(min-width: 1600px) 830px, (min-width: 1024px) 56vw, 100vw"
              className="home-hero-image object-cover"
            />
            <div aria-hidden="true" className="home-hero-scan pointer-events-none absolute inset-0" />
          </div>
        </section>

        <section id="scada-demo" className="home-section-enter mb-14 w-full scroll-mt-24 lg:mb-20">
          <PresentationShowcase />
        </section>

        <section aria-labelledby="home-courses" className="home-section-enter w-full border-t border-white/10 pt-10">
          <h2 id="home-courses" className="mb-2 text-3xl font-bold tracking-tight text-white">
            {t.catalog.allCourses}
          </h2>
          <p className="mb-6 text-sm text-slate-300">{t.catalog.subtitle}</p>
          <div className="space-y-4">
            {COURSES_CATALOG.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </LiquidGlassStage>
  );
}
