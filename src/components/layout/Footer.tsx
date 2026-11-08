import { ShieldAlert, Terminal, Lock, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full mt-20 border-t border-white/5 py-10 px-4 sm:px-6 lg:px-8 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-900 border border-white/10 flex items-center justify-center text-cyan-400">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <p className="font-semibold text-slate-300">AEGIS Industrial Cyber Range • Research & Educational Sandbox</p>
            <p className="text-[11px] text-slate-500">
              Compliant with ISA/IEC 62443 & NIST SP 800-82 OT Security Frameworks. Safe isolated software emulators.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-slate-400">
          <div className="flex items-center gap-2 font-mono">
            <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block" />
            <span>MODBUS // S7 // DNP3 // CIP // BACNET</span>
          </div>
          <span className="text-slate-600">|</span>
          <p>© 2026 AEGIS-OT. Built for Industrial Defenders & Red Teams.</p>
        </div>
      </div>
    </footer>
  );
}
