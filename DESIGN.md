---
version: alpha
name: St. Mother Teresa International School
description: Modern Botanical & Electric Academic Palette (Brandeis Blue, Jordy Blue, Light Cyan, Pastel Green, Zucchini Green).
colors:
  primary: "#0064FA"
  primary-hover: "#004EC4"
  jordy-blue: "#91BEFF"
  light-cyan: "#E1F5FF"
  pastel-green: "#5AA55A"
  zucchini-green: "#0F4B2D"
  zucchini-dark: "#082E1B"
  surface: "#FFFFFF"
  border-soft: "#CBE7F5"
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
    backgroundColor: "{colors.zucchini-green}"
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

A modern institutional design system derived from the curated 5-color Pinterest palette (`https://in.pinterest.com/pin/573646071307653500/`), blending deep botanical evergreen authority with vivid royal blue clarity.

## Color Hierarchy

1. **Brandeis Blue (`#0064FA` / `rgb(0, 100, 250)`):**
   - *Role:* Primary brand catalyst, high-converting CTA buttons, admissions pills, active navigation indicators, key heading highlights.

2. **Zucchini Green (`#0F4B2D` / `rgb(15, 75, 45)`):**
   - *Role:* Institutional foundation, top utility bar, main header, hero background overlays, impact counters strip, flagship foundation container, and footer.

3. **Jordy Blue (`#91BEFF` / `rgb(145, 190, 255)`):**
   - *Role:* Sky blue highlights, subtle glowing indicator dots, and delicate badges.

4. **Pastel Green (`#5AA55A` / `rgb(90, 165, 90)`):**
   - *Role:* Fresh secondary accents, verified tags, and educational growth badges.

5. **Light Cyan (`#E1F5FF` / `rgb(225, 245, 255)`):**
   - *Role:* Subtle card tinting, quote callout backgrounds, and light division highlights.

6. **Pure White (`#FFFFFF`):**
   - *Role:* Clean page background, card surfaces, and crisp text on dark sections.

## Typography

- **Headings & Badges (`Inter`):** Weights `700`, `800`, `900` for authoritative academic readability.
- **Body & Editorial Copy (`Roboto`):** Weights `400`, `500` with generous line-height (`1.7–1.75`) for prolonged reading comfort.
