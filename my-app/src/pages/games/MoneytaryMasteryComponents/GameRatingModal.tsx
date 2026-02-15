import { useState } from 'react';
import { FaStar } from 'react-icons/fa6';

interface GameRatingModalProps {
    isOpen: boolean;
    onClose: () => void;
    gameId: string;
}

export function GameRatingModal({ isOpen, onClose, gameId }: GameRatingModalProps) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = () => {
        // Save to localStorage so we don't show it again immediately
        localStorage.setItem(`finquest_rated_${gameId}_v2`, 'true');
        setSubmitted(true);
        // Close after a brief thank you message
        setTimeout(() => {
            onClose();
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div
                className="bg-[#1e293b] border border-white/10 rounded-3xl p-6 md:p-10 max-w-md w-full text-center shadow-2xl relative transform transition-all scale-100"
                style={{
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                }}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-white/30 hover:text-white hover:bg-white/10 transition-all border border-white/5"
                >
                    ✕
                </button>

                {!submitted ? (
                    <>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Enjoying the Game?</h3>
                        <p className="text-white/60 text-sm mb-10">Rate your experience so far!</p>

                        <div className="flex justify-center gap-2 md:gap-3 mb-10">
                            {[...Array(5)].map((_, index) => {
                                const ratingValue = index + 1;
                                const isActive = ratingValue <= (hover || rating);
                                return (
                                    <button
                                        key={index}
                                        type="button"
                                        className={`w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-2xl transition-all duration-300 border-2 ${isActive
                                            ? 'bg-amber-400/10 border-amber-400/50 scale-105 shadow-[0_0_15px_rgba(251,191,36,0.2)]'
                                            : 'bg-white/5 border-transparent hover:bg-white/10'
                                            } focus:outline-none`}
                                        onClick={() => setRating(ratingValue)}
                                        onMouseEnter={() => setHover(ratingValue)}
                                        onMouseLeave={() => setHover(0)}
                                    >
                                        <FaStar
                                            className={`transition-all duration-300 ${isActive ? 'scale-110' : 'scale-100 opacity-30 group-hover:opacity-50'}`}
                                            size={window.innerWidth < 768 ? 20 : 28}
                                            color={isActive ? "#fbbf24" : "#cbd5e1"}
                                            style={{
                                                filter: isActive ? "drop-shadow(0 0 5px rgba(251, 191, 36, 0.5))" : "none"
                                            }}
                                        />
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={rating === 0}
                            className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${rating > 0
                                ? 'bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white hover:shadow-[0_10px_20px_-5px_rgba(79,70,229,0.5)] hover:scale-[1.02] active:scale-[0.98]'
                                : 'bg-white/5 text-white/20 cursor-not-allowed border border-white/5'
                                }`}
                        >
                            Submit Rating
                        </button>
                    </>
                ) : (
                    <div className="py-8 animate-fadeIn">
                        <div className="text-6xl mb-6">❤️</div>
                        <h3 className="text-3xl font-bold text-white mb-2">Thank You!</h3>
                        <p className="text-white/60 text-lg">Your feedback helps us improve the game experience.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
