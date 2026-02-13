import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import Avatar, { genConfig } from 'react-nice-avatar';
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
            className="group relative block w-full h-full"
            style={{ textDecoration: 'none' }}
        >
            <div
                className="relative overflow-hidden rounded-3xl p-6 h-full flex flex-col transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
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
                <div className="relative z-10 mb-4 flex-none">
                    <span className="text-5xl lg:text-6xl filter drop-shadow-lg group-hover:scale-110 inline-block transition-transform duration-300">
                        {mode.icon}
                    </span>
                </div>

                {/* Content */}
                <div className="relative z-10 flex-1 flex flex-col">
                    <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">
                        {mode.subtitle}
                    </p>
                    <h3 className="text-white text-xl lg:text-2xl font-bold mb-2 tracking-tight">
                        {mode.title}
                    </h3>
                    <p className="text-white/80 text-xs lg:text-sm leading-relaxed mb-4 flex-1">
                        {mode.description}
                    </p>

                    {/* Play Button */}
                    <div className="mt-auto flex items-center gap-2 text-white font-bold text-sm uppercase tracking-wide group-hover:gap-4 transition-all duration-300">
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
    const navigate = useNavigate();
    const [avatarConfig, setAvatarConfig] = useState<ReturnType<typeof genConfig> | null>(null);

    useEffect(() => {
        const loadAvatar = () => {
            const saved = localStorage.getItem('userAvatarConfig');
            if (saved) {
                setAvatarConfig(JSON.parse(saved));
            } else {
                setAvatarConfig(genConfig("default-user"));
            }
        };

        loadAvatar();

        const handleAvatarChange = () => loadAvatar();
        window.addEventListener('avatarChanged', handleAvatarChange);

        return () => {
            window.removeEventListener('avatarChanged', handleAvatarChange);
        };
    }, []);

    return (
        <div
            className="min-h-screen w-full flex flex-col relative overflow-x-hidden"
            style={{
                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #1a1a2e 100%)'
            }}
        >
            {/* Top Left Avatar */}
            <Link to="/profile" className="absolute top-6 left-8 z-[60] group cursor-pointer block">
                <div className="relative w-24 h-24 md:w-28 md:h-28 transition-transform duration-500 group-hover:scale-105">
                    {/* Soft Glow Behind */}
                    <div className="absolute inset-4 bg-amber-500/40 blur-xl rounded-full" />

                    {/* Avatar Container */}
                    <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/20 shadow-2xl bg-[#1a1a2e]">
                        {avatarConfig ? (
                            <Avatar className="w-full h-full" {...avatarConfig} />
                        ) : (
                            <div className="w-full h-full bg-gray-700 animate-pulse" />
                        )}
                    </div>
                </div>
            </Link>

            {/* Top Right Logout */}
            <button
                onClick={() => navigate('/')}
                className="absolute top-6 right-8 z-[60] group cursor-pointer border-none bg-transparent outline-none p-0"
                aria-label="Logout"
            >
                <div className="relative transition-transform duration-300 group-hover:scale-105">
                    <div className="relative bg-blue-500/20 hover:bg-blue-500/40 border border-blue-400/50 shadow-[0_0_10px_rgba(59,130,246,0.3)] flex items-center justify-center transition-all duration-300 px-2.5 py-1 rounded-md group-hover:border-blue-400/80 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                        <span className="text-blue-100 font-bold text-[9px] md:text-[11px] tracking-wider flex items-center gap-1.5 drop-shadow-sm">
                            <FiLogOut className="text-[10px] md:text-xs" /> LOGOUT
                        </span>
                    </div>
                </div>
            </button>
            <AnimatedBackground />

            {/* Navigation */}
            <div className="relative z-50 flex-none">
                <Header />
            </div>

            {/* Main Content Area */}
            <main className="relative z-10 flex-1 flex flex-col items-center justify-start px-4 lg:px-8 pt-24 pb-20">

                {/* Hero Section */}
                <div className="text-center mb-6 lg:mb-10 shrink-0 mt-12">


                    <p className="text-white/60 text-base md:text-xl max-w-2xl mx-auto font-light tracking-wide">
                        Master financial literacy through interactive games and challenges
                    </p>
                </div>



                {/* Game Modes Grid */}
                <div id="game-modes" className="w-full max-w-7xl flex flex-col items-center flex-1 justify-center">
                    <div className="text-center mb-6 lg:mb-8 shrink-0">
                        <h2 className="text-white/40 text-xs font-bold uppercase tracking-[0.3em] mb-2">
                            Choose Your Adventure
                        </h2>
                        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 w-full auto-rows-fr">
                        {gameModes.map((mode) => (
                            <GameModeCard key={mode.id} mode={mode} />
                        ))}
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 py-4 text-center shrink-0">
                <p className="text-white/30 text-xs">
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
