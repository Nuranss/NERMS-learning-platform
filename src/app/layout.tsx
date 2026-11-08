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
  title: "nerms — Learn Industrial Control Systems & OT Security",
  description: "A clean, modern platform to learn and master ICS, SCADA, and Operational Technology cybersecurity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}>
      <body className="min-h-screen bg-[#090c15] text-slate-200 antialiased selection:bg-emerald-500/25 selection:text-emerald-200">
        {/* Subtle, soft ambient glow (low intensity, no sensory overload) */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
          <div className="absolute top-0 left-1/4 w-[40rem] h-[25rem] bg-emerald-600/10 rounded-full blur-[140px]" />
          <div className="absolute top-1/2 right-1/4 w-[35rem] h-[25rem] bg-cyan-600/10 rounded-full blur-[140px]" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
