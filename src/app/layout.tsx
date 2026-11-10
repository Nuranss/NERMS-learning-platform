import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/i18n/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "NERMS — Learn Industrial Control Systems & OT Security",
  description: "A clean, modern platform to learn and master ICS, SCADA, and Operational Technology cybersecurity.",
  icons: {
    icon: "/nerms-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} dark antialiased`}>
      <body className="min-h-screen bg-[#060911] text-slate-200 antialiased selection:bg-emerald-500/25 selection:text-emerald-200 flex flex-col overflow-x-hidden relative">
        {/* iOS 26 Ambient Liquid Aurora & Light Refraction Layer */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          {/* Liquid Orb 1: Upper Emerald Glow */}
          <div className="absolute -top-24 left-1/4 w-[50rem] h-[36rem] bg-emerald-500/16 rounded-full blur-[140px] animate-liquid-1" />
          
          {/* Liquid Orb 2: Center-Right Electric Cyan Glow */}
          <div className="absolute top-1/3 -right-20 w-[45rem] h-[38rem] bg-cyan-500/15 rounded-full blur-[150px] animate-liquid-2" />
          
          {/* Liquid Orb 3: Deep Indigo / Violet Ambient Accent (iOS spectrum depth) */}
          <div className="absolute top-2/3 -left-20 w-[42rem] h-[35rem] bg-indigo-600/12 rounded-full blur-[160px] animate-liquid-3" />

          {/* Liquid Orb 4: Lower Teal Radiance */}
          <div className="absolute -bottom-32 right-1/3 w-[48rem] h-[32rem] bg-teal-500/12 rounded-full blur-[140px] animate-liquid-1" />

          {/* Subtle noise / specular ambient vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.03] via-transparent to-black/60" />
        </div>

        {/* Main application container spanning the natural viewport */}
        <LanguageProvider>
          <div className="relative z-10 w-full min-h-screen flex flex-col">
            {children}
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
