"use client";

import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PresentationShowcase } from "@/components/home/PresentationShowcase";
import { CourseCard } from "@/components/home/CourseCard";
import { COURSES_CATALOG } from "@/mock/coursesCatalog";
import { BookOpen, Layers } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useTranslation } from "@/i18n/translations";

export default function HomePage() {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />

      <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 sm:px-10 lg:px-16 pt-8 sm:pt-12 pb-24 flex flex-col">
        {/* Asymmetric Industrial Hero Section */}
        <section className="w-full mb-14 lg:mb-18">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Authoritative Engineering Typography & CTA */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-400 tracking-wider uppercase mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>{t.hero.badge}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-bold text-white tracking-tight leading-[1.12] mb-4">
                {t.hero.title1}{" "}
                <span className="text-emerald-400">{t.hero.title2}</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 max-w-2xl">
                {t.hero.desc}
              </p>

              {/* Action Button & Course Link */}
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <Link
                  href="/rooms/intro-to-ics"
                  className="px-7 py-3.5 rounded-xl font-semibold text-sm sm:text-base bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/40 active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 border border-emerald-400/20"
                >
                  <BookOpen className="w-5 h-5" />
                  <span>{t.hero.cta}</span>
                </Link>
              </div>

              {/* Engineering Metric Indicators */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/[0.08] text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                  <span className="text-emerald-400 font-bold block mb-0.5 text-sm">05</span>
                  <span className="text-slate-400">{t.hero.chips.modules}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                  <span className="text-emerald-400 font-bold block mb-0.5 text-sm">L0–L5</span>
                  <span className="text-slate-400">{t.hero.chips.diagrams}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                  <span className="text-emerald-400 font-bold block mb-0.5 text-sm">14 Qs</span>
                  <span className="text-slate-400">{t.hero.chips.checks}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                  <span className="text-emerald-400 font-bold block mb-0.5 text-sm">0 AZN</span>
                  <span className="text-slate-400">{t.hero.chips.free}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Industrial Control Center Photograph */}
            <div className="lg:col-span-5 w-full">
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl bg-slate-950/40">
                <Image
                  src="/industrial-control-room.jpg"
                  alt="Industrial Control Room and SCADA Operations"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Center Presentation Showcase */}
        <section className="w-full mb-16">
          <PresentationShowcase />
        </section>

        {/* All Courses Segment */}
        <section className="w-full max-w-6xl xl:max-w-7xl mx-auto border-t border-white/[0.08] pt-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
                <Layers className="w-3.5 h-3.5" />
                <span>{t.catalog.directory}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {t.catalog.allCourses}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {t.catalog.subtitle}
              </p>
            </div>

            <span className="text-xs font-mono text-slate-400 bg-white/[0.04] border border-white/[0.06] px-3 py-1.5 rounded-lg">
              {t.catalog.showing}
            </span>
          </div>

          {/* Course Cards Grid */}
          <div className="space-y-4">
            {COURSES_CATALOG.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          {/* Expansion Note */}
          <div className="mt-6 p-4 rounded-xl bg-slate-900/30 border border-white/[0.05] text-center text-xs text-slate-400 font-mono">
            <span>{t.catalog.expansion}</span>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}