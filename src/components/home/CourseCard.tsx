"use client";

import Link from "next/link";
import { CourseSummary } from "@/mock/coursesCatalog";
import { BookOpen, Clock, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

interface CourseCardProps {
  course: CourseSummary;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="nerms-glass-card rounded-2xl p-6 sm:p-8 lg:p-10 flex flex-col justify-between group relative overflow-hidden transition-all duration-200">
      <div>
        {/* Badges row */}
        <div className="flex flex-wrap items-center gap-2.5 mb-4">
          <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300">
            {course.category}
          </span>
          <span className="text-xs font-mono font-medium px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-300">
            {course.level}
          </span>
          <span className="text-xs font-mono text-emerald-400/90 ml-auto flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Active Track
          </span>
        </div>

        {/* Title & Subtitle */}
        <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug mb-3">
          {course.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed mb-6 max-w-4xl">
          {course.subtitle}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {course.tags.map((tag) => (
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
            {course.modulesCount} Modules
          </span>
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            {course.quizzesCount} Knowledge Checks
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-400" />
            ~{course.estimatedMinutes}m
          </span>
        </div>

        <Link
          href={course.href}
          className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
        >
          <span>Start Course</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
