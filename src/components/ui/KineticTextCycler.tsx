"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

interface KineticTextCyclerProps {
  className?: string;
}

const PHRASES_EN = [
  "Operational Technology (OT) Systems",
  "SCADA & Industrial Control Networks",
  "Purdue Model Defense-in-Depth",
  "PLC & RTU Control Plane Security",
  "Critical Infrastructure Resilience",
];

const PHRASES_AZ = [
  "Əməliyyat Texnologiyası (OT) Sistemləri",
  "SCADA və Sənaye İdarəetmə Şəbəkələri",
  "Purdue Modeli Dərindən Müdafiə",
  "PLC və RTU İdarəetmə Təhlükəsizliyi",
  "Kritik İnfrastruktur Mühafizəsi",
];

export function KineticTextCycler({ className = "" }: KineticTextCyclerProps) {
  const { language } = useLanguage();
  const phrases = language === "az" ? PHRASES_AZ : PHRASES_EN;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let hold: number;
    let transition: number;

    const sync = () => {
      window.clearInterval(hold);
      window.clearTimeout(transition);
      if (motion.matches || document.hidden) return;

      hold = window.setInterval(() => {
        setExiting(true);
        transition = window.setTimeout(() => {
          setCurrentIndex((index) => (index + 1) % phrases.length);
          setExiting(false);
        }, 180);
      }, 3200);
    };

    const handlePreferenceChange = () => {
      setExiting(false);
      sync();
    };

    sync();
    motion.addEventListener("change", handlePreferenceChange);
    document.addEventListener("visibilitychange", handlePreferenceChange);
    return () => {
      window.clearInterval(hold);
      window.clearTimeout(transition);
      motion.removeEventListener("change", handlePreferenceChange);
      document.removeEventListener("visibilitychange", handlePreferenceChange);
    };
  }, [phrases.length]);

  return (
    <span aria-hidden="true" className={`mt-3 grid min-w-0 overflow-hidden text-emerald-300 ${className}`}>
      {phrases.map((phrase) => (
        <span key={phrase} className="invisible col-start-1 row-start-1">{phrase}</span>
      ))}
      <span key={currentIndex} className="home-topic col-start-1 row-start-1" data-exiting={exiting}>
        {phrases[currentIndex]}
      </span>
    </span>
  );
}
