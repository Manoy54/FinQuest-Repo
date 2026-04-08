# Mobile Viewport Optimization Guide

> FinQuest — Making Every Component Mobile-First Without Compromise

## 1. Overview & Objectives

This document defines the **complete mobile responsiveness strategy** for the FinQuest codebase. Every component, page, text element, and container must render correctly across all mobile viewports while preserving visual quality, animation smoothness, and interaction fidelity.

### Core Principles

| Principle | Description |
|-----------|-------------|
| **Mobile-First** | All styles begin at the smallest viewport and scale up via `min-width` media queries |
| **No Compromise** | Mobile must feel equally premium — no stripped-down or "lite" experience |
| **Content Maximization** | Screen real estate is precious on mobile; fill it meaningfully without clutter |
| **60 fps Minimum** | Animations, transitions, and scrolling must remain silky smooth on low-end devices |
| **Touch-Native** | All interactive elements sized and spaced for thumb-friendly interaction |

---

## 2. Breakpoint System

### Standard Breakpoints (Tailwind v4)

| Token | Width | Target Devices |
|-------|-------|----------------|
| **Base** | `0 – 639px` | Phones (portrait) — **Primary mobile target** |
| `sm` | `≥ 640px` | Large phones (landscape), small tablets |
| `md` | `≥ 768px` | Tablets (portrait) |
| `lg` | `≥ 1024px` | Tablets (landscape), small laptops |
| `xl` | `≥ 1280px` | Desktops |
| `2xl` | `≥ 1536px` | Large desktops |

### Critical Mobile Viewports to Test

| Device | Width × Height | Pixel Ratio |
|--------|---------------|-------------|
| iPhone SE | 375 × 667 | 2x |
| iPhone 14 | 390 × 844 | 3x |
| iPhone 14 Pro Max | 430 × 932 | 3x |
| Samsung Galaxy S23 | 360 × 780 | 3x |
| Pixel 7 | 412 × 915 | 2.625x |
| iPad Mini | 744 × 1133 | 2x |

### Implementation Rule

```css
/* ✅ CORRECT: Mobile-first (base → up) */
.component {
    padding: 1rem;           /* Mobile default */
}
@media (min-width: 768px) {
    .component {
        padding: 2rem;       /* Tablet and up */
    }
}

/* ❌ WRONG: Desktop-first (large → down) */
.component {
    padding: 2rem;           /* Desktop default */
}
@media (max-width: 767px) {
    .component {
        padding: 1rem;       /* Mobile override */
    }
}
```

**Tailwind equivalent:**

```tsx
// ✅ Mobile-first class order
className="p-4 md:p-8 lg:p-12"

// ❌ Never assume desktop defaults then override for mobile
```

---

## 3. Viewport Meta Configuration

### Required `<meta>` Tag (`index.html`)

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
```

| Attribute | Value | Reason |
|-----------|-------|--------|
| `width` | `device-width` | Match physical device width |
| `initial-scale` | `1.0` | Start at 100% zoom |
| `maximum-scale` | `5.0` | Allow pinch-zoom for accessibility |
| `user-scalable` | `yes` | **Never disable** — WCAG requirement |

### Safe Area Insets (Notched Devices)

```css
:root {
    --safe-top: env(safe-area-inset-top);
    --safe-bottom: env(safe-area-inset-bottom);
    --safe-left: env(safe-area-inset-left);
    --safe-right: env(safe-area-inset-right);
}

