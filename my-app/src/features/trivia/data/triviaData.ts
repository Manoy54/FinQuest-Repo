import { getFallbackTrivia } from '../services/generateDailyTrivia';

export interface TriviaCard {
    id: string;
    title: string;
    summary: string;
    source: string;
    link?: string;
    date_str?: string;
}

export async function getDailyTrivia(): Promise<TriviaCard[]> {
    try {
        // In local development, Vite proxy doesn't route /api unless configured.
        // We attempt to fetch from the Vercel API endpoint.
        const res = await fetch('/api/trivia/today');
        if (res.ok) {
            const data = await res.json();
            if (data && data.length > 0) {
                 return data;
            }
        }
    } catch (err) {
        console.warn("API unavailable, falling back to local generated cards", err);
    }
    
    // Fallback if API fails (useful for local dev testing)
    const fallbacks = getFallbackTrivia();
    const today = new Date().toISOString().split('T')[0];
    return fallbacks.map((f, i) => ({
        id: `mock-${i}`,
        title: f.title,
        summary: f.summary,
        source: f.source,
        link: f.link,
        date_str: today
    }));
}

const TRIVIA_STORAGE_KEY = 'finquest_trivia_cards_today';

interface TriviaProgress {
    date: string;
    readIds: string[];
}

export function loadTriviaProgress(): TriviaProgress {
    try {
        const raw = localStorage.getItem(TRIVIA_STORAGE_KEY);
        if (raw) {
            const data = JSON.parse(raw);
            if (data.date === new Date().toISOString().split('T')[0]) return data;
        }
    } catch { /* ignore */ }
    return { date: new Date().toISOString().split('T')[0], readIds: [] };
}

export function saveTriviaProgress(progress: TriviaProgress): void {
    localStorage.setItem(TRIVIA_STORAGE_KEY, JSON.stringify(progress));
}
