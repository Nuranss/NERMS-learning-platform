"use client";

import { Search, SlidersHorizontal } from "lucide-react";

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
  selectedProtocol: string;
  setSelectedProtocol: (protocol: string) => void;
}

export function FilterBar({
  searchQuery,
  setSearchQuery,
  selectedLevel,
  setSelectedLevel,
  selectedProtocol,
  setSelectedProtocol,
}: FilterBarProps) {
  const levels = ["All Levels", "Level 1: Basic Control", "Level 2: Supervisory", "Level 3: Operations DMZ"];
  const protocols = ["All Protocols", "Modbus TCP", "Siemens S7", "DNP3", "EtherNet/IP", "BACnet/IP"];

  return (
    <div className="w-full glass-panel rounded-2xl p-4 sm:p-5 border border-white/10 shadow-xl mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
      {/* Search Bar */}
      <div className="relative flex-1">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search industrial plants, CVEs, protocols (e.g. Modbus, Stuxnet)..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
        />
      </div>

      {/* Filter Dropdowns / Chips */}
      <div className="flex flex-wrap items-center gap-2.5">
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mr-1">
          <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
          <span>Filters:</span>
        </div>

        {/* Purdue Level Filter */}
        <select
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
          aria-label="Filter by Purdue Level"
          className="px-3 py-2 rounded-xl glass-input text-xs font-medium text-slate-200 cursor-pointer focus:outline-none border border-white/10 hover:border-cyan-400/30 transition-colors"
        >
          {levels.map((lvl) => (
            <option key={lvl} value={lvl} className="bg-slate-900 text-slate-200">
              {lvl}
            </option>
          ))}
        </select>

        {/* Protocol Filter */}
        <select
          value={selectedProtocol}
          onChange={(e) => setSelectedProtocol(e.target.value)}
          aria-label="Filter by OT Protocol"
          className="px-3 py-2 rounded-xl glass-input text-xs font-medium text-slate-200 cursor-pointer focus:outline-none border border-white/10 hover:border-cyan-400/30 transition-colors"
        >
          {protocols.map((proto) => (
            <option key={proto} value={proto} className="bg-slate-900 text-slate-200">
              {proto}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
