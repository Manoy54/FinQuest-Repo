export type GridCell = {
    letter: string;
    row: number;
    col: number;
    isFound: boolean;
    isSelected: boolean;
};

export type TargetWord = {
    word: string;
    description: string;
    isFound: boolean;
    start: [number, number]; // [row, col]
    end: [number, number];   // [row, col]
    color?: string; // Optional color for highlighting found words
};

export type GameLevel = {
    id: string;
    label: string;
    grid: string[][];
    words: TargetWord[];
};

const beginnerGrid: string[][] = [
    ['Y', 'C', 'I', 'L', 'O', 'P', 'Y', 'R', 'A', 'T', 'E', 'N', 'O', 'M'],
    ['I', 'N', 'V', 'E', 'S', 'T', 'M', 'E', 'N', 'T', 'S', 'R', 'Q', 'A'],
    ['Z', 'E', 'B', 'E', 'T', 'R', 'C', 'A', 'S', 'H', 'F', 'L', 'O', 'W'],
    ['R', 'I', 'S', 'K', 'R', 'E', 'T', 'U', 'R', 'N', 'O', 'T', 'U', 'A'],
    ['I', 'O', 'C', 'R', 'C', 'E', 'C', 'O', 'N', 'O', 'M', 'I', 'C', 'S'],
    ['D', 'I', 'V', 'E', 'R', 'S', 'I', 'F', 'Y', 'N', 'I', 'O', 'E', 'A'],
    ['S', 'Q', 'U', 'Y', 'E', 'N', 'O', 'M', 'P', 'M', 'L', 'M', 'T', 'P'],
    ['T', 'Y', 'T', 'E', 'G', 'D', 'U', 'B', 'O', 'N', 'D', 'S', 'A', 'I'],
    ['E', 'I', 'L', 'A', 'C', 'S', 'I', 'F', 'I', 'C', 'S', 'F', 'R', 'T'],
    ['S', 'T', 'O', 'C', 'K', 'S', 'A', 'T', 'Y', 'W', 'D', 'O', 'E', 'X'],
];

const beginnerWords: TargetWord[] = [
    {
        word: 'MONETARY POLICY',
        description: 'Actions taken by a central bank to control money supply and interest rates to stabilize the economy.',
        isFound: false,
        start: [0, 13],
        end: [0, 0],
        color: '#FF6B6B',
    },
    {
        word: 'INVESTMENTS',
        description: 'Assets purchased with the goal of earning income or increasing value over time.',
        isFound: false,
        start: [1, 0],
        end: [1, 10],
        color: '#4ECDC4',
    },
    {
        word: 'CASH FLOW',
        description: 'The movement of cash coming in and going out of a business.',
        isFound: false,
        start: [2, 6],
        end: [2, 13],
        color: '#45B7D1',
    },
    {
        word: 'RISK RETURN',
        description: 'The principle that higher risk usually means higher potential return.',
        isFound: false,
        start: [3, 0],
        end: [3, 9],
        color: '#96CEB4',
    },
    {
        word: 'ECONOMICS',
        description: 'The study of how people and governments allocate scarce resources.',
        isFound: false,
        start: [4, 5],
        end: [4, 13],
        color: '#FFEEAD',
    },
    {
        word: 'DIVERSIFY',
        description: 'Spreading investments to reduce risk instead of putting all money in one asset.',
        isFound: false,
        start: [5, 0],
        end: [5, 8],
        color: '#D4A5A5',
    },
    {
        word: 'BONDS',
        description: 'Debt securities where investors lend money and earn interest in return.',
        isFound: false,
        start: [7, 7],
        end: [7, 11],
        color: '#9B59B6',
    },
    {
        word: 'STOCKS',
        description: 'Ownership shares in a company, giving investors claims on income and assets.',
        isFound: false,
        start: [9, 0],
        end: [9, 5],
        color: '#3498DB',
    },
];

