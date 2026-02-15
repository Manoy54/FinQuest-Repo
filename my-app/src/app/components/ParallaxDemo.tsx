import { useRef, useState, useEffect, useCallback } from 'react';
import { Parallax, ParallaxLayer, type IParallax } from '@react-spring/parallax';
import { GameButton } from './GameButton';

interface GameMode {
    title: string;
    description: string;
    route: string;
    gradient: string;
    buttonGradient: string;
    emoji: string;
    stripeColor: string;
}

const gameModes: GameMode[] = [
    {
        title: 'Capital Cup',
        description: 'Test your financial knowledge in our exciting timed quiz mode!',
        route: '/quiz-bee',
        gradient: 'teal',
        buttonGradient: 'from-sky-400 to-blue-500',
        emoji: '🏆',
        stripeColor: 'linear-gradient(135deg, SlateBlue 0%, DeepSkyBlue 100%)',
    },
    {
        title: 'Monetary Mastery',
        description: 'Master the art of finance with flashcards and challenges!',
        route: '/monetary-mastery',
        gradient: 'pink',
        buttonGradient: 'from-pink-500 to-rose-500',
        emoji: '💎',
        stripeColor: 'linear-gradient(135deg, deeppink 0%, coral 100%)',
    },
    {
        title: 'Data Diver',
        description: 'Find hidden financial terms and expand your vocabulary!',
        route: '/word-hunt',
        gradient: 'purple',
        buttonGradient: 'from-purple-500 to-violet-500',
        emoji: '🔍',
        stripeColor: 'linear-gradient(135deg, rebeccapurple 0%, violet 100%)',
    },
    {
        title: 'Corporate Climb',
        description: 'Solve crossword puzzles with financial terminology!',
        route: '/crossword',
        gradient: 'tomato',
        buttonGradient: 'from-orange-400 to-red-500',
        emoji: '🧩',
        stripeColor: 'linear-gradient(135deg, tomato 0%, gold 100%)',
    },
];

interface SlideProps {
    offset: number;
    mode: GameMode;
    onClick: () => void;
}

const Slide = ({ offset, mode, onClick }: SlideProps) => (
    <ParallaxLayer offset={offset} speed={0.2}>
        <div
            onClick={onClick}
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                backgroundColor: '#20232f',
                overflow: 'hidden',
                boxSizing: 'border-box',
                cursor: 'pointer',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    right: '-10%',
                    width: '45%',
                    height: '100%',
                    background: mode.stripeColor,
                    clipPath: 'polygon(30% 0, 100% 0, 70% 100%, 0% 100%)',
                    pointerEvents: 'none',
                }}
            />

            <div
                style={{
                    position: 'relative',
                    zIndex: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    height: '100%',
                    paddingLeft: 'clamp(4rem, 12vw, 10rem)',
                    paddingRight: '50%',
                    boxSizing: 'border-box',
                    maxWidth: '100%',
                }}
            >
                <span
                    style={{
                        fontSize: 'clamp(2.5rem, 4vw, 4rem)',
                        display: 'block',
                        marginBottom: '0.75rem',
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                    }}
                >
                    {mode.emoji}
                </span>
                <h2
                    style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: 'clamp(1.75rem, 3.5vw, 3rem)',
                        fontWeight: 900,
                        color: '#ffffff',
                        margin: '0 0 0.5rem 0',
                        lineHeight: 1.1,
                        letterSpacing: '-0.02em',
                        textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                        maxWidth: '100%',
                        overflowWrap: 'break-word',
                    }}
                >
                    {mode.title}
                </h2>
                <p
                    style={{
                        fontSize: 'clamp(0.8rem, 1.2vw, 1rem)',
                        color: 'rgba(255,255,255,0.65)',
                        margin: '0 0 1.5rem 0',
                        lineHeight: 1.6,
                        fontWeight: 300,
                        maxWidth: '90%',
                    }}
                >
                    {mode.description}
                </p>
                <GameButton
                    to={mode.route}
                    gradient={mode.buttonGradient}
                    text="Play Now"
                />
            </div>
        </div>
    </ParallaxLayer>
);

