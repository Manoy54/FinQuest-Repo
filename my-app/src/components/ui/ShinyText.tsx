import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, useMotionValue, useAnimationFrame, useTransform } from 'motion/react';
import './ShinyText.css';

interface ShinyTextProps {
    /** Text to display with the shiny effect */
    text: string;
    /** Whether the animation is disabled */
    disabled?: boolean;
    /** Animation speed in seconds */
    speed?: number;
    /** Additional CSS class names */
    className?: string;
    /** Base text color */
    color?: string;
    /** Color of the shine effect */
    shineColor?: string;
    /** Spread of the gradient in degrees */
    spread?: number;
    /** Whether the animation reverses direction */
    yoyo?: boolean;
    /** Whether to pause animation on hover */
    pauseOnHover?: boolean;
    /** Direction of the shine */
    direction?: 'left' | 'right';
    /** Delay before animation starts (in seconds) */
    delay?: number;
}

const ShinyText: React.FC<ShinyTextProps> = ({
    text,
    disabled = false,
    speed = 2,
    className = '',
    color = '#b5b5b5',
    shineColor = '#ffffff',
    spread = 120,
    yoyo = false,
    pauseOnHover = false,
    direction = 'left',
    delay = 0
}) => {
    const [isPaused, setIsPaused] = useState(false);
    const progress = useMotionValue(0);
    const elapsedRef = useRef(0);
    const lastTimeRef = useRef<number | null>(null);
    const directionRef = useRef(direction === 'left' ? 1 : -1);

    const animationDuration = speed * 1000;
    const delayDuration = delay * 1000;

    useAnimationFrame((time) => {
        if (disabled || isPaused) {
            lastTimeRef.current = null;
            return;
        }

        if (lastTimeRef.current === null) {
            lastTimeRef.current = time;
            return;
        }

        const deltaTime = time - lastTimeRef.current;
        lastTimeRef.current = time;

        elapsedRef.current += deltaTime;

        if (yoyo) {
            const cycleDuration = animationDuration + delayDuration;
            const fullCycle = cycleDuration * 2;
            const cycleTime = elapsedRef.current % fullCycle;

            if (cycleTime < animationDuration) {
                // Forward animation: 0 -> 100
                const p = (cycleTime / animationDuration) * 100;
                progress.set(directionRef.current === 1 ? p : 100 - p);
            } else if (cycleTime < cycleDuration) {
                // Delay at end
                progress.set(directionRef.current === 1 ? 100 : 0);
            } else if (cycleTime < cycleDuration + animationDuration) {
                // Reverse animation: 100 -> 0
                const reverseTime = cycleTime - cycleDuration;
                const p = 100 - (reverseTime / animationDuration) * 100;
                progress.set(directionRef.current === 1 ? p : 100 - p);
            } else {
                // Delay at start
                progress.set(directionRef.current === 1 ? 0 : 100);
            }
        } else {
            const cycleDuration = animationDuration + delayDuration;
            const cycleTime = elapsedRef.current % cycleDuration;

            if (cycleTime < animationDuration) {
                // Animation phase: 0 -> 100
                const p = (cycleTime / animationDuration) * 100;
                progress.set(directionRef.current === 1 ? p : 100 - p);
            } else {
                // Delay phase - hold at end (shine off-screen)
                progress.set(directionRef.current === 1 ? 100 : 0);
            }
        }
    });

    useEffect(() => {
        directionRef.current = direction === 'left' ? 1 : -1;
        elapsedRef.current = 0;
        progress.set(0);
    }, [direction, progress]);

    // Transform: p=0 -> 150% (shine off right), p=100 -> -50% (shine off left)
    const backgroundPosition = useTransform(progress, (p) => `${150 - p * 2}% center`);

    const handleMouseEnter = useCallback(() => {
        if (pauseOnHover) setIsPaused(true);
    }, [pauseOnHover]);

    const handleMouseLeave = useCallback(() => {
        if (pauseOnHover) setIsPaused(false);
    }, [pauseOnHover]);

    const gradientStyle: React.CSSProperties = {
        backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`,
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text', // Standard property
        WebkitTextFillColor: 'transparent',
        // 'color': 'transparent' // Standard fallback if needed, but WebkitTextFillColor usually suffices
    };

    return (
        <motion.span
            className={`shiny-text ${className}`}
            style={{ ...gradientStyle, backgroundPosition }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {text}
        </motion.span>
    );
};

export default ShinyText;
