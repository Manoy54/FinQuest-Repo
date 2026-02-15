import { FaMoneyBillWave, FaSearch, FaPuzzlePiece, FaTrophy } from 'react-icons/fa';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export function Features() {
    const heading = useScrollAnimation();
    const mmCard = useScrollAnimation(0.2);
    const ddCard = useScrollAnimation(0.2);
    const ccCard = useScrollAnimation(0.2);
    const quizCard = useScrollAnimation(0.2);

    const features = [
        {
            ref: mmCard,
            icon: <FaMoneyBillWave className="text-2xl" />,
            color: "text-emerald-400",
            bg: "bg-emerald-400/20",
            title: "Monetary Mastery",
            subtitle: "Flashcard Learning",
            desc: "Master essential financial terms and concepts through our interactive flashcard system. Test your knowledge and build a strong foundation."
        },
        {
            ref: ddCard,
            icon: <FaSearch className="text-2xl" />,
            color: "text-blue-400",
            bg: "bg-blue-400/20",
            title: "Data Diver",
            subtitle: "Word Search",
            desc: "Sharpen your observation skills by finding hidden financial vocabulary in a grid. Race against time to discover all the terms."
        },
        {
            ref: ccCard,
            icon: <FaPuzzlePiece className="text-2xl" />,
            color: "text-purple-400",
            bg: "bg-purple-400/20",
            title: "Corporate Climb",
            subtitle: "Vocabulary Puzzle",
            desc: "Challenge your understanding by solving crossword clues related to finance. A perfect blend of logic and learning."
        },
        {
            ref: quizCard,
            icon: <FaTrophy className="text-2xl" />,
            color: "text-amber-400",
            bg: "bg-amber-400/20",
            title: "Capital Cup",
            subtitle: "Quiz Competition",
            desc: "Compete in high-stakes trivia to prove your financial expertise. Answer correctly to climb the leaderboard and earn rewards."
        }
    ];

    return (
        <section className="py-24 px-4 text-white relative overflow-hidden">
            {/* Background Gradient Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <h2
                    ref={heading.ref}
                    className="text-4xl md:text-5xl font-bold text-center mb-20 transition-all duration-700 ease-out tracking-tight"
                    style={{
                        opacity: heading.isVisible ? 1 : 0,
                        transform: heading.isVisible ? 'translateY(0)' : 'translateY(40px)',
                    }}
                >
                    Game Modes
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            ref={feature.ref.ref}
                            className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl group"
                            style={{
                                opacity: feature.ref.isVisible ? 1 : 0,
                                transform: feature.ref.isVisible ? 'translateY(0)' : 'translateY(40px)',
                                transitionDelay: `${index * 150}ms`,
                            }}
                        >
                            <div className={`w-14 h-14 ${feature.bg} rounded-2xl flex items-center justify-center ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                {feature.icon}
                            </div>

                            <h3 className="text-xl font-bold mb-1">{feature.title}</h3>
                            <p className={`text-sm font-semibold mb-4 ${feature.color}`}>{feature.subtitle}</p>

                            <p className="text-blue-100/80 text-sm leading-relaxed">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
