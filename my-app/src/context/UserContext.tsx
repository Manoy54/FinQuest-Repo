/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useCallback, useContext, useRef, useState, useEffect } from 'react';
import {
    fetchRemoteGameStats,
    fetchRemoteProfileProgress,
    loadLocalActivity,
    loadLocalGameStats,
    recordLocalGameResult,
    syncGameResultToSupabase,
    syncProfileRewardToSupabase,
    type ActivityItem,
    type GameResultInput,
    type GameStatsByMode,
} from '../lib/gameStats';
import { isSupabaseConfigured, supabase } from '../lib/supabase/client';

interface UserContextType {
    xp: number;
    coins: number;
    addXp: (amount: number) => void;
    addCoins: (amount: number) => void;
    recordGameResult: (result: GameResultInput) => void;
    gameStats: GameStatsByMode;
    recentActivity: ActivityItem[];
    refreshStats: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

function readStoredNumber(key: string): number {
    const saved = localStorage.getItem(key);
    const parsed = saved ? parseInt(saved, 10) : 0;
    return Number.isFinite(parsed) ? parsed : 0;
}

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [xp, setXp] = useState(() => readStoredNumber('userXP'));
    const [coins, setCoins] = useState(() => readStoredNumber('userCoins'));
    const [gameStats, setGameStats] = useState<GameStatsByMode>(() => loadLocalGameStats());
    const [recentActivity, setRecentActivity] = useState<ActivityItem[]>(() => loadLocalActivity());
    const pendingRewardSync = useRef({ xp: 0, coins: 0, timer: 0 });

    useEffect(() => {
        localStorage.setItem('userXP', xp.toString());
    }, [xp]);

    useEffect(() => {
        localStorage.setItem('userCoins', coins.toString());
    }, [coins]);

    const refreshStats = useCallback(async () => {
        setGameStats(loadLocalGameStats());
        setRecentActivity(loadLocalActivity());

        const [remoteProgress, remoteStats] = await Promise.all([
            fetchRemoteProfileProgress(),
            fetchRemoteGameStats(),
        ]);

        if (remoteProgress) {
            setXp(remoteProgress.xp);
            setCoins(remoteProgress.coins);
        }

        if (remoteStats) {
            setGameStats(remoteStats.stats);
            setRecentActivity(remoteStats.activity);
        }
    }, []);

    useEffect(() => {
        void refreshStats();

        if (!isSupabaseConfigured) return;

        const { data } = supabase.auth.onAuthStateChange(() => {
            void refreshStats();
        });

        return () => {
            data.subscription.unsubscribe();
        };
    }, [refreshStats]);

    const queueRewardSync = useCallback((xpDelta: number, coinsDelta: number) => {
        pendingRewardSync.current.xp += xpDelta;
        pendingRewardSync.current.coins += coinsDelta;

        if (pendingRewardSync.current.timer) {
            window.clearTimeout(pendingRewardSync.current.timer);
        }

        pendingRewardSync.current.timer = window.setTimeout(() => {
            const pending = pendingRewardSync.current;
            pendingRewardSync.current = { xp: 0, coins: 0, timer: 0 };
            void syncProfileRewardToSupabase(pending.xp, pending.coins);
        }, 0);
    }, []);

    const addXp = useCallback((amount: number) => {
        const safeAmount = Math.max(0, Math.round(amount));
        if (safeAmount <= 0) return;

        setXp(prev => prev + safeAmount);
        queueRewardSync(safeAmount, 0);
    }, [queueRewardSync]);

    const addCoins = useCallback((amount: number) => {
        const safeAmount = Math.max(0, Math.round(amount));
        if (safeAmount <= 0) return;

        setCoins(prev => prev + safeAmount);
        queueRewardSync(0, safeAmount);
    }, [queueRewardSync]);

    const recordGameResult = useCallback((result: GameResultInput) => {
        const { stats, activity } = recordLocalGameResult(result);
        setGameStats(stats);
        setRecentActivity(activity);

        if (result.xpEarned > 0) setXp(prev => prev + Math.round(result.xpEarned));
        if (result.coinsEarned > 0) setCoins(prev => prev + Math.round(result.coinsEarned));

        void syncGameResultToSupabase(result).then(refreshStats);
    }, [refreshStats]);

    return (
        <UserContext.Provider value={{ xp, coins, addXp, addCoins, recordGameResult, gameStats, recentActivity, refreshStats }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};
