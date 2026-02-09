
import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { questions } from './QuizBeeComponents/questions';
import type { GameState, Difficulty, Question } from './QuizBeeComponents/types';
import { QuestionCard } from './QuizBeeComponents/QuestionCard';
import { Lifelines } from './QuizBeeComponents/Lifelines';
import { QuizBeeComplete } from './QuizBeeComponents/QuizBeeComplete';
import { TierUnlock } from './QuizBeeComponents/TierUnlock';
import { useGameSounds } from './MoneytaryMasteryComponents/useGameSounds';
import { AnimatedBackground } from './MoneytaryMasteryComponents/AnimatedBackground';

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
`;

export function QuizBee() {
    // Game State
    const [gameState, setGameState] = useState<GameState['status']>('START');
    const [currentTier, setCurrentTier] = useState<Difficulty>('BEGINNER');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [lives, setLives] = useState(5);
    const [timer, setTimer] = useState(20);

    // Refs for critical game loop state
    const tierCorrectCountRef = useRef(0);
    const livesRef = useRef(5);

    // Lifelines (Only Skip remains)
    const [lifelines, setLifelines] = useState({
        skip: true
    });

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

    // Callback to handle next question transitions
    const handleNextQuestion = useCallback(() => {
        // Reset turn state
        setSelectedOption(null);
        setShowFeedback(false);
        setHiddenOptions([]);
        setIsTimeFrozen(false);
        setTimer(currentTier === 'EXPERT' ? 60 : currentTier === 'INTERMEDIATE' ? 40 : 20);

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

            tierCorrectCountRef.current += 1;
        } else {
            playSound('wrong');
            livesRef.current -= 1;
            setLives(livesRef.current);
        }

        // Wait 1.5s then next
        setTimeout(() => {
            if (livesRef.current <= 0) {
                setGameState('GAME_OVER');
            } else {
                handleNextQuestion();
            }
        }, 1500);
    };

    const handleLifeline = (type: 'skip') => {
        if (!lifelines[type]) return;

        if (type === 'skip') {
            setLifelines(prev => ({ ...prev, skip: false }));
            handleNextQuestion();
            playSound('click');
        }
    };

    const startNextTier = () => {
        setGameState('PLAYING');
        setTimer(currentTier === 'EXPERT' ? 60 : currentTier === 'INTERMEDIATE' ? 40 : 20);
    };

    const restartGame = () => {
        setGameState('START');
        setScore(0);
        setLives(5);
        livesRef.current = 5;
        setCurrentTier('BEGINNER');
        setCurrentQuestionIndex(0);
        setLifelines({ skip: true });
        setTimer(20);
        tierCorrectCountRef.current = 0;
        setTimeout(() => setGameState('PLAYING'), 100);
    };

    if (gameState === 'START') {
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-y-auto"
                style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #1a1a2e 100%)' }}>
                <AnimatedBackground />

                <header className="absolute top-0 left-0 w-full p-8 z-10">
                    <Link
                        to="/home"
                        className="flex items-center gap-1 text-white/70 hover:text-white transition-colors text-sm"
                        style={{ textDecoration: 'none' }}
                    >
                        <span>← Back</span>
                    </Link>
                </header>

                <div className="z-10 text-center p-16 backdrop-blur-xl bg-[#1e293b]/60 rounded-[40px] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.7)] max-w-2xl w-full transform transition-all duration-700 hover:scale-[1.02]">
                    <h1 className="text-7xl md:text-9xl font-black mb-6 tracking-tighter"
                        style={{
                            fontFamily: "'Outfit', sans-serif",
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
                            <span>{currentTier === 'EXPERT' ? '60s' : currentTier === 'INTERMEDIATE' ? '40s' : '20s'}/Q</span>
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

    return (
        <div className="min-h-screen w-full flex flex-col items-center relative overflow-y-auto font-sans"
            style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #1a1a2e 100%)' }}>

            <AnimatedBackground />

            {/* Header matches first image */}
            <header className="relative z-10 w-full px-6 pt-8 pb-4 shrink-0">
                <div className="flex items-center justify-between">
                    <Link
                        to="/home"
                        className="flex items-center gap-1 text-white/70 hover:text-white transition-colors text-sm font-bold"
                        style={{ textDecoration: 'none' }}
                    >
                        <span>← Back</span>
                    </Link>

                    {/* Centered Title - copied exactly from MM logic */}
                    <div className="fixed left-0 w-full top-8 flex justify-center pointer-events-none z-10">
                        <h1 className="text-2xl md:text-5xl font-bold"
                            style={{
                                fontFamily: "'Outfit', sans-serif",
                                background: 'linear-gradient(135deg, #ffd700 0%, #ff6b35 50%, #ffd700 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.2))'
                            }}
                        >
                            Capital Cup
                        </h1>
                    </div>

                    {/* Metrics to the right - matching MM style */}
                    <div className="flex items-center gap-3 relative z-20">
                        <div className="px-5 py-2 rounded-full text-sm font-black backdrop-blur-xl bg-white/10 border border-white/5 shadow-2xl">
                            <span className="text-amber-400 uppercase tracking-tighter">Score: {score}</span>
                        </div>
                        <div className="px-5 py-2 rounded-full text-sm font-black backdrop-blur-xl bg-white/10 border border-white/5 shadow-2xl flex items-center gap-2">
                            <span className="text-red-500">❤️</span>
                            <span className="text-white">{lives}</span>
                        </div>
                        <div className={`px-5 py-2 rounded-full text-sm font-black backdrop-blur-xl bg-white/10 border border-white/5 shadow-2xl flex items-center gap-2 ${timer < 5 ? 'animate-pulse text-red-500' : 'text-blue-400'}`}>
                            <span>⏱️</span>
                            <span>{timer}s</span>
                        </div>
                        <div className={`px-4 py-2 rounded-full text-[10px] font-black tracking-widest uppercase ${currentTier === 'BEGINNER' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : currentTier === 'INTERMEDIATE' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'}`}>
                            {currentTier}
                        </div>
                    </div>
                </div>
            </header>

            {/* Progress Bar - Matches MM Header Progress */}
            <div className="w-full max-w-2xl px-4 mt-12 mb-8 z-10 text-center">
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
            </div>

            {/* Main Content */}
            <div className="flex-1 w-full max-w-4xl px-4 flex flex-col items-center justify-center z-10 relative pb-10">
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
                        lifelines={lifelines}
                        onUseLifeline={handleLifeline}
                        disabled={showFeedback || gameState !== 'PLAYING'}
                    />
                </div>
            </div>

            {/* Modals */}
            {gameState === 'TIER_COMPLETE' && (
                <TierUnlock nextTier={currentTier} onContinue={startNextTier} />
            )}

            {(gameState === 'GAME_OVER' || gameState === 'VICTORY') && (
                <QuizBeeComplete
                    score={score}
                    highScore={highScore}
                    tier={currentTier}
                    isVictory={gameState === 'VICTORY'}
                    onRestart={restartGame}
                />
            )}

            <style>{GameStyles}</style>
        </div>
    );
}
