

import { Link } from 'react-router-dom';
import type { Difficulty } from './types';

interface QuizBeeCompleteProps {
    score: number;
    highScore: number;
    tier: Difficulty;
    isVictory: boolean;
    onRestart: () => void;
    exp: number;
    coins: number;
}

export function QuizBeeComplete({ score, highScore, tier, isVictory, onRestart, exp, coins }: QuizBeeCompleteProps) {
    const getRank = () => {
        if (isVictory) return 'GRANDMASTER';
        if (tier === 'EXPERT') return 'SCHOLAR'; // Reached Expert but failed
        if (tier === 'INTERMEDIATE') return 'NOVICE'; // Reached Intermediate but failed
        return 'BEGINNER'; // Failed at Beginner
    };

    const rank = getRank();

    const getRankColor = () => {
        switch (rank) {
            case 'GRANDMASTER': return '#f59e0b'; // Amber
            case 'SCHOLAR': return '#3b82f6'; // Blue
            default: return '#9ca3af'; // Gray
        }
    };

    return (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50">
            <div className="bg-gray-900 border border-white/10 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl relative overflow-hidden">
                {/* Confetti/Particles would go here */}

                <div className="text-6xl mb-4">{isVictory ? '👑' : '📊'}</div>

                <h2 className="text-3xl font-bold text-white mb-2">
                    {isVictory ? 'Congratulations!' : 'Game Over'}
                </h2>

                <div className="mb-6">
                    <p className="text-gray-400 text-sm uppercase tracking-wider">Rank Achieved</p>
                    <p className="text-2xl font-bold" style={{ color: getRankColor() }}>{rank}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                        <p className="text-gray-400 text-[10px] uppercase tracking-wider">Final Score</p>
                        <p className="text-xl font-mono font-bold text-white">{score}</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                        <p className="text-gray-400 text-[10px] uppercase tracking-wider">High Score</p>
                        <p className="text-xl font-mono font-bold text-amber-400">{highScore}</p>
                    </div>
                    <div className="bg-blue-500/10 rounded-xl p-3 border border-blue-500/20">
                        <p className="text-blue-400/70 text-[100px] uppercase tracking-wider" style={{ fontSize: '10px' }}>EXP Gained</p>
                        <p className="text-xl font-mono font-bold text-blue-400">+{exp}</p>
                    </div>
                    <div className="bg-amber-500/10 rounded-xl p-3 border border-amber-500/20">
                        <p className="text-amber-400/70 text-[100px] uppercase tracking-wider" style={{ fontSize: '10px' }}>Coins Gained</p>
                        <p className="text-xl font-mono font-bold text-amber-400">+{coins}</p>
                    </div>
                </div>

                <button
                    onClick={onRestart}
                    className="w-full py-3 rounded-xl font-bold text-black mb-3 transition-transform hover:scale-105"
                    style={{ background: 'linear-gradient(to right, #fbbf24, #d97706)' }}
                >
                    Play Again
                </button>

                <Link
                    to="/games"
                    className="block w-full py-3 rounded-xl font-bold text-white/50 hover:text-white hover:bg-white/5 transition-colors"
                >
                    Back to Games
                </Link>
            </div>
        </div>
    );
}
