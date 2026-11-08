"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { INTRO_COURSE_DATA, IntroTask } from "@/mock/introCourseData";
import { TriadDiagram } from "@/components/learn/TriadDiagram";
import { PurdueDiagram } from "@/components/learn/PurdueDiagram";
import { ComponentFlowDiagram } from "@/components/learn/ComponentFlowDiagram";
import { QuizQuestion } from "@/components/learn/QuizQuestion";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock,
  Sparkles,
  Award,
  ChevronRight,
  ShieldCheck,
  Check,
  Flame,
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

  // Helper to check if a specific task has all quizzes answered
  const isTaskCompleted = (task: IntroTask) => {
    return task.quizzes.every((q) => solvedQuizIds.includes(q.id));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 pt-6 pb-20">
        {/* Back Link & Header Summary */}
        <div className="mb-6">
          <Link
            href="/"
            className="text-xs font-medium text-slate-400 hover:text-emerald-400 flex items-center gap-1.5 transition-colors mb-3"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </Link>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-medium mb-2">
                <BookOpen className="w-3.5 h-3.5" />
                <span>FOUNDATIONAL MODULE</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {course.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
                {course.subtitle}
              </p>
            </div>

            {/* Overall Progress Widget */}
            <div className="w-full md:w-56 p-3.5 rounded-xl bg-slate-950/60 border border-white/5 shrink-0">
              <div className="flex items-center justify-between text-xs font-mono text-slate-300 mb-1.5">
                <span>COURSE PROGRESS</span>
                <span className="text-emerald-400 font-bold">{progressPercent}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-emerald-500 h-full transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1.5 font-mono">
                {solvedCount} of {totalQuestions} questions solved
              </p>
            </div>
          </div>
        </div>

        {/* Course Body: Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (4 cols): Task Navigation Stepper */}
          <div className="lg:col-span-4 space-y-2 sticky top-20">
            <h3 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider px-1 mb-2">
              Course Outline
            </h3>

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
                      ? "bg-slate-800/80 border-emerald-500/40 shadow-sm"
                      : "bg-slate-900/30 border-white/[0.06] hover:bg-slate-900/60 hover:border-white/10"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 ${
                      completed
                        ? "bg-emerald-500 text-slate-950"
                        : active
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {completed ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : task.id}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4
                      className={`text-xs font-semibold truncate ${
                        active ? "text-white" : "text-slate-300"
                      }`}
                    >
                      {task.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                      {taskSolvedCount}/{task.quizzes.length} questions
                    </p>
                  </div>
                </button>
              );
            })}

            {/* Quick link to practice lab */}
            <div className="p-4 rounded-xl bg-slate-900/20 border border-white/5 mt-4 text-xs text-slate-400">
              <span className="font-semibold text-slate-300 block mb-1">Ready for hands-on?</span>
              <p className="text-[11px] leading-relaxed mb-2">
                After completing the basics, practice attacking an unauthenticated PLC in our virtual plant.
              </p>
              <Link
                href="/rooms/water-treatment"
                className="text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1"
              >
                Launch Water Treatment Lab →
              </Link>
            </div>
          </div>

          {/* Right Column (8 cols): Active Lesson Reading & Quizzes */}
          <div className="lg:col-span-8 space-y-6">
            <article className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-white/[0.08] space-y-6">
              {/* Task Title */}
              <div className="pb-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
                  <span>TASK {activeTask.id} OF {course.tasks.length}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {activeTask.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  {activeTask.shortDescription}
                </p>
              </div>

              {/* Lesson Narrative Content */}
              <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeTask.content.map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}
              </div>

              {/* Embedded Visual Diagram (if applicable) */}
              {activeTask.hasDiagram === "triad" && <TriadDiagram />}
              {activeTask.hasDiagram === "components" && <ComponentFlowDiagram />}
              {activeTask.hasDiagram === "purdue" && <PurdueDiagram />}

              {/* Key Takeaways Box */}
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-2">
                <h4 className="text-xs font-bold font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Key Takeaways
                </h4>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  {activeTask.keyTakeaways.map((item, kIdx) => (
                    <li key={kIdx} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* TryHackMe-Fashion Quizzes */}
              <div className="pt-6 border-t border-white/[0.08] space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    Knowledge Checks ({activeTask.quizzes.length})
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">
                    Type your answer in the box below
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
                  className="px-4 py-2 rounded-xl text-xs font-medium bg-white/5 hover:bg-white/10 text-slate-300 disabled:opacity-30 disabled:pointer-events-none transition-all"
                >
                  ← Previous Task
                </button>

                {activeTaskIdx < course.tasks.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setActiveTaskIdx((prev) => Math.min(course.tasks.length - 1, prev + 1))}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-all flex items-center gap-1.5"
                  >
                    <span>Next Task</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <Link
                    href="/rooms/water-treatment"
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold shadow-md transition-all flex items-center gap-1.5"
                  >
                    <span>Proceed to Hands-On Lab</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
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
