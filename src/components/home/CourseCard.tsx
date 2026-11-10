"use client";

import Link from "next/link";
import { CourseSummary } from "@/mock/coursesCatalog";
import { BookOpen, Clock, Sparkles } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useTranslation } from "@/i18n/translations";
import { GlassScene, GlassButton } from "@glass-sdk/liquid-glass";

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
    <div className="nerms-glass-card rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col justify-between group relative overflow-hidden">
      <div>
        {/* Badges row */}
        <div className="flex flex-wrap items-center gap-2.5 mb-5">
          <span className="nerms-liquid-badge text-xs font-mono font-medium px-3.5 py-1 rounded-full text-emerald-200">
            {displayCategory}
          </span>
          <span className="nerms-liquid-pod text-xs font-mono font-medium px-3.5 py-1 rounded-full text-slate-300">
            {displayLevel}
          </span>
          <span className="text-xs font-mono text-emerald-400 ml-auto flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
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

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {displayTags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono px-3 py-1 rounded-xl bg-white/[0.03] border border-white/[0.08] text-slate-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="pt-5 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-5 sm:gap-7 text-xs sm:text-sm font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span className="tabular-nums">{course.modulesCount}</span> {t.catalog.modules}
          </span>
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="tabular-nums">{course.quizzesCount}</span> {t.catalog.knowledgeChecks}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-400" />
            <span className="tabular-nums">~{course.estimatedMinutes}</span> {t.catalog.minutesUnit}
          </span>
        </div>

        {/* Convex Liquid Glass Start Button */}
        <GlassScene material="regular" appearance="dark">
          <GlassButton
            material="regular"
            appearance="dark"
            radius="capsule"
            tint="#059669"
            refraction={18}
            interactive
            nativeButton={false}
            render={<Link href={course.href} />}
            className="px-6 py-2.5 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <BookOpen className="w-4 h-4 text-emerald-100" />
            <span className="text-white">{t.catalog.startCourse}</span>
          </GlassButton>
        </GlassScene>
      </div>
    </div>
  );
}
