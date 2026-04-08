import CardNav, { type CardNavItem } from './Nav';

const navItems: CardNavItem[] = [
    {
        label: 'GAME MODES',
        bgColor: '#0f3460',
        textColor: '#ffffff',
        links: [
            { label: 'Data Diver', href: '/word-hunt', ariaLabel: 'Play Data Diver' },
            { label: 'Capital Cup', href: '/quiz-bee', ariaLabel: 'Play Capital Cup' },
            { label: 'Monetary Mastery', href: '/monetary-mastery', ariaLabel: 'Play Monetary Mastery' },
            { label: 'Corporate Climb', href: '/crossword', ariaLabel: 'Play Corporate Climb' },
            { label: 'Speed Round', href: '/speed-round', ariaLabel: 'Play Speed Round' },
            { label: 'Match Up', href: '/matching-game', ariaLabel: 'Play Match Up' },
            { label: 'Spot the Difference', href: '/spot-difference', ariaLabel: 'Play Spot the Difference' }
        ]
    },
    {
        label: 'EXPLORE',
        bgColor: '#1e3a5f',
        textColor: '#ffffff',
        links: [
            { label: 'Leaderboards', href: '/leaderboards', ariaLabel: 'View Leaderboards' },
            { label: 'Library', href: '/library', ariaLabel: 'Browse the Library' },
            { label: 'Educator Hub', href: '/educator-hub', ariaLabel: 'Educator Hub' },
            { label: 'Pricing Plans', href: '/pricing', ariaLabel: 'View Pricing Plans' },
            { label: 'My Profile', href: '/profile', ariaLabel: 'View Profile' }
        ]
    },
    {
        label: 'COMMUNITY',
        bgColor: '#0f3460',
        textColor: '#ffffff',
        links: [
            { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61587675674831', ariaLabel: 'Visit Facebook' },
            { label: 'Instagram', href: 'https://www.instagram.com/learnwithfinquest?igsh=Z3prbjczdGJsNXVv', ariaLabel: 'Visit Instagram' }
        ]
    }
];

interface HeaderProps {
    onExpandChange?: (expanded: boolean, height: number) => void;
}

export function Header({ onExpandChange }: HeaderProps) {
    return (
        <CardNav
            items={navItems}
            baseColor="rgba(26, 26, 46, 0.95)"
            menuColor="#ffffff"
            onExpandChange={onExpandChange}
        />
    );
}

