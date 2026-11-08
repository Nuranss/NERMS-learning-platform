"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MOCK_ROOMS } from "@/mock/roomsData";
import {
  BookOpen,
  Terminal,
  ArrowRight,
  Shield,
  Layers,
  Radio,
  Flame,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";

export function getPurdueBadge(level: string) {
  if (level.includes("Level 1")) return "bg-amber-500/15 text-amber-300 border-amber-500/30";
  if (level.includes("Level 2")) return "bg-cyan-500/15 text-cyan-300 border-cyan-500/30";
  return "bg-purple-500/15 text-purple-300 border-purple-500/30";
}

export default function HomePage() {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filteredRooms = MOCK_ROOMS.filter((room) => {
    if (selectedFilter === "All") return true;
    return room.protocol.includes(selectedFilter);
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 pt-10 pb-20">
        {/* Clean, De-cluttered Hero Section */}
        <section className="mb-14 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-mono font-medium mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>LEARN ICS & OT CYBERSECURITY</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Industrial Control Systems, <br />
            <span className="text-emerald-400">Made Clear & Hands-On.</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8">
            Learn how power grids, water facilities, and chemical plants operate. Master the Purdue
            Model, industrial protocols like Modbus and S7, and how to defend critical physical infrastructure.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/rooms/intro-to-ics"
              className="px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-all flex items-center gap-2 active:scale-95"
            >
              <BookOpen className="w-4 h-4" />
              <span>Start Course: Introduction to ICS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/rooms/water-treatment"
              className="px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/10 transition-all flex items-center gap-2"
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Jump to SCADA Lab</span>
            </Link>
          </div>
        </section>

        {/* Featured Course Card: Introduction to ICS */}
        <section className="mb-14">
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-emerald-500/30 relative overflow-hidden group">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>RECOMMENDED STARTING POINT</span>
                  <span>•</span>
                  <span>5 MODULES</span>
                  <span>•</span>
                  <span>14 QUIZ QUESTIONS</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                  Introduction to ICS & OT Cybersecurity
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Start from the absolute basics: understanding the difference between IT and OT,
                  decoding plant anatomy (PLCs, HMIs, and SCADA), navigating the Purdue Model with
                  interactive visual diagrams, and testing your knowledge with TryHackMe-style quizzes.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Purdue Model Diagrams
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    IT vs OT Triad Comparison
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Interactive Quizzes
                  </span>
                </div>
              </div>

              <div className="shrink-0">
                <Link
                  href="/rooms/intro-to-ics"
                  className="px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm flex items-center gap-2 active:scale-95 transition-all"
                >
                  <span>Begin Intro Course</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Hands-On Simulation Labs Section */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">Hands-On Industrial Labs</h3>
              <p className="text-xs text-slate-400">
                Practice attacking and defending simulated PLCs and SCADA processes in your browser.
              </p>
            </div>

            {/* Simple protocol filters */}
            <div className="flex items-center gap-1 text-xs">
              {["All", "Modbus", "S7", "DNP3", "EtherNet/IP", "BACnet"].map((proto) => (
                <button
                  key={proto}
                  onClick={() => setSelectedFilter(proto)}
                  className={`px-2.5 py-1 rounded-lg font-mono transition-colors ${
                    selectedFilter === proto
                      ? "bg-white/10 text-white font-semibold"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {proto}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredRooms.map((room) => (
              <div
                key={room.id}
                className="p-5 rounded-2xl bg-slate-900/40 border border-white/[0.08] hover:border-white/15 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${getPurdueBadge(room.purdueLevel)}`}>
                      {room.purdueLevel.split(":")[0]}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                      {room.protocol}:{room.port}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-100 mb-1 leading-snug">
                    {room.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 font-medium mb-3">
                    {room.facility}
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-2">
                    {room.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    {room.estimatedMinutes} mins
                  </span>

                  <Link
                    href={`/rooms/${room.id}`}
                    className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
                  >
                    <span>Launch Lab</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
