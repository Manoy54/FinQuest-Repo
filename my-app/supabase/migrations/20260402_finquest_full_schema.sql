-- ============================================================================
-- FINQUEST — COMPLETE SUPABASE DATABASE SCHEMA
-- ============================================================================
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- This creates all tables needed to replace localStorage with persistent,
-- server-side storage.
-- ============================================================================


-- ════════════════════════════════════════════════════════════════════════════
-- 1. PROFILES (extends Supabase Auth users)
-- ════════════════════════════════════════════════════════════════════════════
-- Stores user profile data: display name, level, rank, XP, coins, avatar.
-- Links to Supabase Auth via auth.users(id).

CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    display_name TEXT,
    level INTEGER DEFAULT 1,
    rank TEXT DEFAULT 'Apprentice',
    xp INTEGER DEFAULT 0,
    coins INTEGER DEFAULT 0,
    avatar_config JSONB DEFAULT NULL,
    has_completed_avatar_setup BOOLEAN DEFAULT FALSE,
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- ════════════════════════════════════════════════════════════════════════════
-- 2. GAME SCORES (high scores for all 7 game modes)
-- ════════════════════════════════════════════════════════════════════════════
-- Each row = one game session result. The highest score per user/game is
-- the high score. Keeps full history for analytics.

CREATE TABLE IF NOT EXISTS public.game_scores (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    game_mode TEXT NOT NULL CHECK (game_mode IN (
        'capital_cup',          -- Quiz Bee
        'monetary_mastery',     -- Monetary Mastery
        'data_diver',           -- Word Hunt
        'corporate_climb',      -- Crossword
        'speed_round',          -- Speed Round
        'match_up',             -- Matching Game
        'spot_the_difference'   -- Spot the Difference
    )),
    score INTEGER NOT NULL DEFAULT 0,
    max_possible_score INTEGER,              -- for calculating percentage
    time_spent_seconds INTEGER,              -- for speed-based achievements
    difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
    xp_earned INTEGER DEFAULT 0,
    coins_earned INTEGER DEFAULT 0,
    played_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_game_scores_user ON public.game_scores(user_id);
CREATE INDEX idx_game_scores_mode ON public.game_scores(game_mode);
CREATE INDEX idx_game_scores_user_mode ON public.game_scores(user_id, game_mode);


-- ════════════════════════════════════════════════════════════════════════════
-- 3. ACHIEVEMENTS (unlocked badges per user)
-- ════════════════════════════════════════════════════════════════════════════
-- Achievement definitions are in the frontend code (achievementSystem.ts).
-- This table only tracks which user has unlocked which achievement and when.

CREATE TABLE IF NOT EXISTS public.user_achievements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    achievement_id TEXT NOT NULL,             -- matches the 'id' field from ACHIEVEMENTS[]
    unlocked_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, achievement_id)
);

CREATE INDEX idx_achievements_user ON public.user_achievements(user_id);


-- ════════════════════════════════════════════════════════════════════════════
-- 4. STREAKS (daily check-in tracking)
-- ════════════════════════════════════════════════════════════════════════════
-- Stores the running streak state per user.

CREATE TABLE IF NOT EXISTS public.user_streaks (
    user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    current_streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    last_check_in DATE,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Individual check-in history (one row per day the user checked in)
CREATE TABLE IF NOT EXISTS public.streak_check_ins (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    check_in_date DATE NOT NULL DEFAULT CURRENT_DATE,
    xp_earned INTEGER DEFAULT 0,
    coins_earned INTEGER DEFAULT 0,
    is_milestone BOOLEAN DEFAULT FALSE,
    milestone_label TEXT,
    UNIQUE(user_id, check_in_date)
);

CREATE INDEX idx_checkins_user ON public.streak_check_ins(user_id);
CREATE INDEX idx_checkins_date ON public.streak_check_ins(check_in_date);


-- ════════════════════════════════════════════════════════════════════════════
-- 5. DAILY TRIVIA (already exists from your migration, included for completeness)
-- ════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.daily_trivia (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    date_str TEXT NOT NULL,
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    source TEXT NOT NULL,
    link TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(date_str, title)
);

-- Tracks which trivia cards a user has read on a given day
CREATE TABLE IF NOT EXISTS public.user_trivia_progress (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    trivia_id UUID NOT NULL REFERENCES public.daily_trivia(id) ON DELETE CASCADE,
    read_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, trivia_id)
);

CREATE INDEX idx_trivia_progress_user ON public.user_trivia_progress(user_id);


-- ════════════════════════════════════════════════════════════════════════════
-- 6. GAME RATINGS (user feedback / star ratings per game)
-- ════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.game_ratings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    game_id TEXT NOT NULL,                    -- e.g. 'monetary-mastery', 'crossword'
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    rated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, game_id)                 -- one rating per user per game
);

CREATE INDEX idx_ratings_game ON public.game_ratings(game_id);


