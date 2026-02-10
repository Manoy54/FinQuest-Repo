import { useState, useMemo, useEffect } from 'react';

import { levels } from './WordHuntComponents/data';
import type { TargetWord, GridCell, GameLevel } from './WordHuntComponents/data';
import { Grid, WordList } from './WordHuntComponents';


import {
    AnimatedBackground,
    useGameSounds,
    GameComplete,
    LevelProgress
} from '../games/MoneytaryMasteryComponents';

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

export function WordHunt() {
    // Session-based State (No Persistence)
    // Unlock all levels by default as per user request ("no backend yet")
    const [unlockedLevels, setUnlockedLevels] = useState<string[]>([
        'beginner', 'beginner2', 'beginner3',
        'intermediate', 'intermediate2', 'intermediate3',
        'expert', 'expert2', 'expert3'
    ]);
    const [xp, setXp] = useState<number>(0);
    const [coins, setCoins] = useState<number>(0);
    const [currentLevel, setCurrentLevel] = useState<GameLevel>(levels[0]);

    const [gridValues, setGridValues] = useState<string[][]>(levels[0].grid);
    const [words, setWords] = useState<TargetWord[]>(levels[0].words.map(w => ({ ...w, isFound: false })));
    const [foundColors, setFoundColors] = useState<Map<string, string>>(new Map());
    const [gameComplete, setGameComplete] = useState(false);

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
    useEffect(() => {
        setGridValues(currentLevel.grid);
        setWords(currentLevel.words.map(w => ({ ...w, isFound: false })));
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
        setWords(currentLevel.words.map(w => ({ ...w, isFound: false })));
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
        <div className="h-screen font-sans overflow-hidden flex flex-col"
            style={{
                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #1a1a2e 100%)'
            }}
        >
            <AnimatedBackground />

            {/* Header */}
            <header className="relative z-10 p-2 flex flex-col md:flex-row items-center justify-between bg-transparent shrink-0 gap-2 md:gap-0">
                <div className="w-[80px] hidden md:block"></div>{/* Balance spacer */}

                <div className="flex flex-col items-center gap-1 w-full md:w-auto">
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight font-['Outfit'] drop-shadow-sm"
                        style={{
                            background: 'linear-gradient(135deg, #ffd700 0%, #ff6b35 50%, #ffd700 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}
                    >
                        DATA DIVER
                    </h1>
                </div>

                <div className="w-[80px] hidden md:block"></div>{/* Balance spacer */}
            </header>

            <main className="relative z-10 container mx-auto px-4 pb-2 flex-1 flex flex-col items-center gap-1 h-full overflow-hidden">

                {/* Level Progress Bar */}
                <div className="w-full shrink-0">
                    <LevelProgress
                        currentExp={xp}
                        level={playerLevel}
                        expToNextLevel={nextLevelXP}
                        progress={(xp / nextLevelXP) * 100}
                        coins={coins}
                        totalLevel={3} // Changed from 1 to 3 to represent max level stages
                        customLevelLabel={playerRank}
                    />
                </div>

                <div className="flex flex-col lg:flex-row gap-3 items-center lg:items-stretch justify-center w-full max-w-7xl flex-1 h-full overflow-hidden pb-4">
                    {/* Grid Container */}
                    <div className="w-full lg:w-auto flex justify-center order-2 lg:order-1 h-full overflow-y-auto">
                        <Grid
                            grid={grid}
                            onWordSelection={handleWordSelection}
                            foundColors={foundColors}
                            words={words}
                        />
                    </div>

                    {/* Word List Container */}
                    <div className="w-full lg:w-[280px] shrink-0 order-1 lg:order-2 flex flex-col h-[200px] lg:h-full overflow-hidden">
                        <WordList words={words} />
                    </div>
                </div>

            </main>
        </div>
    );
}
