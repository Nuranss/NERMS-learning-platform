"use client";

import { Layers, ShieldCheck, Cpu, Monitor, Database, Globe } from "lucide-react";

export function PurdueDiagram() {
  const levels = [
    {
      level: "Level 4 & 5",
      title: "Enterprise & Corporate IT",
      color: "border-indigo-500/30 bg-indigo-950/20 text-indigo-300",
      devices: "ERP Systems, Email, Corporate Laptops, Public Internet Gateway",
      protocols: "HTTPS, SSH, DNS, Active Directory",
      risk: "Initial Phishing Vector",
    },
    {
      level: "Level 3.5 / DMZ",
      title: "Industrial DMZ (IDMZ)",
      color: "border-sky-500/30 bg-sky-950/20 text-sky-300",
      devices: "Jump Hosts, Dual-Homed Historian, Patch Mirrors, Antivirus Server",
      protocols: "RDP (MFA), Read-Only SQL, Syslog",
      risk: "Air-gap isolation boundary",
    },
    {
      level: "Level 3",
      title: "Site Operations & Control",
      color: "border-purple-500/30 bg-purple-950/20 text-purple-300",
      devices: "Plant Historian, Engineering Workstations, Batch Servers",
      protocols: "OPC UA, Proprietary vendor tools (TIA Portal, Studio 5000)",
      risk: "Engineering software tampering",
    },
    {
      level: "Level 2",
      title: "Supervisory Control (SCADA / HMI)",
      color: "border-cyan-500/30 bg-cyan-950/20 text-cyan-300",
      devices: "Human-Machine Interfaces (HMIs), SCADA Supervisory Servers",
      protocols: "Modbus TCP, DNP3, CIP, Ethernet/IP, BACnet",
      risk: "False sensor telemetry injection",
    },
    {
      level: "Level 1",
      title: "Basic Automation Control",
      color: "border-amber-500/30 bg-amber-950/20 text-amber-300",
      devices: "PLCs (Programmable Logic Controllers), RTUs, IEDs",
      protocols: "Modbus TCP/RTU, S7comm, Profinet, IEC 60870-5-104",
      risk: "Firmware tampering, Ladder Logic overrides",
    },
    {
      level: "Level 0",
      title: "The Physical Process",
      color: "border-emerald-500/30 bg-emerald-950/20 text-emerald-300",
      devices: "Sensors (Pressure, Temp, Flow), Actuators, Valves, Pumps, Breakers",
      protocols: "4-20mA Analog loops, 24V DC Digital pulses, HART",
      risk: "Kinetic physical damage & safety events",
    },
  ];

  return (
    <div className="w-full my-6 p-5 rounded-2xl bg-slate-900/40 border border-white/[0.08] space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
        <div>
          <h4 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            The Purdue Model (PERA) Pyramid Reference
          </h4>
          <p className="text-xs text-slate-400">The global standard (ISA-95) for industrial network segmentation</p>
        </div>
        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10 hidden sm:inline">
          ISA/IEC 62443
        </span>
      </div>

      <div className="space-y-2">
        {levels.map((item, idx) => (
          <div
            key={item.level}
            className={`p-3 rounded-xl border ${item.color} flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition-all hover:translate-x-1`}
          >
            <div className="sm:w-1/3">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xs">{item.level}:</span>
                <span className="font-semibold text-xs text-slate-100">{item.title}</span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono mt-0.5 truncate">{item.devices}</p>
            </div>

            <div className="sm:w-1/3 text-[11px] font-mono text-slate-300">
              <span className="text-slate-500">Protocols: </span>
              {item.protocols}
            </div>

            <div className="sm:w-1/4 text-right">
              <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 border border-white/5 text-slate-400">
                {item.risk}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
