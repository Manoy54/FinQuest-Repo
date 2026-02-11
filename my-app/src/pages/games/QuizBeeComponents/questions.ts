
export interface Question {
    id: number;
    question: string;
    options: { [key: string]: string };
    correctAnswer: string;
}

export const questions = {
    BEGINNER: [
        {
            id: 1,
            question: "What is the primary focus of finance?",
            options: {
                A: "Production management",
                B: "Money management and allocation",
                C: "Marketing strategies",
                D: "Human resource planning"
            },
            correctAnswer: "B"
        },
        {
            id: 2,
            question: "Which of the following best defines financial management?",
            options: {
                A: "Writing financial reports only",
                B: "Planning, organizing, directing, and controlling financial resources",
                C: "Advertising the company’s services",
                D: "Hiring financial staff"
            },
            correctAnswer: "B"
        },
        {
            id: 3,
            question: "Which equation expresses the basic accounting relationship?",
            options: {
                A: "Assets = Liabilities + Equity",
                B: "Profit = Revenue − Expense",
                C: "Expenses = Income + Investment",
                D: "Equity = Profit × Revenue"
            },
            correctAnswer: "A"
        },
        {
            id: 4,
            question: "What does “cash flow” refer to in finance?",
            options: {
                A: "Money borrowed only",
                B: "Money moving in and out of a business",
                C: "Sales promotions",
                D: "Interest rates only"
            },
            correctAnswer: "B"
        },
        {
            id: 5,
            question: "Which of the following is a goal of financial management?",
            options: {
                A: "Maximizing shareholder value",
                B: "Reducing employee salaries",
                C: "Expanding production facilities only",
                D: "Marketing events"
            },
            correctAnswer: "A"
        },
        {
            id: 6,
            question: "In Economics, what is the term for the condition where resources are limited but wants are unlimited?",
            options: {
                A: "Abundance",
                B: "Scarcity",
                C: "Inflation",
                D: "Surplus"
            },
            correctAnswer: "B"
        },
        {
            id: 7,
            question: "Which of the following refers to the \"commitment of funds today with the expectation of generating future returns\"?",
            options: {
                A: "Budgeting",
                B: "Saving",
                C: "Investment",
                D: "Auditing"
            },
            correctAnswer: "C"
        },
        {
            id: 8,
            question: "Which financial statement acts as a \"snapshot\" of a company’s financial position at a specific point in time?",
            options: {
                A: "Income Statement",
                B: "Statement of Cash Flows",
                C: "Balance Sheet",
                D: "Management Discussion and Analysis (MD&A)"
            },
            correctAnswer: "C"
        },
        {
            id: 9,
            question: "In a credit transaction, what is the core element that allows a debtor to obtain something of value without immediate payment?",
            options: {
                A: "Interest rate",
                B: "Legal contract",
                C: "Trust",
                D: "Government regulation"
            },
            correctAnswer: "C"
        },
        {
            id: 10,
            question: "What do you call the value of the next best alternative that is given up when making a financial choice?",
            options: {
                A: "Fixed cost",
                B: "Opportunity cost",
                C: "Sunk cost",
                D: "Marginal cost"
            },
            correctAnswer: "B"
        },
        {
            id: 11,
            question: "What is the \"core concept\" in economics that describes the condition where resources are insufficient to satisfy everyone's wants?",
            options: {
                A: "Inflation",
                B: "Scarcity",
                C: "Surplus",
                D: "Efficiency"
            },
            correctAnswer: "B"
        },
        {
            id: 12,
            question: "In a Balance Sheet, what term refers to assets that are expected to be converted into cash in less than one year?",
            options: {
                A: "Non-current assets",
                B: "Intangible assets",
                C: "Current assets",
                D: "Fixed assets"
            },
            correctAnswer: "C"
        },
        {
            id: 13,
            question: "Which branch of economics focuses on the behavior of individual households and firms?",
            options: {
                A: "Macroeconomics",
                B: "Positive economics",
                C: "Microeconomics",
                D: "Normative economics"
            },
            correctAnswer: "C"
        },
        {
            id: 14,
            question: "In the \"Three C’s of Credit,\" which one refers to the borrower's moral obligation and willingness to pay?",
            options: {
                A: "Capital",
                B: "Capacity",
                C: "Character",
                D: "Collateral"
            },
            correctAnswer: "C"
        },
        {
            id: 15,
            question: "Which financial statement is described as a \"snapshot\" of a company's financial position at a specific point in time?",
            options: {
                A: "Income Statement",
                B: "Cash Flow Statement",
                C: "Balance Sheet",
                D: "Retained Earnings Statement"
            },
            correctAnswer: "C"
        },
        {
            id: 16,
            question: "What is the main objective of portfolio management that aims to avoid putting \"all eggs in one basket\"?",
            options: {
                A: "Capital appreciation",
                B: "Risk diversification",
                C: "Liquidity",
                D: "Income generation"
            },
            correctAnswer: "B"
        },
        {
            id: 17,
            question: "In a Command Economy, who primarily controls the production and distribution of goods?",
            options: {
                A: "Private businesses",
                B: "Individual consumers",
                C: "The government",
                D: "Foreign investors"
            },
            correctAnswer: "C"
        },
        {
            id: 18,
            question: "Which of the following is considered a \"Non-current Asset\" on a balance sheet?",
            options: {
                A: "Inventory",
                B: "Cash",
                C: "Property, Plant, and Equipment (PPE)",
                D: "Accounts Receivable"
            },
            correctAnswer: "C"
        },
        {
            id: 19,
            question: "What is the primary difference between saving and investing?",
            options: {
                A: "Saving is for long-term wealth; investing is for emergencies.",
                B: "Saving is risky; investing is safe.",
                C: "Saving is for safety and accessibility; investing is for growth and higher potential returns.",
                D: "There is no difference."
            },
            correctAnswer: "C"
        },
        {
            id: 20,
            question: "Which economic principle states that people face \"trade-offs\" because resources are limited?",
            options: {
                A: "Principle 1: People Face Trade-offs",
                B: "Principle 5: Trade makes everyone better off",
                C: "Principle 9: Prices rise when the government prints too much money",
                D: "Principle 3: Rational people think at the margin"
            },
            correctAnswer: "A"
        }
    ],
    INTERMEDIATE: [
        {
            id: 1,
            question: "Which decision in financial management deals with acquiring funds?",
            options: {
                A: "Investment decisions",
                B: "Financing decisions",
                C: "Liquidity planning",
                D: "Dividend distribution"
            },
            correctAnswer: "B"
        },
        {
            id: 2,
            question: "What does the time value of money concept state?",
            options: {
                A: "Money today is worth less than in the future",
                B: "Money today is worth more than the same amount in the future",
                C: "Money only has value in the future",
                D: "Money never changes value"
            },
            correctAnswer: "B"
        },
        {
            id: 3,
            question: "Which concept balances risk against expected return?",
            options: {
                A: "Liquidity ratio",
                B: "Risk-return trade-off",
                C: "Price ceiling",
                D: "Opportunity cost"
            },
            correctAnswer: "B"
        },
        {
            id: 4,
            question: "What is “working capital”?",
            options: {
                A: "Long-term investments",
                B: "Short-term assets minus short-term liabilities",
                C: "Total equity only",
                D: "Fixed assets"
            },
            correctAnswer: "B"
        },
        {
            id: 5,
            question: "Which concept helps a company reduce risk by investing in assets that behave differently under market conditions?",
            options: {
                A: "Liquidity",
                B: "Diversification",
                C: "Profit maximization",
                D: "Capital budgeting"
            },
            correctAnswer: "B"
        },
        {
            id: 6,
            question: "Why might a company report a high \"Net Income\" on its Income Statement but have very little \"Cash at Bank\" on its Balance Sheet?",
            options: {
                A: "The company is using cash-basis accounting.",
                B: "The company uses accrual accounting, recognizing revenue when earned rather than when cash is received.",
                C: "The company has no liabilities.",
                D: "The company is not paying its taxes."
            },
            correctAnswer: "B"
        },
        {
            id: 7,
            question: "In Microeconomics, if the price of a \"Resource\" (an input like electricity or raw materials) increases, what is the most likely effect on the market for the finished product?",
            options: {
                A: "The Demand curve will shift to the right.",
                B: "The Supply curve will shift to the left (decrease).",
                C: "The Supply curve will shift to the right (increase).",
                D: "The price of the product will automatically decrease."
            },
            correctAnswer: "B"
        },
        {
            id: 8,
            question: "Which portfolio management strategy involves mimicking a specific market index (like the PSEi) to achieve similar returns with lower management fees?",
            options: {
                A: "Active Management",
                B: "Passive Management",
                C: "Capital Preservation",
                D: "Tactical Asset Allocation"
            },
            correctAnswer: "B"
        },
        {
            id: 9,
            question: "Which type of credit allows a debtor to repeatedly borrow, repay, and re-borrow up to a pre-approved limit, such as a credit card?",
            options: {
                A: "Installment Credit",
                B: "Service Credit",
                C: "Revolving Credit",
                D: "Trade Credit"
            },
            correctAnswer: "C"
        },
        {
            id: 10,
            question: "In a company's Annual Report, which section provides the management’s perspective on the previous year's performance and future strategic goals?",
            options: {
                A: "The Auditor’s Report",
                B: "Management Discussion and Analysis (MD&A)",
                C: "Notes to Financial Statements",
                D: "The Balance Sheet"
            },
            correctAnswer: "B"
        },
        {
            id: 11,
            question: "In the Production Possibility Frontier (PPF), what do points inside the curve indicate?",
            options: {
                A: "Efficient production",
                B: "Unattainable production levels",
                C: "Inefficiency or underutilized resources",
                D: "Economic growth"
            },
            correctAnswer: "C"
        },
        {
            id: 12,
            question: "Which type of credit requires the full payment of the balance at the end of each period, such as a utility bill?",
            options: {
                A: "Revolving credit",
                B: "Installment credit",
                C: "Open credit",
                D: "Trade credit"
            },
            correctAnswer: "C"
        },
        {
            id: 13,
            question: "According to Mankiw's principles, what is the primary cause of a country's variation in \"Standard of Living\"?",
            options: {
                A: "The amount of gold reserves",
                B: "Differences in productivity levels",
                C: "The total population size",
                D: "The number of banks in the country"
            },
            correctAnswer: "B"
        },
        {
            id: 14,
            question: "What does the Cash Flow Statement \"undo\" to show the actual cash movement of a business?",
            options: {
                A: "Tax regulations",
                B: "Accrual accounting principles",
                C: "Management salaries",
                D: "Marketing expenses"
            },
            correctAnswer: "B"
        },
        {
            id: 15,
            question: "Which economic system is described as a combination of market and command economies, where the government owns major industries but minor ones are private?",
            options: {
                A: "Pure Capitalism",
                B: "Socialism",
                C: "Agricultural System",
                D: "Traditional Economy"
            },
            correctAnswer: "B"
        }
    ],
    EXPERT: [
        {
            id: 1,
            question: "A manufacturing firm plans to purchase new equipment worth ₱5,000,000 using a bank loan. However, the central bank recently increased policy interest rates due to inflation. The firm expects its operating cash inflows to remain stable over the next three years. Which budgeting decision is MOST appropriate for the firm?",
            options: {
                A: "Proceed immediately since stable cash flows eliminate interest rate risk",
                B: "Delay the purchase and reassess the project using a higher discount rate",
                C: "Increase selling prices to offset higher interest expenses without analysis",
                D: "Ignore interest rate changes because capital expenditures are long-term"
            },
            correctAnswer: "B"
        },
        {
            id: 2,
            question: "A company has ₱2,000,000 available for the next year. It can either invest in a project earning 8%, or use the funds to pay off a bank loan with an effective interest rate of 10%. The company has limited cash and must choose only one option. From a budgeting perspective, what is the BEST decision?",
            options: {
                A: "Invest in the project to earn additional income",
                B: "Split the funds between the project and loan repayment",
                C: "Pay off the loan to reduce higher interest costs",
                D: "Hold the cash to maintain liquidity"
            },
            correctAnswer: "C"
        },
        {
            id: 3,
            question: "A seasoned investor notice that the government has just imposed a Price Ceiling on basic commodities that is significantly below the current market equilibrium price. At the same time, the investor is considering increasing their stake in a retail company that sells these specific commodities. Based on economic principles and investment logic, what is the most likely outcome the investor should prepare for?",
            options: {
                A: "The retail company will likely face chronic shortages and a \"black market,\" potentially hurting its formal profit margins and stock value.",
                B: "The retail company will see a massive increase in profits due to higher consumer demand.",
                C: "The Supply and Demand curves will both shift to the right, creating a new, higher equilibrium.",
                D: "The investor should ignore the price ceiling because it only affects consumers, not the company’s internal financial statements."
            },
            correctAnswer: "A"
        },
        {
            id: 4,
            question: "A creditor is evaluating a potential borrower who has a high-paying job but is known for \"name-dropping\" influential people and acting as if they are \"wallowing in wealth,\" even though their actual bank statements show they are currently struggling to meet basic expenses. According to the psychological classifications of debtors in your reference materials, how should this borrower be categorized, and what is the primary risk?",
            options: {
                A: "Stiff: The risk is that they simply do not care about their reputation.",
                B: "Paranoiac: The risk is that they suffer from delusions of grandeur and will prioritize their \"ego\" and image over actual debt repayment.",
                C: "Deadbeat: The risk is that they have a criminal intent to defraud the company.",
                D: "Cooperative: The risk is minimal as they are enlisting help from influential friends."
            },
            correctAnswer: "B"
        },
        {
            id: 5,
            question: "You are analyzing a company's performance. The Income Statement shows a record-breaking \"Net Profit\" of ₱10 Million. However, you notice on the Statement of Cash Flows that \"Cash Flow from Operations\" is actually negative ₱2 Million. Using your understanding of financial statements, what is the most likely explanation for this discrepancy?",
            options: {
                A: "The company is failing and the Income Statement is a total lie.",
                B: "The company's assets and liabilities are not equal on the Balance Sheet.",
                C: "The company has too many shareholders, which automatically reduces the cash flow.",
                D: "The company is using \"Accrual Accounting\" and has recorded many sales on credit, but has not actually collected the cash from customers yet."
            },
            correctAnswer: "D"
        },
        {
            id: 6,
            question: "If a government excessively prints money, what is the direct long-term consequence according to the Principles of Economics?",
            options: {
                A: "Increased purchasing power",
                B: "Lowering of prices (Deflation)",
                C: "Loss of currency value and rising prices (Inflation)",
                D: "Improved standard of living for all"
            },
            correctAnswer: "C"
        },
        {
            id: 7,
            question: "Which specific element of the \"Advanced Guide Questions\" in IPM suggests that a lack of climate expertise on a Board of Directors (G) might lead to underestimating Environmental risks (E)?",
            options: {
                A: "The E to S Link",
                B: "Greenwashing Detection",
                C: "The G to E Link",
                D: "Regulatory Fines"
            },
            correctAnswer: "C"
        },
        {
            id: 8,
            question: "In Microeconomics, what is the difference between \"Positive Economics\" and \"Normative Economics\"?",
            options: {
                A: "Positive is about growth; Normative is about recession.",
                B: "Positive deals with objective facts (\"what is\"); Normative deals with value judgments (\"what should be\").",
                C: "Positive is for businesses; Normative is for individuals.",
                D: "There is no distinction between the two."
            },
            correctAnswer: "B"
        },
        {
            id: 9,
            question: "What is the short-term trade-off that every country faces according to Economic Principle 10?",
            options: {
                A: "Trade-off between Scarcity and Opportunity Cost",
                B: "Trade-off between Inflation and Unemployment",
                C: "Trade-off between Taxes and Subsidies",
                D: "Trade-off between Supply and Demand"
            },
            correctAnswer: "B"
        },
        {
            id: 10,
            question: "In the history of credit in the Philippines, which 16th-century Spanish colonial era institutions provided both credit and non-credit services?",
            options: {
                A: "Bangko Sentral ng Pilipinas",
                B: "Obras Pias",
                C: "PNB and BPI",
                D: "Microfinance Institutions"
            },
            correctAnswer: "B"
        }
    ]
};
