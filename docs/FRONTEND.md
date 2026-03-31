# Frontend Architecture

> FinQuest — Client-Side Application Architecture

## 1. Overview

FinQuest is a single-page application (SPA) built with **React 19**, **TypeScript 5.9**, and **Vite 7**. The frontend is the core of the platform — all game logic, state management, animations, and user interactions run entirely in the browser.

---

## 2. Application Initialization

```
main.tsx
  └── BrowserRouter
        └── AuthProvider
              └── UserProvider
                    └── App (Routes)
```

### Entry Point (`main.tsx`)

```typescript
ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <AuthProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </AuthProvider>
  </BrowserRouter>
);
```

**Key decisions:**
- Context providers wrap the entire app at the root level
- `BrowserRouter` enables client-side history-based routing
- No `StrictMode` wrapper (avoids double-render issues with GSAP animations)

---

## 3. Routing Architecture

### Route Map

| Path | Component | Guard | Description |
|------|-----------|-------|-------------|
| `/` | `LandingPage` | None | Public marketing page |
| `/login` | `LoginPage` | None | User login |
| `/register` | `RegisterPage` | None | User registration |
| `/avatar-setup` | `AvatarSetupPage` | `AvatarSetupGuard` | First-time avatar creation |
| `/home` | `Home` | `ProtectedRoute` | Main dashboard |
| `/quiz-bee` | `QuizBee` | `ProtectedRoute` | Capital Cup game |
| `/monetary-mastery` | `MonetaryMastery` | `ProtectedRoute` | Flashcard game |
| `/word-hunt` | `WordHunt` | `ProtectedRoute` | Word search game |
| `/crossword` | `Crossword` | `ProtectedRoute` | Crossword game |
| `/speed-round` | `SpeedRound` | `ProtectedRoute` | Rapid-fire quiz game |
| `/matching-game` | `MatchingGame` | `ProtectedRoute` | Term-definition matching |
| `/spot-difference` | `SpotDifference` | `ProtectedRoute` | Document comparison game |
| `/profile` | `Profile` | `ProtectedRoute` | User profile & dashboard |
| `/leaderboards` | `LeaderboardPage` | `ProtectedRoute` | Rankings |
| `/educator-hub` | `EducatorHubPage` | `ProtectedRoute` | Educator tools |
| `/library` | `LibraryPage` | `ProtectedRoute` | Resource library |
| `/pricing` | `PricingPage` | None | Subscription plans |

### Route Guards

```
ProtectedRoute
├── Checks: isAuthenticated === true
├── Checks: hasCompletedAvatarSetup === true
├── Redirect: /login (if not authenticated)
└── Redirect: /avatar-setup (if avatar not done)

AvatarSetupGuard
├── Checks: isAuthenticated === true
├── Checks: hasCompletedAvatarSetup === false
├── Redirect: /login (if not authenticated)
└── Redirect: /home (if avatar already done)
```

---

## 4. State Management

### Context Architecture

```
AuthContext (Authentication + Profile)
├── isAuthenticated: boolean
├── hasCompletedAvatarSetup: boolean
├── displayName: string
├── level: number
├── rank: string (auto-computed from level)
├── avatarConfig: ReactNiceAvatarConfig
├── login(email, password): void
├── register(username, email, password): void
├── logout(): void
├── updateProfile(updates): void
└── completeAvatarSetup(config, name): void

UserContext (Progression)
├── xp: number
├── coins: number
├── addXp(amount): void
└── addCoins(amount): void
```

### Persistence Strategy

All state is persisted to `localStorage` with the following keys:

| Key | Provider | Data Type |
|-----|----------|-----------|
| `finquest_auth` | AuthContext | `{ isAuthenticated, displayName, level, rank, avatarConfig, ... }` |
| `finquest_user` | UserContext | `{ xp, coins }` |
| `finquest_streak_data` | streakSystem | `{ currentStreak, longestStreak, lastCheckIn, checkInHistory }` |
| `finquest_trivia_progress` | triviaData | `{ date, currentIndex, completed, score }` |
| `finquest_achievements` | achievementSystem | `{ unlockedIds, unlockedAt }` |
| `quizBeeHighScore` | QuizBee | `number` |
| `monetaryMasteryHighScore` | MonetaryMastery | `number` |
| `wordHuntHighScore` | WordHunt | `number` |
| `crosswordHighScore` | Crossword | `number` |

---

## 5. Component Architecture

### Component Hierarchy

```
App
├── LandingPage
│   ├── Hero
│   ├── About
│   ├── Goals
│   ├── Features
│   ├── GameplayPreview
│   ├── HowToPlay
│   ├── FAQ
│   └── Footer
│
├── Home (Dashboard)
│   ├── Header → CardNav
│   ├── AboutSection
│   ├── StreakTracker
│   ├── DailyTrivia
│   └── GameModeSection → ParallaxDemo
│
├── Game Pages (shared pattern)
│   ├── AnimatedBackground
│   ├── HUD (Heads-Up Display)
│   ├── [Game-specific components]
│   └── GameComplete
│
├── Profile
│   ├── Avatar Editor
│   ├── Performance Dashboard (ProgressRing × 3)
│   ├── Game Mode Progress
│   ├── Recent Activity
│   └── Achievement Badges (filtered grid)
│
├── LeaderboardPage
│   ├── Tab Switcher (XP / Coins)
│   ├── Top 3 Podium (with rewards)
│   ├── Full Ranking List
│   └── Weekly Rewards Info
│
├── EducatorHubPage (static)
│   └── Feature Cards (Coming Soon)
│
├── LibraryPage (static)
│   ├── Search Bar
│   ├── Content Type Filters
│   └── Resource Cards (with premium locks)
│
└── PricingPage
    ├── Billing Toggle (Monthly/Annual)
    └── Plan Cards (4 tiers)
```

