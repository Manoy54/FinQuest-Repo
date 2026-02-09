import type { TargetWord } from './data';

// beginner2
export const beginner2Grid: string[][] = [["S", "C", "A", "R", "C", "I", "T", "Y", "A", "B", "C", "D", "E", "F", "G"], ["U", "H", "I", "J", "K", "L", "M", "N", "S", "O", "P", "Q", "R", "S", "T"], ["P", "A", "B", "C", "D", "E", "F", "G", "S", "H", "I", "J", "K", "L", "M"], ["P", "L", "E", "V", "E", "R", "A", "G", "E", "N", "O", "P", "Q", "R", "S"], ["L", "T", "U", "V", "W", "X", "Y", "Z", "T", "A", "B", "C", "D", "E", "F"], ["Y", "G", "H", "I", "J", "K", "L", "M", "S", "N", "O", "P", "Q", "R", "S"], ["A", "B", "C", "R", "E", "D", "I", "T", "O", "R", "D", "E", "F", "G", "H"], ["P", "O", "R", "T", "F", "O", "L", "I", "O", "I", "J", "K", "L", "M", "N"], ["O", "P", "Q", "R", "S", "T", "U", "V", "W", "N", "Y", "Z", "A", "B", "C"], ["D", "E", "F", "G", "H", "I", "J", "K", "L", "F", "N", "O", "P", "Q", "R"], ["S", "T", "U", "V", "W", "X", "Y", "Z", "A", "L", "B", "C", "D", "E", "F"], ["L", "I", "Q", "U", "I", "D", "I", "T", "Y", "A", "G", "H", "I", "J", "K"], ["M", "N", "O", "P", "Q", "R", "S", "T", "U", "T", "W", "X", "Y", "Z", "A"], ["B", "C", "D", "E", "F", "G", "H", "I", "J", "I", "L", "M", "N", "O", "P"], ["Q", "R", "S", "T", "U", "V", "W", "X", "Y", "O", "A", "B", "C", "D", "E"], ["", "", "", "", "", "", "", "", "", "N", "", "", "", "", ""]];
export const beginner2Words: TargetWord[] = [
    {
        "word": "SCARCITY",
        "description": "Basic economic problem of limited resources",
        "isFound": false,
        "start": [
            0,
            0
        ],
        "end": [
            0,
            7
        ],
        "color": "#FF6B6B"
    },
    {
        "word": "LEVERAGE",
        "description": "Using borrowed capital to increase potential return",
        "isFound": false,
        "start": [
            3,
            1
        ],
        "end": [
            3,
            8
        ],
        "color": "#4ECDC4"
    },
    {
        "word": "INFLATION",
        "description": "The rate at which prices rise over time",
        "isFound": false,
        "start": [
            7,
            9
        ],
        "end": [
            15,
            9
        ],
        "color": "#45B7D1"
    },
    {
        "word": "PORTFOLIO",
        "description": "A collection of financial investments like stocks and bonds",
        "isFound": false,
        "start": [
            7,
            0
        ],
        "end": [
            7,
            8
        ],
        "color": "#96CEB4"
    },
    {
        "word": "CREDITOR",
        "description": "An entity that lends money or extends credit",
        "isFound": false,
        "start": [
            6,
            2
        ],
        "end": [
            6,
            9
        ],
        "color": "#FFEEAD"
    },
    {
        "word": "LIQUIDITY",
        "description": "How easily an asset can be converted into cash",
        "isFound": false,
        "start": [
            11,
            0
        ],
        "end": [
            11,
            8
        ],
        "color": "#D4A5A5"
    },
    {
        "word": "SUPPLY",
        "description": "Quantity of a good sellers are willing to sell",
        "isFound": false,
        "start": [
            0,
            0
        ],
        "end": [
            5,
            0
        ],
        "color": "#9B59B6"
    },
    {
        "word": "ASSETS",
        "description": "Resources owned by a business or individual",
        "isFound": false,
        "start": [
            0,
            8
        ],
        "end": [
            5,
            8
        ],
        "color": "#3498DB"
    }
];

