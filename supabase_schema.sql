-- ============================================================================
-- FINQUEST - SUPABASE DATABASE SCHEMA
-- Complete SQL for setting up all tables, RLS policies, and functions
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor > New Query)
-- ============================================================================

-- ─────────────────────────────────────────────────────────────────────────────
-- 1. PROFILES TABLE
--    Extends Supabase Auth with app-specific user data.
--    Automatically created when a new user signs up.
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    display_name TEXT DEFAULT '',
    level INT DEFAULT 1,
    rank TEXT DEFAULT 'Student',
    xp INT DEFAULT 0,
    coins INT DEFAULT 0,
    avatar_config JSONB DEFAULT '{}'::jsonb,
    has_completed_avatar_setup BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index for fast username lookups (login supports email or username)
CREATE INDEX IF NOT EXISTS idx_profiles_username ON public.profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

-- ─────────────────────────────────────────────────────────────────────────────
-- 2. GAME SESSIONS TABLE
--    Tracks every individual game session a user plays.
--    Covers all 4 games: Monetary Mastery, Capital Cup (Quiz Bee),
--    Word Hunt, and Crossword.
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TYPE public.game_type AS ENUM (
    'monetary_mastery',
    'capital_cup',
    'word_hunt',
    'crossword'
);

CREATE TYPE public.game_status AS ENUM (
    'in_progress',
    'completed',
    'game_over',
    'victory'
);

CREATE TABLE IF NOT EXISTS public.game_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    game TEXT NOT NULL,               -- 'monetary_mastery', 'capital_cup', 'word_hunt', 'crossword'
    status TEXT NOT NULL DEFAULT 'in_progress',  -- 'in_progress', 'completed', 'game_over', 'victory'
    score INT DEFAULT 0,
    xp_earned INT DEFAULT 0,
    coins_earned INT DEFAULT 0,
    difficulty TEXT,                   -- e.g. 'beginner', 'intermediate', 'expert', 'hard'
    current_level INT DEFAULT 1,
    total_correct INT DEFAULT 0,
    total_questions INT DEFAULT 0,
    time_spent_seconds INT DEFAULT 0,
    metadata JSONB DEFAULT '{}'::jsonb,  -- Flexible field for game-specific data
    started_at TIMESTAMPTZ DEFAULT now(),
    completed_at TIMESTAMPTZ
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_game_sessions_user_id ON public.game_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_game_sessions_game ON public.game_sessions(game);
CREATE INDEX IF NOT EXISTS idx_game_sessions_user_game ON public.game_sessions(user_id, game);

-- ─────────────────────────────────────────────────────────────────────────────
-- 3. GAME PROGRESS TABLE
--    Stores persistent per-game progress (high scores, highest level reached)
--    One row per user per game.
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.game_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    game TEXT NOT NULL,
    high_score INT DEFAULT 0,
    highest_level INT DEFAULT 1,
    highest_difficulty TEXT DEFAULT 'beginner',
    total_sessions INT DEFAULT 0,
    total_xp_earned INT DEFAULT 0,
    total_coins_earned INT DEFAULT 0,
    total_time_played_seconds INT DEFAULT 0,
    last_played_at TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_id, game)
);

CREATE INDEX IF NOT EXISTS idx_game_progress_user_id ON public.game_progress(user_id);

-- ─────────────────────────────────────────────────────────────────────────────
-- 4. ACHIEVEMENTS TABLE
--    Defines all unlockable achievements in FinQuest.
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,          -- e.g. 'first_steps', 'quiz_master'
    title TEXT NOT NULL,
    description TEXT DEFAULT '',
    icon TEXT DEFAULT '🎯',
    category TEXT DEFAULT 'general',    -- 'general', 'monetary_mastery', 'capital_cup', etc.
    requirement_type TEXT NOT NULL,     -- 'xp_total', 'games_played', 'score', 'streak', etc.
    requirement_value INT NOT NULL,     -- The threshold to unlock
    xp_reward INT DEFAULT 0,
    coins_reward INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ─────────────────────────────────────────────────────────────────────────────
