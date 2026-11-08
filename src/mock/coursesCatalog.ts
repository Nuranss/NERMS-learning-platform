export interface CourseSummary {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: "Fundamentals" | "Protocols & SCADA" | "Offensive OT" | "Defensive & Forensics";
  level: "Foundational" | "Intermediate" | "Advanced";
  estimatedMinutes: number;
  modulesCount: number;
  quizzesCount: number;
  tags: string[];
  isAvailable: boolean;
  href: string;
}

export const COURSES_CATALOG: CourseSummary[] = [
  {
    id: "intro-to-ics",
    slug: "intro-to-ics",
    title: "Introduction to ICS & OT Cybersecurity",
    subtitle: "Master the foundations of Operational Technology, plant anatomy (PLCs, HMIs, Historians), the Purdue Model, and legacy protocol vulnerabilities.",
    category: "Fundamentals",
    level: "Foundational",
    estimatedMinutes: 45,
    modulesCount: 5,
    quizzesCount: 14,
    tags: ["Purdue Model", "Modbus TCP", "PLCs & HMIs", "SIS Failsafes"],
    isAvailable: true,
    href: "/rooms/intro-to-ics",
  },
];
