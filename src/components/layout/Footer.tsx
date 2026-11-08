"use client";

import { useLanguage } from "@/i18n/LanguageContext";
import { useTranslation } from "@/i18n/translations";

export function Footer() {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <footer className="w-full mt-auto border-t border-white/[0.06] py-4 px-4 text-center text-[11px] text-slate-500">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="font-mono text-slate-400">
          {t.footer.title}
        </p>
        <p className="text-slate-500">
          {t.footer.standards}
        </p>
      </div>
    </footer>
  );
}
