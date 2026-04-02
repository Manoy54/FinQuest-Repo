const STREAK_STORAGE_KEY = 'finquest_streak_data';

export interface StreakData {
    currentStreak: number;
    longestStreak: number;
    lastCheckIn: string | null;
    checkInHistory: string[];
}

function getToday(): string {
    return new Date().toISOString().split('T')[0];
}

function getYesterday(): string {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().split('T')[0];
}

export function loadStreak(): StreakData {
    try {
        const raw = localStorage.getItem(STREAK_STORAGE_KEY);
        if (raw) return JSON.parse(raw);
    } catch { /* ignore corrupt data */ }
    return { currentStreak: 0, longestStreak: 0, lastCheckIn: null, checkInHistory: [] };
}

export function saveStreak(data: StreakData): void {
    localStorage.setItem(STREAK_STORAGE_KEY, JSON.stringify(data));
}

export function hasCheckedInToday(): boolean {
    return loadStreak().lastCheckIn === getToday();
}

export interface CheckInResult {
    streakData: StreakData;
    rewards: { xp: number; coins: number };
    isMilestone: boolean;
    milestoneLabel?: string;
}

export function performCheckIn(): CheckInResult {
    const data = loadStreak();
    const today = getToday();
    const yesterday = getYesterday();

    if (data.lastCheckIn === today) {
        return { streakData: data, rewards: { xp: 0, coins: 0 }, isMilestone: false };
    }

    const newStreak = data.lastCheckIn === yesterday ? data.currentStreak + 1 : 1;
    const newLongest = Math.max(data.longestStreak, newStreak);
    const newHistory = [...data.checkInHistory.slice(-29), today];

    const newData: StreakData = {
        currentStreak: newStreak,
        longestStreak: newLongest,
        lastCheckIn: today,
        checkInHistory: newHistory,
    };

    saveStreak(newData);

    let xp = 10;
    let coins = 5;
    let isMilestone = false;
    let milestoneLabel: string | undefined;

    if (newStreak === 3) { xp += 50; coins += 25; isMilestone = true; milestoneLabel = '3-Day Streak!'; }
    else if (newStreak === 7) { xp += 150; coins += 75; isMilestone = true; milestoneLabel = '7-Day Streak!'; }
    else if (newStreak === 14) { xp += 300; coins += 150; isMilestone = true; milestoneLabel = '14-Day Streak!'; }
    else if (newStreak === 30) { xp += 500; coins += 250; isMilestone = true; milestoneLabel = '30-Day Streak!'; }

    return { streakData: newData, rewards: { xp, coins }, isMilestone, milestoneLabel };
}

export function getLast7Days(): { date: string; label: string; checkedIn: boolean }[] {
    const data = loadStreak();
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const days: { date: string; label: string; checkedIn: boolean }[] = [];

    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];
        days.push({
            date: dateStr,
            label: dayNames[d.getDay()],
            checkedIn: data.checkInHistory.includes(dateStr),
        });
    }

    return days;
}

export function getNextMilestone(currentStreak: number): { days: number; xp: number; coins: number } | null {
    const milestones = [
        { days: 3, xp: 50, coins: 25 },
        { days: 7, xp: 150, coins: 75 },
        { days: 14, xp: 300, coins: 150 },
        { days: 30, xp: 500, coins: 250 },
    ];
    return milestones.find(m => m.days > currentStreak) || null;
}
