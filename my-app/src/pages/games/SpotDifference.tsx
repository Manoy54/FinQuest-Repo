import { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatedBackground, GameComplete } from './MoneytaryMasteryComponents';
import { HUD } from '../../app/components/HUD';
import { useUserContext } from '../../context/UserContext';
import { getDocumentPairs, type DocumentPair } from './SpotDifferenceComponents';

const ROUNDS = 3;
const XP_PER_DIFF = 50;
const COINS_PER_DIFF = 25;
const BONUS_XP_NO_MISTAKES = 100;
const BONUS_COINS_NO_MISTAKES = 50;

type Phase = 'START' | 'PLAYING' | 'RESULTS';

export function SpotDifference() {
    const { addXp, addCoins } = useUserContext();
    const hasAwardedRef = useRef(false);

    const [phase, setPhase] = useState<Phase>('START');
    const [documents, setDocuments] = useState<DocumentPair[]>([]);
    const [currentDoc, setCurrentDoc] = useState(0);
    const [foundDiffs, setFoundDiffs] = useState<string[]>([]);
    const [wrongClicks, setWrongClicks] = useState(0);
    const [totalFound, setTotalFound] = useState(0);
    const [totalDiffs, setTotalDiffs] = useState(0);
    const [totalWrong, setTotalWrong] = useState(0);
    const [totalXp, setTotalXp] = useState(0);
    const [totalCoins, setTotalCoins] = useState(0);
    const [flashLabel, setFlashLabel] = useState<string | null>(null);
    const [shakeLabel, setShakeLabel] = useState<string | null>(null);
    const [docComplete, setDocComplete] = useState(false);

    const startGame = useCallback(() => {
        setDocuments(getDocumentPairs(ROUNDS));
        setCurrentDoc(0);
        setFoundDiffs([]);
        setWrongClicks(0);
        setTotalFound(0);
        setTotalDiffs(0);
        setTotalWrong(0);
        setTotalXp(0);
        setTotalCoins(0);
        setDocComplete(false);
        hasAwardedRef.current = false;
        setPhase('PLAYING');
    }, []);

    const doc = documents[currentDoc];

    // Check if all differences found for current document
    useEffect(() => {
        if (phase !== 'PLAYING' || !doc) return;
        if (foundDiffs.length === doc.differences.length) {
            setDocComplete(true);
        }
    }, [foundDiffs, doc, phase]);

    // Award on results
    useEffect(() => {
        if (phase === 'RESULTS' && !hasAwardedRef.current) {
            if (totalXp > 0) addXp(totalXp);
            if (totalCoins > 0) addCoins(totalCoins);
            hasAwardedRef.current = true;
        }
    }, [phase, totalXp, totalCoins, addXp, addCoins]);

    const handleFieldClick = (label: string) => {
        if (!doc || docComplete) return;

        if (foundDiffs.includes(label)) return;

        if (doc.differences.includes(label)) {
            setFoundDiffs(prev => [...prev, label]);
            setFlashLabel(label);
            setTimeout(() => setFlashLabel(null), 600);
        } else {
            setWrongClicks(p => p + 1);
            setShakeLabel(label);
            setTimeout(() => setShakeLabel(null), 500);
        }
    };

    const nextDocument = () => {
        const earned = foundDiffs.length;
        const bonusXp = wrongClicks === 0 ? BONUS_XP_NO_MISTAKES : 0;
        const bonusCoins = wrongClicks === 0 ? BONUS_COINS_NO_MISTAKES : 0;

        setTotalFound(p => p + earned);
        setTotalDiffs(p => p + doc.differences.length);
        setTotalWrong(p => p + wrongClicks);
        setTotalXp(p => p + earned * XP_PER_DIFF + bonusXp);
        setTotalCoins(p => p + earned * COINS_PER_DIFF + bonusCoins);

        if (currentDoc + 1 >= documents.length) {
            setPhase('RESULTS');
        } else {
            setCurrentDoc(p => p + 1);
            setFoundDiffs([]);
            setWrongClicks(0);
            setDocComplete(false);
        }
    };

    if (phase === 'START') {
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #1a1a2e 100%)' }}>
                <AnimatedBackground />
                <div className="z-10 text-center p-16 backdrop-blur-xl bg-[#1e293b]/60 rounded-[40px] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.7)] max-w-2xl w-full">
                    <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter"
                        style={{
                            background: 'linear-gradient(135deg, #c084fc 0%, #a855f7 50%, #7c3aed 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            filter: 'drop-shadow(0 0 15px rgba(168, 85, 247, 0.4))'
                        }}>
                        SPOT THE DIFFERENCE
                    </h1>
                    <p className="text-2xl mb-14 text-gray-300/90 font-light tracking-wide italic">
                        Compare financial documents and find discrepancies!
                    </p>

                    <button
                        onClick={startGame}
                        className="group relative px-12 py-3 rounded-lg font-bold text-xl transition-all duration-300 active:scale-95"
                        style={{
                            background: 'linear-gradient(135deg, #d8b4fe 0%, #a855f7 100%)',
                            color: '#000',
                            boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)',
                        }}
                    >
                        <span className="relative z-10">Start Game</span>
                    </button>

                    <div className="mt-16 flex items-center justify-center gap-10 text-[14px] text-white/60 font-bold uppercase tracking-widest">
                        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5">
                            <span className="text-purple-400 text-lg">🔎</span>
                            <span>Find Differences</span>
                        </div>
                        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5">
                            <span className="text-amber-400 text-lg">📄</span>
                            <span>{ROUNDS} Documents</span>
                        </div>
                        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5">
                            <span className="text-red-400 text-lg">⚠️</span>
                            <span>Watch for errors</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (phase === 'RESULTS') {
        return (
            <GameComplete
                score={totalFound}
                totalCards={totalDiffs}
                exp={totalXp}
                coins={totalCoins}
                onRestart={startGame}
                onReplayLevel={startGame}
            />
        );
    }

    if (!doc) return null;

    return (
        <div className="h-screen w-full flex flex-col items-center relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #1a1a2e 100%)' }}>
            <AnimatedBackground />

            <HUD
                title="SPOT THE DIFFERENCE"
                backPath="/home"
                currentExp={totalXp}
                level={currentDoc + 1}
                expToNextLevel={ROUNDS * 2 * XP_PER_DIFF}
                progress={(foundDiffs.length / doc.differences.length) * 100}
                coins={totalCoins}
                customLevelLabel={`Doc ${currentDoc + 1}/${ROUNDS}`}
                showBadge={true}
            >
                <div className="flex items-center gap-3 shrink-0 relative z-20">
                    <div className="px-5 py-2 rounded-full text-sm font-black backdrop-blur-xl bg-white/10 border border-white/5 shadow-2xl">
                        <span className="text-emerald-400">🔎 {foundDiffs.length}/{doc.differences.length}</span>
                    </div>
                    {wrongClicks > 0 && (
                        <div className="px-5 py-2 rounded-full text-sm font-black backdrop-blur-xl bg-red-500/10 border border-red-500/20">
                            <span className="text-red-400">✕ {wrongClicks}</span>
                        </div>
                    )}
                </div>
            </HUD>

            {/* Document Info */}
            <div className="w-full max-w-5xl px-6 mt-20 z-10 shrink-0">
                <div className="text-center mb-4">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-purple-300 bg-purple-500/20 px-2.5 py-1 rounded-full border border-purple-500/30">
                        {doc.category}
                    </span>
                    <h2 className="text-white font-black text-xl mt-2">{doc.title}</h2>
                    <p className="text-white/40 text-sm">{doc.description}</p>
                </div>
            </div>

            {/* Side-by-side documents */}
            <div className="flex-1 w-full max-w-5xl px-6 z-10 flex gap-4 overflow-y-auto pb-8">
                {/* Original */}
                <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
                    <h3 className="text-xs font-black text-emerald-400 uppercase tracking-widest mb-4 text-center border-b border-white/10 pb-2">
                        ✓ Original Document
                    </h3>
                    <div className="space-y-3">
                        {doc.originalFields.map(field => (
                            <div key={field.label} className="flex justify-between items-center px-3 py-2.5 rounded-lg bg-white/5 border border-white/5">
                                <span className="text-white/50 text-xs font-bold uppercase tracking-wider">{field.label}</span>
                                <span className="text-white font-bold text-sm">{field.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Modified (clickable) */}
                <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
                    <h3 className="text-xs font-black text-amber-400 uppercase tracking-widest mb-4 text-center border-b border-white/10 pb-2">
                        🔎 Document to Verify — Click differences!
                    </h3>
                    <div className="space-y-3">
                        {doc.modifiedFields.map(field => {
                            const isFound = foundDiffs.includes(field.label);
                            const isFlashing = flashLabel === field.label;
                            const isShaking = shakeLabel === field.label;

                            return (
                                <button
                                    key={field.label}
                                    onClick={() => handleFieldClick(field.label)}
                                    className={`w-full flex justify-between items-center px-3 py-2.5 rounded-lg border transition-all duration-200 text-left ${
                                        isFound
                                            ? 'bg-emerald-500/20 border-emerald-500/40'
                                            : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/15 cursor-pointer'
                                    } ${isShaking ? 'animate-[shake_0.4s_ease-in-out] bg-red-500/10 border-red-500/30' : ''}
                                    ${isFlashing ? 'bg-emerald-500/30 border-emerald-400 scale-[1.02]' : ''}`}
                                >
                                    <span className="text-white/50 text-xs font-bold uppercase tracking-wider">{field.label}</span>
                                    <span className={`font-bold text-sm ${isFound ? 'text-emerald-300 line-through' : 'text-white'}`}>
                                        {field.value}
                                        {isFound && <span className="ml-2 text-emerald-400 no-underline">✓ Found!</span>}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Complete overlay */}
            {docComplete && (
                <div className="absolute inset-0 z-30 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-center p-10 bg-[#1e293b]/90 border border-white/10 rounded-3xl shadow-2xl max-w-md">
                        <div className="text-5xl mb-3">{wrongClicks === 0 ? '🏆' : '✅'}</div>
                        <h2 className="text-2xl font-black text-white mb-2">All Differences Found!</h2>
                        <p className="text-white/50 text-sm mb-6">
                            {wrongClicks === 0 ? 'Perfect — no wrong clicks!' : `${wrongClicks} wrong click${wrongClicks !== 1 ? 's' : ''}`}
                        </p>
                        <div className="flex justify-center gap-3 mb-6">
                            <span className="px-3 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-sm font-bold border border-amber-500/30">
                                +{foundDiffs.length * XP_PER_DIFF}{wrongClicks === 0 ? `+${BONUS_XP_NO_MISTAKES}` : ''} XP
                            </span>
                            <span className="px-3 py-1.5 rounded-full bg-yellow-500/20 text-yellow-300 text-sm font-bold border border-yellow-500/30">
                                +{foundDiffs.length * COINS_PER_DIFF}{wrongClicks === 0 ? `+${BONUS_COINS_NO_MISTAKES}` : ''} 🪙
                            </span>
                        </div>
                        <button
                            onClick={nextDocument}
                            className="px-10 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg hover:from-purple-400 hover:to-pink-400 transition-all active:scale-95"
                        >
                            {currentDoc + 1 >= documents.length ? 'View Results' : 'Next Document →'}
                        </button>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-6px); }
                    50% { transform: translateX(6px); }
                    75% { transform: translateX(-4px); }
                }
            `}</style>
        </div>
    );
}
