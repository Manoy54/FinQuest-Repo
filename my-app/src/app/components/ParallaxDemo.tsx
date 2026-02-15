import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Parallax, ParallaxLayer, type IParallax } from '@react-spring/parallax';

interface GameMode {
    title: string;
    description: string;
    route: string;
    gradient: string;
    textColor: string;
    buttonColor: string;
    emoji: string;
}

const gameModes: GameMode[] = [
    {
        title: 'Capital Cup',
        description: 'Test your financial knowledge in our exciting timed quiz mode!',
        route: '/quiz-bee',
        gradient: 'teal',
        textColor: 'text-teal-600',
        buttonColor: 'bg-gradient-to-r from-sky-400 to-blue-500',
        emoji: '🏆',
    },
    {
        title: 'Monetary Mastery',
        description: 'Master the art of finance with flashcards and challenges!',
        route: '/monetary-mastery',
        gradient: 'pink',
        textColor: 'text-rose-600',
        buttonColor: 'bg-gradient-to-r from-pink-500 to-rose-500',
        emoji: '💎',
    },
    {
        title: 'Data Diver',
        description: 'Find hidden financial terms and expand your vocabulary!',
        route: '/word-hunt',
        gradient: 'purple',
        textColor: 'text-purple-600',
        buttonColor: 'bg-gradient-to-r from-purple-500 to-violet-500',
        emoji: '🔍',
    },
    {
        title: 'Corporate Climb',
        description: 'Solve crossword puzzles with financial terminology!',
        route: '/crossword',
        gradient: 'tomato',
        textColor: 'text-orange-600',
        buttonColor: 'bg-gradient-to-r from-orange-400 to-red-500',
        emoji: '🧩',
    },
];

interface PageProps {
    offset: number;
    gradient: string;
    onClick: () => void;
}

const Page = ({ offset, gradient, onClick }: PageProps) => (
    <>
        <ParallaxLayer offset={offset} speed={0.2} onClick={onClick}>
            <div className="slopeBegin" />
        </ParallaxLayer>

        <ParallaxLayer offset={offset} speed={0.6} onClick={onClick}>
            <div className={`slopeEnd ${gradient}`} />
        </ParallaxLayer>

        <ParallaxLayer className="text number" offset={offset} speed={0.3}>
            <span>0{offset + 1}</span>
        </ParallaxLayer>
    </>
);

export function ParallaxDemo() {
    const parallax = useRef<IParallax>(null);

    const scroll = (to: number) => {
        if (parallax.current) {
            parallax.current.scrollTo(to);
        }
    };

    const totalPages = gameModes.length;

    return (
        <div style={{ background: '#20232f', height: '100vh', width: '100%' }}>
            <Parallax className="parallax-container" ref={parallax} pages={totalPages} horizontal>
                {gameModes.map((mode, i) => (
                    <Page
                        key={mode.route}
                        offset={i}
                        gradient={mode.gradient}
                        onClick={() => scroll((i + 1) % totalPages)}
                    />
                ))}

                {gameModes.map((mode, i) => (
                    <ParallaxLayer
                        key={`content-${mode.route}`}
                        offset={i}
                        speed={0.5}
                        className="flex flex-col items-center justify-center pointer-events-none text-white"
                    >
                        <div className="pointer-events-auto text-center p-10 bg-black/30 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl max-w-lg mx-4">
                            <span className="text-6xl mb-4 block">{mode.emoji}</span>
                            <h2
                                className="text-4xl md:text-5xl font-black mb-3 drop-shadow-lg tracking-tight"
                                style={{ fontFamily: "'Outfit', sans-serif" }}
                            >
                                {mode.title}
                            </h2>
                            <p className="text-lg md:text-xl mb-8 text-white/80 max-w-md font-light">
                                {mode.description}
                            </p>
                            <Link
                                to={mode.route}
                                className={`px-10 py-3.5 ${mode.buttonColor} text-white rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-lg inline-block`}
                            >
                                Play Now
                            </Link>
                        </div>
                    </ParallaxLayer>
                ))}
            </Parallax>
        </div>
    );
}
