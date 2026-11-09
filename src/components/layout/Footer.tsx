"use client";

import { useLanguage } from "@/i18n/LanguageContext";
import { useTranslation } from "@/i18n/translations";

export function Footer() {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <footer className="w-full mt-auto border-t border-white/[0.06] py-5 px-6 text-xs text-slate-500">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-slate-400">
          {t.footer.copyright}
        </p>
        <p className="text-slate-500">
          {t.footer.affiliation}
        </p>
      </div>
    </footer>
  );
}
