import type { FlashCard as FlashCardType } from './FlashCardData';

interface FlashCardProps {
    card: FlashCardType;
    isFlipped: boolean;
    onFlip: () => void;
}

export function FlashCard({ card, isFlipped, onFlip }: FlashCardProps) {
    return (
        <div className="w-full h-full flex items-center justify-center perspective-1000">
            <div
                onClick={onFlip}
                className="relative w-full h-full cursor-pointer transition-transform duration-700"
                style={{
                    height: '100%',
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    transition: 'transform 0.6s'
                }}
            >
                {/* Front of card (Question) */}
                <div
                    className="absolute inset-0 flex flex-col items-center justify-center p-6 rounded-3xl"
                    style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', // Bright Blue
                        border: '2px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: '0 10px 30px -10px rgba(37, 99, 235, 0.5)',
                        transform: 'rotateY(0deg) translateZ(1px)'
                    }}
                >
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white">
                        QUESTION {card.id}
                    </div>
                    <div className="flex-1 flex items-center justify-center w-full px-8 py-4">
                        <p className="text-xl md:text-3xl text-center text-white font-bold leading-snug drop-shadow-md">
                            {card.question}
                        </p>
                    </div>
                    <p className="absolute bottom-4 text-white/60 text-sm">
                        Click to reveal answer
                    </p>
                </div>

                {/* Back of card (Answer) */}
                <div
                    className="absolute inset-0 flex flex-col items-center justify-center p-6 rounded-3xl"
                    style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg) translateZ(1px)',
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', // Bright Green
                        border: '2px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: '0 10px 30px -10px rgba(5, 150, 105, 0.5)'
                    }}
                >
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold"
                        style={{
                            background: 'rgba(74, 222, 128, 0.2)',
                            color: '#4ade80'
                        }}
                    >
                        ANSWER
                    </div>
                    <div className="flex-1 flex items-center justify-center w-full px-8 py-4">
                        <p className="text-xl md:text-2xl text-center font-bold leading-relaxed drop-shadow-md text-white">
                            {card.answer}
                        </p>
                    </div>
                    <p className="absolute bottom-4 text-gray-500 text-sm">
                        Click to see question
                    </p>
                </div>
            </div>
        </div>
    );
}
