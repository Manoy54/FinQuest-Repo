import { useEffect, useMemo, useState } from 'react';
import { BackToHomeButton } from '../../../components/ui/BackToHomeButton';
import { useAuth } from '../../../context/AuthContext';
import { useUserContext } from '../../../context/UserContext';
import { calculateLevelFromXp } from '../../../lib/gameStats';
import { isSupabaseConfigured, supabase } from '../../../lib/supabase/client';
import { AnimatedBackground } from '../../game-modes/components/MoneytaryMasteryComponents';
import { getRankTier } from '../../profile/utils/levelSystem';

type TabType = 'xp' | 'coins';

interface LeaderboardEntry {
    rank: number;
    userId?: string;
    name: string;
    level: number;
    value: number;
    isCurrentUser?: boolean;
}

interface ProfileLeaderboardRow {
    id: string;
    display_name: string | null;
    username: string | null;
    level: number | null;
    xp: number | null;
    coins: number | null;
}

interface RemoteLeaderboardState {
    xp: LeaderboardEntry[];
    coins: LeaderboardEntry[];
    isLoading: boolean;
    error: string | null;
    source: 'remote' | 'local';
}

const initialLeaderboardState: RemoteLeaderboardState = {
    xp: [],
    coins: [],
    isLoading: false,
    error: null,
    source: 'local',
};

function toSafeNumber(value: number | null | undefined): number {
    if (!Number.isFinite(value)) return 0;
    return Math.max(0, Math.round(value ?? 0));
}

function getDisplayName(row: ProfileLeaderboardRow): string {
    const displayName = row.display_name?.trim();
    if (displayName) return displayName;

    const username = row.username?.trim();
    if (username) return username;

    return `User ${row.id.slice(0, 8)}`;
}

function buildLeaderboard(
    rows: ProfileLeaderboardRow[],
    metric: TabType,
    currentUserId: string | null
): LeaderboardEntry[] {
    return [...rows]
        .sort((a, b) => {
            const valueDiff = toSafeNumber(b[metric]) - toSafeNumber(a[metric]);
            if (valueDiff !== 0) return valueDiff;

            const levelDiff = toSafeNumber(b.level) - toSafeNumber(a.level);
            if (levelDiff !== 0) return levelDiff;

            return getDisplayName(a).localeCompare(getDisplayName(b));
        })
        .map((row, index) => ({
            rank: index + 1,
            userId: row.id,
            name: getDisplayName(row),
            level: Math.max(1, toSafeNumber(row.level) || calculateLevelFromXp(toSafeNumber(row.xp))),
            value: toSafeNumber(row[metric]),
            isCurrentUser: currentUserId === row.id,
        }));
}

function getMedalStyle(rank: number): { bg: string; border: string; text: string; icon: string } {
    if (rank === 1) return { bg: 'from-amber-500/30 to-yellow-600/30', border: 'border-amber-400/50', text: 'text-amber-300', icon: '1st' };
    if (rank === 2) return { bg: 'from-gray-300/20 to-gray-400/20', border: 'border-gray-300/40', text: 'text-gray-300', icon: '2nd' };
    if (rank === 3) return { bg: 'from-orange-600/20 to-amber-700/20', border: 'border-orange-500/40', text: 'text-orange-300', icon: '3rd' };
    return { bg: '', border: 'border-white/5', text: 'text-white/60', icon: '' };
}

function getPodiumEntries(data: LeaderboardEntry[]): LeaderboardEntry[] {
    if (data.length >= 3) return [data[1], data[0], data[2]];
    return data;
}

