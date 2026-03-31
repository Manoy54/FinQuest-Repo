import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { AnimatedBackground } from '../games/MoneytaryMasteryComponents';
import { getRankTier } from '../../utils/levelSystem';

type TabType = 'xp' | 'coins';

interface LeaderboardEntry {
    rank: number;
    name: string;
    level: number;
    value: number;
    isCurrentUser?: boolean;
}

const xpLeaderboard: LeaderboardEntry[] = [
    { rank: 1, name: 'Carlos Reyes', level: 52, value: 48750 },
    { rank: 2, name: 'Sofia Cruz', level: 47, value: 42300 },
    { rank: 3, name: 'Marco Bautista', level: 44, value: 39100 },
    { rank: 4, name: 'Isabella Torres', level: 38, value: 33450 },
    { rank: 5, name: 'Miguel Fernandez', level: 35, value: 29800 },
    { rank: 6, name: 'Patricia Villanueva', level: 32, value: 26200 },
    { rank: 7, name: 'Juan dela Cruz', level: 28, value: 22100 },
    { rank: 8, name: 'Ana Garcia', level: 25, value: 19500 },
    { rank: 9, name: 'Jose Rizal Jr.', level: 21, value: 16800 },
    { rank: 10, name: 'Maria Santos', level: 18, value: 14200 },
    { rank: 11, name: 'Rafael Mendoza', level: 15, value: 11500 },
    { rank: 12, name: 'Camille Aquino', level: 12, value: 9200 },
    { rank: 25, name: 'You', level: 1, value: 0, isCurrentUser: true },
];

const coinsLeaderboard: LeaderboardEntry[] = [
    { rank: 1, name: 'Sofia Cruz', level: 47, value: 15200 },
    { rank: 2, name: 'Carlos Reyes', level: 52, value: 13800 },
    { rank: 3, name: 'Isabella Torres', level: 38, value: 11500 },
    { rank: 4, name: 'Marco Bautista', level: 44, value: 10200 },
    { rank: 5, name: 'Patricia Villanueva', level: 32, value: 8900 },
    { rank: 6, name: 'Juan dela Cruz', level: 28, value: 7600 },
    { rank: 7, name: 'Miguel Fernandez', level: 35, value: 6800 },
    { rank: 8, name: 'Ana Garcia', level: 25, value: 5500 },
    { rank: 9, name: 'Maria Santos', level: 18, value: 4200 },
    { rank: 10, name: 'Jose Rizal Jr.', level: 21, value: 3800 },
    { rank: 11, name: 'Rafael Mendoza', level: 15, value: 2900 },
    { rank: 12, name: 'Camille Aquino', level: 12, value: 2100 },
    { rank: 30, name: 'You', level: 1, value: 0, isCurrentUser: true },
];

function getMedalStyle(rank: number): { bg: string; border: string; text: string; icon: string } {
    if (rank === 1) return { bg: 'from-amber-500/30 to-yellow-600/30', border: 'border-amber-400/50', text: 'text-amber-300', icon: '🥇' };
    if (rank === 2) return { bg: 'from-gray-300/20 to-gray-400/20', border: 'border-gray-300/40', text: 'text-gray-300', icon: '🥈' };
    if (rank === 3) return { bg: 'from-orange-600/20 to-amber-700/20', border: 'border-orange-500/40', text: 'text-orange-300', icon: '🥉' };
    return { bg: '', border: 'border-white/5', text: 'text-white/60', icon: '' };
}