body {
    padding-top: var(--safe-top);
    padding-bottom: var(--safe-bottom);
    padding-left: var(--safe-left);
    padding-right: var(--safe-right);
}
```

---

## 4. Typography Scaling

### Font Size Scale

| Element | Mobile (`< 640px`) | Tablet (`≥ 768px`) | Desktop (`≥ 1024px`) |
|---------|-------------------|--------------------|--------------------|
| `h1` (Page Title) | `1.75rem` (28px) | `2.5rem` (40px) | `3.2rem` (51.2px) |
| `h2` (Section Title) | `1.375rem` (22px) | `1.875rem` (30px) | `2.25rem` (36px) |
| `h3` (Card Title) | `1.125rem` (18px) | `1.375rem` (22px) | `1.5rem` (24px) |
| Body Text | `0.9375rem` (15px) | `1rem` (16px) | `1rem` (16px) |
| Small / Caption | `0.75rem` (12px) | `0.8125rem` (13px) | `0.875rem` (14px) |
| Button Text | `0.875rem` (14px) | `1rem` (16px) | `1rem` (16px) |
| HUD Labels | `0.625rem` (10px) | `0.6875rem` (11px) | `0.75rem` (12px) |
| Game Stats | `0.75rem` (12px) | `0.875rem` (14px) | `1rem` (16px) |

### Implementation Pattern

```tsx
// ✅ Tailwind responsive typography
<h1 className="text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] lg:text-[3.2rem] font-black leading-tight">
    {title}
</h1>

// ✅ For inline styles (game components)
style={{
    fontSize: 'clamp(1.75rem, 5vw, 3.2rem)',
    lineHeight: 1.1
}}
```

### clamp() Fluid Typography

```css
/* Use clamp() for smooth scaling between breakpoints */
h1 { font-size: clamp(1.75rem, 4vw + 1rem, 3.2rem); }
h2 { font-size: clamp(1.375rem, 3vw + 0.5rem, 2.25rem); }
h3 { font-size: clamp(1.125rem, 2vw + 0.5rem, 1.5rem); }
body { font-size: clamp(0.9375rem, 1vw + 0.5rem, 1rem); }
```

### Text Overflow Prevention

```tsx
// ✅ Always protect against overflow on mobile
className="truncate"                           // Single line
className="line-clamp-2"                       // Multi-line
className="break-words overflow-wrap-anywhere" // Long words (e.g., email addresses)
```

---

## 5. Spacing & Layout System

### Container Padding

| Context | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Page Container | `px-4` (16px) | `px-6` (24px) | `px-8` (32px) |
| Section Padding | `py-8` (32px) | `py-12` (48px) | `py-16` (64px) |
| Card Internal Padding | `p-4` (16px) | `p-6` (24px) | `p-8` (32px) |
| Grid Gap | `gap-3` (12px) | `gap-4` (16px) | `gap-6` (24px) |
| Stack Gap (vertical) | `gap-4` (16px) | `gap-6` (24px) | `gap-8` (32px) |

### Margin Standards

| Context | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Section Margin Bottom | `mb-8` | `mb-12` | `mb-16` |
| Card Margin Bottom | `mb-4` | `mb-6` | `mb-6` |
| Component Top Offset | `mt-2` | `mt-4` | `mt-6` |
| Heading → Content Gap | `mb-3` | `mb-4` | `mb-6` |

### Content Maximization Rules

```tsx
// ✅ Full-width on mobile, constrained on desktop
className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8"

// ✅ Cards: Full width on mobile, grid on larger screens
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6"

// ❌ NEVER use fixed widths on mobile
className="w-[800px]"  // This WILL overflow

// ✅ Use max-width constraints instead
className="w-full max-w-[800px]"
```

---

## 6. Component-Specific Guidelines

### 6.1 Navigation (`Nav.tsx` / `CardNav`)

**Current Issues to Address:**
- Hamburger menu height calculation must account for all mobile viewports
- Logo + text must not overflow on narrow screens
- Menu cards must stack vertically on mobile

**Mobile Standards:**

```tsx
// Container: Full width, reduced horizontal padding
className="absolute left-1/2 -translate-x-1/2 w-[95%] md:w-[90%] max-w-[800px] z-[99] top-[0.5em] md:top-[1.2em]"

// Logo text: Scale down for small screens
className="text-xl sm:text-2xl md:text-3xl font-black tracking-tighter"

// Nav cards: Stack vertically on mobile
className="flex flex-col md:flex-row items-stretch gap-2 md:gap-3"

// Card padding: Tighter on mobile
className="p-4 md:p-6 rounded-2xl"

