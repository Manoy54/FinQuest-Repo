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
                w-10 h-10 md:w-11 md:h-11
                bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl
                text-amber-400 hover:text-amber-300
                hover:bg-white/10 hover:border-white/20
                transition-all duration-300 group shadow-xl
                ${className}
            `.trim()}
            style={{ textDecoration: 'none' }}
            title="Back to Home"
        >
            <FaArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:-translate-x-1 transition-transform duration-300" />
        </Link>
    );
}
