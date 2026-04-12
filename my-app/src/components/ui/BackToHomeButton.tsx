import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

interface BackToHomeButtonProps {
    /** The route to navigate to. Defaults to "/home". */
    to?: string;
    /** Optional extra className to merge. */
    className?: string;
}

/**
 * Consistent "Back to Home" button used across all pages.
 * Icon-only glassmorphic rounded-square — no text label.
 */
export function BackToHomeButton({ to = '/home', className = '' }: BackToHomeButtonProps) {
    return (
        <Link
            to={to}
            className={`
                fixed top-4 left-4 lg:top-6 lg:left-6 z-50
                flex items-center justify-center
                w-7 h-7 md:w-8 md:h-8
                bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg
                text-amber-400 hover:text-amber-300
                hover:bg-white/10 hover:border-white/20
                transition-all duration-300 group shadow-xl
                ${className}
            `.trim()}
            style={{ textDecoration: 'none' }}
            title="Back to Home"
        >
            <FaArrowLeft className="w-2.5 h-2.5 md:w-3 md:h-3 group-hover:-translate-x-0.5 transition-transform duration-300" />
        </Link>
    );
}