// intermediate2
export const intermediate2Grid: string[][] = [["L", "I", "Q", "U", "I", "D", "I", "T", "Y", "X", "W", "V", "U", "T", "S", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["E", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "C", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["V", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "A", "A", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["E", "R", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "R", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["R", "T", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "C", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["A", "F", "D", "S", "U", "P", "P", "L", "Y", "O", "P", "Q", "R", "S", "I", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["G", "O", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "T", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["E", "L", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "Y", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["G", "I", "O", "I", "N", "F", "L", "A", "T", "I", "O", "N", "R", "S", "T", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["H", "O", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["C", "R", "E", "D", "I", "T", "O", "R", "A", "B", "C", "D", "E", "F", "G", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["L", "M", "N", "O", "P", "A", "S", "S", "E", "T", "S", "W", "X", "Y", "Z", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "A", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]];
export const intermediate2Words: TargetWord[] = [
    {
        "word": "SCARCITY",
        "description": "Basic economic problem of limited resources",
        "isFound": false,
        "start": [
            0,
            14
        ],
        "end": [
            7,
            14
        ],
        "color": "#FF6B6B"
    },
    {
        "word": "LEVERAGE",
        "description": "Using borrowed capital to increase potential return",
        "isFound": false,
        "start": [
            0,
            0
        ],
        "end": [
            7,
            0
        ],
        "color": "#4ECDC4"
    },
    {
        "word": "INFLATION",
        "description": "The rate at which prices rise over time",
        "isFound": false,
        "start": [
            8,
            3
        ],
        "end": [
            8,
            11
        ],
        "color": "#45B7D1"
    },
    {
        "word": "PORTFOLIO",
        "description": "A collection of financial investments like stocks and bonds",
        "isFound": false,
        "start": [
            0,
            0
        ],
        "end": [
            0,
            0
        ],
        "color": "#96CEB4"
    },
    {
        "word": "CREDITOR",
        "description": "An entity that lends money or extends credit",
        "isFound": false,
        "start": [
            11,
            0
        ],
        "end": [
            11,
            7
        ],
        "color": "#FFEEAD"
    },
    {
        "word": "LIQUIDITY",
        "description": "How easily an asset can be converted into cash",
        "isFound": false,
        "start": [
            0,
            0
        ],
        "end": [
            0,
            8
        ],
        "color": "#D4A5A5"
    },
    {
        "word": "SUPPLY",
        "description": "Quantity of a good sellers are willing to sell",
        "isFound": false,
        "start": [
            5,
            3
        ],
        "end": [
            5,
            8
        ],
        "color": "#9B59B6"
    },
    {
        "word": "ASSETS",
        "description": "Resources owned by a business or individual",
        "isFound": false,
        "start": [
            13,
            5
        ],
        "end": [
            13,
            10
        ],
        "color": "#3498DB"
    }
];

// expert2
export const expert2Grid: string[][] = [["Y", "L", "P", "P", "U", "S", "R", "O", "T", "I", "D", "E", "R", "C", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["T", "I", "D", "I", "U", "Q", "I", "L", "A", "S", "S", "E", "T", "S", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["I", "X", "W", "V", "U", "T", "S", "R", "Q", "P", "O", "N", "M", "L", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["C", "N", "O", "I", "T", "A", "L", "F", "N", "I", "K", "J", "I", "H", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["R", "G", "F", "E", "D", "C", "B", "A", "Z", "Y", "X", "W", "V", "U", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["A", "E", "G", "A", "R", "E", "V", "E", "L", "T", "S", "R", "Q", "P", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["C", "O", "I", "L", "O", "F", "T", "R", "O", "P", "O", "N", "M", "L", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["S", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A", "Z", "Y", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A", "Z", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["Z", "Y", "X", "W", "V", "U", "T", "S", "R", "Q", "P", "O", "N", "M", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]];
export const expert2Words: TargetWord[] = [
    {
        "word": "SCARCITY",
        "description": "Basic economic problem of limited resources",
        "isFound": false,
        "start": [
            7,
            0
        ],
        "end": [
            0,
            0
        ],
        "color": "#FF6B6B"
    },
    {
        "word": "LEVERAGE",
        "description": "Using borrowed capital to increase potential return",
        "isFound": false,
        "start": [
            5,
            8
        ],
        "end": [
            5,
            1
        ],
        "color": "#4ECDC4"
    },
    {
        "word": "INFLATION",
        "description": "The rate at which prices rise over time",
        "isFound": false,
        "start": [
            3,
            9
        ],
        "end": [
            3,
            1
        ],
        "color": "#45B7D1"
    },
    {
        "word": "PORTFOLIO",
        "description": "A collection of financial investments like stocks and bonds",
        "isFound": false,
        "start": [
            6,
            9
        ],
        "end": [
            6,
            1
        ],
        "color": "#96CEB4"
    },
    {
        "word": "CREDITOR",
        "description": "An entity that lends money or extends credit",
        "isFound": false,
        "start": [
            0,
            13
        ],
        "end": [
            0,
            6
        ],
        "color": "#FFEEAD"
    },
    {
        "word": "LIQUIDITY",
        "description": "How easily an asset can be converted into cash",
        "isFound": false,
        "start": [
            0,
            0
        ],
        "end": [
            0,
            0
        ],
        "color": "#D4A5A5"
    },
    {
        "word": "SUPPLY",
        "description": "Quantity of a good sellers are willing to sell",
        "isFound": false,
        "start": [
            0,
            5
        ],
        "end": [
            0,
            0
        ],
        "color": "#9B59B6"
    },
    {
        "word": "ASSETS",
        "description": "Resources owned by a business or individual",
        "isFound": false,
        "start": [
            1,
            8
        ],
        "end": [
            1,
            13
        ],
        "color": "#3498DB"
    }
];

// beginner3
export const beginner3Grid: string[][] = [["O", "P", "P", "O", "R", "T", "U", "N", "I", "T", "Y", "C", "O", "S", "T", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "R", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["L", "I", "A", "B", "I", "L", "I", "T", "Y", "O", "P", "Q", "R", "S", "A", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "D", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["B", "U", "D", "G", "E", "T", "A", "B", "C", "D", "E", "F", "G", "H", "E", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["X", "Y", "Z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "O", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["D", "I", "V", "I", "D", "E", "N", "D", "L", "M", "N", "O", "P", "Q", "F", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["S", "T", "U", "V", "W", "X", "Y", "Z", "A", "B", "C", "D", "E", "F", "F", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["R", "E", "V", "E", "N", "U", "E", "G", "H", "I", "J", "K", "L", "M", "N", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "A", "B", "C", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["P", "R", "O", "F", "I", "T", "D", "E", "F", "G", "H", "I", "J", "K", "L", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "A", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["I", "N", "T", "E", "R", "E", "S", "T", "B", "C", "D", "E", "F", "G", "H", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["X", "Y", "Z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]];
export const beginner3Words: TargetWord[] = [
    {
        "word": "OPPORTUNITY COST",
        "description": "Value of the next best alternative given up",
        "isFound": false,
        "start": [
            0,
            0
        ],
        "end": [
            0,
            14
        ],
        "color": "#FF6B6B"
    },
    {
        "word": "TRADE OFF",
        "description": "Sacrificing one quality or aspect for another",
        "isFound": false,
        "start": [
            0,
            14
        ],
        "end": [
            7,
            14
        ],
        "color": "#4ECDC4"
    },
    {
        "word": "LIABILITY",
        "description": "Financial debts or obligations",
        "isFound": false,
        "start": [
            2,
            0
        ],
        "end": [
            2,
            8
        ],
        "color": "#45B7D1"
    },
    {
        "word": "DIVIDEND",
        "description": "Distribution of profits to shareholders",
        "isFound": false,
        "start": [
            6,
            0
        ],
        "end": [
            6,
            7
        ],
        "color": "#96CEB4"
    },
    {
        "word": "INTEREST",
        "description": "Cost of borrowing money or income from lending",
        "isFound": false,
        "start": [
            12,
            0
        ],
        "end": [
            12,
            7
        ],
        "color": "#FFEEAD"
    },
    {
        "word": "REVENUE",
        "description": "Income generated from normal business operations",
        "isFound": false,
        "start": [
            8,
            0
        ],
        "end": [
            8,
            6
        ],
        "color": "#D4A5A5"
    },
    {
        "word": "PROFIT",
        "description": "Financial gain when revenue exceeds costs",
        "isFound": false,
        "start": [
            10,
            0
        ],
        "end": [
            10,
            5
        ],
        "color": "#9B59B6"
    },
    {
        "word": "BUDGET",
        "description": "An estimate of income and expenditure",
        "isFound": false,
        "start": [
            4,
            0
        ],
        "end": [
            4,
            5
        ],
        "color": "#3498DB"
    }
];

// intermediate3
export const intermediate3Grid: string[][] = [["P", "R", "O", "F", "I", "T", "A", "B", "C", "D", "E", "F", "G", "H", "I", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["J", "O", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["X", "Y", "P", "Z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["L", "M", "N", "P", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["Z", "A", "B", "C", "O", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["N", "O", "P", "Q", "R", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "A", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["B", "C", "D", "E", "F", "G", "T", "H", "I", "J", "K", "L", "M", "N", "O", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["P", "Q", "R", "S", "T", "U", "V", "U", "W", "X", "Y", "Z", "A", "B", "C", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["D", "I", "V", "I", "D", "E", "N", "D", "N", "E", "F", "G", "H", "I", "J", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["K", "L", "M", "N", "O", "P", "Q", "R", "S", "I", "T", "U", "V", "W", "X", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["Y", "Z", "A", "B", "C", "D", "E", "F", "G", "H", "T", "I", "J", "K", "L", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "Y", "X", "Y", "Z", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["T", "R", "A", "D", "E", "O", "F", "F", "A", "B", "C", "D", "C", "E", "F", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "O", "T", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["B", "U", "D", "G", "E", "T", "S", "T", "U", "V", "W", "X", "Y", "Z", "S", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "T", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]];
export const intermediate3Words: TargetWord[] = [
    {
        "word": "OPPORTUNITY COST",
        "description": "Value of the next best alternative given up",
        "isFound": false,
        "start": [
            0,
            0
        ],
        "end": [
            0,
            0
        ],
        "color": "#FF6B6B"
    },
    {
        "word": "TRADE OFF",
        "description": "Sacrificing one quality or aspect for another",
        "isFound": false,
        "start": [
            12,
            0
        ],
        "end": [
            12,
            7
        ],
        "color": "#4ECDC4"
    },
    {
        "word": "LIABILITY",
        "description": "Financial debts or obligations",
        "isFound": false,
        "start": [
            0,
            0
        ],
        "end": [
            0,
            0
        ],
        "color": "#45B7D1"
    },
    {
        "word": "DIVIDEND",
        "description": "Distribution of profits to shareholders",
        "isFound": false,
        "start": [
            8,
            0
        ],
        "end": [
            8,
            7
        ],
        "color": "#96CEB4"
    },
    {
        "word": "INTEREST",
        "description": "Cost of borrowing money or income from lending",
        "isFound": false,
        "start": [
            0,
            0
        ],
        "end": [
            0,
            0
        ],
        "color": "#FFEEAD"
    },
    {
        "word": "REVENUE",
        "description": "Income generated from normal business operations",
        "isFound": false,
        "start": [
            0,
            0
        ],
        "end": [
            0,
            0
        ],
        "color": "#D4A5A5"
    },
    {
        "word": "PROFIT",
        "description": "Financial gain when revenue exceeds costs",
        "isFound": false,
        "start": [
            0,
            0
        ],
        "end": [
            0,
            5
        ],
        "color": "#9B59B6"
    },
    {
        "word": "BUDGET",
        "description": "An estimate of income and expenditure",
        "isFound": false,
        "start": [
            14,
            0
        ],
        "end": [
            14,
            5
        ],
        "color": "#3498DB"
    }
];

// expert3
export const expert3Grid: string[][] = [["T", "S", "O", "C", "Y", "T", "I", "N", "U", "T", "R", "O", "P", "P", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["E", "V", "E", "N", "U", "E", "R", "D", "N", "E", "D", "I", "V", "I", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["G", "L", "I", "A", "B", "I", "L", "I", "T", "Y", "T", "I", "F", "O", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["D", "F", "F", "O", "E", "D", "A", "R", "T", "S", "E", "R", "E", "T", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["U", "N", "I", "T", "S", "E", "R", "E", "T", "N", "I", "P", "O", "R", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["B", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["R", "E", "V", "E", "N", "U", "E", "K", "L", "M", "N", "O", "P", "Q", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["T", "I", "F", "O", "R", "P", "S", "T", "U", "V", "W", "X", "Y", "Z", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["D", "I", "V", "I", "D", "E", "N", "D", "A", "B", "C", "D", "E", "F", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""], ["Y", "T", "I", "L", "I", "B", "A", "I", "L", "G", "H", "I", "J", "K", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]];
export const expert3Words: TargetWord[] = [
    {
        "word": "OPPORTUNITY COST",
        "description": "Value of the next best alternative given up",
        "isFound": false,
        "start": [
            0,
            0
        ],
        "end": [
            0,
            0
        ],
        "color": "#FF6B6B"
    },
    {
        "word": "TRADE OFF",
        "description": "Sacrificing one quality or aspect for another",
        "isFound": false,
        "start": [
            3,
            8
        ],
        "end": [
            3,
            1
        ],
        "color": "#4ECDC4"
    },
    {
        "word": "LIABILITY",
        "description": "Financial debts or obligations",
        "isFound": false,
        "start": [
            2,
            1
        ],
        "end": [
            2,
            9
        ],
        "color": "#45B7D1"
    },
    {
        "word": "DIVIDEND",
        "description": "Distribution of profits to shareholders",
        "isFound": false,
        "start": [
            8,
            0
        ],
        "end": [
            8,
            7
        ],
        "color": "#96CEB4"
    },
    {
        "word": "INTEREST",
        "description": "Cost of borrowing money or income from lending",
        "isFound": false,
        "start": [
            4,
            10
        ],
        "end": [
            4,
            3
        ],
        "color": "#FFEEAD"
    },
    {
        "word": "REVENUE",
        "description": "Income generated from normal business operations",
        "isFound": false,
        "start": [
            6,
            0
        ],
        "end": [
            6,
            6
        ],
        "color": "#D4A5A5"
    },
    {
        "word": "PROFIT",
        "description": "Financial gain when revenue exceeds costs",
        "isFound": false,
        "start": [
            7,
            5
        ],
        "end": [
            7,
            0
        ],
        "color": "#9B59B6"
    },
    {
        "word": "BUDGET",
        "description": "An estimate of income and expenditure",
        "isFound": false,
        "start": [
            5,
            0
        ],
        "end": [
            0,
            0
        ],
        "color": "#3498DB"
    }
];