### Shared Components

| Component | Location | Usage |
|-----------|----------|-------|
| `HUD` | `app/components/HUD.tsx` | All game modes — displays title, XP bar, coins, custom stats |
| `AnimatedBackground` | `MoneytaryMasteryComponents/` | All pages — floating particle background |
| `GameComplete` | `MoneytaryMasteryComponents/` | All games — results screen with XP/coin summary |
| `GameRatingModal` | `MoneytaryMasteryComponents/` | Post-game rating dialog |
| `CardNav` | `app/components/Nav.tsx` | Header navigation with GSAP animations |
| `GameButton` | `app/components/GameButton.tsx` | "Play Now" link button in parallax carousel |
| `ParallaxDemo` | `app/components/ParallaxDemo.tsx` | Game mode carousel with horizontal scrolling |
| `SmoothScroll` | `app/components/SmoothScroll.tsx` | Lenis-powered smooth scrolling wrapper |

---

## 6. Game Mode Architecture

Each game follows a consistent structural pattern:

```
pages/games/
├── [GameName].tsx              # Main game component
└── [GameName]Components/
    ├── index.tsx               # Data, types, and helper exports
    ├── [SubComponent].tsx      # Game-specific UI components
    └── types.ts                # TypeScript interfaces (optional)
```

### Common Game Lifecycle

```
START → [COUNTDOWN] → PLAYING → [TIER_COMPLETE] → GAME_OVER/VICTORY → RESULTS
```

### Game State Pattern

```typescript
// Standard game state management
const [phase, setPhase] = useState<GamePhase>('START');
const [score, setScore] = useState(0);
const [xp, setXp] = useState(0);
const [coins, setCoins] = useState(0);
const hasAwardedRef = useRef(false);

// Sync rewards to global context on game end
useEffect(() => {
    if (phase === 'RESULTS' && !hasAwardedRef.current) {
        addXp(xp);
        addCoins(coins);
        hasAwardedRef.current = true;
    }
}, [phase]);
```

---

## 7. Styling Architecture

### Design System

| Token | Value | Usage |
|-------|-------|-------|
| **Primary Font** | Nunito (sans-serif) | Body text, UI elements |
| **Heading Font** | Literata (serif) | Landing page headings |
| **Background** | `#1a1a2e` → `#0f3460` gradient | All dark-themed pages |
| **Accent Gold** | `#ffd700` → `#ff6b35` gradient | Titles, XP indicators |
| **Card Background** | `rgba(255,255,255,0.05)` | Glassmorphism panels |
| **Border** | `rgba(255,255,255,0.10)` | Subtle card borders |
| **Border Radius** | `rounded-3xl` (1.5rem) | Card corners |

### Animation Library

| Library | Use Case |
|---------|----------|
| **GSAP** | Navigation menu animations, complex timelines |
| **Motion (Framer)** | Page transitions, micro-interactions |
| **React Spring** | Parallax scrolling, physics-based animations |
| **CSS Keyframes** | Pulse, fade-in, bounce-in, shake effects |
| **Lenis** | Smooth page scrolling |

### Custom Animations (defined in `index.css`)

| Animation | Class | Duration |
|-----------|-------|----------|
| Slow Pulse | `.animate-pulse-slow` | 3s infinite |
| Fade In Up | `.animate-fade-in-up` | 0.6s ease-out |
| Fade In | `.animate-fade-in` | 0.4s ease-out |
| Bounce In | `.animate-bounce-in` | 0.6s cubic-bezier |

---

## 8. Error Boundaries & Recovery

### Current Strategy

```typescript
// All localStorage operations wrapped in try-catch
export function loadStreak(): StreakData {
    try {
        const raw = localStorage.getItem(STREAK_STORAGE_KEY);
        if (raw) return JSON.parse(raw);
    } catch { /* ignore corrupt data */ }
    return DEFAULT_STREAK_DATA; // Always return safe defaults
}
```

### Planned Improvements

| Enhancement | Priority |
|-------------|----------|
| React Error Boundary component | High |
| Toast notification system | High |
| Network error handling (for Supabase) | High |
| Optimistic UI updates with rollback | Medium |

---

## 9. Accessibility

### Current Implementation
- Semantic HTML5 elements (`<header>`, `<section>`, `<nav>`, `<main>`)
- `aria-label` attributes on navigation links
- Keyboard-navigable buttons and interactive elements
- High contrast text on dark backgrounds
- Focus-visible outlines on interactive elements

### Planned Improvements
- Screen reader announcements for game events
- Reduced motion preferences (`prefers-reduced-motion`)
- ARIA live regions for score updates
- Full keyboard navigation for game modes

---

## 10. Browser Compatibility

| Browser | Minimum Version | Notes |
|---------|----------------|-------|
| Chrome | 90+ | Primary target |
| Firefox | 90+ | Supported |
| Safari | 15+ | WebKit-specific scrollbar styles |
| Edge | 90+ | Chromium-based |
| Mobile Safari | 15+ | Touch optimized |
| Chrome Android | 90+ | Touch optimized |

---

*Last updated: March 2026*
