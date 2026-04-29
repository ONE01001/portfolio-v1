---
name: Hardik Rana Portfolio
description: A high-fidelity, experimental developer portfolio with ASCII and pop-art interactions.
colors:
  primary: "#93e2ff"
  secondary: "#c4b5fd"
  neutral-bg: "#0b0c10"
  text: "#ececec"
  muted: "#c0c0c0"
  border: "#2b2c30"
  panel: "rgba(255, 255, 255, 0.06)"
typography:
  display:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(42px, 5.6vw, 68px)"
    fontWeight: 650
    lineHeight: 1.02
  headline:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(24px, 3vw, 32px)"
    fontWeight: 650
    lineHeight: 1.1
  body:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "ui-monospace, SFMono-Regular, monospace"
    fontSize: "13px"
    fontWeight: 600
rounded:
  md: "10px"
  lg: "12px"
  full: "999px"
spacing:
  container: "1120px"
  gutter: "20px"
components:
  button-primary:
    backgroundColor: "linear-gradient(135deg, rgba(125, 211, 252, 0.22), rgba(167, 139, 250, 0.18))"
    textColor: "{colors.text}"
    rounded: "{rounded.lg}"
    padding: "11px 14px"
  card-project:
    backgroundColor: "{colors.panel}"
    rounded: "{rounded.md}"
    border: "1px solid {colors.border}"
---

# Design System: Hardik Rana Portfolio

## 1. Overview

**Creative North Star: "The Experimental Shadow Laboratory"**

This design system focuses on high-contrast, dark-mode interactions that reward discovery. It blends technical precision (monospace labels, ASCII art) with playful experimentation (Pop Art modes, complex GSAP transitions). The system rejects the generic "SaaS Blue" aesthetic in favor of a customized, tinted neutral palette that feels bespoke and personal.

**Key Characteristics:**
- **Tactile Interaction:** Elements respond to the cursor with scaling, shadow shifts, and color transitions.
- **Atmospheric Depth:** Uses tonal layering and subtle gradients rather than heavy shadows to create hierarchy.
- **Technical Craft:** Monospace typography and ASCII elements provide a "dev-first" texture.

## 2. Colors

The palette is a "Cold Neutral" system, tinted with the primary sky-blue accent to avoid pure blacks and grays.

### Primary
- **Sky Blue** (#93e2ff): Used for primary accents, scroll progress, and interactive highlights.

### Secondary
- **Soft Lavender** (#c4b5fd): Used as a secondary gradient stop to add depth and "experimental" flavor to buttons and text.

### Neutral
- **Space Black** (#0b0c10): The core background color.
- **Glass Panel** (rgba(255, 255, 255, 0.06)): Used for cards and containers to create a "glassmorphism" effect without over-blurring.

**The rarity Rule.** The primary sky-blue accent is used sparingly (under 10% of the screen) to ensure it retains its impact as an "interactive" signal.

## 3. Typography

**Display Font:** System Sans Stack
**Body Font:** System Sans Stack
**Label/Mono Font:** System Monospace Stack

### Hierarchy
- **Display** (650 weight, clamp(42px, 5.6vw, 68px), 1.02 line-height): Hero headlines and section titles.
- **Headline** (650 weight, clamp(24px, 3vw, 32px), 1.1 line-height): Sub-section headers.
- **Body** (400 weight, 18px, 1.6 line-height): General descriptive text. Max line length capped at 75ch.
- **Label** (600 weight, 13px, monospace): Metadata, tags, and small utility text.

## 4. Elevation

The system is "Flat-by-Default," using background tints and borders for structure. Depth is only introduced during active interaction (hover/active states).

**The State-Only Shadow Rule.** Shadows appear only as a response to interaction (e.g., hovering a project card), signaling that the element is "lifted" and ready for input.

## 5. Components

### Buttons
- **Shape:** Rounded corners (12px radius).
- **Primary:** Subtle gradient (Sky Blue to Lavender) with low opacity, becoming more opaque on hover.
- **Hover / Focus:** Scale up slightly (1.02x) with a border color shift to brighter neutral.

### Chips
- **Style:** Pill shape (999px radius) with a 1px border.
- **State:** Neutral background at rest; primary border on hover.

### Cards
- **Background:** var(--panel)
- **Border:** 1px solid var(--border)
- **Hover:** Lift effect with a 24px blur shadow tinted with secondary lavender.

## 6. Do's and Don'ts

### Do:
- **Do** use OKLCH-derived tints for all neutrals to keep the "cold space" vibe.
- **Do** favor system fonts for performance, but use weight and scale (≥1.25 ratio) to create a premium feel.
- **Do** respect the `prefers-reduced-motion` flag for all complex GSAP animations.

### Don't:
- **Don't** use pure #000 or #fff; every neutral must have a hint of the brand hue.
- **Don't** use "Generic SaaS" blue or standard rounded-md (6px) buttons.
- **Don't** use overstimulating neon effects that feel like a "gamer" aesthetic.
