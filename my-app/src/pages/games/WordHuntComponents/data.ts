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

const beginner2Grid: string[][] = [
    ['C', 'O', 'N', 'S', 'U', 'M', 'E', 'R', 'S', 'X', 'Y', 'Z'],
    ['O', 'P', 'P', 'O', 'R', 'T', 'U', 'N', 'I', 'T', 'Y', 'A'],
    ['L', 'L', 'A', 'B', 'O', 'R', 'F', 'O', 'R', 'C', 'E', 'B'],
    ['L', 'E', 'N', 'D', 'I', 'N', 'G', 'R', 'A', 'T', 'E', 'C'],
    ['A', 'V', 'A', 'I', 'L', 'A', 'B', 'L', 'E', 'B', 'C', 'D'],
    ['T', 'E', 'C', 'H', 'N', 'O', 'L', 'O', 'G', 'Y', 'D', 'E'],
    ['E', 'L', 'A', 'S', 'T', 'I', 'C', 'I', 'T', 'Y', 'E', 'F'],
    ['R', 'I', 'S', 'K', 'F', 'R', 'E', 'E', 'R', 'A', 'T', 'E'],
    ['A', 'S', 'S', 'E', 'T', 'S', 'V', 'A', 'L', 'U', 'E', 'G'],
    ['L', 'I', 'Q', 'U', 'I', 'D', 'I', 'T', 'Y', 'F', 'G', 'H']
];

const beginner2Words: TargetWord[] = [
    {
        word: 'CONSUMERS',
        description: 'People who buy goods',
        isFound: false,
        start: [0, 0],
        end: [0, 8],
        color: '#FF6B6B'
    },
    {
        word: 'OPPORTUNITY',
        description: 'Cost of the next best alternative',
        isFound: false,
        start: [1, 0],
        end: [1, 10],
        color: '#4ECDC4'
    },
    {
        word: 'LABOR',
        description: 'Human effort in production',
        isFound: false,
        start: [2, 1],
        end: [2, 5],
        color: '#45B7D1'
    },
    {
        word: 'LENDING',
        description: 'Providing money to borrowers',
        isFound: false,
        start: [3, 0],
        end: [3, 6],
        color: '#96CEB4'
    },
    {
        word: 'AVAILABLE',
        description: 'Resources ready for use',
        isFound: false,
        start: [4, 0],
        end: [4, 8],
        color: '#FFEEAD'
    },
    {
        word: 'TECHNOLOGY',
        description: 'Knowledge used in production',
        isFound: false,
        start: [5, 0],
        end: [5, 9],
        color: '#D4A5A5'
    },
    {
        word: 'ELASTICITY',
        description: 'Responsiveness to price changes',
        isFound: false,
        start: [6, 0],
        end: [6, 9],
        color: '#9B59B6'
    },
    {
        word: 'RISKFREE',
        description: 'Rate of return with zero risk',
        isFound: false,
        start: [7, 0],
        end: [7, 7],
        color: '#3498DB'
    },
    {
        word: 'ASSETS',
        description: 'Items of value owned',
        isFound: false,
        start: [8, 0],
        end: [8, 5],
        color: '#E67E22'
    },
    {
        word: 'LIQUIDITY',
        description: 'Ease of converting to cash',
        isFound: false,
        start: [9, 0],
        end: [9, 8],
        color: '#1ABC9C'
    },
];