const intermediateGrid: string[][] = [
    ['S', 'E', 'R', 'I', 'A', 'L', 'B', 'O', 'N', 'D', 'S', 'T', 'G', 'B', 'D', 'U'],
    ['S', 'Q', 'F', 'F', 'K', 'N', 'A', 'D', 'S', 'E', 'Z', 'M', 'A', 'L', 'X', 'G'],
    ['D', 'A', 'E', 'L', 'A', 'T', 'I', 'P', 'A', 'C', 'F', 'O', 'T', 'S', 'O', 'C'],
    ['N', 'S', 'D', 'N', 'O', 'B', 'T', 'H', 'G', 'I', 'A', 'R', 'T', 'S', 'D', 'F'],
    ['O', 'E', 'U', 'H', 'N', 'N', 'H', 'J', 'O', 'U', 'H', 'T', 'O', 'J', 'W', 'N'],
    ['B', 'K', 'L', 'Y', 'O', 'F', 'J', 'G', 'Z', 'H', 'R', 'Q', 'X', 'Y', 'Q', 'L'],
    ['O', 'F', 'E', 'A', 'B', 'M', 'P', 'T', 'O', 'C', 'G', 'Y', 'A', 'J', 'C', 'W'],
    ['R', 'Z', 'D', 'L', 'E', 'I', 'Y', 'T', 'N', 'E', 'R', 'R', 'U', 'C', 'N', 'M'],
    ['U', 'E', 'G', 'A', 'R', 'E', 'V', 'E', 'L', 'G', 'O', 'M', 'Q', 'V', 'Z', 'U'],
    ['E', 'F', 'U', 'Z', 'B', 'O', 'O', 'K', 'V', 'A', 'L', 'U', 'E', 'I', 'A', 'C'],
    ['Z', 'Y', 'J', 'E', 'U', 'L', 'A', 'V', 'T', 'E', 'K', 'R', 'A', 'M', 'D', 'V'],
    ['E', 'E', 'G', 'O', 'I', 'T', 'A', 'R', 'K', 'C', 'I', 'U', 'Q', 'V', 'F', 'G']
];

const intermediateWords: TargetWord[] = [
    {
        "word": "COST OF CAPITAL",
        "description": "Represents the weighted average cost of permanent financing raised by a corporation.",
        "isFound": false,
        "start": [2, 15],
        "end": [2, 3],
        "color": "#E67E22"
    },
    {
        "word": "STRAIGHT BONDS",
        "description": "Bonds that have a one-time maturity.",
        "isFound": false,
        "start": [3, 13],
        "end": [3, 1],
        "color": "#9B59B6"
    },
    {
        "word": "CURRENT YIELD",
        "description": "Ratio of the annual interest payment to the bonds current market price.",
        "isFound": false,
        "start": [7, 13],
        "end": [7, 2],
        "color": "#45B7D1"
    },
    {
        "word": "MARKET VALUE",
        "description": "Observed value for the asset in the market place; intrinsic or economic value",
        "isFound": false,
        "start": [10, 13],
        "end": [10, 3],
        "color": "#4ECDC4"
    },
    {
        "word": "SERIAL BONDS",
        "description": "Bonds with serial payment provisions and are paid off in installments.",
        "isFound": false,
        "start": [0, 0],
        "end": [0, 10],
        "color": "#D4A5A5"
    },
    {
        "word": "QUICK RATIO",
        "description": "Indicates whether current liabilities could be paid without having to sell the inventory.",
        "isFound": false,
        "start": [11, 12],
        "end": [11, 3],
        "color": "#3498DB"
    },
    {
        "word": "BOOK VALUE",
        "description": "Value of an asset as shown in the balance sheet.",
        "isFound": false,
        "start": [9, 4],
        "end": [9, 12],
        "color": "#FF6B6B"
    },
    {
        "word": "EUROBONDS",
        "description": "Denominated in the issuer’s currency but sold outside of the issuer’s country.",
        "isFound": false,
        "start": [9, 0],
        "end": [1, 0],
        "color": "#FFEEAD"
    },
    {
        "word": "LEVERAGE",
        "description": "Magnification of earnings that results from having fixed costs in the company.",
        "isFound": false,
        "start": [8, 8],
        "end": [8, 1],
        "color": "#96CEB4"
    }
];

