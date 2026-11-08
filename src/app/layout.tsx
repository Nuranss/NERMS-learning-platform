import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
      <body className="min-h-screen bg-[#070a12] text-slate-200 antialiased selection:bg-emerald-500/25 selection:text-emerald-200 flex flex-col overflow-x-hidden">
        {/* Subtle background ambient mesh */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
          <div className="absolute top-0 left-1/3 w-[45rem] h-[30rem] bg-emerald-600/10 rounded-full blur-[140px]" />
          <div className="absolute top-1/2 right-1/4 w-[40rem] h-[30rem] bg-cyan-600/10 rounded-full blur-[140px]" />
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
