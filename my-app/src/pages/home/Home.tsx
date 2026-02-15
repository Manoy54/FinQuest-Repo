import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import Avatar, { genConfig } from 'react-nice-avatar';
import { Header } from '../../app/components/Header';
import { AnimatedBackground } from '../games/MoneytaryMasteryComponents';
import { ParallaxDemo } from '../../app/components/ParallaxDemo';






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
                className="absolute top-6 right-8 z-[60] group cursor-pointer !border-none !bg-transparent !outline-none focus:outline-none focus-visible:outline-none ring-0 focus:ring-0 p-0"
                aria-label="Logout"
            >
                <div className="relative transition-transform duration-300 group-hover:scale-105">
                    <div className="relative flex items-center justify-center transition-all duration-300 px-2.5 py-1 rounded-md hover:bg-black hover:shadow-[0_0_20px_black]">
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



                {/* Game Modes - Parallax Horizontal */}
                <div id="game-modes" className="w-full flex flex-col items-center">
                    <div className="text-center mb-6 lg:mb-8 shrink-0">
                        <h2 className="text-white/40 text-xs font-bold uppercase tracking-[0.3em] mb-2">
                            Choose Your Adventure
                        </h2>
                        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto rounded-full" />
                    </div>

                    {/* Parallax Container with Seamless Fading Edges */}
                    <div className="relative mx-auto" style={{ height: '45vh', width: '70%' }}>
                        <div
                            className="w-full h-full overflow-hidden rounded-2xl"
                            style={{
                                WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0.6) 0%, black 5%, black 80%, rgba(0,0,0,0.8) 85%, rgba(0,0,0,0.4) 90%, rgba(0,0,0,0.1) 95%, transparent 100%)',
                                maskImage: 'linear-gradient(to right, rgba(0,0,0,0.6) 0%, black 5%, black 80%, rgba(0,0,0,0.8) 85%, rgba(0,0,0,0.4) 90%, rgba(0,0,0,0.1) 95%, transparent 100%)',
                            }}
                        >
                            <ParallaxDemo />
                        </div>
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
