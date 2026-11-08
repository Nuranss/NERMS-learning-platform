import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full mt-24 border-t border-white/[0.06] py-10 px-4 sm:px-6 text-xs text-slate-500">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-300">nerms</span>
          <span>•</span>
          <span>A clear, hands-on path into Industrial Control Systems cybersecurity.</span>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/rooms/intro-to-ics" className="hover:text-slate-300 transition-colors">
            Intro Course
          </Link>
          <Link href="/rooms/water-treatment" className="hover:text-slate-300 transition-colors">
            Virtual SCADA Lab
          </Link>
        </div>
      </div>
    </footer>
  );
}
