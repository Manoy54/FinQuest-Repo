import { useRef, useEffect } from 'react';
import { type CellData, GRID_SIZE } from './data';

interface CrosswordGridProps {
    grid: Map<string, CellData>;
    userAnswers: Map<string, string>;
    activeCell: { row: number, col: number } | null;
    onCellClick: (row: number, col: number) => void;
    onInputChange: (row: number, col: number, char: string) => void;
    onKeyDown: (e: React.KeyboardEvent, row: number, col: number) => void;
    validated: boolean;
}

export function CrosswordGrid({
    grid,
    userAnswers,
    activeCell,
    onCellClick,
    onInputChange,
    onKeyDown,
    validated
}: CrosswordGridProps) {
    const inputRefs = useRef<Map<string, HTMLInputElement>>(new Map());

    useEffect(() => {
        if (activeCell) {
            const key = `${activeCell.row},${activeCell.col}`;
            inputRefs.current.get(key)?.focus();
        }
    }, [activeCell]);

    // Generate grid markup
    const renderGrid = () => {
        const cells = [];
        for (let r = 0; r < GRID_SIZE; r++) {
            for (let c = 0; c < GRID_SIZE; c++) {
                const key = `${r},${c}`;
                const cellData = grid.get(key);
                const isActive = activeCell?.row === r && activeCell?.col === c;

                if (!cellData) {
                    cells.push(
                        <div key={key} className="w-full h-full aspect-square bg-transparent" />
                    );
                    continue;
                }

                const userAnswer = userAnswers.get(key) || '';
                const isCorrect = validated && userAnswer.toUpperCase() === cellData.letter;
                const isWrong = validated && userAnswer && !isCorrect;

                cells.push(
                    <div key={key} className="relative w-full h-full aspect-square">
                        {cellData.clueNumber && (
                            <span className="absolute top-1 left-1.5 text-[0.6rem] md:text-[0.75rem] font-bold text-gray-400 select-none z-10 leading-none pointer-events-none">
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
                            onClick={(e) => {
                                e.stopPropagation();
                                onCellClick(r, c);
                            }}
                            onChange={(e) => onInputChange(r, c, e.target.value)}
                            onKeyDown={(e) => onKeyDown(e, r, c)}
                            className={`
                                w-full h-full text-center text-xl md:text-3xl font-black uppercase
                                rounded-sm outline-none
                                transition-all duration-200
                                shadow-[0_1px_0_0_rgba(0,0,0,0.1)]
                                border-none ring-0
                                ${isActive
                                    ? 'bg-blue-500 text-white shadow-lg scale-105 z-20 ring-2 ring-blue-500/20'
                                    : 'bg-white/90 text-gray-800 hover:bg-white hover:scale-105 hover:z-10'
                                }
                                ${isCorrect ? '!bg-green-500 !text-white !shadow-green-500/40' : ''}
                                ${isWrong ? '!bg-red-500 !text-white !shadow-red-500/40' : ''}
                                cursor-pointer caret-transparent
                            `}
                            style={{
                                textShadow: isActive || isCorrect || isWrong ? '0 1px 2px rgba(0,0,0,0.2)' : 'none'
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
                gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
                width: '100%',
                height: '100%',
                aspectRatio: '1/1',
                maxHeight: '100%',
                maxWidth: '100%'
            }}
        >
            {renderGrid()}
        </div>
    );
}