const intermediate2Grid: string[][] = [
    ['M', 'A', 'R', 'G', 'I', 'N', 'A', 'L', 'C', 'O', 'S', 'T'],
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'],
    ['C', 'R', 'E', 'D', 'I', 'T', 'S', 'C', 'O', 'R', 'E', 'M'],
    ['R', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X'],
    ['O', 'K', 'V', 'A', 'R', 'I', 'A', 'B', 'L', 'E', 'Y', 'Z'],
    ['E', 'R', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
    ['C', 'U', 'N', 'L', 'I', 'M', 'I', 'T', 'E', 'D', 'K', 'L'],
    ['O', 'P', 'T', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U'],
    ['N', 'T', 'S', 'A', 'V', 'W', 'X', 'Y', 'Z', 'A', 'B', 'C'],
    ['O', 'C', 'R', 'E', 'D', 'I', 'T', 'O', 'R', 'S', 'D', 'E'],
    ['M', 'Y', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'],
    ['I', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    ['C', 'S', 'H', 'O', 'R', 'T', 'R', 'U', 'N', 'A', 'B', 'C'],
    ['S', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N']
];

const intermediate2Words: TargetWord[] = [
    {
        word: 'MARGINAL',
        description: 'Cost of producing one more unit',
        isFound: false,
        start: [0, 0],
        end: [0, 7],
        color: '#FF6B6B'
    },
    {
        word: 'CREDIT SCORE',
        description: 'Trust to pay later; used in "Credit Score"',
        isFound: false,
        start: [2, 0],
        end: [2, 10],
        color: '#4ECDC4'
    },
    {
        word: 'VARIABLE',
        description: 'Costs that change with output',
        isFound: false,
        start: [4, 2],
        end: [4, 9],
        color: '#45B7D1'
    },
    {
        word: 'UNLIMITED',
        description: 'Nature of human wants',
        isFound: false,
        start: [6, 1],
        end: [6, 9],
        color: '#96CEB4'
    },
    {
        word: 'CREDITORS',
        description: 'Those to whom money is owed',
        isFound: false,
        start: [9, 1],
        end: [9, 9],
        color: '#D4A5A5'
    },
    {
        word: 'MACROECONOMICS',
        description: 'Study of the economy as a whole',
        isFound: false,
        start: [0, 0],
        end: [13, 0],
        color: '#9B59B6'
    },
    {
        word: 'SHORTRUN',
        description: 'Period where at least one input is fixed',
        isFound: false,
        start: [12, 1],
        end: [12, 8],
        color: '#3498DB'
    },
];

const expert2Grid: string[][] = [
    ['Y', 'T', 'I', 'C', 'I', 'T', 'S', 'A', 'L', 'E', 'X', 'Y'],
    ['R', 'E', 'D', 'L', 'O', 'H', 'E', 'R', 'A', 'H', 'S', 'Z'],
    ['O', 'B', 'L', 'I', 'G', 'A', 'T', 'I', 'O', 'N', 'A', 'B'],
    ['T', 'N', 'E', 'I', 'C', 'I', 'F', 'F', 'E', 'C', 'D', 'E'],
    ['N', 'O', 'I', 'T', 'A', 'U', 'L', 'A', 'V', 'F', 'G', 'H'],
    ['E', 'X', 'P', 'E', 'C', 'T', 'A', 'T', 'I', 'O', 'N', 'S'],
    ['V', 'S', 'O', 'I', 'L', 'O', 'F', 'T', 'R', 'O', 'P', 'I'],
    ['N', 'O', 'I', 'T', 'C', 'U', 'D', 'O', 'R', 'P', 'J', 'K'],
    ['I', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V'],
    ['M', 'A', 'T', 'C', 'H', 'I', 'N', 'G', 'W', 'X', 'Y', 'Z']
];

const expert2Words: TargetWord[] = [
    {
        word: 'ELASTICITY',
        description: 'Responsiveness of demand/supply to price',
        isFound: false,
        start: [0, 9],
        end: [0, 0],
        color: '#FF6B6B'
    },
    {
        word: 'SHAREHOLDER',
        description: 'Owner of company stock',
        isFound: false,
        start: [1, 10],
        end: [1, 0],
        color: '#4ECDC4'
    },
    {
        word: 'OBLIGATION',
        description: 'Duty to pay',
        isFound: false,
        start: [2, 0],
        end: [2, 9],
        color: '#45B7D1'
    },
    {
        word: 'EFFICIENT',
        description: 'Productive use of resources',
        isFound: false,
        start: [3, 8],
        end: [3, 0],
        color: '#96CEB4'
    },
    {
        word: 'VALUATION',
        description: 'Determining asset worth',
        isFound: false,
        start: [4, 8],
        end: [4, 0],
        color: '#FFEEAD'
    },
    {
        word: 'EXPECTATIONS',
        description: 'Beliefs about future economic conditions',
        isFound: false,
        start: [5, 0],
        end: [5, 11],
        color: '#D4A5A5'
    },
    {
        word: 'PORTFOLIOS',
        description: 'Collections of investments',
        isFound: false,
        start: [6, 10],
        end: [6, 1],
        color: '#9B59B6'
    },
    {
        word: 'PRODUCTION',
        description: 'Creating goods',
        isFound: false,
        start: [7, 9],
        end: [7, 0],
        color: '#3498DB'
    },
    {
        word: 'INVENTORY',
        description: 'Goods held for sale',
        isFound: false,
        start: [8, 0],
        end: [0, 0],
        color: '#E67E22'
    },
    {
        word: 'MATCHING',
        description: 'Principle of aligning asset/liability maturities',
        isFound: false,
        start: [9, 0],
        end: [9, 7],
        color: '#1ABC9C'
    },
];

const beginner3Grid: string[][] = [
    ['D', 'E', 'M', 'A', 'N', 'D', 'X', 'Y', 'Z', 'A'],
    ['I', 'N', 'P', 'U', 'T', 'S', 'B', 'C', 'D', 'E'],
    ['F', 'G', 'H', 'I', 'J', 'K', 'L', 'O', 'A', 'N'],
    ['Y', 'I', 'E', 'L', 'D', 'M', 'N', 'O', 'P', 'Q'],
    ['T', 'R', 'U', 'S', 'T', 'R', 'S', 'T', 'U', 'V'],
    ['A', 'B', 'C', 'D', 'E', 'I', 'F', 'G', 'H', 'I'],
    ['J', 'K', 'L', 'M', 'N', 'S', 'O', 'P', 'Q', 'R'],
    ['S', 'T', 'U', 'V', 'W', 'K', 'X', 'Y', 'Z', 'A'],
    ['B', 'U', 'Y', 'E', 'R', 'S', 'B', 'C', 'D', 'E'],
    ['F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O']
];

const beginner3Words: TargetWord[] = [
    {
        word: 'DEMAND',
        description: 'Consumer willingness to buy',
        isFound: false,
        start: [0, 0],
        end: [0, 5],
        color: '#FF6B6B'
    },
    {
        word: 'INPUTS',
        description: 'Resources used in production',
        isFound: false,
        start: [1, 0],
        end: [1, 5],
        color: '#4ECDC4'
    },
    {
        word: 'LOAN',
        description: 'Money borrowed that must be paid back',
        isFound: false,
        start: [2, 6],
        end: [2, 9],
        color: '#45B7D1'
    },
    {
        word: 'YIELD',
        description: 'Earnings generated and realized on an investment',
        isFound: false,
        start: [3, 0],
        end: [3, 4],
        color: '#96CEB4'
    },
    {
        word: 'TRUST',
        description: 'The foundation of credit',
        isFound: false,
        start: [4, 0],
        end: [4, 4],
        color: '#FFEEAD'
    },
    {
        word: 'RISK',
        description: 'Uncertainty regarding financial loss',
        isFound: false,
        start: [4, 5],
        end: [7, 5],
        color: '#D4A5A5'
    },
    {
        word: 'BUYERS',
        description: 'Those who purchase goods or services',
        isFound: false,
        start: [8, 0],
        end: [8, 5],
        color: '#9B59B6'
    },
];

const intermediate3Grid: string[][] = [
    ['S', 'H', 'O', 'R', 'T', 'A', 'G', 'E', 'A', 'B', 'C', 'D'],
    ['E', 'Q', 'U', 'I', 'T', 'Y', 'E', 'F', 'G', 'H', 'I', 'J'],
    ['K', 'L', 'M', 'P', 'A', 'Y', 'M', 'E', 'N', 'T', 'N', 'O'],
    ['P', 'Q', 'R', 'S', 'T', 'L', 'E', 'N', 'D', 'E', 'R', 'U'],
    ['V', 'W', 'X', 'Y', 'U', 'Z', 'A', 'B', 'C', 'D', 'E', 'F'],
    ['G', 'H', 'I', 'R', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q'],
    ['R', 'S', 'P', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'A', 'B'],
    ['C', 'L', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'],
    ['O', 'N', 'E', 'F', 'U', 'T', 'U', 'R', 'E', 'N', 'O', 'P'],
    ['Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'A', 'B'],
    ['C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'],
    ['O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
];

const intermediate3Words: TargetWord[] = [
    {
        word: 'SHORTAGE',
        description: 'When demand exceeds supply',
        isFound: false,
        start: [0, 0],
        end: [0, 7],
        color: '#FF6B6B'
    },
    {
        word: 'EQUITY',
        description: 'Ownership interest in a company',
        isFound: false,
        start: [1, 0],
        end: [1, 5],
        color: '#45B7D1'
    },
    {
        word: 'PAYMENT',
        description: 'The fulfillment of a financial obligation',
        isFound: false,
        start: [2, 3],
        end: [2, 9],
        color: '#96CEB4'
    },
    {
        word: 'LENDER',
        description: 'An entity that provides loans',
        isFound: false,
        start: [3, 5],
        end: [3, 10],
        color: '#FFEEAD'
    },
    {
        word: 'FUTURE',
        description: 'Time horizon for investment returns',
        isFound: false,
        start: [8, 3],
        end: [8, 8],
        color: '#D4A5A5'
    },
];

const expert3Grid: string[][] = [
    ['Y', 'C', 'N', 'E', 'I', 'C', 'I', 'F', 'F', 'E', 'N', 'I', 'X'],
    ['T', 'N', 'E', 'M', 'E', 'G', 'A', 'N', 'A', 'M', 'X', 'O', 'Y'],
    ['I', 'L', 'I', 'B', 'A', 'I', 'L', 'A', 'I', 'C', 'O', 'S', 'Z'],
    ['C', 'R', 'A', 'C', 'S', 'E', 'C', 'R', 'U', 'O', 'S', 'E', 'R'],
    ['R', 'A', 'T', 'I', 'O', 'N', 'A', 'L', 'I', 'T', 'Y', 'P', 'A'],
    ['A', 'C', 'Q', 'U', 'I', 'S', 'I', 'T', 'I', 'O', 'N', 'Q', 'B'],
    ['C', 'O', 'M', 'P', 'E', 'T', 'I', 'T', 'I', 'O', 'N', 'R', 'C'],
    ['S', 'U', 'B', 'S', 'T', 'I', 'T', 'U', 'T', 'E', 'S', 'X', 'D'],
    ['E', 'C', 'N', 'A', 'N', 'I', 'F', 'L', 'A', 'C', 'S', 'I', 'F'],
    ['T', 'N', 'E', 'M', 'T', 'S', 'E', 'V', 'N', 'I', 'T', 'U', 'E']
];

const expert3Words: TargetWord[] = [
    {
        word: 'INEFFICIENCY',
        description: 'Waste of resources',
        isFound: false,
        start: [0, 11],
        end: [0, 0],
        color: '#FF6B6B'
    },
    {
        word: 'MANAGEMENT',
        description: 'Process of controlling things',
        isFound: false,
        start: [1, 9],
        end: [1, 0],
        color: '#4ECDC4'
    },
    {
        word: 'SOCIAL',
        description: 'Relating to society',
        isFound: false,
        start: [2, 11],
        end: [2, 6],
        color: '#45B7D1'
    },
    {
        word: 'RESOURCES',
        description: 'Inputs for production',
        isFound: false,
        start: [3, 12],
        end: [3, 4],
        color: '#96CEB4'
    },
    {
        word: 'RATIONALITY',
        description: 'Decision making based on logic',
        isFound: false,
        start: [4, 0],
        end: [4, 10],
        color: '#FFEEAD'
    },
    {
        word: 'ACQUISITION',
        description: 'Obtaining an asset',
        isFound: false,
        start: [5, 0],
        end: [5, 10],
        color: '#D4A5A5'
    },
    {
        word: 'COMPETITION',
        description: 'Rivalry among sellers',
        isFound: false,
        start: [6, 0],
        end: [6, 10],
        color: '#9B59B6'
    },
    {
        word: 'FISCAL',
        description: 'Relating to government revenue',
        isFound: false,
        start: [8, 12],
        end: [8, 7],
        color: '#E67E22'
    },
    {
        word: 'INVESTMENT',
        description: 'Asset purchased for income',
        isFound: false,
        start: [9, 9],
        end: [9, 0],
        color: '#1ABC9C'
    },
    {
        word: 'SCARCITY',
        description: 'Limited resources',
        isFound: false,
        start: [7, 0],
        end: [0, 0],
        color: '#FF6B6B'
    },
    {
        word: 'SUBSTITUTES',
        description: 'Goods used in place of another',
        isFound: false,
        start: [7, 0],
        end: [7, 10],
        color: '#E67E22'
    },
];

export const levels: GameLevel[] = [
    {
        id: 'beginner',
        label: 'BEGINNER',
        grid: beginnerGrid,
        words: beginnerWords
    },
    {
        id: 'beginner2',
        label: 'BEGINNER',
        grid: beginner2Grid,
        words: beginner2Words
    },
    {
        id: 'beginner3',
        label: 'BEGINNER',
        grid: beginner3Grid,
        words: beginner3Words
    },
    {
        id: 'intermediate',
        label: 'INTERMEDIATE',
        grid: intermediateGrid,
        words: intermediateWords
    },
    {
        id: 'intermediate2',
        label: 'INTERMEDIATE',
        grid: intermediate2Grid,
        words: intermediate2Words
    },
    {
        id: 'intermediate3',
        label: 'INTERMEDIATE',
        grid: intermediate3Grid,
        words: intermediate3Words
    },
    {
        id: 'expert',
        label: 'EXPERT',
        grid: expertGrid,
        words: expertWords
    },
    {
        id: 'expert2',
        label: 'EXPERT',
        grid: expert2Grid,
        words: expert2Words
    },
    {
        id: 'expert3',
        label: 'EXPERT',
        grid: expert3Grid,
        words: expert3Words
    }
];

export const initialGridValues = beginnerGrid;
export const initialTargetWords = beginnerWords;
