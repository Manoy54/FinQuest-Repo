import { FaEye, FaBullseye } from 'react-icons/fa';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export function About() {
    const heading = useScrollAnimation();
    const visionRef = useScrollAnimation(0.2);
    const missionRef = useScrollAnimation(0.2);

    return (
        <section className="py-20 px-4 text-white">
            <div className="max-w-6xl mx-auto">
                <div
                    ref={heading.ref}
                    className="text-center transition-all duration-700 ease-out mb-16"
                    style={{
                        opacity: heading.isVisible ? 1 : 0,
                        transform: heading.isVisible ? 'translateY(0)' : 'translateY(40px)',
                    }}
                >
                    <h2 className="text-4xl font-bold mb-4">About FinQuest</h2>
                    <p className="max-w-3xl mx-auto text-blue-100 leading-relaxed">
                        An interactive educational platform designed to bridge the gap between financial literacy and entertainment.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Vision */}
                    <div
                        ref={visionRef.ref}
                        className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:bg-white/15 transition-all duration-700 ease-out hover:scale-[1.02] flex flex-col items-center text-center shadow-lg group"
                        style={{
                            opacity: visionRef.isVisible ? 1 : 0,
                            transform: visionRef.isVisible ? 'translateY(0)' : 'translateY(50px)',
                            transitionDelay: '0ms',
                        }}
                    >
                        <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6 text-purple-400 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                            <FaEye className="text-3xl" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Vision</h3>
                        <p className="text-blue-100 leading-relaxed">
                            Revolutionize Financial education by developing game-based web learning platforms that make financial literacy accessible and engaging for all learners.
                        </p>
                    </div>

                    {/* Mission */}
                    <div
                        ref={missionRef.ref}
                        className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:bg-white/15 transition-all duration-700 ease-out hover:scale-[1.02] flex flex-col items-center text-center shadow-lg group"
                        style={{
                            opacity: missionRef.isVisible ? 1 : 0,
                            transform: missionRef.isVisible ? 'translateY(0)' : 'translateY(50px)',
                            transitionDelay: '150ms',
                        }}
                    >
                        <div className="w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center mb-6 text-cyan-400 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                            <FaBullseye className="text-3xl" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Mission</h3>
                        <p className="text-blue-100 leading-relaxed">
                            To deliver interactive and enjoyable web-based games that enhance financial literacy, promoting and motivating students to learn.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
