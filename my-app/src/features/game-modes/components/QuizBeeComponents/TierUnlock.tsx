

import type { Difficulty } from './types';

interface TierUnlockProps {
    nextTier: Difficulty;
    onContinue: () => void;
}

export function TierUnlock({ nextTier, onContinue }: TierUnlockProps) {
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50">
            <div className="bg-gray-900 border border-amber-500/30 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl transform animate-bounce-in">
                <div className="text-6xl mb-4">🔓</div>
                <h2 className="text-2xl font-bold text-white mb-2">Level Complete!</h2>
                <p className="text-gray-300 mb-6">
                    You've unlocked <span className="text-amber-400 font-bold">{nextTier}</span> Mode.
                </p>
                <button
                    onClick={onContinue}
                    className="w-full py-3 rounded-xl font-bold text-black transition-transform hover:scale-105 shadow-[0_0_20px_rgba(251,191,36,0.4)]"
                    style={{ background: 'linear-gradient(to right, #fbbf24, #f59e0b)' }}
                >
                    Continue
                </button>
            </div>
        </div>
    );
}
