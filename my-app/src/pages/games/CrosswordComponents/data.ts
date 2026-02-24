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

export const GRID_SIZE = 27;

// Clues with EXACT coordinates matching reference image
const beginnerClues: Clue[] = [
    // DOWN CLUES
    { number: 1, direction: 'down', text: 'Total money brought in by sales before expenses.', answer: 'REVENUE', row: 6, col: 9 },
    { number: 2, direction: 'down', text: 'The financial gain made when revenue exceeds expenses.', answer: 'PROFIT', row: 6, col: 13 },
    { number: 3, direction: 'down', text: "A company's financial debt or obligations.", answer: 'LIABILITY', row: 9, col: 15 },
    { number: 5, direction: 'down', text: "Assets minus liabilities; the owner's remaining stake.", answer: 'EQUITY', row: 11, col: 12 },
    { number: 7, direction: 'down', text: 'An entry recording an amount owed, listed on the left side of a ledger.', answer: 'DEBIT', row: 11, col: 17 },
    { number: 8, direction: 'down', text: 'The ability of a customer to obtain goods before payment.', answer: 'CREDIT', row: 14, col: 9 },

    // ACROSS CLUES
    { number: 4, direction: 'across', text: 'A plan for spending and saving income.', answer: 'BUDGET', row: 11, col: 8 },
    { number: 6, direction: 'across', text: "An official inspection of an individual's or organization's accounts.", answer: 'AUDIT', row: 11, col: 15 },
    { number: 8, direction: 'across', text: 'Wealth in the form of money or assets used to start a business.', answer: 'CAPITAL', row: 14, col: 9 },
    { number: 9, direction: 'across', text: 'Anything of value owned by a person or company.', answer: 'ASSET', row: 16, col: 6 },
];

const intermediateClues: Clue[] = [
    // ACROSS
    { number: 1, direction: 'across', text: "The difference between the seller's cost and the selling price.", answer: 'MARGIN', row: 5, col: 17 },
    { number: 3, direction: 'across', text: 'A sum of money paid regularly by a company to its shareholders.', answer: 'DIVIDEND', row: 6, col: 7 },
    { number: 5, direction: 'across', text: 'To gradually write off the initial cost of an asset over time.', answer: 'AMORTIZE', row: 9, col: 13 },
    { number: 7, direction: 'across', text: 'A range of investments held by a person or organization.', answer: 'PORTFOLIO', row: 12, col: 4 },
    { number: 8, direction: 'across', text: 'How much the quantity demanded changes when price changes.', answer: 'ELASTICITY', row: 15, col: 6 },
    { number: 9, direction: 'across', text: 'A market state where a small number of firms dominate.', answer: 'OLIGOPOLY', row: 17, col: 9 },
    { number: 11, direction: 'across', text: 'The total satisfaction received from consuming a good or service.', answer: 'UTILITY', row: 19, col: 5 },

    // DOWN
    { number: 2, direction: 'down', text: 'A fixed sum of money paid to someone each year, typically for life.', answer: 'ANNUITY', row: 5, col: 18 },
    { number: 3, direction: 'down', text: 'Failure to fulfill an obligation, especially to repay a loan.', answer: 'DEFAULT', row: 6, col: 7 },
    { number: 4, direction: 'down', text: 'The ability of a company to meet its long-term fixed expenses.', answer: 'SOLVENCY', row: 8, col: 15 },
    { number: 6, direction: 'down', text: 'How quickly an asset can be converted into cash without losing value.', answer: 'LIQUIDITY', row: 11, col: 11 },
    { number: 10, direction: 'down', text: 'An amount of something left over when requirements have been met.', answer: 'SURPLUS', row: 18, col: 5 },
];

const hardClues: Clue[] = [
    // ─────────────────────────────────────────────────────────────────────────────
    //  VERIFIED LAYOUT (100% IMAGE MATCH)
    // ─────────────────────────────────────────────────────────────────────────────

    // DOWN CLUES
    { number: 1, direction: 'down', text: 'Payments made by the government to individuals without any exchange of goods/services.', answer: 'TRANSFERS', row: 3, col: 3 },
    { number: 2, direction: 'down', text: 'A party that owes money to another entity.', answer: 'DEBTOR', row: 4, col: 6 },
    { number: 4, direction: 'down', text: 'The rate at which money exchanges hands within an economy.', answer: 'VELOCITY', row: 4, col: 18 },
    { number: 5, direction: 'down', text: 'An identity that breaks down ROE into profit margin, asset turnover, and leverage.', answer: 'DUPOINT', row: 6, col: 1 },
    { number: 6, direction: 'down', text: 'Current assets minus current liabilities; measures short-term operating liquidity.', answer: 'WORKINGCAPITAL', row: 6, col: 10 },
    { number: 7, direction: 'down', text: 'A ratio that excludes inventory from current assets to measure immediate liquidity.', answer: 'QUICK', row: 6, col: 14 },
    { number: 9, direction: 'down', text: 'Competition involving many firms selling products that are similar but not identical.', answer: 'MONOPOLISTIC', row: 8, col: 16 },
    { number: 11, direction: 'down', text: 'Two goods for which an increase in the price of one leads to a decrease in demand for the other.', answer: 'COMPLEMENTS', row: 12, col: 8 },

    // ACROSS CLUES
    { number: 3, direction: 'across', text: 'The specific percentage of deposits a bank must keep on hand or at the Central Bank.', answer: 'RESERVE', row: 4, col: 13 },
    { number: 8, direction: 'across', text: 'The effect where consumers react to a price rise by consuming less of that good and more of a rival.', answer: 'SUBSTITUTION', row: 7, col: 0 },
    { number: 10, direction: 'across', text: 'A financial transaction where a business sells its accounts receivable to a third party.', answer: 'FACTORING', row: 9, col: 12 },
    { number: 13, direction: 'across', text: 'The likelihood that an account receivable will actually be converted into cash.', answer: 'COLLECTIBILITY', row: 17, col: 4 },
    { number: 14, direction: 'across', text: 'A legal or ethical relationship of trust between a manager and a shareholder.', answer: 'FIDUCIARY', row: 19, col: 12 },
    { number: 15, direction: 'across', text: 'An annuity that has no end date (a constant stream of identical cash flows).', answer: 'PERPETUITY', row: 21, col: 3 },
];

export const clues = {
    beginner: beginnerClues,
    intermediate: intermediateClues,
    hard: hardClues
};

export const generateGrid = (difficulty: 'beginner' | 'intermediate' | 'hard' = 'beginner'): Map<string, CellData> => {
    const grid = new Map<string, CellData>();
    const selectedClues = clues[difficulty];

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
    selectedClues.forEach(placeWord);

    return grid;
};

