interface ProgressBarProps {
    currentIndex: number;
    totalCards: number;
    progress: number;
}

export function ProgressBar({ currentIndex, totalCards, progress }: ProgressBarProps) {
    return (
        <div className="relative z-10 px-8 mt-12 mb-2 shrink-0">
            <div className="max-w-2xl mx-auto">
                <div className="flex justify-center gap-4 text-sm text-gray-400 mb-2 font-medium tracking-wide">
                    <span>Card {currentIndex + 1} of {totalCards}</span>
                    <span className="opacity-50">|</span>
                    <span>{Math.round(progress)}% Complete</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden"
                    style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                >
                    <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                            width: `${progress}%`,
                            background: 'linear-gradient(90deg, #ffd700 0%, #ff6b35 100%)'
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
