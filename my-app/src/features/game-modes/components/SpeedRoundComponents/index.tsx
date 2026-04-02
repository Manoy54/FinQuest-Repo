export interface SpeedRoundQuestion {
    question: string;
    choices: string[];
    correctIndex: number;
    category: string;
}

export const SPEED_ROUND_QUESTIONS: SpeedRoundQuestion[] = [
    { question: 'What does ROI stand for?', choices: ['Return on Investment', 'Rate of Interest', 'Revenue on Income', 'Return on Income'], correctIndex: 0, category: 'Finance' },
    { question: 'What is a bear market?', choices: ['Rising prices', 'Falling prices', 'Stable prices', 'Volatile prices'], correctIndex: 1, category: 'Investing' },
    { question: 'What does IPO stand for?', choices: ['Initial Price Offering', 'Internal Public Offering', 'Initial Public Offering', 'Investment Portfolio Option'], correctIndex: 2, category: 'Investing' },
    { question: 'Which is a liquid asset?', choices: ['Real estate', 'Cash', 'Equipment', 'Patent'], correctIndex: 1, category: 'Finance' },
    { question: 'What is a dividend?', choices: ['A type of tax', 'Profit paid to shareholders', 'A bank fee', 'A loan type'], correctIndex: 1, category: 'Investing' },
    { question: 'What does APR mean?', choices: ['Annual Percentage Rate', 'Applied Payment Rate', 'Average Payment Ratio', 'Annual Price Return'], correctIndex: 0, category: 'Banking' },
    { question: 'What is collateral?', choices: ['A type of investment', 'Asset pledged for a loan', 'A savings account', 'A tax form'], correctIndex: 1, category: 'Banking' },
    { question: 'What is inflation?', choices: ['Decrease in prices', 'Increase in prices over time', 'No change in prices', 'Currency devaluation'], correctIndex: 1, category: 'Economics' },
    { question: 'What is a mutual fund?', choices: ['Individual stock', 'Pooled investment vehicle', 'Savings account type', 'Insurance product'], correctIndex: 1, category: 'Investing' },
    { question: 'What is net income?', choices: ['Total revenue', 'Revenue minus expenses', 'Gross profit', 'Operating cost'], correctIndex: 1, category: 'Accounting' },
    { question: 'What is a bond?', choices: ['Equity share', 'Debt instrument', 'Real estate deed', 'Currency note'], correctIndex: 1, category: 'Investing' },
    { question: 'What is GDP?', choices: ['Government Debt Plan', 'Gross Domestic Product', 'General Data Protocol', 'Global Development Program'], correctIndex: 1, category: 'Economics' },
    { question: 'What is a bull market?', choices: ['Declining market', 'Rising market', 'Stagnant market', 'Volatile market'], correctIndex: 1, category: 'Investing' },
    { question: 'What does VAT stand for?', choices: ['Value Added Tax', 'Variable Asset Tax', 'Voluntary Assessment Tax', 'Value Adjusted Tariff'], correctIndex: 0, category: 'Taxation' },
    { question: 'What is equity?', choices: ['Debt amount', 'Ownership value in asset', 'Monthly payment', 'Tax obligation'], correctIndex: 1, category: 'Finance' },
    { question: 'What is a credit score?', choices: ['Bank balance', 'Creditworthiness rating', 'Interest rate', 'Loan amount'], correctIndex: 1, category: 'Banking' },
    { question: 'What is depreciation?', choices: ['Value increase', 'Value decrease over time', 'Interest earned', 'Tax payment'], correctIndex: 1, category: 'Accounting' },
    { question: 'What is a portfolio?', choices: ['Single investment', 'Collection of investments', 'Bank account', 'Loan document'], correctIndex: 1, category: 'Investing' },
    { question: 'What is a P/E ratio?', choices: ['Profit to Expense', 'Price to Earnings', 'Payment to Equity', 'Percentage to Exchange'], correctIndex: 1, category: 'Investing' },
    { question: 'What is compound interest?', choices: ['Simple interest', 'Interest on interest', 'Fixed rate', 'No interest'], correctIndex: 1, category: 'Banking' },
    { question: 'PHP is the currency code of?', choices: ['Pakistan', 'Philippines', 'Peru', 'Poland'], correctIndex: 1, category: 'Currency' },
    { question: 'What is a recession?', choices: ['Economic growth', 'Economic decline', 'Stable economy', 'Inflation spike'], correctIndex: 1, category: 'Economics' },
    { question: 'What does BSP regulate?', choices: ['Stock market', 'Banking system', 'Real estate', 'Insurance'], correctIndex: 1, category: 'Banking' },
    { question: 'What is a 401(k)?', choices: ['Tax form', 'Retirement savings plan', 'Insurance policy', 'Loan type'], correctIndex: 1, category: 'Personal Finance' },
    { question: 'What is market cap?', choices: ['Stock price', 'Total market value of shares', 'Annual revenue', 'Profit margin'], correctIndex: 1, category: 'Investing' },
    { question: 'What is liquidity?', choices: ['Profit margin', 'Ease of converting to cash', 'Debt ratio', 'Tax rate'], correctIndex: 1, category: 'Finance' },
    { question: 'SSS is for which sector?', choices: ['Government', 'Private', 'Military', 'Education'], correctIndex: 1, category: 'Social Security' },
    { question: 'What is a budget deficit?', choices: ['Surplus funds', 'Spending exceeds revenue', 'Balanced budget', 'Tax refund'], correctIndex: 1, category: 'Economics' },
    { question: 'What is amortization?', choices: ['Interest calculation', 'Spreading loan payments', 'Tax deduction', 'Asset valuation'], correctIndex: 1, category: 'Banking' },
    { question: 'What is the stock exchange?', choices: ['Bank type', 'Market for trading securities', 'Insurance company', 'Government agency'], correctIndex: 1, category: 'Investing' },
];

export function getShuffledQuestions(): SpeedRoundQuestion[] {
    const shuffled = [...SPEED_ROUND_QUESTIONS];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}
