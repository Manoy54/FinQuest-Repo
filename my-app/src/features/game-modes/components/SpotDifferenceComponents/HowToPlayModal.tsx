interface HowToPlayModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function HowToPlayModal({ isOpen, onClose }: HowToPlayModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div
                className="bg-[#1e293b] border border-white/10 rounded-3xl p-6 md:p-8 max-w-2xl w-full relative shadow-2xl transform transition-all scale-100 overflow-y-auto max-h-[90vh]"
                style={{
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                }}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-xl bg-black/40 text-white/70 hover:text-white hover:bg-black/60 transition-all border border-white/10 z-10"
                >
                    ✕
                </button>

                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        How to Play 🎮
                    </h2>
                    <p className="text-white/60 text-lg">Find the Discrepancies!</p>
                </div>

                {/* Content */}
                <div className="space-y-8">
                    {/* Step 1: The Goal */}
                    <div className="bg-black/20 rounded-2xl p-6 border border-white/5 hover:bg-black/30 transition-colors">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-2xl shrink-0">
                                🎯
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">The Goal</h3>
                                <p className="text-white/70 leading-relaxed">
                                    Compare the <strong>Original Image</strong> with the <strong>Edited Image</strong> and click/tap on the visual differences you spot.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Step 2: Mechanics */}
                    <div className="bg-black/20 rounded-2xl p-6 border border-white/5 hover:bg-black/30 transition-colors">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-2xl shrink-0">
                                🔎
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Precision Matters</h3>
                                <p className="text-white/70 leading-relaxed">
                                    Every wrong click counts against your final bonus. Find all differences in each document to proceed!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Action */}
                <div className="mt-8">
                    <button
                        onClick={onClose}
                        className="w-full py-4 rounded-2xl font-bold text-lg text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-lg hover:shadow-purple-500/25 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                    >
                        Start Finding! 🚀
                    </button>
                </div>
            </div>
        </div>
    );
}
