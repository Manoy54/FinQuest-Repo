# Backend Architecture

> FinQuest — Planned Backend Architecture (Supabase)

## 1. Overview

FinQuest currently operates as a client-only SPA with `localStorage` persistence. The planned backend migration uses **Supabase** (already installed as a dependency) to provide authentication, database, real-time subscriptions, and file storage.

This document outlines the target backend architecture for production deployment.

---

## 2. Backend Strategy: Supabase as BaaS

### Why Supabase?

| Capability | Usage in FinQuest |
|-----------|-------------------|
| **Authentication** | Email/password login, social auth (Google, GitHub) |
| **PostgreSQL Database** | User profiles, game scores, achievements, leaderboards |
| **Row Level Security** | Per-user data isolation, admin-only operations |
| **Realtime** | Live leaderboard updates, multiplayer quiz bee |
| **Storage** | Library module uploads (PDFs, images, videos) |
| **Edge Functions** | Server-side game logic validation, scheduled jobs |

---

## 3. Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT (React SPA)                    │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────────┐  │
│  │AuthContext│  │UserContext│  │  Game Components     │  │
│  │  ↓       │  │  ↓       │  │  ↓                   │  │
│  │supabase  │  │supabase  │  │supabase              │  │
│  │.auth.*   │  │.from()   │  │.from().insert/update │  │
│  └────┬─────┘  └────┬─────┘  └──────────┬───────────┘  │
│       └──────────────┴──────────────────┘               │
└──────────────────────────┬──────────────────────────────┘
                           │ HTTPS
                           ▼
┌──────────────────────────────────────────────────────────┐
│                    SUPABASE PLATFORM                      │
│                                                          │
│  ┌─────────────────────┐  ┌───────────────────────────┐  │
│  │    Auth Service      │  │     Realtime Engine       │  │
│  │  • Email/Password    │  │  • Leaderboard changes    │  │
│  │  • Social Login      │  │  • Multiplayer sync       │  │
│  │  • Session Tokens    │  │  • Streak notifications   │  │
│  │  • Password Reset    │  │                           │  │
│  └─────────────────────┘  └───────────────────────────┘  │
│                                                          │
│  ┌─────────────────────┐  ┌───────────────────────────┐  │
│  │  PostgreSQL          │  │     Storage (S3)          │  │
│  │  • Users             │  │  • Library modules        │  │
│  │  • Profiles          │  │  • Avatar images          │  │
│  │  • Game Sessions     │  │  • Educator uploads       │  │
│  │  • Achievements      │  │                           │  │
│  │  • Leaderboards      │  │                           │  │
│  │  • Streaks           │  │                           │  │
│  │  • Subscriptions     │  │                           │  │
│  └─────────────────────┘  └───────────────────────────┘  │
│                                                          │
│  ┌─────────────────────────────────────────────────────┐  │
│  │           Edge Functions (Deno)                      │  │
│  │  • Score validation (anti-cheat)                     │  │
│  │  • Streak reset cron job                             │  │
│  │  • Leaderboard weekly reward distribution            │  │
│  │  • Subscription webhook handler                      │  │
│  └─────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

---

## 4. Authentication Flow

### Registration

```
Client                          Supabase Auth
  │                                  │
  │  POST /auth/v1/signup            │
  │  { email, password, metadata }   │
  │────────────────────────────────► │
  │                                  │  Create auth.users row
  │                                  │  Trigger: create profiles row
  │  ◄────────────────────────────── │
  │  { user, session }               │
  │                                  │
  │  Redirect to /avatar-setup       │
```

### Login

```
Client                          Supabase Auth
  │                                  │
  │  POST /auth/v1/token             │
  │  { email, password }             │
  │────────────────────────────────► │
  │                                  │  Validate credentials
  │  ◄────────────────────────────── │  Return JWT + refresh token
  │  { user, session }               │
  │                                  │
  │  Store session in AuthContext     │
  │  Redirect to /home               │
```

### Session Management

```typescript
// Planned AuthContext integration
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Listen for auth state changes
supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN') setAuth(session.user);
    if (event === 'SIGNED_OUT') clearAuth();
    if (event === 'TOKEN_REFRESHED') updateSession(session);
});
```

---

## 5. Service Layer Design

### Service Modules (Planned)

```
src/services/
├── supabaseClient.ts        # Supabase client singleton
├── authService.ts           # Authentication operations
├── profileService.ts        # User profile CRUD
├── gameService.ts           # Game session recording & scoring
├── achievementService.ts    # Achievement unlock & validation
├── streakService.ts         # Streak management
├── leaderboardService.ts    # Ranking queries
├── libraryService.ts        # Content management
└── subscriptionService.ts   # Plan management
```

