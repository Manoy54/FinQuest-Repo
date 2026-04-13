import { useState, useEffect } from 'react';
import { FaGamepad, FaSearch, FaPuzzlePiece, FaTrophy, FaChevronRight, FaBolt, FaLink, FaEye, FaPlayCircle } from 'react-icons/fa';

export function GameplayPreview() {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        { id: 'tour', label: 'Game Tour', icon: <FaPlayCircle />, color: 'from-indigo-400 to-blue-500', video: '/gamepreviews/GAME TOUR.mp4' },
        { id: 'mm', label: 'Monetary Mastery', icon: <FaGamepad />, color: 'from-emerald-400 to-teal-500', video: '/gamepreviews/MONETARY MASTER.mp4' },
        { id: 'dd', label: 'Data Diver', icon: <FaSearch />, color: 'from-blue-400 to-indigo-500', video: '/gamepreviews/DATA DIVER.mp4' },
        { id: 'cc', label: 'Corporate Climb', icon: <FaPuzzlePiece />, color: 'from-purple-400 to-pink-500', video: '/gamepreviews/CORPORATE CIMB.mp4' },
        { id: 'qc', label: 'Capital Cup', icon: <FaTrophy />, color: 'from-amber-400 to-orange-500', video: '/gamepreviews/CAPITAL CUP.mp4' },
        { id: 'sr', label: 'Speed Round', icon: <FaBolt />, color: 'from-pink-400 to-rose-500', video: '/gamepreviews/SPEED ROUND.mp4' },
        { id: 'cn', label: 'Coinnect', icon: <FaLink />, color: 'from-cyan-400 to-blue-500', video: '/gamepreviews/COINNECT.mp4' },
        { id: 'sd', label: 'Spot the Difference', icon: <FaEye />, color: 'from-violet-400 to-purple-500', video: '/gamepreviews/SPOT THE DIFFERENCE.mp4' }
    ];

    // Auto-rotate tabs
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTab((prev) => (prev + 1) % tabs.length);
        }, 12000); // Increased from 5s to 12s so videos can play longer
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-24 px-4 text-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Experience FinQuest</h2>
                    <p className="text-blue-200 text-lg max-w-2xl mx-auto">
                        See what awaits you in each of our immersive game modes.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
                    {/* Tabs / Controls */}
                    <div className="w-full lg:w-1/3 flex flex-row lg:flex-col gap-3 lg:gap-4 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 snap-x justify-start items-stretch" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {tabs.map((tab, index) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(index)}
                                className={`group flex items-center gap-3 p-3 lg:p-4 rounded-xl lg:rounded-2xl text-left transition-all duration-300 border shrink-0 min-w-[220px] lg:min-w-0 snap-center ${activeTab === index
                                    ? 'bg-white/10 border-white/20 shadow-xl lg:scale-105'
                                    : 'bg-transparent border-white/5 hover:bg-white/5'
                                    }`}
                            >
                                <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center text-lg lg:text-xl shrink-0 bg-gradient-to-br ${tab.color} text-white shadow-lg`}>
                                    {tab.icon}
                                </div>
                                <div className="flex-1">
                                    <h3 className={`font-bold text-sm lg:text-lg ${activeTab === index ? 'text-white' : 'text-blue-100'}`}>
                                        {tab.label}
                                    </h3>
                                </div>
                                {activeTab === index && (
                                    <FaChevronRight className="text-white/50 animate-pulse hidden lg:block" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Preview Window */}
                    <div className="w-full lg:w-2/3">
                        <div className="relative aspect-video bg-[#0f172a] rounded-3xl border border-white/10 shadow-2xl overflow-hidden group">
                            {/* Window GUI Header */}
                            <div className="absolute top-0 left-0 right-0 h-10 bg-black/40 backdrop-blur-md flex items-center px-4 gap-2 z-20 border-b border-white/5">
                                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                            </div>

                            {/* Content Area */}
                            <div className="absolute inset-0 pt-10 flex items-center justify-center bg-black">
                                {tabs.map((tab, index) => (
                                    <div
                                        key={tab.id}
                                        className={`absolute inset-0 pt-10 flex items-center justify-center transition-opacity duration-700 bg-[#0a0f1c] ${activeTab === index
                                            ? 'opacity-100 z-10'
                                            : 'opacity-0 z-0'
                                            }`}
                                    >
                                        <video 
                                            src={tab.video}
                                            className="w-full h-full object-contain"
                                            autoPlay 
                                            loop 
                                            muted 
                                            playsInline 
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Glow Effects */}
                            <div className={`absolute -inset-1 opacity-20 bg-gradient-to-br ${tabs[activeTab].color} blur-3xl -z-10 transition-colors duration-700`}></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
