import { useState, useEffect } from 'react';
import { FaGamepad, FaSearch, FaPuzzlePiece, FaTrophy, FaChevronRight } from 'react-icons/fa';

export function GameplayPreview() {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        { id: 'mm', label: 'Monetary Mastery', icon: <FaGamepad />, color: 'from-emerald-400 to-teal-500' },
        { id: 'dd', label: 'Data Diver', icon: <FaSearch />, color: 'from-blue-400 to-indigo-500' },
        { id: 'cc', label: 'Capital Crossword', icon: <FaPuzzlePiece />, color: 'from-purple-400 to-pink-500' },
        { id: 'qc', label: 'Capital Cup', icon: <FaTrophy />, color: 'from-amber-400 to-orange-500' }
    ];

    // Auto-rotate tabs
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTab((prev) => (prev + 1) % tabs.length);
        }, 5000);
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

                <div className="flex flex-col lg:flex-row gap-12 items-center">
                    {/* Tabs / Controls */}
                    <div className="w-full lg:w-1/3 flex flex-col gap-4">
                        {tabs.map((tab, index) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(index)}
                                className={`group flex items-center gap-4 p-6 rounded-2xl text-left transition-all duration-300 border ${activeTab === index
                                        ? 'bg-white/10 border-white/20 shadow-xl scale-105'
                                        : 'bg-transparent border-transparent hover:bg-white/5'
                                    }`}
                            >
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl bg-gradient-to-br ${tab.color} text-white shadow-lg`}>
                                    {tab.icon}
                                </div>
                                <div className="flex-1">
                                    <h3 className={`font-bold text-lg ${activeTab === index ? 'text-white' : 'text-blue-100'}`}>
                                        {tab.label}
                                    </h3>
                                </div>
                                {activeTab === index && (
                                    <FaChevronRight className="text-white/50 animate-pulse" />
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
                            <div className="absolute inset-0 pt-10 flex items-center justify-center bg-grid-white/[0.02]">
                                {tabs.map((tab, index) => (
                                    <div
                                        key={tab.id}
                                        className={`absolute inset-0 flex items-center justify-center transition-all duration-700 p-8 ${activeTab === index
                                                ? 'opacity-100 translate-x-0 scale-100'
                                                : 'opacity-0 translate-x-8 scale-95 pointer-events-none'
                                            }`}
                                    >
                                        <div className="w-full max-w-lg">
                                            {/* Mockup Content based on active tab */}
                                            {index === 0 && <MonetaryMasteryMockup />}
                                            {index === 1 && <DataDiverMockup />}
                                            {index === 2 && <ItCrosswordMockup />}
                                            {index === 3 && <QuizBeeMockup />}
                                        </div>
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

// Visual Mockups for each game
function MonetaryMasteryMockup() {
    return (
        <div className="bg-[#1e293b] rounded-2xl p-8 border border-white/10 shadow-xl relative overflow-hidden aspect-[4/3] flex flex-col items-center justify-center text-center">
            <div className="text-sm uppercase tracking-widest text-emerald-400 font-bold mb-6">Flashcard Challenge</div>
            <div className="w-64 h-40 bg-white rounded-xl shadow-lg transform rotate-[-2deg] flex items-center justify-center p-6 text-slate-800 font-bold text-xl mb-4 relative z-10">
                What is Compound Interest?
            </div>
            <div className="w-64 h-40 bg-emerald-500 rounded-xl shadow-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[3deg] opacity-20 scale-95"></div>

            <div className="flex gap-4 mt-8">
                <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-xl border border-red-500/30">✕</div>
                <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-xl border border-green-500/30">✓</div>
            </div>
        </div>
    );
}

function DataDiverMockup() {
    return (
        <div className="bg-[#1e293b] rounded-2xl p-6 border border-white/10 shadow-xl aspect-[4/3] flex flex-col items-center justify-center relative overflow-hidden">
            <div className="text-sm uppercase tracking-widest text-blue-400 font-bold mb-4">Word Search Grid</div>
            <div className="grid grid-cols-6 gap-2 opacity-80">
                {[...Array(36)].map((_, i) => (
                    <div key={i} className={`w-10 h-10 flex items-center justify-center rounded-lg text-lg font-bold ${[7, 8, 9, 10].includes(i) ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/40' : 'bg-white/5 text-white/30'
                        }`}>
                        {String.fromCharCode(65 + Math.floor(Math.random() * 26))}
                    </div>
                ))}
            </div>
            <div className="absolute bottom-6 right-6 px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-300 text-sm font-mono">+50 XP</div>
        </div>
    );
}

function ItCrosswordMockup() {
    return (
        <div className="bg-[#1e293b] rounded-2xl p-6 border border-white/10 shadow-xl aspect-[4/3] flex items-center justify-center relative">
            <div className="text-sm uppercase tracking-widest text-purple-400 font-bold absolute top-6 left-1/2 -translate-x-1/2">Crossword Puzzle</div>
            <div className="grid grid-cols-5 gap-1 p-4 bg-black/20 rounded-xl">
                {[...Array(25)].map((_, i) => {
                    const isBlack = [4, 9, 14, 19, 21, 23].includes(i);
                    const isSelected = i === 12;
                    return (
                        <div key={i} className={`w-10 h-10 ${isBlack ? 'bg-black/50' : 'bg-white/10'} rounded-md flex items-center justify-center ${isSelected ? 'ring-2 ring-purple-500 bg-purple-500/20' : ''}`}>
                            {!isBlack && Math.random() > 0.7 && <span className="text-white/60 text-xs font-mono">{String.fromCharCode(65 + i % 26)}</span>}
                        </div>
                    )
                })}
            </div>
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-24 bg-white/5 rounded-lg flex flex-col gap-2 p-2 justify-center">
                <div className="w-full h-1 bg-white/10 rounded"></div>
                <div className="w-full h-1 bg-white/10 rounded"></div>
                <div className="w-2/3 h-1 bg-white/10 rounded"></div>
            </div>
        </div>
    );
}

function QuizBeeMockup() {
    return (
        <div className="bg-[#1e293b] rounded-2xl p-6 border border-white/10 shadow-xl aspect-[4/3] flex flex-col items-center justify-center relative overflow-hidden">
            <div className="text-sm uppercase tracking-widest text-amber-400 font-bold mb-6">High Stakes Trivia</div>

            <div className="w-full bg-white/5 p-4 rounded-xl text-center mb-4 border border-white/10">
                <p className="text-blue-100 font-medium">Which asset class typically has the highest risk?</p>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full">
                <div className="p-3 bg-white/5 rounded-lg text-sm text-center text-white/60">Bonds</div>
                <div className="p-3 bg-amber-500 text-black font-bold rounded-lg text-sm text-center shadow-lg shadow-amber-500/20 transform scale-105">Stocks</div>
                <div className="p-3 bg-white/5 rounded-lg text-sm text-center text-white/60">Cash</div>
                <div className="p-3 bg-white/5 rounded-lg text-sm text-center text-white/60">CDs</div>
            </div>

            <div className="absolute top-4 right-4 text-amber-500 font-black text-xl">
                1250 pts
            </div>
        </div>
    );
}
