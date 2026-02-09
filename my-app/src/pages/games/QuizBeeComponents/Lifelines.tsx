
interface LifelinesProps {
    lifelines: {
        skip: boolean;
    };
    onUseLifeline: (type: 'skip') => void;
    disabled: boolean;
}

export function Lifelines({ lifelines, onUseLifeline, disabled }: LifelinesProps) {
    const getButtonStyle = (isActive: boolean) => ({
        background: isActive
            ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
            : 'rgba(255, 255, 255, 0.05)',
        opacity: isActive ? 1 : 0.4,
        cursor: isActive && !disabled ? 'pointer' : 'not-allowed',
        transform: isActive && !disabled ? 'scale(1)' : 'scale(0.95)',
        boxShadow: isActive ? '0 4px 15px rgba(37, 99, 235, 0.4)' : 'none'
    });

    return (
        <div className="flex gap-3 justify-center mb-6">
            <button
                onClick={() => !disabled && lifelines.skip && onUseLifeline('skip')}
                disabled={disabled || !lifelines.skip}
                className="flex flex-col items-center justify-center w-16 h-16 rounded-full border border-white/10 transition-all duration-300 hover:scale-105 active:scale-95"
                style={getButtonStyle(lifelines.skip)}
                title="Skip: Move to next question"
            >
                <span className="text-2xl">⏭️</span>
            </button>
        </div>
    );
}
