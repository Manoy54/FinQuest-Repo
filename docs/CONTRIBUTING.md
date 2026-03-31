# Contributing Guide

> FinQuest — Development Workflow & Code Standards

## 1. Getting Started

### Prerequisites
- **Node.js** ≥ 18.0
- **npm** ≥ 9.0
- **Git** ≥ 2.40
- **VS Code** (recommended) with extensions:
  - ESLint
  - Tailwind CSS IntelliSense
  - TypeScript Importer
  - Prettier (optional)

### Setup

```bash
# Clone the repository
git clone https://github.com/Manoy54/FinQuest-Repo.git
cd FinQuest-Repo/my-app

# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
# http://localhost:5173
```

---

## 2. Branch Strategy

### Git Flow (Simplified)

```
main ──────────────────────────────────────────► (production)
  │
  ├── develop ─────────────────────────────────► (integration)
  │     │
  │     ├── feature/speed-round-game ──────────► (merged into develop)
  │     ├── feature/educator-hub ──────────────► (merged into develop)
  │     └── fix/leaderboard-sorting ───────────► (merged into develop)
  │
  └── hotfix/critical-auth-bug ────────────────► (merged into main + develop)
```

### Branch Naming Convention

| Type | Pattern | Example |
|------|---------|---------|
| **Feature** | `feature/<description>` | `feature/matching-game` |
| **Bug Fix** | `fix/<description>` | `fix/streak-reset-timing` |
| **Hotfix** | `hotfix/<description>` | `hotfix/auth-crash` |
| **Documentation** | `docs/<description>` | `docs/api-specification` |
| **Refactor** | `refactor/<description>` | `refactor/context-to-supabase` |

---

## 3. Commit Message Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <short description>

[optional body]

[optional footer]
```

### Types

| Type | Usage |
|------|-------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Code formatting (no logic change) |
| `refactor` | Code restructuring (no behavior change) |
| `perf` | Performance improvement |
| `test` | Adding/updating tests |
| `chore` | Build configs, dependencies |

### Examples

```
feat(games): add Speed Round quiz game mode

fix(streak): reset streak when user misses a day

docs(api): add game session endpoint specification

refactor(profile): extract ProgressRing into shared component

chore(deps): update react-router-dom to v7.13
```

---

## 4. Code Standards

### TypeScript

- **Strict mode**: All code must be fully typed
- **No `any`**: Use `unknown` or proper interfaces instead
- **Interfaces over types**: Prefer `interface` for object shapes
- **Explicit return types**: Required for exported functions

```typescript
// ✅ Good
interface GameProps {
    score: number;
    onComplete: (result: GameResult) => void;
}

export function GameCard({ score, onComplete }: GameProps): JSX.Element {
    // ...
}

// ❌ Bad
export function GameCard(props: any) {
    // ...
}
```

### React Components

- **Functional components only**: No class components
- **Named exports**: `export function Component()` (not default exports for pages)
- **Custom hooks**: Prefix with `use` (e.g., `useGameSounds`)
- **Event handlers**: Prefix with `handle` (e.g., `handleAnswer`)
- **State updater refs**: Use `useRef` for values needed in callbacks

```typescript
// ✅ Good: Component pattern
export function SpeedRound() {
    const [phase, setPhase] = useState<GamePhase>('START');
    const hasAwardedRef = useRef(false);

    const handleAnswer = (choiceIndex: number) => {
        // ...
    };

    return <div>...</div>;
}
```

### File Organization

| Type | Location | Naming |
|------|----------|--------|
| **Pages** | `src/pages/<feature>/` | `PascalCase.tsx` |
| **Game Components** | `src/pages/games/<Game>Components/` | `PascalCase.tsx` |
| **Shared Components** | `src/app/components/` | `PascalCase.tsx` |
| **Context Providers** | `src/context/` | `PascalCase.tsx` |
| **Utilities** | `src/utils/` | `camelCase.ts` |
| **Styles** | `src/styles/` | `kebab-case.css` |
| **Barrel Exports** | `*/index.ts` | Always `index.ts` |

### Import Order

```typescript
// 1. React core
import { useState, useEffect, useRef } from 'react';

// 2. Third-party libraries
import { Link } from 'react-router-dom';
import { FaTrophy } from 'react-icons/fa';

// 3. Internal shared components
import { HUD } from '../../app/components/HUD';
import { AnimatedBackground } from '../games/MoneytaryMasteryComponents';

// 4. Internal context/hooks
import { useUserContext } from '../../context/UserContext';
import { useAuth } from '../../context/AuthContext';

// 5. Internal utilities
import { loadStreak } from '../../utils/streakSystem';

