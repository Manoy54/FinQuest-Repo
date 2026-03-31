import { useState, useEffect } from 'react';
import { loadStreak, hasCheckedInToday, performCheckIn, getLast7Days, getNextMilestone } from '../../utils/streakSystem';
import { useUserContext } from '../../context/UserContext';

export function StreakTracker() {
    const { addXp, addCoins } = useUserContext();
    const [streak, setStreak] = useState(() => loadStreak());
    const [checkedIn, setCheckedIn] = useState(() => hasCheckedInToday());
    const [last7Days, setLast7Days] = useState(() => getLast7Days());
    const [showReward, setShowReward] = useState<{ xp: number; coins: number; milestone?: string } | null>(null);

    useEffect(() => {
        setStreak(loadStreak());
        setCheckedIn(hasCheckedInToday());
        setLast7Days(getLast7Days());
    }, []);

    const handleCheckIn = () => {
        if (checkedIn) return;

        const result = performCheckIn();
        setStreak(result.streakData);
        setCheckedIn(true);
        setLast7Days(getLast7Days());

        addXp(result.rewards.xp);
        addCoins(result.rewards.coins);

        setShowReward({
            xp: result.rewards.xp,
            coins: result.rewards.coins,
            milestone: result.milestoneLabel,
        });

        setTimeout(() => setShowReward(null), 4000);
    };

    const nextMilestone = getNextMilestone(streak.currentStreak);

    return (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col gap-5 min-w-[280px]">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-white/80 uppercase tracking-wider flex items-center gap-2">
                    <span>🔥</span> Daily Streak
                </h3>
                {streak.longestStreak > 0 && (
                    <span className="text-[10px] text-white/30 font-bold uppercase tracking-wider">
                        Best: {streak.longestStreak}d
                    </span>
                )}
            </div>

            {/* Streak Count */}
            <div className="text-center py-2">
                <div className="text-5xl font-black text-white mb-1" style={{ textShadow: streak.currentStreak >= 3 ? '0 0 20px rgba(251, 191, 36, 0.4)' : 'none' }}>
                    {streak.currentStreak}
                </div>
                <div className="text-white/40 text-xs font-bold uppercase tracking-widest">
                    {streak.currentStreak === 1 ? 'Day Streak' : 'Day Streak'}
                </div>
            </div>

            {/* 7-Day Calendar */}
            <div className="flex justify-between gap-1">
                {last7Days.map((day) => {
                    const isToday = day.date === new Date().toISOString().split('T')[0];
                    return (
                        <div key={day.date} className="flex flex-col items-center gap-1.5 flex-1">
                            <span className={`text-[10px] font-bold uppercase ${isToday ? 'text-amber-400' : 'text-white/30'}`}>
                                {day.label}
                            </span>
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                                    day.checkedIn
                                        ? 'bg-emerald-500/30 border-2 border-emerald-400 text-emerald-300'
                                        : isToday
                                            ? 'bg-white/10 border-2 border-dashed border-amber-400/50 text-amber-400'
                                            : 'bg-white/5 border border-white/10 text-white/20'
                                }`}
                            >
                                {day.checkedIn ? '✓' : isToday ? '?' : '·'}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Check-In Button */}
            <button
                onClick={handleCheckIn}
                disabled={checkedIn}
                className={`w-full py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 ${
                    checkedIn
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 cursor-default'
                        : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-400 hover:to-orange-400 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 hover:-translate-y-0.5 active:translate-y-0'
                }`}
            >
                {checkedIn ? '✓ Checked In Today' : '🔥 Check In Now!'}
            </button>

            {/* Reward Flash */}
            {showReward && (
                <div className="text-center animate-bounce-in">
                    {showReward.milestone && (
                        <p className="text-amber-400 font-black text-sm mb-1 animate-pulse">
                            🎉 {showReward.milestone}
                        </p>
                    )}
                    <div className="flex justify-center gap-2">
                        <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full">
                            +{showReward.xp} XP
                        </span>
                        <span className="text-xs font-bold text-yellow-400 bg-yellow-400/10 px-2.5 py-1 rounded-full">
                            +{showReward.coins} 🪙
                        </span>
                    </div>
                </div>
            )}

            {/* Next Milestone */}
            {nextMilestone && !showReward && (
                <div className="text-center">
                    <p className="text-white/30 text-[10px] font-bold uppercase tracking-wider mb-1">
                        Next milestone in {nextMilestone.days - streak.currentStreak} day{nextMilestone.days - streak.currentStreak !== 1 ? 's' : ''}
                    </p>
                    <div className="flex justify-center gap-2">
                        <span className="text-[10px] text-amber-400/60 font-bold">+{nextMilestone.xp} XP</span>
                        <span className="text-[10px] text-yellow-400/60 font-bold">+{nextMilestone.coins} 🪙</span>
                    </div>
                </div>
            )}
        </div>
    );
}
