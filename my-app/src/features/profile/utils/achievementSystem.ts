export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    category: 'gameplay' | 'streak' | 'trivia' | 'social' | 'mastery';
    requirement: string;
    xpReward: number;
    coinReward: number;
}

export const ACHIEVEMENTS: Achievement[] = [
    // Gameplay
    { id: 'first-steps', title: 'First Steps', description: 'Complete your first game', icon: '🎯', category: 'gameplay', requirement: 'Complete 1 game', xpReward: 50, coinReward: 25 },
    { id: 'game-explorer', title: 'Game Explorer', description: 'Play all 4 basic game modes', icon: '🗺️', category: 'gameplay', requirement: 'Play all game modes', xpReward: 200, coinReward: 100 },
    { id: 'high-roller', title: 'High Roller', description: 'Score above 90% in any game', icon: '🎲', category: 'gameplay', requirement: 'Score 90%+ in a game', xpReward: 300, coinReward: 150 },
    { id: 'speed-demon', title: 'Speed Demon', description: 'Complete a game in under 2 minutes', icon: '⚡', category: 'gameplay', requirement: 'Finish under 2 min', xpReward: 250, coinReward: 125 },
    { id: 'perfectionist', title: 'Perfectionist', description: 'Get a perfect score in any game', icon: '💎', category: 'gameplay', requirement: 'Perfect score', xpReward: 500, coinReward: 250 },

    // Streak
    { id: 'streak-starter', title: 'Streak Starter', description: 'Maintain a 3-day login streak', icon: '🔥', category: 'streak', requirement: '3-day streak', xpReward: 100, coinReward: 50 },
    { id: 'week-warrior', title: 'Week Warrior', description: 'Maintain a 7-day login streak', icon: '⚔️', category: 'streak', requirement: '7-day streak', xpReward: 300, coinReward: 150 },
    { id: 'fortnight-fury', title: 'Fortnight Fury', description: 'Maintain a 14-day login streak', icon: '🛡️', category: 'streak', requirement: '14-day streak', xpReward: 500, coinReward: 250 },
    { id: 'monthly-legend', title: 'Monthly Legend', description: 'Maintain a 30-day login streak', icon: '👑', category: 'streak', requirement: '30-day streak', xpReward: 1000, coinReward: 500 },

    // Trivia
    { id: 'quiz-master', title: 'Quiz Master', description: 'Answer 10 trivia questions correctly', icon: '🧠', category: 'trivia', requirement: '10 correct answers', xpReward: 150, coinReward: 75 },
    { id: 'trivia-champion', title: 'Trivia Champion', description: 'Get a perfect daily trivia score', icon: '🏆', category: 'trivia', requirement: 'Perfect trivia', xpReward: 200, coinReward: 100 },
    { id: 'knowledge-seeker', title: 'Knowledge Seeker', description: 'Complete 7 days of daily trivia', icon: '📚', category: 'trivia', requirement: '7 trivia days', xpReward: 350, coinReward: 175 },

    // Social
    { id: 'profile-polished', title: 'Profile Polished', description: 'Customize your avatar and display name', icon: '✨', category: 'social', requirement: 'Customize profile', xpReward: 50, coinReward: 25 },
    { id: 'leaderboard-climber', title: 'Leaderboard Climber', description: 'Reach the top 10 on any leaderboard', icon: '📈', category: 'social', requirement: 'Top 10 rank', xpReward: 400, coinReward: 200 },

    // Mastery
    { id: 'coin-collector', title: 'Coin Collector', description: 'Earn 500 total coins', icon: '🪙', category: 'mastery', requirement: '500 coins', xpReward: 200, coinReward: 0 },
    { id: 'big-spender', title: 'Big Spender', description: 'Earn 2,000 total coins', icon: '💰', category: 'mastery', requirement: '2,000 coins', xpReward: 500, coinReward: 0 },
    { id: 'xp-hunter', title: 'XP Hunter', description: 'Earn 1,000 total XP', icon: '⭐', category: 'mastery', requirement: '1,000 XP', xpReward: 100, coinReward: 50 },
    { id: 'xp-legend', title: 'XP Legend', description: 'Earn 5,000 total XP', icon: '🌟', category: 'mastery', requirement: '5,000 XP', xpReward: 300, coinReward: 150 },
    { id: 'level-up', title: 'Level Up', description: 'Reach Level 5', icon: '🆙', category: 'mastery', requirement: 'Reach Lv.5', xpReward: 200, coinReward: 100 },
    { id: 'rank-analyst', title: 'Rank: Analyst', description: 'Reach the Analyst rank (Level 11)', icon: '📊', category: 'mastery', requirement: 'Reach Analyst', xpReward: 500, coinReward: 250 },
];

const ACHIEVEMENT_STORAGE_KEY = 'finquest_achievements';

export interface AchievementProgress {
    unlockedIds: string[];
    unlockedAt: Record<string, string>;
}

export function loadAchievements(): AchievementProgress {
    try {
        const raw = localStorage.getItem(ACHIEVEMENT_STORAGE_KEY);
        if (raw) return JSON.parse(raw);
    } catch { /* ignore */ }
    return { unlockedIds: [], unlockedAt: {} };
}

export function saveAchievements(progress: AchievementProgress): void {
    localStorage.setItem(ACHIEVEMENT_STORAGE_KEY, JSON.stringify(progress));
}

export function unlockAchievement(id: string): boolean {
    const progress = loadAchievements();
    if (progress.unlockedIds.includes(id)) return false;

    progress.unlockedIds.push(id);
    progress.unlockedAt[id] = new Date().toISOString();
    saveAchievements(progress);
    return true;
}

export function isAchievementUnlocked(id: string): boolean {
    return loadAchievements().unlockedIds.includes(id);
}

export function getUnlockedCount(): number {
    return loadAchievements().unlockedIds.length;
}

export function getAchievementsByCategory(category: Achievement['category']): Achievement[] {
    return ACHIEVEMENTS.filter(a => a.category === category);
}

export function getCompletionPercentage(): number {
    const progress = loadAchievements();
    return Math.round((progress.unlockedIds.length / ACHIEVEMENTS.length) * 100);
}

export const CATEGORY_LABELS: Record<Achievement['category'], { label: string; icon: string; color: string }> = {
    gameplay: { label: 'Gameplay', icon: '🎮', color: '#3b82f6' },
    streak: { label: 'Streaks', icon: '🔥', color: '#f59e0b' },
    trivia: { label: 'Trivia', icon: '📝', color: '#8b5cf6' },
    social: { label: 'Social', icon: '👥', color: '#ec4899' },
    mastery: { label: 'Mastery', icon: '⭐', color: '#10b981' },
};
