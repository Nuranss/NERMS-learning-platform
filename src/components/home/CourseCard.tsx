"use client";

import Link from "next/link";
import { CourseSummary } from "@/mock/coursesCatalog";
import { BookOpen, Clock, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

interface CourseCardProps {
  course: CourseSummary;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="nerms-glass-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between group relative overflow-hidden transition-all duration-200">
      <div>
        {/* Badges row */}
        <div className="flex flex-wrap items-center gap-2 mb-3.5">
          <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300">
            {course.category}
          </span>
          <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-300">
            {course.level}
          </span>
          <span className="text-[11px] font-mono text-emerald-400/90 ml-auto flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Available Now
          </span>
        </div>

        {/* Title & Subtitle */}
        <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug mb-2">
          {course.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed mb-5">
          {course.subtitle}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-1.5 mb-6">
          {course.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-950/60 border border-white/[0.06] text-slate-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer bar & Action */}
      <div className="pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            {course.modulesCount} Modules
          </span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            {course.quizzesCount} Quizzes
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            ~{course.estimatedMinutes}m
          </span>
        </div>

        <Link
          href={course.href}
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
        >
          <span>Start Course</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
