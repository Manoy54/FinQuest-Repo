export interface MatchPair {
    id: string;
    term: string;
    definition: string;
}

export const MATCH_PAIRS_EASY: MatchPair[] = [
    { id: 'cash-flow', term: 'Cash Flow', definition: 'The movement of cash coming in and going out of a business.' },
    { id: 'investments', term: 'Investments', definition: 'Assets purchased with the goal of earning income or increasing value over time.' },
    { id: 'economics', term: 'Economics', definition: 'The study of how people and governments allocate scarce resources.' },
    { id: 'stocks', term: 'Stocks', definition: 'Ownership shares in a company that give investors claims on income and assets.' },
    { id: 'bonds', term: 'Bonds', definition: 'Debt securities where investors lend money to an issuer in exchange for interest payments.' },
];

export const MATCH_PAIRS_INTERMEDIATE: MatchPair[] = [
    { id: 'monetary-policy', term: 'Monetary Policy', definition: 'Actions taken by a central bank to control money supply and interest rates to stabilize the economy.' },
    { id: 'diversify', term: 'Diversify', definition: 'Spreading investments to reduce risk instead of putting all funds into a single asset.' },
    { id: 'risk-return', term: 'Risk Return', definition: 'The principle that higher risk is usually associated with higher potential return.' },
    { id: 'market-value', term: 'Market Value', definition: 'The observed price of an asset in the marketplace.' },
    { id: 'book-value', term: 'Book Value', definition: 'Value of an asset as recorded on the balance sheet.' },
];

export const MATCH_PAIRS_HARD: MatchPair[] = [
    { id: 'current-yield', term: 'Current Yield', definition: "The ratio of annual interest payment to the bond's current market price." },
    { id: 'leverage', term: 'Leverage', definition: 'Magnification of earnings that results from the use of fixed costs in a company.' },
    { id: 'serial-bonds', term: 'Serial Bonds', definition: 'Bonds that are paid off in installments over a period of time.' },
    { id: 'straight-bonds', term: 'Straight Bonds', definition: 'Bonds that mature on a single date.' },
    { id: 'cost-of-capital', term: 'Cost of Capital', definition: 'The return expected by those who provide capital for the business.' },
];

export function getMatchRound(round: number): MatchPair[] {
    let pairs: MatchPair[];
    if (round === 1) pairs = [...MATCH_PAIRS_EASY];
    else if (round === 2) pairs = [...MATCH_PAIRS_INTERMEDIATE];
    else pairs = [...MATCH_PAIRS_HARD];

    for (let i = pairs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
    }
    return pairs;
}
