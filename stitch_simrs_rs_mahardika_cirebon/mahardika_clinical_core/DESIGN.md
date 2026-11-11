---
name: Mahardika Clinical Core
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#414752'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#727783'
  outline-variant: '#c1c6d4'
  surface-tint: '#005eb5'
  primary: '#004e99'
  on-primary: '#ffffff'
  primary-container: '#0a66c2'
  on-primary-container: '#dbe6ff'
  inverse-primary: '#a8c8ff'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#015d15'
  on-tertiary: '#ffffff'
  tertiary-container: '#26762c'
  on-tertiary-container: '#a7fa9f'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#a8c8ff'
  on-primary-fixed: '#001b3d'
  on-primary-fixed-variant: '#00468a'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#a3f69c'
  tertiary-fixed-dim: '#88d982'
  on-tertiary-fixed: '#002204'
  on-tertiary-fixed-variant: '#005312'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
  data-display:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 1.5rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

The design system establishes a clinical, ultra-reliable, and authoritative digital environment tailored for RS Mahardika Cirebon. It serves medical practitioners, triage nurses, administrative billing staff, and patients interacting through lobby kiosks and high-visibility waiting room displays. 

The aesthetic is built on **Clinical Precision & Modern Functionalism**:
- **Sterile and Calming:** High-key, luminous surfaces free from visual noise reduce cognitive fatigue in high-stress, data-dense clinical environments.
- **Unambiguous Clarity:** High-contrast typographic hierarchy and strict, standardized semantic status coloring ensure patient conditions, queue statuses, and guarantor classifications (Penjamin) are comprehended instantly without clinical error.
- **Institutional Dignity:** A structured balance between crisp 1px borders, subtle soft surface elevations, and refined `rounded-2xl` structural cards delivers an interface that feels advanced, hygienic, and deeply dependable.

## Colors

The palette directly communicates medical authority, administrative speed, and life-critical clarity.

### Core Architecture
- **Primary Medical Blue (`#0A66C2`):** The primary anchor representing clinical precision, reliability, and institutional integrity. Applied to main operational CTAs, active navigation items, critical bed allocation triggers, and active patient records.
- **Deep Navy (`#0F172A`):** Used for deep-slate surface states, telemetry monitors, lobby kiosk shells, and high-visibility digital queue displays in waiting halls.
- **Clinical Surface (`#F8F9FA`):** The foundational canvas. Replaces pure sterile white with a softened, high-luminance slate tint to eliminate screen glare during 12-hour nursing shifts.
- **Pure White (`#FFFFFF`):** Reserved for floating cards, modal sheets, and active input backgrounds against the `#F8F9FA` canvas.
- **Structural Border (`#E2E8F0`):** Defines clean compartmental boundaries across dense electronic health records (EHR).

### Guarantor Classification (Penjamin) Tokens
Guarantor status requires instantaneous triage recognition:
- **Penjamin Umum (Self-Pay):** Medical Blue (`#0A66C2`) on soft blue container (`#E0F2FE`).
- **Penjamin BPJS Kesehatan:** Emerald Green (`#2E7D32`) on pale mint container (`#E8F5E9`).
- **Penjamin Asuransi Swasta:** Vibrant Amber-Orange (`#E65100`) on warm apricot container (`#FFF3E0`).

### Text Contrast Tiers
- **Text Primary (`#1E293B`):** Deep slate-charcoal for maximum legibility of diagnostic metrics, dosages, and patient IDs.
- **Text Secondary (`#64748B`):** Cool slate for metadata, timestamps, units of measure, and non-active labels.

## Typography

The typographic hierarchy combines **Plus Jakarta Sans** for structural section landmarks and high-visibility kiosk displays with **Inter** for dense clinical charts and diagnostic data tables.

- **Display & Queue Indicators (`display-lg`, `data-display`):** Optimized for 10-foot viewing distances on wall-mounted TV monitors and kiosk headers. High-weight numerals allow patients to read ticket numbers and room directions from across the lobby.
- **Section & Modal Titles (`headline-xl`, `headline-lg`, `headline-md`):** Contemporary geometry that instills trust and institutional structure.
- **Clinical Reading & Data (`body-lg`, `body-md`, `body-sm`):** Neutral grotesque proportions with open counters, preventing ambiguity between crucial medical glyphs (such as '8', 'B', '0', and 'D').
- **Badges & Guarantor Labels (`label-md`, `label-sm`):** Rendered in medium-to-bold weights with uppercase tracking for instantaneous categorizing of BPJS, Umum, and Asuransi status.

## Layout & Spacing

The system enforces a standardized 8pt spatial cadence designed for high-density workstation screens (1920×1080 nurse stations), mobile ward rounds, and large format waiting hall displays.

### Layout Mechanics
- **Desktop & Clinical Terminals (>= 1280px):** 12-column fluid grid system with `1.5rem` (`24px`) gutters and fixed vertical collapsibility for patient master indexes. Sidebar navigation remains docked at 260px.
- **Tablets & Bedside Handhelds (768px - 1279px):** 8-column layout with `1rem` (`16px`) gutters. Sidebars collapse to icon-only rails. Dual-pane master-detail views collapse to progressive drawers.
- **Mobile & Triage Handhelds (< 768px):** 4-column layout with `1rem` margins. Dense tables transform into sequential vertical clinical cards.

