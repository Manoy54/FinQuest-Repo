import { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatedBackground, GameComplete } from './MoneytaryMasteryComponents';
import { HUD } from '../../../components/navigation/HUD';
import { useUserContext } from '../../../context/UserContext';
import { getShuffledQuestions, type SpeedRoundQuestion } from './SpeedRoundComponents';
import { HowToPlayModal } from './SpeedRoundComponents/HowToPlayModal';

const GAME_DURATION = 60;
const XP_PER_CORRECT = 30;
const COINS_PER_CORRECT = 15;
const BONUS_XP_THRESHOLD = 10;
const BONUS_XP = 200;
const BONUS_COINS = 100;

type GamePhase = 'START' | 'COUNTDOWN' | 'PLAYING' | 'RESULTS';

export function SpeedRound() {
    const { addXp, addCoins } = useUserContext();
    const hasAwardedRef = useRef(false);

    const [phase, setPhase] = useState<GamePhase>('START');
    const [countdown, setCountdown] = useState(3);
    const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
    const [questions, setQuestions] = useState<SpeedRoundQuestion[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [correct, setCorrect] = useState(0);
    const [wrong, setWrong] = useState(0);
    const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [streak, setStreak] = useState(0);
    const [bestStreak, setBestStreak] = useState(0);
    const [totalXp, setTotalXp] = useState(0);
    const [totalCoins, setTotalCoins] = useState(0);
    const [flashColor, setFlashColor] = useState<string | null>(null);
    const [showHowToPlay, setShowHowToPlay] = useState(true);

    const startGame = useCallback(() => {
        setQuestions(getShuffledQuestions());
        setCurrentIndex(0);
        setCorrect(0);
        setWrong(0);
        setStreak(0);
        setBestStreak(0);
        setTotalXp(0);
        setTotalCoins(0);
        setTimeLeft(GAME_DURATION);
        setCountdown(3);
        setPhase('COUNTDOWN');
        hasAwardedRef.current = false;
    }, []);

    // Countdown timer
    useEffect(() => {
        if (phase !== 'COUNTDOWN') return;
        if (countdown <= 0) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setPhase('PLAYING');
            return;
        }
        const timer = setTimeout(() => setCountdown(p => p - 1), 1000);
        return () => clearTimeout(timer);
    }, [phase, countdown]);

    // Game timer
    useEffect(() => {
        if (phase !== 'PLAYING') return;
        if (timeLeft <= 0) {
            setPhase('RESULTS');
            return;
        }
        const timer = setInterval(() => setTimeLeft(p => p - 1), 1000);
        return () => clearInterval(timer);
    }, [phase, timeLeft]);

    // Award XP on results
    useEffect(() => {
        if (phase === 'RESULTS' && !hasAwardedRef.current) {
            let earnedXp = correct * XP_PER_CORRECT;
            let earnedCoins = correct * COINS_PER_CORRECT;

            if (correct >= BONUS_XP_THRESHOLD) {
                earnedXp += BONUS_XP;
                earnedCoins += BONUS_COINS;
            }

            setTotalXp(earnedXp);
            setTotalCoins(earnedCoins);
            if (earnedXp > 0) addXp(earnedXp);
            if (earnedCoins > 0) addCoins(earnedCoins);
            hasAwardedRef.current = true;
        }
    }, [phase, correct, addXp, addCoins]);

    const handleAnswer = (choiceIndex: number) => {
        if (showFeedback || phase !== 'PLAYING') return;

        const question = questions[currentIndex];
        const isCorrect = choiceIndex === question.correctIndex;

        setSelectedChoice(choiceIndex);
        setShowFeedback(true);

        if (isCorrect) {
            setCorrect(p => p + 1);
            const newStreak = streak + 1;
            setStreak(newStreak);
            if (newStreak > bestStreak) setBestStreak(newStreak);
            setFlashColor('emerald');
        } else {
            setWrong(p => p + 1);
            setStreak(0);
            setFlashColor('red');
        }

        setTimeout(() => {
            setSelectedChoice(null);
            setShowFeedback(false);
            setFlashColor(null);

            if (currentIndex + 1 >= questions.length) {
                setQuestions(prev => [...prev, ...getShuffledQuestions()]);
            }
            setCurrentIndex(p => p + 1);
        }, 400);
    };

    const currentQuestion = questions[currentIndex];

    // START screen
    if (phase === 'START') {
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #1a1a2e 100%)' }}>
                <AnimatedBackground />

                <div className="z-10 text-center p-16 backdrop-blur-xl bg-[#1e293b]/60 rounded-[40px] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.7)] max-w-2xl w-full">
                    <h1 className="text-7xl md:text-9xl font-black mb-6 tracking-tighter"
                        style={{
                            background: 'linear-gradient(135deg, #f472b6 0%, #ec4899 50%, #db2777 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            filter: 'drop-shadow(0 0 15px rgba(236, 72, 153, 0.4))'
                        }}>
                        SPEED ROUND
                    </h1>
                    <p className="text-2xl mb-14 text-gray-300/90 font-light tracking-wide italic">
                        Answer as many as you can in 60 seconds!
                    </p>

                    <button
                        onClick={startGame}
                        className="group relative px-12 py-3 rounded-lg font-bold text-xl transition-all duration-300 active:scale-95"
                        style={{
                            background: 'linear-gradient(135deg, #f9a8d4 0%, #ec4899 100%)',
                            color: '#000',
                            boxShadow: '0 0 20px rgba(236, 72, 153, 0.3)',
                        }}
                    >
                        <span className="relative z-10">Start Game</span>
                    </button>

                    <div className="mt-16 flex items-center justify-center gap-10 text-[14px] text-white/60 font-bold uppercase tracking-widest">
                        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5">
                            <span className="text-pink-400 text-lg">⚡</span>
                            <span>60 Seconds</span>
                        </div>
                        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5">
                            <span className="text-amber-400 text-lg">🔥</span>
                            <span>Rapid Fire</span>
                        </div>
                        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5">
                            <span className="text-emerald-400 text-lg">💎</span>
                            <span>No Lives</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // COUNTDOWN
    if (phase === 'COUNTDOWN') {
        return (
            <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #1a1a2e 100%)' }}>
                <AnimatedBackground />
                <div className="z-10 text-center">
                    <div className="text-[12rem] font-black text-white animate-pulse" style={{ textShadow: '0 0 60px rgba(236, 72, 153, 0.6)' }}>
                        {countdown || 'GO!'}
                    </div>
                    <p className="text-white/50 text-xl uppercase tracking-widest font-bold mt-4">Get Ready!</p>
                </div>
            </div>
        );
    }

    // RESULTS
    if (phase === 'RESULTS') {
        return (
            <GameComplete
                score={correct}
                totalCards={correct + wrong}
                exp={totalXp}
                coins={totalCoins}
                onRestart={startGame}
                onReplayLevel={startGame}
            />
        );
    }

    // PLAYING
    if (!currentQuestion) return null;

    const timerPercent = (timeLeft / GAME_DURATION) * 100;
    const timerColor = timeLeft <= 10 ? '#ef4444' : timeLeft <= 20 ? '#f59e0b' : '#10b981';

    return (
        <div className="h-screen w-full flex flex-col items-center relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #1a1a2e 100%)' }}>

            <AnimatedBackground />

            {/* Flash overlay */}
            {flashColor && (
                <div className={`absolute inset-0 z-20 pointer-events-none transition-opacity duration-200 ${flashColor === 'emerald' ? 'bg-emerald-500/10' : 'bg-red-500/10'}`} />
            )}

            <HUD
                title="SPEED ROUND"
                backPath="/home"
                currentExp={totalXp}
                level={1}
                expToNextLevel={300}
                progress={(correct / 30) * 100}
                coins={totalCoins}
                showBadge={false}
                showStats={false}
                onHowToPlay={() => setShowHowToPlay(true)}
            >
                <div className="flex items-center gap-3 shrink-0 relative z-20">
                    <div className="px-5 py-2 rounded-full text-sm font-black backdrop-blur-xl bg-white/10 border border-white/5 shadow-2xl">
                        <span className="text-emerald-400">✓ {correct}</span>
                    </div>
                    <div className="px-5 py-2 rounded-full text-sm font-black backdrop-blur-xl bg-white/10 border border-white/5 shadow-2xl">
                        <span className="text-red-400">✕ {wrong}</span>
                    </div>
                    {streak >= 3 && (
                        <div className="px-5 py-2 rounded-full text-sm font-black backdrop-blur-xl bg-amber-500/20 border border-amber-500/30 animate-pulse">
                            <span className="text-amber-400">🔥 {streak} Streak!</span>
                        </div>
                    )}
                </div>
            </HUD>

            {/* Timer Bar */}
            <div className="w-full max-w-3xl px-8 mt-20 z-10 shrink-0">
                <div className="flex items-center gap-4 mb-2">
                    <span className={`text-3xl font-black ${timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
                        {timeLeft}s
                    </span>
                    <div className="flex-1 h-3 bg-black/30 rounded-full overflow-hidden border border-white/10">
                        <div
                            className="h-full rounded-full transition-all duration-1000 ease-linear"
                            style={{
                                width: `${timerPercent}%`,
                                background: timerColor,
                                boxShadow: `0 0 10px ${timerColor}88`,
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Question */}
            <div className="flex-1 w-full max-w-3xl px-8 flex flex-col items-center justify-center z-10">
                <div className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                    <div className="mb-2">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-pink-300 bg-pink-500/20 px-2.5 py-1 rounded-full border border-pink-500/30">
                            {currentQuestion.category}
                        </span>
                    </div>

                    <p className="text-white font-bold text-xl md:text-2xl mb-8 leading-relaxed">
                        {currentQuestion.question}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {currentQuestion.choices.map((choice, i) => {
                            let btnClass = 'w-full text-left px-5 py-4 rounded-xl text-sm font-bold transition-all duration-150 border ';
                            if (showFeedback) {
                                if (i === currentQuestion.correctIndex) {
                                    btnClass += 'bg-emerald-500/30 border-emerald-400 text-emerald-200 scale-[1.02]';
                                } else if (i === selectedChoice && i !== currentQuestion.correctIndex) {
                                    btnClass += 'bg-red-500/30 border-red-400 text-red-200 scale-95';
                                } else {
                                    btnClass += 'bg-white/5 border-white/5 text-white/30';
                                }
                            } else {
                                btnClass += 'bg-black/40 border-white/10 text-white/90 hover:bg-black/60 hover:border-white/20 hover:scale-[1.02] cursor-pointer active:scale-95 shadow-lg';
                            }

                            return (
                                <button
                                    key={i}
                                    onClick={() => handleAnswer(i)}
                                    disabled={showFeedback}
                                    className={btnClass}
                                >
                                    <span className="font-black text-white/40 mr-2">{String.fromCharCode(65 + i)}.</span>
                                    {choice}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <HowToPlayModal
                isOpen={showHowToPlay}
                onClose={() => setShowHowToPlay(false)}
            />
        </div>
    );
}
