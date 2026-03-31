export interface DocumentPair {
    id: string;
    title: string;
    category: string;
    description: string;
    originalFields: FieldItem[];
    modifiedFields: FieldItem[];
    differences: string[];
}

export interface FieldItem {
    label: string;
    value: string;
    isDifferent?: boolean;
}

export const DOCUMENT_PAIRS: DocumentPair[] = [
    {
        id: 'check-1',
        title: 'Bank Check Verification',
        category: 'Banking',
        description: 'Compare two bank checks and find the discrepancies.',
        originalFields: [
            { label: 'Pay to', value: 'Maria Santos' },
            { label: 'Amount (words)', value: 'Five Thousand Pesos' },
            { label: 'Amount (figures)', value: '₱5,000.00' },
            { label: 'Date', value: 'March 15, 2026' },
            { label: 'Bank', value: 'BDO Unibank' },
            { label: 'Check No.', value: '0012345' },
            { label: 'Memo', value: 'Rent Payment' },
        ],
        modifiedFields: [
            { label: 'Pay to', value: 'Maria Santos' },
            { label: 'Amount (words)', value: 'Fifty Thousand Pesos', isDifferent: true },
            { label: 'Amount (figures)', value: '₱5,000.00' },
            { label: 'Date', value: 'March 15, 2026' },
            { label: 'Bank', value: 'BPI' , isDifferent: true },
            { label: 'Check No.', value: '0012345' },
            { label: 'Memo', value: 'Rent Payment' },
        ],
        differences: ['Amount (words)', 'Bank'],
    },
    {
        id: 'statement-1',
        title: 'Financial Statement Audit',
        category: 'Accounting',
        description: 'Compare two income statements and spot the errors.',
        originalFields: [
            { label: 'Company', value: 'SM Investments Corp.' },
            { label: 'Revenue', value: '₱450,000,000' },
            { label: 'COGS', value: '₱180,000,000' },
            { label: 'Gross Profit', value: '₱270,000,000' },
            { label: 'Operating Expenses', value: '₱95,000,000' },
            { label: 'Net Income', value: '₱175,000,000' },
            { label: 'Period', value: 'Q1 2026' },
        ],
        modifiedFields: [
            { label: 'Company', value: 'SM Investments Corp.' },
            { label: 'Revenue', value: '₱450,000,000' },
            { label: 'COGS', value: '₱108,000,000', isDifferent: true },
            { label: 'Gross Profit', value: '₱270,000,000' },
            { label: 'Operating Expenses', value: '₱95,000,000' },
            { label: 'Net Income', value: '₱175,000,000' },
            { label: 'Period', value: 'Q2 2026', isDifferent: true },
        ],
        differences: ['COGS', 'Period'],
    },
    {
        id: 'receipt-1',
        title: 'Official Receipt Check',
        category: 'Taxation',
        description: 'Compare two official receipts for tax compliance.',
        originalFields: [
            { label: 'Seller', value: 'Metro Retail Stores' },
            { label: 'TIN', value: '123-456-789-000' },
            { label: 'Subtotal', value: '₱8,500.00' },
            { label: 'VAT (12%)', value: '₱1,020.00' },
            { label: 'Total', value: '₱9,520.00' },
            { label: 'Date', value: 'Feb 28, 2026' },
            { label: 'OR No.', value: 'OR-2026-00451' },
        ],
        modifiedFields: [
            { label: 'Seller', value: 'Metro Retail Stores' },
            { label: 'TIN', value: '123-456-789-001', isDifferent: true },
            { label: 'Subtotal', value: '₱8,500.00' },
            { label: 'VAT (12%)', value: '₱1,200.00', isDifferent: true },
            { label: 'Total', value: '₱9,520.00' },
            { label: 'Date', value: 'Feb 28, 2026' },
            { label: 'OR No.', value: 'OR-2026-00451' },
        ],
        differences: ['TIN', 'VAT (12%)'],
    },
    {
        id: 'loan-1',
        title: 'Loan Agreement Review',
        category: 'Banking',
        description: 'Spot differences between two loan agreements.',
        originalFields: [
            { label: 'Borrower', value: 'Juan Dela Cruz' },
            { label: 'Lender', value: 'PNB' },
            { label: 'Principal', value: '₱500,000' },
            { label: 'Interest Rate', value: '6.5% per annum' },
            { label: 'Term', value: '36 months' },
            { label: 'Monthly Payment', value: '₱15,347' },
            { label: 'Collateral', value: 'Real property' },
        ],
        modifiedFields: [
            { label: 'Borrower', value: 'Juan Dela Cruz' },
            { label: 'Lender', value: 'PNB' },
            { label: 'Principal', value: '₱500,000' },
            { label: 'Interest Rate', value: '8.5% per annum', isDifferent: true },
            { label: 'Term', value: '36 months' },
            { label: 'Monthly Payment', value: '₱15,347' },
            { label: 'Collateral', value: 'Motor vehicle', isDifferent: true },
        ],
        differences: ['Interest Rate', 'Collateral'],
    },
    {
        id: 'currency-1',
        title: 'Currency Note Inspection',
        category: 'Currency',
        description: 'Compare two banknote descriptions to identify counterfeits.',
        originalFields: [
            { label: 'Denomination', value: '₱1,000' },
            { label: 'Series', value: '2020' },
            { label: 'Portraits', value: 'Abad Santos, Lim, Escoda' },
            { label: 'Watermark', value: 'Abad Santos' },
            { label: 'Security Thread', value: 'Embedded, color-shifting' },
            { label: 'Serial No.', value: 'AB123456' },
            { label: 'Signature', value: 'BSP Governor' },
        ],
        modifiedFields: [
            { label: 'Denomination', value: '₱1,000' },
            { label: 'Series', value: '2020' },
            { label: 'Portraits', value: 'Abad Santos, Lim, Escoda' },
            { label: 'Watermark', value: 'Jose Rizal', isDifferent: true },
            { label: 'Security Thread', value: 'Printed, non-shifting', isDifferent: true },
            { label: 'Serial No.', value: 'AB123456' },
            { label: 'Signature', value: 'BSP Governor' },
        ],
        differences: ['Watermark', 'Security Thread'],
    },
];

export function getDocumentPairs(count: number = 3): DocumentPair[] {
    const shuffled = [...DOCUMENT_PAIRS];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
}
