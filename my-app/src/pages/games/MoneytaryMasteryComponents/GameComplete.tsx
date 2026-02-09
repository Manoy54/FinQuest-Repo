import { Link } from 'react-router-dom';
import { AnimatedParticles } from './AnimatedBackground';

interface GameCompleteProps {
    score: number;
    totalCards: number;
    onRestart: () => void;
    exp?: number;
    coins?: number;
    requiredScore?: number;
    onReplayLevel?: () => void;
    onNextLevel?: () => void;
    nextLevelLabel?: string;
}

export function GameComplete({
    score,
    totalCards,
    onRestart,
    exp,
    coins,
    requiredScore,
    onReplayLevel,
    onNextLevel,
    nextLevelLabel
}: GameCompleteProps) {
    const getResultMessage = () => {
        if (requiredScore && score >= requiredScore) return '🌟 Excellent! Level Complete!';
        if (score >= 7) return '🌟 Excellent! Financial Mastermind!';
        if (score >= 5) return '👍 Good job! Keep learning!';
        return "📚 Keep studying! You'll get better!";
    };

    const getResultColor = () => {
        if (score >= 7) return '#4ade80';
        if (score >= 5) return '#fbbf24';
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
                <p className="text-2xl text-gray-300 mb-2">Your Score</p>
                <p className="text-6xl font-bold text-white mb-6">
                    {score} / {totalCards}
                </p>

                {/* Rewards Section at the center */}
                {(exp !== undefined || coins !== undefined) && (
                    <div className="flex justify-center gap-6 mb-8">
                        {exp !== undefined && (
                            <div className="flex flex-col items-center">
                                <span className="text-blue-400 font-bold text-xl">+{exp} XP</span>
                            </div>
                        )}
                        {coins !== undefined && (
                            <div className="flex flex-col items-center">
                                <span className="text-yellow-400 font-bold text-xl">+{coins} Coins</span>
                            </div>
                        )}
                    </div>
                )}

                <p className="text-xl mb-8" style={{ color: getResultColor() }}>
                    {getResultMessage()}
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                    <button
                        onClick={onRestart}
                        className="px-6 py-3 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105"
                        style={{
                            background: 'linear-gradient(135deg, #ffd700 0%, #ff6b35 100%)',
                            color: '#1a1a2e',
                            boxShadow: '0 10px 30px rgba(255, 215, 0, 0.3)'
                        }}
                    >
                        Play Again
                    </button>

                    {onNextLevel && (
                        <button
                            onClick={onNextLevel}
                            className="px-6 py-3 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105"
                            style={{
                                background: 'linear-gradient(135deg, #4aec8c 0%, #2bd968 100%)',
                                color: '#1a1a2e',
                                boxShadow: '0 10px 30px rgba(74, 222, 128, 0.3)'
                            }}
                        >
                            {nextLevelLabel || 'Next Level'}
                        </button>
                    )}

                    {onReplayLevel && (
                        <button
                            onClick={onReplayLevel}
                            className="px-6 py-3 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105"
                            style={{
                                background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
                                color: 'white',
                                boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)'
                            }}
                        >
                            Replay Level
                        </button>
                    )}

                    <Link
                        to="/"
                        className="px-6 py-3 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105"
                        style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            color: '#fff',
                            border: '2px solid rgba(255, 255, 255, 0.3)',
                            textDecoration: 'none'
                        }}
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
