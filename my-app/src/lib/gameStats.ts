import { getRankForLevel } from '../features/profile/utils/levelSystem';
import { isSupabaseConfigured, supabase } from './supabase/client';

export const GAME_MODES = [
    { id: 'capital_cup', name: 'Capital Cup', route: '/quiz-bee', highScoreKey: 'quizBeeHighScore' },
    { id: 'monetary_mastery', name: 'Monetary Mastery', route: '/monetary-mastery', highScoreKey: 'monetaryMasteryHighScore' },
    { id: 'data_diver', name: 'Data Diver', route: '/word-hunt', highScoreKey: 'wordHuntHighScore' },
    { id: 'corporate_climb', name: 'Corporate Climb', route: '/crossword', highScoreKey: 'crosswordHighScore' },
    { id: 'speed_round', name: 'Speed Round', route: '/speed-round', highScoreKey: 'speedRoundHighScore' },
    { id: 'match_up', name: 'Coinnect', route: '/matching-game', highScoreKey: 'matchingGameHighScore' },
    { id: 'spot_the_difference', name: 'Spot the Difference', route: '/spot-difference', highScoreKey: 'spotDiffHighScore' },
] as const;

export type GameModeId = typeof GAME_MODES[number]['id'];

export interface GameResultInput {
    gameMode: GameModeId;
    score: number;
    maxPossibleScore: number;
    xpEarned: number;
    coinsEarned: number;
    difficulty?: string;
    timeSpentSeconds?: number;
}

export interface GameModeStats {
    gameMode: GameModeId;
    plays: number;
    bestScore: number;
    maxPossibleScore: number;
    bestPercent: number;
    totalXp: number;
    totalCoins: number;
    lastPlayedAt: string;
    difficulty?: string;
}

export interface ActivityItem {
    id: string;
    gameMode: GameModeId;
    gameName: string;
    action: string;
    xpEarned: number;
    coinsEarned: number;
    score: number;
    maxPossibleScore: number;
    createdAt: string;
}

export type GameStatsByMode = Partial<Record<GameModeId, GameModeStats>>;

export interface ProfileProgress {
    xp: number;
    coins: number;
}

const GAME_STATS_STORAGE_KEY = 'finquest_game_stats';
const ACTIVITY_STORAGE_KEY = 'finquest_activity_log';

export function getGameModeMeta(gameMode: GameModeId) {
    return GAME_MODES.find(mode => mode.id === gameMode) ?? GAME_MODES[0];
}

export function calculateLevelFromXp(xp: number): number {
    return Math.max(1, Math.floor(Math.max(0, xp) / 500) + 1);
}

function clampInt(value: number): number {
    if (!Number.isFinite(value)) return 0;
    return Math.max(0, Math.round(value));
}

function loadJson<T>(key: string, fallback: T): T {
    try {
        const raw = localStorage.getItem(key);
        if (raw) return JSON.parse(raw) as T;
    } catch {
        // Ignore corrupt local cache and rebuild from the next valid result.
    }

    return fallback;
}

function saveJson<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
}

export function loadLocalGameStats(): GameStatsByMode {
    return loadJson<GameStatsByMode>(GAME_STATS_STORAGE_KEY, {});
}

export function loadLocalActivity(): ActivityItem[] {
    return loadJson<ActivityItem[]>(ACTIVITY_STORAGE_KEY, []);
}