const expertGrid: string[][] = [
    ['K', 'A', 'Y', 'Q', 'F', 'O', 'H', 'W', 'H', 'N', 'F', 'D', 'F', 'N', 'D', 'D'],
    ['M', 'Q', 'Y', 'T', 'I', 'L', 'I', 'B', 'I', 'T', 'R', 'E', 'V', 'N', 'O', 'C'],
    ['Q', 'L', 'Z', 'Z', 'U', 'J', 'E', 'R', 'Z', 'P', 'L', 'A', 'D', 'S', 'V', 'W'],
    ['L', 'C', 'O', 'U', 'P', 'O', 'N', 'I', 'N', 'T', 'E', 'R', 'E', 'S', 'T', 'E'],
    ['P', 'A', 'W', 'V', 'T', 'P', 'W', 'C', 'G', 'F', 'R', 'U', 'H', 'D', 'W', 'G'],
    ['D', 'B', 'O', 'B', 'K', 'M', 'S', 'L', 'D', 'U', 'B', 'R', 'O', 'K', 'I', 'D'],
    ['D', 'R', 'S', 'K', 'H', 'U', 'L', 'E', 'R', 'U', 'T', 'N', 'E', 'D', 'N', 'I'],
    ['P', 'K', 'W', 'E', 'C', 'A', 'S', 'M', 'D', 'G', 'M', 'E', 'C', 'E', 'W', 'M'],
    ['M', 'V', 'P', 'L', 'Y', 'H', 'D', 'X', 'S', 'H', 'J', 'E', 'G', 'T', 'S', 'U'],
    ['L', 'E', 'W', 'E', 'X', 'T', 'O', 'Z', 'L', 'W', 'J', 'B', 'E', 'G', 'L', 'L'],
    ['M', 'P', 'A', 'C', 'G', 'Z', 'B', 'U', 'A', 'G', 'G', 'I', 'A', 'O', 'T', 'C'],
    ['T', 'I', 'D', 'E', 'R', 'C', 'E', 'D', 'A', 'R', 'T', 'T', 'R', 'Z', 'J', 'T']
];

const expertWords: TargetWord[] = [
    {
        "word": "COUPON INTEREST",
        "description": "Percentage of the par value of the bond that will be paid out annually in the form of interest",
        "isFound": false,
        "start": [3, 1],
        "end": [3, 14],
        "color": "#FFEEAD"
    },
    {
        "word": "CONVERTIBILITY",
        "description": "A characteristic of Preferred Stock which allows its holder to convert it into common stock.",
        "isFound": false,
        "start": [1, 15],
        "end": [1, 2],
        "color": "#FF6B6B"
    },
    {
        "word": "TRADE CREDIT",
        "description": "Form of short-term financing common to businesses. It is spontaneous credit from regular purchase of goods.",
        "isFound": false,
        "start": [11, 10],
        "end": [11, 0],
        "color": "#D4A5A5"
    },
    {
        "word": "INDENTURE",
        "description": "A legal and binding contract specifying all the important features of a bond, such as its maturity date, timing of interest payments, method of interest calculation, and callable or convertible features.",
        "isFound": false,
        "start": [6, 15],
        "end": [6, 7],
        "color": "#3498DB"
    },
    {
        "word": "EBIT",
        "description": "Shortened term for Earning Before Interest and Taxes; which talks about how much profit a company makes from its day-to-day operations, without factoring in interest payments on debt or income taxes.",
        "isFound": false,
        "start": [8, 11],
        "end": [11, 11],
        "color": "#4ECDC4"
    },
    {
        "word": "CAPM",
        "description": "Shortened term for Capital Asset Pricing Model; it compares to the shareholders return of the market",
        "isFound": false,
        "start": [10, 3],
        "end": [10, 0],
        "color": "#96CEB4"
    },
    {
        "word": "EAR",
        "description": "Shortened term for Effective Annual Rate; rate which would produce the same ending if annual compounding had been used.",
        "isFound": false,
        "start": [9, 12],
        "end": [11, 12],
        "color": "#45B7D1"
    },
    {
        "word": "DGM",
        "description": "Shortened term for Dividend Growth Model. It is the price of the anticipated level of dividend payments",
        "isFound": false,
        "start": [7, 8],
        "end": [7, 10],
        "color": "#9B59B6"
    }
];

export const levels: GameLevel[] = [
    {
        id: 'beginner',
        label: 'BEGINNER',
        grid: beginnerGrid,
        words: beginnerWords
    },
    {
        id: 'intermediate',
        label: 'INTERMEDIATE',
        grid: intermediateGrid,
        words: intermediateWords
    },
    {
        id: 'expert',
        label: 'EXPERT',
        grid: expertGrid,
        words: expertWords
    }
];

export const initialGridValues = beginnerGrid;
export const initialTargetWords = beginnerWords;
