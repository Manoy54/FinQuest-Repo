import { Link } from 'react-router-dom';
import { AnimatedParticles } from './AnimatedBackground';

interface GameCompleteProps {
    score: number;
    totalCards: number;
    onRestart: () => void;
}

export function GameComplete({ score, totalCards, onRestart }: GameCompleteProps) {
    const getResultMessage = () => {
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
                <p className="text-xl mb-8" style={{ color: getResultColor() }}>
                    {getResultMessage()}
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                    <button
                        onClick={onRestart}
                        className="px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105"
                        style={{
                            background: 'linear-gradient(135deg, #ffd700 0%, #ff6b35 100%)',
                            color: '#1a1a2e',
                            boxShadow: '0 10px 30px rgba(255, 215, 0, 0.3)'
                        }}
                    >
                        Play Again
                    </button>
                    <Link
                        to="/"
                        className="px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105"
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
