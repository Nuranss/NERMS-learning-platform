"use client";

import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PresentationShowcase } from "@/components/home/PresentationShowcase";
import { CourseCard } from "@/components/home/CourseCard";
import { COURSES_CATALOG } from "@/mock/coursesCatalog";
import { ArrowRight, BookOpen, CheckCircle2, Layers } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useTranslation } from "@/i18n/translations";

export default function HomePage() {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />

      <main className="flex-1 w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 pt-10 sm:pt-14 pb-24 flex flex-col items-center">
        {/* Hero Header */}
        <section className="text-center max-w-4xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-mono font-medium mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{t.hero.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] mb-4">
            {t.hero.title1} <br />
            <span className="text-emerald-400">{t.hero.title2}</span>
          </h1>

          <p className="text-xs sm:text-base text-slate-300 leading-relaxed max-w-3xl mx-auto">
            {t.hero.desc}
          </p>
        </section>

        {/* Center Presentation Showcase */}
        <section className="w-full mb-10">
          <PresentationShowcase />
        </section>

        {/* Action Button & Course Access Directly Underneath */}
        <section className="flex flex-col items-center text-center space-y-4 mb-20">
          <Link
            href="/rooms/intro-to-ics"
            className="group px-8 py-4 rounded-xl font-semibold text-sm sm:text-base bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/40 active:scale-[0.98] transition-all flex items-center gap-2.5 border border-emerald-400/20"
          >
            <BookOpen className="w-5 h-5" />
            <span>{t.hero.cta}</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>

          {/* Clean Course Feature Chips */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              {t.hero.chips.modules}
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              {t.hero.chips.diagrams}
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              {t.hero.chips.checks}
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              {t.hero.chips.free}
            </span>
          </div>
        </section>

        {/* All Courses Segment */}
        <section className="w-full max-w-6xl xl:max-w-7xl border-t border-white/[0.08] pt-14">
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