-- 5. USER ACHIEVEMENTS TABLE
--    Junction table tracking which achievements each user has unlocked.
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.user_achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    achievement_id UUID NOT NULL REFERENCES public.achievements(id) ON DELETE CASCADE,
    unlocked_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_id, achievement_id)
);

CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON public.user_achievements(user_id);

-- ─────────────────────────────────────────────────────────────────────────────
-- 6. GAME RATINGS TABLE
--    Stores in-game rating feedback (the star rating modal).
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.game_ratings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    game TEXT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_id, game)    -- One rating per user per game (can be updated)
);

CREATE INDEX IF NOT EXISTS idx_game_ratings_game ON public.game_ratings(game);

-- ─────────────────────────────────────────────────────────────────────────────
-- 7. LEADERBOARD VIEW
--    A materialized view for fast leaderboard queries.
-- ─────────────────────────────────────────────────────────────────────────────

CREATE OR REPLACE VIEW public.leaderboard AS
SELECT
    p.id AS user_id,
    p.username,
    p.display_name,
    p.avatar_config,
    p.xp,
    p.coins,
    p.level,
    p.rank,
    RANK() OVER (ORDER BY p.xp DESC) AS xp_rank,
    RANK() OVER (ORDER BY p.coins DESC) AS coins_rank,
    (SELECT COUNT(*) FROM public.user_achievements ua WHERE ua.user_id = p.id) AS achievement_count
FROM public.profiles p
ORDER BY p.xp DESC;