### Density Tiers
- **Comfortable (Patient Kiosks / Public Displays):** Padding relies on `space-lg` (`1.5rem`) and `space-xl` (`2rem`) to prioritize tap target accuracy and readability.
- **Compact (Clinical Electronic Medical Record / Pharmacy Dispensing):** Padding shifts strictly to `space-xs` (`4px`) and `space-sm` (`8px`) inner margins to maximize visible patient record surface without vertical scrolling.

## Elevation & Depth

Visual hierarchy relies on sterile tonal layering combined with low-contrast borders and surgical, ambient drop shadows. Heavy blurs and floating glassmorphism are strictly omitted to maintain clinical sobriety and terminal performance.

### Elevation Levels
- **Level 0 (Flat Surface Canvas):** Base background `#F8F9FA`. Used for main view background and inactive tab wrappers.
- **Level 1 (Clinical Cards & Workstations):** Surface `#FFFFFF`, bounded by a crisp 1px solid border `#E2E8F0`, paired with an ambient shadow: `0 1px 3px 0 rgba(15, 23, 42, 0.05)`. This encapsulates patient chart widgets, laboratory results, and admission forms.
- **Level 2 (Dropdowns, Popovers & Hover Highlights):** `0 4px 12px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.04)`. Bounded by `#CBD5E1`. Used for triage dropdown lists, ICD-10 search pickers, and drug autocomplete panels.
- **Level 3 (Modal Dialogs & Critical Emergency Alerts):** `0 20px 25px -5px rgba(15, 23, 42, 0.12), 0 8px 10px -6px rgba(15, 23, 42, 0.04)`. Accompanied by a 40% `#0F172A` backdrop scrim for code-blue confirmations, prescription authorization, and vital sign warnings.

## Shapes

The design system embraces a modern, softened geometry featuring `rounded-2xl` (`1rem` / `16px`) boundaries for major architectural enclosures, instilling a safe, contemporary, and patient-friendly environment.

- **Primary Outer Cards & Panels:** Standardized at `rounded-2xl` (`1rem` / `16px`). This includes vital sign cards, consultation queue boards, and admission intake containers.
- **Interactive Controls (Buttons, Inputs, Selectors):** Scaled down to `rounded-lg` (`0.5rem` / `8px`) to ensure distinct visual differentiation between actionable triggers and layout containers.
- **Badges, Tags, and Guarantor Indicators:** Formatted with `rounded-md` (`0.375rem` / `6px`) or fully rounded pill styles (`9999px`) depending on context: pills denote dynamic status (e.g., In Consultation, Discharged), while squared-radius badges indicate static classifications (e.g., BPJS, Umum, Asuransi).

## Components

### Buttons
- **Primary Clinical Action:** Background `#0A66C2`, text `#FFFFFF`, radius `rounded-lg`. Hover: `#0854A0`. Active: `#064482`. Height: 40px (Desktop), 48px (Touch Kiosk).
- **Secondary Action:** Transparent background with 1px border `#E2E8F0`, text `#1E293B`. Hover: `#F1F5F9`.
- **Destructive (Emergency Alert / Bed Release):** Background `#DC2626`, text `#FFFFFF`. Hover: `#B91C1C`.

### Guarantor & Triage Badges (Penjamin Chips)
Constructed with high-contrast text on pastel tinted containers:
- **Penjamin BPJS Kesehatan:** Background `#E8F5E9`, text `#1B5E20`, border 1px solid `#A5D6A7`.
- **Penjamin Umum:** Background `#E0F2FE`, text `#075985`, border 1px solid `#7DD3FC`.
- **Penjamin Asuransi Swasta:** Background `#FFF3E0`, text `#B23C00`, border 1px solid `#FFCC80`.
- All badges feature `label-sm` typography, padding `2px 8px`, and `rounded-md`.

### Queue Indicators (Clinic Display & Poliklinik Calling)
- **Waiting Room / TV Monitor Display:** High-contrast card, surface `#0F172A`, text `#FFFFFF`. The active calling ticket is rendered in `data-display` font size in Primary Blue `#38BDF8`.
- **Counter Queue Indicator:** Card with a solid left border (4px accent) keyed to clinic specialty (e.g., Poli Anak, Poli Penyakit Dalam).

### Form Inputs & Medical Auto-Suggest
- **Default State:** Background `#FFFFFF`, 1px solid `#CBD5E1`, text `#1E293B`, `rounded-lg`, height 40px, padding `0 12px`.
- **Focus State:** 1px solid `#0A66C2`, box-shadow `0 0 0 3px rgba(10, 102, 194, 0.15)`.
- **Critical Error (e.g., Invalid Dosage / Missing NIK):** Border `#DC2626`, box-shadow `0 0 0 3px rgba(220, 38, 38, 0.15)`.

### Checkboxes & Radio Buttons
- Precision 18×18px squares/circles, border 1.5px solid `#94A3B8`.
- Checked state: Fill `#0A66C2` with crisp white checkmark/dot. Focus ring with 2px primary offset.

### Clinical Data Cards
- Container: Surface `#FFFFFF`, border 1px solid `#E2E8F0`, border-radius `rounded-2xl`, internal padding `space-md` (`1rem`) to `space-lg` (`1.5rem`).
- Header includes patient identifier (No. RM), Guarantor Chip right-aligned, and a divider border `#F1F5F9`.