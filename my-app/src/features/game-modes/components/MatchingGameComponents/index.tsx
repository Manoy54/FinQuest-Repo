export interface MatchPair {
    id: string;
    term: string;
    definition: string;
    category: string;
}

export const MATCH_PAIRS: MatchPair[] = [
    { id: 'asset', term: 'Asset', definition: 'Something of value owned by a person or company', category: 'Accounting' },
    { id: 'liability', term: 'Liability', definition: 'A financial obligation or debt owed', category: 'Accounting' },
    { id: 'equity', term: 'Equity', definition: 'Ownership interest in an asset after debts', category: 'Finance' },
    { id: 'dividend', term: 'Dividend', definition: 'Profit distributed to shareholders', category: 'Investing' },
    { id: 'inflation', term: 'Inflation', definition: 'General increase in prices over time', category: 'Economics' },
    { id: 'deflation', term: 'Deflation', definition: 'General decrease in prices over time', category: 'Economics' },
    { id: 'amortization', term: 'Amortization', definition: 'Spreading loan payments over time', category: 'Banking' },
    { id: 'collateral', term: 'Collateral', definition: 'Asset pledged as security for a loan', category: 'Banking' },
    { id: 'capital-gain', term: 'Capital Gain', definition: 'Profit from selling an asset above purchase price', category: 'Investing' },
    { id: 'depreciation', term: 'Depreciation', definition: 'Decrease in asset value over time', category: 'Accounting' },
    { id: 'liquidity', term: 'Liquidity', definition: 'How easily an asset can be converted to cash', category: 'Finance' },
    { id: 'portfolio', term: 'Portfolio', definition: 'Collection of financial investments', category: 'Investing' },
    { id: 'interest', term: 'Interest Rate', definition: 'Cost of borrowing money expressed as percentage', category: 'Banking' },
    { id: 'gdp', term: 'GDP', definition: 'Total value of goods and services in a country', category: 'Economics' },
    { id: 'bear-market', term: 'Bear Market', definition: 'A market where prices are falling', category: 'Investing' },
    { id: 'bull-market', term: 'Bull Market', definition: 'A market where prices are rising', category: 'Investing' },
    { id: 'bond', term: 'Bond', definition: 'Debt instrument where issuer owes holder', category: 'Investing' },
    { id: 'budget', term: 'Budget', definition: 'Plan for managing income and expenses', category: 'Personal Finance' },
    { id: 'credit-score', term: 'Credit Score', definition: 'Number representing creditworthiness', category: 'Banking' },
    { id: 'mutual-fund', term: 'Mutual Fund', definition: 'Pooled investment managed by professionals', category: 'Investing' },
];

export function getMatchRound(count: number = 6): MatchPair[] {
    const shuffled = [...MATCH_PAIRS];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
}
