import CardNav, { type CardNavItem } from './Nav';
import logo from '../../assets/react.svg'; // Using a default logo for now

const navItems: CardNavItem[] = [
    {
        label: 'Home',
        bgColor: '#ffffff',
        textColor: '#000000',
        links: [
            { label: 'Overview', href: '#', ariaLabel: 'Overview' },
            { label: 'Updates', href: '#', ariaLabel: 'Updates' }
        ]
    },
    {
        label: 'Game Modes',
        bgColor: '#f3f4f6',
        textColor: '#000000',
        links: [
            { label: 'Monetary Mastery', href: '/monetary-mastery', ariaLabel: 'Play Monetary Mastery' },
            { label: 'Data Diver', href: '/word-hunt', ariaLabel: 'Play Data Diver' },
            { label: 'Capital Cup', href: '/quiz-bee', ariaLabel: 'Play Capital Cup' },
            { label: 'Capital Crossword', href: '/crossword', ariaLabel: 'Play Capital Crossword' }
        ]
    },
    {
        label: 'Community',
        bgColor: '#e5e7eb',
        textColor: '#000000',
        links: [
            { label: 'Discord', href: '#', ariaLabel: 'Joing Discord' },
            { label: 'Forum', href: '#', ariaLabel: 'Visit Forum' }
        ]
    }
];

export function Header() {
    return (
        <CardNav
            logo={logo}
            items={navItems}
            baseColor="#ffffff"
            menuColor="#000000"
            buttonBgColor="#000000"
            buttonTextColor="#ffffff"
        />
    );
}
