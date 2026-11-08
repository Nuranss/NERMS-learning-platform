import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PresentationShowcase } from "@/components/home/PresentationShowcase";
import { CourseCard } from "@/components/home/CourseCard";
import { COURSES_CATALOG } from "@/mock/coursesCatalog";
import { ArrowRight, BookOpen, CheckCircle2, Layers } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />

      <main className="flex-1 w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 pt-10 sm:pt-14 pb-24 flex flex-col items-center">
        {/* Hero Header - Widescreen stretch */}
        <section className="text-center max-w-4xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-mono font-medium mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>CRITICAL INFRASTRUCTURE DEFENSE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] mb-4">
            Understand the Physics. <br />
            <span className="text-emerald-400">Defend the Control Systems.</span>
          </h1>

          <p className="text-xs sm:text-base text-slate-300 leading-relaxed max-w-3xl mx-auto">
            A clear, visual introduction to Industrial Control Systems (ICS), SCADA architectures,
            and the unique principles of Operational Technology security.
          </p>
        </section>

        {/* Center Presentation Showcase - Stretched to 1400px+ */}
        <section className="w-full mb-10">
          <PresentationShowcase />
        </section>

        {/* Action Button & Course Access Directly Underneath */}
        <section className="flex flex-col items-center text-center space-y-4 mb-20">
          <Link
            href="/rooms/intro-to-ics"
            className="group px-8 py-4 rounded-xl font-semibold text-sm sm:text-base bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/40 active:scale-[0.98] transition-all flex items-center gap-2.5 border border-emerald-400/20"
          >
            <BookOpen className="w-5 h-5" />
            <span>Enter Course: Introduction to ICS</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>

          {/* Clean Course Feature Chips */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              5 Foundational Modules
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Visual Purdue Diagrams
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              14 Knowledge Checks
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              100% Free & In-Browser
            </span>
          </div>
        </section>

        {/* All Courses Segment - Stretched to match presentation showcase */}
        <section className="w-full max-w-6xl xl:max-w-7xl border-t border-white/[0.08] pt-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
                <Layers className="w-3.5 h-3.5" />
                <span>CURRICULUM DIRECTORY</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                All Courses
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Structured learning paths in industrial control systems and operational technology.
              </p>
            </div>

            <span className="text-xs font-mono text-slate-400 bg-white/[0.04] border border-white/[0.06] px-3 py-1.5 rounded-lg">
              Showing {COURSES_CATALOG.length} Course
            </span>
          </div>

          {/* Course Cards Grid */}
          <div className="space-y-4">
            {COURSES_CATALOG.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          {/* Expansion Note */}
          <div className="mt-6 p-4 rounded-xl bg-slate-900/30 border border-white/[0.05] text-center text-xs text-slate-400 font-mono">
            <span>Additional specialized course tracks are in development.</span>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
