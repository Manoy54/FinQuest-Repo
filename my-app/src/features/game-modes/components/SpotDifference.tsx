import { useState, useEffect, useCallback, useRef, MouseEvent as ReactMouseEvent } from 'react';
import { AnimatedBackground, GameComplete } from './MoneytaryMasteryComponents';
import { HUD } from '../../../components/navigation/HUD';
import { useUserContext } from '../../../context/UserContext';
import { getPuzzles, type ImagePuzzle, type DifferenceZone } from './SpotDifferenceComponents';
import { HowToPlayModal } from './SpotDifferenceComponents/HowToPlayModal';

const ROUNDS = 5;
const XP_PER_DIFF = 50;
const COINS_PER_DIFF = 25;
const BONUS_XP_NO_MISTAKES = 100;
const BONUS_COINS_NO_MISTAKES = 50;

type Phase = 'START' | 'PLAYING' | 'RESULTS';

export function SpotDifference() {
    const { addXp, addCoins } = useUserContext();
    const hasAwardedRef = useRef(false);

    const [phase, setPhase] = useState<Phase>('START');
    const [puzzles, setPuzzles] = useState<ImagePuzzle[]>([]);
    const [currentDoc, setCurrentDoc] = useState(0);
    const [foundDiffs, setFoundDiffs] = useState<string[]>([]);
    const [wrongClicks, setWrongClicks] = useState(0);
    const [totalFound, setTotalFound] = useState(0);
    const [totalDiffs, setTotalDiffs] = useState(0);
    const [totalXp, setTotalXp] = useState(0);
    const [totalCoins, setTotalCoins] = useState(0);
    const [flashLabel, setFlashLabel] = useState<string | null>(null);
    const [showHowToPlay, setShowHowToPlay] = useState(true);
    const [docComplete, setDocComplete] = useState(false);
    
    // For handling missing images
    const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
    const [imgErrorCount, setImgErrorCount] = useState(0);
    
    // Debug: show last click
    const [lastClick, setLastClick] = useState<{x: number, y: number} | null>(null);
    
    // For hit visual effects
    const [mistakeMarkers, setMistakeMarkers] = useState<{id: number, x: number, y: number}[]>([]);
    const [shake, setShake] = useState(false);

    const startGame = useCallback(() => {
        setPuzzles(getPuzzles(ROUNDS));
        setCurrentDoc(0);
        setFoundDiffs([]);
        setWrongClicks(0);
        setTotalFound(0);
        setTotalDiffs(0);
        setTotalXp(0);
        setTotalCoins(0);
        setDocComplete(false);
        setMistakeMarkers([]);
        hasAwardedRef.current = false;
        setPhase('PLAYING');
    }, []);

    const puzzle = puzzles[currentDoc];

    // Check if all differences found for current document
    useEffect(() => {
        if (phase !== 'PLAYING' || !puzzle) return;
        if (foundDiffs.length === puzzle.differences.length && puzzle.differences.length > 0) {
            setDocComplete(true);
        }
    }, [foundDiffs, puzzle, phase]);

    // Award on results
    useEffect(() => {
        if (phase === 'RESULTS' && !hasAwardedRef.current) {
            if (totalXp > 0) addXp(totalXp);
            if (totalCoins > 0) addCoins(totalCoins);
            hasAwardedRef.current = true;
        }
    }, [phase, totalXp, totalCoins, addXp, addCoins]);

    const handleSuccessClick = (e: ReactMouseEvent, diff: DifferenceZone) => {
        e.stopPropagation();
        if (!puzzle || docComplete || foundDiffs.includes(diff.id)) return;
        
        setFoundDiffs(prev => [...prev, diff.id]);
        setFlashLabel(diff.id);
        setTimeout(() => setFlashLabel(null), 600);
    };

    const handleWrongClick = (e: ReactMouseEvent<HTMLDivElement>) => {
        if (!puzzle || docComplete) return;

        // Calculate click coordinates relative to the div
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        setLastClick({x, y});
        setWrongClicks(p => p + 1);
        const newMarker = { id: Date.now(), x, y };
        setMistakeMarkers(prev => [...prev, newMarker]);
        
        // Remove marker after animation
        setTimeout(() => {
            setMistakeMarkers(prev => prev.filter(m => m.id !== newMarker.id));
        }, 1000);

        // Shake container
        setShake(true);
        setTimeout(() => setShake(false), 400);
    };

    const nextDocument = () => {
        if (!puzzle) return;
        
        const earned = foundDiffs.length;
        const bonusXp = wrongClicks === 0 ? BONUS_XP_NO_MISTAKES : 0;
        const bonusCoins = wrongClicks === 0 ? BONUS_COINS_NO_MISTAKES : 0;

        setTotalFound(p => p + earned);
        setTotalDiffs(p => p + puzzle.differences.length);
        setTotalXp(p => p + earned * XP_PER_DIFF + bonusXp);
        setTotalCoins(p => p + earned * COINS_PER_DIFF + bonusCoins);

        if (currentDoc + 1 >= puzzles.length) {
            setPhase('RESULTS');
        } else {
            setCurrentDoc(p => p + 1);
            setFoundDiffs([]);
            setWrongClicks(0);
            setDocComplete(false);
            setMistakeMarkers([]);
        }
    };

    if (phase === 'START') {
        return (
            <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #1a1a2e 100%)' }}>
                <AnimatedBackground />
                <div className="z-10 text-center p-6 md:p-16 backdrop-blur-xl bg-[#1e293b]/60 rounded-[24px] md:rounded-[40px] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.7)] max-w-2xl w-[92%] md:w-full">
                    <span className="text-3xl sm:text-4xl md:text-6xl font-black mb-4 md:mb-6 tracking-tighter block"
                        style={{
                            background: 'linear-gradient(135deg, #c084fc 0%, #a855f7 50%, #7c3aed 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            filter: 'drop-shadow(0 0 15px rgba(168, 85, 247, 0.4))'
                        }}>
                        SPOT THE DIFFERENCE
                    </span>
                    <p className="text-base md:text-2xl mb-8 md:mb-14 text-gray-300/90 font-light tracking-wide italic">
                        Compare documents and find visual discrepancies!
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

                    <div className="mt-8 md:mt-16 flex flex-wrap items-center justify-center gap-3 md:gap-10 text-[11px] md:text-[14px] text-white/60 font-bold uppercase tracking-widest">
                        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5">
                            <span className="text-purple-400 text-lg">🔎</span>
                            <span>Find Visual Differences</span>
                        </div>
                        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5">
                            <span className="text-amber-400 text-lg">🖼️</span>
                            <span>{ROUNDS} Images</span>
                        </div>
                        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5">
                            <span className="text-red-400 text-lg">⚠️</span>
                            <span>Beware of fakes</span>
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

    if (!puzzle) return null;

    return (
        <div className="h-[100dvh] w-full flex flex-col items-center relative overflow-hidden px-2"
            style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #1a1a2e 100%)' }}>
            <AnimatedBackground />

            <HUD
                title="SPOT THE DIFFERENCE"
                backPath="/home"
                currentExp={totalXp}
                level={currentDoc + 1}
                expToNextLevel={ROUNDS * 2 * XP_PER_DIFF}
                progress={(foundDiffs.length / Math.max(1, puzzle.differences.length)) * 100}
                coins={totalCoins}
                customLevelLabel={`Image ${currentDoc + 1}/${ROUNDS}`}
                showBadge={true}
                onHowToPlay={() => setShowHowToPlay(true)}
            >
                {/* Desktop only */}
                <div className="hidden md:flex items-center gap-3 shrink-0 relative z-20">
                    <div className="px-5 py-2 rounded-full text-sm font-black backdrop-blur-xl bg-white/10 border border-white/5 shadow-2xl">
                        <span className="text-emerald-400">🔎 {foundDiffs.length}/{puzzle.differences.length}</span>
                    </div>
                    {wrongClicks > 0 && (
                        <div className="px-5 py-2 rounded-full text-sm font-black backdrop-blur-xl bg-red-500/10 border border-red-500/20">
                            <span className="text-red-400">✕ {wrongClicks}</span>
                        </div>
                    )}
                </div>
            </HUD>

            {/* Mobile only: Stats bar */}
            <div className="md:hidden w-full px-3 z-10 shrink-0 -mt-0.5">
                <div className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-xl bg-black/30 backdrop-blur-md border border-white/5">
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 text-xs font-black">
                        <span className="text-emerald-400">🔎 {foundDiffs.length}/{puzzle.differences.length}</span>
                    </div>
                    {wrongClicks > 0 && (
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/10 text-xs font-black">
                            <span className="text-red-400">✕ {wrongClicks}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Document Info */}
            <div className="w-full max-w-5xl px-3 md:px-6 mt-1 md:mt-4 z-10 shrink-0">
                <div className="text-center mb-2">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-purple-300 bg-purple-500/20 px-2.5 py-1 rounded-full border border-purple-500/30">
                        {puzzle.category}
                    </span>
                    <h2 className="text-white font-black text-base md:text-xl mt-1 md:mt-2">{puzzle.title}</h2>
                    <p className="text-white/40 text-xs md:text-sm">{puzzle.description}</p>
                </div>
            </div>

            {/* Side-by-side images */}
            <div className="flex-1 w-full max-w-[1400px] px-3 md:px-6 z-10 flex flex-col lg:flex-row gap-4 lg:gap-8 overflow-y-auto overflow-x-hidden pb-4 md:pb-8 items-center lg:items-start justify-center">
                {/* Original Image */}
                <div className="w-full lg:w-1/2 max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl p-3 md:p-5 flex flex-col">
                    <h3 className="text-[10px] md:text-xs font-black text-emerald-400 uppercase tracking-widest mb-3 md:mb-4 text-center border-b border-white/10 pb-2 shrink-0">
                        ✓ Original
                    </h3>
                    <div className="relative w-full aspect-[2/1] rounded-lg overflow-hidden bg-black/30 flex items-center justify-center">
                         {imageErrors[puzzle.originalImage] ? (
                            <div className="text-white/30 text-sm text-center p-4 border border-dashed border-white/20 w-full h-full flex flex-col items-center justify-center gap-2">
                                <span>Image not found.</span>
                                <span>Needs public{puzzle.originalImage}</span>
                                <button onClick={() => setImgErrorCount(p => p+1)} className="px-3 py-1 bg-white/10 rounded mt-2 text-xs">Retry</button>
                            </div>
                         ) : (
                            <img 
                                key={`orig-${currentDoc}-${imgErrorCount}`}
                                src={puzzle.originalImage} 
                                alt="Original" 
                                className="w-full h-full object-contain"
                                onError={() => setImageErrors(prev => ({...prev, [puzzle.originalImage]: true}))}
                            />
                         )}
                    </div>
                </div>

                {/* Modified Image (Clickable) */}
                <div className={`w-full lg:w-1/2 max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl p-3 md:p-5 flex flex-col transition-transform ${shake ? 'animate-[shake_0.4s_ease-in-out] border-red-500/50' : ''}`}>
                    <h3 className="text-[10px] md:text-xs font-black text-amber-400 uppercase tracking-widest mb-3 md:mb-4 text-center border-b border-white/10 pb-2 shrink-0">
                        🔎 Spot {puzzle.differences.length} Differences!
                    </h3>
                    
                    <div 
                        className="relative w-full aspect-[2/1] rounded-lg overflow-hidden bg-black/30 cursor-crosshair flex items-center justify-center"
                        onClick={handleWrongClick}
                    >
                         {imageErrors[puzzle.editedImage] ? (
                            <div className="text-white/30 text-sm text-center p-4 border border-dashed border-white/20 w-full h-full flex flex-col items-center justify-center gap-2">
                                <span>Image not found.</span>
                                <span>Needs public{puzzle.editedImage}</span>
                                <button onClick={() => setImgErrorCount(p => p+1)} className="px-3 py-1 bg-white/10 rounded mt-2 text-xs relative z-50">Retry</button>
                            </div>
                         ) : (
                             <img 
                                key={`edited-${currentDoc}-${imgErrorCount}`}
                                src={puzzle.editedImage} 
                                alt="Edited" 
                                className="w-full h-full object-contain pointer-events-none"
                                onError={() => setImageErrors(prev => ({...prev, [puzzle.editedImage]: true}))}
                             />
                         )}
                         
                         {/* Hotspot Zones */}
                         {puzzle.differences.map(diff => {
                             const isFound = foundDiffs.includes(diff.id);
                             const isFlashing = flashLabel === diff.id;
                             
                             return (
                                 <div
                                     key={diff.id}
                                     style={{
                                         left: `${diff.x}%`,
                                         top: `${diff.y}%`,
                                         width: `${diff.width}%`,
                                         height: `${diff.height}%`
                                     }}
                                     className={`absolute cursor-pointer rounded-lg transition-all duration-300 ${
                                         isFound ? 'border-4 border-emerald-400 bg-emerald-400/20 shadow-[0_0_15px_rgba(52,211,153,0.6)] z-10' : 'border-2 border-transparent hover:border-white/30 z-20'
                                     } ${isFlashing ? 'scale-110 bg-emerald-400/50' : ''}`}
                                     onClick={(e) => handleSuccessClick(e, diff)}
                                 >
                                    {isFound && (
                                        <div className="absolute -top-3 -right-3 bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-lg">
                                            ✓
                                        </div>
                                    )}
                                 </div>
                             );
                         })}

                         {/* Mistake Markers (X) */}
                         {mistakeMarkers.map(marker => (
                             <div 
                                key={marker.id}
                                style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
                                className="absolute w-8 h-8 -ml-4 -mt-4 text-red-500 text-3xl font-black pointer-events-none z-30 drop-shadow-md animate-[pulse_0.2s_ease-out_forwards]"
                             >
                                 ✕
                             </div>
                         ))}
                    </div>
                    
                    {/* Differences Found List */}
                    {foundDiffs.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                            {puzzle.differences.map(diff => {
                                if (!foundDiffs.includes(diff.id)) return null;
                                return (
                                    <span key={diff.id} className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded border border-emerald-500/30">
                                        ✓ {diff.description}
                                    </span>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* Complete overlay */}
            {docComplete && (
                <div className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-center p-10 bg-[#1e293b]/90 border border-white/10 rounded-3xl shadow-2xl max-w-md animate-[scaleIn_0.3s_ease-out]">
                        <div className="text-5xl mb-3">{wrongClicks === 0 ? '🏆' : '✅'}</div>
                        <h2 className="text-2xl font-black text-white mb-2">Amazing Observation!</h2>
                        <p className="text-white/50 text-sm mb-6">
                            {wrongClicks === 0 ? 'Perfect — Flawless victory!' : `${wrongClicks} wrong click${wrongClicks !== 1 ? 's' : ''}`}
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
                            className="px-10 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg hover:from-purple-400 hover:to-pink-400 transition-all active:scale-95 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                        >
                            {currentDoc + 1 >= puzzles.length ? 'View Results' : 'Next Image →'}
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
                @keyframes scaleIn {
                    from { transform: scale(0.9); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
            `}</style>

            <HowToPlayModal
                isOpen={showHowToPlay}
                onClose={() => setShowHowToPlay(false)}
            />
        </div>
    );
}