### Example Service Pattern

```typescript
// services/gameService.ts
import { supabase } from './supabaseClient';

export const gameService = {
    async recordSession(gameMode: string, score: number, xpEarned: number, coinsEarned: number) {
        const { data, error } = await supabase
            .from('game_sessions')
            .insert({
                user_id: (await supabase.auth.getUser()).data.user?.id,
                game_mode: gameMode,
                score,
                xp_earned: xpEarned,
                coins_earned: coinsEarned,
                completed_at: new Date().toISOString(),
            });

        if (error) throw error;
        return data;
    },

    async getHighScore(gameMode: string) {
        const { data } = await supabase
            .from('game_sessions')
            .select('score')
            .eq('game_mode', gameMode)
            .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
            .order('score', { ascending: false })
            .limit(1)
            .single();

        return data?.score ?? 0;
    },
};
```

---

## 6. Edge Functions

### Planned Edge Functions

| Function | Trigger | Purpose |
|----------|---------|---------|
| `validate-score` | HTTP POST | Anti-cheat: Validate game scores server-side |
| `reset-streaks` | Cron (daily 00:00 UTC+8) | Break streaks where lastCheckIn < yesterday |
| `distribute-rewards` | Cron (weekly, Sunday) | Award XP/coins to top 3 leaderboard positions |
| `process-subscription` | Webhook (payment processor) | Activate/deactivate premium features |
| `sync-leaderboard` | Cron (hourly) | Aggregate user XP into leaderboard rankings |

### Example Edge Function

```typescript
// supabase/functions/validate-score/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req) => {
    const { gameMode, score, duration, questionsAnswered } = await req.json();

    // Validation rules
    const MAX_SCORE_PER_SECOND: Record<string, number> = {
        'speed-round': 5,     // Max 5 correct answers per second
        'quiz-bee': 2,        // Max 2 correct answers per second
        'matching-game': 3,   // Max 3 matches per second
    };

    const maxPossible = (MAX_SCORE_PER_SECOND[gameMode] ?? 1) * duration;
    if (questionsAnswered > maxPossible) {
        return new Response(JSON.stringify({ valid: false, reason: 'Suspicious score rate' }), { status: 400 });
    }

    return new Response(JSON.stringify({ valid: true }), { status: 200 });
});
```

---

## 7. Real-time Features

### Leaderboard Subscriptions

```typescript
// Real-time leaderboard updates
const subscription = supabase
    .channel('leaderboard-changes')
    .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'leaderboard_xp',
    }, (payload) => {
        updateLeaderboardUI(payload.new);
    })
    .subscribe();
```

### Planned Real-time Use Cases
- **Live Leaderboard**: Rankings update instantly when any player finishes a game
- **Quiz Bee Multiplayer**: Synchronized question delivery and answer tracking
- **Streak Notifications**: Alert when a friend maintains a streak
- **Educator Dashboard**: Real-time student activity monitoring

---

## 8. Migration Plan (localStorage → Supabase)

### Phase 1: Auth Migration
1. Replace `AuthContext` localStorage with Supabase Auth
2. Implement email/password signup + login
3. Migrate existing profile data to Supabase `profiles` table
4. Update route guards to check Supabase session

### Phase 2: Data Migration
1. Create database tables (see [DATABASE.md](./DATABASE.md))
2. Replace `UserContext` localStorage with Supabase queries
3. Migrate streak, trivia, and achievement systems
4. Implement data sync on login (merge localStorage → server)

### Phase 3: Game Integration
1. Record game sessions to `game_sessions` table
2. Implement server-side score validation
3. Build real-time leaderboard aggregation
4. Add anti-cheat edge functions

### Phase 4: Premium Features
1. Integrate payment processor (PayMongo for PH)
2. Implement subscription management
3. Gate premium content with RLS policies
4. Enable library file uploads via Supabase Storage

---

## 9. Environment Variables

```env
# .env.local (client-side, prefixed with VITE_)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Supabase Dashboard (server-side, never exposed to client)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_JWT_SECRET=your-jwt-secret
```

---

## 10. Monitoring & Observability

| Tool | Purpose | Priority |
|------|---------|----------|
| **Supabase Dashboard** | Database queries, auth events, storage usage | Ready |
| **Vercel Analytics** | Page views, Web Vitals, error tracking | High |
| **Sentry** | Frontend error tracking and alerting | Medium |
| **Custom Logging** | Game session analytics, engagement metrics | Medium |

---

*Last updated: March 2026*
