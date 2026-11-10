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
import { GlassScene, GlassSurface, GlassContent } from "@glass-sdk/liquid-glass";

export default function HomePage() {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />

      <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 sm:px-10 lg:px-16 pt-8 sm:pt-14 pb-24 flex flex-col">
        {/* Hero Section */}
        <section className="w-full mb-14 lg:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Typography & CTA */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 self-start px-3.5 py-1 rounded-full nerms-liquid-badge text-xs font-mono font-semibold text-emerald-300 tracking-wider uppercase mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                <span>{t.hero.badge}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-[3.35rem] font-bold text-white tracking-tight leading-[1.12] mb-4">
                {t.hero.title1}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-400 drop-shadow-[0_0_24px_rgba(16,185,129,0.3)]">
                  {t.hero.title2}
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed mb-6 max-w-2xl font-normal">
                {t.hero.desc}
              </p>

              {/* CTA — plain glassmorphism emerald button */}
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <Link
                  href="/rooms/intro-to-ics"
                  className="nerms-liquid-btn-primary inline-flex items-center gap-2.5 px-8 py-3.5 text-sm sm:text-base font-semibold rounded-full"
                >
                  <BookOpen className="w-5 h-5 text-emerald-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]" />
                  <span className="text-white">{t.hero.cta}</span>
                </Link>
              </div>

              {/* Metric chips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5 border-t border-white/[0.08] text-xs font-mono">
                <div className="nerms-liquid-pod p-3 sm:p-3.5 rounded-2xl">
                  <span className="text-emerald-400 font-bold block mb-0.5 text-sm drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">05</span>
                  <span className="text-slate-300/80">{t.hero.chips.modules}</span>
                </div>
                <div className="nerms-liquid-pod p-3 sm:p-3.5 rounded-2xl">
                  <span className="text-emerald-400 font-bold block mb-0.5 text-sm drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">L0–L5</span>
                  <span className="text-slate-300/80">{t.hero.chips.diagrams}</span>
                </div>
                <div className="nerms-liquid-pod p-3 sm:p-3.5 rounded-2xl">
                  <span className="text-emerald-400 font-bold block mb-0.5 text-sm drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">14 Qs</span>
                  <span className="text-slate-300/80">{t.hero.chips.checks}</span>
                </div>
                <div className="nerms-liquid-pod p-3 sm:p-3.5 rounded-2xl">
                  <span className="text-emerald-400 font-bold block mb-0.5 text-sm drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">0 AZN</span>
                  <span className="text-slate-300/80">{t.hero.chips.free}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Photo with REAL liquid-glass frame (this is the showcase) */}
            <div className="lg:col-span-5 w-full">
              <GlassScene
                material="regular"
                appearance="dark"
                className="w-full relative"
                style={{ aspectRatio: "16/10" }}
              >
                <GlassContent className="rounded-3xl overflow-hidden">
                  <Image
                    src="/industrial-control-room.jpg"
                    alt="Industrial Control Room and SCADA Operations"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                  />
                </GlassContent>
                <GlassSurface
                  radius={28}
                  material="regular"
                  appearance="dark"
                  refraction={32}
                  interactive
                  fluid
                  className="absolute inset-0 rounded-3xl shadow-2xl"
                  style={{ padding: 0 }}
                />
              </GlassScene>
            </div>
          </div>
        </section>

        {/* Presentation Showcase */}
        <section className="w-full mb-16 lg:mb-20">
          <PresentationShowcase />
        </section>

        {/* All Courses */}
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
              <p className="text-xs sm:text-sm text-slate-300/80 mt-1">
                {t.catalog.subtitle}
              </p>
            </div>
            <span className="text-xs font-mono text-slate-300 nerms-liquid-pod px-3.5 py-1.5 rounded-full self-start sm:self-auto">
              {t.catalog.showing}
            </span>
          </div>

          <div className="space-y-4">
            {COURSES_CATALOG.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          <div className="mt-6 p-4 rounded-2xl nerms-liquid-pod text-center text-xs text-slate-400 font-mono">
            <span>{t.catalog.expansion}</span>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
