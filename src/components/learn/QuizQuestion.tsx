"use client";

import { useState } from "react";
import { CheckCircle2, HelpCircle, Send, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

interface QuizQuestionProps {
  id: string;
  question: string;
  correctAnswers: string[];
  hint?: string;
  formatGuide?: string;
  points?: number;
  isSolved: boolean;
  onSolve: (id: string) => void;
}

export function QuizQuestion({
  id,
  question,
  correctAnswers,
  hint,
  formatGuide = "Answer...",
  points = 10,
  isSolved,
  onSolve,
}: QuizQuestionProps) {
  const [inputVal, setInputVal] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSolved) return;

    const trimmed = inputVal.trim().toLowerCase();
    const isCorrect = correctAnswers.some((ans) => ans.trim().toLowerCase() === trimmed);

    if (isCorrect) {
      setErrorMsg("");
      onSolve(id);
      try {
        confetti({
          particleCount: 45,
          spread: 45,
          origin: { y: 0.8 },
          colors: ["#10b981", "#34d399", "#38bdf8"],
        });
      } catch (err) {
        // Fallback
      }
    } else {
      setErrorMsg("Incorrect answer. Review the notes above or check the hint.");
    }
  };

  return (
    <div
      className={`p-4 sm:p-5 rounded-xl border transition-all duration-200 ${
        isSolved
          ? "bg-emerald-950/[0.18] border-emerald-500/25 shadow-sm"
          : "bg-slate-950/40 border-white/[0.07] hover:border-white/[0.12]"
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <p className="text-xs sm:text-[13px] font-medium text-slate-200 leading-relaxed">
          {question}
        </p>
        <span
          className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded shrink-0 border ${
            isSolved
              ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/25"
              : "bg-white/[0.04] text-slate-400 border-white/[0.08]"
          }`}
        >
          {isSolved ? "SOLVED" : `+${points} pts`}
        </span>
      </div>

      {isSolved ? (
        <div className="flex items-center gap-2 pt-2.5 border-t border-emerald-500/15 text-xs font-mono text-emerald-300/90">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-semibold">{correctAnswers[0]}</span>
          <span className="text-slate-500 text-[11px] font-sans font-normal ml-auto">Correct</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2 pt-2.5 border-t border-white/[0.06]">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={formatGuide}
              className="flex-1 px-3.5 py-2 rounded-lg nerms-input text-xs font-mono placeholder:text-slate-500 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm active:scale-[0.97] transition-all flex items-center gap-1.5 shrink-0"
            >
              <span>Submit</span>
              <Send className="w-3 h-3" />
            </button>
          </div>

          {errorMsg && (
            <p className="text-[11px] text-rose-400 font-mono pt-0.5">{errorMsg}</p>
          )}

          {hint && (
            <div className="pt-0.5">
              <button
                type="button"
                onClick={() => setShowHint(!showHint)}
                className="text-[11px] text-slate-400 hover:text-emerald-400 flex items-center gap-1.5 transition-colors"
              >
                <HelpCircle className="w-3 h-3 text-emerald-400" />
                <span>{showHint ? "Hide hint" : "Need a hint?"}</span>
              </button>
              {showHint && (
                <p className="mt-1.5 p-2.5 rounded-lg bg-slate-900/80 border border-emerald-500/20 text-[11px] font-mono text-slate-300 leading-relaxed">
                  {hint}
                </p>
              )}
            </div>
          )}
        </form>
      )}
    </div>
  );
}
