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
        <header className={`w-full shrink-0 z-10 bg-transparent ${className}`} style={{ marginBottom: gap, maxWidth: '100%' }}>

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

            {/* HUD BAR: [Back] [XP Bar] [Help] — 3-column flex */}
            <div className="flex items-center w-full px-3 md:px-6 gap-2 md:gap-4">

                {/* LEFT ZONE — Back button (fixed width) */}
                <div className="w-9 h-9 shrink-0 flex items-center justify-center">
                    {(backPath || onBack) ? (
                        <Link
                            to={backPath || '/home'}
                            onClick={(e) => {
                                if (onBack) {
                                    e.preventDefault();
                                    onBack();
                                }
                            }}
                            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white text-sm"
                            style={{ textDecoration: 'none' }}
                        >
                            ←
                        </Link>
                    ) : (
                        <div className="w-9 h-9" /> /* Spacer for alignment */
                    )}
                </div>

                {/* CENTER ZONE — XP Bar (takes remaining space) */}
                <div className="flex-1 min-w-0">
                    {/* HUD Stats Bar */}
                    {showStats && (
                        <div className="w-full max-w-3xl mx-auto px-2.5 md:px-3 py-1 md:py-1.5 rounded-lg md:rounded-xl relative overflow-hidden flex items-center justify-between gap-2 md:gap-3 shrink-0 transition-all"
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

                            <div className="relative z-10 flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                                {/* Level Badge */}
                                {showBadge && (
                                    <div className="flex items-center gap-2 shrink-0">
                                        <div className={`h-7 md:h-9 rounded-xl bg-black/40 flex flex-col items-center justify-center border border-white/20 shadow-inner backdrop-blur-md ${customLevelLabel ? 'px-1.5 md:px-2 w-auto' : 'w-7 md:w-9'}`}>
                                            {!customLevelLabel && <span className="text-[8px] text-blue-300 font-bold uppercase tracking-wider leading-none mb-0.5">Lvl</span>}
                                            <span className={`font-bold text-white leading-none ${customLevelLabel ? 'text-[10px] md:text-sm' : 'text-xs md:text-sm'}`}>
                                                {customLevelLabel || level}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* Progress Bar */}
                                <div className="flex-1 flex flex-col justify-center min-w-0">
                                    <div className="flex justify-between text-[8px] md:text-[10px] text-blue-100 mb-0.5 md:mb-1 px-0.5 font-medium">
                                        <span>XP Progress</span>
                                        <span>{currentExp.toLocaleString()} / {maxExp.toLocaleString()} XP</span>
                                    </div>
                                    <div className="h-1.5 md:h-2 bg-black/30 rounded-full overflow-hidden p-[1.5px]">
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
                            <div className="relative z-10 flex items-center shrink-0 pl-1.5 md:pl-2 border-l border-white/10">
                                <div className="flex items-center gap-1 bg-black/20 px-1.5 md:px-2 py-0.5 md:py-1 rounded-md md:rounded-lg">
                                    <FaCoins className="text-yellow-400 text-[9px] md:text-[10px]" />
                                    <span className="font-bold text-white text-[10px] md:text-xs">{coins.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* RIGHT ZONE — Children + Help button */}
                <div className={`shrink-0 flex items-center justify-end gap-2 ${children ? '' : 'w-9'}`}>
                    {/* Desktop children (hidden on mobile by consumer) */}
                    {children}
                    {onHowToPlay && (
                        <button
                            onClick={onHowToPlay}
                            className="w-9 h-9 shrink-0 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 shadow-lg backdrop-blur-md group"
                            title="How to Play"
                        >
                            <span className="text-sm group-hover:scale-110 transition-transform">❓</span>
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}
