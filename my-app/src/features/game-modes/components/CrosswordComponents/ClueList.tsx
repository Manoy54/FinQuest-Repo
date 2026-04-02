import { type Clue } from './data';

interface ClueListProps {
    clues: Clue[];
    activeClue: Clue | null;
    onClueClick: (clue: Clue) => void;
}

export function ClueList({ clues, activeClue, onClueClick }: ClueListProps) {
    const handleClueClick = (clue: Clue) => {
        onClueClick(clue);
    };

    const renderSection = (title: string, direction: 'across' | 'down') => (
        <div className="mb-6">
            <h3 className="text-amber-400 text-lg font-bold mb-3 uppercase tracking-wider border-b border-white/10 pb-2">
                {title}
            </h3>
            <ul className="space-y-3">
                {clues.filter(c => c.direction === direction).map(clue => {
                    const isActive = activeClue?.number === clue.number && activeClue?.direction === clue.direction;
                    return (
                        <li
                            key={`${clue.direction}-${clue.number}`}
                            onClick={() => handleClueClick(clue)}
                            className={`
                                cursor-pointer text-sm p-3 rounded-lg transition-colors border border-transparent
                                ${isActive ? 'bg-amber-500/20 border-amber-500 text-white' : 'hover:bg-white/5 text-gray-400 hover:text-gray-200'}
                            `}
                        >
                            <span className="font-bold mr-2 text-amber-500">{clue.number}.</span>
                            {clue.text}
                        </li>
                    );
                })}
            </ul>
        </div>
    );

    return (
        <div className="flex flex-col h-full overflow-y-auto pr-2 custom-scrollbar">
            {renderSection('Across', 'across')}
            {renderSection('Down', 'down')}
        </div>
    );
}

// Add custom scrollbar styles globally in index.css if needed, or inline here
// For simplicity, we'll rely on default scrollbar for now or standard tailwind utilities.
