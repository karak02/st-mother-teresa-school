---
version: alpha
name: St. Mother Teresa International School
description: All-Blue Prestige Academic System — Oxford Navy (#0C2340), Vivid Cobalt Blue (#2563EB), Sky Blue (#38BDF8) & Pure White (#FFFFFF).
colors:
  primary: "#2563EB"
  primary-hover: "#1D4ED8"
  oxford-navy: "#0C2340"
  midnight-dark: "#06152B"
  sky-accent: "#38BDF8"
  surface: "#FFFFFF"
  surface-ice: "#F0F6FF"
  border-soft: "#D8E2EF"
typography:
  font-heading: Inter, sans-serif
  font-body: Roboto, sans-serif
  h1:
    fontFamily: Inter, sans-serif
    fontSize: "3.5rem"
    fontWeight: 900
    lineHeight: "1.1"
    letterSpacing: "-0.02em"
  h2:
    fontFamily: Inter, sans-serif
    fontSize: "2.25rem"
    fontWeight: 800
    lineHeight: "1.2"
    letterSpacing: "-0.01em"
  body-md:
    fontFamily: Roboto, sans-serif
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: "1.7"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  pill: "9999px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
    padding: "14px 32px"
  header-bar:
    backgroundColor: "{colors.oxford-navy}"
    textColor: "{colors.surface}"
  badge-active:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
  card-container:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.border-soft}"
    rounded: "{rounded.xl}"
---

## Overview

A prestigious, modern all-blue institutional design system tailored for **St. Mother Teresa International School**, combining the authoritative depth of Oxford/Cambridge Navy with energetic Cobalt Blue and luminous Sky accents.

## Color Hierarchy

1. **Vivid Cobalt Blue (`#2563EB` / `rgb(37, 99, 235)`):**
   - *Role:* Primary brand catalyst, high-converting CTA buttons, admissions pills, active navigation indicators, key heading highlights.

2. **Oxford Deep Navy (`#0C2340` / `rgb(12, 35, 64)`):**
   - *Role:* Institutional foundation, top utility bar, main header, hero background overlays, impact counters strip, flagship foundation container, and footer.

3. **Sky Blue (`#38BDF8` / `rgb(56, 189, 248)`):**
   - *Role:* Logo sub-text, delicate luminous accents, active glowing indicator dots.

4. **Ice Blue Surface (`#F0F6FF` / `rgb(240, 246, 255)`):**
   - *Role:* Subtle card tinting, quote callouts, and secondary background surfaces.

5. **Pure White (`#FFFFFF`):**
   - *Role:* Clean page background, card surfaces, and crisp text on dark sections.

## Typography

- **Headings & Badges (`Inter`):** Weights `700`, `800`, `900` for authoritative academic readability.
- **Body & Editorial Copy (`Roboto`):** Weights `400`, `500` with generous line-height (`1.7–1.75`) for prolonged reading comfort.
