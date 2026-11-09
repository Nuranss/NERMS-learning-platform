# NERMS — Interactive ICS & OT Cybersecurity Learning Platform

NERMS is a dedicated interactive cybersecurity education platform focused on **Industrial Control Systems (ICS)**, **SCADA architectures**, and **Operational Technology (OT)** defense. Developed for students and researchers at **Azerbaijan Technical University (AzTU)**.

---

## 🎯 Key Capabilities

- **Interactive Telemetry Showcase:** Real-time simulation of industrial processes, generator rotor dynamics, hydrostatic pressure, and fail-safe safety instrumented circuits (SIS).
- **Purdue Model Visualization:** Interactive multi-level architecture explorer mapping Level 0 (Physical Machinery) through Level 5 (Enterprise Networks).
- **TryHackMe-Style Knowledge Checks:** In-browser practical assessments with hints, instant verification, and confetti celebration upon task completion.
- **Client-Side Security (Salted SHA-256):** Quizzes verify answers via the native Web Crypto API against pre-hashed salted SHA-256 digests—protecting answer keys from client bundle inspection (remediating CWE-602).
- **Full Bilingual Localization (EN / AZ):** Instant, reactive switching between English and Azerbaijani across all curriculum modules, questions, diagrams, and telemetry.
- **Industrial Design System:** Tailored dark-carbon visual hierarchy with refined glassmorphism, Space Grotesk engineering typography, and zero template AI slop.
- **Security-Hardened HTTP Headers:** Enforces `Strict-Transport-Security`, `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, and strict `Permissions-Policy`.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **UI Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Typography:** Space Grotesk (Headings), Geist Sans (UI), Geist Mono (SCADA Telemetry)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Cryptography:** Native `window.crypto.subtle` (SHA-256)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ installed
- npm or pnpm

### Installation

```bash
git clone https://github.com/Nuranss/NERMS-learning-platform.git
cd NERMS-learning-platform
npm install
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

---

## 📚 Curriculum Structure

1. **Module 1: The Physics of OT vs The Data of IT** — Physical consequences, the AIC triad (Availability, Integrity, Confidentiality).
2. **Module 2: Anatomy of an Industrial Facility** — Sensors, Actuators, PLCs, RTUs, HMIs, and Historians.
3. **Module 3: The Purdue Model (Levels 0–5)** — Network segmentation, DMZs, and air gaps.
4. **Module 4: Insecure by Design Protocols** — Modbus TCP, Siemens S7, lack of authentication, replay attacks.
5. **Module 5: Defense-in-Depth for OT** — Unidirectional security gateways (data diodes), read-only monitoring, safety instrumented systems (SIS).

---

## 🏛️ Affiliation

Developed in association with **Azerbaijan Technical University (AzTU)** — [aztu.edu.az](https://aztu.edu.az/az).
