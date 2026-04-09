import { useState, useEffect } from 'react';
import { getDailyTrivia, loadTriviaProgress, saveTriviaProgress, type TriviaCard } from '../data/triviaData';
import { useUserContext } from '../../../context/UserContext';

const XP_PER_CARD = 15;
const COINS_PER_CARD = 5;
const BONUS_XP_ALL_READ = 50;
const BONUS_COINS_ALL_READ = 25;

export function DailyTrivia() {
    const { addXp, addCoins } = useUserContext();
    const [cards, setCards] = useState<TriviaCard[]>([]);
    const [loading, setLoading] = useState(true);

    const [progress, setProgress] = useState(() => loadTriviaProgress());
    const [currentIndex, setCurrentIndex] = useState(0);
    const [rewardFlash, setRewardFlash] = useState<{ xp: number; coins: number } | null>(null);

    useEffect(() => {
        getDailyTrivia().then(data => {
            setCards(data);
            const p = loadTriviaProgress();
            // Find the first unread card based on ID
            const firstUnread = data.findIndex(c => !p.readIds.includes(c.id));
            setCurrentIndex(firstUnread === -1 ? data.length : firstUnread);
            setLoading(false);
        }).catch(err => {
            console.error("Failed to load trivia", err);
            setLoading(false);
        });
    }, []);

    const isComplete = cards.length > 0 && progress.readIds.length >= cards.length;
    const currentCard = currentIndex < cards.length ? cards[currentIndex] : null;

    const handleRead = () => {
        if (!currentCard || rewardFlash) return;

        const newProgress = {
            ...progress,
            readIds: [...progress.readIds, currentCard.id],
        };

        addXp(XP_PER_CARD);
        addCoins(COINS_PER_CARD);
        setRewardFlash({ xp: XP_PER_CARD, coins: COINS_PER_CARD });

        if (newProgress.readIds.length === cards.length) {
            addXp(BONUS_XP_ALL_READ);
            addCoins(BONUS_COINS_ALL_READ);
        }
        
        setProgress(newProgress);
        saveTriviaProgress(newProgress);

        // Flash rewards then proceed to the next card
        setTimeout(() => {
           setRewardFlash(null);
           setCurrentIndex(prev => prev + 1);
        }, 1200);
    };

    if (loading) {
       return (
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex-1 min-w-0 flex items-center justify-center h-[300px]">
                <p className="text-white/50 text-sm animate-pulse font-bold">📡 Fetching real-time updates...</p>
            </div>
       );
    }

    if (isComplete) {
        const total = cards.length;

        return (
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex-1 min-w-0">
                <div className="text-center">
                    <div className="text-4xl mb-3">🗞️</div>
                    <h3 className="text-xl font-black text-white mb-2">You're All Caught Up!</h3>
                    <p className="text-white/50 text-sm mb-4">
                        You read <span className="text-indigo-400 font-bold">{total}</span> dynamic financial updates today.
                    </p>
                    <div className="flex justify-center gap-3">
                        <div className="px-3 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                            +{total * XP_PER_CARD} +{BONUS_XP_ALL_READ} XP
                        </div>
                        <div className="px-3 py-1.5 rounded-full bg-yellow-500/20 text-yellow-300 text-xs font-bold border border-yellow-500/30">
                            +{total * COINS_PER_CARD} +{BONUS_COINS_ALL_READ} 🪙
                        </div>
                    </div>
                    <p className="text-emerald-400 text-xs font-bold mt-3 animate-pulse">✨ Knowledge Absorbed Bonus Applied!</p>
                    <p className="text-white/30 text-xs mt-4">Check back tomorrow for more curated content.</p>
                </div>
            </div>
        );
    }

    if (!currentCard) return null;

    return (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-7 md:p-10 flex-1 min-w-0 relative overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-5 md:mb-8">
                <h3 className="text-xs md:text-sm font-black text-white/80 uppercase tracking-wider flex items-center gap-2">
                    <span className="animate-pulse">📻</span> Daily Finance Updates
                </h3>
                <div className="flex items-center gap-1">
                    {cards.map((_, i) => (
                        <div
                            key={i}
                            className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-colors ${
                                i < progress.readIds.length
                                    ? 'bg-indigo-400'
                                    : i === currentIndex ? 'bg-white' : 'bg-white/20'
                            }`}
                        />
                    ))}
                </div>
            </div>

            {/* Source Badge */}
            <div className="mb-2 md:mb-3 flex justify-between items-start">
                <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-emerald-300 bg-emerald-500/20 px-2 md:px-2.5 py-1 rounded-full border border-emerald-500/30">
                    {currentCard.source}
                </span>
            </div>

            {/* Content Card */}
            <div className="mb-3 md:mb-6 relative flex-grow">
               <h4 className="text-white font-black text-base md:text-lg mb-1 md:mb-2 leading-snug">{currentCard.title}</h4>
               <p className="text-white/70 text-xs md:text-sm leading-relaxed mb-2 md:mb-3 line-clamp-3 md:line-clamp-none">{currentCard.summary}</p>
               
               {currentCard.link && (
                 <a href={currentCard.link} target="_blank" rel="noopener noreferrer" className="text-[10px] md:text-xs text-indigo-400 hover:text-indigo-300 underline underline-offset-2">
                     Read full article ↗
                 </a>
               )}
            </div>

            {/* Feedback & Actions */}
            <div className="mt-auto h-10 md:h-12">
               {rewardFlash ? (
                    <div className="flex justify-center items-center gap-3 h-full animate-bounce-in">
                        <span className="text-xs md:text-sm font-black text-amber-400 bg-amber-400/10 px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-amber-400/20">
                           +{rewardFlash.xp} XP
                        </span>
                        <span className="text-xs md:text-sm font-black text-yellow-400 bg-yellow-400/10 px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-yellow-400/20">
                           +{rewardFlash.coins} 🪙
                        </span>
                    </div>
               ) : (
                    <button
                        onClick={handleRead}
                        className="w-full py-2.5 md:py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-black text-xs md:text-sm hover:from-indigo-400 hover:to-purple-400 hover:scale-[1.02] shadow-lg shadow-indigo-500/25 transition-all outline-none"
                    >
                        {currentIndex < cards.length - 1 ? 'Next Article →' : 'Collect Rewards'}
                    </button>
               )}
            </div>
            
            {/* Decorative background glow based on source */}
            <div className="absolute top-0 right-0 -m-8 w-24 h-24 md:w-32 md:h-32 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />
        </div>
    );
}
