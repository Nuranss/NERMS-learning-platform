"use client";

import { useState } from "react";
import { Task } from "@/mock/roomsData";
import { CheckCircle2, ChevronDown, ChevronUp, HelpCircle, Flag, Award, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

interface TaskCardProps {
  task: Task;
  isSolved: boolean;
  onSolve: (taskId: number) => void;
  unlockedFlags?: string[];
}

export function TaskCard({ task, isSolved, onSolve, unlockedFlags = [] }: TaskCardProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [showHint, setShowHint] = useState(false);
  const [inputFlag, setInputFlag] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSolved) return;

    if (inputFlag.trim() === task.flag) {
      setErrorMsg("");
      onSolve(task.id);
      // Trigger festive celebration confetti
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.7 },
          colors: ["#06b6d4", "#10b981", "#38bdf8"],
        });
      } catch (err) {
        // Safe fallback if canvas not available
      }
    } else {
      setErrorMsg("Incorrect flag. Inspect the PLC output and try again.");
    }
  };

  const isFlagAlreadyDiscovered = unlockedFlags.includes(task.flag);

  return (
    <div
      className={`glass-panel rounded-2xl border transition-all duration-200 overflow-hidden ${
        isSolved ? "border-emerald-500/30 bg-emerald-950/10" : "border-white/10"
      }`}
    >
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs ${
              isSolved
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-400/40"
                : "bg-slate-800 text-slate-300 border border-white/10"
            }`}
          >
            {isSolved ? <CheckCircle2 className="w-4 h-4" /> : task.id}
          </div>
          <div>
            <h4 className="font-semibold text-sm text-slate-100 flex items-center gap-2">
              Task {task.id}: {task.title}
            </h4>
            <p className="text-xs text-slate-400 line-clamp-1">{task.objective}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-white/5 border border-white/10 text-cyan-300 flex items-center gap-1">
            <Award className="w-3 h-3 text-cyan-400" />
            {task.points} pts
          </span>
          {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </div>
      </button>

      {/* Expanded Body */}
      {isOpen && (
        <div className="p-4 pt-2 border-t border-white/5 text-xs space-y-4">
          <p className="text-slate-300 leading-relaxed">{task.details}</p>

          {/* Hint disclosure */}
          <div>
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-[11px] text-slate-400 hover:text-cyan-300 font-medium flex items-center gap-1.5 transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span>{showHint ? "Hide Operational Hint" : "Need a Hint?"}</span>
            </button>
            {showHint && (
              <div className="mt-2 p-3 rounded-xl bg-slate-900/80 border border-cyan-500/20 text-slate-300 text-[11px] font-mono">
                {task.hint}
              </div>
            )}
          </div>

          {/* Auto-suggest if flag was discovered in terminal */}
          {!isSolved && isFlagAlreadyDiscovered && (
            <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-400/30 flex items-center justify-between">
              <span className="text-[11px] text-cyan-300 font-mono">
                💡 Discovered from console: <code className="font-bold">{task.flag}</code>
              </span>
              <button
                type="button"
                onClick={() => setInputFlag(task.flag)}
                className="px-2 py-1 rounded text-[10px] font-mono bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 border border-cyan-400/30"
              >
                Auto-fill
              </button>
            </div>
          )}

          {/* Flag Submission Form */}
          {isSolved ? (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-emerald-300 font-mono">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold">Task Completed!</span>
                <span className="text-xs text-slate-400 font-normal">[{task.flag}]</span>
              </div>
              <span className="text-xs font-bold text-emerald-400">+{task.points} XP</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Flag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={inputFlag}
                    onChange={(e) => setInputFlag(e.target.value)}
                    placeholder="Submit flag (e.g. FLAG{...})"
                    className="w-full pl-9 pr-3 py-2 rounded-xl glass-input text-xs font-mono text-slate-100 placeholder:text-slate-500 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl font-medium text-xs font-mono bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 border border-cyan-400/30 active:scale-95 transition-all shadow-md"
                >
                  Submit Flag
                </button>
              </div>

              {errorMsg && <p className="text-[11px] text-rose-400 font-mono">{errorMsg}</p>}
            </form>
          )}
        </div>
      )}
    </div>
  );
}
