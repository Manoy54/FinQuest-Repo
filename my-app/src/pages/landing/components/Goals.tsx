import { useScrollAnimation } from '../hooks/useScrollAnimation';

export function Goals() {
    const heading = useScrollAnimation();
    const goalsRef = useScrollAnimation(0.2);

    const goals = [
        "To enhance learner engagement, motivation and knowledge retention by integrating game mechanics into financial education.",
        "To encourage continuous and self-directed learning through a flexible, user-friendly, and mobile-accessible platform.",
        "To bridge the gap between traditional financial instruction and the learning preferences of digitally oriented students through interactive and enjoyable learning experiences.",
        "To promote positive learning attitudes toward financial literacy by simplifying complex financial concepts through game-based activities.",
        "To support the development of financial awareness, analytical thinking, and responsible financial decision-making applicable to academic and real-life situations."
    ];

    return (
        <section className="py-24 px-4 text-white relative">
            {/* Visual Separator */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>

            <div className="max-w-4xl mx-auto">
                <div
                    ref={heading.ref}
                    className="text-center mb-16 transition-all duration-700 ease-out"
                    style={{
                        opacity: heading.isVisible ? 1 : 0,
                        transform: heading.isVisible ? 'translateY(0)' : 'translateY(20px)',
                    }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 uppercase relative inline-block">
                        OUR GOALS
                        <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-1 bg-blue-500 rounded-full"></span>
                    </h2>
                </div>

                <div
                    ref={goalsRef.ref}
                    className="space-y-8 pl-6 border-l border-white/10"
                    style={{
                        opacity: goalsRef.isVisible ? 1 : 0,
                        transform: goalsRef.isVisible ? 'translateY(0)' : 'translateY(20px)',
                        transitionDelay: '200ms',
                    }}
                >
                    {goals.map((goal, i) => (
                        <div key={i} className="relative group">
                            <div className="absolute -left-[29px] top-2.5 w-1.5 h-1.5 rounded-full bg-blue-500/50 group-hover:bg-blue-400 group-hover:scale-125 transition-all duration-300"></div>
                            <p className="text-blue-100/80 leading-relaxed text-lg font-light tracking-wide group-hover:text-white transition-colors duration-300">
                                {goal}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