// Links: Larger tap targets
className="py-2 text-sm md:text-lg min-h-[44px] flex items-center"
```

### 6.2 HUD (Heads-Up Display)

**Mobile Standards:**

```tsx
// Reduce padding offset on mobile
style={{ paddingTop: '1.5rem' }}  // mobile
// md:paddingTop: '2.5rem'         // desktop

// Back button: Bring closer to edge
className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 z-20"

// Controls: Same treatment
className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2"

// Center content: Reduce horizontal padding
className="flex flex-col items-center gap-2 md:gap-4 w-full px-12 md:px-20"

// Stats bar: Scale text proportionally
// XP label: text-[9px] md:text-[10px]
// Coin amount: text-[10px] md:text-xs
// Level badge: h-7 w-7 md:h-9 md:w-9

// How to Play button: Appropriately sized
className="w-9 h-9 md:w-12 md:h-12 rounded-full"
```

### 6.3 Landing Page Sections

| Section | Mobile Adjustment |
|---------|-------------------|
| **Hero** | Stack CTA buttons vertically, reduce heading size, full-width buttons |
| **About** | Single column layout, reduce illustration size |
| **Goals** | Cards stack to `grid-cols-1`, reduce padding |
| **Features** | `grid-cols-1 sm:grid-cols-2` instead of 3-column |
| **GameplayPreview** | Full-width preview, horizontal scroll for screenshots |
| **HowToPlay** | Steps stack vertically, numbered list instead of timeline |
| **FAQ** | Full-width accordions, larger tap targets |
| **Footer** | Stack columns, center-align content |

### 6.4 Home Dashboard

```tsx
// Header: Reduce spacing
className="pt-4 md:pt-8 px-4 md:px-8"

// StreakTracker: Full width, compact on mobile
className="w-full max-w-md md:max-w-lg mx-auto p-3 md:p-5"

// DailyTrivia: Full-width card
className="w-full max-w-2xl mx-auto p-4 md:p-6"

// GameModeSection / ParallaxDemo:
// - Full-bleed on mobile (no horizontal padding)
// - Reduce card width in carousel
// - Touch-scroll friendly (momentum scrolling enabled)
className="w-full overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0"
```

### 6.5 Game Pages (All 7 Modes)

**Universal Game Mobile Rules:**

```
┌─────────────────────────────────────┐
│   HUD (compact: ~50px)              │   ← Reduced height on mobile
├─────────────────────────────────────┤
│                                     │
│          GAME AREA                  │   ← Fills remaining viewport
│     (flex-1 / min-h-0)             │
│     Font sizes reduced             │
│     Touch targets ≥ 44px           │
│                                     │
├─────────────────────────────────────┤
│   Controls / Buttons (sticky)       │   ← Fixed at bottom on mobile
└─────────────────────────────────────┘
```

**Game-Specific Adjustments:**

| Game | Mobile Adaptation |
|------|-------------------|
| **QuizBee** | Answer buttons stack vertically, full-width; timer text `text-3xl` → `text-2xl` |
| **MonetaryMastery** | Flashcard width `max-w-sm` on mobile; swipe gestures enabled |
| **WordHunt** | Grid cell size `min-w-[2rem]`; letters `text-sm`; full-viewport grid |
| **Crossword** | Cell size `min-w-[1.5rem]` with pan/zoom; keyboard stays within view |
| **SpeedRound** | Timer prominent at top; buttons large and centered; no side margins |
| **MatchingGame** | `grid-cols-2 sm:grid-cols-3 md:grid-cols-4`; card flip area ≥ 60×60px |
| **SpotDifference** | Images stack vertically (not side-by-side); pinch-to-zoom support |

### 6.6 Auth Pages (Login / Register / Avatar Setup)

```tsx
// Card: Nearly full-width on mobile
className="w-[95%] sm:w-[90%] md:w-[480px] max-w-[480px] mx-auto"

// Form inputs: Full width, comfortable height
className="w-full h-12 md:h-11 px-4 text-base rounded-xl"

// Submit button: Full width on mobile
className="w-full h-12 md:h-11 text-base font-semibold rounded-xl"

