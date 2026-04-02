import { useRef, useEffect, useMemo } from 'react';
import { type CellData } from '../data';

export interface GridInteractionProps {
    userAnswers: Map<string, string>;
    activeCell: { row: number, col: number } | null;
    onCellClick: (row: number, col: number) => void;
    onInputChange: (row: number, col: number, char: string) => void;
    onKeyDown: (e: React.KeyboardEvent, row: number, col: number) => void;
    validated: boolean;
}

export function BaseGrid({
    grid,
    userAnswers,
    activeCell,
    onCellClick,
    onInputChange,
    onKeyDown,
    validated,
}: { grid: Map<string, CellData> } & GridInteractionProps) {

    const inputRefs = useRef<Map<string, HTMLInputElement>>(new Map());

    useEffect(() => {
        if (activeCell) {
            const key = `${activeCell.row},${activeCell.col}`;
            inputRefs.current.get(key)?.focus();
        }
    }, [activeCell]);

    // Compute actual grid extents from the populated cells so the CSS grid is
    // always the exact right size (handles beginner 25×25, easy/med, hard 25×27, etc.)
    const { numRows, numCols, minRow, minCol } = useMemo(() => {
        if (grid.size === 0) return { numRows: 15, numCols: 15, minRow: 0, minCol: 0 };
        const rows: number[] = [];
        const cols: number[] = [];
        grid.forEach(cell => { rows.push(cell.row); cols.push(cell.col); });
        const minR = Math.min(...rows);
        const maxR = Math.max(...rows);
        const minC = Math.min(...cols);
        const maxC = Math.max(...cols);
        return { numRows: maxR - minR + 1, numCols: maxC - minC + 1, minRow: minR, minCol: minC };
    }, [grid]);

    const renderCells = () => {
        const cells = [];
        for (let r = 0; r < numRows; r++) {
            for (let c = 0; c < numCols; c++) {
                const actualRow = minRow + r;
                const actualCol = minCol + c;
                const key = `${actualRow},${actualCol}`;
                const cellData = grid.get(key);
                const isActive = activeCell?.row === actualRow && activeCell?.col === actualCol;

                // Black / empty cell
                if (!cellData) {
                    cells.push(<div key={key} className="w-full h-full aspect-square bg-transparent" />);
                    continue;
                }

                const userAnswer = userAnswers.get(key) || '';
                const isCorrect = validated && userAnswer.toUpperCase() === cellData.letter;
                const isWrong = validated && userAnswer !== '' && !isCorrect;

                cells.push(
                    <div key={key} className="relative w-full h-full aspect-square">
                        {/* Clue number label */}
                        {cellData.clueNumber && (
                            <span className="absolute top-0.5 left-1 text-[0.5rem] md:text-[0.65rem] font-bold text-gray-500 select-none z-10 leading-none pointer-events-none">
                                {cellData.clueNumber}
                            </span>
                        )}
                        <input
                            ref={el => {
                                if (el) inputRefs.current.set(key, el);
                                else inputRefs.current.delete(key);
                            }}
                            type="text"
                            maxLength={1}
                            value={userAnswer}
                            onClick={e => { e.stopPropagation(); onCellClick(actualRow, actualCol); }}
                            onChange={e => onInputChange(actualRow, actualCol, e.target.value)}
                            onKeyDown={e => onKeyDown(e, actualRow, actualCol)}
                            className={`
                                w-full h-full text-center text-base md:text-2xl font-black uppercase
                                rounded-sm outline-none transition-all duration-200
                                shadow-[0_1px_0_0_rgba(0,0,0,0.1)] border-none ring-0
                                ${isActive
                                    ? 'bg-blue-500 text-white shadow-lg scale-105 z-20 ring-2 ring-blue-500/20'
                                    : 'bg-white/90 text-gray-800 hover:bg-white hover:scale-105 hover:z-10'}
                                ${isCorrect ? '!bg-green-500 !text-white !shadow-green-500/40' : ''}
                                ${isWrong ? '!bg-red-500   !text-white !shadow-red-500/40' : ''}
                                cursor-pointer caret-transparent
                            `}
                            style={{
                                textShadow: isActive || isCorrect || isWrong
                                    ? '0 1px 2px rgba(0,0,0,0.2)' : 'none',
                            }}
                        />
                    </div>
                );
            }
        }
        return cells;
    };

    return (
        <div
            className="grid gap-0.5 p-4 bg-transparent rounded-none"
            style={{
                gridTemplateColumns: `repeat(${numCols}, minmax(0, 1fr))`,
                gridTemplateRows: `repeat(${numRows}, minmax(0, 1fr))`,
                width: '100%',
                height: '100%',
                aspectRatio: `${numCols} / ${numRows}`,
                maxHeight: '100%',
                maxWidth: '100%',
            }}
        >
            {renderCells()}
        </div>
    );
}
