export interface CellData {
    row: number;
    col: number;
    letter: string;
    clueNumber?: number;
    isAcross?: boolean;
    isDown?: boolean;
    wordAcross?: string;
    wordDown?: string;
}

export interface Clue {
    number: number;
    direction: 'across' | 'down';
    text: string;
    answer: string;
    row: number;
    col: number;
}

export const GRID_SIZE = 16;

// Clues with EXACT coordinates matching reference image
export const clues: Clue[] = [
    // DOWN CLUES
    { number: 1, direction: 'down', text: 'Total money brought in by sales before expenses.', answer: 'REVENUE', row: 0, col: 4 },
    { number: 2, direction: 'down', text: 'The financial gain made when revenue exceeds expenses.', answer: 'PROFIT', row: 0, col: 8 },
    { number: 3, direction: 'down', text: "A company's financial debt or obligations.", answer: 'LIABILITY', row: 3, col: 11 },
    { number: 5, direction: 'down', text: "Assets minus liabilities; the owner's remaining stake.", answer: 'EQUITY', row: 5, col: 7 },
    { number: 7, direction: 'down', text: 'An entry recording an amount owed, listed on the left side of a ledger.', answer: 'DEBIT', row: 5, col: 13 },
    { number: 8, direction: 'down', text: 'The ability of a customer to obtain goods before payment.', answer: 'CREDIT', row: 9, col: 4 },

    // ACROSS CLUES
    { number: 4, direction: 'across', text: 'A plan for spending and saving income.', answer: 'BUDGET', row: 5, col: 3 },
    { number: 6, direction: 'across', text: "An official inspection of an individual's or organization's accounts.", answer: 'AUDIT', row: 5, col: 11 },
    { number: 8, direction: 'across', text: 'Wealth in the form of money or assets used to start a business.', answer: 'CAPITAL', row: 9, col: 4 },
    { number: 9, direction: 'across', text: 'Anything of value owned by a person or company.', answer: 'ASSET', row: 11, col: 1 },
];

export const generateGrid = (): Map<string, CellData> => {
    const grid = new Map<string, CellData>();

    const placeWord = (clue: Clue) => {
        for (let i = 0; i < clue.answer.length; i++) {
            const r = clue.direction === 'down' ? clue.row + i : clue.row;
            const c = clue.direction === 'across' ? clue.col + i : clue.col;
            const key = `${r},${c}`;

            const existing = grid.get(key);

            grid.set(key, {
                row: r,
                col: c,
                letter: clue.answer[i],
                clueNumber: (i === 0 && !existing?.clueNumber) ? clue.number : existing?.clueNumber,
                isAcross: existing?.isAcross || clue.direction === 'across',
                isDown: existing?.isDown || clue.direction === 'down',
                wordAcross: clue.direction === 'across' ? clue.answer : existing?.wordAcross,
                wordDown: clue.direction === 'down' ? clue.answer : existing?.wordDown,
            });
        }
    };

    // Place all words
    clues.forEach(placeWord);

    return grid;
};