export function LeaderboardPage() {
    const [activeTab, setActiveTab] = useState<TabType>('xp');
    const data = activeTab === 'xp' ? xpLeaderboard : coinsLeaderboard;

    return (
        <div
            className="min-h-screen relative overflow-hidden flex flex-col items-center"
            style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #1a1a2e 100%)' }}
        >
            <AnimatedBackground />

            <div className="relative z-10 w-full max-w-3xl px-4 py-8 flex flex-col gap-6">
                {/* Back Button */}
                <Link
                    to="/home"
                    className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-bold uppercase tracking-wider w-fit"
                >
                    <FaArrowLeft className="w-3 h-3" /> Back to Home
                </Link>

                {/* Header */}
                <div className="text-center">
                    <h1 className="text-4xl font-black text-white mb-2 tracking-tight">🏆 Leaderboards</h1>
                    <p className="text-white/40 text-sm">Top performers in FinQuest — Top 3 earn bonus rewards!</p>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10">
                    {(['xp', 'coins'] as TabType[]).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 ${
                                activeTab === tab
                                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                                    : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                            }`}
                        >
                            {tab === 'xp' ? '⚡ Highest XP' : '🪙 Most Coins'}
                        </button>
                    ))}
                </div>

                {/* Top 3 Podium */}
                <div className="flex items-end justify-center gap-3 pt-4 pb-2">
                    {[data[1], data[0], data[2]].map((entry, i) => {
                        const order = [2, 1, 3][i];
                        const medal = getMedalStyle(order);
                        const size = order === 1 ? 'h-36' : order === 2 ? 'h-28' : 'h-24';

                        const rewardLabels: Record<number, string> = { 1: '+500 XP • +250 🪙', 2: '+300 XP • +150 🪙', 3: '+150 XP • +75 🪙' };

                        return (
                            <div key={entry.rank} className="flex flex-col items-center flex-1 max-w-[140px]">
                                <div className="text-3xl mb-2">{medal.icon}</div>
                                <p className={`text-sm font-black ${medal.text} mb-1 text-center truncate w-full`}>{entry.name}</p>
                                <p className="text-white/30 text-[10px] font-bold uppercase mb-1">
                                    {getRankTier(entry.level).name}
                                </p>
                                <p className="text-amber-400/70 text-[9px] font-bold mb-2">
                                    {rewardLabels[order]}
                                </p>
                                <div className={`w-full ${size} bg-gradient-to-t ${medal.bg} border ${medal.border} rounded-t-2xl flex items-start justify-center pt-4`}>
                                    <span className={`text-lg font-black ${medal.text}`}>
                                        {entry.value.toLocaleString()} {activeTab === 'xp' ? 'XP' : '🪙'}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Full List */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden">
                    <div className="grid grid-cols-[60px_1fr_auto] gap-2 px-5 py-3 border-b border-white/10 text-[10px] text-white/30 uppercase font-bold tracking-widest">
                        <span>Rank</span>
                        <span>Player</span>
                        <span className="text-right">{activeTab === 'xp' ? 'XP' : 'Coins'}</span>
                    </div>

                    {data.slice(3).map((entry, i) => {
                        const isUser = entry.isCurrentUser;
                        const rank = getRankTier(entry.level);
                        const showGap = i > 0 && entry.rank - data[i + 2].rank > 1;

                        return (
                            <div key={entry.rank}>
                                {showGap && (
                                    <div className="text-center py-2 text-white/20 text-xs">• • •</div>
                                )}
                                <div className={`grid grid-cols-[60px_1fr_auto] gap-2 px-5 py-3 items-center transition-colors ${
                                    isUser
                                        ? 'bg-indigo-500/20 border-l-4 border-indigo-400'
                                        : 'hover:bg-white/5 border-l-4 border-transparent'
                                }`}>
                                    <span className={`font-black text-sm ${isUser ? 'text-indigo-300' : 'text-white/40'}`}>
                                        #{entry.rank}
                                    </span>
                                    <div>
                                        <span className={`font-bold text-sm ${isUser ? 'text-indigo-200' : 'text-white/80'}`}>
                                            {entry.name}
                                        </span>
                                        <span className="text-[10px] ml-2 font-bold uppercase" style={{ color: rank.color }}>
                                            {rank.icon} Lv.{entry.level}
                                        </span>
                                    </div>
                                    <span className={`font-black text-sm text-right ${isUser ? 'text-indigo-300' : 'text-white/60'}`}>
                                        {entry.value.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Rewards Info */}
                <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 backdrop-blur-xl border border-amber-500/20 rounded-2xl p-5">
                    <h3 className="text-sm font-black text-amber-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                        🎁 Weekly Rewards for Top Performers
                    </h3>
                    <div className="grid grid-cols-3 gap-3 text-center">
                        <div className="bg-white/5 rounded-xl p-3 border border-amber-500/20">
                            <div className="text-xl mb-1">🥇</div>
                            <div className="text-amber-300 text-xs font-bold">1st Place</div>
                            <div className="text-white/50 text-[10px] mt-1">+500 XP • +250 Coins</div>
                        </div>
                        <div className="bg-white/5 rounded-xl p-3 border border-gray-400/20">
                            <div className="text-xl mb-1">🥈</div>
                            <div className="text-gray-300 text-xs font-bold">2nd Place</div>
                            <div className="text-white/50 text-[10px] mt-1">+300 XP • +150 Coins</div>
                        </div>
                        <div className="bg-white/5 rounded-xl p-3 border border-orange-500/20">
                            <div className="text-xl mb-1">🥉</div>
                            <div className="text-orange-300 text-xs font-bold">3rd Place</div>
                            <div className="text-white/50 text-[10px] mt-1">+150 XP • +75 Coins</div>
                        </div>
                    </div>
                </div>

                {/* Motivational Footer */}
                <div className="text-center py-4">
                    <p className="text-white/20 text-xs">
                        🎮 Keep playing to climb the ranks! Rewards are distributed weekly.
                    </p>
                </div>
            </div>
        </div>
    );
}