/* ── Custom Scrollbar ────────────────────────────── */
function CustomScrollbar({ parallaxRef }: { parallaxRef: React.RefObject<IParallax | null> }) {
    const [progress, setProgress] = useState(0);
    const trackRef = useRef<HTMLDivElement>(null);
    const draggingRef = useRef(false);
    const totalPages = gameModes.length;
    const thumbWidthPercent = (1 / totalPages) * 100;

    const getContainer = useCallback((): HTMLDivElement | null => {
        return (parallaxRef.current as any)?.container?.current ?? null;
    }, [parallaxRef]);

    /* Sync scroll position → progress */
    const syncProgress = useCallback(() => {
        const container = getContainer();
        if (!container) return;
        const { scrollLeft, scrollWidth, clientWidth } = container;
        const maxScroll = scrollWidth - clientWidth;
        if (maxScroll > 0) {
            setProgress(scrollLeft / maxScroll);
        }
    }, [getContainer]);

    useEffect(() => {
        let container: HTMLDivElement | null = null;
        let retryTimer: ReturnType<typeof setInterval>;

        const attach = () => {
            container = getContainer();
            if (container) {
                container.addEventListener('scroll', syncProgress, { passive: true });
                syncProgress();
                return true;
            }
            return false;
        };

        if (!attach()) {
            retryTimer = setInterval(() => {
                if (attach()) clearInterval(retryTimer);
            }, 100);
        }

        return () => {
            clearInterval(retryTimer!);
            container?.removeEventListener('scroll', syncProgress);
        };
    }, [getContainer, syncProgress]);

    /* Directly set scrollLeft for instant response (no animation) */
    const scrollToPercent = useCallback((percent: number) => {
        const container = getContainer();
        if (!container) return;
        const maxScroll = container.scrollWidth - container.clientWidth;
        container.scrollLeft = percent * maxScroll;
    }, [getContainer]);

    /* Click on track → jump to position */
    const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!trackRef.current) return;
        const rect = trackRef.current.getBoundingClientRect();
        const clickPercent = (e.clientX - rect.left) / rect.width;
        scrollToPercent(Math.max(0, Math.min(1, clickPercent)));
    };

    /* Drag the thumb */
    const handleThumbMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        draggingRef.current = true;
        document.body.style.cursor = 'grabbing';
        document.body.style.userSelect = 'none';

        const onMove = (ev: MouseEvent) => {
            if (!draggingRef.current || !trackRef.current) return;
            const rect = trackRef.current.getBoundingClientRect();
            const movePercent = (ev.clientX - rect.left) / rect.width;
            scrollToPercent(Math.max(0, Math.min(1, movePercent)));
        };

        const onUp = () => {
            draggingRef.current = false;
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseup', onUp);
        };

        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
    };

    const thumbLeft = progress * (100 - thumbWidthPercent);

    return (
        <div
            ref={trackRef}
            onClick={handleTrackClick}
            style={{
                position: 'absolute',
                bottom: 6,
                left: '10%',
                right: '10%',
                height: 4,
                background: 'rgba(255, 255, 255, 0.08)',
                borderRadius: 2,
                cursor: 'pointer',
                zIndex: 30,
            }}
        >
            <div
                onMouseDown={handleThumbMouseDown}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: `${thumbLeft}%`,
                    width: `${thumbWidthPercent}%`,
                    height: '100%',
                    background: '#ffffff',
                    borderRadius: 2,
                    cursor: draggingRef.current ? 'grabbing' : 'grab',
                }}
            />
        </div>
    );
}

/* ── Main Component ────────────────────────────── */
export function ParallaxDemo() {
    const parallax = useRef<IParallax>(null);

    const scroll = (to: number) => {
        if (parallax.current) {
            parallax.current.scrollTo(to);
        }
    };

    return (
        <div style={{ background: '#20232f', height: '100%', width: '100%', position: 'relative' }}>
            <Parallax className="parallax-container" ref={parallax} pages={4} horizontal>
                {gameModes.map((mode, i) => (
                    <Slide
                        key={mode.route}
                        offset={i}
                        mode={mode}
                        onClick={() => scroll((i + 1) % 4)}
                    />
                ))}
            </Parallax>

            <CustomScrollbar parallaxRef={parallax} />
        </div>
    );
}
