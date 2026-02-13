
import { FaRocket, FaLightbulb, FaBullseye } from 'react-icons/fa';

interface AboutCardProps {
    title: string;
    subtitle: string;
    description: string | string[];
    icon: React.ReactNode;
    gradient: string;
    glowColor: string;
    colSpan?: string;
}

const aboutCards: AboutCardProps[] = [
    {
        title: 'Our Mission',
        subtitle: 'THE PURPOSE',
        description: 'To deliver interactive and enjoyable web-based games that enhance financial literacy, promoting and motivating students to learn.',
        icon: <FaLightbulb />,
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', // Pink/Red
        glowColor: 'rgba(240, 147, 251, 0.4)'
    },
    {
        title: 'Our Vision',
        subtitle: 'THE FUTURE',
        description: 'Revolutionize Financial education by developing game-based web learning platforms that make financial literacy accessible and engaging for all learners.',
        icon: <FaRocket />,
        gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', // Green/Teal
        glowColor: 'rgba(17, 153, 142, 0.4)'
    },
    {
        title: 'Our Goals',
        subtitle: 'OBJECTIVES',
        description: [
            "To enhance learner engagement, motivation and knowledge retention by integrating game mechanics into financial education.",
            "To encourage continuous and self-directed learning through a flexible, user-friendly, and mobile-accessible platform.",
            "To bridge the gap between traditional financial instruction and the learning preferences of digitally oriented students through interactive and enjoyable learning experiences.",
            "To promote positive learning attitudes toward financial literacy by simplifying complex financial concepts through game-based activities.",
            "To support the development of financial awareness, analytical thinking, and responsible financial decision-making applicable to academic and real-life situations."
        ],
        icon: <FaBullseye />,
        gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)', // Orange/Salmon
        glowColor: 'rgba(255, 107, 107, 0.4)',
        colSpan: 'lg:col-span-2'
    }
];

function AboutCard({ card }: { card: AboutCardProps }) {
    return (
        <div
            className={`group relative block w-full h-full min-h-[320px] cursor-default ${card.colSpan || ''}`}
        >
            <div
                className="relative overflow-hidden rounded-3xl p-6 h-full flex flex-col transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-2"
                style={{
                    background: card.gradient,
                    boxShadow: `0 20px 40px ${card.glowColor}, 0 0 0 1px rgba(255,255,255,0.1) inset`
                }}
            >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
                    <div className="absolute inset-0 rounded-full bg-white/30 blur-2xl transform translate-x-8 -translate-y-8" />
                </div>
                <div className="absolute bottom-0 left-0 w-24 h-24 opacity-20">
                    <div className="absolute inset-0 rounded-full bg-white/20 blur-xl transform -translate-x-4 translate-y-4" />
                </div>

                {/* Icon */}
                <div className="relative z-10 mb-4 flex-none">
                    <span className="text-4xl text-white filter drop-shadow-lg group-hover:scale-110 inline-block transition-transform duration-300">
                        {card.icon}
                    </span>
                </div>

                {/* Content */}
                <div className="relative z-10 flex-1 flex flex-col">
                    <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">
                        {card.subtitle}
                    </p>
                    <h3 className="text-white text-xl font-bold mb-4 tracking-tight">
                        {card.title}
                    </h3>

                    <p className="text-white/90 text-sm leading-relaxed mb-4 flex-1">
                        {card.description as string}
                    </p>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300 rounded-3xl" />
            </div>
        </div>
    );
}

export function AboutSection() {
    return (
        <section className="relative z-10 w-full max-w-7xl mx-auto px-6 py-8 mb-8">
            <div className="text-center mb-10">
                <h2 className="text-white/40 text-xs font-bold uppercase tracking-[0.3em] mb-2">
                    Discover FinQuest
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
                {aboutCards.map((card, index) => (
                    <AboutCard key={index} card={card} />
                ))}
            </div>
        </section>
    );
}
