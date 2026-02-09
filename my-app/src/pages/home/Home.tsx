import { Link } from 'react-router-dom';
import { Header } from '../../app/components/Header';
import { AnimatedBackground } from '../games/MoneytaryMasteryComponents';

interface GameMode {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    icon: string;
    path: string;
    gradient: string;
    glowColor: string;
}

const gameModes: GameMode[] = [
    {
        id: 'monetary-mastery',
        title: 'Monetary Mastery',
        subtitle: 'Flashcard Learning',
        description: 'Master financial concepts through interactive flashcards. Test your knowledge and level up!',
        icon: '💳',
        path: '/monetary-mastery',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        glowColor: 'rgba(102, 126, 234, 0.4)'
    },
    {
        id: 'data-diver',
        title: 'Data Diver',
        subtitle: 'Word Hunt Challenge',
        description: 'Dive deep into financial terminology with exciting word search puzzles!',
        icon: '🔍',
        path: '/word-hunt',
        gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
        glowColor: 'rgba(17, 153, 142, 0.4)'
    },
    {
        id: 'capital-cup',
        title: 'Capital Cup',
        subtitle: 'Quiz Bee Challenge',
        description: 'Compete in timed quizzes and climb the leaderboard. Test your financial IQ!',
        icon: '🏆',
        path: '/quiz-bee',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        glowColor: 'rgba(240, 147, 251, 0.4)'
    },
    {
        id: 'crossword',
        title: 'Capital Crossword',
        subtitle: 'Profit Puzzle',
        description: 'Test your financial vocabulary with this challenging crossword puzzle.',
        icon: '🧩',
        path: '/crossword',
        gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
        glowColor: 'rgba(255, 107, 107, 0.4)'
    }
];

function GameModeCard({ mode }: { mode: GameMode }) {
    return (
        <Link
            to={mode.path}
            className="group relative block w-full max-w-sm"
            style={{ textDecoration: 'none' }}
        >
            <div
                className="relative overflow-hidden rounded-3xl p-8 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
                style={{
                    background: mode.gradient,
                    boxShadow: `0 20px 40px ${mode.glowColor}, 0 0 0 1px rgba(255,255,255,0.1) inset`
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
                <div className="relative z-10 mb-6">
                    <span className="text-6xl filter drop-shadow-lg group-hover:scale-110 inline-block transition-transform duration-300">
                        {mode.icon}
                    </span>
                </div>

                {/* Content */}
                <div className="relative z-10">
                    <p className="text-white/70 text-sm font-semibold uppercase tracking-widest mb-2">
                        {mode.subtitle}
                    </p>
                    <h3 className="text-white text-2xl font-bold mb-3 tracking-tight">
                        {mode.title}
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed mb-6">
                        {mode.description}
                    </p>

                    {/* Play Button */}
                    <div className="flex items-center gap-2 text-white font-bold text-sm uppercase tracking-wide group-hover:gap-4 transition-all duration-300">
                        <span>Play Now</span>
                        <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300 rounded-3xl" />
            </div>
        </Link>
    );
}

export function Home() {
    return (
        <div
            className="min-h-screen w-full flex flex-col relative overflow-x-hidden"
            style={{
                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #1a1a2e 100%)'
            }}
        >
            <AnimatedBackground />

            {/* Navigation */}
            <div className="relative z-50">
                <Header />
            </div>

            {/* Hero Section */}
            <header className="relative z-10 pt-32 pb-8 px-6 text-center">
                <h1
                    className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 tracking-tighter"
                    style={{
                        fontFamily: "'Outfit', sans-serif",
                        background: 'linear-gradient(135deg, #ffd700 0%, #ff6b35 50%, #ffd700 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.3))'
                    }}
                >
                    FINQUEST
                </h1>
                <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto font-light tracking-wide">
                    Master financial literacy through interactive games and challenges
                </p>
            </header>

            {/* Game Modes Section */}
            <main className="relative z-10 flex-1 px-6 py-12">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-white/40 text-sm font-bold uppercase tracking-[0.3em] mb-3">
                            Choose Your Adventure
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                        {gameModes.map((mode) => (
                            <GameModeCard key={mode.id} mode={mode} />
                        ))}
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 py-8 text-center">
                <p className="text-white/30 text-sm">
                    © 2026 FinQuest • Learn Finance, Level Up Your Future
                </p>
            </footer>

            {/* Custom Styles */}
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-10px) rotate(2deg); }
                }
            `}</style>
        </div>
    );
}
