# Unshite My Site — Audit & Remediation Report

- **Date:** 2026-11-09
- **Target URL:** `http://localhost:3000` (Local Development)
- **Viewports Checked:** Desktop (1440×900) & Mobile (390×844)

---

## AI Slop Score: Before → After

### **69 → 96 (Looks AI-made / A few AI tells → Looks designed)**

| Finding | Before | After | Status |
|---|---|---|---|
| `no-photos` (-8 pts) | Absent | Real, high-resolution industrial control room photograph with SCADA HUD framing added (`/industrial-control-room.jpg`). | **Resolved** |
| `stock-hero` (-8 pts) | Centred template hero | Asymmetric, authoritative split layout with engineering kicker, left-aligned headers, and facility feed. | **Resolved** |
| `generic-font` (-8 pts) | Standard Geist default | Integrated `Space_Grotesk` display font for all headings with `Geist_Mono` for telemetry. | **Resolved** |
| `hero-pill` (-4 pts) | Floating pill badge | Replaced with clean industrial kicker indicator. | **Resolved** |
| `arrow-links` (-3 pts) | Repeated `→` icons | Replaced with purposeful action icons (`BookOpen`). | **Resolved** |

---

## Broken Details Checked & Fixed

| Issue Type | Before | After |
|---|---|---|
| `mobile-header-crowding` | Tight spacing and potential wrap at $\le$ 390px | Calibrated padding (`px-4 sm:px-10`), scaled logo (`h-8 sm:h-12`), and compact buttons with zero wrapping down to 320px. |
| `horizontal-overflow` | Pass | Pass across both 1440×900 and 390×844. |
| `broken-image` | Pass | All assets verified (Logo + Industrial photo). |
| `broken-anchor` | Pass | No dead anchors or unlinked routes. |
| `contrast` | Pass | Meets WCAG AA contrast standards throughout. |

---

## Before / After Evidence
- No before/after comparison slider widgets on this site.

---

## Open Issues
- None. All identified AI tells and mobile spacing constraints have been resolved and verified with clean compilation.

---

## Worth a Second Look (User-Intentional)
- **Glassmorphic Depth (`glass-glow`)**: Deliberately maintained with frosted backdrop filters (`rgba(13, 19, 33, 0.55)`), crisp 1px borders, and subtle dark glow, honoring the user's aesthetic request while eliminating generic template slop.
- **Monospace Telemetry Labels (`tracked-caps`)**: Retained for SCADA telemetry, Modbus registers, and industrial sensor data.

---

## Checked and Fine
- **Hero & Header**: Asymmetric layout, real OT surveillance visual, crisp bilingual navigation with AzTU link.
- **Showcase Dashboard**: Real-time RPM and PSI simulation, Purdue architecture levels, and Modbus TCP inspection.
- **Course Room**: 5 structured modules with client-side salted SHA-256 quiz verification.
