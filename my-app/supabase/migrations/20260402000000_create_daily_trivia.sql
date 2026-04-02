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

-- Enable RLS
ALTER TABLE public.daily_trivia ENABLE ROW LEVEL SECURITY;

-- Allow public read access to today's trivia
CREATE POLICY "Allow public read access on daily_trivia"
ON public.daily_trivia FOR SELECT
TO public
USING (true);

-- Allow service role to insert/update
CREATE POLICY "Allow service role insert on daily_trivia"
ON public.daily_trivia FOR INSERT
TO service_role
WITH CHECK (true);

CREATE POLICY "Allow service role update on daily_trivia"
ON public.daily_trivia FOR UPDATE
TO service_role
USING (true);
