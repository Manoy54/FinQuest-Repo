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
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(37, 99, 235, 0.3) 100%)', // Standard Blue at 30%
                        backdropFilter: 'blur(8px)',
                        border: '2px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
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
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(37, 99, 235, 0.3) 100%)', // Standard Blue at 30%
                        backdropFilter: 'blur(8px)',
                        border: '2px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.5)'
                    }}
                >
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white">
                        ANSWER
                    </div>
                    <div className="flex-1 flex items-center justify-center w-full px-8 py-4">
                        <p className="text-xl md:text-2xl text-center font-bold leading-relaxed drop-shadow-md text-white">
                            {card.answer}
                        </p>
                    </div>
                    <p className="absolute bottom-4 text-white/60 text-sm">
                        Click to see question
                    </p>
                </div>
            </div>
        </div>
    );
}
