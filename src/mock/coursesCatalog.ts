export interface CourseSummary {
  id: string;
  slug: string;
  title: string;
  titleAz: string;
  subtitle: string;
  subtitleAz: string;
  category: string;
  categoryAz: string;
  level: string;
  levelAz: string;
  estimatedMinutes: number;
  modulesCount: number;
  quizzesCount: number;
  tags: string[];
  tagsAz: string[];
  isAvailable: boolean;
  href: string;
}

export const COURSES_CATALOG: CourseSummary[] = [
  {
    id: "intro-to-ics",
    slug: "intro-to-ics",
    title: "Introduction to ICS & OT Cybersecurity",
    titleAz: "Sənaye İdarəetmə Sistemləri (ICS) və OT Kiber Təhlükəsizliyinə Giriş",
    subtitle: "Master the foundations of Operational Technology, plant anatomy (PLCs, HMIs, Historians), the Purdue Model, and legacy protocol vulnerabilities.",
    subtitleAz: "Əməliyyat Texnologiyasının əsasları, zavod quruluşu (PLC-lər, HMI-lar, Tarixçilər), Purdue Modeli və köhnə sənaye protokolu zəiflikləri.",
    category: "Fundamentals",
    categoryAz: "Əsaslar",
    level: "Foundational",
    levelAz: "Baza Səviyyə",
    estimatedMinutes: 45,
    modulesCount: 5,
    quizzesCount: 14,
    tags: ["Purdue Model", "Modbus TCP", "PLCs & HMIs", "SIS Failsafes"],
    tagsAz: ["Purdue Modeli", "Modbus TCP", "PLC və HMI", "SIS Qoruyucuları"],
    isAvailable: true,
    href: "/rooms/intro-to-ics",
  },
];
