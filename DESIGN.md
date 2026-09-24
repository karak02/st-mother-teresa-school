---
version: alpha
name: St. Mother Teresa International School
description: Dynamic Academic Prestige — Brandeis Blue, Oxford Royal Navy (#0A1E42), Academic Yellow (#F5A623), Collegiate Maroon (#8B1E2B) & Vibrant Orange (#F97316).
colors:
  primary-blue: "#0064FA"
  primary-blue-hover: "#004EC4"
  zucchini-green: "#0A1E42"
  zucchini-dark: "#06132B"
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
    backgroundColor: "{colors.primary-blue}"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
    padding: "14px 32px"
  header-bar:
    backgroundColor: "{colors.zucchini-green}"
    textColor: "{colors.surface}"
  badge-active:
    backgroundColor: "{colors.accent-yellow}"
    textColor: "{colors.zucchini-green}"
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

A prestigious institutional design system combining the authority of **Zucchini Forest Green** and **Brandeis Royal Blue** with high-contrast energy from **Academic Yellow (`#F5A623`)**, **Collegiate Maroon (`#8B1E2B`)**, and **Vibrant Orange (`#F97316`)**.

## Color Hierarchy

1. **Academic Yellow (`#F5A623` / `rgb(245, 166, 35)`):**
   - *Role:* Admissions badge pills, active indicators, live announcement ticker tag, and Motto flagship card.

2. **Collegiate Maroon (`#8B1E2B` / `rgb(139, 30, 43)`):**
   - *Role:* Ideal Principal Award badge, leadership accolades, and Educational Philosophy card.

3. **Vibrant Orange (`#F97316` / `rgb(249, 115, 22)`):**
   - *Role:* Sub-branding `INTERNATIONAL SCHOOL` logo text, visionary tags, and discovery highlights.

4. **Brandeis Blue (`#0064FA` / `rgb(0, 100, 250)`):**
   - *Role:* Primary CTAs, active highlights, button hovers, and focal links.

5. **Oxford Royal Navy (#0A1E42) (`#0A1E42` / `rgb(15, 75, 45)`):**
   - *Role:* Top utility bar, hero background overlays, impact counters strip, and footer.

6. **Pure White (`#FFFFFF`) & Warm Ivory (`#FEF9E8`):**
   - *Role:* Clean page background, card surfaces, and crisp text on dark sections.

## Typography

- **Headings & Badges (`Inter`):** Weights `700`, `800`, `900` for authoritative academic readability.
- **Body & Editorial Copy (`Roboto`):** Weights `400`, `500` with generous line-height (`1.7–1.75`) for prolonged reading comfort.