// Input labels: Visible, not floating
className="text-sm font-medium mb-1.5 block"

// Avatar Setup: Reduce avatar preview size
className="w-28 h-28 md:w-40 md:h-40"
```

### 6.7 Profile Page

```tsx
// Avatar editor: Centered, appropriately sized
className="flex flex-col items-center gap-4 md:gap-6"

// ProgressRing: Scale down
// Mobile: 100×100px (stroke-width: 6)
// Desktop: 140×140px (stroke-width: 8)

// Stats grid: 2 columns on mobile, 3 on desktop
className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"

// Achievement badges: Smaller on mobile
className="w-12 h-12 md:w-16 md:h-16"
```

### 6.8 Leaderboard Page

```tsx
// Top 3 Podium: Compact arrangement
// Mobile: Horizontal layout with smaller avatars (w-12 h-12)
// Desktop: Full podium visualization

// Rankings list: Full width, compact rows
className="flex items-center gap-3 py-2.5 md:py-3 px-3 md:px-4"

// Tab switcher: Full width, equal-sized tabs
className="flex w-full"
// Each tab: className="flex-1 py-3 text-center text-sm md:text-base"
```

### 6.9 Pricing Page

```tsx
// Plan cards: Stack vertically on mobile
className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6"

// Featured plan: Full-width callout
className="relative w-full p-5 md:p-8"

// Price text: Scale proportionally
className="text-3xl md:text-4xl font-black"

// Feature list: Compact on mobile
className="space-y-2 md:space-y-3 text-sm md:text-base"
```

### 6.10 Footer

```tsx
// Column layout: Stack on mobile
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"

// Footer padding: Reduced on mobile
className="px-4 md:px-8 py-8 md:py-12"

// Social icons: Centered on mobile
className="flex justify-center sm:justify-start gap-4"
```

---

## 7. Touch Interaction Standards

### Minimum Touch Targets

```
┌──────────────────────────────────────────────────────────┐
│  WCAG 2.2 Level AAA: Minimum touch target = 44×44px     │
│  FinQuest Standard:  Minimum touch target = 44×44px     │
│  Recommended:        48×48px for primary actions         │
└──────────────────────────────────────────────────────────┘
```

### Implementation

```tsx
// ✅ All clickable elements, even if visually smaller
className="min-w-[44px] min-h-[44px] flex items-center justify-center"

// ✅ Extend tap area with padding, not visible size
className="p-2 -m-2"  // Invisible tap area extension

// ✅ Game answer buttons: Comfortable size
className="min-h-[48px] w-full px-4 py-3 text-sm md:text-base"
```

### Spacing Between Touch Targets

```tsx
// ✅ Minimum 8px gap between adjacent interactive elements
className="gap-2"  // 8px minimum between buttons

// ❌ Never stack buttons without gap — risk of mis-taps
className="gap-0"
```

### Touch Feedback

```css
/* Provide visual/haptic feedback on touch */
.touchable {
    -webkit-tap-highlight-color: rgba(255, 215, 0, 0.15);
    touch-action: manipulation; /* Remove 300ms tap delay */
}

/* Active state for buttons */
.touchable:active {
    transform: scale(0.97);
    opacity: 0.9;
}
```

---

## 8. Performance Optimization for Mobile

### 8.1 Animation Performance

| Rule | Details |
|------|---------|
| **Use `transform` and `opacity` only** | These are GPU-composited; avoid animating `width`, `height`, `top`, `left`, `margin`, `padding` |
| **`will-change` sparingly** | Only on elements actively animating; remove after animation completes |
| **Reduce particle count** | AnimatedBackground: mobile ≤ 15 particles vs desktop 30+ |
| **Disable parallax on low-end** | Detect via `navigator.hardwareConcurrency < 4` or `matchMedia('(prefers-reduced-motion)')` |
| **Use `requestAnimationFrame`** | All custom animations must use rAF, never `setInterval`/`setTimeout` |
| **Avoid layout thrashing** | Batch DOM reads and DOM writes; never interleave them |

### 8.2 Scroll Performance

```tsx
// Lenis smooth scrolling should be DISABLED on mobile if choppy
// In SmoothScroll.tsx:
const isMobile = window.matchMedia('(max-width: 768px)').matches;
const isLowEnd = navigator.hardwareConcurrency <= 4;

