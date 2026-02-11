import { useState, useMemo, useEffect } from 'react';

import { levels } from './WordHuntComponents/data';
import type { TargetWord, GridCell, GameLevel } from './WordHuntComponents/data';
import { Grid, WordList, HowToPlayModal } from './WordHuntComponents';


import {
    AnimatedBackground,
    useGameSounds,
    GameComplete,
    LevelProgress,
    GameRatingModal
} from '../games/MoneytaryMasteryComponents';
import { generateLevel } from './WordHuntComponents/gridGenerator';

// Level Thresholds
const XP_THRESHOLDS = {
    INTERMEDIATE: 1250, // Completing all Beginners (approx 25 words * 50 = 1250)
    EXPERT: 2300        // Completing all Intermediates (approx 21 words * 50 = 1050 + 1250 = 2300)
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
const selectWordsForLevel = (level: GameLevel) => {
    let count = level.words.length;
    if (level.id.includes('beginner')) {
        count = Math.floor(Math.random() * 2) + 5; // 5 or 6
    } else if (level.id.includes('intermediate')) {
        count = Math.floor(Math.random() * 2) + 6; // 6 or 7
    } else {
        count = 8; // Expert: 8 words
    }

    // Shuffle and slice
    return [...level.words]
        .sort(() => Math.random() - 0.5)
        .slice(0, Math.min(count, level.words.length));
};

export function WordHunt() {
    // Session-based State (No Persistence)
    // Unlock all levels by default as per user request ("no backend yet")
    // Generate initial grid
    const initialGridData = useMemo(() => {
        const selectedWords = selectWordsForLevel(levels[0]);
        // Find longest word to determine minimum grid size needed for vertical placement
        const longestWord = Math.max(...selectedWords.map(w => w.word.replace(/ /g, '').length));

        // Ensure grid is large enough to fit the longest word VERTICALLY
        const size = Math.max(8, longestWord + 1);

        // For Beginner, we kept it square-ish or rectangular, but it MUST be tall enough.
        return generateLevel(selectedWords, size, size); // Tight fit
    }, []);

    const [unlockedLevels, setUnlockedLevels] = useState<string[]>([
        'beginner', 'beginner2', 'beginner3',
        'intermediate', 'intermediate2', 'intermediate3',
        'expert', 'expert2', 'expert3'
    ]);
    const [xp, setXp] = useState<number>(0);
    const [coins, setCoins] = useState<number>(0);
    const [currentLevel, setCurrentLevel] = useState<GameLevel>(levels[0]);

    const [gridValues, setGridValues] = useState<string[][]>(initialGridData?.grid || levels[0].grid);
    const [words, setWords] = useState<TargetWord[]>(initialGridData?.placedWords || levels[0].words.map(w => ({ ...w, isFound: false })));
    const [foundColors, setFoundColors] = useState<Map<string, string>>(new Map());
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

    const { playSound } = useGameSounds();

    // Check for Level Unlocks based on XP
    useEffect(() => {
        let newUnlocked = [...unlockedLevels];
        let changed = false;

        if (xp >= XP_THRESHOLDS.INTERMEDIATE && !unlockedLevels.includes('intermediate')) {
            newUnlocked.push('intermediate');
            changed = true;
        }
        if (xp >= XP_THRESHOLDS.EXPERT && !unlockedLevels.includes('expert')) {
            newUnlocked.push('expert');
            changed = true;
        }

        if (changed) {
            setUnlockedLevels(newUnlocked);
        }
    }, [xp, unlockedLevels]);


    // Reset game when level changes
    // Reset game when level changes
    useEffect(() => {
        // Select subset of words based on difficulty
        const selectedWords = selectWordsForLevel(currentLevel);

        // Calculate dynamic size - tight fit
        const longestWord = Math.max(...selectedWords.map(w => w.word.replace(/ /g, '').length));

        // Ensure grid is always tall/wide enough for the longest word to fit vertically/horizontally
        // Add +1 buffer to make placement easier (reducing forced fallbacks)
        const minSize = Math.max(8, longestWord + 1);

        let rows = minSize;
        let cols = minSize;

        // Keep it tight for all levels
        // Expert might naturally have longer words, so minSize handles it.
        // We remove the artificial +2 padding.

        const generated = generateLevel(selectedWords, rows, cols);

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
        const longestWord = Math.max(...currentLevel.words.map(w => w.word.replace(/ /g, '').length));
        const size = Math.max(12, longestWord + 1, currentLevel.grid.length, currentLevel.grid[0].length);

        const generated = generateLevel(currentLevel.words, size, size);

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
        setUnlockedLevels(['beginner']);
        setCurrentLevel(levels[0]);

        // Reset Board state for the new level (Beginner)
        setGridValues(levels[0].grid); // reset grid explicitly though useEffect handles it on level change, good to be safe/synchronous if needed, but useEffect depends on currentLevel
        // Actually, setting currentLevel will trigger the useEffect to reset grid/words.
        // But we also need to close the modal.
        setGameComplete(false);
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
            const scaleX = window.innerWidth / TARGET_WIDTH;
            const scaleY = window.innerHeight / TARGET_HEIGHT;

            // Choose the smaller scale to ensure it fits entirely
            const newScale = Math.min(scaleX, scaleY);

            setScale(newScale * 0.95); // 95% to leave a small safe margin
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
        <div className="h-screen w-screen bg-[#1a1a2e] overflow-hidden flex items-center justify-center relative font-sans"
            style={{
                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #1a1a2e 100%)'
            }}
        >
            <AnimatedBackground />

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
                <header className="w-full h-[80px] px-8 flex items-center justify-between shrink-0 relative z-20 hover:bg-white/5 transition-colors">
                    {/* Left: Spacer to balance */}
                    <div className="w-[120px]">
                        {/* Optional: Add Back Button here later if needed */}
                    </div>

                    <div className="flex flex-col items-center">
                        <h1 className="text-5xl font-black tracking-tight font-['Outfit'] drop-shadow-sm select-none"
                            style={{
                                background: 'linear-gradient(135deg, #ffd700 0%, #ff6b35 50%, #ffd700 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}
                        >
                            DATA DIVER
                        </h1>
                    </div>

                    {/* Right: Controls */}
                    <div className="w-[120px] flex justify-end">
                        <button
                            onClick={() => setShowHowToPlay(true)}
                            className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all hover:scale-105 active:scale-95 shadow-lg backdrop-blur-sm"
                            title="How to Play"
                        >
                            <span className="text-2xl">❓</span>
                        </button>
                    </div>
                </header>

                {/* Progress Bar Area */}
                <div className="w-full px-12 py-2 shrink-0 z-20">
                    <LevelProgress
                        currentExp={xp}
                        level={playerLevel}
                        expToNextLevel={nextLevelXP}
                        progress={(xp / nextLevelXP) * 100}
                        coins={coins}
                        totalLevel={3}
                        customLevelLabel={playerRank}
                    />
                </div>

                {/* Main Content Area - Fixed Grid Layout */}
                <div className="flex-1 w-full px-12 pb-8 pt-4 flex gap-12 overflow-hidden z-10 justify-center items-center">

                    {/* Left Column: Grid Container (Square) - Dominant */}
                    <div className="w-[600px] h-[600px] flex items-center justify-center relative shrink-0">
                        {/* 
                            We constrain the grid container to be fitted 
                            within the available space. 
                        */}
                        <div className="max-h-full flex items-center justify-center">
                            <Grid
                                grid={grid}
                                onWordSelection={handleWordSelection}
                                foundColors={foundColors}
                                words={words}
                            />
                        </div>
                    </div>

                    {/* Right Column: Mission List (Half Width) - Smaller */}
                    <div className="w-[300px] h-[600px] shrink-0 flex flex-col justify-center">
                        <div className="w-full h-full">
                            <WordList words={words} />
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
        </div>
    );
}
