import { FaCoins } from 'react-icons/fa6';

interface LevelProgressProps {
    currentExp: number;
    level: number;
    expToNextLevel: number;
    progress: number;
    coins: number;
    totalLevel: number;
}

export function LevelProgress({ currentExp, level, expToNextLevel, progress, coins, totalLevel }: LevelProgressProps) {
    // Level Titles


    // Calculate remaining XP
    // Calculate target XP for current level completion
    const nextLevelTarget = totalLevel * expToNextLevel;

    // Calculate remaining XP


    return (
        <div className="w-full max-w-3xl mx-auto mb-1 px-3 py-1.5 rounded-xl relative overflow-hidden flex items-center justify-between gap-3 shrink-0 transition-all"
            style={{
                background: 'linear-gradient(135deg, #6d28d9 0%, #4f46e5 100%)',
                boxShadow: '0 4px 15px -3px rgba(79, 70, 229, 0.4)',
                border: '1px solid rgba(255,255,255,0.1)'
            }}
        >
            {/* Background patterns */}
            <div className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }}
            />

            <div className="relative z-10 flex items-center gap-3 flex-1">
                {/* Left: Level Badge & Title */}
                <div className="flex items-center gap-2 shrink-0">
                    <div className="w-9 h-9 rounded-xl bg-white/10 flex flex-col items-center justify-center border border-white/20 shadow-inner backdrop-blur-sm">
                        <span className="text-[8px] text-blue-200 font-bold uppercase tracking-wider leading-none mb-0.5">Lvl</span>
                        <span className="font-bold text-white text-sm leading-none">{level}</span>
                    </div>

                </div>

                {/* Middle: Progress Bar */}
                <div className="flex-1 flex flex-col justify-center">
                    <div className="flex justify-between text-[10px] text-blue-100 mb-1 px-0.5 font-medium">
                        <span>XP Progress</span>
                        <span>{currentExp.toLocaleString()} / {nextLevelTarget} XP</span>
                    </div>
                    <div className="h-2 bg-black/30 rounded-full overflow-hidden p-[1.5px]">
                        <div
                            className="h-full rounded-full transition-all duration-1000 ease-out shadow-sm"
                            style={{
                                background: 'linear-gradient(90deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
                                width: `${progress}%`
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Right: Coins/Stats (Compact Vertical) */}
            <div className="relative z-10 flex flex-col items-end gap-0.5 shrink-0 pl-2 border-l border-white/10">
                <div className="flex items-center gap-1.5 bg-black/20 px-2 py-1 rounded-lg">
                    <FaCoins className="text-yellow-400 text-[10px]" />
                    <span className="font-bold text-white text-xs">{coins.toLocaleString()}</span>
                </div>
            </div>
        </div >
    );
}