if (isMobile && isLowEnd) {
    // Fall back to native scrolling — it's optimized by the browser
    return <>{children}</>;
}
```

### 8.3 Reduced Motion

```css
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
// In JS/TS:
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Use in GSAP
gsap.to(element, {
    duration: prefersReducedMotion ? 0 : 0.4,
    ...
});
```

### 8.4 Image Optimization

```tsx
// Use responsive images where possible
<img
    src="/hero-mobile.webp"
    srcSet="/hero-mobile.webp 640w, /hero-tablet.webp 1024w, /hero-desktop.webp 1920w"
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    loading="lazy"
    decoding="async"
    alt="descriptive text"
/>

// For background images
style={{
    backgroundImage: `url(${isMobile ? mobileImg : desktopImg})`
}}
```

### 8.5 GSAP Animation Guidelines for Mobile

```typescript
// ✅ GSAP mobile-safe pattern
const mm = gsap.matchMedia();

mm.add("(max-width: 767px)", () => {
    // Mobile-specific animations (simpler, fewer elements)
    gsap.to(".card", { y: 0, opacity: 1, duration: 0.3, stagger: 0.05 });
});

mm.add("(min-width: 768px)", () => {
    // Desktop animations (full complexity)
    gsap.to(".card", { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 });
});
```

### 8.6 Bundle Size Awareness

```
Mobile users often have slower connections.
Keep the initial bundle lean:

✅ Lazy-load game components (they're heavy)
✅ Use dynamic imports for non-critical libraries
✅ Tree-shake icon libraries (import specific icons only)

// Example: Lazy route loading
const QuizBee = React.lazy(() => import('./features/game-modes/components/QuizBee'));

<Route path="/quiz-bee" element={
    <ProtectedRoute>
        <Suspense fallback={<LoadingSpinner />}>
            <QuizBee />
        </Suspense>
    </ProtectedRoute>
} />
```

---

## 9. Layout Patterns Reference

### 9.1 Full-Viewport Game Layout

```tsx
// ✅ Game pages: Fill viewport exactly, no overflow
<div className="min-h-[100dvh] flex flex-col overflow-hidden">
    <HUD ... />       {/* Fixed header */}
    <main className="flex-1 min-h-0 overflow-y-auto px-3 md:px-8">
        {/* Game content */}
    </main>
    <footer className="shrink-0 p-3 md:p-4">
        {/* Action buttons */}
    </footer>
</div>
```

**Key:** Use `100dvh` (dynamic viewport height) instead of `100vh` to account for mobile browser address bars that hide/show on scroll.

### 9.2 Scrollable Page Layout

```tsx
// ✅ Content pages: Scrollable with proper structure
<div className="min-h-[100dvh]">
    <Nav ... />
    <main className="pt-16 md:pt-20 px-4 md:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
            {/* Page content */}
        </div>
    </main>
    <Footer />
</div>
```

### 9.3 Card Grid Patterns

```tsx
// Profile stats / Feature cards
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
    <Card />
</div>

// Game mode selector
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-4">
    <GameCard />
</div>

// Pricing plans
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
    <PlanCard />
</div>
```

### 9.4 Glassmorphism Cards (Consistent)

```tsx
// Mobile-optimized glassmorphism
className="w-full p-4 md:p-6 rounded-2xl md:rounded-3xl border border-white/10"
style={{
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)'  // Safari
}}

// WARNING: backdrop-filter is GPU-intensive on mobile.
// Fall back to solid bg on low-end devices:
const backdrop = isLowEnd
    ? 'rgba(26, 26, 46, 0.95)'           // Solid fallback
    : 'rgba(255, 255, 255, 0.05)';
