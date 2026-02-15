
import React, { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
// use your own icon import if react-icons is not available
import { GoArrowUpRight } from 'react-icons/go';
import FQLogo from '../../assets/images/FQlogo.PNG';
import ShinyText from './ShinyText';

type CardNavLink = {
    label: string;
    href: string;
    ariaLabel: string;
};

export type CardNavItem = {
    label: string;
    bgColor: string;
    textColor: string;
    links: CardNavLink[];
};

export interface CardNavProps {
    items: CardNavItem[];
    className?: string;
    ease?: string;
    baseColor?: string;
    menuColor?: string;
    buttonBgColor?: string;
    buttonTextColor?: string;
}

const CardNav: React.FC<CardNavProps> = ({
    items,
    className = '',
    ease = 'power3.out',
    baseColor = '#fff',
    menuColor
}) => {
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const navRef = useRef<HTMLDivElement | null>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);
    const tlRef = useRef<gsap.core.Timeline | null>(null);

    const calculateHeight = () => {
        const navEl = navRef.current;
        if (!navEl) return 260;

        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        if (isMobile) {
            const contentEl = navEl.querySelector('.card-nav-content') as HTMLElement;
            if (contentEl) {
                const wasVisible = contentEl.style.visibility;
                const wasPointerEvents = contentEl.style.pointerEvents;
                const wasPosition = contentEl.style.position;
                const wasHeight = contentEl.style.height;

                contentEl.style.visibility = 'visible';
                contentEl.style.pointerEvents = 'auto';
                contentEl.style.position = 'static';
                contentEl.style.height = 'auto';

                contentEl.offsetHeight;

                const topBar = 51;
                const padding = 16;
                const contentHeight = contentEl.scrollHeight;

                contentEl.style.visibility = wasVisible;
                contentEl.style.pointerEvents = wasPointerEvents;
                contentEl.style.position = wasPosition;
                contentEl.style.height = wasHeight;

                return topBar + contentHeight + padding;
            }
        }
        return 260;
    };

    const createTimeline = () => {
        const navEl = navRef.current;
        if (!navEl) return null;

        gsap.set(navEl, { height: 51, overflow: 'hidden' });
        gsap.set(cardsRef.current, { y: 50, opacity: 0 });

        const tl = gsap.timeline({ paused: true });

        tl.to(navEl, {
            height: calculateHeight,
            duration: 0.4,
            ease
        });

        tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, '-=0.1');

        return tl;
    };

    useLayoutEffect(() => {
        const tl = createTimeline();
        tlRef.current = tl;

        return () => {
            tl?.kill();
            tlRef.current = null;
        };
    }, [ease, items]);

    useLayoutEffect(() => {
        const handleResize = () => {
            if (!tlRef.current) return;

            if (isExpanded) {
                const newHeight = calculateHeight();
                gsap.set(navRef.current, { height: newHeight });

                tlRef.current.kill();
                const newTl = createTimeline();
                if (newTl) {
                    newTl.progress(1);
                    tlRef.current = newTl;
                }
            } else {
                tlRef.current.kill();
                const newTl = createTimeline();
                if (newTl) {
                    tlRef.current = newTl;
                }
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isExpanded]);

    const toggleMenu = () => {
        const tl = tlRef.current;
        if (!tl) return;
        if (!isExpanded) {
            setIsHamburgerOpen(true);
            setIsExpanded(true);
            tl.play(0);
        } else {
            setIsHamburgerOpen(false);
            tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
            tl.reverse();
        }
    };

    const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
        if (el) cardsRef.current[i] = el;
    };

    return (
        <div
            className={`card-nav-container absolute left-1/2 -translate-x-1/2 w-[90%] max-w-[800px] z-[99] top-[0.8em] md:top-[1.2em] ${className}`}
        >
            <nav
                ref={navRef}
                className={`card-nav ${isExpanded ? 'open' : ''} block h-[51px] p-0 rounded-xl shadow-md relative overflow-hidden will-change-[height]`}
                style={{ backgroundColor: baseColor }}
            >
                <div className="card-nav-top absolute inset-x-0 top-0 h-[51px] flex items-center justify-between p-2 pl-[1.1rem] z-[2]">
                    <div
                        className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''} group h-full flex flex-col items-center justify-center cursor-pointer gap-[6px] order-2 md:order-none`}
                        onClick={toggleMenu}
                        role="button"
                        aria-label={isExpanded ? 'Close menu' : 'Open menu'}
                        tabIndex={0}
                        style={{ color: menuColor || '#000' }}
                    >
                        <div
                            className={`hamburger-line w-[30px] h-[2px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear [transform-origin:50%_50%] ${isHamburgerOpen ? 'translate-y-[4px] rotate-45' : ''
                                } group-hover:opacity-75`}
                        />
                        <div
                            className={`hamburger-line w-[30px] h-[2px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear [transform-origin:50%_50%] ${isHamburgerOpen ? '-translate-y-[4px] -rotate-45' : ''
                                } group-hover:opacity-75`}
                        />
                    </div>

                    <div
                        className="logo-container flex items-center md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 order-1 md:order-none z-[10]"
                        style={{
                            fontFamily: "'Literata', serif",
                            fontWeight: 700,
                            filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.3))'
                        }}
                    >
                        <ShinyText
                            text="FINQUEST"
                            disabled={false}
                            speed={3}
                            className="text-2xl md:text-3xl font-black tracking-tighter"
                            color="#ffd700"
                            shineColor="#ff6b35"
                            spread={120}
                            direction="right"
                            pauseOnHover={false}
                            delay={0}
                        />
                    </div>



                    <Link
                        to="/home"
                        className="hidden md:flex items-center justify-center h-full aspect-square rounded-full cursor-pointer transition-transform duration-300 hover:scale-105 shadow-sm no-underline overflow-hidden"
                        style={{ backgroundColor: 'transparent' }}
                        role="button"
                        aria-label="Home"
                    >
                        <img src={FQLogo} alt="FinQuest Logo" className="w-full h-full object-cover" />
                    </Link>
                </div>

                <div
                    className={`card-nav-content absolute left-0 right-0 top-[51px] bottom-0 p-2 flex flex-col items-stretch gap-2 justify-start z-[1] ${isExpanded ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
                        } md:flex-row md:items-end md:gap-[12px]`}
                    aria-hidden={!isExpanded}
                >
                    {(items || []).slice(0, 3).map((item, idx) => (
                        <div
                            key={`${item.label}-${idx}`}
                            className="nav-card select-none relative flex flex-col gap-4 p-6 rounded-2xl min-w-0 flex-[1_1_auto] h-auto min-h-[51px] md:h-full md:min-h-0 md:flex-[1_1_0%] items-start border border-white/5 shadow-inner"
                            ref={setCardRef(idx)}
                            style={{ backgroundColor: item.bgColor, color: '#ffffff' }}
                        >
                            <div className="nav-card-label font-black tracking-wider text-sm md:text-base text-left uppercase text-gray-300 w-full border-b border-white/10 pb-2 mb-1">
                                {item.label}
                            </div>
                            <div className="nav-card-links flex flex-col gap-3 items-start w-full">
                                {item.links?.map((lnk, i) => {
                                    const isInternal = lnk.href.startsWith('/');
                                    const commonProps = {
                                        key: `${lnk.label}-${i}`,
                                        className: "nav-card-link inline-flex items-center gap-3 no-underline cursor-pointer transition-all duration-300 text-white/80 hover:text-white hover:translate-x-1 text-sm md:text-lg font-medium group",
                                        "aria-label": lnk.ariaLabel
                                    };

                                    const icon = (
                                        <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                                            <GoArrowUpRight className="text-xs opacity-50 group-hover:opacity-100" aria-hidden="true" />
                                        </span>
                                    );

                                    if (isInternal) {
                                        return (
                                            <Link {...commonProps} to={lnk.href}>
                                                {icon}
                                                {lnk.label}
                                            </Link>
                                        );
                                    }

                                    return (
                                        <a {...commonProps} href={lnk.href} target="_blank" rel="noopener noreferrer">
                                            {icon}
                                            {lnk.label}
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </nav>
        </div>
    );
};

export default CardNav;
