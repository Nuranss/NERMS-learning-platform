"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FilterBar } from "@/components/catalog/FilterBar";
import { RoomCard } from "@/components/catalog/RoomCard";
import { MOCK_ROOMS } from "@/mock/roomsData";
import { Shield, Radio, Terminal, Cpu, Zap, Activity, Flame, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [selectedProtocol, setSelectedProtocol] = useState("All Protocols");

  // Filter logic
  const filteredRooms = MOCK_ROOMS.filter((room) => {
    const matchesSearch =
      room.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.protocol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.sector.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLevel = selectedLevel === "All Levels" || room.purdueLevel === selectedLevel;
    const matchesProtocol = selectedProtocol === "All Protocols" || room.protocol === selectedProtocol;

    return matchesSearch && matchesLevel && matchesProtocol;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Hero & Command Banner */}
        <section className="mb-10 relative">
          <div className="glass-panel-elevated rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl relative overflow-hidden">
            {/* Ambient subtle glow inside hero card */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 text-xs font-mono font-semibold mb-4">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>PURDUE MODEL LEVEL 0 - LEVEL 3 SIMULATIONS</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight leading-[1.15] mb-4">
                Hands-On Cybersecurity for <br />
                <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">
                  Industrial Control Systems
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed mb-6 max-w-2xl">
                Master OT/SCADA security through browser-based, gamified physical process simulations.
                Attack and defend realistic Modbus, Siemens S7, DNP3, and CIP industrial targets with zero local installation.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/rooms/water-treatment"
                  className="px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Terminal className="w-4 h-4" />
                  Launch Featured Lab: Water Plant #04
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <a
                  href="#catalog"
                  className="px-5 py-3 rounded-xl font-medium text-xs sm:text-sm glass-panel hover:bg-white/10 text-slate-200 border border-white/10 transition-all flex items-center gap-2"
                >
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  Browse 5 Active Targets
                </a>
              </div>
            </div>

            {/* Quick Metrics Bar on Frosted Surface */}
            <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <span className="text-[11px] text-slate-400 font-medium block">Active Target Labs</span>
                <span className="text-xl sm:text-2xl font-bold font-mono telemetry-num text-slate-100">5 Labs</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 font-medium block">Emulated Protocols</span>
                <span className="text-xl sm:text-2xl font-bold font-mono telemetry-num text-cyan-400">5 Protocols</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 font-medium block">Active Operators</span>
                <span className="text-xl sm:text-2xl font-bold font-mono telemetry-num text-emerald-400">5,386</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 font-medium block">Compliance Frameworks</span>
                <span className="text-xl sm:text-2xl font-bold font-mono telemetry-num text-amber-300">IEC 62443</span>
              </div>
            </div>
          </div>
        </section>

        {/* Room Catalog Section */}
        <section id="catalog" className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-100">Industrial Target Environments</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Filter by Purdue Model level, industrial communication protocol, or difficulty
              </p>
            </div>
            <span className="text-xs font-mono font-medium px-3 py-1 rounded-lg bg-slate-900 border border-white/10 text-slate-300">
              Showing {filteredRooms.length} of {MOCK_ROOMS.length} Labs
            </span>
          </div>

          {/* Filter Bar */}
          <FilterBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedLevel={selectedLevel}
            setSelectedLevel={setSelectedLevel}
            selectedProtocol={selectedProtocol}
            setSelectedProtocol={setSelectedProtocol}
          />

          {/* Rooms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>

          {filteredRooms.length === 0 && (
            <div className="w-full glass-panel rounded-2xl p-12 text-center border border-white/10 my-8">
              <Shield className="w-10 h-10 text-slate-500 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-slate-200 mb-1">No matching industrial labs found</h3>
              <p className="text-xs text-slate-400">Try adjusting your protocol or level filter criteria.</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