```

---

## 10. CSS Custom Properties for Mobile

### Add to `index.css`

```css
:root {
    /* ─── Spacing Scale (mobile-first) ────────── */
    --space-page-x: 1rem;
    --space-page-y: 2rem;
    --space-card: 1rem;
    --space-section: 2rem;
    --space-gap: 0.75rem;

    /* ─── Typography Scale ────────────────────── */
    --text-h1: clamp(1.75rem, 4vw + 1rem, 3.2rem);
    --text-h2: clamp(1.375rem, 3vw + 0.5rem, 2.25rem);
    --text-h3: clamp(1.125rem, 2vw + 0.5rem, 1.5rem);
    --text-body: clamp(0.9375rem, 1vw + 0.5rem, 1rem);
    --text-small: clamp(0.75rem, 0.5vw + 0.5rem, 0.875rem);

    /* ─── Sizing Tokens ──────────────────────── */
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

---

## 11. Component Audit Checklist

### Per-Component Verification

Before a component is considered mobile-ready, it must pass ALL of the following:

| # | Check | Pass Criteria |
|---|-------|---------------|
| 1 | **No horizontal overflow** | No content extends beyond viewport edge at 320px width |
| 2 | **Touch targets** | All interactive elements ≥ 44×44px tap area |
| 3 | **Text readability** | Minimum `12px` font-size; body text ≥ `15px` |
| 4 | **Content not clipped** | No text/images cut off at any standard mobile viewport |
| 5 | **Proper stacking** | Multi-column layouts collapse to single column at `< 640px` |
| 6 | **No fixed widths** | No `width: Npx` without corresponding `max-width: 100%` |
| 7 | **Images responsive** | All images use `max-width: 100%; height: auto` or equivalent |
| 8 | **Inputs accessible** | Form inputs don't zoom on focus (font-size ≥ 16px on iOS) |
| 9 | **Modal breakout** | Modals/overlays work correctly on mobile; scroll-locked body |
| 10 | **Animation smooth** | No dropped frames on 60hz mobile device |
| 11 | **Keyboard doesn't break layout** | Virtual keyboard doesn't push content off-screen |
| 12 | **Safe areas respected** | Content doesn't sit behind notch, home indicator, or status bar |

### Page-Level Checklist

| Page | Status | Notes |
|------|--------|-------|
| Landing Page | ⬜ | Hero, sections, footer must stack cleanly |
| Login Page | ⬜ | Form full-width, no zoom on input focus |
| Register Page | ⬜ | Same as Login |
| Avatar Setup | ⬜ | Avatar preview scales, color pickers accessible |
| Home Dashboard | ⬜ | Streak tracker, trivia, game carousel all mobile-safe |
| QuizBee | ⬜ | Timer visible, answer buttons full-width stacked |
| Monetary Mastery | ⬜ | Flashcards swipeable, readable text |
| Word Hunt | ⬜ | Grid fits viewport, letters legible |
| Crossword | ⬜ | Pan/zoom enabled, cells large enough to tap |
| Speed Round | ⬜ | Fast UI responsive, no input lag |
| Matching Game | ⬜ | Cards grid adapts, flip animation smooth |
| Spot Difference | ⬜ | Images full-width stacked, tap areas precise |
| Profile | ⬜ | Stats readable, badges grid 3-column minimum |
| Leaderboard | ⬜ | Tabs scrollable, list compact |
| Educator Hub | ⬜ | Cards stack, coming-soon overlay visible |
| Library | ⬜ | Search bar full-width, filter chips scrollable |
| Pricing | ⬜ | Plan cards stack vertically |

---

## 12. Testing Protocol

### Manual Testing Workflow

```
1. Open Chrome DevTools → Toggle Mobile (Ctrl+Shift+M)
2. Test these viewports in order:
   ├── 360 × 780  (smallest common Android)
   ├── 375 × 667  (iPhone SE — critical constraint)
   ├── 390 × 844  (iPhone 14 — most common)
   ├── 430 × 932  (iPhone Pro Max — largest phone)
   └── 768 × 1024 (iPad — tablet breakpoint)
3. For EACH viewport:
   ├── Navigate through all routes
   ├── Test all interactive elements
   ├── Verify no horizontal scroll appears (body overflow-x)
   ├── Check animation smoothness (open DevTools Performance tab)
   └── Test with virtual keyboard open (inputs)
```

### Performance Budget (Mobile)

| Metric | Target | Tool |
|--------|--------|------|
| **First Contentful Paint** | < 1.5s | Lighthouse |
| **Largest Contentful Paint** | < 2.5s | Lighthouse |
| **Cumulative Layout Shift** | < 0.1 | Lighthouse |
| **Time to Interactive** | < 3.0s | Lighthouse |
| **Total Bundle Size (gzip)** | < 300KB initial | Vite build |
| **Animation Frame Rate** | ≥ 55 fps | DevTools Performance |
| **Memory Usage** | < 100MB | DevTools Memory |

### Automated Testing (Recommended)

```typescript
// Playwright viewport tests
import { test, expect } from '@playwright/test';

const MOBILE_VIEWPORTS = [
    { width: 360, height: 780, name: 'Galaxy S23' },
    { width: 375, height: 667, name: 'iPhone SE' },
    { width: 390, height: 844, name: 'iPhone 14' },
    { width: 430, height: 932, name: 'iPhone 14 Pro Max' },
];

for (const viewport of MOBILE_VIEWPORTS) {
    test(`No horizontal overflow on ${viewport.name}`, async ({ page }) => {
        await page.setViewportSize(viewport);
        await page.goto('/');

        const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
        const viewportWidth = await page.evaluate(() => window.innerWidth);
        expect(bodyWidth).toBeLessThanOrEqual(viewportWidth);
    });
}
```

---

## 13. Common Anti-Patterns to Avoid

| ❌ Anti-Pattern | ✅ Correct Approach |
|----------------|---------------------|
| `width: 800px` on containers | `width: 100%; max-width: 800px` |
| `position: fixed` bottom bars without `safe-area` padding | Add `padding-bottom: env(safe-area-inset-bottom)` |
| `font-size: 12px` on form inputs (iOS zoom) | Minimum `font-size: 16px` on inputs |
| `overflow: hidden` on `<body>` (kills scroll) | Use on modals only, restore on close |
| `100vh` height (ignores mobile browser chrome) | Use `100dvh` or `min-h-screen` with fallback |
| Heavy `box-shadow` + `backdrop-filter` stacking | Simplify to one or the other on mobile |
| `hover:` states as the only interaction feedback | Add `active:` and `focus-visible:` states too |
| `vw` units for width without max bounds | `min(90vw, 600px)` to prevent extreme sizes |
| Desktop-only testing | Always develop with mobile view open first |
| Animating `width`, `height`, `margin`, `padding` | Animate only `transform` and `opacity` |

---

## 14. Quick Reference: Mobile CSS Utilities

### Add to `index.css` for global mobile support

```css
/* ─── Mobile Utility Classes ──────────────────────── */

/* Force content to respect viewport boundaries */
.mobile-safe {
    max-width: 100vw;
    overflow-x: hidden;
}

/* Use dvh for true mobile viewport height */
.h-screen-safe {
    height: 100vh;
    height: 100dvh;
}

.min-h-screen-safe {
    min-height: 100vh;
    min-height: 100dvh;
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

/* Full-bleed section (extends past container padding) */
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

/* Hide scrollbar but keep scroll functionality */
.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

/* Horizontal scroll container (e.g., game carousel) */
.scroll-snap-x {
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
}
.scroll-snap-x > * {
    scroll-snap-align: start;
}
```

---

## 15. Implementation Priority

### Phase 1 — Critical (Must-Have)

| Task | Files Affected | Priority |
|------|---------------|----------|
| Add viewport meta + safe area CSS | `index.html`, `index.css` | 🔴 P0 |
| Add CSS custom properties for spacing | `index.css` | 🔴 P0 |
| Add mobile utility classes | `index.css` | 🔴 P0 |
| Fix `100vh` → `100dvh` everywhere | All page-level components | 🔴 P0 |
| Fix Nav overflow on small screens | `Nav.tsx` | 🔴 P0 |
| Make HUD compact on mobile | `HUD.tsx` | 🔴 P0 |
| Fix form input zoom (iOS) | Auth pages | 🔴 P0 |

### Phase 2 — High Priority

| Task | Files Affected | Priority |
|------|---------------|----------|
| Responsive typography with `clamp()` | All components | 🟠 P1 |
| Grid layouts → responsive columns | Home, Profile, Leaderboard, Pricing | 🟠 P1 |
| Touch target enforcement (44×44px) | All interactive components | 🟠 P1 |
| Game layouts fill mobile viewport | All 7 game components | 🟠 P1 |
| Landing page section responsiveness | All landing sections | 🟠 P1 |

### Phase 3 — Polish

| Task | Files Affected | Priority |
|------|---------------|----------|
| Reduced motion support | GSAP configs, CSS | 🟡 P2 |
| Low-end device fallbacks | AnimatedBackground, SmoothScroll | 🟡 P2 |
| Lazy loading game routes | `App.tsx` | 🟡 P2 |
| Image srcset optimization | Hero, game previews | 🟡 P2 |
| Playwright viewport tests | Test suite | 🟡 P2 |

### Phase 4 — Nice-to-Have

| Task | Files Affected | Priority |
|------|---------------|----------|
| PWA manifest + service worker | Root config | 🟢 P3 |
| Orientation lock for certain games | Game components | 🟢 P3 |
| Haptic feedback API integration | Touch handlers | 🟢 P3 |
| Dark/light mode for mobile | Theme system | 🟢 P3 |

---

## 16. File-by-File Quick Reference

| File | Key Mobile Changes |
|------|--------------------|
| `index.html` | Viewport meta, theme-color meta, apple-mobile-web-app-capable |
| `styles/base/index.css` | CSS custom properties, utility classes, `prefers-reduced-motion`, safe areas |
| `components/navigation/Nav.tsx` | Width `95%`, logo scale, vertical card stack, larger tap targets |
| `components/navigation/HUD.tsx` | Compact mode at `< md`, reduced padding, smaller badges |
| `components/navigation/Footer.tsx` | Single-column stack, centered alignment |
| `components/ui/ParallaxDemo.tsx` | Touch-scroll, reduced card width, momentum scrolling |
| `components/ui/SmoothScroll.tsx` | Disable Lenis on low-end mobile, native fallback |
| `features/auth/*` | Full-width forms, `16px` min input font, no zoom-on-focus |
| `features/homepage/Home.tsx` | Responsive grid, compact streak tracker, full-width sections |
| `features/landing/LandingPage.tsx` | Section stacking, responsive hero, mobile CTA |
| `features/game-modes/*.tsx` | Viewport-filling layouts, `100dvh`, touch-sized controls |
| `features/profile/Profile.tsx` | Responsive stats grid, scaled avatar, compact badges |
| `features/leaderboards/LeaderboardPage.tsx` | Compact rows, scrollable list, responsive podium |
| `features/pricing/PricingPage.tsx` | Stack plan cards vertically, full-width on mobile |
| `features/library/LibraryPage.tsx` | Full-width search, horizontal filter scroll |
| `features/educator-hub/EducatorHubPage.tsx` | Single-column cards, responsive "coming soon" overlay |

---

## 17. Glossary

| Term | Definition |
|------|-----------|
| **dvh** | Dynamic viewport height — adjusts when mobile browser chrome (address bar) shows/hides |
| **safe-area-inset** | CSS env variable for the space occupied by device notches, home indicators, etc. |
| **touch-action: manipulation** | Tells the browser to handle panning/zooming but remove the 300ms tap delay |
| **will-change** | CSS hint to the browser to GPU-accelerate an element; use sparingly |
| **Layout thrashing** | Reading then writing to the DOM in alternation, forcing repeated reflows |
| **Composited layer** | An element promoted to its own GPU layer for efficient animation |
| **CLS** | Cumulative Layout Shift — measures visual stability; lower is better |
| **LCP** | Largest Contentful Paint — time until the biggest visible element renders |

---

*Last updated: April 2026*
