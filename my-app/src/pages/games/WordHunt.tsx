import { useState, useMemo, useEffect, useRef } from 'react';

import { levels } from './WordHuntComponents/data';
import type { TargetWord, GridCell, GameLevel } from './WordHuntComponents/data';
import { Grid, WordList, HowToPlayModal } from './WordHuntComponents';


import {
    AnimatedBackground,
    useGameSounds,
    GameComplete,
    GameRatingModal
} from '../games/MoneytaryMasteryComponents';
import { HUD } from '../../app/components/HUD';
import { useUserContext } from '../../context/UserContext.tsx';
import { generateLevel, createRNG } from './WordHuntComponents/gridGenerator';

// Level Thresholds
const XP_THRESHOLDS = {
    INTERMEDIATE: 850, // Completing all Beginners (approx 17-18 words * 50 = ~850-900)
    EXPERT: 1750        // Completing all Intermediates (approx 18-20 words * 50 + prev = ~1750-1900)
};

const WORDS_XP = 50;
const WORDS_COINS = 20;

// Helper to generate cells between two points
const getCellsBetween = (start: { r: number, c: number }, end: { r: number, c: number }) => {
    const cells: { r: number, c: number }[] = [];
    const dr = Math.sign(end.r - start.r);
    const dc = Math.sign(end.c - start.c);
    let r = start.r;
    let c = start.c;

    const maxSteps = Math.max(Math.abs(end.r - start.r), Math.abs(end.c - start.c)) + 1;
    let steps = 0;

    while (steps < maxSteps) {
        cells.push({ r, c });
        if (r === end.r && c === end.c) break;
        r += dr;
        c += dc;
        steps++;
    }
    return cells;
};

// Helper to select a subset of words based on difficulty
const selectWordsForLevel = (level: GameLevel, random: () => number) => {
    let count = level.words.length;
    if (level.id.includes('beginner')) {
        count = Math.floor(random() * 2) + 5; // 5 or 6
    } else if (level.id.includes('intermediate')) {
        count = Math.floor(random() * 2) + 6; // 6 or 7
    } else {
        count = 8; // Expert: 8 words
    }

    // Shuffle and slice — prefer shorter words to keep grid compact
    const MAX_WORD_LENGTH = 9; // Max characters (spaces removed) to keep grid ≤ 10 cols
    const shortWords = level.words.filter(w => w.word.replace(/ /g, '').length <= MAX_WORD_LENGTH);
    const pool = shortWords.length >= count ? shortWords : [...level.words]; // fallback if not enough short words

    return [...pool]
        .sort(() => random() - 0.5)
        .slice(0, Math.min(count, pool.length));
};

