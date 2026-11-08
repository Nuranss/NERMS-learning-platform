"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { INTRO_COURSE_DATA, IntroTask } from "@/mock/introCourseData";
import { TriadDiagram } from "@/components/learn/TriadDiagram";
import { PurdueDiagram } from "@/components/learn/PurdueDiagram";
import { ComponentFlowDiagram } from "@/components/learn/ComponentFlowDiagram";
import { QuizQuestion } from "@/components/learn/QuizQuestion";
import {
  BookOpen,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Check,
  Trophy,
} from "lucide-react";

export function IntroClient() {
  const course = INTRO_COURSE_DATA;
  const [solvedQuizIds, setSolvedQuizIds] = useState<string[]>([]);
  const [activeTaskIdx, setActiveTaskIdx] = useState<number>(0);

  // Total questions count
  const allQuizzes = course.tasks.flatMap((t) => t.quizzes);
  const totalQuestions = allQuizzes.length;
  const solvedCount = solvedQuizIds.length;
  const progressPercent = Math.round((solvedCount / totalQuestions) * 100);

  const handleSolveQuestion = (quizId: string) => {
    if (!solvedQuizIds.includes(quizId)) {
      setSolvedQuizIds((prev) => [...prev, quizId]);
    }
  };

  const activeTask = course.tasks[activeTaskIdx];

  const isTaskCompleted = (task: IntroTask) => {
    return task.quizzes.every((q) => solvedQuizIds.includes(q.id));
  };

  const isAllCourseCompleted = solvedCount === totalQuestions;

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-7 pb-24">
        {/* Course Banner */}
        <div className="mb-8">
          <div className="nerms-glass-card rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-mono font-medium mb-3">
                <BookOpen className="w-3.5 h-3.5" />
                <span>OFFICIAL CURRICULUM</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {course.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300/90 mt-2 leading-relaxed">
                {course.subtitle}
              </p>
            </div>

            {/* Overall Progress Widget */}
            <div className="w-full md:w-60 p-4 rounded-xl bg-slate-950/50 border border-white/[0.06] shrink-0 shadow-sm">
              <div className="flex items-center justify-between text-xs font-mono text-slate-300 mb-2">
                <span>COURSE PROGRESS</span>
                <span className="text-emerald-400 font-bold">{progressPercent}%</span>
              </div>
              <div className="w-full bg-slate-800/80 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-emerald-500 h-full transition-all duration-300 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.3)]"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-2 font-mono">
                {solvedCount} of {totalQuestions} questions completed
              </p>
            </div>
          </div>
        </div>

        {/* Course Body: Wide Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (Outline Stepper) */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-2 sticky top-24">
            <div className="flex items-center justify-between px-1 mb-2">
              <h3 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
                Course Outline
              </h3>
              <span className="text-[11px] font-mono text-slate-500">
                5 Tasks
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
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                    active
                      ? "bg-slate-800/80 border-emerald-500/40 shadow-sm translate-x-1"
                      : "bg-slate-900/30 border-white/[0.05] hover:bg-slate-900/60 hover:border-white/10"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-md font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      completed
                        ? "bg-emerald-500 text-slate-950 font-bold"
                        : active
                        ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                        : "bg-slate-800 text-slate-400"
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
                    <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                      {taskSolvedCount}/{task.quizzes.length} answered
                    </p>
                  </div>
                </button>
              );
            })}

            {isAllCourseCompleted && (
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/25 text-xs text-emerald-300 flex items-center gap-2.5 mt-4">
                <Trophy className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="font-semibold leading-relaxed">
                  Congratulations! All questions completed.
                </span>
              </div>
            )}
          </div>

          {/* Right Column (Lesson Reading & Quizzes) */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-6">
            <article className="nerms-glass-panel rounded-2xl p-6 sm:p-10 space-y-6">
              {/* Task Title */}
              <div className="pb-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold mb-1">
                  <span>TASK {activeTask.id} OF {course.tasks.length}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {activeTask.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  {activeTask.shortDescription}
                </p>
              </div>

              {/* Lesson Narrative Content - Comfortable reading leading and contrast */}
              <div className="space-y-4 text-xs sm:text-[14px] text-slate-200 leading-[1.75] font-normal">
                {activeTask.content.map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}
              </div>

              {/* Embedded Visual Diagrams */}
              {activeTask.hasDiagram === "triad" && <TriadDiagram />}
              {activeTask.hasDiagram === "components" && <ComponentFlowDiagram />}
              {activeTask.hasDiagram === "purdue" && <PurdueDiagram />}

              {/* Key Takeaways Box */}
              <div className="p-4 sm:p-5 rounded-xl bg-emerald-950/[0.15] border border-emerald-500/20 space-y-2">
                <h4 className="text-xs font-bold font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Key Takeaways
                </h4>
                <ul className="text-xs sm:text-[13px] text-slate-300 space-y-1.5 list-disc list-inside">
                  {activeTask.keyTakeaways.map((item, kIdx) => (
                    <li key={kIdx} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* TryHackMe-Fashion Quizzes */}
              <div className="pt-6 border-t border-white/[0.06] space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    Knowledge Checks ({activeTask.quizzes.length})
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">
                    Type your answer below
                  </span>
                </div>

                <div className="space-y-3">
                  {activeTask.quizzes.map((quiz) => (
                    <QuizQuestion
                      key={quiz.id}
                      id={quiz.id}
                      question={quiz.question}
                      correctAnswers={quiz.correctAnswers}
                      hint={quiz.hint}
                      formatGuide={quiz.formatGuide}
                      points={quiz.points}
                      isSolved={solvedQuizIds.includes(quiz.id)}
                      onSolve={handleSolveQuestion}
                    />
                  ))}
                </div>
              </div>

              {/* Stepper Navigation Buttons */}
              <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between">
                <button
                  type="button"
                  disabled={activeTaskIdx === 0}
                  onClick={() => setActiveTaskIdx((prev) => Math.max(0, prev - 1))}
                  className="px-4 py-2 rounded-xl text-xs font-medium bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-[0.98]"
                >
                  ← Previous Task
                </button>

                {activeTaskIdx < course.tasks.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setActiveTaskIdx((prev) => Math.min(course.tasks.length - 1, prev + 1))}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-all flex items-center gap-1.5 active:scale-[0.98]"
                  >
                    <span>Next Task</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setActiveTaskIdx(0)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/25 hover:bg-emerald-500/25 transition-all flex items-center gap-1.5 active:scale-[0.98]"
                  >
                    <span>Review from Task 1</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </article>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
