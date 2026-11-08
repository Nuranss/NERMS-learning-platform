"use client";

import { Layers, ShieldCheck } from "lucide-react";

export function PurdueDiagram() {
  const levels = [
    {
      level: "Level 4 & 5",
      title: "Enterprise & Corporate IT",
      borderAccent: "border-l-indigo-400/80 bg-indigo-950/[0.12] border-white/[0.05]",
      levelTagColor: "text-indigo-300",
      devices: "ERP Systems, Email, Corporate Laptops, Internet Gateway",
      protocols: "HTTPS, SSH, DNS, Active Directory",
      risk: "Initial Phishing Vector",
    },
    {
      level: "Level 3.5",
      title: "Industrial DMZ (IDMZ)",
      borderAccent: "border-l-sky-400/80 bg-sky-950/[0.12] border-white/[0.05]",
      levelTagColor: "text-sky-300",
      devices: "Jump Hosts, Dual-Homed Historian, Patch Mirrors, Antivirus Mirror",
      protocols: "RDP (MFA), Read-Only SQL, Syslog",
      risk: "Critical IT/OT isolation boundary",
    },
    {
      level: "Level 3",
      title: "Site Operations & Control",
      borderAccent: "border-l-purple-400/80 bg-purple-950/[0.12] border-white/[0.05]",
      levelTagColor: "text-purple-300",
      devices: "Plant Historian, Engineering Workstations, Batch Servers",
      protocols: "OPC UA, Vendor engineering tools (TIA Portal, Studio 5000)",
      risk: "Engineering software tampering",
    },
    {
      level: "Level 2",
      title: "Supervisory Control (SCADA / HMI)",
      borderAccent: "border-l-cyan-400/80 bg-cyan-950/[0.12] border-white/[0.05]",
      levelTagColor: "text-cyan-300",
      devices: "Human-Machine Interfaces (HMIs), SCADA Supervisory Servers",
      protocols: "Modbus TCP, DNP3, CIP, Ethernet/IP, BACnet",
      risk: "False sensor telemetry injection",
    },
    {
      level: "Level 1",
      title: "Basic Automation Control",
      borderAccent: "border-l-amber-400/80 bg-amber-950/[0.12] border-white/[0.05]",
      levelTagColor: "text-amber-300",
      devices: "PLCs (Programmable Logic Controllers), RTUs, Safety Relays",
      protocols: "Modbus TCP/RTU, S7comm, Profinet, IEC 60870-5-104",
      risk: "Firmware tampering, Ladder Logic overrides",
    },
    {
      level: "Level 0",
      title: "The Physical Process",
      borderAccent: "border-l-emerald-400/80 bg-emerald-950/[0.12] border-white/[0.05]",
      levelTagColor: "text-emerald-300",
      devices: "Sensors (Pressure, Temp, Flow), Actuators, Valves, Pumps, Breakers",
      protocols: "4-20mA Analog loops, 24V DC Digital pulses, HART",
      risk: "Kinetic physical damage & safety events",
    },
  ];

  return (
    <div className="w-full my-6 p-5 sm:p-6 rounded-2xl bg-slate-900/30 border border-white/[0.06] space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
        <div>
          <h4 className="text-xs sm:text-sm font-semibold text-slate-100 flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            The Purdue Model (PERA) Pyramid Architecture
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            The global standard (ISA-95 / IEC 62443) for industrial network segmentation
          </p>
        </div>
        <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-white/[0.04] text-slate-400 border border-white/[0.06] hidden sm:inline">
          ISA/IEC 62443
        </span>
      </div>

      <div className="space-y-2">
        {levels.map((item) => (
          <div
            key={item.level}
            className={`p-3 sm:p-3.5 rounded-xl border border-l-4 ${item.borderAccent} flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 transition-all hover:bg-slate-900/40`}
          >
            <div className="sm:w-1/3">
              <div className="flex items-center gap-2">
                <span className={`font-mono font-bold text-xs ${item.levelTagColor}`}>{item.level}:</span>
                <span className="font-semibold text-xs text-slate-100">{item.title}</span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono mt-0.5 truncate">{item.devices}</p>
            </div>

            <div className="sm:w-1/3 text-[11px] font-mono text-slate-300">
              <span className="text-slate-500">Protocols: </span>
              {item.protocols}
            </div>

            <div className="sm:w-1/4 sm:text-right">
              <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 border border-white/[0.05] text-slate-400">
                {item.risk}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
