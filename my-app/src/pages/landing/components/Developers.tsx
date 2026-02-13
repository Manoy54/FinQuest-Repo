import { FaCode, FaLaptopCode, FaDatabase } from 'react-icons/fa';
import Avatar, { genConfig } from 'react-nice-avatar';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export function Developers() {
    const heading = useScrollAnimation();
    const dev0 = useScrollAnimation(0.2);
    const dev1 = useScrollAnimation(0.2);
    const dev2 = useScrollAnimation(0.2);
    const dev3 = useScrollAnimation(0.2);
    const devRefs = [dev0, dev1, dev2, dev3];

    const developers = [
        {
            name: "Sean Dylan Armenta",
            role: "Full Stack Developer",
            icon: <FaCode />,
            config: genConfig({
                sex: "man",
                faceColor: "#F9C9B6",
                earSize: "small",
                eyeStyle: "circle",
                noseStyle: "short",
                mouthStyle: "smile",
                shirtStyle: "hoody",
                glassesStyle: "none",
                hairColor: "#000",
                hairStyle: "thick",
                hatStyle: "none",
                eyeBrowStyle: "up",
                shirtColor: "#77311D",
                bgColor: "#FFEBA4"
            })
        },
        {
            name: "Jeffrey Cruel",
            role: "Full Stack Developer",
            icon: <FaLaptopCode />,
            config: genConfig({
                sex: "man",
                faceColor: "#AC6651",
                earSize: "big",
                eyeStyle: "smile",
                noseStyle: "long",
                mouthStyle: "laugh",
                shirtStyle: "polo",
                glassesStyle: "square",
                hairColor: "#506AF4",
                hairStyle: "normal",
                hatStyle: "none",
                eyeBrowStyle: "up",
                shirtColor: "#FC909F",
                bgColor: "#F4D150"
            })
        },
        {
            name: "Mark Jervyhne Saba",
            role: "Full Stack Developer",
            icon: <FaDatabase />,
            config: genConfig({
                sex: "man",
                faceColor: "#F9C9B6",
                earSize: "small",
                eyeStyle: "oval",
                noseStyle: "round",
                mouthStyle: "peace",
                shirtStyle: "short",
                glassesStyle: "round",
                hairColor: "#FC909F",
                hairStyle: "mohawk",
                hatStyle: "none",
                eyeBrowStyle: "up",
                shirtColor: "#6BD9E9",
                bgColor: "#E0DDFF"
            })
        },
        {
            name: "Charles Darwish Baroma",
            role: "Fullstack Developer",
            icon: <FaLaptopCode />,
            config: genConfig({
                sex: "man",
                faceColor: "#D08B5B",
                earSize: "big",
                eyeStyle: "smile",
                noseStyle: "short",
                mouthStyle: "smile",
                shirtStyle: "polo",
                glassesStyle: "none",
                hairColor: "#000",
                hairStyle: "normal",
                hatStyle: "none",
                eyeBrowStyle: "up",
                shirtColor: "#9287FF",
                bgColor: "#74D153"
            })
        }
    ];

    return (
        <section className="py-20 px-4 text-white">
            <div className="max-w-6xl mx-auto text-center">
                <div
                    ref={heading.ref}
                    className="transition-all duration-700 ease-out"
                    style={{
                        opacity: heading.isVisible ? 1 : 0,
                        transform: heading.isVisible ? 'translateY(0)' : 'translateY(40px)',
                    }}
                >
                    <h2 className="text-4xl font-bold mb-8">Meet The Developers</h2>

                    <p className="max-w-3xl mx-auto text-blue-100 mb-20 italic">
                        "We are BSIT students from the Bicol University College of Science, pushing the boundaries of
                        technology by building a high-performance website that bridges the gap between innovation and user experience."
                    </p>
                </div>

                <div className="grid md:grid-cols-4 gap-8">
                    {developers.map((dev, index) => (
                        <div
                            key={index}
                            ref={devRefs[index].ref}
                            className="flex flex-col items-center group transition-all duration-700 ease-out"
                            style={{
                                opacity: devRefs[index].isVisible ? 1 : 0,
                                transform: devRefs[index].isVisible
                                    ? 'translateY(0) scale(1)'
                                    : 'translateY(40px) scale(0.85)',
                                transitionDelay: `${index * 150}ms`,
                            }}
                        >
                            <div className="w-32 h-32 rounded-full border-4 border-white/20 p-1 mb-6 transition-all duration-300 group-hover:border-white group-hover:scale-105 bg-white/10 flex items-center justify-center overflow-hidden">
                                <Avatar className="w-full h-full" {...dev.config} />
                            </div>
                            <h3 className="text-lg font-bold mb-1">{dev.name}</h3>
                            <p className="text-sm text-blue-100 mb-3">{dev.role}</p>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
