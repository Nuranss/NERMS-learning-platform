"use client";

import Link from "next/link";
import { CourseSummary } from "@/mock/coursesCatalog";
import { BookOpen, Clock, Sparkles, ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useTranslation } from "@/i18n/translations";
import { LiquidGlassPanel } from "@/components/ui/LiquidGlassPanel";

interface CourseCardProps {
  course: CourseSummary;
}

export function CourseCard({ course }: CourseCardProps) {
  const { language } = useLanguage();
  const t = useTranslation(language);

  const isAz = language === "az";
  const displayTitle = isAz ? course.titleAz || course.title : course.title;
  const displaySubtitle = isAz ? course.subtitleAz || course.subtitle : course.subtitle;
  const displayCategory = isAz ? course.categoryAz || course.category : course.category;
  const displayLevel = isAz ? course.levelAz || course.level : course.level;
  const displayTags = isAz ? course.tagsAz || course.tags : course.tags;

  return (
    <LiquidGlassPanel
      glowTint="emerald"
      config={{
        blurAmount: 0.16,
        refraction: 0.85,
        chromAberration: 0.07,
        edgeHighlight: 0.22,
        specular: 0.30,
        cornerRadius: 24,
      }}
      className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between group"
    >
      <div>
        {/* Badges row */}
        <div className="flex flex-wrap items-center gap-2.5 mb-5">
          <span className="text-xs font-mono font-medium px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-200 shadow-sm">
            {displayCategory}
          </span>
          <span className="text-xs font-mono font-medium px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.1] text-slate-300">
            {displayLevel}
          </span>
          <span className="text-xs font-mono text-emerald-400 ml-auto flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {t.catalog.activeTrack}
          </span>
        </div>

        {/* Title & Subtitle */}
        <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug mb-3 tracking-tight">
          {displayTitle}
        </h3>
        <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed mb-6 max-w-4xl">
          {displaySubtitle}
        </p>

        {/* Domain Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {displayTags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono px-3 py-1 rounded-xl bg-black/40 border border-white/[0.08] text-slate-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer / Meta stats & CTA */}
      <div className="pt-5 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-5 sm:gap-7 text-xs sm:text-sm font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span className="tabular-nums font-semibold">{course.modulesCount}</span> {t.catalog.modules}
          </span>
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="tabular-nums font-semibold">{course.quizzesCount}</span> {t.catalog.knowledgeChecks}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-400" />
            <span className="tabular-nums font-semibold">~{course.estimatedMinutes}</span> {t.catalog.minutesUnit}
          </span>
        </div>

        {/* Tactile Liquid Glass CTA Button */}
        <Link
          href={course.href}
          className="
            inline-flex items-center justify-center gap-2 px-6 py-2.5 sm:py-3
            text-xs sm:text-sm font-mono font-semibold text-white
            rounded-full bg-emerald-500/20 hover:bg-emerald-500/35
            border border-emerald-400/40 hover:border-emerald-400/70
            shadow-[0_4px_16px_rgba(16,185,129,0.25),inset_0_1px_1px_rgba(255,255,255,0.25)]
            transition-all duration-200 active:scale-95 group/btn
          "
        >
          <BookOpen className="w-4 h-4 text-emerald-200" />
          <span>{t.catalog.startCourse}</span>
          <ArrowRight className="w-3.5 h-3.5 text-emerald-300 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
        </Link>
      </div>
    </LiquidGlassPanel>
  );
}
