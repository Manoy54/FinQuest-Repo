import { FaMoneyBillWave, FaSearch, FaPuzzlePiece, FaTrophy, FaBolt, FaExchangeAlt, FaBinoculars } from 'react-icons/fa';
import { useScrollAnimation } from '../../../../hooks/useScrollAnimation';

export function Features() {
    const { ref: headingRef, isVisible: isHeadingVisible } = useScrollAnimation();
    const mmCard = useScrollAnimation(0.2);
    const ddCard = useScrollAnimation(0.2);
    const ccCard = useScrollAnimation(0.2);
    const quizCard = useScrollAnimation(0.2);
    const speedCard = useScrollAnimation(0.2);
    const coinnectCard = useScrollAnimation(0.2);
    const spotCard = useScrollAnimation(0.2);

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
        },
        {
            ref: speedCard,
            icon: <FaBolt className="text-2xl" />,
            color: "text-rose-400",
            bg: "bg-rose-400/20",
            title: "Speed Round",
            subtitle: "Time Challenge",
            desc: "Answer as many financial questions as you can in 60 seconds! Test your speed and precision under pressure."
        },
        {
            ref: coinnectCard,
            icon: <FaExchangeAlt className="text-2xl" />,
            color: "text-cyan-400",
            bg: "bg-cyan-400/20",
            title: "Coinnect",
            subtitle: "Matching Game",
            desc: "Match financial terms with their correct definitions! A perfect way to reinforce your understanding and vocabulary."
        },
        {
            ref: spotCard,
            icon: <FaBinoculars className="text-2xl" />,
            color: "text-indigo-400",
            bg: "bg-indigo-400/20",
            title: "Spot the Difference",
            subtitle: "Visual Analysis",
            desc: "Compare financial documents and find the discrepancies! Sharpen your eye for detail and identify common errors."
        }
    ];

    return (
        <section className="py-24 px-4 text-white relative overflow-hidden">
            {/* Background Gradient Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <h2
                    ref={headingRef}
                    className="text-4xl md:text-5xl font-bold text-center mb-20 transition-all duration-700 ease-out tracking-tight"
                    style={{
                        opacity: isHeadingVisible ? 1 : 0,
                        transform: isHeadingVisible ? 'translateY(0)' : 'translateY(40px)',
                    }}
                >
                    Game Modes
                </h2>

                <div className="flex flex-wrap justify-center gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            ref={feature.ref.ref}
                            className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-500 ease-out hover:shadow-2xl group w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] xl:w-[calc(25%-1.5rem)]"
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
