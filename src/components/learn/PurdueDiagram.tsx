"use client";

import { Layers } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export function PurdueDiagram() {
  const { language } = useLanguage();
  const isAz = language === "az";

  const levels = [
    {
      level: isAz ? "Səviyyə 4 və 5" : "Level 4 & 5",
      title: isAz ? "Müəssisə və Korporativ IT" : "Enterprise & Corporate IT",
      borderAccent: "border-l-indigo-400/80 bg-indigo-950/[0.12] border-white/[0.05]",
      levelTagColor: "text-indigo-300",
      devices: isAz
        ? "ERP Sistemləri, E-poçt, Korporativ Kompüterlər, Şlüz"
        : "ERP Systems, Email, Corporate Laptops, Internet Gateway",
      protocols: "HTTPS, SSH, DNS, Active Directory",
      risk: isAz ? "İlkin Fişinq Vektoru" : "Initial Phishing Vector",
    },
    {
      level: isAz ? "Səviyyə 3.5" : "Level 3.5",
      title: isAz ? "Sənaye DMZ (IDMZ)" : "Industrial DMZ (IDMZ)",
      borderAccent: "border-l-sky-400/80 bg-sky-950/[0.12] border-white/[0.05]",
      levelTagColor: "text-sky-300",
      devices: isAz
        ? "Jump Hostlar, İkili Şəbəkəli Tarixçi, Yeniləmə Güzgüləri"
        : "Jump Hosts, Dual-Homed Historian, Patch Mirrors, Antivirus Mirror",
      protocols: "RDP (MFA), Read-Only SQL, Syslog",
      risk: isAz ? "Kritik IT/OT izolyasiya sərhədi" : "Critical IT/OT isolation boundary",
    },
    {
      level: isAz ? "Səviyyə 3" : "Level 3",
      title: isAz ? "Zavod Əməliyyatları və İdarəetmə" : "Site Operations & Control",
      borderAccent: "border-l-purple-400/80 bg-purple-950/[0.12] border-white/[0.05]",
      levelTagColor: "text-purple-300",
      devices: isAz
        ? "Zavod Tarixçisi, Mühəndislik İş Stansiyaları, Batch Serverlər"
        : "Plant Historian, Engineering Workstations, Batch Servers",
      protocols: "OPC UA, Vendor engineering tools (TIA Portal, Studio 5000)",
      risk: isAz ? "Mühəndislik proqramına müdaxilə" : "Engineering software tampering",
    },
    {
      level: isAz ? "Səviyyə 2" : "Level 2",
      title: isAz ? "Nəzarət İdarəetməsi (SCADA / HMI)" : "Supervisory Control (SCADA / HMI)",
      borderAccent: "border-l-cyan-400/80 bg-cyan-950/[0.12] border-white/[0.05]",
      levelTagColor: "text-cyan-300",
      devices: isAz
        ? "İnsan-Maşın İnterfeysləri (HMI), SCADA Nəzarət Serverləri"
        : "Human-Machine Interfaces (HMIs), SCADA Supervisory Servers",
      protocols: "Modbus TCP, DNP3, CIP, Ethernet/IP, BACnet",
      risk: isAz ? "Saxta sensor telemetriyası yeridilməsi" : "False sensor telemetry injection",
    },
    {
      level: isAz ? "Səviyyə 1" : "Level 1",
      title: isAz ? "Əsas Avtomatlaşdırma İdarəetməsi" : "Basic Automation Control",
      borderAccent: "border-l-amber-400/80 bg-amber-950/[0.12] border-white/[0.05]",
      levelTagColor: "text-amber-300",
      devices: isAz
        ? "PLC-lər (Proqramlaşdırılan Kontrollerlər), RTU-lar, Qəza Releləri"
        : "PLCs (Programmable Logic Controllers), RTUs, Safety Relays",
      protocols: "Modbus TCP/RTU, S7comm, Profinet, IEC 60870-5-104",
      risk: isAz ? "Firmware manipulyasiyası, Ladder Logic ləğvi" : "Firmware tampering, Ladder Logic overrides",
    },
    {
      level: isAz ? "Səviyyə 0" : "Level 0",
      title: isAz ? "Fiziki Proses" : "The Physical Process",
      borderAccent: "border-l-emerald-400/80 bg-emerald-950/[0.12] border-white/[0.05]",
      levelTagColor: "text-emerald-300",
      devices: isAz
        ? "Sensorlar (Təzyiq, Temp, Axın), İcraedicilər, Klapanlar, Nasoslar"
        : "Sensors (Pressure, Temp, Flow), Actuators, Valves, Pumps, Breakers",
      protocols: "4-20mA Analog loops, 24V DC Digital pulses, HART",
      risk: isAz ? "Kinetik fiziki zədələnmə və qəzalar" : "Kinetic physical damage & safety events",
    },
  ];

  return (
    <div className="w-full my-6 p-5 sm:p-6 rounded-2xl bg-slate-900/30 border border-white/[0.06] space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
        <div>
          <h4 className="text-xs sm:text-sm font-semibold text-slate-100 flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            {isAz
              ? "Purdue Modeli (PERA) Piramida Memarlığı"
              : "The Purdue Model (PERA) Pyramid Architecture"}
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            {isAz
              ? "Sənaye şəbəkələrinin seqmentləşdirilməsi üzrə qlobal standart (ISA-95 / IEC 62443)"
              : "The global standard (ISA-95 / IEC 62443) for industrial network segmentation"}
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
              <span className="text-slate-500">{isAz ? "Protokollar: " : "Protocols: "}</span>
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
