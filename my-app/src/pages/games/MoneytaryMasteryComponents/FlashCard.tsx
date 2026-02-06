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
                className="relative w-full cursor-pointer transition-transform duration-700"
                style={{
                    height: '280px',
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
            >
                {/* Front of card (Question) */}
                <div
                    className="absolute inset-0 flex flex-col items-center justify-center p-6 rounded-3xl"
                    style={{
                        backfaceVisibility: 'hidden',
                        background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255,255,255,0.1)'
                    }}
                >
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold"
                        style={{
                            background: 'rgba(59, 130, 246, 0.2)',
                            color: '#60a5fa'
                        }}
                    >
                        QUESTION {card.id}
                    </div>
                    <div className="text-4xl mb-4">❓</div>
                    <p className="text-lg md:text-xl text-center text-white font-medium leading-relaxed px-8">
                        {card.question}
                    </p>
                    <p className="absolute bottom-4 text-gray-500 text-sm">
                        Click to reveal answer
                    </p>
                </div>

                {/* Back of card (Answer) */}
                <div
                    className="absolute inset-0 flex flex-col items-center justify-center p-6 rounded-3xl"
                    style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        background: 'linear-gradient(145deg, rgba(255, 215, 0, 0.15) 0%, rgba(255, 107, 53, 0.1) 100%)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 215, 0, 0.3)',
                        boxShadow: '0 25px 50px -12px rgba(255, 215, 0, 0.2), inset 0 1px 1px rgba(255,255,255,0.1)'
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
                    <div className="text-4xl mb-4">💡</div>
                    <p className="text-lg md:text-xl text-center font-medium leading-relaxed px-8"
                        style={{ color: '#ffd700' }}
                    >
                        {card.answer}
                    </p>
                    <p className="absolute bottom-4 text-gray-500 text-sm">
                        Click to see question
                    </p>
                </div>
            </div>
        </div>
    );
}
