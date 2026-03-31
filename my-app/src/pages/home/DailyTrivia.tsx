import { useState, useMemo } from 'react';
import { getDailyTrivia, loadTriviaProgress, saveTriviaProgress } from '../../utils/triviaData';
import { useUserContext } from '../../context/UserContext';

const XP_PER_CORRECT = 20;
const COINS_PER_CORRECT = 10;
const BONUS_XP_ALL_CORRECT = 50;
const BONUS_COINS_ALL_CORRECT = 25;

export function DailyTrivia() {
    const { addXp, addCoins } = useUserContext();
    const questions = useMemo(() => getDailyTrivia(5), []);

    const [progress, setProgress] = useState(() => loadTriviaProgress());
    const [currentIndex, setCurrentIndex] = useState(() => {
        const p = loadTriviaProgress();
        const firstUnanswered = questions.findIndex(q => !p.answeredIds.includes(q.id));
        return firstUnanswered === -1 ? questions.length : firstUnanswered;
    });
    const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [rewardFlash, setRewardFlash] = useState<{ xp: number; coins: number } | null>(null);

    const isComplete = progress.answeredIds.length >= questions.length;
    const currentQuestion = currentIndex < questions.length ? questions[currentIndex] : null;

    const handleAnswer = (choiceIndex: number) => {
        if (showResult || !currentQuestion) return;

        setSelectedChoice(choiceIndex);
        setShowResult(true);

        const isCorrect = choiceIndex === currentQuestion.correctIndex;
        const newProgress = {
            ...progress,
            answeredIds: [...progress.answeredIds, currentQuestion.id],
            correctIds: isCorrect ? [...progress.correctIds, currentQuestion.id] : progress.correctIds,
        };

        setProgress(newProgress);
        saveTriviaProgress(newProgress);

        if (isCorrect) {
            addXp(XP_PER_CORRECT);
            addCoins(COINS_PER_CORRECT);
            setRewardFlash({ xp: XP_PER_CORRECT, coins: COINS_PER_CORRECT });

            if (newProgress.correctIds.length === questions.length) {
                addXp(BONUS_XP_ALL_CORRECT);
                addCoins(BONUS_COINS_ALL_CORRECT);
            }
        }
    };

    const handleNext = () => {
        setSelectedChoice(null);
        setShowResult(false);
        setRewardFlash(null);
        setCurrentIndex(prev => prev + 1);
    };

    if (isComplete) {
        const correct = progress.correctIds.length;
        const total = questions.length;
        const allCorrect = correct === total;

        return (
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex-1 min-w-0">
                <div className="text-center">
                    <div className="text-4xl mb-3">{allCorrect ? '🏆' : correct >= 3 ? '⭐' : '📝'}</div>
                    <h3 className="text-xl font-black text-white mb-2">Daily Trivia Complete!</h3>
                    <p className="text-white/50 text-sm mb-4">
                        You got <span className="text-emerald-400 font-bold">{correct}/{total}</span> correct
                    </p>
                    <div className="flex justify-center gap-3">
                        <div className="px-3 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                            +{correct * XP_PER_CORRECT}{allCorrect ? `+${BONUS_XP_ALL_CORRECT}` : ''} XP
                        </div>
                        <div className="px-3 py-1.5 rounded-full bg-yellow-500/20 text-yellow-300 text-xs font-bold border border-yellow-500/30">
                            +{correct * COINS_PER_CORRECT}{allCorrect ? `+${BONUS_COINS_ALL_CORRECT}` : ''} 🪙
                        </div>
                    </div>
                    {allCorrect && (
                        <p className="text-emerald-400 text-xs font-bold mt-3 animate-pulse">✨ Perfect Score Bonus Applied!</p>
                    )}
                    <p className="text-white/30 text-xs mt-4">Come back tomorrow for new questions!</p>
                </div>
            </div>
        );
    }

    if (!currentQuestion) return null;

    return (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <h3 className="text-sm font-black text-white/80 uppercase tracking-wider flex items-center gap-2">
                    <span>📝</span> Daily Trivia
                </h3>
                <div className="flex items-center gap-1.5">
                    {questions.map((_, i) => (
                        <div
                            key={i}
                            className={`w-2 h-2 rounded-full transition-colors ${
                                i < progress.answeredIds.length
                                    ? progress.correctIds.includes(questions[i].id) ? 'bg-emerald-400' : 'bg-red-400'
                                    : i === currentIndex ? 'bg-white' : 'bg-white/20'
                            }`}
                        />
                    ))}
                </div>
            </div>

            {/* Category Badge */}
            <div className="mb-3">
                <span className="text-[10px] uppercase tracking-widest font-bold text-indigo-300 bg-indigo-500/20 px-2.5 py-1 rounded-full border border-indigo-500/30">
                    {currentQuestion.category}
                </span>
            </div>

            {/* Question */}
            <p className="text-white font-bold text-base mb-5 leading-relaxed">{currentQuestion.question}</p>

            {/* Choices */}
            <div className="space-y-2.5 mb-4">
                {currentQuestion.choices.map((choice, i) => {
                    let btnClass = 'w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border ';
                    if (showResult) {
                        if (i === currentQuestion.correctIndex) {
                            btnClass += 'bg-emerald-500/20 border-emerald-500/50 text-emerald-200';
                        } else if (i === selectedChoice && i !== currentQuestion.correctIndex) {
                            btnClass += 'bg-red-500/20 border-red-500/50 text-red-200';
                        } else {
                            btnClass += 'bg-white/5 border-white/5 text-white/30';
                        }
                    } else {
                        btnClass += 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20 cursor-pointer';
                    }

                    return (
                        <button key={i} onClick={() => handleAnswer(i)} disabled={showResult} className={btnClass}>
                            <span className="font-bold text-white/40 mr-2">{String.fromCharCode(65 + i)}.</span>
                            {choice}
                            {showResult && i === currentQuestion.correctIndex && <span className="float-right">✓</span>}
                            {showResult && i === selectedChoice && i !== currentQuestion.correctIndex && <span className="float-right">✕</span>}
                        </button>
                    );
                })}
            </div>

            {/* Result + Reward Flash */}
            {showResult && (
                <div className="animate-fade-in">
                    <div className={`p-3 rounded-xl text-sm mb-3 ${
                        selectedChoice === currentQuestion.correctIndex
                            ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-200'
                            : 'bg-red-500/10 border border-red-500/30 text-red-200'
                    }`}>
                        <span className="font-bold">
                            {selectedChoice === currentQuestion.correctIndex ? '✅ Correct!' : '❌ Incorrect'}
                        </span>
                        <p className="text-xs mt-1 opacity-80">{currentQuestion.explanation}</p>
                    </div>

                    {rewardFlash && (
                        <div className="flex gap-2 mb-3 animate-bounce-in">
                            <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-1 rounded-full">+{rewardFlash.xp} XP</span>
                            <span className="text-xs font-bold text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded-full">+{rewardFlash.coins} 🪙</span>
                        </div>
                    )}

                    <button
                        onClick={handleNext}
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-sm hover:from-indigo-400 hover:to-purple-400 transition-all"
                    >
                        {currentIndex < questions.length - 1 ? 'Next Question →' : 'View Results'}
                    </button>
                </div>
            )}
        </div>
    );
}
