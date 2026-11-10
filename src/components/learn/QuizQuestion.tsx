"use client";

import { useState } from "react";
import { CheckCircle2, HelpCircle, Send, Loader2 } from "lucide-react";
import confetti from "canvas-confetti";
import { verifyQuizAnswer } from "@/lib/quizCrypto";
import { useLanguage } from "@/i18n/LanguageContext";
import { useTranslation } from "@/i18n/translations";

interface QuizQuestionProps {
  id: string;
  question: string;
  correctHashes: string[];
  hint?: string;
  formatGuide?: string;
  points?: number;
  isSolved: boolean;
  savedAnswer?: string;
  onSolve: (id: string, solvedAnswer?: string) => void;
}

export function QuizQuestion({
  id,
  question,
  correctHashes,
  hint,
  formatGuide,
  points = 10,
  isSolved,
  savedAnswer,
  onSolve,
}: QuizQuestionProps) {
  const { language } = useLanguage();
  const t = useTranslation(language);

  const [inputVal, setInputVal] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [solvedText, setSolvedText] = useState(savedAnswer || "");

  const placeholderText = formatGuide || t.quiz.placeholder;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSolved || isChecking) return;

    if (!inputVal.trim()) {
      setErrorMsg(t.quiz.errorEmpty);
      return;
    }

    setIsChecking(true);
    setErrorMsg("");

    try {
      const isCorrect = await verifyQuizAnswer(inputVal, correctHashes);

      if (isCorrect) {
        const cleanAnswer = inputVal.trim();
        setSolvedText(cleanAnswer);
        onSolve(id, cleanAnswer);
        try {
          confetti({
            particleCount: 35,
            spread: 40,
            origin: { y: 0.8 },
            colors: ["#10b981", "#34d399", "#38bdf8"],
          });
        } catch {
          // Fallback
        }
      } else {
        setErrorMsg(t.quiz.errorIncorrect);
      }
    } catch {
      setErrorMsg(t.quiz.errorIncorrect);
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div
      className={`p-4 sm:p-5 rounded-2xl transition-all duration-140 ${
        isSolved
          ? "bg-emerald-950/20 border border-emerald-400/25"
          : "nerms-liquid-pod hover:border-white/[0.14]"
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <p className="text-xs sm:text-[13px] font-medium text-slate-200 leading-relaxed">
          {question}
        </p>
        <span
          className={`text-[10px] font-mono font-medium px-2.5 py-0.5 rounded-full shrink-0 border tabular-nums ${
            isSolved
              ? "bg-emerald-500/15 text-emerald-300 border-emerald-400/30"
              : "bg-white/[0.04] text-slate-400 border-white/[0.08]"
          }`}
        >
          {isSolved ? t.quiz.solved : `+${points} ${t.quiz.points}`}
        </span>
      </div>

      {isSolved ? (
        <div className="flex items-center gap-2 pt-2.5 border-t border-emerald-500/20 text-xs font-mono text-emerald-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-semibold">{solvedText || savedAnswer || t.quiz.verified}</span>
          <span className="text-slate-400 text-[11px] font-sans font-normal ml-auto">{t.quiz.verified}</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2 pt-2.5 border-t border-white/[0.06]">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputVal}
              disabled={isChecking}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={placeholderText}
              className="flex-1 px-3.5 py-2 rounded-xl nerms-input text-xs font-mono placeholder:text-slate-500 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isChecking}
              className="nerms-liquid-btn-primary px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shrink-0 disabled:opacity-50"
            >
              {isChecking ? (
                <>
                  <span>{t.quiz.checking}</span>
                  <Loader2 className="w-3 h-3 animate-spin" />
                </>
              ) : (
                <>
                  <span>{t.quiz.submit}</span>
                  <Send className="w-3 h-3" />
                </>
              )}
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
                <span>{showHint ? t.quiz.hideHint : t.quiz.needHint}</span>
              </button>
              {showHint && (
                <p className="mt-1.5 p-3 rounded-xl nerms-liquid-pod border-emerald-500/20 text-[11px] font-mono text-slate-300 leading-relaxed">
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
