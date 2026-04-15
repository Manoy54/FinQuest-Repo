-- Keep profile creation reliable even if the original signup trigger is missing,
-- re-run, or receives a username that already exists in public.profiles.

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    preferred_username TEXT;
    preferred_display_name TEXT;
BEGIN
    preferred_username := COALESCE(
        NULLIF(trim(NEW.raw_user_meta_data->>'username'), ''),
        NULLIF(split_part(COALESCE(NEW.email, ''), '@', 1), ''),
        'user_' || replace(left(NEW.id::text, 8), '-', '')
    );

    IF EXISTS (
        SELECT 1
        FROM public.profiles
        WHERE username = preferred_username
          AND id <> NEW.id
    ) THEN
        preferred_username := preferred_username || '_' || right(replace(NEW.id::text, '-', ''), 6);
    END IF;

    preferred_display_name := COALESCE(
        NULLIF(trim(NEW.raw_user_meta_data->>'display_name'), ''),
        preferred_username
    );

    INSERT INTO public.profiles (id, username, email, display_name)
    VALUES (
        NEW.id,
        preferred_username,
        COALESCE(NEW.email, preferred_username || '@example.invalid'),
        preferred_display_name
    )
    ON CONFLICT (id) DO UPDATE
    SET email = EXCLUDED.email,
        display_name = COALESCE(public.profiles.display_name, EXCLUDED.display_name);

    INSERT INTO public.user_streaks (user_id, current_streak, longest_streak)
    VALUES (NEW.id, 0, 0)
    ON CONFLICT (user_id) DO NOTHING;

    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
