-- Game difficulty labels come from several modes (beginner2, expert, extreme,
-- level-1, etc.). Keep the score history accurate by storing the app's label
-- instead of forcing every game into easy/medium/hard.

ALTER TABLE public.game_scores
    DROP CONSTRAINT IF EXISTS game_scores_difficulty_check;
