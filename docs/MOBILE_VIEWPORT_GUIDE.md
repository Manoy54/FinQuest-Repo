<![CDATA[<div align="center">

# 📱 FinQuest — Mobile Viewport Optimization Guide

**Making Every Pixel Count on Every Screen**

![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square)
![Priority](https://img.shields.io/badge/Priority-Critical-red?style=flat-square)
![Version](https://img.shields.io/badge/Version-2.0-blue?style=flat-square)
![Last Updated](https://img.shields.io/badge/Updated-April%202026-purple?style=flat-square)

*This guide ensures every component, page, text, and interactive element in FinQuest delivers a premium, butter-smooth experience on mobile viewports — without compromise.*

---

</div>

## Table of Contents

- [1. Mission Statement](#1-mission-statement)
- [2. Core Design Principles](#2-core-design-principles)
- [3. Viewport Configuration](#3-viewport-configuration)
- [4. Breakpoint Architecture](#4-breakpoint-architecture)
- [5. Typography System](#5-typography-system)
- [6. Spacing & Layout Tokens](#6-spacing--layout-tokens)
- [7. Content Maximization Strategy](#7-content-maximization-strategy)
- [8. Component-by-Component Specifications](#8-component-by-component-specifications)
  - [8.1 Navigation (Nav.tsx)](#81-navigation-navtsx)
  - [8.2 HUD (Heads-Up Display)](#82-hud-heads-up-display)
  - [8.3 Footer](#83-footer)
  - [8.4 Landing Page & Sections](#84-landing-page--sections)
  - [8.5 Home Dashboard](#85-home-dashboard)
  - [8.6 Game Modes (All 7)](#86-game-modes-all-7)
  - [8.7 Authentication Pages](#87-authentication-pages)
  - [8.8 Profile Page](#88-profile-page)
  - [8.9 Leaderboard](#89-leaderboard)
  - [8.10 Pricing Page](#810-pricing-page)
  - [8.11 Library & Educator Hub](#811-library--educator-hub)
  - [8.12 UI Components (ParallaxDemo, ShinyText, SmoothScroll)](#812-ui-components)
- [9. Touch Interaction Standards](#9-touch-interaction-standards)
- [10. Performance Optimization](#10-performance-optimization)
- [11. CSS Foundation & Utilities](#11-css-foundation--utilities)
- [12. Anti-Patterns & Corrections](#12-anti-patterns--corrections)
- [13. Audit Checklist](#13-audit-checklist)
- [14. Testing Protocol](#14-testing-protocol)
- [15. Implementation Roadmap](#15-implementation-roadmap)
- [16. File Reference Matrix](#16-file-reference-matrix)
- [17. Glossary](#17-glossary)

---

## 1. Mission Statement

> **FinQuest must be a mobile-first experience.** Every user interaction — from the landing page hero section to the fastest speed-round game — must feel native, performant, and visually stunning on screens as small as 320px. The mobile experience is not a scaled-down afterthought; it is the **primary** design target.

### What This Means in Practice

| Commitment | Detail |
|:-----------|:-------|
| **Zero horizontal overflow** | No content escapes the viewport boundary at any supported width |
| **No layout compromise** | Mobile layouts are purposefully designed, not auto-collapsed desktop layouts |
| **60fps minimum** | All animations, transitions, and scrolling hit ≥55fps on mid-range devices |
| **Content first** | Every pixel of mobile screen space is used meaningfully |
| **Touch native** | All interactions are designed for fingers, not cursors |

---

## 2. Core Design Principles

### 2.1 Mobile-First CSS Authoring

All CSS is authored starting from the smallest viewport and progressively enhanced upward using `min-width` media queries. **Never** write desktop-first and then override for mobile.

```css
/* ✅ CORRECT — Mobile-First */
.card {
    padding: 1rem;              /* Phones */
    font-size: 0.9375rem;
}
@media (min-width: 640px) {
    .card {
        padding: 1.25rem;       /* Large phones / small tablets */
    }
}
@media (min-width: 768px) {
    .card {
        padding: 1.5rem;        /* Tablets */
    }
}
@media (min-width: 1024px) {
    .card {
        padding: 2rem;          /* Desktops */
        font-size: 1rem;
    }
}
```

```css
/* ❌ WRONG — Desktop-First */
.card {
    padding: 2rem;
}
@media (max-width: 767px) {
    .card {
        padding: 1rem;
    }
}
```

### 2.2 Tailwind v4 Equivalent

```tsx
// ✅ Mobile-first class ordering
className="p-4 sm:p-5 md:p-6 lg:p-8"

// ❌ Never start with desktop values
```

### 2.3 Fluid Over Fixed

Use fluid units (`clamp()`, `%`, `vw`, `dvh`) over fixed pixel values wherever possible.

### 2.4 Progressive Enhancement

- Base experience works perfectly without JS animations
- Parallax, particles, and complex effects are enhancements added for capable devices
- Always provide `prefers-reduced-motion` alternatives

---

## 3. Viewport Configuration

### 3.1 Required Meta Tag

Add to `index.html` `<head>`:

```html
<meta
    name="viewport"
    content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes"
/>
<meta name="theme-color" content="#1a1a2e" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
```

| Attribute | Value | Rationale |
|:----------|:------|:----------|
| `width` | `device-width` | Matches physical device width exactly |
| `initial-scale` | `1.0` | No zoom on page load |
| `maximum-scale` | `5.0` | Allows accessibility pinch-zoom |
| `user-scalable` | `yes` | **Never disable** — WCAG 2.2 requirement |

### 3.2 Safe Area Insets (Notched/Dynamic Island Devices)

Devices with notches (iPhone X+), dynamic islands, curved edges, and bottom home indicators require safe area handling:

```css
:root {
    --safe-top: env(safe-area-inset-top);
    --safe-bottom: env(safe-area-inset-bottom);
    --safe-left: env(safe-area-inset-left);
    --safe-right: env(safe-area-inset-right);
}

/* Apply to body for global protection */
body {
    padding-top: var(--safe-top);
    padding-bottom: var(--safe-bottom);
    padding-left: var(--safe-left);
    padding-right: var(--safe-right);
}
```

### 3.3 Dynamic Viewport Height

Mobile browsers have address bars that show/hide during interaction. `100vh` does NOT account for this. Use `100dvh` everywhere:

```css
/* ✅ CORRECT */
.full-page {
    min-height: 100dvh;
}

/* ❌ INCORRECT — causes content to be hidden behind address bar */
.full-page {
    min-height: 100vh;
}
```

**Fallback for older browsers:**

```css
.full-page {
    min-height: 100vh;         /* Fallback */
    min-height: 100dvh;        /* Modern browsers override */
}
```

---

## 4. Breakpoint Architecture

### 4.1 Standard Breakpoints

| Token | Width | Target Devices | Design Focus |
|:------|:------|:---------------|:-------------|
| **Base** | `0 – 639px` | Phones (portrait) | **Primary mobile target** — design HERE first |
| `sm` | `≥ 640px` | Large phones (landscape), small tablets | Minor layout adjustments |
| `md` | `≥ 768px` | Tablets (portrait) | Column layouts unlock |
| `lg` | `≥ 1024px` | Tablets (landscape), small laptops | Full multi-column layouts |
| `xl` | `≥ 1280px` | Desktops | Wider spacing and max-widths |
| `2xl` | `≥ 1536px` | Large desktops / ultrawides | Outer bounds cap |

### 4.2 Critical Mobile Viewports

These are the exact viewport sizes you **must** test on before any PR is merged:

| Device | Width × Height | Pixel Ratio | Priority |
|:-------|:---------------|:------------|:---------|
| iPhone SE | 375 × 667 | 2x | 🔴 **Critical** — smallest common phone |
| Samsung Galaxy S23 | 360 × 780 | 3x | 🔴 **Critical** — smallest Android |
| iPhone 14 | 390 × 844 | 3x | 🟠 High — most popular phone |
| Pixel 7 | 412 × 915 | 2.625x | 🟠 High — common mid-range |
| iPhone 14 Pro Max | 430 × 932 | 3x | 🟡 Medium — largest phone |
| iPad Mini | 744 × 1133 | 2x | 🟡 Medium — tablet boundary |

### 4.3 The 320px Rule

Every layout **must** remain functional at `320px` width. This is the absolute minimum width FinQuest supports (set via `min-width: 320px` on `<body>`). Content may be tight, but it must never overflow or become illegible.

---

## 5. Typography System

### 5.1 Font Size Scale

All text uses `clamp()` for smooth, fluid scaling between breakpoints. No abrupt jumps.

| Element | Mobile (`< 640px`) | Tablet (`≥ 768px`) | Desktop (`≥ 1024px`) | `clamp()` Value |
|:--------|:-------------------|:-------------------|:---------------------|:----------------|
| `h1` (Page Title) | 1.75rem (28px) | 2.5rem (40px) | 3.2rem (51px) | `clamp(1.75rem, 4vw + 1rem, 3.2rem)` |
| `h2` (Section Title) | 1.375rem (22px) | 1.875rem (30px) | 2.25rem (36px) | `clamp(1.375rem, 3vw + 0.5rem, 2.25rem)` |
| `h3` (Card Title) | 1.125rem (18px) | 1.375rem (22px) | 1.5rem (24px) | `clamp(1.125rem, 2vw + 0.5rem, 1.5rem)` |
| Body Text | 0.9375rem (15px) | 1rem (16px) | 1rem (16px) | `clamp(0.9375rem, 1vw + 0.5rem, 1rem)` |
| Small / Caption | 0.75rem (12px) | 0.8125rem (13px) | 0.875rem (14px) | `clamp(0.75rem, 0.5vw + 0.5rem, 0.875rem)` |
| Button Text | 0.875rem (14px) | 1rem (16px) | 1rem (16px) | `clamp(0.875rem, 1vw + 0.5rem, 1rem)` |
| HUD Labels | 0.625rem (10px) | 0.6875rem (11px) | 0.75rem (12px) | — (Use fixed steps) |
| Game Stats | 0.75rem (12px) | 0.875rem (14px) | 1rem (16px) | `clamp(0.75rem, 1vw + 0.25rem, 1rem)` |

### 5.2 CSS Custom Properties for Typography

```css
:root {
    --text-h1: clamp(1.75rem, 4vw + 1rem, 3.2rem);
    --text-h2: clamp(1.375rem, 3vw + 0.5rem, 2.25rem);
    --text-h3: clamp(1.125rem, 2vw + 0.5rem, 1.5rem);
    --text-body: clamp(0.9375rem, 1vw + 0.5rem, 1rem);
    --text-small: clamp(0.75rem, 0.5vw + 0.5rem, 0.875rem);
}
```

### 5.3 Current Codebase Issue: Hero Title

The current `Hero.tsx` uses `text-8xl md:text-[12rem]` for the "FINQUEST" title. On a 360px phone, `text-8xl` (6rem = 96px) is far too large and will either overflow or force the user name to wrap awkwardly.

**Fix:**

```tsx
// ❌ CURRENT (Hero.tsx line 70)
className="text-8xl md:text-[12rem] font-black ..."

// ✅ FIXED — Fluid, mobile-safe
className="font-black ..."
style={{
    fontSize: 'clamp(2.5rem, 12vw, 12rem)',
    lineHeight: 1,
    // ... existing gradient styles
}}
```

### 5.4 Text Overflow Prevention

```tsx
// Single-line truncation
className="truncate"

// Multi-line clamping (e.g., card descriptions)
className="line-clamp-2"

// Long strings (emails, URLs)
className="break-words"
style={{ overflowWrap: 'anywhere' }}
```

### 5.5 Input Font Size (iOS Zoom Prevention)

iOS Safari auto-zooms any input with `font-size < 16px`. This is disruptive and must be prevented:

```css
/* Apply globally in index.css */
input, select, textarea {
    font-size: max(16px, 1em);
}
```

---

## 6. Spacing & Layout Tokens

### 6.1 CSS Custom Properties

Add these to `styles/base/index.css` inside `:root`:

```css
:root {
    /* ─── Spacing Scale (mobile-first values) ──── */
    --space-page-x: 1rem;          /* 16px — Horizontal page gutter */
    --space-page-y: 2rem;          /* 32px — Vertical section rhythm */
    --space-card: 1rem;            /* 16px — Card internal padding */
    --space-section: 2rem;         /* 32px — Between major sections */
    --space-gap: 0.75rem;          /* 12px — Grid/flex gap */

    /* ─── Sizing Tokens ─────────────────────────── */
    --nav-height: 51px;
    --hud-height: 60px;
    --touch-target: 44px;
    --card-radius: 1rem;
    --card-radius-lg: 1.5rem;
}

@media (min-width: 768px) {
    :root {
        --space-page-x: 1.5rem;
        --space-page-y: 3rem;
        --space-card: 1.5rem;
        --space-section: 3rem;
        --space-gap: 1rem;
        --hud-height: 80px;
        --card-radius: 1.25rem;
    }
}

@media (min-width: 1024px) {
    :root {
        --space-page-x: 2rem;
        --space-page-y: 4rem;
        --space-card: 2rem;
        --space-section: 4rem;
        --space-gap: 1.5rem;
        --hud-height: 100px;
        --card-radius: 1.5rem;
    }
}
```

### 6.2 Spacing Reference Table

| Context | Mobile | Tablet (`md`) | Desktop (`lg`) |
|:--------|:-------|:--------------|:---------------|
| Page horizontal padding | `px-4` (16px) | `px-6` (24px) | `px-8` (32px) |
| Section vertical padding | `py-8` (32px) | `py-12` (48px) | `py-16` (64px) |
| Card internal padding | `p-4` (16px) | `p-6` (24px) | `p-8` (32px) |
| Grid gap | `gap-3` (12px) | `gap-4` (16px) | `gap-6` (24px) |
| Stack gap (vertical) | `gap-4` (16px) | `gap-6` (24px) | `gap-8` (32px) |
| Section bottom margin | `mb-8` | `mb-12` | `mb-16` |
| Heading → content gap | `mb-3` | `mb-4` | `mb-6` |

### 6.3 Current Codebase Issue: Hardcoded Spacing

`Home.tsx` uses fixed spacing that doesn't adapt:

```tsx
// ❌ CURRENT (Home.tsx line 52)
className="absolute top-6 left-8 z-[60] ..."

// ✅ FIXED — Responsive spacing
className="absolute top-4 left-4 md:top-6 md:left-8 z-[60] ..."
```

```tsx
// ❌ CURRENT (Home.tsx line 74)
className="absolute top-6 right-8 z-[60] ..."

// ✅ FIXED
className="absolute top-4 right-4 md:top-6 md:right-8 z-[60] ..."
```

---

## 7. Content Maximization Strategy

Mobile screen space is limited. Every pixel must serve a purpose. These rules ensure content fills the viewport meaningfully:

### 7.1 Full-Width on Mobile, Constrained on Desktop

```tsx
// ✅ Standard page container
className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8"

// ✅ Cards fill mobile width
className="w-full sm:w-auto"

// ❌ NEVER use fixed widths that can overflow
className="w-[800px]"  // Will overflow on any phone

// ✅ Use fluid max-widths
className="w-full max-w-[800px]"
```

### 7.2 Eliminate Dead Space on Mobile

```
Desktop:                              Mobile:
┌───────────────────────────┐         ┌─────────────────┐
│     ┌─────────────┐      │         │ ┌─────────────┐ │
│     │   Content    │      │         │ │   Content    │ │
│     │             │      │         │ │   (w-full)   │ │
│     │  max-w-md   │      │         │ │   px-4       │ │
│     └─────────────┘      │         │ └─────────────┘ │
│     (centered, padded)    │         │ (edge-to-edge)  │
└───────────────────────────┘         └─────────────────┘
```

### 7.3 Current Codebase Issue: Parallax Container Width

```tsx
// ❌ CURRENT (Home.tsx line 140) — only 70% width on mobile wastes 30% of screen
style={{ height: '45vh', width: '70%' }}

// ✅ FIXED — Full width on mobile, constrained on desktop
className="w-full md:w-[85%] lg:w-[70%]"
style={{ height: 'clamp(250px, 45vh, 450px)' }}
```

### 7.4 Grid Responsiveness Patterns

```tsx
// Feature/stat cards: 1 → 2 → 3 columns
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6"

// Game mode selector: 2 → 3 → 4 columns
className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-4"

// Pricing plans: 1 → 2 → 4 columns
className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6"
```

---

## 8. Component-by-Component Specifications

### 8.1 Navigation (`Nav.tsx`)

**Current file:** `src/components/navigation/Nav.tsx`

**Current Issues Identified:**
- Logo and hamburger positioning can clash on narrow screens
- `w-[90%]` container may not maximize mobile width
- Nav card padding (p-6) is too generous for mobile
- Link text too small at `text-sm` for mobile touch

**Mobile Standards:**

```tsx
// Container: Wider on mobile for content maximization
className="absolute left-1/2 -translate-x-1/2 w-[95%] md:w-[90%] max-w-[800px] z-[99] top-[0.5rem] md:top-[1.2em]"

// Logo text: Already uses responsive classes ✅
className="text-2xl md:text-3xl font-black tracking-tighter"

// Nav cards container: Stack vertically on mobile
className="flex flex-col md:flex-row items-stretch gap-2 md:gap-[12px]"

// Individual cards: Tighter padding on mobile
className="nav-card ... p-4 md:p-6 rounded-xl md:rounded-2xl ..."

// Links: Larger minimum touch target height
className="nav-card-link ... text-base md:text-lg min-h-[44px] flex items-center py-2"
```

**Visual Layout:**

```
Mobile:                        Desktop:
┌─────────────────────┐        ┌────────────────────────────────┐
│ ☰  FINQUEST         │        │ ☰    FINQUEST          [logo] │
├─────────────────────┤        ├────────────────────────────────┤
│ ┌─────────────────┐ │        │ ┌────────┐ ┌────────┐ ┌─────┐│
│ │ Card 1 (stacked)│ │        │ │ Card 1 │ │ Card 2 │ │  3  ││
│ └─────────────────┘ │        │ └────────┘ └────────┘ └─────┘│
│ ┌─────────────────┐ │        └────────────────────────────────┘
│ │ Card 2 (stacked)│ │
│ └─────────────────┘ │
│ ┌─────────────────┐ │
│ │ Card 3 (stacked)│ │
│ └─────────────────┘ │
└─────────────────────┘
```

---

### 8.2 HUD (Heads-Up Display)

**Current file:** `src/components/navigation/HUD.tsx`

**Current Issues Identified:**
- `paddingTop: '2.5rem'` is too generous on mobile — pushes game content down
- Back button at `left-8` (32px) is too far from edge on mobile
- Controls at `right-8` similarly too far
- Center content `px-20` leaves no room on narrow screens
- `w-12 h-12` How to Play button may overlap other elements

**Mobile Standards:**

```tsx
// Header wrapper: Reduce padding on mobile
style={{
    paddingTop: 'clamp(1rem, 3vw, 2.5rem)',
    marginBottom: gap
}}

// Back button: Closer to edge on mobile
className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 z-20"

// Center content: Much less horizontal padding on mobile
className="flex flex-col items-center gap-2 md:gap-4 w-full px-12 md:px-20"

// Controls + Help: Closer to edge on mobile
className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 ..."

// How to Play button: Smaller on mobile
className="w-9 h-9 md:w-12 md:h-12 rounded-full ..."

// Level badge: Compact on mobile
className="h-7 md:h-9 ..."

// XP text: Scale down
className="text-[9px] md:text-[10px]"

// Coin text: Scale down
className="text-[10px] md:text-xs"
```

**Visual Layout:**

```
Mobile (compact):
┌─────────────────────────────────────┐
│ ← ·  GAME TITLE  · [Lvl] ▓▓▓░ 🪙 ?│  ← ~50px height
└─────────────────────────────────────┘

Desktop (spacious):
┌──────────────────────────────────────────────────┐
│   ←     ·      GAME TITLE      ·     [?]         │
│                [Lvl 3] ▓▓▓▓▓░░░ 120/200 XP  🪙45│  ← ~80px height
└──────────────────────────────────────────────────┘
```

---

### 8.3 Footer

**Current files:** `src/components/navigation/Footer.tsx`, `src/features/landing/components/sections/Footer.tsx`

**Mobile Standards:**

```tsx
// Column layout: Stack completely on mobile
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"

// Footer padding: Tight on mobile
className="px-4 md:px-8 py-8 md:py-12"

// Social icons: Centered on mobile
className="flex justify-center sm:justify-start gap-4"

// Copyright text: Centered on mobile
className="text-center sm:text-left"
```

---

### 8.4 Landing Page & Sections

**Current files:** `src/features/landing/components/`

#### Hero Section (`sections/Hero.tsx`)

| Element | Current | Mobile Fix |
|:--------|:--------|:-----------|
| Title size | `text-8xl` (96px) | `clamp(2.5rem, 12vw, 12rem)` |
| Subtitle | `text-2xl md:text-3xl` | `text-lg sm:text-xl md:text-3xl` |
| Logo image | `w-32 md:w-48` | `w-20 sm:w-28 md:w-48` ✅ shrink on tiny phones |
| CTA buttons | `w-64` fixed | `w-full sm:w-64` full width on mobile |
| Dekoration symbols | `text-9xl` with fixed positions | Hide on mobile  (`hidden md:block`) or reduce to `text-5xl` |
| Button gap | `gap-6` | `gap-3 sm:gap-4 md:gap-6` |

```tsx
// ✅ CTA Buttons: Full-width on mobile
<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 w-full sm:w-auto px-4 sm:px-0">
    <Link className="... w-full sm:w-64 py-3 sm:py-4 text-base sm:text-xl ...">
        Play Now
    </Link>
    <button className="... w-full sm:w-64 py-3 sm:py-4 text-base sm:text-xl ...">
        How to Play
    </button>
</div>
```

#### All Landing Sections

| Section | Mobile Adaptation |
|:--------|:------------------|
| **About** | Single column, images reduce to `max-w-xs` |
| **Goals** | Cards → `grid-cols-1`, reduced padding |
| **Features** | `grid-cols-1 sm:grid-cols-2` → never 3-column on mobile |
| **GameplayPreview** | Full-width preview images, horizontal scroll with snap |
| **HowToPlay** | Steps stack vertically, numbered list style |
| **FAQ** | Full-width accordions, ≥44px tap targets |
| **Developers** | Cards stack `grid-cols-1 sm:grid-cols-2` |
| **Footer** | Single column stack, centered |

#### LandingPage Container

```tsx
// ❌ CURRENT (LandingPage.tsx line 16)
className="min-h-screen font-sans relative overflow-hidden"

// ✅ FIXED — Use dvh for proper mobile viewport
className="min-h-[100dvh] font-sans relative overflow-x-hidden"
```

> **Note on `backdrop-filter`:** The landing page uses `backdrop-blur-sm` on multiple section wrappers. On low-end mobile devices, stacked backdrop filters are **extremely GPU-intensive**. Consider using solid semi-transparent backgrounds as fallback on low-end devices (see [Section 10.5](#105-glassmorphism--backdrop-filter)).

---

### 8.5 Home Dashboard

**Current file:** `src/features/homepage/components/Home.tsx`

**Issues Identified:**
- Avatar is `w-24 h-24` which may overlap the nav bar
- Logout button at `right-8` may go under nav
- Main content `paddingTop: '96px'` is excessive on mobile
- StreakTracker `md:w-[340px]` doesn't flex properly on mobile
- Parallax container `width: '70%'` wastes mobile space

**Mobile Standards:**

```tsx
// Root container: Use dvh
className="min-h-[100dvh] w-full flex flex-col relative overflow-x-hidden"

// Avatar: Smaller on mobile, proper positioning
className="absolute top-3 left-3 md:top-6 md:left-8 z-[60]"
// Avatar size
className="relative w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 ..."

// Logout: Mobile-friendly positioning
className="absolute top-3 right-3 md:top-6 md:right-8 z-[60] ..."

// Main content: Less top padding on mobile
style={{
    paddingTop: navExpanded ? `${navHeight + 20}px` : 'clamp(60px, 15vw, 96px)'
}}

// Welcome heading: Scale down
className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black ..."

// Streak + Trivia: Stack on mobile
className="w-full max-w-4xl flex flex-col gap-4 mb-8 md:mb-10 lg:mb-14"
// StreakTracker: Full width on mobile
className="w-full md:w-[340px] shrink-0"

// Parallax container: Full width on mobile
className="relative mx-auto w-full md:w-[85%] lg:w-[70%]"
style={{ height: 'clamp(250px, 45vh, 450px)' }}
```

---

### 8.6 Game Modes (All 7)

**Current files:** `src/features/game-modes/components/`

#### Universal Game Layout Rule

Every game page must use this layout structure:

```tsx
<div className="min-h-[100dvh] flex flex-col overflow-hidden">
    {/* HUD — Fixed height, compact on mobile */}
    <HUD ... className="shrink-0" />

    {/* Game Area — Fills remaining space */}
    <main className="flex-1 min-h-0 overflow-y-auto px-3 md:px-6 lg:px-8">
        {/* Game-specific content */}
    </main>

    {/* Action Bar — Sticky at bottom on mobile */}
    <footer className="shrink-0 p-3 md:p-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        {/* Submit buttons, controls */}
    </footer>
</div>
```

```
Mobile Visual:
┌─────────────────────────────────┐
│ ← QUIZ BEE  [Lv3] ▓▓░ 🪙 45  ?│  ← HUD (~50px)
├─────────────────────────────────┤
│                                 │
│         GAME CONTENT            │  ← flex-1 (fills viewport)
│    (scrollable if needed)       │
│                                 │
├─────────────────────────────────┤
│   [ Submit Answer ]             │  ← Sticky bottom bar
└─────────────────────────────────┘
```

#### Per-Game Adaptations

| Game | Key Mobile Changes |
|:-----|:-------------------|
| **QuizBee** | Answer buttons: `flex-col w-full` stacked; Timer: `text-2xl` (down from `3xl`); Question text: `text-base` |
| **MonetaryMastery** | Flashcard: `max-w-[90%] sm:max-w-sm`; Swipe gestures enabled; Term/definition font scaled with `clamp()` |
| **WordHunt** | Grid cells: `min-w-[2rem] min-h-[2rem]`; Letters: `text-sm`; Grid fills viewport width |
| **Crossword** | Cell size: `min-w-[1.5rem]`; Pan/zoom via touch; Virtual keyboard respects layout |
| **SpeedRound** | Timer prominent center-top; Buttons large `min-h-[48px]` centered; No side margins |
| **MatchingGame** | Grid: `grid-cols-2 sm:grid-cols-3 md:grid-cols-4`; Cards min `60×60px`; Flip animation uses `transform` only |
| **SpotDifference** | Images stack **vertically** (not side-by-side); Pinch-to-zoom; Tap spots ≥ `44×44px` target |

---

### 8.7 Authentication Pages

**Current files:** `src/features/auth/components/`

```tsx
// Auth card: Nearly full-width on mobile
className="w-[95%] sm:w-[90%] md:w-[480px] max-w-[480px] mx-auto"

// Form inputs: Full width, comfortable height, no iOS zoom
className="w-full h-12 px-4 text-base rounded-xl"
style={{ fontSize: 'max(16px, 1em)' }}

// Submit button: Full width, tall tap target
className="w-full h-12 text-base font-semibold rounded-xl"

// Input labels
className="text-sm font-medium mb-1.5 block"

// Avatar Setup: Scale avatar preview
className="w-24 h-24 sm:w-28 sm:h-28 md:w-40 md:h-40"
```

---

### 8.8 Profile Page

```tsx
// Avatar display: Centered, responsive
className="flex flex-col items-center gap-3 md:gap-6"

// ProgressRing: Scale down
// Mobile: 80×80px (stroke-width: 5)
// Desktop: 140×140px (stroke-width: 8)

// Stats grid: 2 columns on mobile
className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"

// Achievement badges: Smaller on mobile
className="w-10 h-10 md:w-16 md:h-16"
```

---

### 8.9 Leaderboard

```tsx
// Top 3 Podium: Compact horizontal on mobile
// Mobile: Smaller avatars (w-10 h-10), horizontal row
// Desktop: Full podium with elevation

// Ranking rows: Full width, compact
className="flex items-center gap-2 md:gap-3 py-2 md:py-3 px-3 md:px-4"

// Tab switcher: Even distribution
className="flex w-full"
// Each tab:
className="flex-1 py-3 text-center text-sm md:text-base min-h-[44px]"
```

---

### 8.10 Pricing Page

```tsx
// Plan cards: Stack on mobile
className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6"

// Price text
className="text-3xl md:text-4xl font-black"

// Feature list
className="space-y-2 md:space-y-3 text-sm md:text-base"

// Featured plan: Full-width callout
className="relative w-full p-4 md:p-8"
```

---

### 8.11 Library & Educator Hub

```tsx
// Library search bar: Full width on mobile
className="w-full px-4 py-3 text-base rounded-xl"

// Filter chips: Horizontal scroll
className="flex overflow-x-auto gap-2 pb-2 no-scrollbar scroll-snap-x"
// Each chip:
className="shrink-0 px-3 py-1.5 rounded-full text-sm min-h-[36px]"

// Educator Hub cards: Single column on mobile
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
```

---

### 8.12 UI Components

#### ParallaxDemo (`src/components/ui/ParallaxDemo.tsx`)

```tsx
// Enable momentum-based touch scrolling
className="w-full overflow-x-auto -webkit-overflow-scrolling-touch"
style={{
    WebkitOverflowScrolling: 'touch',
    scrollSnapType: 'x mandatory'
}}

// Each card: Narrower on mobile
className="w-[280px] sm:w-[320px] md:w-[350px] shrink-0 scroll-snap-align-start"
```

#### SmoothScroll (`src/components/ui/SmoothScroll.tsx`)

```tsx
// Disable Lenis on low-end mobile — native scrolling is smoother
const isMobile = window.matchMedia('(max-width: 768px)').matches;
const isLowEnd = navigator.hardwareConcurrency <= 4;

if (isMobile && isLowEnd) {
    return <>{children}</>;  // Native scroll fallback
}
```

#### AnimatedBackground

```tsx
// Reduce particle count on mobile
const isMobile = window.matchMedia('(max-width: 768px)').matches;
const PARTICLE_COUNT = isMobile ? 10 : 30;
```

---

## 9. Touch Interaction Standards

### 9.1 Minimum Touch Targets

```
┌────────────────────────────────────────────────────────┐
│  WCAG 2.2 Level AAA:     Minimum = 44 × 44px          │
│  FinQuest Standard:      Minimum = 44 × 44px          │
│  Primary Actions:        Recommended = 48 × 48px      │
│  Game Answer Buttons:    Recommended = 48px height     │
└────────────────────────────────────────────────────────┘
```

### 9.2 Implementation

```tsx
// ✅ All clickable elements
className="min-w-[44px] min-h-[44px] flex items-center justify-center"

// ✅ Extend tap area invisibly (for small visual elements)
className="p-2 -m-2"  // Hits 44px without changing visual size

// ✅ Game answer buttons
className="min-h-[48px] w-full px-4 py-3 text-sm md:text-base"
```

### 9.3 Spacing Between Touch Targets

```tsx
// ✅ Minimum 8px gap between adjacent interactive elements
className="gap-2"

// ❌ Never stack buttons without gap
className="gap-0"  // Risk of mis-taps
```

### 9.4 Touch Feedback

```css
/* Add to index.css */
.touchable {
    -webkit-tap-highlight-color: rgba(255, 215, 0, 0.15);
    touch-action: manipulation;  /* Removes 300ms tap delay */
}

.touchable:active {
    transform: scale(0.97);
    opacity: 0.9;
    transition: transform 0.1s, opacity 0.1s;
}
```

### 9.5 Gesture Considerations

| Gesture | Where Used | Implementation |
|:--------|:-----------|:---------------|
| **Swipe** | MonetaryMastery flashcards, ParallaxDemo | `touch-action: pan-x` |
| **Tap** | All buttons, game answers, grid cells | Standard `onClick` + 44px target |
| **Pinch-Zoom** | SpotDifference images, Crossword | `touch-action: pinch-zoom` |
| **Scroll** | All pages, horizontal carousels | `overflow-auto`, `-webkit-overflow-scrolling: touch` |

---

## 10. Performance Optimization

### 10.1 Animation Rules

| Rule | Detail |
|:-----|:-------|
| **Animate only `transform` and `opacity`** | These are GPU-composited. Never animate `width`, `height`, `top`, `left`, `margin`, or `padding` |
| **Use `will-change` sparingly** | Only on actively animating elements; remove after completion |
| **Request Animation Frame** | All custom JS animations use `requestAnimationFrame`, never `setInterval` |
| **Reduce visual complexity** | Mobile: fewer particles, simpler shadows, thinner borders |
| **Batch DOM operations** | Never interleave DOM reads and writes (causes layout thrashing) |

### 10.2 GSAP Mobile Pattern

```typescript
const mm = gsap.matchMedia();

mm.add("(max-width: 767px)", () => {
    // Simpler, faster animations for mobile
    gsap.to(".card", {
        y: 0, opacity: 1,
        duration: 0.3,       // Shorter
        stagger: 0.05        // Faster stagger
    });
});

mm.add("(min-width: 768px)", () => {
    // Full-complexity desktop animations
    gsap.to(".card", {
        y: 0, opacity: 1,
        duration: 0.5,
        stagger: 0.1
    });
});
```

### 10.3 Scroll Performance

```tsx
// SmoothScroll.tsx — Conditional Lenis
const isMobile = window.matchMedia('(max-width: 768px)').matches;
const isLowEnd = navigator.hardwareConcurrency <= 4;

if (isMobile && isLowEnd) {
    // Native scrolling is browser-optimized — don't fight it
    return <>{children}</>;
}
```

### 10.4 Reduced Motion

```css
/* Add to index.css — Respect user preferences */
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
}
```

```tsx
// In JS/TS components
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

gsap.to(element, {
    duration: prefersReducedMotion ? 0 : 0.4,
    ...
});
```

### 10.5 Glassmorphism & `backdrop-filter`

`backdrop-filter: blur()` is **GPU-intensive** on mobile, especially when stacked (the landing page has 5+ layers with `backdrop-blur-sm`).

```tsx
// Detect low-end devices
const isLowEnd = navigator.hardwareConcurrency <= 4
    || navigator.deviceMemory < 4; // Chrome only

// Fallback: solid backgrounds on low-end
const cardBg = isLowEnd
    ? 'rgba(26, 26, 46, 0.95)'        // Solid — fast
    : 'rgba(255, 255, 255, 0.05)';     // Glass — pretty

const cardStyle = isLowEnd
    ? { background: cardBg }
    : { background: cardBg, backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' };
```

### 10.6 Image Optimization

```tsx
// Responsive images
<img
    src="/hero-mobile.webp"
    srcSet="/hero-mobile.webp 640w, /hero-tablet.webp 1024w, /hero-desktop.webp 1920w"
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    loading="lazy"
    decoding="async"
    alt="descriptive text"
/>
```

### 10.7 Lazy Loading Game Routes

```tsx
// App.tsx — Lazy load heavy game components
import React, { Suspense, lazy } from 'react';

const QuizBee = lazy(() => import('./features/game-modes/components/QuizBee'));
const Crossword = lazy(() => import('./features/game-modes/components/Crossword'));
// ... all 7 games

<Route path="/quiz-bee" element={
    <ProtectedRoute>
        <Suspense fallback={<LoadingSpinner />}>
            <QuizBee />
        </Suspense>
    </ProtectedRoute>
} />
```

### 10.8 Performance Budget

| Metric | Target | Tool |
|:-------|:-------|:-----|
| First Contentful Paint | < 1.5s | Lighthouse |
| Largest Contentful Paint | < 2.5s | Lighthouse |
| Cumulative Layout Shift | < 0.1 | Lighthouse |
| Time to Interactive | < 3.0s | Lighthouse |
| Total Bundle Size (gzip) | < 300KB initial | Vite build |
| Animation Frame Rate | ≥ 55fps | DevTools Performance |
| Memory Usage | < 100MB | DevTools Memory |

---

## 11. CSS Foundation & Utilities

### 11.1 Global Mobile Utilities

Add these to `styles/base/index.css`:

```css
/* ─── Mobile Utility Classes ──────────────────────────── */

/* Safe viewport height */
.h-screen-safe {
    height: 100vh;
    height: 100dvh;
}

.min-h-screen-safe {
    min-height: 100vh;
    min-height: 100dvh;
}

/* Force content within viewport */
.mobile-safe {
    max-width: 100vw;
    overflow-x: hidden;
}

/* Touch-optimized interactive element */
.touch-target {
    min-width: 44px;
    min-height: 44px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
}

/* Full-bleed section */
.full-bleed {
    width: 100vw;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
}

/* Prevent iOS input zoom */
input, select, textarea {
    font-size: max(16px, 1em);
}

/* Hide scrollbar, keep scroll */
.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

/* Horizontal scroll snap container */
.scroll-snap-x {
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
}
.scroll-snap-x > * {
    scroll-snap-align: start;
}
```

### 11.2 Reduced Motion Global

```css
/* Already partially handled by existing animations — add globally */
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
}
```

---

## 12. Anti-Patterns & Corrections

| ❌ Anti-Pattern | ✅ Correct Approach | Impact |
|:---------------|:--------------------|:-------|
| `width: 800px` on containers | `width: 100%; max-width: 800px` | Prevents overflow |
| `position: fixed` without safe-area | Add `padding-bottom: env(safe-area-inset-bottom)` | Prevents home-bar overlap |
| `font-size: 12px` on inputs (iOS) | `font-size: max(16px, 1em)` | Prevents auto-zoom |
| `overflow: hidden` on `<body>` | Only on modals; restore on close | Prevents scroll-lock bugs |
| `100vh` for full-page layouts | `100dvh` with `100vh` fallback | Accounts for browser chrome |
| Heavy `box-shadow` + `backdrop-filter` | Use one or the other on mobile | Prevents GPU thrash |
| Only `hover:` interaction states | Add `active:` and `focus-visible:` too | Touch devices don't hover |
| `vw` units without max | `min(90vw, 600px)` | Prevents ultrawide issues |
| Desktop-only testing | Mobile viewport open FIRST | Catches issues early |
| Animating `width`, `height`, `margin` | Animate `transform` and `opacity` only | 60fps compliance |
| `top-6 left-8` without responsive | `top-4 left-4 md:top-6 md:left-8` | Edge proximity on mobile |
| Fixed parallax container width `70%` | `w-full md:w-[85%] lg:w-[70%]` | Content maximization |

---

## 13. Audit Checklist

### 13.1 Per-Component Checklist

Every component **must pass ALL** of these before being considered mobile-ready:

| # | Check | Pass Criteria |
|:--|:------|:--------------|
| 1 | **No horizontal overflow** | No content extends beyond viewport at 320px |
| 2 | **Touch targets** | All interactive elements ≥ 44×44px tap area |
| 3 | **Text readability** | Minimum `12px` font; body ≥ `15px` |
| 4 | **Content not clipped** | No text/images cut off at any mobile viewport |
| 5 | **Proper stacking** | Multi-column → single column at `< 640px` |
| 6 | **No fixed widths** | No `width: Npx` without `max-width: 100%` |
| 7 | **Images responsive** | All images: `max-width: 100%; height: auto` |
| 8 | **Inputs accessible** | No zoom on focus (font-size ≥ 16px on iOS) |
| 9 | **Modals work** | Overlays work correctly; body scroll locked |
| 10 | **Animations smooth** | No dropped frames on 60Hz mobile |
| 11 | **Keyboard safe** | Virtual keyboard doesn't break layout |
| 12 | **Safe areas respected** | Content clear of notch/home indicator/status bar |

### 13.2 Page-Level Status Tracker

| Page | Status | Owner | Notes |
|:-----|:------:|:------|:------|
| Landing Page | ⬜ | — | Hero title overflow, backdrop-filter perf |
| Login Page | ⬜ | — | Input zoom prevention needed |
| Register Page | ⬜ | — | Same as Login |
| Avatar Setup | ⬜ | — | Preview scales, color pickers accessible |
| Home Dashboard | ⬜ | — | Avatar overlap, parallax width, spacing |
| QuizBee | ⬜ | — | Answer buttons stack, timer visible |
| Monetary Mastery | ⬜ | — | Flashcards swipeable, text readable |
| Word Hunt | ⬜ | — | Grid fits viewport, letters legible |
| Crossword | ⬜ | — | Pan/zoom, cells tappable |
| Speed Round | ⬜ | — | Fast UI, no input lag |
| Matching Game | ⬜ | — | Grid adapts, flip smooth |
| Spot Difference | ⬜ | — | Images stacked vertically, tap precision |
| Profile | ⬜ | — | Stats grid 2-col, badges scaled |
| Leaderboard | ⬜ | — | Tabs scrollable, compact rows |
| Educator Hub | ⬜ | — | Cards stack, overlay visible |
| Library | ⬜ | — | Search full-width, filters scroll |
| Pricing | ⬜ | — | Plans stack vertically |

**Legend:** ⬜ Not Started · 🟡 In Progress · ✅ Complete · 🔴 Blocked

---

## 14. Testing Protocol

### 14.1 Manual Testing Workflow

```
For EVERY mobile-related PR:

1. Open Chrome DevTools → Ctrl+Shift+M (Toggle Device Toolbar)
2. Test in this order (smallest to largest):
   ├── 360 × 780   (Samsung Galaxy S23 — smallest common Android)
   ├── 375 × 667   (iPhone SE — critical constraint)
   ├── 390 × 844   (iPhone 14 — most common phone worldwide)
   ├── 430 × 932   (iPhone 14 Pro Max — largest phone)
   └── 768 × 1024  (iPad — tablet breakpoint)

3. For EACH viewport:
   ├── Navigate ALL routes end-to-end
   ├── Test all clickable/tappable elements
   ├── Verify body has no horizontal scrollbar
   ├── Open DevTools Performance tab → record 5s scroll animation
   │   └── Verify ≥ 55fps average
   ├── Test form inputs (check for iOS zoom)
   ├── Open virtual keyboard → verify layout doesn't break
   └── Check text is readable without zooming

4. Test with CPU 4× slowdown (simulates low-end phone):
   └── Performance tab → ⚙️ → CPU: 4× slowdown → Re-test animations
```

### 14.2 Automated Testing (Playwright)

```typescript
// tests/mobile-viewport.spec.ts
import { test, expect } from '@playwright/test';

const MOBILE_VIEWPORTS = [
    { width: 360, height: 780, name: 'Galaxy S23' },
    { width: 375, height: 667, name: 'iPhone SE' },
    { width: 390, height: 844, name: 'iPhone 14' },
    { width: 430, height: 932, name: 'iPhone 14 Pro Max' },
];

const ROUTES = [
    '/', '/login', '/register',
    '/home', '/quiz-bee', '/word-hunt',
    '/crossword', '/speed-round',
    '/matching-game', '/spot-difference',
    '/monetary-mastery', '/profile',
    '/leaderboards', '/pricing', '/library',
    '/educator-hub'
];

for (const viewport of MOBILE_VIEWPORTS) {
    test.describe(`${viewport.name} (${viewport.width}×${viewport.height})`, () => {

        test.beforeEach(async ({ page }) => {
            await page.setViewportSize(viewport);
        });

        for (const route of ROUTES) {
            test(`No horizontal overflow on ${route}`, async ({ page }) => {
                await page.goto(route, { waitUntil: 'networkidle' });
                const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
                expect(bodyWidth).toBeLessThanOrEqual(viewport.width);
            });
        }

        test('Touch targets meet minimum size', async ({ page }) => {
            await page.goto('/');
            const smallTargets = await page.evaluate(() => {
                const clickables = document.querySelectorAll('a, button, [role="button"], input, select, textarea');
                const violations: string[] = [];
                clickables.forEach(el => {
                    const rect = el.getBoundingClientRect();
                    if (rect.width > 0 && rect.height > 0) {
                        if (rect.width < 44 || rect.height < 44) {
                            violations.push(`${el.tagName}.${el.className.split(' ')[0]}: ${rect.width.toFixed(0)}×${rect.height.toFixed(0)}`);
                        }
                    }
                });
                return violations;
            });
            expect(smallTargets).toEqual([]);
        });
    });
}
```

---

## 15. Implementation Roadmap

### Phase 1 — 🔴 Critical (P0) — Must-Have

| # | Task | Files Affected |
|:--|:-----|:---------------|
| 1 | Add viewport meta + safe area CSS + theme-color | `index.html`, `index.css` |
| 2 | Add CSS custom properties (spacing, typography, sizing tokens) | `styles/base/index.css` |
| 3 | Add mobile utility classes | `styles/base/index.css` |
| 4 | Fix `100vh` → `100dvh` in all page-level components | `LandingPage`, `Home`, all games |
| 5 | Fix Nav overflow & padding on small screens | `Nav.tsx` |
| 6 | Make HUD compact on mobile (padding, positioning, sizing) | `HUD.tsx` |
| 7 | Fix form input zoom (font-size ≥ 16px) | Auth pages, `index.css` |
| 8 | Fix Hero title (`text-8xl`) overflow on mobile | `Hero.tsx` |

### Phase 2 — 🟠 High Priority (P1)

| # | Task | Files Affected |
|:--|:-----|:---------------|
| 9 | Implement fluid typography with `clamp()` | All components |
| 10 | Make all grid layouts responsive (1→2→3 columns) | Home, Profile, Leaderboard, Pricing, Features |
| 11 | Enforce 44×44px touch targets on all interactive elements | All interactive components |
| 12 | Game layouts fill mobile viewport properly | All 7 game components |
| 13 | Landing page section responsiveness (stacking, padding) | All landing sections |
| 14 | Home Dashboard: Avatar size, parallax width, spacing | `Home.tsx` |
| 15 | CTA buttons full-width on mobile | `Hero.tsx` |

### Phase 3 — 🟡 Polish (P2)

| # | Task | Files Affected |
|:--|:-----|:---------------|
| 16 | Reduced motion support (`prefers-reduced-motion`) | GSAP configs, CSS globals |
| 17 | Low-end device fallbacks (particles, backdrop-filter) | `AnimatedBackground`, `SmoothScroll`, `LandingPage` |
| 18 | Lazy load game routes | `App.tsx` |
| 19 | Image `srcSet` optimization | Hero, game previews, avatars |
| 20 | Footer stacking & centering on mobile | `Footer.tsx` (both) |

### Phase 4 — 🟢 Nice-to-Have (P3)

| # | Task | Files Affected |
|:--|:-----|:---------------|
| 21 | Playwright viewport test suite | New test files |
| 22 | PWA manifest + service worker | Root config |
| 23 | Orientation lock for specific games | Game components |
| 24 | Haptic feedback API integration | Touch handlers |

---

## 16. File Reference Matrix

| File Path | Key Mobile Changes Required |
|:----------|:---------------------------|
| `index.html` | Viewport meta, theme-color, apple-mobile-web-app-capable |
| `styles/base/index.css` | CSS custom properties, utility classes, reduced motion, safe areas, input zoom fix |
| `components/navigation/Nav.tsx` | Container width `95%`, logo scale, vertical card stack, touch targets |
| `components/navigation/HUD.tsx` | Compact mode `< md`, reduced padding, closer-to-edge positioning |
| `components/navigation/Footer.tsx` | Single-column stack, centered alignment |
| `components/navigation/Header.tsx` | Responsive height calculations |
| `components/ui/ParallaxDemo.tsx` | Touch-scroll, momentum, narrower cards on mobile |
| `components/ui/SmoothScroll.tsx` | Disable Lenis on low-end mobile |
| `features/auth/*` | Full-width forms, input font `16px`, no zoom |
| `features/homepage/Home.tsx` | Avatar size, logout position, parallax width, dvh, spacing |
| `features/homepage/StreakTracker.tsx` | Full width on mobile |
| `features/landing/LandingPage.tsx` | `overflow-x-hidden`, `100dvh`, backdrop-filter fallback |
| `features/landing/.../Hero.tsx` | Title `clamp()`, CTA full-width, decoration sizing |
| `features/landing/.../About.tsx` | Single column, image scaling |
| `features/landing/.../Goals.tsx` | `grid-cols-1` on mobile |
| `features/landing/.../Features.tsx` | `grid-cols-1 sm:grid-cols-2` |
| `features/landing/.../GameplayPreview.tsx` | Full-width, horizontal scroll snap |
| `features/landing/.../HowToPlay.tsx` | Vertical stack, numbered list |
| `features/landing/.../FAQ.tsx` | Full-width accordions, 44px tap targets |
| `features/landing/.../Developers.tsx` | `grid-cols-1 sm:grid-cols-2` |
| `features/landing/.../Footer.tsx` | Stack columns, center content |
| `features/game-modes/QuizBee.tsx` | Answer buttons stack, timer scale, dvh layout |
| `features/game-modes/MonetaryMastery.tsx` | Flashcard max-width, swipe gestures, dvh layout |
| `features/game-modes/WordHunt.tsx` | Grid viewport fill, cell sizing, dvh layout |
| `features/game-modes/Crossword.tsx` | Pan/zoom, cell sizing, keyboard-safe, dvh layout |
| `features/game-modes/SpeedRound.tsx` | Button sizing, timer prominence, dvh layout |
| `features/game-modes/MatchingGame.tsx` | Responsive grid cols, min card size, dvh layout |
| `features/game-modes/SpotDifference.tsx` | Vertical image stack, pinch-zoom, dvh layout |
| `features/profile/Profile.tsx` | Stats 2-col grid, scaled avatar, compact badges |
| `features/leaderboards/LeaderboardPage.tsx` | Compact rows, scrollable tabs, responsive podium |
| `features/pricing/PricingPage.tsx` | Stack plans vertically, full-width pricing |
| `features/library/LibraryPage.tsx` | Full-width search, horizontal filter scroll |
| `features/educator-hub/EducatorHubPage.tsx` | Single-column cards, responsive "coming soon" |

---

## 17. Glossary

| Term | Definition |
|:-----|:-----------|
| **dvh** | Dynamic viewport height — adjusts when mobile browser chrome (address bar) shows/hides |
| **safe-area-inset** | CSS env() variable for the space occupied by device notches, home indicators, etc. |
| **touch-action: manipulation** | Tells the browser to handle panning/zooming but removes the 300ms tap delay |
| **will-change** | CSS hint to the browser to GPU-accelerate an element; overuse degrades performance |
| **Layout thrashing** | Alternating DOM reads and writes, forcing repeated expensive reflows |
| **Composited layer** | An element promoted to its own GPU layer for efficient animation of `transform`/`opacity` |
| **CLS** | Cumulative Layout Shift — measures unexpected visual movement; lower = better |
| **LCP** | Largest Contentful Paint — time until the biggest visible element renders |
| **FCP** | First Contentful Paint — time until the first text or image renders |
| **TTI** | Time to Interactive — time until the page responds reliably to user input |
| **clamp()** | CSS function `clamp(min, preferred, max)` for fluid sizing between bounds |
| **Mobile-first** | CSS methodology where base styles target mobile, enhanced with `min-width` queries |

---

<div align="center">

### Contributors

*This document is maintained by the FinQuest development team.*
*For questions, open a discussion in the repository.*

---

**Last Updated:** April 2026 · **Document Version:** 2.0

</div>
]]>
