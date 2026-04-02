import { Link } from 'react-router-dom';

interface GameHeaderProps {
    score: number;
    difficulty?: string;
}

export function GameHeader({ score, difficulty = 'BEGINNER' }: GameHeaderProps) {
    return (
        <header className="relative z-10 p-3 flex items-center justify-between shrink-0">
            <Link
                to="/"
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                style={{ textDecoration: 'none' }}
            >
                <span className="text-2xl">←</span>
                <span className="font-medium">Back</span>
            </Link>
            <div className="flex items-center gap-4">
                <div className="px-4 py-2 rounded-full"
                    style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)'
                    }}
                >
                    <span className="text-amber-400 font-bold">Score: {score}</span>
                </div>
                <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-medium">
                    {difficulty}
                </div>
            </div>
        </header>
    );
}
