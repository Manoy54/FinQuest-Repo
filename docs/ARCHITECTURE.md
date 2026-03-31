# System Architecture Overview

> FinQuest — Gamified Financial Literacy Platform

## 1. Architecture Philosophy

FinQuest follows a **component-driven, client-heavy SPA architecture** optimized for interactive gameplay. The current implementation is a purely frontend application with planned migration to a full-stack architecture using Supabase as the Backend-as-a-Service (BaaS) layer.

### Design Principles

| Principle | Implementation |
|-----------|---------------|
| **Separation of Concerns** | UI components, state management, utilities, and data are strictly separated |
| **Composability** | Game modes share reusable components (HUD, AnimatedBackground, GameComplete) |
| **Progressive Enhancement** | Core features work offline via localStorage; backend adds sync, auth, and multiplayer |
| **Feature Encapsulation** | Each game mode is self-contained within its own directory |
| **Type Safety** | Full TypeScript with strict typing across all modules |

---

## 2. High-Level Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                          │
│                                                                  │
│  ┌──────────┐  ┌────────────┐  ┌──────────┐  ┌──────────────┐  │
│  │  React   │  │   React    │  │  React   │  │   Tailwind   │  │
│  │  Router  │  │  Context   │  │   DOM    │  │    CSS v4    │  │
│  │  DOM v7  │  │ (Auth/User)│  │  v19.2   │  │   + GSAP     │  │
│  └────┬─────┘  └─────┬──────┘  └────┬─────┘  └──────────────┘  │
│       │              │              │                            │
│  ┌────┴──────────────┴──────────────┴───────────────────────┐   │
│  │                    Application Shell                      │   │
│  │  ┌─────────┐ ┌──────────┐ ┌────────────┐ ┌───────────┐  │   │
│  │  │ Landing │ │   Auth   │ │  Dashboard │ │   Games   │  │   │
│  │  │  Page   │ │  Pages   │ │   (Home)   │ │ (7 modes) │  │   │
│  │  └─────────┘ └──────────┘ └────────────┘ └───────────┘  │   │
│  │  ┌─────────┐ ┌──────────┐ ┌────────────┐ ┌───────────┐  │   │
│  │  │ Profile │ │ Leaders  │ │  Educator  │ │  Library  │  │   │
│  │  │  Page   │ │  board   │ │    Hub     │ │   Page    │  │   │
│  │  └─────────┘ └──────────┘ └────────────┘ └───────────┘  │   │
│  └──────────────────────────────────────────────────────────┘   │
│                              │                                   │
│                     ┌────────┴────────┐                          │
│                     │  localStorage   │                          │
│                     │  (Persistence)  │                          │
│                     └─────────────────┘                          │
└──────────────────────────────────────────────────────────────────┘
                               │
                    ┌──────────┴──────────┐
                    │   PLANNED BACKEND   │
                    │                     │
                    │  ┌───────────────┐  │
                    │  │   Supabase    │  │
                    │  │  (Auth, DB,   │  │
                    │  │   Storage,    │  │
                    │  │  Realtime)    │  │
                    │  └───────────────┘  │
                    │                     │
                    │  ┌───────────────┐  │
                    │  │  PostgreSQL   │  │
                    │  │  (via Supa)   │  │
                    │  └───────────────┘  │
                    └─────────────────────┘
```

---

## 3. Technology Decisions

### Why React 19 + Vite?
- **React 19**: Latest concurrent features, improved performance, server components readiness
- **Vite 7**: Near-instant HMR, optimized production builds, native ES module support
- **No SSR required**: Game-heavy SPA benefits from client-side rendering; SEO is handled at the landing page level only

### Why Tailwind CSS v4?
- **Utility-first** approach matches the rapid iteration needs of game UI development
- **v4 `@theme` tokens**: Custom design tokens without a config file
- **JIT compilation**: Zero-unused CSS in production
- **Dark-mode optimized**: The entire platform uses a dark, high-contrast aesthetic

### Why React Router DOM v7?
- **Client-side SPA routing**: All navigation is instant, no server roundtrips
- **Route guards**: `ProtectedRoute` and `AvatarSetupGuard` wrappers enforce auth flow
- **Lightweight**: No server-side dependencies

### Why React Context (not Redux/Zustand)?
- **Simplicity**: Two context providers (`AuthContext`, `UserContext`) cover all global state
- **Minimal boilerplate**: No action creators, reducers, or middleware needed
- **Sufficient for current scale**: ~12 pages, 7 games, 2 global state objects

### Why Supabase (Planned)?
- **Already in package.json**: `@supabase/supabase-js` is installed
- **Auth + DB + Storage + Realtime** in one platform
- **PostgreSQL**: Full SQL power with Row Level Security (RLS)
- **Generous free tier**: Suitable for campus/student deployment

---

## 4. Data Flow Architecture

### Current (localStorage-based)

```
User Action → React State → Context Update → localStorage.setItem()
                                                    │
