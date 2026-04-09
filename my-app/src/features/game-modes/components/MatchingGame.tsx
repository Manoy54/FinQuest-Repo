import { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatedBackground, GameComplete } from './MoneytaryMasteryComponents';
import { HUD } from '../../../components/navigation/HUD';
import { useUserContext } from '../../../context/UserContext';
import { getMatchRound } from './MatchingGameComponents';
import { HowToPlayModal } from './MatchingGameComponents/HowToPlayModal';

const PAIRS_PER_ROUND = 5;
const TOTAL_ROUNDS = 3;
const XP_PER_MATCH = 40;
const COINS_PER_MATCH = 20;
const BONUS_XP_PERFECT = 150;
const BONUS_COINS_PERFECT = 75;

type Phase = 'START' | 'PLAYING' | 'ROUND_COMPLETE' | 'RESULTS';

interface CardItem {
    id: string;
    content: string;
    type: 'term' | 'definition';
    pairId: string;
    matched: boolean;
}

export function MatchingGame() {
    const { addXp, addCoins } = useUserContext();
    const hasAwardedRef = useRef(false);

    const [phase, setPhase] = useState<Phase>('START');
    const [round, setRound] = useState(1);
    const [cards, setCards] = useState<CardItem[]>([]);
    const [selected, setSelected] = useState<CardItem | null>(null);
    const [matchedCount, setMatchedCount] = useState(0);
    const [totalMatched, setTotalMatched] = useState(0);
    const [mistakes, setMistakes] = useState(0);
    const [totalXp, setTotalXp] = useState(0);
    const [totalCoins, setTotalCoins] = useState(0);
    const [shakeId, setShakeId] = useState<string | null>(null);
    const [flashId, setFlashId] = useState<string | null>(null);
    const [timer, setTimer] = useState(0);
    const [showHowToPlay, setShowHowToPlay] = useState(true);

    const setupRound = useCallback((currentRound: number) => {
        const roundPairs = getMatchRound(currentRound);

        const termCards: CardItem[] = roundPairs.map(p => ({
            id: `term-${p.id}`,
            content: p.term,
            type: 'term',
            pairId: p.id,
            matched: false,
        }));

        const defCards: CardItem[] = roundPairs.map(p => ({
            id: `def-${p.id}`,
            content: p.definition,
            type: 'definition',
            pairId: p.id,
            matched: false,
        }));

        // Shuffle each column independently
        const shuffle = <T,>(arr: T[]) => {
            const s = [...arr];
            for (let i = s.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [s[i], s[j]] = [s[j], s[i]];
            }
            return s;
        };

        setCards([...shuffle(termCards), ...shuffle(defCards)]);
        setMatchedCount(0);
        setMistakes(0);
        setSelected(null);
        setTimer(0);
    }, []);

    const startGame = useCallback(() => {
        setRound(1);
        setTotalMatched(0);
        setTotalXp(0);
        setTotalCoins(0);
        hasAwardedRef.current = false;
        setupRound(1);
        setPhase('PLAYING');
    }, [setupRound]);

    // Timer
    useEffect(() => {
        if (phase !== 'PLAYING') return;
        const interval = setInterval(() => setTimer(p => p + 1), 1000);
        return () => clearInterval(interval);
    }, [phase]);

    // Check round complete
    useEffect(() => {
        if (phase === 'PLAYING' && matchedCount === PAIRS_PER_ROUND) {
            const earnedXp = matchedCount * XP_PER_MATCH + (mistakes === 0 ? BONUS_XP_PERFECT : 0);
            const earnedCoins = matchedCount * COINS_PER_MATCH + (mistakes === 0 ? BONUS_COINS_PERFECT : 0);
            setTotalXp(p => p + earnedXp);
            setTotalCoins(p => p + earnedCoins);
            setTotalMatched(p => p + matchedCount);

            if (round >= TOTAL_ROUNDS) {
                setPhase('RESULTS');
            } else {
                setPhase('ROUND_COMPLETE');
            }
        }
    }, [matchedCount, phase, round, mistakes]);

    // Award on results
    useEffect(() => {
        if (phase === 'RESULTS' && !hasAwardedRef.current) {
            if (totalXp > 0) addXp(totalXp);
            if (totalCoins > 0) addCoins(totalCoins);
            hasAwardedRef.current = true;
        }
    }, [phase, totalXp, totalCoins, addXp, addCoins]);

    const handleCardClick = (card: CardItem) => {
        if (card.matched || phase !== 'PLAYING') return;

        if (!selected) {
            setSelected(card);
            return;
        }

        if (selected.id === card.id) {
            setSelected(null);
            return;
        }

        // Must select one term and one definition
        if (selected.type === card.type) {
            setSelected(card);
            return;
        }

        // Check match
        if (selected.pairId === card.pairId) {
            setFlashId(card.pairId);
            setCards(prev => prev.map(c =>
                c.pairId === card.pairId ? { ...c, matched: true } : c
            ));
            setMatchedCount(p => p + 1);
            setSelected(null);
            setTimeout(() => setFlashId(null), 600);
        } else {
            setShakeId(selected.id + '|' + card.id);
            setMistakes(p => p + 1);
            setSelected(null);
            setTimeout(() => setShakeId(null), 500);
        }
    };

    const nextRound = () => {
        setRound(p => {
            const next = p + 1;
            setupRound(next);
            return next;
        });
        setPhase('PLAYING');
    };

    const termCards = cards.filter(c => c.type === 'term');
    const defCards = cards.filter(c => c.type === 'definition');

    if (phase === 'START') {
        return (
            <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #1a1a2e 100%)' }}>
                <AnimatedBackground />
                <div className="z-10 text-center p-6 md:p-16 backdrop-blur-xl bg-[#1e293b]/60 rounded-[24px] md:rounded-[40px] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.7)] max-w-2xl w-[92%] md:w-full">
                    <span className="text-4xl sm:text-5xl md:text-7xl font-black mb-4 md:mb-6 tracking-tighter block"
                        style={{
                            background: 'linear-gradient(135deg, #34d399 0%, #10b981 50%, #059669 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            filter: 'drop-shadow(0 0 15px rgba(16, 185, 129, 0.4))'
                        }}>
                        COINNECT
                    </span>
                    <p className="text-base md:text-2xl mb-8 md:mb-14 text-gray-300/90 font-light tracking-wide italic">
                        Match financial terms with their definitions!
                    </p>

                    <button
                        onClick={startGame}
                        className="group relative px-12 py-3 rounded-lg font-bold text-xl transition-all duration-300 active:scale-95"
                        style={{
                            background: 'linear-gradient(135deg, #6ee7b7 0%, #10b981 100%)',
                            color: '#000',
                            boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)',
                        }}
                    >
                        <span className="relative z-10">Start Game</span>
                    </button>

                    <div className="mt-8 md:mt-16 flex flex-wrap items-center justify-center gap-3 md:gap-10 text-[11px] md:text-[14px] text-white/60 font-bold uppercase tracking-widest">
                        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5">
                            <span className="text-emerald-400 text-lg">🧩</span>
                            <span>{PAIRS_PER_ROUND} Pairs</span>
                        </div>
                        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5">
                            <span className="text-amber-400 text-lg">📋</span>
                            <span>{TOTAL_ROUNDS} Rounds</span>
                        </div>
                        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5">
                            <span className="text-purple-400 text-lg">🏆</span>
                            <span>No Timer</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (phase === 'ROUND_COMPLETE') {
        return (
            <div className="min-h-[100dvh] w-full flex items-center justify-center relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #1a1a2e 100%)' }}>
                <AnimatedBackground />
                <div className="z-10 text-center p-12 backdrop-blur-xl bg-[#1e293b]/60 rounded-[40px] border border-white/10 shadow-2xl max-w-lg w-full">
                    <div className="text-6xl mb-4">🎉</div>
                    <h2 className="text-3xl font-black text-white mb-2">Round {round} Complete!</h2>
                    <p className="text-white/50 mb-6">
                        {mistakes === 0 ? 'Perfect round! No mistakes!' : `${mistakes} mistake${mistakes !== 1 ? 's' : ''}`}
                    </p>
                    <div className="flex justify-center gap-3 mb-8">
                        <span className="px-3 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-sm font-bold border border-amber-500/30">
                            +{matchedCount * XP_PER_MATCH}{mistakes === 0 ? `+${BONUS_XP_PERFECT}` : ''} XP
                        </span>
                        <span className="px-3 py-1.5 rounded-full bg-yellow-500/20 text-yellow-300 text-sm font-bold border border-yellow-500/30">
                            +{matchedCount * COINS_PER_MATCH}{mistakes === 0 ? `+${BONUS_COINS_PERFECT}` : ''} 🪙
                        </span>
                    </div>
                    <button
                        onClick={nextRound}
                        className="px-10 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold text-lg hover:from-emerald-400 hover:to-cyan-400 transition-all active:scale-95"
                    >
                        Round {round + 1} →
                    </button>
                </div>
            </div>
        );
    }

    if (phase === 'RESULTS') {
        return (
            <GameComplete
                score={totalMatched}
                totalCards={PAIRS_PER_ROUND * TOTAL_ROUNDS}
                exp={totalXp}
                coins={totalCoins}
                onRestart={startGame}
                onReplayLevel={startGame}
            />
        );
    }

    // PLAYING
    const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

    return (
        <div className="h-[100dvh] w-full flex flex-col items-center relative overflow-hidden px-2"
            style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #1a1a2e 100%)' }}>
            <AnimatedBackground />

            <HUD
                title="COINNECT"
                backPath="/home"
                currentExp={totalXp}
                level={round}
                expToNextLevel={PAIRS_PER_ROUND * XP_PER_MATCH * TOTAL_ROUNDS}
                progress={(matchedCount / PAIRS_PER_ROUND) * 100}
                coins={totalCoins}
                customLevelLabel={`Rd ${round}/${TOTAL_ROUNDS}`}
                showBadge={true}
                onHowToPlay={() => setShowHowToPlay(true)}
            >
                {/* Desktop only */}
                <div className="hidden md:flex items-center gap-3 shrink-0 relative z-20">
                    <div className="px-5 py-2 rounded-full text-sm font-black backdrop-blur-xl bg-white/10 border border-white/5 shadow-2xl">
                        <span className="text-white/70">⏱️ {formatTime(timer)}</span>
                    </div>
                    <div className="px-5 py-2 rounded-full text-sm font-black backdrop-blur-xl bg-white/10 border border-white/5 shadow-2xl">
                        <span className="text-emerald-400">{matchedCount}/{PAIRS_PER_ROUND} Matched</span>
                    </div>
                    {mistakes > 0 && (
                        <div className="px-5 py-2 rounded-full text-sm font-black backdrop-blur-xl bg-red-500/10 border border-red-500/20">
                            <span className="text-red-400">{mistakes} miss</span>
                        </div>
                    )}
                </div>
            </HUD>

            {/* Mobile only: Stats bar */}
            <div className="md:hidden w-full px-3 z-10 shrink-0 -mt-0.5">
                <div className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-xl bg-black/30 backdrop-blur-md border border-white/5">
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 text-xs font-black">
                        <span className="text-white/70">⏱️ {formatTime(timer)}</span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 text-xs font-black">
                        <span className="text-emerald-400">{matchedCount}/{PAIRS_PER_ROUND}</span>
                    </div>
                    {mistakes > 0 && (
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/10 text-xs font-black">
                            <span className="text-red-400">✕ {mistakes}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Match Area */}
            <div className="flex-1 w-full max-w-5xl px-3 md:px-6 mt-2 md:mt-20 z-10 flex flex-col md:flex-row gap-4 md:gap-6 items-start justify-center overflow-y-auto pb-4 md:pb-8">
                {/* Terms column */}
                <div className="flex-1 w-full flex flex-col gap-2 md:gap-3">
                    <h3 className="text-[10px] font-black text-indigo-300/50 uppercase tracking-[0.2em] mb-0.5 pl-1">Terms</h3>
                    {termCards.map(card => {
                        const isSelected = selected?.id === card.id;
                        const isShaking = shakeId?.includes(card.id);
                        const isFlashing = flashId === card.pairId;

                        return (
                            <button
                                key={card.id}
                                onClick={() => handleCardClick(card)}
                                disabled={card.matched}
                                className={`w-full px-3 md:px-5 py-3 md:py-4 rounded-xl text-xs md:text-sm font-bold transition-all duration-200 border-l-[3px] border text-left ${card.matched
                                    ? 'bg-emerald-500/20 border-emerald-500/30 !border-l-emerald-400 text-emerald-300 opacity-60'
                                    : isSelected
                                        ? 'bg-indigo-500/30 border-indigo-400 !border-l-indigo-400 text-white scale-[1.02] shadow-lg shadow-indigo-500/20'
                                        : 'bg-white/[0.08] border-white/10 !border-l-indigo-500/40 text-white/90 hover:bg-white/[0.12] hover:border-white/20 hover:!border-l-indigo-400 cursor-pointer'
                                    } ${isShaking ? 'animate-[shake_0.4s_ease-in-out]' : ''} ${isFlashing ? 'animate-[flash_0.5s_ease-in-out]' : ''}`}
                            >
                                {card.matched ? '✓ ' : ''}{card.content}
                            </button>
                        );
                    })}
                </div>

                {/* Definitions column */}
                <div className="flex-1 w-full flex flex-col gap-2 md:gap-3">
                    <h3 className="text-[10px] font-black text-purple-300/50 uppercase tracking-[0.2em] mb-0.5 pl-1">Definitions</h3>
                    {defCards.map(card => {
                        const isSelected = selected?.id === card.id;
                        const isShaking = shakeId?.includes(card.id);
                        const isFlashing = flashId === card.pairId;

                        return (
                            <button
                                key={card.id}
                                onClick={() => handleCardClick(card)}
                                disabled={card.matched}
                                className={`w-full px-3 md:px-5 py-3 md:py-4 rounded-xl text-xs md:text-sm font-medium transition-all duration-200 border-l-[3px] border text-left leading-relaxed ${card.matched
                                    ? 'bg-emerald-500/20 border-emerald-500/30 !border-l-emerald-400 text-emerald-300 opacity-60'
                                    : isSelected
                                        ? 'bg-purple-500/30 border-purple-400 !border-l-purple-400 text-white scale-[1.02] shadow-lg shadow-purple-500/20'
                                        : 'bg-white/[0.04] border-white/[0.06] !border-l-purple-500/30 text-white/70 hover:bg-white/[0.08] hover:border-white/15 hover:!border-l-purple-400 cursor-pointer'
                                    } ${isShaking ? 'animate-[shake_0.4s_ease-in-out]' : ''} ${isFlashing ? 'animate-[flash_0.5s_ease-in-out]' : ''}`}
                            >
                                {card.matched ? '✓ ' : ''}{card.content}
                            </button>
                        );
                    })}
                </div>
            </div>

            <style>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-6px); }
                    50% { transform: translateX(6px); }
                    75% { transform: translateX(-4px); }
                }
                @keyframes flash {
                    0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.6); }
                    50% { box-shadow: 0 0 20px 4px rgba(16, 185, 129, 0.4); }
                    100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
                }
            `}</style>

            <HowToPlayModal
                isOpen={showHowToPlay}
                onClose={() => setShowHowToPlay(false)}
            />
        </div>
    );
}
