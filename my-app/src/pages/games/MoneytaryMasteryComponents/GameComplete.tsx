import { Link } from 'react-router-dom';
import { AnimatedParticles } from './AnimatedBackground';

interface GameCompleteProps {
    score: number;
    levelScore?: number; // Optional to support legacy calls if any, but we'll pass it
    exp: number;
    coins: number;
    totalCards: number;
    onRestart: () => void;
    onNextLevel?: () => void;
    nextLevelLabel?: string;
    requiredScore?: number;
    onReplayLevel?: () => void;
    showComingSoon?: boolean;
    comingSoonLabel?: string;
}


export function GameComplete({ score, levelScore, exp, coins, totalCards, onRestart, onNextLevel, nextLevelLabel = "PROCEED TO NEXT LEVEL 🚀", requiredScore = 9, onReplayLevel, showComingSoon, comingSoonLabel }: GameCompleteProps) {
    // defaults to score if levelScore not provided (for first level)
    const currentScore = levelScore ?? score;

    const getResultMessage = () => {
        if (currentScore >= 7) return '🌟 Excellent! Financial Mastermind!';
        if (currentScore >= 5) return '👍 Good job! Keep learning!';
        return "📚 Keep studying! You'll get better!";
    };

    const getResultColor = () => {
        if (currentScore >= 7) return '#4ade80';
        if (currentScore >= 5) return '#fbbf24';
        return '#f87171';
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4"
            style={{
                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #1a1a2e 100%)'
            }}
        >
            <AnimatedParticles />

            <div className="relative z-10 text-center p-12 rounded-3xl"
                style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                }}
            >
                <div className="text-6xl mb-6">🏆</div>
                <h2 className="text-4xl font-bold mb-4"
                    style={{
                        background: 'linear-gradient(135deg, #ffd700 0%, #ff6b35 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}
                >
                    Game Complete!
                </h2>
                <p className="text-2xl text-gray-300 mb-2">Results</p>
                <div className="flex justify-center gap-6 mb-6">
                    <div className="text-center">
                        <p className="text-sm text-gray-400 mb-1">Score</p>
                        <p className="text-4xl font-bold text-white">
                            {score} / {totalCards}
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="text-sm text-gray-400 mb-1">EXP</p>
                        <p className="text-4xl font-bold text-blue-400 border-l border-gray-600 pl-6">
                            +{exp}
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="text-sm text-gray-400 mb-1">Coins</p>
                        <p className="text-4xl font-bold text-yellow-400 border-l border-gray-600 pl-6">
                            +{coins}
                        </p>
                    </div>
                </div>

                <p className="text-xl mb-8" style={{ color: getResultColor() }}>
                    {getResultMessage()}
                </p>

                <div className="flex flex-col items-center gap-4 w-full max-w-md mx-auto">
                    {onNextLevel ? (
                        score >= requiredScore ? (
                            <button
                                onClick={onNextLevel}
                                className="w-full px-8 py-4 text-lg font-bold rounded-xl transition-all duration-300 hover:scale-105"
                                style={{
                                    background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)', // Purple to Indigo
                                    color: '#fff',
                                    boxShadow: '0 10px 30px rgba(139, 92, 246, 0.4)',
                                    border: '1px solid rgba(255, 255, 255, 0.2)'
                                }}
                            >
                                {nextLevelLabel}
                            </button>
                        ) : (
                            <button
                                disabled
                                className="w-full px-8 py-4 text-lg font-bold rounded-xl opacity-70 cursor-not-allowed"
                                style={{
                                    background: 'linear-gradient(135deg, #4b5563 0%, #374151 100%)', // Gray
                                    color: '#9ca3af',
                                    boxShadow: 'none',
                                    border: '1px solid rgba(255, 255, 255, 0.1)'
                                }}
                            >
                                Score {requiredScore}+ to Unlock Next Level 🔒
                            </button>
                        )
                    ) : showComingSoon ? (
                        <button
                            disabled
                            className="w-full px-8 py-4 text-lg font-bold rounded-xl opacity-80 cursor-not-allowed"
                            style={{
                                background: 'linear-gradient(135deg, #374151 0%, #1f2937 100%)',
                                color: '#e5e7eb',
                                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                                border: '1px solid rgba(255, 255, 255, 0.1)'
                            }}
                        >
                            {comingSoonLabel || "COMING SOON 🚀"}
                        </button>
                    ) : null}

                    <div className="flex flex-col gap-3 w-full">
                        {/* Primary Actions Row */}
                        <div className="flex gap-4 justify-center w-full">
                            {onReplayLevel && (
                                <button
                                    onClick={onReplayLevel}
                                    className="flex-1 px-4 py-3 text-base font-semibold rounded-xl transition-all duration-300 hover:scale-105"
                                    style={{
                                        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                                        color: '#fff',
                                        boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)',
                                        border: '1px solid rgba(255, 255, 255, 0.2)'
                                    }}
                                >
                                    Retry Level
                                </button>
                            )}
                            <button
                                onClick={onRestart}
                                className={`flex-1 px-4 py-3 text-base font-semibold rounded-xl transition-all duration-300 hover:scale-105 ${!onReplayLevel ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900' : 'bg-transparent border border-white/20 hover:bg-white/10 text-white'}`}
                                style={!onReplayLevel ? {
                                    background: 'linear-gradient(135deg, #ffd700 0%, #ff6b35 100%)',
                                    boxShadow: '0 10px 30px rgba(255, 215, 0, 0.3)'
                                } : {}}
                            >
                                Restart Game
                            </button>
                        </div>

                        {/* Secondary Action */}
                        <Link
                            to="/home"
                            className="w-full block px-4 py-3 text-base font-semibold rounded-xl transition-all duration-300 hover:scale-105 text-white/70 hover:text-white"
                            style={{
                                textDecoration: 'none'
                            }}
                        >
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