export function recordLocalGameResult(input: GameResultInput): { stats: GameStatsByMode; activity: ActivityItem[] } {
    const result = sanitizeGameResult(input);
    const meta = getGameModeMeta(result.gameMode);
    const now = new Date().toISOString();
    const stats = loadLocalGameStats();
    const existing = stats[result.gameMode];
    const percent = result.maxPossibleScore > 0 ? Math.round((result.score / result.maxPossibleScore) * 100) : 0;
    const isBetter = !existing || percent > existing.bestPercent || (percent === existing.bestPercent && result.score > existing.bestScore);

    stats[result.gameMode] = {
        gameMode: result.gameMode,
        plays: (existing?.plays ?? 0) + 1,
        bestScore: isBetter ? result.score : existing.bestScore,
        maxPossibleScore: isBetter ? result.maxPossibleScore : existing.maxPossibleScore,
        bestPercent: isBetter ? percent : existing.bestPercent,
        totalXp: (existing?.totalXp ?? 0) + result.xpEarned,
        totalCoins: (existing?.totalCoins ?? 0) + result.coinsEarned,
        lastPlayedAt: now,
        difficulty: result.difficulty ?? existing?.difficulty,
    };

    localStorage.setItem(meta.highScoreKey, String(stats[result.gameMode]?.bestScore ?? result.score));
    saveJson(GAME_STATS_STORAGE_KEY, stats);

    const activityItem: ActivityItem = {
        id: `${result.gameMode}-${Date.now()}`,
        gameMode: result.gameMode,
        gameName: meta.name,
        action: `Completed with ${result.score}/${result.maxPossibleScore}`,
        xpEarned: result.xpEarned,
        coinsEarned: result.coinsEarned,
        score: result.score,
        maxPossibleScore: result.maxPossibleScore,
        createdAt: now,
    };

    const activity = [activityItem, ...loadLocalActivity()].slice(0, 25);
    saveJson(ACTIVITY_STORAGE_KEY, activity);

    return { stats, activity };
}

export function sanitizeGameResult(input: GameResultInput): GameResultInput {
    return {
        ...input,
        score: clampInt(input.score),
        maxPossibleScore: Math.max(1, clampInt(input.maxPossibleScore)),
        xpEarned: clampInt(input.xpEarned),
        coinsEarned: clampInt(input.coinsEarned),
        timeSpentSeconds: input.timeSpentSeconds === undefined ? undefined : clampInt(input.timeSpentSeconds),
        difficulty: input.difficulty?.toLowerCase(),
    };
}

export async function fetchRemoteProfileProgress(): Promise<ProfileProgress | null> {
    if (!isSupabaseConfigured) return null;

    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !sessionData.session?.user) return null;

    const { data, error } = await supabase
        .from('profiles')
        .select('xp, coins')
        .eq('id', sessionData.session.user.id)
        .maybeSingle();

    if (error || !data) return null;

    return {
        xp: clampInt(data.xp ?? 0),
        coins: clampInt(data.coins ?? 0),
    };
}

export async function fetchRemoteGameStats(): Promise<{ stats: GameStatsByMode; activity: ActivityItem[] } | null> {
    if (!isSupabaseConfigured) return null;

    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !sessionData.session?.user) return null;

    const userId = sessionData.session.user.id;
    const [{ data: scoreRows, error: scoreError }, { data: activityRows, error: activityError }] = await Promise.all([
        supabase
            .from('game_scores')
            .select('game_mode, score, max_possible_score, xp_earned, coins_earned, difficulty, played_at')
            .eq('user_id', userId)
            .order('played_at', { ascending: false }),
        supabase
            .from('activity_log')
            .select('id, metadata, description, xp_earned, coins_earned, created_at')
            .eq('user_id', userId)
            .eq('activity_type', 'game_completed')
            .order('created_at', { ascending: false })
            .limit(25),
    ]);

    if (scoreError || activityError) return null;

    const stats: GameStatsByMode = {};
    (scoreRows ?? []).forEach(row => {
        const gameMode = row.game_mode as GameModeId;
        if (!GAME_MODES.some(mode => mode.id === gameMode)) return;

        const score = clampInt(row.score ?? 0);
        const maxPossibleScore = Math.max(1, clampInt(row.max_possible_score ?? 1));
        const percent = Math.round((score / maxPossibleScore) * 100);
        const existing = stats[gameMode];
        const isBetter = !existing || percent > existing.bestPercent || (percent === existing.bestPercent && score > existing.bestScore);

        stats[gameMode] = {
            gameMode,
            plays: (existing?.plays ?? 0) + 1,
            bestScore: isBetter ? score : existing.bestScore,
            maxPossibleScore: isBetter ? maxPossibleScore : existing.maxPossibleScore,
            bestPercent: isBetter ? percent : existing.bestPercent,
            totalXp: (existing?.totalXp ?? 0) + clampInt(row.xp_earned ?? 0),
            totalCoins: (existing?.totalCoins ?? 0) + clampInt(row.coins_earned ?? 0),
            lastPlayedAt: existing?.lastPlayedAt ?? row.played_at ?? new Date().toISOString(),
            difficulty: isBetter ? row.difficulty ?? undefined : existing.difficulty,
        };
    });

    const activity: ActivityItem[] = (activityRows ?? []).map(row => {
        const metadata = (row.metadata ?? {}) as Partial<Pick<ActivityItem, 'gameMode' | 'gameName' | 'score' | 'maxPossibleScore'>>;
        const gameMode = GAME_MODES.some(mode => mode.id === metadata.gameMode) ? metadata.gameMode as GameModeId : 'capital_cup';
        return {
            id: String(row.id),
            gameMode,
            gameName: metadata.gameName ?? getGameModeMeta(gameMode).name,
            action: row.description ?? 'Completed game',
            xpEarned: clampInt(row.xp_earned ?? 0),
            coinsEarned: clampInt(row.coins_earned ?? 0),
            score: clampInt(metadata.score ?? 0),
            maxPossibleScore: Math.max(1, clampInt(metadata.maxPossibleScore ?? 1)),
            createdAt: row.created_at ?? new Date().toISOString(),
        };
    });

    return { stats, activity };
}

