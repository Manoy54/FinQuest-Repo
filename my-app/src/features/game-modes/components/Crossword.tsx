import { useState, useMemo, useEffect, useRef, useCallback } from 'react';

import {
    generateGrid,
    clues,
    GRID_SIZE,
    type Clue
} from './CrosswordComponents/data';
import { EasyCrosswordGrid } from './CrosswordComponents/grids/EasyCrosswordGrid';
import { MediumCrosswordGrid } from './CrosswordComponents/grids/MediumCrosswordGrid';
import { HardCrosswordGrid } from './CrosswordComponents/grids/HardCrosswordGrid';
import { ExtremeCrosswordGrid } from './CrosswordComponents/grids/ExtremeCrosswordGrid';
import { ClueList } from './CrosswordComponents/ClueList';
import { HowToPlayModal } from './CrosswordComponents/HowToPlayModal';
import {
    AnimatedBackground,
    useGameSounds,
    GameComplete
} from './MoneytaryMasteryComponents';
import { HUD } from '../../../components/navigation/HUD';
import { useUserContext } from '../../../context/UserContext.tsx';

export function Crossword() {
    const { addXp, addCoins } = useUserContext();
    const hasAwardedRef = useRef(false);

    const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'hard' | 'extreme'>('beginner');
    const [grid, setGrid] = useState(() => generateGrid('beginner'));
    const [userAnswers, setUserAnswers] = useState<Map<string, string>>(new Map());
    const [activeCell, setActiveCell] = useState<{ row: number, col: number } | null>(null);
    const [activeDirection, setActiveDirection] = useState<'across' | 'down'>('across');
    const [gameComplete, setGameComplete] = useState(false);
    const [showValidation, setShowValidation] = useState(false);
    const [showHowToPlay, setShowHowToPlay] = useState(true);
    const [zoom, setZoom] = useState(1.0);
    const { playSound } = useGameSounds();

    // Reset game when difficulty changes
    useEffect(() => {
        setGrid(generateGrid(difficulty));
        setUserAnswers(new Map());
        setActiveCell(null);
        setGameComplete(false);
        hasAwardedRef.current = false;
    }, [difficulty]);

    const currentClues = useMemo(() => clues[difficulty], [difficulty]);


    // Mouse wheel zoom on the grid wrapper only
    const gridWrapperRef = useRef<HTMLDivElement>(null);
    const handleWheel = useCallback((e: WheelEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const delta = e.deltaY > 0 ? -0.05 : 0.05;
        setZoom(prev => Math.min(Math.max(prev + delta, 0.4), 2.5));
    }, []);

    // Drag-to-pan state
    const isDragging = useRef(false);
    const dragStart = useRef({ x: 0, y: 0, scrollLeft: 0, scrollTop: 0 });

    const handleMouseDown = useCallback((e: MouseEvent) => {
        const wrapper = gridWrapperRef.current;
        if (!wrapper) return;
        // Only drag with left mouse button and not on an input
        if (e.button !== 0 || (e.target as HTMLElement).tagName === 'INPUT') return;
        isDragging.current = true;
        dragStart.current = {
            x: e.clientX,
            y: e.clientY,
            scrollLeft: wrapper.scrollLeft,
            scrollTop: wrapper.scrollTop,
        };
        wrapper.style.cursor = 'grabbing';
        wrapper.style.userSelect = 'none';
    }, []);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!isDragging.current) return;
        const wrapper = gridWrapperRef.current;
        if (!wrapper) return;
        const dx = e.clientX - dragStart.current.x;
        const dy = e.clientY - dragStart.current.y;
        wrapper.scrollLeft = dragStart.current.scrollLeft - dx;
        wrapper.scrollTop = dragStart.current.scrollTop - dy;
    }, []);

    const handleMouseUp = useCallback(() => {
        isDragging.current = false;
        const wrapper = gridWrapperRef.current;
        if (wrapper) {
            wrapper.style.cursor = 'grab';
            wrapper.style.userSelect = '';
        }
    }, []);

    useEffect(() => {
        const wrapper = gridWrapperRef.current;
        if (!wrapper) return;
        wrapper.addEventListener('wheel', handleWheel, { passive: false });
        wrapper.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        wrapper.style.cursor = 'grab';
        return () => {
            wrapper.removeEventListener('wheel', handleWheel);
            wrapper.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [handleWheel, handleMouseDown, handleMouseMove, handleMouseUp]);

    // Calculate max score
    const maxScore = useMemo(() => {
        return (currentClues.length * 50) + 500; // 50 pts per word + 500 pts completion bonus
    }, [currentClues]);

    // Calculate score
    const score = useMemo(() => {
        let currentScore = 0;
        let allWordsCorrect = true;

        currentClues.forEach(clue => {
            let isWordCorrect = true;
            for (let i = 0; i < clue.answer.length; i++) {
                const r = clue.direction === 'down' ? clue.row + i : clue.row;
                const c = clue.direction === 'across' ? clue.col + i : clue.col;
                const key = `${r},${c}`;
                if (userAnswers.get(key)?.toUpperCase() !== clue.answer[i]) {
                    isWordCorrect = false;
                    allWordsCorrect = false;
                    break;
                }
            }
            if (isWordCorrect) {
                // Award 50 points per correctly filled word
                currentScore += 50;
            }
        });

        if (allWordsCorrect && currentClues.length > 0) {
            // 500 bonus points for finishing the whole grid
            currentScore += 500;
        }

        return currentScore;
    }, [userAnswers, currentClues]);

    useEffect(() => {
        if (gameComplete && !hasAwardedRef.current) {
            const exp = score * 2;
            const coins = score; // Assuming 1:1 for coins based on inline template

            if (exp > 0) addXp(exp);
            if (coins > 0) addCoins(coins);

            hasAwardedRef.current = true;
        } else if (!gameComplete) {
            hasAwardedRef.current = false;
        }
    }, [gameComplete, score, addXp, addCoins]);

    const progress = currentClues.length > 0 ? (score / maxScore) * 100 : 0;

    // Determine active clue based on active cell and direction
    const activeClue = useMemo(() => {
        if (!activeCell) return null;

        // Find clue that includes this cell in the current direction
        // This is tricky because a cell might be part of multiple words.
        // We stored 'clueNumber' in cell data but accurate mapping requires checking ranges.
        // Let's iterate clues to find the one encompassing the cell.

        const cell = grid.get(`${activeCell.row},${activeCell.col}`);
        if (!cell) return null;

        // Prioritize current direction
        let potentialClue = currentClues.find(c => {
            if (c.direction !== activeDirection) return false;
            // Check if cell is in this clue's range
            if (activeDirection === 'across') {
                return c.row === activeCell.row &&
                    activeCell.col >= c.col &&
                    activeCell.col < c.col + c.answer.length;
            } else {
                return c.col === activeCell.col &&
                    activeCell.row >= c.row &&
                    activeCell.row < c.row + c.answer.length;
            }
        });

        // If not found in active direction, try the other
        if (!potentialClue) {
            potentialClue = currentClues.find(c => {
                if (c.direction === activeDirection) return false;
                if (c.direction === 'across') { // Current is down, checking across
                    return c.row === activeCell.row &&
                        activeCell.col >= c.col &&
                        activeCell.col < c.col + c.answer.length;
                } else { // Current is across, checking down
                    return c.col === activeCell.col &&
                        activeCell.row >= c.row &&
                        activeCell.row < c.row + c.answer.length;
                }
            });
            // If we switched context implicitly, update direction
            if (potentialClue) {
                // We don't force state update here to avoid render loops, activeClue just reflects logic.
                // But for UI feedback we might want to know.
            }
        }

        return potentialClue || null;
    }, [activeCell, activeDirection, grid, currentClues]);

    // Center grid initially and on resize
    // Center grid initially and on resize/grid change
    useEffect(() => {
        const centerGrid = () => {
            const wrapper = gridWrapperRef.current;
            if (wrapper) {
                const scrollLeft = (wrapper.scrollWidth - wrapper.clientWidth) / 2;
                const scrollTop = (wrapper.scrollHeight - wrapper.clientHeight) / 2;
                wrapper.scrollTo(scrollLeft, scrollTop);
            }
        };

        // Small delay to ensure layout is ready
        const timer = setTimeout(centerGrid, 100);
        window.addEventListener('resize', centerGrid);

        // Also center immediately if possible
        centerGrid();

        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', centerGrid);
        };
    }, [grid]);

    const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 2.5));
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.4));

    // Auto-update direction if we selected a clue logically different
    useEffect(() => {
        if (activeClue && activeClue.direction !== activeDirection) {
            // Only switch if the current cell is strictly NOT part of the old direction
            // (Logic handled in selection click, this is just for consistency if needed)
        }
    }, [activeClue, activeDirection]);

    const handleCellClick = (row: number, col: number) => {
        if (activeCell?.row === row && activeCell?.col === col) {
            // Toggle direction if cell supports both
            const cell = grid.get(`${row},${col}`);
            if (cell?.isAcross && cell?.isDown) {
                setActiveDirection(prev => prev === 'across' ? 'down' : 'across');
            }
        } else {
            setActiveCell({ row, col });
            playSound('click');
        }
    };

    const handleClueClick = (clue: Clue) => {
        setActiveCell({ row: clue.row, col: clue.col });
        setActiveDirection(clue.direction as 'across' | 'down');
        playSound('click');
    };

    const handleInputChange = (row: number, col: number, char: string) => {
        if (char.length > 0) {
            const letter = char.slice(-1).toUpperCase(); // Take last char
            const newAnswers = new Map(userAnswers);
            newAnswers.set(`${row},${col}`, letter);
            setUserAnswers(newAnswers);
            playSound('click');

            // Move to next cell within the current word only
            const nextRow = activeDirection === 'down' ? row + 1 : row;
            const nextCol = activeDirection === 'across' ? col + 1 : col;

            // Find the current clue to enforce word boundaries
            const currentClue = currentClues.find(c => {
                if (c.direction !== activeDirection) return false;
                if (activeDirection === 'across') {
                    return c.row === row && col >= c.col && col < c.col + c.answer.length;
                } else {
                    return c.col === col && row >= c.row && row < c.row + c.answer.length;
                }
            });

            const isNextInWord = currentClue && (
                activeDirection === 'across'
                    ? nextCol < currentClue.col + currentClue.answer.length
                    : nextRow < currentClue.row + currentClue.answer.length
            );

            if (isNextInWord && grid.has(`${nextRow},${nextCol}`)) {
                setActiveCell({ row: nextRow, col: nextCol });
            }

            // Check completion
            checkCompletion(newAnswers);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent, row: number, col: number) => {
        if (e.key === 'Backspace') {
            const newAnswers = new Map(userAnswers);
            if (newAnswers.get(`${row},${col}`)) {
                newAnswers.delete(`${row},${col}`);
                setUserAnswers(newAnswers);
                playSound('click');
            } else {
                // Move back within the current word only
                const prevRow = activeDirection === 'down' ? row - 1 : row;
                const prevCol = activeDirection === 'across' ? col - 1 : col;

                const currentClue = currentClues.find(c => {
                    if (c.direction !== activeDirection) return false;
                    if (activeDirection === 'across') {
                        return c.row === row && col >= c.col && col < c.col + c.answer.length;
                    } else {
                        return c.col === col && row >= c.row && row < c.row + c.answer.length;
                    }
                });

                const isPrevInWord = currentClue && (
                    activeDirection === 'across'
                        ? prevCol >= currentClue.col
                        : prevRow >= currentClue.row
                );

                if (isPrevInWord && grid.has(`${prevRow},${prevCol}`)) {
                    setActiveCell({ row: prevRow, col: prevCol });
                }
            }
        } else if (e.key.startsWith('Arrow')) {
            e.preventDefault();
            let dr = 0;
            let dc = 0;
            let newDirection: 'across' | 'down' = activeDirection;

            switch (e.key) {
                case 'ArrowUp':
                    dr = -1;
                    newDirection = 'down';
                    break;
                case 'ArrowDown':
                    dr = 1;
                    newDirection = 'down';
                    break;
                case 'ArrowLeft':
                    dc = -1;
                    newDirection = 'across';
                    break;
                case 'ArrowRight':
                    dc = 1;
                    newDirection = 'across';
                    break;
            }

            // Skip over empty cells to find the next valid grid cell
            let nextRow = row + dr;
            let nextCol = col + dc;
            while (
                nextRow >= 0 && nextRow < GRID_SIZE &&
                nextCol >= 0 && nextCol < GRID_SIZE &&
                !grid.has(`${nextRow},${nextCol}`)
            ) {
                nextRow += dr;
                nextCol += dc;
            }

            if (
                nextRow >= 0 && nextRow < GRID_SIZE &&
                nextCol >= 0 && nextCol < GRID_SIZE &&
                grid.has(`${nextRow},${nextCol}`)
            ) {
                setActiveCell({ row: nextRow, col: nextCol });
                setActiveDirection(newDirection);
                playSound('click');
            }
        }
    };

    const checkCompletion = (answers: Map<string, string>) => {
        let allCorrect = true;
        let filledCount = 0;

        grid.forEach((cell, key) => {
            const ans = answers.get(key);
            if (ans) filledCount++;
            if (ans !== cell.letter) allCorrect = false;
        });

        if (allCorrect && filledCount === grid.size) {
            setTimeout(() => {
                setGameComplete(true);
                playSound('correct');
            }, 500);
        }
    };

    const handleCheck = () => {
        setShowValidation(true);
        setTimeout(() => setShowValidation(false), 2000); // Hide validation styles after 2s
    };

    const handleRestart = () => {
        setUserAnswers(new Map());
        setGameComplete(false);
        setActiveCell(null);
        hasAwardedRef.current = false;
    };

    if (gameComplete) {
        return (
            <GameComplete
                score={score}
                totalCards={currentClues.length}
                exp={score * 2}
                coins={score}
                requiredScore={maxScore}
                onRestart={handleRestart}
                nextLevelLabel="Play Again"
            />
        );
    }

    return (
        <div className="h-[100dvh] flex flex-col overflow-hidden bg-[#0f172a] font-sans relative px-2">
            <style>{`
                .always-visible-scrollbar::-webkit-scrollbar {
                    width: 6px;
                    height: 6px;
                    display: block;
                    -webkit-appearance: none;
                }
                .always-visible-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 10px;
                }
                .always-visible-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(251, 191, 36, 0.4);
                    border-radius: 10px;
                }
                .always-visible-scrollbar {
                    scrollbar-width: thin;
                    scrollbar-color: rgba(251, 191, 36, 0.4) rgba(255, 255, 255, 0.05);
                }
            `}</style>
            <AnimatedBackground />

            {/* Header */}
            {/* Header */}
            <HUD
                title="CORPORATE CLIMB"
                backPath="/home"
                currentExp={score}
                expToNextLevel={maxScore}
                progress={progress}
                coins={0}
                showBadge={true}
                onHowToPlay={() => setShowHowToPlay(true)}
                className="bg-black/20 backdrop-blur-md border-b border-white/5"
            >
                {/* Desktop and Tablet */}
                <div className="hidden md:flex items-center gap-1.5 lg:gap-3 shrink-0 relative z-20">
                    <div className="flex items-center gap-1 bg-white/5 p-0.5 lg:p-1 rounded-md lg:rounded-xl border border-white/10">
                        {(['beginner', 'intermediate', 'hard', 'extreme'] as const).map((level) => (
                            <button
                                key={level}
                                onClick={() => setDifficulty(level)}
                                className={`px-1.5 py-0.5 lg:px-3 lg:py-1.5 rounded-sm lg:rounded-lg text-[8px] lg:text-xs font-bold uppercase tracking-wider transition-all ${difficulty === level
                                    ? 'bg-blue-500 text-white shadow-lg'
                                    : 'text-white/50 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                {level === 'beginner' ? 'Easy' : level === 'intermediate' ? 'Med' : level === 'hard' ? 'Hard' : 'Extreme'}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleCheck}
                        className="px-3 py-1 lg:px-6 lg:py-2 rounded-md lg:rounded-xl font-bold text-[10px] lg:text-sm uppercase tracking-wider bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-green-500/20 hover:scale-105 transition-transform"
                    >
                        Check
                    </button>
                </div>
            </HUD>

            {/* Mobile only: Controls bar */}
            <div className="md:hidden w-full px-2 z-10 shrink-0 mt-0.5 flex justify-center">
                <div className="flex items-center justify-center gap-0.5 px-1 py-0.5 rounded-md bg-black/30 backdrop-blur-md border border-white/5 w-max mx-auto shadow-sm">
                    <div className="flex items-center gap-0.5 bg-white/5 p-0.5 rounded-md border border-white/10">
                        {(['beginner', 'intermediate', 'hard', 'extreme'] as const).map((level) => (
                            <button
                                key={level}
                                onClick={() => setDifficulty(level)}
                                className={`px-1 py-0.5 rounded-sm text-[6px] font-black uppercase tracking-tight transition-all ${difficulty === level
                                    ? 'bg-blue-500 text-white'
                                    : 'text-white/40'
                                    }`}
                                style={{ minWidth: '25px' }}
                            >
                                {level === 'beginner' ? 'Easy' : level === 'intermediate' ? 'Med' : level === 'hard' ? 'Hard' : 'Extr'}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={handleCheck}
                        className="px-1.5 py-0.5 rounded-sm font-black text-[6px] uppercase tracking-tight bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-sm hover:scale-105 transition-transform"
                        style={{ minWidth: '30px' }}
                    >
                        Check
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 flex flex-col lg:flex-row relative z-10 min-h-0 overflow-y-auto lg:overflow-hidden container mx-auto px-2 py-2 md:px-4 md:py-4 gap-4 md:gap-6 always-visible-scrollbar">

                {/* Grid Area */}
                {/* Grid Area */}
                <div className="w-full lg:flex-1 flex flex-col min-h-[450px] lg:min-h-0 bg-white/5 rounded-2xl border border-white/5 shadow-2xl relative">

                    {/* Scrollable Grid Container */}
                    <div ref={gridWrapperRef} className="flex-1 overflow-auto always-visible-scrollbar relative">
                        <div className="min-w-full min-h-full flex items-center justify-center p-32 md:p-64">
                            <div
                                className="transition-transform duration-200 ease-out pointer-events-auto"
                                style={{
                                    transform: `scale(${zoom})`,
                                    transformOrigin: 'center center',
                                }}
                            >
                                {/* Each difficulty has its own self-contained grid component */}
                                {difficulty === 'beginner' && (
                                    <EasyCrosswordGrid
                                        userAnswers={userAnswers}
                                        activeCell={activeCell}
                                        onCellClick={handleCellClick}
                                        onInputChange={handleInputChange}
                                        onKeyDown={handleKeyDown}
                                        validated={showValidation}
                                    />
                                )}
                                {difficulty === 'intermediate' && (
                                    <MediumCrosswordGrid
                                        userAnswers={userAnswers}
                                        activeCell={activeCell}
                                        onCellClick={handleCellClick}
                                        onInputChange={handleInputChange}
                                        onKeyDown={handleKeyDown}
                                        validated={showValidation}
                                    />
                                )}
                                {difficulty === 'hard' && (
                                    <HardCrosswordGrid
                                        userAnswers={userAnswers}
                                        activeCell={activeCell}
                                        onCellClick={handleCellClick}
                                        onInputChange={handleInputChange}
                                        onKeyDown={handleKeyDown}
                                        validated={showValidation}
                                    />
                                )}
                                {difficulty === 'extreme' && (
                                    <ExtremeCrosswordGrid
                                        userAnswers={userAnswers}
                                        activeCell={activeCell}
                                        onCellClick={handleCellClick}
                                        onInputChange={handleInputChange}
                                        onKeyDown={handleKeyDown}
                                        validated={showValidation}
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Zoom Controls (Bottom Right) */}
                    <div className="absolute bottom-2 md:bottom-4 right-2 md:right-4 z-20 flex gap-1.5 md:gap-2">
                        <button
                            onClick={handleZoomOut}
                            className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/50 hover:bg-black/70 text-white font-bold text-lg md:text-xl flex items-center justify-center transition-colors border border-white/20 hover:scale-105 active:scale-95 shadow-xl backdrop-blur-sm"
                            title="Zoom Out"
                        >
                            −
                        </button>
                        <button
                            onClick={handleZoomIn}
                            className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/50 hover:bg-black/70 text-white font-bold text-lg md:text-xl flex items-center justify-center transition-colors border border-white/20 hover:scale-105 active:scale-95 shadow-xl backdrop-blur-sm"
                            title="Zoom In"
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* Clues Sidebar */}
                <div className="w-full lg:w-[350px] shrink-0 flex flex-col bg-black/20 rounded-2xl border border-white/5 backdrop-blur-xl shadow-xl overflow-hidden min-h-[300px] lg:h-auto mb-4 lg:mb-0">
                    <div className="p-4 border-b border-white/10 bg-white/5">
                        <h2 className="text-white font-bold flex items-center gap-2">
                            <span>💡</span> Clues
                        </h2>
                    </div>
                    <div className="flex-1 min-h-0 p-4 overflow-hidden">
                        <ClueList
                            clues={currentClues}
                            activeClue={activeClue}
                            onClueClick={handleClueClick}
                        />
                    </div>
                </div>

            </main>

            <HowToPlayModal
                isOpen={showHowToPlay}
                onClose={() => setShowHowToPlay(false)}
            />
        </div>
    );
}
