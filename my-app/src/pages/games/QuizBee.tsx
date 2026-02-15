
import { useState, useEffect, useCallback, useRef, useMemo } from 'react';

import { questions } from './QuizBeeComponents/questions';
import type { GameState, Difficulty, Question } from './QuizBeeComponents/types';
import { QuestionCard } from './QuizBeeComponents/QuestionCard';
import { Lifelines } from './QuizBeeComponents/Lifelines';
import { TierUnlock } from './QuizBeeComponents/TierUnlock';
import { HowToPlayModal } from './QuizBeeComponents/HowToPlayModal';
import {
    AnimatedBackground,
    useGameSounds,
    GameComplete,
    GameRatingModal
} from './MoneytaryMasteryComponents';
import { HUD } from '../../app/components/HUD';
import { useUserContext } from '../../context/UserContext.tsx';

// Copying keyframes to ensure animations work
const GameStyles = `
    @keyframes float {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(5deg); }
    }
    @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 0.1; }
        50% { transform: scale(1.2); opacity: 0.15; }
    }
    @keyframes orange-glow {
        0%, 100% { box-shadow: 0 0 15px rgba(251, 146, 60, 0.4); }
        50% { box-shadow: 0 0 30px rgba(251, 146, 60, 0.8); }
    }
    .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.05);
        border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
        background: rgba(251, 191, 36, 0.3);
        border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: rgba(251, 191, 36, 0.5);
    }
`;

// Level Thresholds
const XP_THRESHOLDS = {
    INTERMEDIATE: 500,
    EXPERT: 1250
};

const QUESTION_XP = 50;
const QUESTION_COINS = 20;

