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
    gap?: string | number;
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
    className = '',
    gap = '12px'
}: HUDProps) {
    const maxExp = totalLevel ? totalLevel * expToNextLevel : expToNextLevel;

    return (
        <header className={`w-full shrink-0 z-10 bg-transparent relative ${className}`} style={{ marginBottom: gap, maxWidth: '100%' }}>

            {/* BACK BUTTON — Fixed top-left, independent of HUD bar */}
            {(backPath || onBack) && (
                <Link
                    to={backPath || '/home'}
                    onClick={(e) => {
                        if (onBack) {
                            e.preventDefault();
                            onBack();
                        }
                    }}
                    className="absolute left-3 md:left-6 top-2.5 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white text-sm z-20"
                    style={{ textDecoration: 'none' }}
                >
                    ←
                </Link>
            )}

            {/* TITLE — Topmost element, always centered above HUD */}
            {showTitle && (
                <div style={{ paddingTop: '10px', paddingBottom: '10px' }} className="text-center">
                    <span className="font-black select-none block"
                        style={{
                            fontSize: 'clamp(22px, 5vw, 28px)',
                            letterSpacing: '0.06em',
                            background: 'linear-gradient(135deg, #ffd700 0%, #ff6b35 50%, #ffd700 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.25))'
                        }}
                    >
                        {title}
                    </span>
                </div>
            )}

            {/* MAIN HUD ROW: Level & XP Progress (Centered) */}
            <div className="flex justify-center w-full px-3 md:px-6 mt-1 overflow-visible">
                <div className="w-full max-w-[85%] md:max-w-xl">
                    {showStats && (
                        <div className="w-full px-3 py-1.5 md:py-2.5 rounded-xl md:rounded-2xl relative overflow-hidden flex items-center gap-3 transition-all"
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

                            <div className="relative z-10 flex items-center gap-2 md:gap-4 flex-1 min-w-0">
                                {/* Level Badge */}
                                {showBadge && (
                                    <div className="flex items-center gap-2 shrink-0">
                                        <div className={`h-9 md:h-11 rounded-xl md:rounded-2xl bg-black/40 flex flex-col items-center justify-center border border-white/20 shadow-inner backdrop-blur-md ${customLevelLabel ? 'px-2.5 md:px-4 w-auto' : 'w-9 md:w-11'}`}>
                                            {!customLevelLabel && <span className="text-[9px] md:text-[10px] text-blue-300 font-bold uppercase tracking-wider leading-none mb-0.5">Lvl</span>}
                                            <span className={`font-bold text-white leading-none ${customLevelLabel ? 'text-xs md:text-sm' : 'text-sm md:text-lg'}`}>
                                                {customLevelLabel || level}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* Progress Bar Area */}
                                <div className="flex-1 flex flex-col justify-center min-w-0">
                                    <div className="flex justify-between text-[10px] md:text-sm text-blue-100 mb-1 px-1 font-bold whitespace-nowrap">
                                        <span>XP Progress</span>
                                        <span>{currentExp.toLocaleString()} / {maxExp.toLocaleString()} XP</span>
                                    </div>
                                    <div className="h-2 md:h-3 bg-black/30 rounded-full overflow-hidden p-[2px]">
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
                        </div>
                    )}
                </div>
            </div>

            {/* SECONDARY ROW: Coins, Children (Timer), and Hints (Centered below HUD) */}
            <div className="flex items-center justify-center gap-3 md:gap-6 mt-3 md:mt-4 w-full px-3">
                
                {/* Coins Counter */}
                <div className="flex items-center gap-2 bg-black/40 px-3 md:px-5 py-1.5 md:py-2.5 rounded-lg md:rounded-xl border border-white/10 backdrop-blur-md shadow-lg">
                    <FaCoins className="text-yellow-400 text-sm md:text-lg" />
                    <span className="font-bold text-white text-sm md:text-lg tracking-tight">{coins.toLocaleString()}</span>
                </div>

                {/* Game Children (like Timer) */}
                {children && (
                    <div className="flex items-center">
                        {children}
                    </div>
                )}

                {/* Help/Hint Button */}
                {onHowToPlay && (
                    <button
                        onClick={onHowToPlay}
                        className="w-9 h-9 md:w-12 md:h-12 shrink-0 rounded-lg md:rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95 shadow-lg backdrop-blur-md border border-white/10 group"
                        title="How to Play"
                    >
                        <span className="text-lg md:text-2xl filter drop-shadow-md">❓</span>
                    </button>
                )}
            </div>
        </header>
    );
}
