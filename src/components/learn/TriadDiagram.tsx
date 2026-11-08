"use client";

import { useLanguage } from "@/i18n/LanguageContext";

export function TriadDiagram() {
  const { language } = useLanguage();
  const isAz = language === "az";

  return (
    <div className="w-full my-6 p-5 sm:p-6 rounded-2xl bg-slate-900/30 border border-white/[0.06] shadow-sm">
      <div className="text-center mb-5">
        <h4 className="text-xs sm:text-sm font-semibold text-slate-100 tracking-tight">
          {isAz
            ? "Əsas Paradigma Dəyişikliyi: IT və OT Prioritetləri"
            : "The Core Paradigm Shift: IT vs. OT Priorities"}
        </h4>
        <p className="text-xs text-slate-400 mt-0.5">
          {isAz
            ? "Niyə standart korporativ IT təhlükəsizlik qaydaları sənaye müəssisəsinin işini poza bilər"
            : "Why standard corporate IT security policies can disrupt an industrial facility"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Traditional IT: CIA Triad */}
        <div className="p-4 sm:p-5 rounded-xl bg-slate-950/40 border border-white/[0.06] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-mono text-cyan-400 tracking-wide">
              {isAz ? "ƏNƏNƏVİ IT" : "TRADITIONAL IT"}
            </span>
            <span className="text-[11px] font-mono text-slate-400">"CIA TRIAD"</span>
          </div>

          <div className="space-y-2">
            <div className="p-2.5 rounded-lg bg-cyan-950/20 border border-cyan-500/20 flex items-center gap-3">
              <span className="w-6 h-6 rounded-md bg-cyan-500/15 text-cyan-300 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                1
              </span>
              <div>
                <p className="text-xs font-semibold text-slate-100">
                  {isAz ? "Məxfilik (1-ci Prioritet)" : "Confidentiality (Priority #1)"}
                </p>
                <p className="text-[11px] text-slate-400 leading-tight">
                  {isAz
                    ? "Müştəri məlumatlarını, parolları və biznes əqli mülkiyyətini qorumaq."
                    : "Protect customer records, credentials, and business IP."}
                </p>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900/40 border border-white/[0.04] flex items-center gap-3">
              <span className="w-6 h-6 rounded-md bg-slate-800/80 text-slate-300 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                2
              </span>
              <div>
                <p className="text-xs font-semibold text-slate-200">
                  {isAz ? "Bütövlük (Integrity)" : "Integrity"}
                </p>
                <p className="text-[11px] text-slate-400 leading-tight">
                  {isAz
                    ? "Maliyyə qeydlərinin və bazaların dəyişdirilməz qalmasını təmin etmək."
                    : "Ensure financial records and databases remain untampered."}
                </p>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900/30 border border-white/[0.04] flex items-center gap-3">
              <span className="w-6 h-6 rounded-md bg-slate-800/60 text-slate-400 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                3
              </span>
              <div>
                <p className="text-xs font-semibold text-slate-300">
                  {isAz ? "Əlçatanlıq (Availability)" : "Availability"}
                </p>
                <p className="text-[11px] text-slate-400 leading-tight">
                  {isAz
                    ? "Planlaşdırılmış baxım üçün serverləri yenidən yükləmək və ya söndürmək məqbuldur."
                    : "Acceptable to reboot or take servers offline for scheduled maintenance."}
                </p>
              </div>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 italic pt-1 border-t border-white/[0.04]">
            {isAz
              ? "Uğursuzluq nəticəsi: Məlumat sızması, tənzimləyici cərimələr, işin dayanması."
              : "Failure outcome: Data exposure, regulatory fines, business disruption."}
          </p>
        </div>

        {/* Industrial OT: AIC Triad */}
        <div className="p-4 sm:p-5 rounded-xl bg-slate-950/40 border border-emerald-500/20 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-mono text-emerald-400 tracking-wide">
              {isAz ? "ƏMƏLİYYAT TEXNOLOGİYASI (OT)" : "OPERATIONAL TECH (OT)"}
            </span>
            <span className="text-[11px] font-mono text-emerald-400/80">"AIC / SAFETY FIRST"</span>
          </div>

          <div className="space-y-2">
            <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/25 flex items-center gap-3">
              <span className="w-6 h-6 rounded-md bg-emerald-500/15 text-emerald-300 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                1
              </span>
              <div>
                <p className="text-xs font-semibold text-slate-100">
                  {isAz ? "Əlçatanlıq və Təhlükəsizlik (1-ci Prioritet)" : "Availability & Safety (Priority #1)"}
                </p>
                <p className="text-[11px] text-slate-300 leading-tight">
                  {isAz
                    ? "Fasiləsiz 24/7/365 iş rejimi. Qəfil söndürmələr fiziki zərər verə bilər."
                    : "Uninterrupted 24/7/365 runtime. Unplanned reboots can cause damage."}
                </p>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900/40 border border-white/[0.04] flex items-center gap-3">
              <span className="w-6 h-6 rounded-md bg-slate-800/80 text-slate-300 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                2
              </span>
              <div>
                <p className="text-xs font-semibold text-slate-200">
                  {isAz ? "Bütövlük (Integrity)" : "Integrity"}
                </p>
                <p className="text-[11px] text-slate-400 leading-tight">
                  {isAz
                    ? "Sensor göstəriciləri və klapan idarəetmə əmrləri 100% dəqiq olmalıdır."
                    : "Sensor readings and valve control commands must be 100% accurate."}
                </p>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900/30 border border-white/[0.04] flex items-center gap-3">
              <span className="w-6 h-6 rounded-md bg-slate-800/60 text-slate-400 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                3
              </span>
              <div>
                <p className="text-xs font-semibold text-slate-300">
                  {isAz ? "Məxfilik (Confidentiality)" : "Confidentiality"}
                </p>
                <p className="text-[11px] text-slate-400 leading-tight">
                  {isAz
                    ? "İkincili. Gecikməni aradan qaldırmaq üçün paketlər çox vaxt açıq mətndə ötürülür."
                    : "Secondary. Packets are often plain text to eliminate crypto latency."}
                </p>
              </div>
            </div>
          </div>
          <p className="text-[11px] text-emerald-400/80 italic pt-1 border-t border-white/[0.04]">
            {isAz
              ? "Uğursuzluq nəticəsi: Avadanlıq zədələnməsi, boru partlaması, blackout, xəsarət."
              : "Failure outcome: Equipment damage, pipeline rupture, regional blackout, injury."}
          </p>
        </div>
      </div>
    </div>
  );
}