export async function syncProfileRewardToSupabase(xpDelta: number, coinsDelta: number): Promise<void> {
    if (!isSupabaseConfigured || (xpDelta <= 0 && coinsDelta <= 0)) return;

    const { data: sessionData } = await supabase.auth.getSession();
    const user = sessionData.session?.user;
    if (!user) return;

    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('xp, coins')
        .eq('id', user.id)
        .maybeSingle();

    if (profileError || !profile) return;

    const nextXp = clampInt(profile.xp ?? 0) + clampInt(xpDelta);
    const nextCoins = clampInt(profile.coins ?? 0) + clampInt(coinsDelta);
    const nextLevel = calculateLevelFromXp(nextXp);

    await supabase
        .from('profiles')
        .update({
            xp: nextXp,
            coins: nextCoins,
            level: nextLevel,
            rank: getRankForLevel(nextLevel),
        })
        .eq('id', user.id);
}

export async function syncGameResultToSupabase(input: GameResultInput): Promise<void> {
    if (!isSupabaseConfigured) return;

    const result = sanitizeGameResult(input);
    const { data: sessionData } = await supabase.auth.getSession();
    const user = sessionData.session?.user;
    if (!user) return;

    await syncProfileRewardToSupabase(result.xpEarned, result.coinsEarned);

    const meta = getGameModeMeta(result.gameMode);
    const description = `Completed ${meta.name} with ${result.score}/${result.maxPossibleScore}`;

    const { error: scoreError } = await supabase
        .from('game_scores')
        .insert({
            user_id: user.id,
            game_mode: result.gameMode,
            score: result.score,
            max_possible_score: result.maxPossibleScore,
            time_spent_seconds: result.timeSpentSeconds ?? null,
            difficulty: result.difficulty ?? null,
            xp_earned: result.xpEarned,
            coins_earned: result.coinsEarned,
        });

    if (scoreError) {
        console.warn('Failed to save game score:', scoreError);
    }

    const { error: activityError } = await supabase
        .from('activity_log')
        .insert({
            user_id: user.id,
            activity_type: 'game_completed',
            description,
            xp_earned: result.xpEarned,
            coins_earned: result.coinsEarned,
            metadata: {
                gameMode: result.gameMode,
                gameName: meta.name,
                score: result.score,
                maxPossibleScore: result.maxPossibleScore,
                difficulty: result.difficulty ?? null,
            },
        });

    if (activityError) {
        console.warn('Failed to save activity log:', activityError);
    }
}
