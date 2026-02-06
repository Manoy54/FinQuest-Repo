export function AnimatedBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Glowing orbs */}
            <div className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-10"
                style={{
                    background: 'radial-gradient(circle, #ffd700 0%, transparent 70%)',
                    filter: 'blur(60px)',
                    animation: 'pulse 8s ease-in-out infinite'
                }}
            />
            <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-10"
                style={{
                    background: 'radial-gradient(circle, #ff6b35 0%, transparent 70%)',
                    filter: 'blur(80px)',
                    animation: 'pulse 10s ease-in-out infinite reverse'
                }}
            />

            {/* Floating coins */}
            {[...Array(15)].map((_, i) => (
                <div
                    key={i}
                    className="absolute text-2xl"
                    style={{
                        left: `${(i * 7) % 100}%`,
                        top: `${(i * 11) % 100}%`,
                        opacity: 0.15,
                        animation: `float ${8 + (i % 5)}s ease-in-out infinite`,
                        animationDelay: `${(i % 5)}s`
                    }}
                >
                    💰
                </div>
            ))}
        </div>
    );
}

export function AnimatedParticles() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
                <div
                    key={i}
                    className="absolute rounded-full opacity-20"
                    style={{
                        width: `${(i % 10) + 5}px`,
                        height: `${(i % 10) + 5}px`,
                        background: `linear-gradient(135deg, #ffd700 0%, #ff6b35 100%)`,
                        left: `${(i * 5) % 100}%`,
                        top: `${(i * 7) % 100}%`,
                        animation: `float ${10 + (i % 10)}s ease-in-out infinite`,
                        animationDelay: `${(i % 5)}s`
                    }}
                />
            ))}
        </div>
    );
}
