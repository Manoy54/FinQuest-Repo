export function getRankForLevel(level: number): string {
    if (level >= 51) return 'FinQuest Grandmaster';
    if (level >= 41) return 'Capital Tycoon';
    if (level >= 31) return 'Investor';
    if (level >= 21) return 'Strategist';
    if (level >= 11) return 'Analyst';
    return 'Apprentice';
}

export interface RankTier {
    name: string;
    min: number;
    max: number;
    color: string;
    icon: string;
}

export function getRankTier(level: number): RankTier {
    if (level >= 51) return { name: 'FinQuest Grandmaster', min: 51, max: Infinity, color: '#ff6b35', icon: '👑' };
    if (level >= 41) return { name: 'Capital Tycoon', min: 41, max: 50, color: '#ffd700', icon: '💎' };
    if (level >= 31) return { name: 'Investor', min: 31, max: 40, color: '#a855f7', icon: '📈' };
    if (level >= 21) return { name: 'Strategist', min: 21, max: 30, color: '#3b82f6', icon: '🧠' };
    if (level >= 11) return { name: 'Analyst', min: 11, max: 20, color: '#10b981', icon: '📊' };
    return { name: 'Apprentice', min: 1, max: 10, color: '#6b7280', icon: '📖' };
}

export const ALL_RANKS: RankTier[] = [
    { name: 'Apprentice', min: 1, max: 10, color: '#6b7280', icon: '📖' },
    { name: 'Analyst', min: 11, max: 20, color: '#10b981', icon: '📊' },
    { name: 'Strategist', min: 21, max: 30, color: '#3b82f6', icon: '🧠' },
    { name: 'Investor', min: 31, max: 40, color: '#a855f7', icon: '📈' },
    { name: 'Capital Tycoon', min: 41, max: 50, color: '#ffd700', icon: '💎' },
    { name: 'FinQuest Grandmaster', min: 51, max: Infinity, color: '#ff6b35', icon: '👑' },
];
