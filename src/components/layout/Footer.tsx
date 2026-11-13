"use client";

import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageContext";
import { useTranslation } from "@/i18n/translations";

export function Footer({ variant = "compact" }: { variant?: "compact" | "home" }) {
  const { language } = useLanguage();
  const t = useTranslation(language);

  if (variant === "home") {
    return (
      <footer className="relative mt-auto w-full border-t border-white/[0.06] bg-[#141416] tracking-normal">
        <div className="w-full px-5 pb-6 pt-12 sm:px-10 sm:pt-16 lg:pt-20">
          <div className="grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-3 sm:gap-x-8 lg:grid-cols-[1.55fr_1fr_1fr_1fr]">
            <div className="col-span-full lg:col-span-1">
              <Image src="/nerms-logo.png" alt="NERMS" width={260} height={86} className="h-14 w-auto object-contain sm:h-16" />
              <p className="mt-3 max-w-[17rem] text-pretty text-[15px] leading-6 text-neutral-300">{t.footer.description}</p>
            </div>
            {t.footer.columns.map(({ title, entries }) => (
              <div key={title}>
                <h2 className="mb-4 text-[17px] leading-6 font-semibold tracking-tight text-neutral-100 [font-family:inherit]">{title}</h2>
                <ul className="space-y-2 text-[15px] leading-6 text-neutral-300">
                  {entries.map((entry) => <li key={entry}>{entry}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-2 text-[13px] leading-5 text-neutral-400 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between lg:mt-10">
            <p>{t.footer.copyright}</p>
            <p>{t.footer.affiliation}</p>
          </div>
        </div>
      </footer>
    );
  }

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
