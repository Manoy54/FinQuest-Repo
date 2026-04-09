

interface HowToPlayModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function HowToPlayModal({ isOpen, onClose }: HowToPlayModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div
                className="bg-[#1e293b] border border-white/10 rounded-2xl p-4 md:p-8 max-w-[85%] md:max-w-2xl w-full relative shadow-2xl transform transition-all scale-100 overflow-y-auto max-h-[85vh]"
                style={{
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                }}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 text-white/30 hover:text-white hover:bg-white/10 transition-all border border-white/5 z-10"
                >
                    ✕
                </button>

                {/* Header */}
                <div className="text-center mb-5 md:mb-8">
                    <h2 className="text-xl md:text-4xl font-bold text-white mb-1">
                        How to Play 🎮
                    </h2>
                    <p className="text-white/60 text-sm md:text-lg">Hunt for financial terms!</p>
                </div>

                {/* Content */}
                <div className="space-y-4 md:space-y-8">
                    {/* Step 1: The Goal */}
                    <div className="bg-white/5 rounded-xl p-4 md:p-6 border border-white/5 hover:bg-white/10 transition-colors">
                        <div className="flex items-start gap-3 md:gap-4">
                            <div className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-lg md:text-2xl shrink-0">
                                🎯
                            </div>
                            <div>
                                <h3 className="text-base md:text-xl font-bold text-white mb-1">The Goal</h3>
                                <p className="text-white/70 text-xs md:text-base leading-relaxed">
                                    Find all the hidden financial words in the grid. Words can be horizontal, vertical, or diagonal.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Step 2: Game Mechanics */}
                    <div className="bg-white/5 rounded-xl p-4 md:p-6 border border-white/5 hover:bg-white/10 transition-colors">
                        <div className="flex items-start gap-3 md:gap-4">
                            <div className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-lg md:text-2xl shrink-0">
                                👆
                            </div>
                            <div>
                                <h3 className="text-base md:text-xl font-bold text-white mb-1">How to Play</h3>
                                <ul className="space-y-2 md:space-y-3 text-white/70">
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-400 font-bold text-xs md:text-base">1.</span>
                                        <span className="text-xs md:text-base">Look for words from the list on the right.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-400 font-bold text-xs md:text-base">2.</span>
                                        <span className="text-xs md:text-base"><strong>Click and drag</strong> (or click start and end letters) to highlight a word.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-400 font-bold text-xs md:text-base">3.</span>
                                        <span className="text-xs md:text-base">Find all words to complete the level!</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Step 3: Rewards */}
                    <div className="bg-white/5 rounded-xl p-4 md:p-6 border border-white/5 hover:bg-white/10 transition-colors">
                        <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                            <div className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-amber-500/20 flex items-center justify-center text-lg md:text-2xl shrink-0">
                                🏆
                            </div>
                            <h3 className="text-base md:text-xl font-bold text-white">Rewards</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 border-t border-white/5 pt-3 md:pt-4">
                            <div className="bg-black/20 rounded-lg p-3 md:p-4 hover:bg-black/30 transition-colors">
                                <div className="text-purple-400 font-bold mb-1 text-sm md:text-lg flex items-center gap-2">
                                    <span>✨</span> Experience (XP)
                                </div>
                                <p className="text-white/70 text-[10px] md:text-sm leading-relaxed">
                                    Earn XP for every word found. XP unlocks higher difficulty levels.
                                </p>
                            </div>
                            <div className="bg-black/20 rounded-lg p-3 md:p-4 hover:bg-black/30 transition-colors">
                                <div className="text-yellow-400 font-bold mb-1 text-sm md:text-lg flex items-center gap-2">
                                    <span>💰</span> Coins
                                </div>
                                <p className="text-white/70 text-[10px] md:text-sm leading-relaxed">
                                    Earn Coins for every word found. Collect them for your profile!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Action */}
                <div className="mt-6 md:mt-8">
                    <button
                        onClick={onClose}
                        className="w-full py-3 md:py-4 rounded-xl md:rounded-2xl font-bold text-base md:text-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg hover:shadow-blue-500/25 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                    >
                        Start Hunting 🔎
                    </button>
                </div>
            </div>
        </div>
    );
}
