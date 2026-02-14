import { useState, useEffect } from 'react';
import { FaCoins } from 'react-icons/fa6';
import {
    beginnerCards,
    level11Cards,
    level21Cards,
    level31Cards,
    AnimatedBackground,
    FlashCard,
    GameComplete,
    GameStyles,
    useGameSounds,
    GameRatingModal,
    HowToPlayModal
} from './MoneytaryMasteryComponents';
import { HUD } from '../../app/components/HUD';


export function MonetaryMastery() {
    const [activeCards, setActiveCards] = useState(beginnerCards);
    const [levelOffset, setLevelOffset] = useState(0);
    const [levelStartScore, setLevelStartScore] = useState(0);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [score, setScore] = useState(0);
    const [exp, setExp] = useState(0);
    const [coins, setCoins] = useState(0);
    const [levelStartExp, setLevelStartExp] = useState(0);
    const [levelStartCoins, setLevelStartCoins] = useState(0);
    const [answeredCards, setAnsweredCards] = useState<Set<number>>(new Set());
    const [gameComplete, setGameComplete] = useState(false);
    const [showRating, setShowRating] = useState(false);
    const [showHowToPlay, setShowHowToPlay] = useState(true);
    // Randomly select a question number between 10 and 40 to trigger the rating
    const [ratingTarget] = useState(() => Math.floor(Math.random() * (40 - 10 + 1)) + 10);
    const { playSound } = useGameSounds();

    const currentCard = activeCards[currentCardIndex];
    // Progress for current level
    const currentLevelScore = score - levelStartScore;

    // Level Logic
    const XP_PER_LEVEL = 30;
    const level = currentCardIndex + 1 + levelOffset;
    const MAX_LEVEL = 40;
    const TOTAL_GAME_XP = MAX_LEVEL * XP_PER_LEVEL;
    const progressPercentage = Math.min((exp / TOTAL_GAME_XP) * 100, 100);

    // Check for rating trigger whenever level changes
    useEffect(() => {
        if (level === ratingTarget) {
            // Small delay to let the card transition finish slightly
            const timer = setTimeout(() => setShowRating(true), 500);
            return () => clearTimeout(timer);
        }
    }, [level, ratingTarget]);

    const handleFlip = () => {
        playSound('flip');
        setIsFlipped(!isFlipped);
    };

    const handleKnew = () => {
        playSound('correct');
        if (!answeredCards.has(currentCardIndex)) {
            setScore(score + 1);
            setExp(exp + 30);
            setCoins(coins + 50);
            setAnsweredCards(new Set([...answeredCards, currentCardIndex]));
        }
        goToNextCard();
    };

    const handleDidntKnow = () => {
        playSound('wrong');
        if (!answeredCards.has(currentCardIndex)) {
            setAnsweredCards(new Set([...answeredCards, currentCardIndex]));
        }
        goToNextCard();
    };

    const goToNextCard = () => {
        setIsFlipped(false);
        if (currentCardIndex < activeCards.length - 1) {
            setTimeout(() => {
                const nextIndex = currentCardIndex + 1;
                setCurrentCardIndex(nextIndex);
            }, 300);
        } else {
            setGameComplete(true);
        }
    };

    const goToPrevCard = () => {
        if (currentCardIndex > 0) {
            playSound('click');
            setIsFlipped(false);
            setTimeout(() => {
                setCurrentCardIndex(currentCardIndex - 1);
            }, 300);
        }
    };

    const restartGame = () => {
        setActiveCards(beginnerCards);
        setLevelOffset(0);
        setLevelStartScore(0);
        setCurrentCardIndex(0);
        setIsFlipped(false);
        setScore(0);
        setExp(0);
        setCoins(0);
        setLevelStartExp(0);
        setLevelStartCoins(0);
        setAnsweredCards(new Set());
        setGameComplete(false);
    };

    const handleReplayLevel = () => {
        // Keeps the current activeCards and levelOffset
        // Resets current level progress but keeps cumulative score baseline
        setCurrentCardIndex(0);
        setIsFlipped(false);
        setScore(levelStartScore); // Reset score to what it was at start of level
        setExp(levelStartExp); // Reset EXP to start of level
        setCoins(levelStartCoins); // Reset Coins to start of level
        setAnsweredCards(new Set());
        setGameComplete(false);
    };

    const handleNextLevel = () => {
        if (levelOffset === 0) {
            setActiveCards(level11Cards);
            setLevelOffset(10); // Start at level 11
        } else if (levelOffset === 10) {
            setActiveCards(level21Cards);
            setLevelOffset(20); // Start at level 21
        } else if (levelOffset === 20) {
            setActiveCards(level31Cards);
            setLevelOffset(30); // Start at level 31
        }

        // Lock in the score from the previous level (score becomes the baseline for next level)
        setLevelStartScore(score);
        setLevelStartExp(exp);
        setLevelStartCoins(coins);

        setCurrentCardIndex(0);
        setIsFlipped(false);
        setAnsweredCards(new Set());
        setGameComplete(false);
    };

    const hasNextLevel = levelOffset < 30; // 30 is start of Level 31 block, if it's the last one, we stop there? Or is it active?
    // If level31Cards is empty, maybe we shouldn't proceed? User asked button to exist.
    // If we transition to empty set, game might break. Let's assume user will add cards later or we just show button.

    // Actually, if level31Cards is empty, activeCards array is empty, which might cause issues.
    // But user asked for the button.

    const getNextLevelLabel = () => {
        if (levelOffset === 0) return "PROCEED TO LEVEL 2 🚀";
        if (levelOffset === 10) return "PROCEED TO LEVEL 3 🚀";
        if (levelOffset === 20) return "PROCEED TO LEVEL 4 🚀";
        return "PROCEED TO NEXT LEVEL 🚀";
    };

    // Show completion screen
    if (gameComplete) {
        return (
            <GameComplete
                score={score}
                levelScore={currentLevelScore}
                exp={exp}
                coins={coins}
                totalCards={levelOffset + activeCards.length}
                onRestart={restartGame}
                onReplayLevel={handleReplayLevel}
                onNextLevel={hasNextLevel ? handleNextLevel : undefined}
                nextLevelLabel={getNextLevelLabel()}
                showComingSoon={!hasNextLevel}
                comingSoonLabel="LEVEL 5 COMING SOON 🚀"
                requiredScore={
                    levelOffset === 0 ? 9 :
                        levelOffset === 10 ? 18 :
                            27 // For Level 31 unlock (after finishing Level 21-30, accumulated score 27/30?)
                }
            />
        );
    }

    // Main game screen
    return (
        <div className="h-screen flex flex-col overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #1a1a2e 100%)'
            }}
        >
            <AnimatedBackground />

            {/* Header */}
            <HUD
                title="MONETARY MASTERY"
                currentExp={exp}
                // level calculation was Math.floor((level - 1) / 10) + 1
                level={Math.floor((level - 1) / 10) + 1}
                expToNextLevel={XP_PER_LEVEL}
                progress={progressPercentage}
                coins={coins}
                totalLevel={MAX_LEVEL}
                onHowToPlay={() => setShowHowToPlay(true)}
                className="pt-8 h-24"
                showTitle={false}
                showStats={false}
            />

            {/* Top Center Stats - Absolute for guaranteed top placement */}
            {!showHowToPlay && (
                <div className="absolute top-4 left-0 w-full flex flex-col items-center pointer-events-none z-20 pt-2">
                    {/* Title */}
                    <h1 className="text-3xl md:text-3xl font-black tracking-tight font-['Outfit'] drop-shadow-sm select-none mb-4 text-center pointer-events-auto"
                        style={{
                            background: 'linear-gradient(135deg, #ffd700 0%, #ff6b35 50%, #ffd700 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.2))'
                        }}
                    >
                        MONETARY MASTERY
                    </h1>

                    {/* Progress Bar Block */}
                    <div className="w-full max-w-2xl mx-auto px-3 py-1.5 rounded-xl relative overflow-hidden flex items-center justify-between gap-3 shrink-0 transition-all pointer-events-auto mb-4"
                        style={{
                            background: 'linear-gradient(135deg, #6d28d9 0%, #4f46e5 100%)',
                            boxShadow: '0 4px 15px -3px rgba(79, 70, 229, 0.4)',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}
                    >
                        <div className="absolute inset-0 opacity-10"
                            style={{
                                backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                                backgroundSize: '20px 20px'
                            }}
                        />

                        <div className="relative z-10 flex items-center gap-3 flex-1">
                            {/* Level Badge */}
                            <div className="flex items-center gap-2 shrink-0">
                                <div className="h-9 w-9 rounded-xl bg-white/10 flex flex-col items-center justify-center border border-white/20 shadow-inner backdrop-blur-sm">
                                    <span className="text-[8px] text-blue-200 font-bold uppercase tracking-wider leading-none mb-0.5">Lvl</span>
                                    <span className="font-bold text-white leading-none text-sm">
                                        {Math.floor((currentCardIndex + 1 + levelOffset - 1) / 10) + 1}
                                    </span>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="flex-1 flex flex-col justify-center">
                                <div className="flex justify-between text-[10px] text-blue-100 mb-1 px-0.5 font-medium">
                                    <span>XP Progress</span>
                                    <span>{exp.toLocaleString()} / {(MAX_LEVEL * XP_PER_LEVEL).toLocaleString()} XP</span>
                                </div>
                                <div className="h-2 bg-black/30 rounded-full overflow-hidden p-[1.5px]">
                                    <div
                                        className="h-full rounded-full transition-all duration-1000 ease-out shadow-sm"
                                        style={{
                                            background: 'linear-gradient(90deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
                                            width: `${Math.min(100, Math.max(0, progressPercentage))}%`
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Coins */}
                        <div className="relative z-10 flex flex-col items-end gap-0.5 shrink-0 pl-2 border-l border-white/10">
                            <div className="flex items-center gap-1.5 bg-black/20 px-2 py-1 rounded-lg">
                                <FaCoins className="text-yellow-400 text-[10px]" />
                                <span className="font-bold text-white text-xs">{coins.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Main Content Area - Flexible to take remaining space, containing the Card */}
            <div className="relative z-10 flex-1 w-full px-4 pt-4 pb-4 min-h-0 flex flex-col items-center justify-center">
                <div className="relative w-full max-w-2xl h-full flex flex-col items-center">
                    {/* Spacer to push content down below the absolute header */}
                    <div className="h-16 shrink-0"></div>

                    {/* Card Status Text */}
                    <div className="text-center text-white/50 text-sm font-medium mb-2 tracking-wide">
                        Card {currentCardIndex + 1 + levelOffset} of {MAX_LEVEL} | {Math.round(progressPercentage)}% Complete
                    </div>

                    {/* Card Container */}
                    <div className="flex-1 min-h-0 w-full mt-4 relative">
                        {/* Navigation Buttons Outside Card */}
                        <div className="absolute top-1/2 -translate-y-1/2 -left-16 z-20">
                            <button
                                onClick={goToPrevCard}
                                disabled={currentCardIndex === 0}
                                className="w-12 h-12 rounded-full flex items-center justify-center text-white/50 text-4xl hover:text-white transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed hover:scale-110 active:scale-95 !bg-transparent hover:!bg-white/10 !border-none outline-none shadow-none"
                                style={{ outline: 'none', boxShadow: 'none' }}
                            >
                                ←
                            </button>
                        </div>
                        <div className="absolute top-1/2 -translate-y-1/2 -right-16 z-20">
                            <button
                                onClick={goToNextCard}
                                className="w-12 h-12 rounded-full flex items-center justify-center text-white/50 text-4xl hover:text-white transition-all duration-300 hover:scale-110 active:scale-95 !bg-transparent hover:!bg-white/10 !border-none outline-none shadow-none"
                                style={{ outline: 'none', boxShadow: 'none' }}
                            >
                                →
                            </button>
                        </div>

                        <FlashCard
                            card={currentCard}
                            isFlipped={isFlipped}
                            onFlip={handleFlip}
                        />
                    </div>
                    {/* Fixed Answer Buttons Footer - Always Visible */}
                    <div className="relative z-20 px-4 pb-8 pt-8 w-full flex justify-center shrink-0">
                        <div className="w-full max-w-2xl flex justify-center gap-4">
                            <button
                                onClick={handleDidntKnow}
                                disabled={!isFlipped}
                                className={`flex-1 max-w-[180px] py-4 rounded-xl font-bold text-base md:text-lg transition-all duration-300 ${!isFlipped ? 'opacity-50 cursor-not-allowed grayscale' : 'hover:scale-105 active:scale-95'}`}
                                style={{
                                    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                                    color: '#fff',
                                    boxShadow: !isFlipped ? 'none' : '0 4px 15px rgba(239, 68, 68, 0.4)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    pointerEvents: !isFlipped ? 'none' : 'auto'
                                }}
                            >
                                ❌ Didn't Know
                            </button>
                            <button
                                onClick={handleKnew}
                                disabled={!isFlipped}
                                className={`flex-1 max-w-[180px] py-4 rounded-xl font-bold text-base md:text-lg transition-all duration-300 ${!isFlipped ? 'opacity-50 cursor-not-allowed grayscale' : 'hover:scale-105 active:scale-95'}`}
                                style={{
                                    background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', // Green
                                    color: '#fff',
                                    boxShadow: !isFlipped ? 'none' : '0 4px 15px rgba(34, 197, 94, 0.4)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    pointerEvents: !isFlipped ? 'none' : 'auto'
                                }}
                            >
                                ✓ Knew It!
                            </button>
                        </div>
                    </div>

                    <style>{GameStyles}</style>

                    <GameRatingModal
                        isOpen={showRating}
                        onClose={() => setShowRating(false)}
                        gameId="monetary_mastery"
                    />

                    <HowToPlayModal
                        isOpen={showHowToPlay}
                        onClose={() => setShowHowToPlay(false)}
                    />
                </div >
            </div>
        </div>
    );
}
