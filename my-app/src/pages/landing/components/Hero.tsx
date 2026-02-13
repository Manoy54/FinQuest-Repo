import { Link } from 'react-router-dom';
import { FaPlay, FaGamepad } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import logo from '../../../assets/images/FQlogo.PNG';

export function Hero() {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        // Small delay to trigger entrance animation after mount
        const timer = setTimeout(() => setAnimate(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section
            className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden"
        // Background is now handled by LandingPage.tsx
        >
            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
                <div
                    className="absolute top-10 left-10 text-9xl transform -rotate-12 text-white transition-all duration-[1500ms]"
                    style={{
                        opacity: animate ? 1 : 0,
                        transform: animate ? 'rotate(-12deg) translateY(0)' : 'rotate(-12deg) translateY(-40px)',
                        transitionDelay: '600ms'
                    }}
                >%</div>
                <div
                    className="absolute top-20 right-20 text-8xl transform rotate-12 text-white transition-all duration-[1500ms]"
                    style={{
                        opacity: animate ? 1 : 0,
                        transform: animate ? 'rotate(12deg) translateY(0)' : 'rotate(12deg) translateY(-40px)',
                        transitionDelay: '800ms'
                    }}
                >÷</div>
                <div
                    className="absolute bottom-10 left-20 text-9xl transform rotate-45 text-white transition-all duration-[1500ms]"
                    style={{
                        opacity: animate ? 1 : 0,
                        transform: animate ? 'rotate(45deg) translateY(0)' : 'rotate(45deg) translateY(40px)',
                        transitionDelay: '1000ms'
                    }}
                >$</div>
                <div
                    className="absolute bottom-20 right-10 text-8xl transform -rotate-12 text-white transition-all duration-[1500ms]"
                    style={{
                        opacity: animate ? 1 : 0,
                        transform: animate ? 'rotate(-12deg) translateY(0)' : 'rotate(-12deg) translateY(40px)',
                        transitionDelay: '1200ms'
                    }}
                >#</div>
            </div>

            <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto">
                {/* Logo */}
                <div
                    className="mb-8 transition-all duration-1000 ease-out"
                    style={{
                        opacity: animate ? 1 : 0,
                        transform: animate ? 'scale(1) translateY(0)' : 'scale(0.5) translateY(30px)',
                    }}
                >
                    <img src={logo} alt="FinQuest Logo" className="w-32 md:w-48 h-auto rounded-full drop-shadow-[0_0_25px_rgba(255,255,255,0.4)] animate-pulse" />
                </div>

                {/* Title */}
                <h1
                    className="text-7xl md:text-9xl font-black text-white mb-6 tracking-tight drop-shadow-lg transition-all duration-1000 ease-out"
                    style={{
                        opacity: animate ? 1 : 0,
                        transform: animate ? 'translateY(0)' : 'translateY(30px)',
                        transitionDelay: '200ms'
                    }}
                >
                    FinQuest<span className="inline-block animate-pulse text-[#ffd700] relative top-[-0.5rem] text-6xl">✨</span>
                </h1>

                {/* Subtitle */}
                <p
                    className="text-2xl md:text-3xl text-blue-100 mb-14 max-w-3xl font-light transition-all duration-1000 ease-out"
                    style={{
                        opacity: animate ? 1 : 0,
                        transform: animate ? 'translateY(0)' : 'translateY(30px)',
                        transitionDelay: '400ms'
                    }}
                >
                    A fast-paced financial challenge where your speed and accuracy build the ultimate streak
                </p>

                {/* Buttons */}
                <div
                    className="flex flex-col sm:flex-row gap-6 transition-all duration-1000 ease-out"
                    style={{
                        opacity: animate ? 1 : 0,
                        transform: animate ? 'translateY(0)' : 'translateY(30px)',
                        transitionDelay: '600ms'
                    }}
                >
                    <Link to="/login" className="bg-white text-[#0052cc] px-10 py-4 rounded-full font-bold text-xl hover:bg-gray-100 transition-transform hover:scale-105 flex items-center gap-3 shadow-lg">
                        <FaPlay className="text-base" /> Play Now
                    </Link>
                    <button
                        onClick={() => document.getElementById('gameplay-preview')?.scrollIntoView({ behavior: 'smooth' })}
                        className="bg-transparent border-2 border-white/50 text-white px-10 py-4 rounded-full font-bold text-xl hover:bg-white/10 transition-transform hover:scale-105 flex items-center gap-3 backdrop-blur-sm"
                    >
                        <FaGamepad className="text-sm" /> How to Play
                    </button>
                </div>
            </div>
        </section>
    );
}