// 6. Local components/data
import { getShuffledQuestions } from './SpeedRoundComponents';
```

---

## 5. Styling Standards

### Tailwind CSS

- **Utility-first**: Always use Tailwind utilities before custom CSS
- **Dark theme**: All backgrounds use dark gradients and `white/` opacity values
- **Glassmorphism**: Cards use `bg-white/5 backdrop-blur-xl border border-white/10`
- **Rounded corners**: Standard is `rounded-3xl` for cards, `rounded-xl` for buttons
- **No arbitrary values**: If a value is used more than twice, add it to the theme

### Color System

| Purpose | Tailwind Class | Used For |
|---------|---------------|----------|
| Background | `from-[#1a1a2e] to-[#0f3460]` | Page backgrounds |
| Card | `bg-white/5` | Content panels |
| Border | `border-white/10` | Card borders |
| Primary Text | `text-white` | Headings |
| Secondary Text | `text-white/60` | Body text |
| Muted Text | `text-white/40` | Captions |
| XP / Gold | `text-amber-400` | XP values |
| Coins | `text-yellow-400` | Coin values |
| Success | `text-emerald-400` | Correct answers |
| Error | `text-red-400` | Wrong answers |

### Animation Standards

- **Entrances**: Use `animate-fade-in` or `animate-fade-in-up`
- **Interactions**: Use CSS `transition-all duration-200`
- **Hover**: Use `hover:scale-[1.02]` or `hover:bg-white/10`
- **Active**: Use `active:scale-95`
- **Complex**: Use GSAP for timeline-based or physics animations
- **Performance**: Always animate `transform` and `opacity`, never `width`/`height`

---

## 6. Game Development Pattern

When adding a new game mode, follow this template:

### File Structure

```
src/pages/games/
├── NewGame.tsx                    # Main game component
└── NewGameComponents/
    └── index.tsx                  # Data, types, helper functions
```

### Required Integrations

1. **Import shared components**: `AnimatedBackground`, `GameComplete`, `HUD`
2. **Use `UserContext`**: Call `addXp()` and `addCoins()` on game end
3. **Award tracking**: Use `hasAwardedRef` to prevent double-awarding
4. **START screen**: Match the existing gold-gradient title + "Start Game" button pattern
5. **Results screen**: Use the shared `<GameComplete>` component

### Wiring Checklist

- [ ] Create game component in `src/pages/games/`
- [ ] Create data/components directory in `src/pages/games/<Game>Components/`
- [ ] Export from `src/pages/games/index.ts`
- [ ] Add route in `src/app/App.tsx` (wrapped in `ProtectedRoute`)
- [ ] Add to `gameModes` array in `src/app/components/ParallaxDemo.tsx`
- [ ] Add to nav links in `src/app/components/Header.tsx`
- [ ] Add to `GAME_MODES` array in `src/pages/profile/Profile.tsx`

---

## 7. Pull Request Process

### Before Opening a PR

```bash
# 1. Ensure TypeScript compiles
npx tsc --noEmit

# 2. Run linter
npm run lint

# 3. Build successfully
npm run build

# 4. Test manually
npm run dev
# Navigate to all affected pages
```

### PR Template

```markdown
## Description
<!-- What does this PR do? -->

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Documentation
- [ ] Refactor

## Changes Made
<!-- List specific changes -->

## Screenshots
<!-- If UI changes, include before/after screenshots -->

## Checklist
- [ ] TypeScript compiles without errors
- [ ] ESLint passes
- [ ] Production build succeeds
- [ ] Manually tested all affected pages
- [ ] Updated documentation (if applicable)
- [ ] Added new routes to App.tsx (if new pages)
- [ ] Added nav links (if new pages)
```

### Review Criteria

| Criterion | Requirement |
|-----------|-------------|
| **Type Safety** | No `any` types, all props typed |
| **Consistency** | Follows existing patterns and naming |
| **No Regressions** | Existing features still work |
| **Mobile Responsive** | UI works on 320px+ screens |
| **Dark Theme** | Matches existing dark aesthetic |
| **Performance** | No unnecessary re-renders, large bundles |

---

## 8. Testing Strategy (Planned)

### Unit Tests (Vitest)

```bash
# Install
npm install -D vitest @testing-library/react @testing-library/jest-dom

# Run
npx vitest
```

**Priority files to test:**
- `utils/levelSystem.ts` — rank calculation logic
- `utils/streakSystem.ts` — streak check-in logic
- `utils/achievementSystem.ts` — badge unlock logic
- `utils/triviaData.ts` — daily question generation

### E2E Tests (Playwright)

```bash
# Install
npm install -D @playwright/test

# Run
npx playwright test
```

**Priority flows to test:**
- Registration → Avatar Setup → Home
- Play a game → Earn XP/Coins → Verify on Profile
- Daily check-in → Streak updates
- Trivia → Answer all → Score recorded

---

## 9. Useful Commands

```bash
# Development
npm run dev              # Start dev server (HMR)
npm run build            # Production build
npm run preview          # Preview production build
npm run lint             # ESLint check

# Type checking
npx tsc --noEmit         # Full type check
npx tsc --noEmit --watch # Watch mode

# Analysis
npx vite-bundle-visualizer  # Bundle size analysis
```

---

*Last updated: March 2026*