export function WordHunt() {
    const { addXp, addCoins } = useUserContext();
    const hasAwardedRef = useRef(false);
    const lastAwardedExp = useRef(0);
    const lastAwardedCoins = useRef(0);



    // Generate initial grid
    const initialGridData = useMemo(() => {
        // Create a stable seed: Level ID + DateString (YYYY-MM-DD)
        const dateStr = new Date().toISOString().split('T')[0];
        const seedStr = `${levels[0].id}-${dateStr}`;
        const rng = createRNG(seedStr);

        const selectedWords = selectWordsForLevel(levels[0], rng);
        // Find longest word to determine minimum grid size needed for vertical placement
        const longestWord = Math.max(...selectedWords.map(w => w.word.replace(/ /g, '').length));

        // Ensure grid is large enough to fit the longest word
        const size = Math.max(8, longestWord + 1);

        // For Beginner, we kept it square-ish or rectangular, but it MUST be tall enough.
        return generateLevel(selectedWords, size, size, rng); // Tight fit
    }, []);

    const [unlockedLevels, setUnlockedLevels] = useState<string[]>([
        'beginner', 'beginner2', 'beginner3'
    ]);
    // Always reset XP and Coins on reload as per "do not save progress"
    const [xp, setXp] = useState<number>(0);
    const [coins, setCoins] = useState<number>(0);

    const [currentLevel, setCurrentLevel] = useState<GameLevel>(levels[0]);

    const [gridValues, setGridValues] = useState<string[][]>(() => initialGridData?.grid || levels[0].grid);
    const [words, setWords] = useState<TargetWord[]>(() => initialGridData?.placedWords || levels[0].words.map(w => ({ ...w, isFound: false })));
    const [foundColors, setFoundColors] = useState<Map<string, string>>(() => new Map());
    const [gameComplete, setGameComplete] = useState(false);

    // Rating Modal State
    const [showRating, setShowRating] = useState(false);
    const [showHowToPlay, setShowHowToPlay] = useState(true);
    const [totalWordsFound, setTotalWordsFound] = useState(0);
    // Trigger rating after finding between 3 and 12 words randomly across the session
    const [ratingTarget] = useState(() => Math.floor(Math.random() * 10) + 3);

    useEffect(() => {
        if (totalWordsFound === ratingTarget && totalWordsFound > 0) {
            const timer = setTimeout(() => setShowRating(true), 1500); // Delay to let celebration finish
            return () => clearTimeout(timer);
        }
    }, [totalWordsFound, ratingTarget]);

    useEffect(() => {
        if (gameComplete && !hasAwardedRef.current) {
            const earnedXp = xp - lastAwardedExp.current;
            const earnedCoins = coins - lastAwardedCoins.current;

            if (earnedXp > 0) addXp(earnedXp);
            if (earnedCoins > 0) addCoins(earnedCoins);

            lastAwardedExp.current = xp;
            lastAwardedCoins.current = coins;
            hasAwardedRef.current = true;
        } else if (!gameComplete) {
            hasAwardedRef.current = false;
        }
    }, [gameComplete, xp, coins, addXp, addCoins]);





    const { playSound } = useGameSounds();

    // Check for Level Unlocks based on XP
    useEffect(() => {
        let newUnlocked = [...unlockedLevels];
        let changed = false;

        if (xp >= XP_THRESHOLDS.INTERMEDIATE && !unlockedLevels.includes('intermediate')) {
            newUnlocked.push('intermediate', 'intermediate2', 'intermediate3');
            changed = true;
        }
        if (xp >= XP_THRESHOLDS.EXPERT && !unlockedLevels.includes('expert')) {
            newUnlocked.push('expert', 'expert2', 'expert3');
            changed = true;
        }

        if (changed) {
            setUnlockedLevels(newUnlocked);
        }
    }, [xp, unlockedLevels]);


    // Track last processed level ID to prevent unwanted regeneration on reload
    // We initialize this with currentLevel.id so the first run (mount) matches and skips regeneration
    // IF we loaded from storage. If it's a fresh game, it skips too, preserving initialGridData.
    const lastLevelId = useRef(currentLevel.id);

    // Reset game ONLY when level effectively changes
    useEffect(() => {
        // If we have a saved grid that matches the current level, verify we shouldn't regenerate
        if (currentLevel.id === lastLevelId.current && gridValues.length > 0) {
            return;
        }

        lastLevelId.current = currentLevel.id;

        // Create a stable seed: Level ID + DateString (YYYY-MM-DD)
        const dateStr = new Date().toISOString().split('T')[0];
        const seedStr = `${currentLevel.id}-${dateStr}`;
        const rng = createRNG(seedStr);

        // Select subset of words based on difficulty
        const selectedWords = selectWordsForLevel(currentLevel, rng);

        // Calculate dynamic size - tight fit
        const longestWord = Math.max(...selectedWords.map(w => w.word.replace(/ /g, '').length));

        // Ensure grid is always tall/wide enough for the longest word to fit
        const size = Math.max(8, longestWord + 1);

        let rows = size;
        let cols = size;

        const generated = generateLevel(selectedWords, rows, cols, rng);

        if (generated) {
            setGridValues(generated.grid);
            setWords(generated.placedWords.map(w => ({ ...w, isFound: false })));
        } else {
            // Fallback to static if generation fails (unlikely)
            setGridValues(currentLevel.grid);
            setWords(currentLevel.words.map(w => ({ ...w, isFound: false })));
        }

        setFoundColors(new Map());
        setGameComplete(false);
    }, [currentLevel]);

    const grid: GridCell[][] = useMemo(() => {
        return gridValues.map((row, r) =>
            row.map((letter, c) => ({
                letter,
                row: r,
                col: c,
                isFound: false,
                isSelected: false
            }))
        );
    }, [gridValues]);

    // Derived stats for UI
    const playerLevel = useMemo(() => {
        if (xp >= XP_THRESHOLDS.EXPERT) return 3;
        if (xp >= XP_THRESHOLDS.INTERMEDIATE) return 2;
        return 1;
    }, [xp]);

    const playerRank = useMemo(() => {
        if (xp >= XP_THRESHOLDS.EXPERT) return "Expert";
        if (xp >= XP_THRESHOLDS.INTERMEDIATE) return "Intermediate";
        return "Beginner";
    }, [xp]);

    const nextLevelXP = useMemo(() => {
        if (playerLevel === 1) return XP_THRESHOLDS.INTERMEDIATE;
        if (playerLevel === 2) return XP_THRESHOLDS.EXPERT;
        return xp; // Max level
    }, [playerLevel, xp]);

    const handleWordSelection = (start: { r: number, c: number }, end: { r: number, c: number }) => {
        let matchedSomething = false;

        const newFoundColors = new Map(foundColors);
        let newWords = [...words];

        newWords = newWords.map(word => {
            if (word.isFound) {
                return word;
            }

            const isForward = (word.start[0] === start.r && word.start[1] === start.c &&
                word.end[0] === end.r && word.end[1] === end.c);

            const isReverse = (word.start[0] === end.r && word.start[1] === end.c &&
                word.end[0] === start.r && word.end[1] === start.c);

            if (isForward || isReverse) {
                matchedSomething = true;
                playSound('correct');

                // Award XP and Coins
                setXp(prev => prev + WORDS_XP);
                setCoins(prev => prev + WORDS_COINS);
                setTotalWordsFound(prev => prev + 1);

                const cells = getCellsBetween(
                    { r: word.start[0], c: word.start[1] },
                    { r: word.end[0], c: word.end[1] }
                );

                cells.forEach(cell => {
                    newFoundColors.set(`${cell.r},${cell.c}`, word.color || '#4ECDC4');
                });

                return { ...word, isFound: true };
            }
            return word;
        });

        if (matchedSomething) {
            setFoundColors(newFoundColors);
            setWords(newWords);

            const totalFound = newWords.filter(w => w.isFound).length;
            if (totalFound === newWords.length) {
                setTimeout(() => {
                    setGameComplete(true);
                    playSound('correct');
                }, 500);
            }
        } else {
            playSound('wrong');
        }
    };

    const handleRetryLevel = () => {
        // Regenerate for a fresh attempt at the same level
        // Use same seed to ensure it's still the "same" level configuration for fairness/consistency
        const dateStr = new Date().toISOString().split('T')[0];
        const seedStr = `${currentLevel.id}-${dateStr}`;
        const rng = createRNG(seedStr);

        // We should re-select words too to match the seed
        // Note: The previous logic might have just used currentLevel.words directly?
        // Wait, currentLevel has ALL words, we need to select the subset again using the seed.
        // Actually, if we use the same seed, selectWordsForLevel will return the SAME words.
        const selectedWords = selectWordsForLevel(currentLevel, rng);

        const longestWord = Math.max(...selectedWords.map(w => w.word.replace(/ /g, '').length));
        const size = Math.max(8, longestWord + 1);

        const generated = generateLevel(selectedWords, size, size, rng);

        if (generated) {
            setGridValues(generated.grid);
            setWords(generated.placedWords.map(w => ({ ...w, isFound: false })));
        } else {
            // Fallback
            setGridValues(currentLevel.grid);
            setWords(currentLevel.words.map(w => ({ ...w, isFound: false })));
        }

        setFoundColors(new Map());
        setGameComplete(false);
    };

    const handleRestartGame = () => {
        // Full Reset
        setXp(0);
        setCoins(0);
        setUnlockedLevels(['beginner', 'beginner2', 'beginner3']);
        setCurrentLevel(levels[0]);

        // Reset Board state for the new level (Beginner)
        setGridValues(levels[0].grid); // reset grid explicitly though useEffect handles it on level change, good to be safe/synchronous if needed, but useEffect depends on currentLevel
        // Actually, setting currentLevel will trigger the useEffect to reset grid/words.
        // But we also need to close the modal.
        setGameComplete(false);
        lastAwardedExp.current = 0;
        lastAwardedCoins.current = 0;
    };

    const handleNextLevel = () => {
        // Find next level logic
        const currentIndex = levels.findIndex(l => l.id === currentLevel.id);
        if (currentIndex < levels.length - 1) {
            const nextLevel = levels[currentIndex + 1];
            // Only allow if unlocked (it should be if XP is enough, but redundant check is safe)
            if (unlockedLevels.includes(nextLevel.id)) {
                setCurrentLevel(nextLevel);
            }
        }
    };

    // Determine if next level is available
    const nextLevelAvailable = useMemo(() => {
        const currentIndex = levels.findIndex(l => l.id === currentLevel.id);
        if (currentIndex >= levels.length - 1) return false;
        const nextLevelId = levels[currentIndex + 1].id;
        return unlockedLevels.includes(nextLevelId);
    }, [currentLevel, unlockedLevels]);

    // Scaling Logic
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const handleResize = () => {
            const TARGET_WIDTH = 1280;
            const TARGET_HEIGHT = 800;

            // Calculate scale to fit strictly within the viewport
            // Use 'contain' logic: fit completely visible
            // Subtract HUD height (approx 100px) from available height
            const HUD_OFFSET = 100;
            const scaleX = window.innerWidth / TARGET_WIDTH;
            const scaleY = (window.innerHeight - HUD_OFFSET) / TARGET_HEIGHT;

            // Choose the smaller scale to ensure it fits entirely
            const newScale = Math.min(scaleX, scaleY);

            setScale(newScale); // Exact fit, no margin needed if we center it properly
        };

        handleResize(); // Initial
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (gameComplete) {
        const score = words.filter(w => w.isFound).length;
        return (
            <GameComplete
                score={score}
                totalCards={words.length}
                exp={score * WORDS_XP}
                coins={score * WORDS_COINS}
                requiredScore={words.length}
                onRestart={handleRestartGame}
                onReplayLevel={handleRetryLevel}
                onNextLevel={nextLevelAvailable ? handleNextLevel : undefined}
                nextLevelLabel="Start Next Level"
            />
        );
    }

    return (
        <div className="h-screen w-screen bg-[#1a1a2e] overflow-hidden flex flex-col relative font-sans"
            style={{
                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #1a1a2e 100%)'
            }}
        >
            <AnimatedBackground />

            {/* Header - Moved outside scaled container for consistency */}
            <HUD
                title="DATA DIVER"
                currentExp={xp}
                level={playerLevel}
                expToNextLevel={nextLevelXP}
                progress={(xp / nextLevelXP) * 100}
                coins={coins}
                totalLevel={3}
                customLevelLabel={playerRank}
                onHowToPlay={() => setShowHowToPlay(true)}
                className="hover:bg-white/5 transition-colors"
            />

            {/* Main Content Area - Centered Scaled Stage */}
            <div className="flex-1 w-full flex items-center justify-center overflow-hidden relative z-10">

                {/* Scaled Container - The Rigid "Stage" */}
                <div
                    className="relative flex flex-col items-center shadow-2xl overflow-hidden"
                    style={{
                        width: '1280px',
                        height: '800px',
                        transform: `scale(${scale})`,
                        // transformOrigin: 'center center', // Default
                        border: '1px solid rgba(255,255,255,0.05)',
                        borderRadius: '24px',
                        background: 'rgba(0,0,0,0.2)',
                        backdropFilter: 'blur(10px)'
                    }}
                >
                    {/* Header */}
                    {/* Header */}


                    {/* Main Content Area - Fixed Grid Layout */}
                    <div className="flex-1 w-full px-8 pb-2 pt-1 flex gap-4 overflow-hidden z-10 justify-center items-center">

                        {/* Left Column: Grid Container - 60% Width */}
                        <div className="w-[60%] h-full flex items-center justify-center">
                            <div className="w-full max-h-full flex items-center justify-center">
                                <Grid
                                    grid={grid}
                                    onWordSelection={handleWordSelection}
                                    foundColors={foundColors}
                                    words={words}
                                />
                            </div>
                        </div>

                        {/* Right Column: Mission List - 38% Width */}
                        <div className="w-[38%] max-h-full flex flex-col justify-center">
                            <div className="w-full max-h-full">
                                <WordList words={words} />
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <GameRatingModal
                isOpen={showRating}
                onClose={() => setShowRating(false)}
                gameId="word_hunt"
            />

            <HowToPlayModal
                isOpen={showHowToPlay}
                onClose={() => setShowHowToPlay(false)}
            />
        </div >
    );
}
