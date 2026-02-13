import { FaGamepad, FaBrain, FaChartLine, FaGraduationCap } from 'react-icons/fa';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export function HowToPlay() {
    const heading = useScrollAnimation();
    const step0 = useScrollAnimation(0.2);
    const step1 = useScrollAnimation(0.2);
    const step2 = useScrollAnimation(0.2);
    const step3 = useScrollAnimation(0.2);
    const stepRefs = [step0, step1, step2, step3];

    const steps = [
        {
            id: 1,
            icon: <FaGamepad />,
            title: "Select Mode",
            description: "Choose from our 4 unique game modes."
        },
        {
            id: 2,
            icon: <FaBrain />,
            title: "Accept Challenge",
            description: "Test your skills with varied mechanics."
        },
        {
            id: 3,
            icon: <FaChartLine />,
            title: "Track Progress",
            description: "Earn XP and Coins to level up."
        },
        {
            id: 4,
            icon: <FaGraduationCap />,
            title: "Master Finance",
            description: "Apply knowledge to real life."
        }
    ];

    return (
        <section className="py-24 px-4 text-white">
            <div className="max-w-6xl mx-auto text-center">
                <h2
                    ref={heading.ref}
                    className="text-4xl md:text-5xl font-bold mb-20 transition-all duration-700 ease-out tracking-tight"
                    style={{
                        opacity: heading.isVisible ? 1 : 0,
                        transform: heading.isVisible ? 'translateY(0)' : 'translateY(40px)',
                    }}
                >
                    Start Your Journey
                </h2>

                <div className="relative">
                    {/* Connecting Line */}
                    <div className="hidden md:block absolute top-[40px] left-10 right-10 h-0.5 bg-white/10 -z-0"></div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                ref={stepRefs[index].ref}
                                className="flex flex-col items-center group transition-all duration-700 ease-out"
                                style={{
                                    opacity: stepRefs[index].isVisible ? 1 : 0,
                                    transform: stepRefs[index].isVisible
                                        ? 'translateY(0) scale(1)'
                                        : 'translateY(40px) scale(0.9)',
                                    transitionDelay: `${index * 200}ms`,
                                }}
                            >
                                <div className="w-20 h-20 rounded-2xl bg-[#005cbf]/20 border border-white/10 backdrop-blur-sm flex items-center justify-center text-3xl mb-8 relative group-hover:-translate-y-2 transition-transform duration-300 shadow-xl group-hover:shadow-blue-500/20 text-blue-400">
                                    {step.icon}
                                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-blue-500 text-white rounded-lg flex items-center justify-center font-bold text-sm shadow-lg">
                                        {step.id}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                                <p className="text-sm text-blue-200/80 leading-relaxed max-w-[200px]">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
