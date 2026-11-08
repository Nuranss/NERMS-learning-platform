"use client";

import Link from "next/link";
import { CourseSummary } from "@/mock/coursesCatalog";
import { BookOpen, Clock, Sparkles, ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useTranslation } from "@/i18n/translations";

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
    <div className="nerms-glass-card rounded-2xl p-6 sm:p-8 lg:p-10 flex flex-col justify-between group relative overflow-hidden transition-all duration-200">
      <div>
        {/* Badges row */}
        <div className="flex flex-wrap items-center gap-2.5 mb-4">
          <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300">
            {displayCategory}
          </span>
          <span className="text-xs font-mono font-medium px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-300">
            {displayLevel}
          </span>
          <span className="text-xs font-mono text-emerald-400/90 ml-auto flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            {t.catalog.activeTrack}
          </span>
        </div>

        {/* Title & Subtitle */}
        <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug mb-3">
          {displayTitle}
        </h3>
        <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed mb-6 max-w-4xl">
          {displaySubtitle}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {displayTags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono px-3 py-1 rounded-lg bg-slate-950/60 border border-white/[0.06] text-slate-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer bar & Action */}
      <div className="pt-5 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-5 sm:gap-7 text-xs sm:text-sm font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            {course.modulesCount} {t.catalog.modules}
          </span>
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            {course.quizzesCount} {t.catalog.knowledgeChecks}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-400" />
            ~{course.estimatedMinutes} {t.catalog.minutesUnit}
          </span>
        </div>

        <Link
          href={course.href}
          className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
        >
          <span>{t.catalog.startCourse}</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
