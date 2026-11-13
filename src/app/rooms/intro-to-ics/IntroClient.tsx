"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getIntroCourseData, IntroTask } from "@/mock/introCourseData";
import { TriadDiagram } from "@/components/learn/TriadDiagram";
import { PurdueDiagram } from "@/components/learn/PurdueDiagram";
import { ComponentFlowDiagram } from "@/components/learn/ComponentFlowDiagram";
import { QuizQuestion } from "@/components/learn/QuizQuestion";
import { useLanguage } from "@/i18n/LanguageContext";
import { useTranslation } from "@/i18n/translations";
import { IndustrialAurora } from "@/components/ui/IndustrialAurora";
import { LiquidGlassStage, LiquidGlassPanel } from "@/components/ui/LiquidGlassPanel";
import {
  BookOpen,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Check,
  Trophy,
} from "lucide-react";

export function IntroClient() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const course = getIntroCourseData(language);

  const [solvedAnswers, setSolvedAnswers] = useState<Record<string, string>>({});
  const [activeTaskIdx, setActiveTaskIdx] = useState<number>(0);

  const solvedQuizIds = Object.keys(solvedAnswers);

  // Total questions count
  const allQuizzes = course.tasks.flatMap((t) => t.quizzes);
  const totalQuestions = allQuizzes.length;
  const solvedCount = solvedQuizIds.length;
  const progressPercent = Math.round((solvedCount / totalQuestions) * 100);

  const handleSolveQuestion = (quizId: string, answer?: string) => {
    setSolvedAnswers((prev) => ({
      ...prev,
      [quizId]: answer || "Verified",
    }));
  };

  const activeTask = course.tasks[activeTaskIdx];

  const isTaskCompleted = (task: IntroTask) => {
    return task.quizzes.every((q) => solvedQuizIds.includes(q.id));
  };

  const isAllCourseCompleted = solvedCount === totalQuestions;

  return (
    <LiquidGlassStage className="flex flex-col min-h-screen w-full relative">
      {/* Background Refraction Source */}
      <IndustrialAurora enableMouseParallax />

      {/* Top Navbar */}
      <Navbar />

      <main className="relative z-10 flex-1 w-full max-w-[1600px] mx-auto px-4 sm:px-10 lg:px-16 pt-8 pb-24">
        {/* Course Banner */}
        <div className="mb-8">
          <LiquidGlassPanel
            glowTint="emerald"
            config={{
              blurAmount: 0.22,
              refraction: 0.65,
              chromAberration: 0.045,
              edgeHighlight: 0.15,
              specular: 0.20,
              cornerRadius: 24,
            }}
            className="p-6 sm:p-8 lg:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl"
          >
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-mono font-medium mb-3">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{t.course.officialCurriculum}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
                {course.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300/90 mt-2 leading-relaxed">
                {course.subtitle}
              </p>
            </div>

            {/* Overall Progress Widget with Tabular Numbers */}
            <div className="w-full md:w-72 p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/15 backdrop-blur-xl shadow-lg shrink-0">
              <div className="flex items-center justify-between text-xs font-mono text-slate-300 mb-2.5">
                <span>{t.course.courseProgress}</span>
                <span className="text-emerald-400 font-bold tabular-nums">
                  {progressPercent}%
                </span>
              </div>
              <div className="w-full bg-black/40 rounded-full h-2 overflow-hidden p-0.5 border border-white/10">
                <div
                  className="bg-emerald-500 h-full transition-all duration-300 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-2 font-mono tabular-nums">
                {solvedCount} {t.course.of} {totalQuestions} {t.course.questionsCompleted}
              </p>
            </div>
          </LiquidGlassPanel>
        </div>

        {/* Course Body: Wide Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (Outline Stepper) */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-2 sticky top-24">
            <div className="flex items-center justify-between px-1 mb-2">
              <h3 className="text-xs font-mono font-medium text-slate-400">
                {t.course.outline}
              </h3>
              <span className="text-[11px] font-mono text-slate-400 px-2.5 py-0.5 rounded-full bg-white/[0.03] border border-white/10 tabular-nums">
                {course.tasks.length} {language === "az" ? "tapşırıq" : "tasks"}
              </span>
            </div>

            {course.tasks.map((task, idx) => {
              const active = idx === activeTaskIdx;
              const completed = isTaskCompleted(task);
              const taskSolvedCount = task.quizzes.filter((q) => solvedQuizIds.includes(q.id)).length;

              return (
                <button
                  key={task.id}
                  onClick={() => setActiveTaskIdx(idx)}
                  className={`w-full text-left p-4 rounded-2xl transition-all duration-200 flex items-start gap-3.5 backdrop-blur-xl ${
                    active
                      ? "bg-emerald-500/15 border border-emerald-400/40 text-white shadow-[0_4px_16px_rgba(16,185,129,0.2)] translate-x-0.5"
                      : "bg-white/[0.02] border border-white/10 hover:bg-white/[0.06] hover:border-white/20 text-slate-300 shadow-sm"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 transition-colors tabular-nums ${
                      completed
                        ? "bg-emerald-500 text-slate-950 font-bold shadow-[0_0_8px_rgba(16,185,129,0.4)]"
                        : active
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30"
                        : "bg-white/[0.05] text-slate-400 border border-white/[0.08]"
                    }`}
                  >
                    {completed ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : task.id}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4
                      className={`text-xs font-semibold leading-snug transition-colors ${
                        active ? "text-white" : "text-slate-300"
                      }`}
                    >
                      {task.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5 tabular-nums">
                      {taskSolvedCount}/{task.quizzes.length} {t.course.answered}
                    </p>
                  </div>
                </button>
              );
            })}

            {isAllCourseCompleted && (
              <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-400/30 text-xs text-emerald-200 flex items-center gap-2.5 mt-4 shadow-lg">
                <Trophy className="w-5 h-5 text-emerald-300 shrink-0" />
                <span className="font-medium leading-relaxed">
                  {t.course.congratulations}
                </span>
              </div>
            )}
          </div>

          {/* Right Column (Lesson Reading & Quizzes) */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-6">
            <LiquidGlassPanel
              glowTint="neutral"
              config={{
                blurAmount: 0.16,
                refraction: 0.85,
                chromAberration: 0.07,
                edgeHighlight: 0.22,
                specular: 0.30,
                cornerRadius: 28,
              }}
              className="p-6 sm:p-10 lg:p-12 space-y-6 shadow-xl"
            >
              {/* Task Title */}
              <div className="pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-medium mb-1.5 tabular-nums">
                  <span>
                    {t.course.task} {activeTask.id} {t.course.of} {course.tasks.length}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {activeTask.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  {activeTask.shortDescription}
                </p>
              </div>

              {/* Lesson Narrative Content */}
              <div className="space-y-4 text-xs sm:text-[14px] text-slate-200 leading-[1.75] font-normal max-w-prose">
                {activeTask.content.map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}
              </div>

              {/* Embedded Visual Diagrams */}
              {activeTask.hasDiagram === "triad" && <TriadDiagram />}
              {activeTask.hasDiagram === "components" && <ComponentFlowDiagram />}
              {activeTask.hasDiagram === "purdue" && <PurdueDiagram />}

              {/* Key Takeaways Box (Transparent Specular Liquid Glass) */}
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-emerald-500/30 backdrop-blur-xl space-y-2 shadow-lg">
                <h4 className="text-xs font-bold font-mono text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  {t.course.keyTakeaways}
                </h4>
                <ul className="text-xs sm:text-[13px] text-slate-300 space-y-1.5 list-disc list-inside">
                  {activeTask.keyTakeaways.map((item, kIdx) => (
                    <li key={kIdx} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quizzes Section */}
              <div className="pt-6 border-t border-white/[0.08] space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    {t.course.knowledgeChecks} ({activeTask.quizzes.length})
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">
                    {t.course.typeAnswer}
                  </span>
                </div>

                <div className="space-y-3">
                  {activeTask.quizzes.map((quiz) => (
                    <QuizQuestion
                      key={quiz.id}
                      id={quiz.id}
                      question={quiz.question}
                      correctHashes={quiz.correctHashes}
                      hint={quiz.hint}
                      formatGuide={quiz.formatGuide}
                      points={quiz.points}
                      isSolved={Boolean(solvedAnswers[quiz.id])}
                      savedAnswer={solvedAnswers[quiz.id]}
                      onSolve={handleSolveQuestion}
                    />
                  ))}
                </div>
              </div>

              {/* Stepper Navigation Buttons */}
              <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between">
                <button
                  type="button"
                  disabled={activeTaskIdx === 0}
                  onClick={() => setActiveTaskIdx((prev) => Math.max(0, prev - 1))}
                  className="px-5 py-2.5 rounded-full text-xs font-mono font-medium text-slate-300 bg-white/[0.04] border border-white/10 hover:border-white/20 disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-95"
                >
                  {t.course.prevTask}
                </button>

                {activeTaskIdx < course.tasks.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setActiveTaskIdx((prev) => Math.min(course.tasks.length - 1, prev + 1))}
                    className="
                      px-6 py-2.5 rounded-full text-xs font-mono font-semibold text-white
                      bg-emerald-500/20 hover:bg-emerald-500/35 border border-emerald-400/40 hover:border-emerald-400/70
                      shadow-[0_4px_16px_rgba(16,185,129,0.25)] flex items-center gap-2 transition-all active:scale-95
                    "
                  >
                    <span>{t.course.nextTask}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setActiveTaskIdx(0)}
                    className="
                      px-6 py-2.5 rounded-full text-xs font-mono font-semibold text-emerald-300
                      bg-emerald-500/10 border border-emerald-400/30 hover:border-emerald-400/50
                      flex items-center gap-2 transition-all active:scale-95
                    "
                  >
                    <span>{t.course.reviewFromStart}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </LiquidGlassPanel>
          </div>
        </div>
      </main>

      <Footer />
    </LiquidGlassStage>
  );
}
