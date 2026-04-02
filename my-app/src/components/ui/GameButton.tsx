import { Link } from 'react-router-dom';

interface GameButtonProps {
    to: string;
    gradient: string;
    text?: string;
}

export function GameButton({ to, gradient, text = "Play Now" }: GameButtonProps) {
    return (
        <Link
            to={to}
            className={`
                inline-block px-5 py-2 
                bg-gradient-to-r ${gradient} 
                text-white 
                font-semibold text-xs 
                hover:scale-105 active:scale-95 
                transition-all shadow-md 
                uppercase tracking-wide
                self-start
            `}
            style={{ maxWidth: 'fit-content', color: '#ffffff' }}
        >
            {text}
        </Link>
    );
}