-- ════════════════════════════════════════════════════════════════════════════
-- 7. LEADERBOARD VIEW (computed from profiles, for fast queries)
-- ════════════════════════════════════════════════════════════════════════════
-- A materialized view so leaderboard queries are instant.

CREATE OR REPLACE VIEW public.leaderboard_xp AS
    SELECT
        id AS user_id,
        display_name,
        username,
        level,
        rank,
        xp,
        ROW_NUMBER() OVER (ORDER BY xp DESC) AS position
    FROM public.profiles
    WHERE xp > 0
    ORDER BY xp DESC;

CREATE OR REPLACE VIEW public.leaderboard_coins AS
    SELECT
        id AS user_id,
        display_name,
        username,
        level,
        rank,
        coins,
        ROW_NUMBER() OVER (ORDER BY coins DESC) AS position
    FROM public.profiles
    WHERE coins > 0
    ORDER BY coins DESC;


-- ════════════════════════════════════════════════════════════════════════════
-- 8. ACTIVITY LOG (recent activity feed for profile page)
-- ════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.activity_log (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    activity_type TEXT NOT NULL CHECK (activity_type IN (
        'game_completed',
        'achievement_unlocked',
        'streak_milestone',
        'level_up',
        'trivia_read'
    )),
    description TEXT NOT NULL,               -- e.g. "Completed Capital Cup with 95%"
    xp_earned INTEGER DEFAULT 0,
    coins_earned INTEGER DEFAULT 0,
    metadata JSONB DEFAULT '{}',             -- flexible extra data
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_activity_user ON public.activity_log(user_id);
CREATE INDEX idx_activity_created ON public.activity_log(created_at DESC);


-- ════════════════════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ════════════════════════════════════════════════════════════════════════════

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.streak_check_ins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_trivia ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_trivia_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

-- ── PROFILES ──
-- Users can read all profiles (needed for leaderboards)
CREATE POLICY "Public read access on profiles"
    ON public.profiles FOR SELECT TO public USING (true);

-- Users can only update their own profile
CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Users can insert their own profile (on signup)
CREATE POLICY "Users can insert own profile"
    ON public.profiles FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = id);

-- ── GAME SCORES ──
-- Anyone can read scores (for leaderboards)
CREATE POLICY "Public read access on game_scores"
    ON public.game_scores FOR SELECT TO public USING (true);

-- Users can only insert their own scores
CREATE POLICY "Users can insert own scores"
    ON public.game_scores FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- ── ACHIEVEMENTS ──
-- Anyone can view anyone's achievements
CREATE POLICY "Public read access on user_achievements"
    ON public.user_achievements FOR SELECT TO public USING (true);

-- Users can only insert their own achievements
CREATE POLICY "Users can insert own achievements"
    ON public.user_achievements FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- ── STREAKS ──
-- Users can read their own streak
CREATE POLICY "Users can read own streak"
    ON public.user_streaks FOR SELECT TO authenticated
    USING (auth.uid() = user_id);

-- Users can upsert their own streak
CREATE POLICY "Users can insert own streak"
    ON public.user_streaks FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own streak"
    ON public.user_streaks FOR UPDATE TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- ── CHECK-INS ──
CREATE POLICY "Users can read own check-ins"
    ON public.streak_check_ins FOR SELECT TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own check-ins"
    ON public.streak_check_ins FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- ── DAILY TRIVIA ──
CREATE POLICY "Public read access on daily_trivia"
    ON public.daily_trivia FOR SELECT TO public USING (true);

CREATE POLICY "Service role can insert daily_trivia"
    ON public.daily_trivia FOR INSERT TO service_role WITH CHECK (true);

CREATE POLICY "Service role can update daily_trivia"
    ON public.daily_trivia FOR UPDATE TO service_role USING (true);

-- ── TRIVIA PROGRESS ──
CREATE POLICY "Users can read own trivia progress"
    ON public.user_trivia_progress FOR SELECT TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own trivia progress"
    ON public.user_trivia_progress FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- ── GAME RATINGS ──
CREATE POLICY "Users can read own ratings"
    ON public.game_ratings FOR SELECT TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can upsert own ratings"
    ON public.game_ratings FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own ratings"
    ON public.game_ratings FOR UPDATE TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- ── ACTIVITY LOG ──
CREATE POLICY "Users can read own activity"
    ON public.activity_log FOR SELECT TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own activity"
    ON public.activity_log FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = user_id);


-- ════════════════════════════════════════════════════════════════════════════
-- HELPER: Auto-create profile on new user signup
-- ════════════════════════════════════════════════════════════════════════════
-- This trigger automatically creates a profile row when a new user signs up
-- via Supabase Auth.

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, username, email, display_name)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1))
    );
    
    -- Also initialize their streak record
    INSERT INTO public.user_streaks (user_id, current_streak, longest_streak)
    VALUES (NEW.id, 0, 0);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop if exists to avoid conflict, then create
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ════════════════════════════════════════════════════════════════════════════
-- Done! Your FinQuest database is ready.
-- ════════════════════════════════════════════════════════════════════════════
