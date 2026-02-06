interface GameTitleProps {
    title?: string;
    subtitle?: string;
}

export function GameTitle({
    title = "💳 Monetary Mastery",
    subtitle = "Master your financial knowledge"
}: GameTitleProps) {
    return (
        <div className="relative z-10 text-center pt-0 pb-2 shrink-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-2"
                style={{
                    fontFamily: "'Outfit', sans-serif",
                    background: 'linear-gradient(135deg, #ffd700 0%, #ff6b35 50%, #ffd700 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 0 40px rgba(255, 215, 0, 0.3)'
                }}
            >
                {title}
            </h1>
            <p className="text-gray-400 text-lg">{subtitle}</p>
        </div>
    );
}
