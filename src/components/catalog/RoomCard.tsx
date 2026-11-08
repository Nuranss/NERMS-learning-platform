import Link from "next/link";
import { ICSRoom } from "@/mock/roomsData";
import { Shield, Zap, Clock, Users, ArrowRight, AlertTriangle, Radio } from "lucide-react";

interface RoomCardProps {
  room: ICSRoom;
}

export function RoomCard({ room }: RoomCardProps) {
  // Purdue level styling
  const getPurdueBadge = (level: string) => {
    if (level.includes("Level 1")) {
      return "bg-amber-500/15 border-amber-400/30 text-amber-300";
    }
    if (level.includes("Level 2")) {
      return "bg-cyan-500/15 border-cyan-400/30 text-cyan-300";
    }
    return "bg-purple-500/15 border-purple-400/30 text-purple-300";
  };

  // Kinetic Severity styling
  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case "Catastrophic":
        return "text-rose-400 bg-rose-500/15 border-rose-500/30";
      case "Severe":
      case "High":
        return "text-amber-400 bg-amber-500/15 border-amber-500/30";
      default:
        return "text-cyan-400 bg-cyan-500/15 border-cyan-500/30";
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6 border border-white/10 flex flex-col justify-between group relative overflow-hidden">
      {/* Featured ribbon highlight */}
      {room.isFeatured && (
        <div className="absolute top-0 right-0 bg-gradient-to-l from-cyan-500/20 to-transparent pl-8 pr-4 py-1 text-[11px] font-mono text-cyan-300 font-bold border-b border-l border-cyan-400/30 rounded-bl-xl flex items-center gap-1.5">
          <Zap className="w-3 h-3 text-cyan-400 fill-cyan-400" />
          FEATURED LAB
        </div>
      )}

      {/* Card Header & Badges */}
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md border ${getPurdueBadge(room.purdueLevel)}`}>
            {room.purdueLevel}
          </span>
          <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-md bg-slate-800/80 border border-white/10 text-slate-300 flex items-center gap-1">
            <Radio className="w-2.5 h-2.5 text-cyan-400" />
            {room.protocol}:{room.port}
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors leading-snug mb-1">
          {room.title}
        </h3>
        
        <p className="text-xs text-slate-400 font-medium mb-3 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-500 inline-block" />
          {room.facility} • <span className="text-slate-300">{room.sector}</span>
        </p>

        <p className="text-xs text-slate-300/90 leading-relaxed mb-5 line-clamp-2">
          {room.summary}
        </p>
      </div>

      {/* Card Footer & Metadata */}
      <div>
        <div className="pt-4 border-t border-white/5 grid grid-cols-3 gap-2 text-[11px] mb-5">
          <div>
            <span className="text-slate-500 block mb-0.5 font-medium">Kinetic Impact</span>
            <span className={`font-mono font-semibold px-1.5 py-0.5 rounded text-[10px] border inline-flex items-center gap-1 ${getSeverityBadge(room.kineticSeverity)}`}>
              <AlertTriangle className="w-2.5 h-2.5" />
              {room.kineticSeverity}
            </span>
          </div>

          <div>
            <span className="text-slate-500 block mb-0.5 font-medium">Est. Time</span>
            <span className="font-mono text-slate-300 flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              {room.estimatedMinutes}m
            </span>
          </div>

          <div>
            <span className="text-slate-500 block mb-0.5 font-medium">Operators</span>
            <span className="font-mono text-slate-300 flex items-center gap-1">
              <Users className="w-3 h-3 text-slate-400" />
              {room.solvedCount}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <Link
          href={`/rooms/${room.id}`}
          className="w-full py-2.5 px-4 rounded-xl font-medium text-xs flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600/30 to-blue-600/30 hover:from-cyan-500/40 hover:to-blue-500/40 text-cyan-200 border border-cyan-400/30 hover:border-cyan-400/60 shadow-lg hover:shadow-cyan-500/20 active:scale-[0.98] transition-all duration-150"
        >
          <span>Deploy Lab Sandbox</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
