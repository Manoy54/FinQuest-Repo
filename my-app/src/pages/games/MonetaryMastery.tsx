import { useState } from 'react';
import {
    beginnerCards,
    AnimatedBackground,
    ProgressBar,
    FlashCard,
    NavigationButtons,
    GameComplete,
    GameStyles,
    useGameSounds
} from './MoneytaryMasteryComponents';
import { Link } from 'react-router-dom';

export function MonetaryMastery() {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [score, setScore] = useState(0);
    const [answeredCards, setAnsweredCards] = useState<Set<number>>(new Set());
    const [gameComplete, setGameComplete] = useState(false);
    const { playSound } = useGameSounds();

    const currentCard = beginnerCards[currentCardIndex];
    const progress = (answeredCards.size / beginnerCards.length) * 100;

    const handleFlip = () => {
        playSound('flip');
        setIsFlipped(!isFlipped);
    };

    const handleKnew = () => {
        playSound('correct');
        if (!answeredCards.has(currentCardIndex)) {
            setScore(score + 1);
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
        if (currentCardIndex < beginnerCards.length - 1) {
            setTimeout(() => {
                setCurrentCardIndex(currentCardIndex + 1);
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
        setCurrentCardIndex(0);
        setIsFlipped(false);
        setScore(0);
        setAnsweredCards(new Set());
        setGameComplete(false);
    };

    // Show completion screen
    if (gameComplete) {
        return (
            <GameComplete
                score={score}
                totalCards={beginnerCards.length}
                onRestart={restartGame}
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

            {/* Combined Header with Title */}
            <header className="relative z-10 px-4 pt-8 pb-4 shrink-0">
                <div className="flex items-center justify-between mb-1">
                    <Link
                        to="/home"
                        className="flex items-center gap-1 text-white/70 hover:text-white transition-colors text-sm"
                        style={{ textDecoration: 'none' }}
                    >
                        <span>←</span>
                        <span>Back</span>
                    </Link>
                    {/* Fixed centered title - relative to viewport width */}
                    <div className="fixed left-0 w-full top-8 flex justify-center pointer-events-none z-10">
                        <h1 className="text-2xl md:text-3xl font-bold"
                            style={{
                                fontFamily: "'Outfit', sans-serif",
                                background: 'linear-gradient(135deg, #ffd700 0%, #ff6b35 50%, #ffd700 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}
                        >
                            Monetary Mastery
                        </h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="px-3 py-1 rounded-full text-sm"
                            style={{
                                background: 'rgba(255, 255, 255, 0.1)',
                                backdropFilter: 'blur(10px)'
                            }}
                        >
                            <span className="text-amber-400 font-bold">Score: {score}</span>
                        </div>
                        <div className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">
                            BEGINNER
                        </div>
                    </div>
                </div>
            </header>

            <ProgressBar
                currentIndex={currentCardIndex}
                totalCards={beginnerCards.length}
                progress={progress}
            />

            {/* Flashcard with overlapping navigation buttons and answer buttons below */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-start px-4 pt-4 min-h-0">
                <div className="relative w-full max-w-2xl">
                    <NavigationButtons
                        currentCardIndex={currentCardIndex}
                        onPrevCard={goToPrevCard}
                        onNextCard={goToNextCard}
                    />
                    <FlashCard
                        card={currentCard}
                        isFlipped={isFlipped}
                        onFlip={handleFlip}
                    />
                </div>

                {/* Answer buttons - right below the flashcard */}
                <div className="w-full max-w-2xl mt-4">
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={handleDidntKnow}
                            className="flex-1 max-w-[180px] py-3 rounded-xl font-semibold text-base transition-all duration-300 hover:scale-105"
                            style={{
                                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                                color: '#fff',
                                boxShadow: '0 8px 25px rgba(239, 68, 68, 0.3)'
                            }}
                        >
                            ❌ Didn't Know
                        </button>
                        <button
                            onClick={handleKnew}
                            className="flex-1 max-w-[180px] py-3 rounded-xl font-semibold text-base transition-all duration-300 hover:scale-105"
                            style={{
                                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                color: '#fff',
                                boxShadow: '0 8px 25px rgba(34, 197, 94, 0.3)'
                            }}
                        >
                            ✓ Knew It!
                        </button>
                    </div>
                </div>
            </div>

            <style>{GameStyles}</style>
        </div>
    );
}