Page Load → localStorage.getItem() → Context Init ─┘
```

### Planned (Supabase-backed)

```
User Action → React State → Context Update ──→ Supabase API Call
                                                      │
                                                      ▼
                                              PostgreSQL Write
                                                      │
Page Load → Supabase Query → Context Init ◄───────────┘
```

### State Domains

| Domain | Provider | Data |
|--------|----------|------|
| **Authentication** | `AuthContext` | isAuthenticated, displayName, level, rank, avatarConfig |
| **Progression** | `UserContext` | xp, coins |
| **Streaks** | `streakSystem.ts` | currentStreak, longestStreak, lastCheckIn, history |
| **Trivia** | `triviaData.ts` | dailyQuestions, progress, scores |
| **Achievements** | `achievementSystem.ts` | unlockedIds, unlockedAt timestamps |
| **Game Scores** | Per-game localStorage | highScore, tier progress |

---

## 5. Security Architecture

### Current Security Model (Client-Side)
| Aspect | Implementation |
|--------|---------------|
| **Auth** | localStorage-based (no real authentication) |
| **Route Protection** | `ProtectedRoute` component checks `isAuthenticated` context |
| **Avatar Guard** | `AvatarSetupGuard` ensures avatar setup before game access |
| **Data Integrity** | None (client-controlled localStorage) |

### Planned Security Model (Supabase)
| Aspect | Planned Implementation |
|--------|----------------------|
| **Auth** | Supabase Auth (email/password + social login) |
| **Route Protection** | Context checks Supabase session token |
| **API Security** | Row Level Security (RLS) policies on all tables |
| **Data Integrity** | Server-side validation, triggers for XP/coin transactions |
| **CORS** | Supabase project-level domain whitelist |

---

## 6. Performance Considerations

| Optimization | Status | Details |
|--------------|--------|---------|
| **Code Splitting** | ✅ Vite auto | Route-level lazy loading via dynamic imports |
| **Tree Shaking** | ✅ Vite auto | Dead code elimination in production |
| **Asset Optimization** | ✅ Vite auto | Image compression, CSS minification |
| **Bundle Analysis** | ⬜ Planned | `rollup-plugin-visualizer` integration |
| **Caching** | ✅ localStorage | Game scores, streak data, achievements cached locally |
| **Animation Performance** | ✅ GSAP + CSS | GPU-accelerated transforms over layout shifts |
| **Scroll Performance** | ✅ Lenis | Smooth scroll with requestAnimationFrame |

---

## 7. Cross-Cutting Concerns

### Error Handling Strategy
- **Try-catch** blocks around all localStorage operations (corrupt data recovery)
- **Graceful fallbacks** for missing data (default values in all load functions)
- **No global error boundary** yet — planned for production

### Logging Strategy
- **Current**: Console-only (development)
- **Planned**: Structured logging to Supabase `logs` table for analytics

### Testing Strategy
- **Current**: Manual testing
- **Planned**: Vitest for unit tests, Playwright for E2E, React Testing Library for components

---

## 8. Future Architecture Considerations

| Initiative | Impact | Priority |
|-----------|--------|----------|
| **Supabase Integration** | Replace localStorage with real persistence | High |
| **Real-time Leaderboards** | Supabase Realtime subscriptions | High |
| **Multiplayer Quiz Bee** | WebSocket-based live competitions | Medium |
| **PWA Support** | Offline-first with Service Workers | Medium |
| **Analytics Dashboard** | Track learning outcomes and engagement metrics | Medium |
| **Mobile App** | React Native or Capacitor wrapper | Low |

---

*Last updated: March 2026*
