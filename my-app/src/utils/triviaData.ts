export interface TriviaQuestion {
    id: string;
    question: string;
    choices: string[];
    correctIndex: number;
    explanation: string;
    category: string;
}

export const TRIVIA_POOL: TriviaQuestion[] = [
    {
        id: 'bsp-1',
        question: 'What does BSP stand for in Philippine finance?',
        choices: ['Bank of the Philippine Islands', 'Bangko Sentral ng Pilipinas', 'Bureau of Securities Philippines', 'Banking System of the Philippines'],
        correctIndex: 1,
        explanation: 'BSP (Bangko Sentral ng Pilipinas) is the central bank of the Philippines responsible for maintaining price stability.',
        category: 'Banking',
    },
    {
        id: 'pdic-1',
        question: 'How much does PDIC insure per depositor per bank?',
        choices: ['₱100,000', '₱250,000', '₱500,000', '₱1,000,000'],
        correctIndex: 2,
        explanation: 'The Philippine Deposit Insurance Corporation (PDIC) insures deposits up to ₱500,000 per depositor per bank.',
        category: 'Banking',
    },
    {
        id: 'tax-1',
        question: 'What does TIN stand for?',
        choices: ['Tax Identification Number', 'Total Income Net', 'Tax Invoice Number', 'Taxpayer Index Number'],
        correctIndex: 0,
        explanation: 'A TIN (Tax Identification Number) is assigned by the BIR to every registered taxpayer in the Philippines.',
        category: 'Taxation',
    },
    {
        id: 'bir-1',
        question: 'What government agency handles tax collection in the Philippines?',
        choices: ['BSP', 'SEC', 'BIR', 'DOF'],
        correctIndex: 2,
        explanation: 'The Bureau of Internal Revenue (BIR) is the primary tax collection agency of the Philippine government.',
        category: 'Taxation',
    },
    {
        id: 'sss-1',
        question: 'What is the main purpose of SSS in the Philippines?',
        choices: ['Provide housing loans', 'Social security for private workers', 'Regulate the stock market', 'Manage government funds'],
        correctIndex: 1,
        explanation: 'The Social Security System (SSS) provides retirement, disability, death, and other benefits to private sector workers.',
        category: 'Social Security',
    },
    {
        id: 'pagibig-1',
        question: 'Pag-IBIG Fund primarily helps Filipinos with what?',
        choices: ['Healthcare coverage', 'Stock investments', 'Housing and savings', 'Education loans'],
        correctIndex: 2,
        explanation: 'Pag-IBIG (Home Development Mutual Fund) provides affordable shelter financing and short-term loans to its members.',
        category: 'Social Security',
    },
    {
        id: 'psei-1',
        question: 'What is the PSEi?',
        choices: ['Philippine Savings Exchange Index', 'Philippine Stock Exchange Index', 'Philippine Securities Exchange Index', 'Philippine Standard Economic Index'],
        correctIndex: 1,
        explanation: 'The PSEi tracks the performance of the 30 largest companies listed on the Philippine Stock Exchange.',
        category: 'Investing',
    },
    {
        id: 'inflation-1',
        question: 'What is inflation?',
        choices: ['Decrease in currency value', 'General increase in prices over time', 'Rise in stock prices', 'Growth in GDP'],
        correctIndex: 1,
        explanation: 'Inflation is the sustained increase in the general price level of goods and services in an economy over time.',
        category: 'Economics',
    },
    {
        id: 'compound-1',
        question: 'What makes compound interest powerful for savings?',
        choices: ['It decreases over time', 'You earn interest on your interest', 'It only applies to large amounts', 'Banks pay it monthly'],
        correctIndex: 1,
        explanation: 'Compound interest earns interest on both the principal and previously accumulated interest, accelerating growth.',
        category: 'Personal Finance',
    },
    {
        id: 'budget-1',
        question: 'What is the 50-30-20 budgeting rule?',
        choices: ['50% savings, 30% needs, 20% wants', '50% needs, 30% wants, 20% savings', '50% wants, 30% savings, 20% needs', '50% investments, 30% needs, 20% wants'],
        correctIndex: 1,
        explanation: 'The 50-30-20 rule suggests allocating 50% of income to needs, 30% to wants, and 20% to savings.',
        category: 'Personal Finance',
    },
    {
        id: 'philhealth-1',
        question: 'What does PhilHealth provide?',
        choices: ['Life insurance', 'National health insurance', 'Dental coverage only', 'Retirement benefits'],
        correctIndex: 1,
        explanation: 'PhilHealth provides national health insurance coverage to Filipino citizens.',
        category: 'Social Security',
    },
    {
        id: 'gdp-1',
        question: 'What does GDP measure?',
        choices: ['Government debt', 'Total value of goods and services produced', 'Average income per person', 'Total imports and exports'],
        correctIndex: 1,
        explanation: 'GDP (Gross Domestic Product) measures the total monetary value of all finished goods and services produced within a country.',
        category: 'Economics',
    },
    {
        id: 'diversification-1',
        question: 'Why is investment diversification important?',
        choices: ['It guarantees profits', 'It reduces risk by spreading investments', 'It increases taxes', 'It simplifies your portfolio'],
        correctIndex: 1,
        explanation: 'Diversification reduces risk by spreading investments across different assets, sectors, or regions.',
        category: 'Investing',
    },
    {
        id: 'peso-1',
        question: 'What is the symbol of the Philippine Peso?',
        choices: ['$', '¥', '₱', '€'],
        correctIndex: 2,
        explanation: 'The Philippine Peso uses the symbol ₱ and is the official currency of the Philippines (ISO code: PHP).',
        category: 'Currency',
    },
    {
        id: 'emergency-1',
        question: 'How many months of expenses should an emergency fund cover?',
        choices: ['1-2 months', '3-6 months', '12 months', 'No specific amount'],
        correctIndex: 1,
        explanation: 'Financial advisors recommend keeping 3-6 months of living expenses in an emergency fund.',
        category: 'Personal Finance',
    },
];

export function getDailyTrivia(count: number = 5): TriviaQuestion[] {
    const today = new Date().toISOString().split('T')[0];
    let seed = 0;
    for (let i = 0; i < today.length; i++) {
        seed = ((seed << 5) - seed + today.charCodeAt(i)) | 0;
    }

    const shuffled = [...TRIVIA_POOL];
    for (let i = shuffled.length - 1; i > 0; i--) {
        seed = (seed * 1103515245 + 12345) & 0x7fffffff;
        const j = seed % (i + 1);
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, count);
}

const TRIVIA_STORAGE_KEY = 'finquest_trivia_today';

interface TriviaProgress {
    date: string;
    answeredIds: string[];
    correctIds: string[];
}

export function loadTriviaProgress(): TriviaProgress {
    try {
        const raw = localStorage.getItem(TRIVIA_STORAGE_KEY);
        if (raw) {
            const data = JSON.parse(raw);
            if (data.date === new Date().toISOString().split('T')[0]) return data;
        }
    } catch { /* ignore */ }
    return { date: new Date().toISOString().split('T')[0], answeredIds: [], correctIds: [] };
}

export function saveTriviaProgress(progress: TriviaProgress): void {
    localStorage.setItem(TRIVIA_STORAGE_KEY, JSON.stringify(progress));
}