export function LeaderboardPage() {
    const [activeTab, setActiveTab] = useState<TabType>('xp');
    const [leaderboards, setLeaderboards] = useState<RemoteLeaderboardState>(initialLeaderboardState);
    const { displayName, username } = useAuth();
    const { xp, coins } = useUserContext();

    const localName = displayName || username || 'You';
    const localLevel = calculateLevelFromXp(xp);

    const localLeaderboards = useMemo<Pick<RemoteLeaderboardState, 'xp' | 'coins'>>(() => ({
        xp: [{
            rank: 1,
            name: localName,
            level: localLevel,
            value: xp,
            isCurrentUser: true,
        }],
        coins: [{
            rank: 1,
            name: localName,
            level: localLevel,
            value: coins,
            isCurrentUser: true,
        }],
    }), [coins, localLevel, localName, xp]);

    async function loadRemoteLeaderboards() {
        if (!isSupabaseConfigured) {
            setLeaderboards({
                ...localLeaderboards,
                isLoading: false,
                error: null,
                source: 'local',
            });
            return;
        }

        setLeaderboards(prev => ({ ...prev, isLoading: true, error: null }));

        const { data: sessionData } = await supabase.auth.getSession();
        const currentUserId = sessionData.session?.user.id ?? null;

        const { data, error } = await supabase
            .from('profiles')
            .select('id, display_name, username, level, xp, coins');

        if (error) {
            setLeaderboards({
                ...localLeaderboards,
                isLoading: false,
                error: 'Could not load the live leaderboard. Showing your local stats for now.',
                source: 'local',
            });
            return;
        }

        const rows = (data ?? []) as ProfileLeaderboardRow[];
        setLeaderboards({
            xp: buildLeaderboard(rows, 'xp', currentUserId),
            coins: buildLeaderboard(rows, 'coins', currentUserId),
            isLoading: false,
            error: null,
            source: 'remote',
        });
    }

    useEffect(() => {
        void loadRemoteLeaderboards();
        // The local fallback should refresh if the current user's local stats change.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localLeaderboards]);

    const data = activeTab === 'xp' ? leaderboards.xp : leaderboards.coins;
    const podiumEntries = getPodiumEntries(data);
    const metricLabel = activeTab === 'xp' ? 'XP' : 'Coins';

    return (
        <div
            className="min-h-screen relative overflow-hidden flex flex-col items-center"
            style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #1a1a2e 100%)' }}
        >
            <AnimatedBackground />

            <div className="relative z-10 w-full max-w-3xl px-6 py-8 flex flex-col gap-4">
                <BackToHomeButton />

                <div className="text-center">
                    <h1 className="text-2xl font-black text-white mb-0 tracking-tight flex flex-col items-center gap-1">
                        <span className="text-3xl">#</span>
                        Leaderboards
                    </h1>
                    <p className="text-white/40 text-[10px] mt-1">Real FinQuest users ranked by saved progress.</p>
                </div>

                <div className="flex gap-0.5 bg-white/5 p-0.5 rounded-[10px] border border-white/10 mt-1 h-[36px]">
                    {(['xp', 'coins'] as TabType[]).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 flex items-center justify-center rounded-lg font-bold text-[8px] sm:text-[10px] md:text-[11px] uppercase tracking-tighter whitespace-nowrap transition-all duration-300 ${
                                activeTab === tab
                                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                                    : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                            }`}
                        >
                            {tab === 'xp' ? 'Highest XP' : 'Most Coins'}
                        </button>
                    ))}
                </div>

                {(leaderboards.error || leaderboards.source === 'local') && (
                    <div className="rounded-xl border border-amber-400/20 bg-amber-500/10 px-4 py-3 text-center text-[11px] font-bold text-amber-100">
                        {leaderboards.error ?? 'Supabase is not configured, so only your local saved stats are shown.'}
                    </div>
                )}

                {leaderboards.isLoading && (
                    <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-6 text-center text-xs font-bold text-white/60">
                        Loading real user stats...
                    </div>
                )}

                {!leaderboards.isLoading && data.length > 0 && (
                    <>
                        <div className="flex items-end justify-center gap-2 pt-2 pb-1">
                            {podiumEntries.map((entry) => {
                                const medal = getMedalStyle(entry.rank);
                                const size = entry.rank === 1 ? 'h-24' : entry.rank === 2 ? 'h-20' : 'h-16';
                                const rewardLabels: Record<number, string> = {
                                    1: '+500 XP / +250 Coins',
                                    2: '+300 XP / +150 Coins',
                                    3: '+150 XP / +75 Coins',
                                };

                                return (
                                    <div key={`${entry.userId ?? entry.name}-${entry.rank}`} className="flex flex-col items-center flex-1 max-w-[120px]">
                                        <div className={`text-xs mb-1 font-black ${medal.text}`}>{medal.icon}</div>
                                        <p className={`text-xs font-black ${medal.text} mb-0.5 text-center truncate w-full`}>{entry.name}</p>
                                        <p className="text-white/30 text-[9px] font-bold uppercase mb-0.5">
                                            {getRankTier(entry.level).name}
                                        </p>
                                        <p className="text-amber-400/70 text-[8px] font-bold mb-1.5">
                                            {rewardLabels[entry.rank]}
                                        </p>
                                        <div className={`w-full ${size} bg-gradient-to-t ${medal.bg} border ${medal.border} rounded-t-xl flex items-start justify-center pt-2 px-1`}>
                                            <span className={`text-sm font-black ${medal.text} text-center`}>
                                                {entry.value.toLocaleString()} {metricLabel}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
                            <div className="grid grid-cols-[50px_1fr_auto] gap-2 px-4 py-2 border-b border-white/10 text-[9px] text-white/30 uppercase font-bold tracking-widest">
                                <span>Rank</span>
                                <span>Player</span>
                                <span className="text-right">{metricLabel}</span>
                            </div>

                            {data.map((entry) => {
                                const rank = getRankTier(entry.level);

                                return (
                                    <div
                                        key={`${entry.userId ?? entry.name}-${entry.rank}-${activeTab}`}
                                        className={`grid grid-cols-[50px_1fr_auto] gap-2 px-4 py-2 items-center transition-colors ${
                                            entry.isCurrentUser
                                                ? 'bg-indigo-500/20 border-l-4 border-indigo-400'
                                                : 'hover:bg-white/5 border-l-4 border-transparent'
                                        }`}
                                    >
                                        <span className={`font-black text-xs ${entry.isCurrentUser ? 'text-indigo-300' : 'text-white/40'}`}>
                                            #{entry.rank}
                                        </span>
                                        <div className="min-w-0">
                                            <span className={`font-bold text-xs ${entry.isCurrentUser ? 'text-indigo-200' : 'text-white/80'}`}>
                                                {entry.name}
                                            </span>
                                            <span className="text-[9px] ml-2 font-bold uppercase" style={{ color: rank.color }}>
                                                Lv.{entry.level} {rank.name}
                                            </span>
                                        </div>
                                        <span className={`font-black text-xs text-right ${entry.isCurrentUser ? 'text-indigo-300' : 'text-white/60'}`}>
                                            {entry.value.toLocaleString()}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}

                {!leaderboards.isLoading && data.length === 0 && (
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-10 text-center">
                        <h2 className="text-sm font-black text-white">No real users found yet</h2>
                        <p className="mt-2 text-xs text-white/50">
                            Once users have profile records, their saved XP and coins will appear here.
                        </p>
                    </div>
                )}

                <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 backdrop-blur-xl border border-amber-500/20 rounded-xl p-4">
                    <h3 className="text-xs font-black text-amber-300 uppercase tracking-wider mb-2">
                        Weekly Rewards for Top Performers
                    </h3>
                    <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="bg-white/5 rounded-lg p-2 border border-amber-500/20">
                            <div className="text-amber-300 text-[10px] font-bold">1st Place</div>
                            <div className="text-white/50 text-[8px] mt-0.5">+500 XP / +250 Coins</div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-2 border border-gray-400/20">
                            <div className="text-gray-300 text-[10px] font-bold">2nd Place</div>
                            <div className="text-white/50 text-[8px] mt-0.5">+300 XP / +150 Coins</div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-2 border border-orange-500/20">
                            <div className="text-orange-300 text-[10px] font-bold">3rd Place</div>
                            <div className="text-white/50 text-[8px] mt-0.5">+150 XP / +75 Coins</div>
                        </div>
                    </div>
                </div>

                <div className="text-center py-4">
                    <p className="text-white/20 text-xs">
                        Keep playing to climb the ranks. Rankings update from saved profile stats.
                    </p>
                </div>
            </div>
        </div>
    );
}
