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
  Award,
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
    <div className="flex flex-col min-h-full">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 pt-5 pb-16">
        {/* Course Banner */}
        <div className="mb-6">
          <div className="p-5 rounded-2xl bg-slate-900/40 border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-medium mb-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>OFFICIAL CURRICULUM</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                {course.title}
              </h1>
              <p className="text-xs text-slate-400 mt-1 max-w-xl leading-relaxed">
                {course.subtitle}
              </p>
            </div>

            {/* Overall Progress Widget */}
            <div className="w-full md:w-52 p-3 rounded-xl bg-slate-950/60 border border-white/5 shrink-0">
              <div className="flex items-center justify-between text-xs font-mono text-slate-300 mb-1">
                <span>PROGRESS</span>
                <span className="text-emerald-400 font-bold">{progressPercent}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-emerald-500 h-full transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-1 font-mono">
                {solvedCount} of {totalQuestions} questions solved
              </p>
            </div>
          </div>
        </div>

        {/* Course Body: Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (4 cols): Task Outline Stepper */}
          <div className="lg:col-span-4 space-y-1.5 sticky top-16">
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
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-2.5 ${
                    active
                      ? "bg-slate-800/80 border-emerald-500/40 shadow-sm"
                      : "bg-slate-900/30 border-white/[0.06] hover:bg-slate-900/60 hover:border-white/10"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded font-mono font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5 ${
                      completed
                        ? "bg-emerald-500 text-slate-950"
                        : active
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {completed ? <Check className="w-3 h-3 stroke-[3]" /> : task.id}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4
                      className={`text-xs font-semibold truncate ${
                        active ? "text-white" : "text-slate-300"
                      }`}
                    >
                      {task.title}
                    </h4>
                    <p className="text-[10px] text-slate-500 font-mono">
                      {taskSolvedCount}/{task.quizzes.length} answered
                    </p>
                  </div>
                </button>
              );
            })}

            {isAllCourseCompleted && (
              <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2 mt-3">
                <Trophy className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-semibold">All 14 questions completed! Great job!</span>
              </div>
            )}
          </div>

          {/* Right Column (8 cols): Active Lesson Reading & Quizzes */}
          <div className="lg:col-span-8 space-y-5">
            <article className="p-5 sm:p-7 rounded-2xl bg-slate-900/40 border border-white/[0.08] space-y-5">
              {/* Task Title */}
              <div className="pb-3 border-b border-white/[0.06]">
                <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400 mb-1">
                  <span>TASK {activeTask.id} OF {course.tasks.length}</span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  {activeTask.title}
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  {activeTask.shortDescription}
                </p>
              </div>

              {/* Lesson Narrative Content */}
              <div className="space-y-3.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeTask.content.map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}
              </div>

              {/* Embedded Visual Diagrams */}
              {activeTask.hasDiagram === "triad" && <TriadDiagram />}
              {activeTask.hasDiagram === "components" && <ComponentFlowDiagram />}
              {activeTask.hasDiagram === "purdue" && <PurdueDiagram />}

              {/* Key Takeaways Box */}
              <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-1.5">
                <h4 className="text-[11px] font-bold font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Key Takeaways
                </h4>
                <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                  {activeTask.keyTakeaways.map((item, kIdx) => (
                    <li key={kIdx} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* TryHackMe-Fashion Quizzes */}
              <div className="pt-5 border-t border-white/[0.08] space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    Knowledge Checks ({activeTask.quizzes.length})
                  </h3>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Type your answer below
                  </span>
                </div>

                <div className="space-y-2.5">
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
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <button
                  type="button"
                  disabled={activeTaskIdx === 0}
                  onClick={() => setActiveTaskIdx((prev) => Math.max(0, prev - 1))}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-white/5 hover:bg-white/10 text-slate-300 disabled:opacity-30 disabled:pointer-events-none transition-all"
                >
                  ← Previous
                </button>

                {activeTaskIdx < course.tasks.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setActiveTaskIdx((prev) => Math.min(course.tasks.length - 1, prev + 1))}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-all flex items-center gap-1"
                  >
                    <span>Next Task</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setActiveTaskIdx(0)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 transition-all flex items-center gap-1"
                  >
                    <span>Review from Start</span>
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
