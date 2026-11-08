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
  title: "AEGIS-OT | Industrial Control Systems Cyber Range",
  description: "Next-generation hands-on training platform for ICS/SCADA and Operational Technology cybersecurity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}>
      <body className="min-h-screen bg-[#070a12] text-slate-200 relative selection:bg-cyan-500/30 selection:text-cyan-200">
        {/* Ambient lighting meshes for glassmorphism refraction */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-600/15 rounded-full blur-[128px]" />
          <div className="absolute top-1/4 -right-40 w-[30rem] h-[30rem] bg-indigo-600/12 rounded-full blur-[140px]" />
          <div className="absolute bottom-10 left-1/3 w-[36rem] h-80 bg-emerald-600/10 rounded-full blur-[130px]" />
          <div className="absolute inset-0 cyber-grid opacity-60" />
        </div>

        {/* Main interactive application content */}
        <div className="relative z-10 flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
