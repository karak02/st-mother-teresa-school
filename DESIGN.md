---
version: alpha
name: St. Mother Teresa International School
description: Modern Academic Prestige with Dynamic Blue & Teal Gradient Catalysts.
colors:
  primary-gradient: "linear-gradient(135deg, #0A58CA 0%, #0284C7 50%, #0D9488 100%)"
  oxford-navy: "#0A1E42"
  midnight-dark: "#06132B"
  accent-yellow: "#F5A623"
  accent-maroon: "#8B1E2B"
  accent-orange: "#F97316"
  surface: "#FFFFFF"
  surface-warm: "#FEF9E8"
  border-soft: "#E2E8F0"
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
    background: "{colors.primary-gradient}"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
    padding: "14px 32px"
  header-bar:
    backgroundColor: "{colors.oxford-navy}"
    textColor: "{colors.surface}"
  badge-active:
    backgroundColor: "{colors.accent-yellow}"
    textColor: "{colors.oxford-navy}"
    rounded: "{rounded.pill}"
  badge-accolade:
    backgroundColor: "{colors.accent-maroon}"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
  card-container:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.border-soft}"
    rounded: "{rounded.xl}"
---

## Overview

A prestigious institutional design system combining the deep authority of **Oxford Royal Navy** with energetic **Blue & Teal Gradient Catalysts** (`#0A58CA` → `#0284C7` → `#0D9488`), punctuated by **Academic Yellow**, **Collegiate Maroon**, and **Vibrant Orange**.

## Color Hierarchy

1. **Blue & Teal Gradient (`linear-gradient(135deg, #0A58CA 0%, #0284C7 50%, #0D9488 100%)`):**
   - *Role:* Primary CTAs, main action buttons, active navigation indicators, and luminous gradient text highlights.

2. **Oxford Royal Navy (`#0A1E42` / `rgb(10, 30, 66)`):**
   - *Role:* Institutional foundation, top utility bar, hero background overlays, impact statistics strip, flagship box, and footer.

3. **Academic Yellow (`#F5A623` / `rgb(245, 166, 35)`):**
   - *Role:* Admissions badge pills, active indicators, live announcement ticker tag, and Motto flagship card.

4. **Collegiate Maroon (`#8B1E2B` / `rgb(139, 30, 43)`):**
   - *Role:* Ideal Principal Award badge, leadership accolades, and Educational Philosophy card.

5. **Vibrant Orange (`#F97316` / `rgb(249, 115, 22)`):**
   - *Role:* Sub-branding `INTERNATIONAL SCHOOL` logo text, visionary tags, and discovery indicators.

6. **Pure White (`#FFFFFF`) & Warm Ivory (`#FEF9E8`):**
   - *Role:* Clean page background, card surfaces, and crisp text on dark sections.

## Typography

- **Headings & Badges (`Inter`):** Weights `700`, `800`, `900` for authoritative academic readability.
- **Body & Editorial Copy (`Roboto`):** Weights `400`, `500` with generous line-height (`1.7–1.75`) for prolonged reading comfort.