export function QuizBee() {
    // Game State
    const { addXp, addCoins } = useUserContext();
    const hasAwardedRef = useRef(false);
    const lastAwardedExp = useRef(0);
    const lastAwardedCoins = useRef(0);

    const [gameState, setGameState] = useState<GameState['status']>('START');
    const [currentTier, setCurrentTier] = useState<Difficulty>('BEGINNER');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [lives, setLives] = useState(5);
    const [timer, setTimer] = useState(20);
    const [xp, setXp] = useState(0);
    const [coins, setCoins] = useState(0);
    const [totalCorrect, setTotalCorrect] = useState(0);
    const [showRating, setShowRating] = useState(false);
    const [showHowToPlay, setShowHowToPlay] = useState(true);

    // Refs for critical game loop state
    const tierCorrectCountRef = useRef(0);
    const livesRef = useRef(5);

    // Lifelines (Only Skip remains)


    // Turn State
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [hiddenOptions, setHiddenOptions] = useState<string[]>([]);
    const [isTimeFrozen, setIsTimeFrozen] = useState(false);

    // Audio
    const { playSound } = useGameSounds();

    // Total questions for the whole game
    const totalQuestions = Object.values(questions).reduce((acc, curr) => acc + curr.length, 0);

    // Load High Score
    useEffect(() => {
        const stored = localStorage.getItem('quizBeeHighScore');
        if (stored) setHighScore(parseInt(stored));
    }, []);

    // Update High Score
    useEffect(() => {
        if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('quizBeeHighScore', score.toString());
        }
    }, [score, highScore]);

    // Timer Logic
    useEffect(() => {
        if (gameState !== 'PLAYING' || isTimeFrozen || showFeedback) return;

        if (timer <= 0) {
            handleTimeOut();
            return;
        }

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer, gameState, isTimeFrozen, showFeedback]);

    const currentQuestions = questions[currentTier];
    const currentQuestion: Question = currentQuestions[currentQuestionIndex];

    // Derived stats for LevelProgress
    const playerLevel = useMemo(() => {
        if (xp >= XP_THRESHOLDS.EXPERT) return 3;
        if (xp >= XP_THRESHOLDS.INTERMEDIATE) return 2;
        return 1;
    }, [xp]);

    const playerRank = useMemo(() => {
        if (xp >= XP_THRESHOLDS.EXPERT) return "Expert";
        if (xp >= XP_THRESHOLDS.INTERMEDIATE) return "Intermediate";
        return "Beginner";
    }, [xp]);

    const nextLevelXP = useMemo(() => {
        if (playerLevel === 1) return XP_THRESHOLDS.INTERMEDIATE;
        if (playerLevel === 2) return XP_THRESHOLDS.EXPERT;
        return xp; // Max level
    }, [playerLevel, xp]);

    // Callback to handle next question transitions
    const handleNextQuestion = useCallback(() => {
        // Reset turn state
        setSelectedOption(null);
        setShowFeedback(false);
        setHiddenOptions([]);
        setIsTimeFrozen(false);
        setTimer(currentTier === 'EXPERT' ? 60 : currentTier === 'INTERMEDIATE' ? 30 : 20);

        // Check if lives exhausted
        if (livesRef.current <= 0) {
            setGameState('GAME_OVER');
            return;
        }

        // Check progression
        if (currentQuestionIndex >= currentQuestions.length - 1) {
            // Tier Finished
            const passingScore = Math.ceil(currentQuestions.length * 0.8);

            if (tierCorrectCountRef.current >= passingScore) {
                if (currentTier === 'BEGINNER') {
                    setCurrentTier('INTERMEDIATE');
                    setGameState('TIER_COMPLETE');
                    // Show rating modal after beginner mode
                    setShowRating(true);
                } else if (currentTier === 'INTERMEDIATE') {
                    setCurrentTier('EXPERT');
                    setGameState('TIER_COMPLETE');
                } else {
                    setGameState('VICTORY');
                }
            } else {
                setGameState('GAME_OVER'); // Failed to pass tier
            }

            // Reset for next tier
            setCurrentQuestionIndex(0);
            tierCorrectCountRef.current = 0;
        } else {
            setCurrentQuestionIndex((prev) => prev + 1);
        }
    }, [currentQuestionIndex, currentQuestions.length, currentTier]);

    const handleTimeOut = () => {
        playSound('wrong');
        livesRef.current -= 1;
        setLives(livesRef.current);

        if (livesRef.current <= 0) {
            setGameState('GAME_OVER');
        } else {
            handleNextQuestion();
        }
    };

    const handleOptionSelect = (option: string) => {
        if (showFeedback || !currentQuestion) return;

        setSelectedOption(option);
        setShowFeedback(true);

        const isCorrect = option === currentQuestion.correctAnswer;

        if (isCorrect) {
            playSound('correct');
            // Calculate Score: Base 100 + (Time * Multiplier)
            const multiplier = currentTier === 'BEGINNER' ? 1 : currentTier === 'INTERMEDIATE' ? 2 : 3;
            const speedBonus = timer * multiplier;
            setScore((prev) => prev + 100 + speedBonus);

            // Award XP and Coins
            setXp(prev => prev + QUESTION_XP);
            setCoins(prev => prev + QUESTION_COINS);
            setTotalCorrect(prev => prev + 1);

            tierCorrectCountRef.current += 1;
        } else {
            playSound('wrong');
            livesRef.current -= 1;
            setLives(livesRef.current);
            // Check for immediate game over on wrong answer if lives hit 0? 
            // Original code checked inside timeout. We should check here.
            if (livesRef.current <= 0) {
                setTimeout(() => setGameState('GAME_OVER'), 500); // Short delay for effect
                return;
            }
        }
    };



    const startNextTier = () => {
        setGameState('PLAYING');
        setTimer(currentTier === 'EXPERT' ? 60 : currentTier === 'INTERMEDIATE' ? 30 : 20);
    };

    const restartGame = () => {
        setGameState('START');
        setScore(0);
        setXp(0);
        setCoins(0);
        setTotalCorrect(0);
        setLives(5);
        livesRef.current = 5;
        setCurrentTier('BEGINNER');
        setCurrentQuestionIndex(0);

        setTimer(20);
        tierCorrectCountRef.current = 0;
        setTimeout(() => setGameState('PLAYING'), 100);
        hasAwardedRef.current = false;
        lastAwardedExp.current = 0;
        lastAwardedCoins.current = 0;
    };

    const handleRetryTier = () => {
        setLives(5);
        livesRef.current = 5;
        setCurrentQuestionIndex(0);
        tierCorrectCountRef.current = 0;
        setGameState('PLAYING');
        setTimer(currentTier === 'EXPERT' ? 60 : currentTier === 'INTERMEDIATE' ? 30 : 20);
        hasAwardedRef.current = false;
        lastAwardedExp.current = xp;
        lastAwardedCoins.current = coins;
    };

    // Sync XP and Coins to global context on game end
    useEffect(() => {
        if ((gameState === 'GAME_OVER' || gameState === 'VICTORY') && !hasAwardedRef.current) {
            const earnedXp = xp - lastAwardedExp.current;
            const earnedCoins = coins - lastAwardedCoins.current;

            if (earnedXp > 0) addXp(earnedXp);
            if (earnedCoins > 0) addCoins(earnedCoins);

            lastAwardedExp.current = xp;
            lastAwardedCoins.current = coins;

            hasAwardedRef.current = true;
        } else if (gameState === 'START' || gameState === 'PLAYING') {
            hasAwardedRef.current = false;
        }
    }, [gameState, xp, coins, addXp, addCoins]);

    if (gameState === 'START') {
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-y-auto"
                style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #1a1a2e 100%)' }}>
                <AnimatedBackground />



                <div className="z-10 text-center p-16 backdrop-blur-xl bg-[#1e293b]/60 rounded-[40px] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.7)] max-w-2xl w-full transform transition-all duration-700 hover:scale-[1.02]">
                    <h1 className="text-7xl md:text-9xl font-black mb-6 tracking-tighter"
                        style={{
                            fontWeight: 800,
                            background: 'linear-gradient(135deg, #fbbf24 0%, #f97316 50%, #fbbf24 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            filter: 'drop-shadow(0 0 15px rgba(251, 191, 36, 0.4))'
                        }}>
                        CAPITAL CUP
                    </h1>
                    <p className="text-2xl mb-14 text-gray-300/90 font-light tracking-wide italic">Test your Financial Knowledge</p>

                    <button
                        onClick={() => setGameState('PLAYING')}
                        className="group relative px-12 py-3 rounded-lg font-bold text-xl transition-all duration-300 active:scale-95"
                        style={{
                            background: 'linear-gradient(135deg, #fdba74 0%, #fb923c 100%)', // Light orange
                            color: '#000',
                            boxShadow: '0 0 20px rgba(251, 146, 60, 0.3)',
                            animation: 'orange-glow 3s infinite'
                        }}
                    >
                        <span className="relative z-10">Start Game</span>
                    </button>

                    <div className="mt-16 flex items-center justify-center gap-10 text-[14px] text-white/60 font-bold uppercase tracking-widest">
                        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5">
                            <span className="text-pink-500 text-lg">❤️</span>
                            <span>5 Lives</span>
                        </div>
                        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5">
                            <span className="text-blue-400 text-lg">🕒</span>
                            <span>{currentTier === 'EXPERT' ? '60' : currentTier === 'INTERMEDIATE' ? '30' : '20'} Seconds Per Question</span>
                        </div>
                        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5">
                            <span className="text-amber-400 text-lg">📋</span>
                            <span>{totalQuestions} Ques</span>
                        </div>
                    </div>
                </div>
                <style>{GameStyles}</style>
            </div>
        );
    }

    if (gameState === 'GAME_OVER' || gameState === 'VICTORY') {
        return (
            <GameComplete
                score={totalCorrect}
                totalCards={totalQuestions}
                exp={xp}
                coins={coins}
                onRestart={restartGame}
                onReplayLevel={handleRetryTier}
            />
        );
    }

    return (
        <div className="h-screen w-full flex flex-col items-center relative overflow-hidden font-sans"
            style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #1a1a2e 100%)' }}>

            <AnimatedBackground />

            {/* Header matches first image */}
            {/* Header matches first image */}
            <HUD
                title="CAPITAL CUP"
                currentExp={xp}
                level={playerLevel}
                expToNextLevel={nextLevelXP}
                progress={(xp / nextLevelXP) * 100}
                coins={coins}
                totalLevel={3}
                customLevelLabel={playerRank}
                showBadge={false}
                onHowToPlay={() => setShowHowToPlay(true)}
                className=""
            >
                <div className="flex items-center gap-3 shrink-0 relative z-20">
                    <div className="px-5 py-2 rounded-full text-sm font-black backdrop-blur-xl bg-white/10 border border-white/5 shadow-2xl">
                        <span className="text-amber-400 uppercase tracking-tighter">Score: {score}</span>
                    </div>
                    <div className="px-5 py-2 rounded-full text-sm font-black backdrop-blur-xl bg-white/10 border border-white/5 shadow-2xl flex items-center gap-2">
                        <span className="text-red-500">❤️</span>
                        <span className="text-white">{lives}</span>
                    </div>
                    <div className={`px-5 py-2 rounded-full text-sm font-black backdrop-blur-xl transition-all duration-300 ${timer <= 5
                        ? 'bg-red-500/20 border border-red-500 text-red-100 scale-110 shadow-[0_0_15px_rgba(239,68,68,0.5)]'
                        : 'bg-white/10 border border-white/5 text-blue-400 shadow-2xl'
                        } flex items-center gap-2`}>
                        <span>⏱️</span>
                        <span>{timer}s</span>
                    </div>
                    <div className={`px-4 py-2 rounded-full text-[10px] font-black tracking-widest uppercase ${currentTier === 'BEGINNER' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : currentTier === 'INTERMEDIATE' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'}`}>
                        {currentTier}
                    </div>
                </div>
            </HUD>

            {/* Progress Bar - Matches MM Header Progress */}
            < div className="w-full max-w-2xl px-4 mt-8 mb-6 z-10 text-center shrink-0" >
                <div className="flex justify-center items-center gap-4 text-[12px] text-white/50 uppercase tracking-[0.2em] font-black mb-3">
                    <span>Question {currentQuestionIndex + 1} of {currentQuestions.length}</span>
                    <span className="text-white/20">|</span>
                    <span>{Math.round(((currentQuestionIndex) / currentQuestions.length) * 100)}% Complete</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 backdrop-blur-sm">
                    <div
                        className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 transition-all duration-700 ease-out"
                        style={{ width: `${((currentQuestionIndex) / currentQuestions.length) * 100}%` }}
                    />
                </div>
            </div >

            {/* Main Content */}
            < div className="flex-1 w-full max-w-4xl px-4 flex flex-col items-center justify-center z-10 relative pb-10 min-h-0" >
                <QuestionCard
                    question={currentQuestion}
                    selectedOption={selectedOption}
                    onSelectOption={handleOptionSelect}
                    disabled={showFeedback || isTimeFrozen}
                    hiddenOptions={hiddenOptions}
                    showFeedback={showFeedback}
                />

                <div className="mt-12">
                    <Lifelines
                        onClick={handleNextQuestion}
                        disabled={!showFeedback}
                    />
                </div>
            </div >

            {/* Modals */}
            {
                gameState === 'TIER_COMPLETE' && (
                    <TierUnlock nextTier={currentTier} onContinue={startNextTier} />
                )
            }

            <GameRatingModal
                isOpen={showRating}
                onClose={() => setShowRating(false)}
                gameId="quiz_bee"
            />

            <HowToPlayModal
                isOpen={showHowToPlay}
                onClose={() => setShowHowToPlay(false)}
            />

            <style>{GameStyles}</style>
        </div >
    );
}
