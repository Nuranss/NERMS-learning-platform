"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Activity, ArrowDownRight, ArrowRight, Layers, Radio } from "lucide-react";
import { CourseCard } from "@/components/home/CourseCard";
import { PresentationShowcase, type ShowcaseTab } from "@/components/home/PresentationShowcase";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { KineticTextCycler } from "@/components/ui/KineticTextCycler";
import { LiquidGlassStage } from "@/components/ui/LiquidGlassPanel";
import { useLanguage } from "@/i18n/LanguageContext";
import { useTranslation } from "@/i18n/translations";
import { COURSES_CATALOG } from "@/mock/coursesCatalog";

const features = [
  { id: "physical", Icon: Activity },
  { id: "purdue", Icon: Layers },
  { id: "protocols", Icon: Radio },
] as const;

export default function HomePage() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [activeTab, setActiveTab] = useState<ShowcaseTab>("physical");

  return (
    <LiquidGlassStage className="nerms-home flex min-h-screen flex-col overflow-x-clip">
      <div aria-hidden="true" className="home-backdrop pointer-events-none fixed inset-0" />
      <Navbar />

      <main className="relative flex-1">
        <section aria-labelledby="home-title" className="home-hero relative isolate grid place-items-start justify-items-center overflow-hidden px-5 text-center">
          <div aria-hidden="true" className="home-light absolute inset-0 -z-10 overflow-hidden" />
          <div className="home-hero-copy mx-auto grid w-full max-w-4xl justify-items-center">
            <p className="home-eyebrow">
              <span>{t.hero.modules}</span>
              <span aria-hidden="true" className="home-label-dot" />
              <span>{t.hero.checks}</span>
            </p>
            <h1 id="home-title" className="home-title mt-5 text-balance">
              {t.hero.title}{" "}
              <span className="block text-neutral-300">{t.hero.titleAccent}</span>
            </h1>
            <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-neutral-300 sm:text-lg">{t.hero.desc}</p>
            <Link href="/rooms/intro-to-ics" className="home-cta group mt-7">
              {t.hero.cta}
              <ArrowRight aria-hidden="true" className="size-4 motion-safe:transition-transform motion-safe:group-hover:translate-x-1" />
            </Link>
            <KineticTextCycler className="home-cycler max-w-md text-balance text-sm leading-snug sm:text-base" />
          </div>
        </section>

        <div className="home-shell w-full px-5 sm:px-10">
          <section aria-labelledby="home-topics" className="home-section-enter">
            <p className="home-eyebrow"><span aria-hidden="true" className="home-label-dot" />{t.home.topics}</p>
            <h2 id="home-topics" className="home-section-title mt-4">
              {t.home.topicsTitle}{" "}
              <span className="block text-neutral-400">{t.home.topicsAccent}</span>
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3 lg:mt-11">
              {features.map(({ id, Icon }) => (
                <a
                  key={id}
                  href="#scada-demo"
                  onClick={() => setActiveTab(id)}
                  className="home-feature group flex min-w-0 flex-col overflow-hidden rounded-2xl"
                >
                  <div aria-hidden="true" className="home-feature-art relative isolate grid aspect-[1.45] place-items-center overflow-hidden">
                    <div className="home-light absolute inset-0 -z-10" />
                    <div className="home-feature-preview">
                      <Icon className="size-5 text-cyan-300" />
                      {id === "physical" && (
                        <>
                          <span className="home-preview-value">3,600 <small>RPM</small></span>
                          <span className="home-preview-meter" />
                        </>
                      )}
                      {id === "purdue" && (
                        <div className="home-preview-layers">
                          {["L4", "L3.5", "L2", "L1", "L0"].map((layer) => <span key={layer}>{layer}</span>)}
                        </div>
                      )}
                      {id === "protocols" && (
                        <>
                          <span className="home-preview-value">Modbus TCP</span>
                          <span className="home-preview-packet"><span>0x05</span><span>0x0001</span><span>0xFF00</span></span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col px-5 pb-6 pt-4 lg:px-6">
                    <h3 className="flex items-start justify-between gap-3 text-lg font-medium leading-snug">
                      {t.home.features[id].title}
                      <ArrowDownRight aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-cyan-300" />
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-400">{t.home.features[id].desc}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>

          <section id="scada-demo" tabIndex={-1} aria-labelledby="home-lab" className="home-section-enter home-block scroll-mt-24">
            <div className="mb-8 grid items-end gap-4 md:grid-cols-2">
              <div>
                <p className="home-eyebrow"><span aria-hidden="true" className="home-label-dot" />{t.home.lab}</p>
                <h2 id="home-lab" className="home-section-title mt-4">{t.home.labTitle}</h2>
              </div>
              <p className="max-w-sm text-pretty text-neutral-400 md:justify-self-end">{t.home.labDesc}</p>
            </div>
            <PresentationShowcase activeTab={activeTab} onTabChange={setActiveTab} />
          </section>

          <section aria-labelledby="home-courses" className="home-section-enter home-block border-t border-white/10 pt-10 sm:pt-14">
            <h2 id="home-courses" className="home-section-title">{t.catalog.allCourses}</h2>
            <p className="mb-7 mt-3 text-neutral-400">{t.catalog.subtitle}</p>
            <div className="space-y-4">
              {COURSES_CATALOG.map((course) => <CourseCard key={course.id} course={course} />)}
            </div>
          </section>

          <section aria-labelledby="home-start" className="home-section-enter home-block home-closing relative isolate overflow-hidden rounded-2xl px-5 text-center">
            <Image
              src="/industrial-control-room.jpg"
              alt=""
              fill
              sizes="(min-width: 640px) calc(100vw - 5rem), calc(100vw - 2.5rem)"
              className="-z-20 object-cover object-[center_42%]"
            />
            <div aria-hidden="true" className="home-closing-shade absolute inset-0 -z-10" />
            <h2 id="home-start" className="home-section-title text-balance">{t.home.closingTitle}</h2>
            <p className="mx-auto mt-4 max-w-md text-pretty text-neutral-200">{t.home.closingDesc}</p>
            <Link href="/rooms/intro-to-ics" className="home-cta group mt-7">
              {t.hero.cta}
              <ArrowRight aria-hidden="true" className="size-4 motion-safe:transition-transform motion-safe:group-hover:translate-x-1" />
            </Link>
          </section>
        </div>
      </main>

      <Footer variant="home" />
    </LiquidGlassStage>
  );
}
