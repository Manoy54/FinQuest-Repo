import React from 'react';
import { FaCoins } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

interface HUDProps {
    // Header Props
    title: string;
    onBack?: () => void;
    backPath?: string;

    // Stats Props
    currentExp: number;
    level?: number;
    expToNextLevel: number;
    progress: number;
    coins: number;
    showBadge?: boolean;
    customLevelLabel?: string;
    totalLevel?: number;

    // Action Props
    onHowToPlay?: () => void;
    children?: React.ReactNode;

    className?: string;
    showTitle?: boolean;
    showStats?: boolean;
}

export function HUD({
    title,
    onBack,
    backPath,
    currentExp,
    level = 1,
    expToNextLevel,
    progress,
    coins,
    showBadge = true,
    customLevelLabel,
    totalLevel,
    onHowToPlay,
    children,
    showTitle = true,
    showStats = true,
    className = ''
}: HUDProps) {
    const maxExp = totalLevel ? totalLevel * expToNextLevel : expToNextLevel;

    return (
        <header className={`w-full h-24 relative shrink-0 z-20 bg-transparent ${className}`}>
            {/* Left: Back + Title */}
            <div className="absolute left-8 top-1/2 -translate-y-1/2 flex items-center gap-4 z-20">
                {(backPath || onBack) && (
                    <Link
                        to={backPath || '/home'}
                        onClick={(e) => {
                            if (onBack) {
                                e.preventDefault();
                                onBack();
                            }
                        }}
                        className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white"
                        style={{ textDecoration: 'none' }}
                    >
                        ←
                    </Link>
                )}
                {showTitle && (
                    <h1 className="text-sm md:text-base font-black tracking-tight font-['Outfit'] drop-shadow-sm select-none"
                        style={{
                            background: 'linear-gradient(135deg, #ffd700 0%, #ff6b35 50%, #ffd700 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.2))'
                        }}
                    >
                        {title}
                    </h1>
                )}
            </div>

            {/* Center: HUD Stats - ABSOLUTE POSITIONED FOR EXACT CENTER */}
            <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl px-4 flex justify-center pointer-events-none z-10 ml-2 ${!showStats ? 'hidden' : ''}`}>
                <div className="w-full max-w-3xl mx-auto px-3 py-1.5 rounded-xl relative overflow-hidden flex items-center justify-between gap-3 shrink-0 transition-all pointer-events-auto"
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
                        {/* Level Badge */}
                        {showBadge && (
                            <div className="flex items-center gap-2 shrink-0">
                                <div className={`h-9 rounded-xl bg-white/10 flex flex-col items-center justify-center border border-white/20 shadow-inner backdrop-blur-sm ${customLevelLabel ? 'px-2 w-auto' : 'w-9'}`}>
                                    {!customLevelLabel && <span className="text-[8px] text-blue-200 font-bold uppercase tracking-wider leading-none mb-0.5">Lvl</span>}
                                    <span className={`font-bold text-white leading-none ${customLevelLabel ? 'text-sm' : 'text-sm'}`}>
                                        {customLevelLabel || level}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Progress Bar */}
                        <div className="flex-1 flex flex-col justify-center">
                            <div className="flex justify-between text-[10px] text-blue-100 mb-1 px-0.5 font-medium">
                                <span>XP Progress</span>
                                <span>{currentExp.toLocaleString()} / {maxExp.toLocaleString()} XP</span>
                            </div>
                            <div className="h-2 bg-black/30 rounded-full overflow-hidden p-[1.5px]">
                                <div
                                    className="h-full rounded-full transition-all duration-1000 ease-out shadow-sm"
                                    style={{
                                        background: 'linear-gradient(90deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
                                        width: `${Math.min(100, Math.max(0, progress))}%`
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Coins */}
                    <div className="relative z-10 flex flex-col items-end gap-0.5 shrink-0 pl-2 border-l border-white/10">
                        <div className="flex items-center gap-1.5 bg-black/20 px-2 py-1 rounded-lg">
                            <FaCoins className="text-yellow-400 text-[10px]" />
                            <span className="font-bold text-white text-xs">{coins.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: Controls + Help */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 flex items-center justify-end gap-4 z-20">
                {children}

                {onHowToPlay && (
                    <button
                        onClick={onHowToPlay}
                        className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all hover:scale-105 active:scale-95 shadow-lg backdrop-blur-sm"
                        title="How to Play"
                    >
                        <span className="text-2xl">❓</span>
                    </button>
                )}
            </div>
        </header>
    );
}
