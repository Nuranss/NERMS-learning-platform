"use client";

import { useLanguage } from "@/i18n/LanguageContext";
import { useTranslation } from "@/i18n/translations";

export function Footer() {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <footer className="w-full mt-auto border-t border-white/[0.08] bg-black/25 backdrop-blur-xl py-5 px-6 text-xs text-slate-400">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-slate-300/90 font-medium">
          {t.footer.copyright}
        </p>
        <p className="text-slate-400 font-normal">
          {t.footer.affiliation}
        </p>
      </div>
    </footer>
  );
}
