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
                className="bg-[#1e293b] border border-white/10 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl relative transform transition-all scale-100"
                style={{
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                }}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors"
                >
                    ✕
                </button>

                {!submitted ? (
                    <>
                        <h3 className="text-2xl font-bold text-white mb-2">Enjoying the Game?</h3>
                        <p className="text-white/60 text-sm mb-6">Rate your experience so far!</p>

                        <div className="flex justify-center gap-2 mb-8">
                            {[...Array(5)].map((_, index) => {
                                const ratingValue = index + 1;
                                return (
                                    <button
                                        key={index}
                                        type="button"
                                        className="transition-transform hover:scale-110 focus:outline-none"
                                        onClick={() => setRating(ratingValue)}
                                        onMouseEnter={() => setHover(ratingValue)}
                                        onMouseLeave={() => setHover(0)}
                                    >
                                        <FaStar
                                            size={32}
                                            color={ratingValue <= (hover || rating) ? "#fbbf24" : "#475569"}
                                            style={{ filter: ratingValue <= (hover || rating) ? "drop-shadow(0 0 5px rgba(251, 191, 36, 0.5))" : "none" }}
                                        />
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={rating === 0}
                            className={`w-full py-3 rounded-xl font-bold transition-all duration-300 ${rating > 0
                                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-lg hover:scale-[1.02]'
                                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            Submit Rating
                        </button>
                    </>
                ) : (
                    <div className="py-8 animate-fadeIn">
                        <div className="text-5xl mb-4">❤️</div>
                        <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
                        <p className="text-white/60">Your feedback helps us improve.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
