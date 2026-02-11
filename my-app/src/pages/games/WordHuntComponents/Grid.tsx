import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { GridCell, TargetWord } from './data';

interface GridProps {
    grid: GridCell[][];
    onWordSelection: (start: { r: number; c: number }, end: { r: number; c: number }) => void;
    foundColors: Map<string, string>; // Maps "r,c" to color string
    words: TargetWord[];
}

export const Grid: React.FC<GridProps> = ({ grid, onWordSelection, foundColors, words }) => {
    const [selectionStart, setSelectionStart] = useState<{ r: number; c: number } | null>(null);
    const [selectionEnd, setSelectionEnd] = useState<{ r: number; c: number } | null>(null);
    const [isSelecting, setIsSelecting] = useState(false);

    // Helper to check valid line (horizontal, vertical, diagonal)
    const isValidLine = (start: { r: number; c: number }, end: { r: number; c: number }) => {
        const dr = end.r - start.r;
        const dc = end.c - start.c;
        return dr === 0 || dc === 0 || Math.abs(dr) === Math.abs(dc);
    };

    const getSelectedCells = useCallback(() => {
        if (!selectionStart || !selectionEnd) return new Set<string>();

        // Only highlight if valid line
        if (!isValidLine(selectionStart, selectionEnd)) return new Set<string>();

        const cells = new Set<string>();
        const dr = Math.sign(selectionEnd.r - selectionStart.r);
        const dc = Math.sign(selectionEnd.c - selectionStart.c);

        let r = selectionStart.r;
        let c = selectionStart.c;

        // Safety break to prevent infinite loops
        let steps = 0;
        const maxSteps = Math.max(Math.abs(selectionEnd.r - selectionStart.r), Math.abs(selectionEnd.c - selectionStart.c)) + 1;

        while (steps < maxSteps) {
            cells.add(`${r},${c}`);
            if (r === selectionEnd.r && c === selectionEnd.c) break;
            r += dr;
            c += dc;
            steps++;
        }

        return cells;
    }, [selectionStart, selectionEnd]);

    const selectedCellsSet = getSelectedCells();

    const handleStart = (r: number, c: number) => {
        setSelectionStart({ r, c });
        setSelectionEnd({ r, c });
        setIsSelecting(true);
    };

    const handleMove = (r: number, c: number) => {
        if (isSelecting) {
            setSelectionEnd({ r, c });
        }
    };

    const handleEnd = () => {
        if (isSelecting && selectionStart && selectionEnd) {
            if (isValidLine(selectionStart, selectionEnd)) {
                onWordSelection(selectionStart, selectionEnd);
            }
            setIsSelecting(false);
            setSelectionStart(null);
            setSelectionEnd(null);
        }
    };

    // Calculate current selected word for preview
    const getCurrentWord = () => {
        if (!selectionStart || !selectionEnd || !isValidLine(selectionStart, selectionEnd)) return '';
        // If single cell, return that letter
        if (selectionStart.r === selectionEnd.r && selectionStart.c === selectionEnd.c) {
            return grid[selectionStart.r][selectionStart.c].letter;
        }

        const dr = Math.sign(selectionEnd.r - selectionStart.r);
        const dc = Math.sign(selectionEnd.c - selectionStart.c);
        let r = selectionStart.r;
        let c = selectionStart.c;
        let word = '';
        const maxSteps = Math.max(Math.abs(selectionEnd.r - selectionStart.r), Math.abs(selectionEnd.c - selectionStart.c)) + 1;

        for (let i = 0; i < maxSteps; i++) {
            if (grid[r] && grid[r][c]) {
                word += grid[r][c].letter;
            }
            r += dr;
            c += dc;
        }
        return word;
    };

    const currentWord = isSelecting ? getCurrentWord() : '';

    // Line calculation
    const [lineCoords, setLineCoords] = useState<{ x1: number, y1: number, x2: number, y2: number, strokeWidth: number } | null>(null);
    const [foundLines, setFoundLines] = useState<{ x1: number, y1: number, x2: number, y2: number, color: string, strokeWidth: number }[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    // Calculate found words lines
    useEffect(() => {
        if (!containerRef.current) return;

        const lines: { x1: number, y1: number, x2: number, y2: number, color: string, strokeWidth: number }[] = [];

        words.filter(w => w.isFound).forEach(word => {
            const startEl = containerRef.current?.querySelector(`[data-row="${word.start[0]}"][data-col="${word.start[1]}"]`) as HTMLElement;
            const endEl = containerRef.current?.querySelector(`[data-row="${word.end[0]}"][data-col="${word.end[1]}"]`) as HTMLElement;

            if (startEl && endEl) {
                lines.push({
                    x1: startEl.offsetLeft + startEl.offsetWidth / 2,
                    y1: startEl.offsetTop + startEl.offsetHeight / 2,
                    x2: endEl.offsetLeft + endEl.offsetWidth / 2,
                    y2: endEl.offsetTop + endEl.offsetHeight / 2,
                    color: word.color || '#4ECDC4',
                    strokeWidth: startEl.offsetWidth * 0.8
                });
            }
        });
        setFoundLines(lines);

    }, [words, grid]); // Re-run when words change

    useEffect(() => {
        if (isSelecting && selectionStart && selectionEnd && containerRef.current) {
            const startEl = containerRef.current.querySelector(`[data-row="${selectionStart.r}"][data-col="${selectionStart.c}"]`) as HTMLElement;
            const endEl = containerRef.current.querySelector(`[data-row="${selectionEnd.r}"][data-col="${selectionEnd.c}"]`) as HTMLElement;

            if (startEl && endEl) {
                const x1 = startEl.offsetLeft + startEl.offsetWidth / 2;
                const y1 = startEl.offsetTop + startEl.offsetHeight / 2;
                const x2 = endEl.offsetLeft + endEl.offsetWidth / 2;
                const y2 = endEl.offsetTop + endEl.offsetHeight / 2;

                // Use 80% of cell width as stroke width
                const strokeWidth = startEl.offsetWidth * 0.8;

                setLineCoords({ x1, y1, x2, y2, strokeWidth });
            }
        } else {
            setLineCoords(null);
        }
    }, [isSelecting, selectionStart, selectionEnd]);

    // Unified Pointer Events
    const handlePointerDown = (e: React.PointerEvent, r: number, c: number) => {
        e.preventDefault();
        (e.target as HTMLElement).releasePointerCapture(e.pointerId); // Identify element under pointer
        handleStart(r, c);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        e.preventDefault();
        // Use elementFromPoint to find target under pointer as it moves
        const target = document.elementFromPoint(e.clientX, e.clientY);
        if (target && target.hasAttribute('data-row')) {
            const r = parseInt(target.getAttribute('data-row')!);
            const c = parseInt(target.getAttribute('data-col')!);
            handleMove(r, c);
        }
    };

    const handlePointerUp = (e: React.PointerEvent) => {
        e.preventDefault();
        handleEnd();
    };

    // Global pointer up handler
    useEffect(() => {
        const handleGlobalPointerUp = () => {
            if (isSelecting) handleEnd();
        };
        window.addEventListener('pointerup', handleGlobalPointerUp);
        window.addEventListener('pointercancel', handleGlobalPointerUp);
        return () => {
            window.removeEventListener('pointerup', handleGlobalPointerUp);
            window.removeEventListener('pointercancel', handleGlobalPointerUp);
        };
    }, [isSelecting, selectionStart, selectionEnd]);

    return (
        <div
            className="select-none touch-none p-4 pt-20 rounded-[2rem] relative group flex flex-col items-center justify-center gap-2"
            style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)'
            }}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onContextMenu={(e) => e.preventDefault()}
        >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-blue-500/5 rounded-[2rem] blur-xl -z-10 group-hover:bg-blue-500/10 transition-colors duration-500" />

            {/* Preview Pill - only rendered when selecting */}
            {currentWord && (
                <div className="absolute top-6 z-50 h-10 min-w-[160px] rounded-full flex items-center justify-center px-6 shadow-xl border-2 border-white/20 animate-in fade-in zoom-in duration-200"
                    style={{
                        background: 'linear-gradient(135deg, #ffd700 0%, #ff6b35 100%)'
                    }}
                >
                    <span className="text-lg font-black text-white tracking-widest uppercase filter drop-shadow-md">
                        {currentWord}
                    </span>
                </div>
            )}

            <div
                ref={containerRef}
                className="grid gap-1 relative z-10"
                style={{
                    gridTemplateColumns: `repeat(${grid[0].length}, minmax(0, 1fr))`
                }}
            >
                {/* SVG Overlay for Drag Line */}
                <svg className="absolute inset-0 pointer-events-none z-0 overflow-visible w-full h-full">
                    {/* Found Words Lines */}
                    {foundLines.map((line, i) => (
                        <line
                            key={i}
                            x1={line.x1}
                            y1={line.y1}
                            x2={line.x2}
                            y2={line.y2}
                            stroke={line.color}
                            strokeOpacity="0.6"
                            strokeWidth={line.strokeWidth}
                            strokeLinecap="round"
                        />
                    ))}

                    {/* Current Selection Line */}
                    {lineCoords && (
                        <line
                            x1={lineCoords.x1}
                            y1={lineCoords.y1}
                            x2={lineCoords.x2}
                            y2={lineCoords.y2}
                            stroke="#fbbf24" // amber-400
                            strokeWidth={lineCoords.strokeWidth}
                            strokeLinecap="round"
                            className="opacity-90 drop-shadow-[0_0_10px_rgba(251,191,36,0.6)]"
                        />
                    )}
                </svg>

                {grid.map((row, r) =>
                    row.map((cell, c) => {
                        const cellId = `${r},${c}`;
                        const isSelected = selectedCellsSet.has(cellId);
                        const foundColor = foundColors.get(cellId);

                        return (
                            <div
                                key={`${r}-${c}`}
                                data-row={r}
                                data-col={c}
                                onPointerDown={(e) => handlePointerDown(e, r, c)}
                                className={`
                                    w-8 h-8 flex items-center justify-center
                                    text-lg font-black rounded-md
                                    transition-all duration-200 cursor-pointer
                                    select-none relative z-20
                                    ${!foundColor && !isSelected ? 'bg-white/90 text-gray-800 hover:bg-white' : ''} 
                                    ${foundColor ? 'text-white z-30' : ''}
                                    ${isSelected ? 'text-white z-30' : ''}
                                    ${!foundColor && !isSelected ? 'shadow-[0_1px_0_0_rgba(0,0,0,0.1)]' : ''}
                                    ${foundColor || isSelected ? 'bg-transparent shadow-none' : ''}
                                `}
                            >
                                <span className="relative z-10 drop-shadow-sm pointer-events-none" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                                    {cell.letter}
                                </span>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};
