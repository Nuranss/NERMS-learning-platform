import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}>
      <body className="min-h-screen bg-[#04060a] text-slate-200 antialiased selection:bg-emerald-500/25 selection:text-emerald-200 flex items-center justify-center p-0 md:p-3 overflow-hidden">
        {/* Subtle background ambient mesh */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-25">
          <div className="absolute top-1/4 left-1/4 w-[36rem] h-[24rem] bg-emerald-600/15 rounded-full blur-[140px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[36rem] h-[24rem] bg-cyan-600/15 rounded-full blur-[140px]" />
        </div>

        {/* 
          Aspect Ratio Shell:
          - PC/Desktop (md:): 16:9 aspect ratio (aspect-[16/9])
          - Mobile (<md): 9:16 aspect ratio (aspect-[9/16])
        */}
        <div className="relative z-10 w-full h-full max-h-screen aspect-[9/16] md:aspect-[16/9] md:max-h-[96vh] md:max-w-[calc(96vh*16/9)] max-w-[calc(98vh*9/16)] bg-[#090c15] md:rounded-2xl border-0 md:border md:border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
