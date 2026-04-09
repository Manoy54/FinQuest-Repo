

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
                    <p className="text-white/60 text-sm md:text-lg">Master the Financial Grid!</p>
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
                                    Fill in the crossword grid by answering clues related to financial terms and concepts.
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
                                        <span className="text-xs md:text-base">Click on a cell or a clue to highlight it.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-400 font-bold text-xs md:text-base">2.</span>
                                        <span className="text-xs md:text-base">Type your answer. The active direction is highlighted.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-blue-400 font-bold text-xs md:text-base">3.</span>
                                        <span className="text-xs md:text-base">Click same cell to switch direction (Across/Down).</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Step 3: Controls */}
                    <div className="bg-white/5 rounded-xl p-4 md:p-6 border border-white/5 hover:bg-white/10 transition-colors">
                        <div className="flex items-start gap-3 md:gap-4">
                            <div className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-amber-500/20 flex items-center justify-center text-lg md:text-2xl shrink-0">
                                ⌨️
                            </div>
                            <div>
                                <h3 className="text-base md:text-xl font-bold text-white mb-1">Controls</h3>
                                <div className="space-y-1.5 md:space-y-2 text-white/70 text-[10px] md:text-sm">
                                    <p><strong className="text-white">Backspace:</strong> Deletes letter and moves back.</p>
                                    <p><strong className="text-white">Zoom:</strong> Use + / - buttons to adjust the grid size.</p>
                                    <p><strong className="text-white">Check:</strong> Verifies your answers (try to solve it first!).</p>
                                </div>
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
                        Solve the Puzzle 🧩
                    </button>
                </div>
            </div>
        </div>
    );
}
