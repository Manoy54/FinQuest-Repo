interface GameControlsProps {
    onKnew: () => void;
    onDidntKnow: () => void;
}

export function GameControls({
    onKnew,
    onDidntKnow
}: GameControlsProps) {
    return (
        <div className="relative z-10 p-4 shrink-0">
            <div className="max-w-2xl mx-auto flex justify-center gap-4">
                <button
                    onClick={onDidntKnow}
                    className="flex-1 max-w-[200px] py-3 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105"
                    style={{
                        background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                        color: '#fff',
                        boxShadow: '0 10px 30px rgba(239, 68, 68, 0.3)'
                    }}
                >
                    ❌ Didn't Know
                </button>
                <button
                    onClick={onKnew}
                    className="flex-1 max-w-[200px] py-3 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105"
                    style={{
                        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                        color: '#fff',
                        boxShadow: '0 10px 30px rgba(34, 197, 94, 0.3)'
                    }}
                >
                    ✓ Knew It!
                </button>
            </div>
        </div>
    );
}

// Navigation buttons component to overlay on flashcard
interface NavigationButtonsProps {
    currentCardIndex: number;
    onPrevCard: () => void;
    onNextCard: () => void;
}

export function NavigationButtons({
    currentCardIndex,
    onPrevCard,
    onNextCard
}: NavigationButtonsProps) {
    return (
        <>
            {/* Previous button - positioned on left side */}
            <button
                onClick={(e) => { e.stopPropagation(); onPrevCard(); }}
                disabled={currentCardIndex === 0}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full font-medium transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed hover:scale-110 flex items-center justify-center"
                style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    color: '#fff',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    backdropFilter: 'blur(10px)'
                }}
            >
                ←
            </button>

            {/* Skip button - positioned on right side */}
            <button
                onClick={(e) => { e.stopPropagation(); onNextCard(); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full font-medium transition-all duration-300 hover:scale-110 flex items-center justify-center"
                style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    color: '#fff',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    backdropFilter: 'blur(10px)'
                }}
            >
                →
            </button>
        </>
    );
}