-- ─────────────────────────────────────────────────────────────────────────────
-- 8. ACTIVITY LOG TABLE
--    Tracks recent user activity for the Profile "Recent Activity" section.
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.activity_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    game TEXT NOT NULL,
    action TEXT NOT NULL,              -- e.g. 'Completed Level 3', 'New High Score', 'Solved Daily Puzzle'
    xp_gained INT DEFAULT 0,
    coins_gained INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_activity_log_user_id ON public.activity_log(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_log_created_at ON public.activity_log(created_at DESC);

-- ─────────────────────────────────────────────────────────────────────────────
-- 9. ROW LEVEL SECURITY (RLS) POLICIES
--    Ensures users can only access their own data.
-- ─────────────────────────────────────────────────────────────────────────────

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

-- PROFILES: Users can read all profiles (for leaderboard) but only update their own
CREATE POLICY "Public profiles are viewable by everyone"
    ON public.profiles FOR SELECT
    USING (true);

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
    ON public.profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

-- GAME SESSIONS: Users can only see and create their own sessions
CREATE POLICY "Users can view own game sessions"
    ON public.game_sessions FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create own game sessions"
    ON public.game_sessions FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own game sessions"
    ON public.game_sessions FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- GAME PROGRESS: Users can see and manage their own progress
CREATE POLICY "Users can view own game progress"
    ON public.game_progress FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can upsert own game progress"
    ON public.game_progress FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own game progress"
    ON public.game_progress FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- ACHIEVEMENTS: Everyone can read achievements (they are global definitions)
CREATE POLICY "Achievements are viewable by everyone"
    ON public.achievements FOR SELECT
    USING (true);

-- USER ACHIEVEMENTS: Users can see their own and insert their own
CREATE POLICY "Users can view own achievements"
    ON public.user_achievements FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can unlock achievements"
    ON public.user_achievements FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- GAME RATINGS: Users can manage their own ratings
CREATE POLICY "Users can view own ratings"
    ON public.game_ratings FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can submit ratings"
    ON public.game_ratings FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own ratings"
    ON public.game_ratings FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- ACTIVITY LOG: Users can see and create their own activity entries
CREATE POLICY "Users can view own activity"
    ON public.activity_log FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can log own activity"
    ON public.activity_log FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- ─────────────────────────────────────────────────────────────────────────────
-- 10. TRIGGER: AUTO-CREATE PROFILE ON SIGN UP
--     Automatically creates a profile row whenever a new user registers
--     via Supabase Auth.
-- ─────────────────────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (id, username, email, display_name)
    VALUES (
        new.id,
        COALESCE(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
        new.email,
        COALESCE(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1))
    );
    RETURN new;
END;
$$;

-- Drop existing trigger if it exists, then recreate
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ─────────────────────────────────────────────────────────────────────────────
-- 11. TRIGGER: AUTO-UPDATE updated_at TIMESTAMP
-- ─────────────────────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_game_progress_updated_at
    BEFORE UPDATE ON public.game_progress
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ─────────────────────────────────────────────────────────────────────────────
-- 12. SEED DATA: DEFAULT ACHIEVEMENTS
--     Pre-populate the achievements your Profile page references.
-- ─────────────────────────────────────────────────────────────────────────────

INSERT INTO public.achievements (slug, title, description, icon, category, requirement_type, requirement_value, xp_reward, coins_reward)
VALUES
    ('first_steps', 'First Steps', 'Complete your first game in any mode.', '🎯', 'general', 'games_played', 1, 50, 25),
    ('quiz_master', 'Quiz Master', 'Score 100% on a Capital Cup tier.', '🧠', 'capital_cup', 'perfect_tier', 1, 200, 100),
    ('speed_demon', 'Speed Demon', 'Answer 5 questions correctly with more than 15 seconds remaining each.', '⚡', 'capital_cup', 'speed_answers', 5, 150, 75),
    ('big_spender', 'Big Spender', 'Accumulate 1000 coins.', '💰', 'general', 'coins_total', 1000, 100, 0),
    ('word_wizard', 'Word Wizard', 'Find all words in a Word Hunt level without hints.', '🔮', 'word_hunt', 'perfect_level', 1, 150, 75),
    ('crossword_king', 'Crossword King', 'Complete a Hard difficulty crossword puzzle.', '👑', 'crossword', 'hard_complete', 1, 300, 150),
    ('flashcard_pro', 'Flashcard Pro', 'Score 10/10 on any Monetary Mastery level.', '📚', 'monetary_mastery', 'perfect_level', 1, 100, 50),
    ('dedicated_learner', 'Dedicated Learner', 'Play 10 total game sessions.', '📖', 'general', 'games_played', 10, 200, 100),
    ('financial_guru', 'Financial Guru', 'Reach 5000 total XP.', '🏆', 'general', 'xp_total', 5000, 500, 250),
    ('level_up', 'Level Up', 'Reach Level 5.', '⬆️', 'general', 'level_reached', 5, 100, 50)
ON CONFLICT (slug) DO NOTHING;

-- ─────────────────────────────────────────────────────────────────────────────
-- 13. HELPER FUNCTION: UPDATE USER XP & COINS
--     Call this from the client after a game session ends.
-- ─────────────────────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.add_user_rewards(
    p_user_id UUID,
    p_xp INT,
    p_coins INT
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    UPDATE public.profiles
    SET
        xp = xp + p_xp,
        coins = coins + p_coins,
        level = GREATEST(1, FLOOR(1 + (xp + p_xp) / 500.0)::INT),
        rank = CASE
            WHEN (xp + p_xp) >= 5000 THEN 'Master'
            WHEN (xp + p_xp) >= 2500 THEN 'Expert'
            WHEN (xp + p_xp) >= 1000 THEN 'Advanced'
            WHEN (xp + p_xp) >= 500  THEN 'Intermediate'
            ELSE 'Student'
        END,
        updated_at = now()
    WHERE id = p_user_id;
END;
$$;

-- ─────────────────────────────────────────────────────────────────────────────
-- 14. HELPER FUNCTION: SAVE GAME SESSION & UPDATE PROGRESS
--     Atomic function to save a session and update cumulative progress.
-- ─────────────────────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.save_game_session(
    p_user_id UUID,
    p_game TEXT,
    p_status TEXT,
    p_score INT,
    p_xp_earned INT,
    p_coins_earned INT,
    p_difficulty TEXT DEFAULT NULL,
    p_current_level INT DEFAULT 1,
    p_total_correct INT DEFAULT 0,
    p_total_questions INT DEFAULT 0,
    p_time_spent_seconds INT DEFAULT 0,
    p_metadata JSONB DEFAULT '{}'::jsonb
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_session_id UUID;
BEGIN
    -- 1) Insert game session
    INSERT INTO public.game_sessions (
        user_id, game, status, score, xp_earned, coins_earned,
        difficulty, current_level, total_correct, total_questions,
        time_spent_seconds, metadata, completed_at
    )
    VALUES (
        p_user_id, p_game, p_status, p_score, p_xp_earned, p_coins_earned,
        p_difficulty, p_current_level, p_total_correct, p_total_questions,
        p_time_spent_seconds, p_metadata,
        CASE WHEN p_status IN ('completed', 'game_over', 'victory') THEN now() ELSE NULL END
    )
    RETURNING id INTO v_session_id;

    -- 2) Upsert game progress
    INSERT INTO public.game_progress (
        user_id, game, high_score, highest_level, highest_difficulty,
        total_sessions, total_xp_earned, total_coins_earned,
        total_time_played_seconds, last_played_at
    )
    VALUES (
        p_user_id, p_game, p_score, p_current_level, COALESCE(p_difficulty, 'beginner'),
        1, p_xp_earned, p_coins_earned,
        p_time_spent_seconds, now()
    )
    ON CONFLICT (user_id, game) DO UPDATE SET
        high_score = GREATEST(game_progress.high_score, EXCLUDED.high_score),
        highest_level = GREATEST(game_progress.highest_level, EXCLUDED.highest_level),
        highest_difficulty = CASE
            WHEN EXCLUDED.highest_difficulty = 'hard' THEN 'hard'
            WHEN EXCLUDED.highest_difficulty = 'expert' AND game_progress.highest_difficulty != 'hard' THEN 'expert'
            WHEN EXCLUDED.highest_difficulty = 'intermediate' AND game_progress.highest_difficulty = 'beginner' THEN 'intermediate'
            ELSE game_progress.highest_difficulty
        END,
        total_sessions = game_progress.total_sessions + 1,
        total_xp_earned = game_progress.total_xp_earned + EXCLUDED.total_xp_earned,
        total_coins_earned = game_progress.total_coins_earned + EXCLUDED.total_coins_earned,
        total_time_played_seconds = game_progress.total_time_played_seconds + EXCLUDED.total_time_played_seconds,
        last_played_at = now(),
        updated_at = now();

    -- 3) Update user XP & coins
    PERFORM public.add_user_rewards(p_user_id, p_xp_earned, p_coins_earned);

    RETURN v_session_id;
END;
$$;

-- ============================================================================
-- ✅ SCHEMA COMPLETE!
-- 
-- Tables created:
--   • profiles          – User accounts & avatar configuration
--   • game_sessions     – Individual game play records
--   • game_progress     – Cumulative per-game stats & high scores
--   • achievements      – Global achievement definitions
--   • user_achievements – Unlocked achievements per user
--   • game_ratings      – In-game star ratings
--   • activity_log      – Recent activity feed
--
-- Views:
--   • leaderboard       – Ranked user list for leaderboard display
--
-- Functions:
--   • handle_new_user()      – Auto-creates profile on signup
--   • add_user_rewards()     – Updates XP, coins, level & rank
--   • save_game_session()    – Atomic session save + progress update
--
-- RLS policies enabled on all tables.
-- Default achievements seeded.
-- ============================================================================
