import { FaForwardStep } from 'react-icons/fa6';

interface LifelinesProps {
    onClick: () => void;
    disabled: boolean;
}

export function Lifelines({ onClick, disabled }: LifelinesProps) {
    const buttonStyle = {
        background: !disabled
            ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
            : 'rgba(255, 255, 255, 0.05)',
        opacity: !disabled ? 1 : 0.4,
        cursor: !disabled ? 'pointer' : 'not-allowed',
        transform: !disabled ? 'scale(1)' : 'scale(0.95)',
        boxShadow: !disabled ? '0 4px 15px rgba(37, 99, 235, 0.4)' : 'none'
    };

    return (
        <div className="flex gap-3 justify-center mb-6">
            <button
                onClick={onClick}
                disabled={disabled}
                className="flex items-center justify-center w-14 h-14 rounded-2xl border border-white/10 transition-all duration-300 hover:scale-105 active:scale-95 group relative overflow-hidden"
                style={buttonStyle}
                title="Next: Move to next question"
            >
                {/* Shine effect */}
                {!disabled && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
                )}

                <FaForwardStep className={`text-2xl ${!disabled ? 'text-white' : 'text-white/20'}`} />
            </button>
        </div>
    );
}
