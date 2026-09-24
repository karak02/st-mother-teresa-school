---
version: alpha
name: St. Mother Teresa International School
description: Modern Academic Prestige with Very Light Cream Canvas (#FDFCF7) & Dynamic Blue-Teal Gradient Catalysts.
colors:
  primary-gradient: "linear-gradient(135deg, #0A58CA 0%, #0284C7 50%, #0D9488 100%)"
  oxford-navy: "#0A1E42"
  midnight-dark: "#06132B"
  accent-yellow: "#F5A623"
  accent-maroon: "#8B1E2B"
  accent-orange: "#F97316"
  canvas-cream: "#FDFCF7"
  canvas-cream-soft: "#FAF7F2"
  surface-card: "#FFFFFF"
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
    textColor: "{colors.surface-card}"
    rounded: "{rounded.pill}"
    padding: "14px 32px"
  header-bar:
    backgroundColor: "{colors.oxford-navy}"
    textColor: "{colors.surface-card}"
  badge-active:
    backgroundColor: "{colors.accent-yellow}"
    textColor: "{colors.oxford-navy}"
    rounded: "{rounded.pill}"
  badge-accolade:
    backgroundColor: "{colors.accent-maroon}"
    textColor: "{colors.surface-card}"
    rounded: "{rounded.pill}"
  card-container:
    backgroundColor: "{colors.surface-card}"
    borderColor: "{colors.border-soft}"
    rounded: "{rounded.xl}"
---

## Overview

A prestigious institutional design system built upon a warm, luxurious **Very Light Cream Canvas (`#FDFCF7`)**, offering high visual comfort while cards and containers elevate with crisp **Pure White (`#FFFFFF`)** and **Blue-Teal Gradient Catalysts**.

## Color Hierarchy

1. **Very Light Cream Canvas (`#FDFCF7` / `rgb(253, 252, 247)`):**
   - *Role:* Primary background canvas across all pages, replacing harsh stark white with warm, relaxed elegance.

2. **Soft Cream Secondary Surface (`#FAF7F2` / `rgb(250, 247, 242)`):**
   - *Role:* Alternating section backgrounds, chapter narratives, and divisions.

3. **Pure White (`#FFFFFF`):**
   - *Role:* Elevated cards, lightbox modals, form input fields, and contrast text on dark containers.

4. **Blue & Teal Gradient (`linear-gradient(135deg, #0A58CA 0%, #0284C7 50%, #0D9488 100%)`):**
   - *Role:* Primary CTAs, active indicators, and headline gradient accents.

5. **Oxford Royal Navy (`#0A1E42`):**
   - *Role:* Institutional foundation, top utility bar, hero background overlays, impact statistics strip, and footer.

6. **Accent Tones:**
   - **Academic Yellow (`#F5A623`)** for admissions pills and motto card.
   - **Collegiate Maroon (`#8B1E2B`)** for awards and philosophy card.
   - **Vibrant Orange (`#F97316`)** for logo sub-text and discovery tags.

## Typography

- **Headings & Badges (`Inter`):** Weights `700`, `800`, `900` for authoritative academic readability.
- **Body & Editorial Copy (`Roboto`):** Weights `400`, `500` with generous line-height (`1.7–1.75`) for prolonged reading comfort.
