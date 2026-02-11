
export interface Question {
    id: number;
    question: string;
    options: { [key: string]: string };
    correctAnswer: string;
    explanations?: { [key: string]: string };
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
            correctAnswer: "B",
            explanations: {
                A: "Production management focuses on the creation of goods and services, not specifically on the management of funds.",
                B: "Finance is primarily concerned with how individuals and organizations manage, allocate, and use money over time.",
                C: "Marketing strategies focus on promoting and selling products or services, which is a different business function.",
                D: "Human resource planning deals with managing an organization's workforce, not its financial resources."
            }
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
            correctAnswer: "B",
            explanations: {
                A: "Financial reporting is just one part of financial management, not its whole definition.",
                B: "Financial management involves the administrative activities associated with the planning and control of a firm's financial resources.",
                C: "Advertising is a function of marketing, not financial management.",
                D: "Hiring staff is a human resources function, though financial staff are managed within the finance department."
            }
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
            correctAnswer: "A",
            explanations: {
                A: "The basic accounting equation states that a company's total assets are funded by either its creditors (liabilities) or its owners (equity).",
                B: "This is the formula for Net Income, which is part of the Income Statement, not the foundation of the Balance Sheet.",
                C: "This is not a standard accounting equation and doesn't reflect the balance of a firm's resources.",
                D: "Equity is not simply profit multiplied by revenue; it's the residual interest in the assets after deducting liabilities."
            }
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
            correctAnswer: "B",
            explanations: {
                A: "Borrowing is only one source of cash inflow, not the entirety of cash flow.",
                B: "Cash flow tracks the total amount of money being transferred into and out of a business, affecting its liquidity.",
                C: "Sales promotions are marketing activities that may *lead* to cash flow, but are not cash flow themselves.",
                D: "Interest rates affect the cost of borrowing but are not the flow of cash itself."
            }
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
            correctAnswer: "A",
            explanations: {
                A: "The primary objective of financial management is to maximize the value of the firm for its owners or shareholders.",
                B: "Reducing salaries might cut costs but isn't a core goal and can harm the company's long-term value.",
                C: "Expanding production is a growth strategy, but only a goal if it contributes to overall value maximization.",
                D: "Marketing events are operational expenses aimed at sales, not the overarching goal of finance."
            }
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
            correctAnswer: "B",
            explanations: {
                A: "Abundance is the opposite of the condition described; it means having more than enough.",
                B: "Scarcity is the fundamental economic problem of having seemingly unlimited human wants in a world of limited resources.",
                C: "Inflation refers to a general increase in prices, not the limitation of resources vs. wants.",
                D: "A surplus occurs when supply exceeds demand at a given price, not as a general condition of resources."
            }
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
            correctAnswer: "C",
            explanations: {
                A: "Budgeting is the process of planning future income and expenses, not specifically the commitment for returns.",
                B: "Saving is setting money aside for safety and future use, often without the same risk/reward profile as investing.",
                C: "Investment involves putting capital to use in an attempt to earn a profit or achieve a future return.",
                D: "Auditing is the inspection and verification of financial records, not a fund commitment."
            }
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
            correctAnswer: "C",
            explanations: {
                A: "The Income Statement measures performance over a *period* of time, not at a single point.",
                B: "The Cash Flow statement tracks cash movement over a *period* of time.",
                C: "The Balance Sheet provides a 'snapshot' of what a company owns and owes at a specific date.",
                D: "The MD&A is a narrative report explaining performance, not a financial 'snapshot' statement."
            }
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
            correctAnswer: "C",
            explanations: {
                A: "Interest is the *cost* of credit, but trust is the element that enables the transaction in the first place.",
                B: "Contracts formalize credit, but the foundation of the debtor-creditor relationship is the expectation (trust) of repayment.",
                C: "Credit is derived from the Latin 'credere' (to trust); it relies on the creditor's belief in the debtor's ability and intent to repay.",
                D: "Regulations govern credit, but they don't provide the underlying mechanism for the exchange of value for future payment."
            }
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
            correctAnswer: "B",
            explanations: {
                A: "Fixed costs don't change with production levels; they aren't the value of an alternative given up.",
                B: "Opportunity cost is the loss of potential gain from other alternatives when one alternative is chosen.",
                C: "Sunk costs are costs already incurred that cannot be recovered; they should be ignored in future choices.",
                D: "Marginal cost is the cost of producing one additional unit of a good."
            }
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
            correctAnswer: "B",
            explanations: {
                A: "Inflation is the rise in prices, not the fundamental lack of resources.",
                B: "Scarcity is the central problem of economics, where limited resources cannot meet unlimited desires.",
                C: "A surplus is when there's more of something than needed, the opposite of the core problem.",
                D: "Efficiency is a goal (using resources well), but the problem that forces efficiency is scarcity."
            }
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
            correctAnswer: "C",
            explanations: {
                A: "Non-current assets are long-term investments not expected to be converted to cash within a year.",
                B: "Intangible assets (like patents) don't have a physical form; their liquidity varies but 'current' is the specific timing term.",
                C: "Current assets are highly liquid assets expected to be sold, consumed, or exhausted within one year.",
                D: "Fixed assets are long-term tangible properties (like buildings) used in operations, not for quick conversion to cash."
            }
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
            correctAnswer: "C",
            explanations: {
                A: "Macroeconomics looks at the economy as a whole (inflation, GDP, unemployment), not individual units.",
                B: "Positive economics deals with objective facts regardless of the scale (micro or macro).",
                C: "Microeconomics (from 'micro' meaning small) studies the decision-making of individuals and businesses.",
                D: "Normative economics deals with value judgments ('what should be'), not the scale of behavior."
            }
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
            correctAnswer: "C",
            explanations: {
                A: "Capital refers to the borrower's net worth or personal investment in the project.",
                B: "Capacity measures the borrower's ability to repay the loan based on income and expenses.",
                C: "Character focuses on the borrower's reputation, honesty, and past reliability in fulfilling obligations.",
                D: "Collateral is the property or assets pledged to secure the loan in case of default."
            }
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
            correctAnswer: "C",
            explanations: {
                A: "The Income Statement shows performance over a period, not a single snapshot point.",
                B: "The Cash Flow Statement tracks movement over time, not a static position.",
                C: "The Balance Sheet is the classic 'snapshot' statement showing assets, liabilities, and equity at a specific date.",
                D: "The Retained Earnings Statement explains changes in equity over a period."
            }
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
            correctAnswer: "B",
            explanations: {
                A: "Capital appreciation is the growth in value, which is a goal but doesn't describe the 'basket' strategy.",
                B: "Diversification is the strategy of spreading investments across various assets to reduce overall risk.",
                C: "Liquidity is how quickly an asset can be turned into cash, which is unrelated to the 'one basket' concept.",
                D: "Income generation is seeking regular payouts (like dividends), not specifically about risk reduction through variety."
            }
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
            correctAnswer: "C",
            explanations: {
                A: "Private businesses control production in a market economy, not a command economy.",
                B: "Consumer demand drives a market economy; in a command economy, orders come from the top.",
                C: "In a command economy, the central government or authority makes all major economic decisions.",
                D: "Foreign investors may play a role, but the defining feature is central state control."
            }
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
            correctAnswer: "C",
            explanations: {
                A: "Inventory is a current asset because it's expected to be sold within a year.",
                B: "Cash is the most liquid current asset.",
                C: "PPE are long-term physical assets used in operations for many years, making them non-current.",
                D: "Accounts Receivable are current assets representing money customers owe that should be paid soon."
            }
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
            correctAnswer: "C",
            explanations: {
                A: "This is reversed; usually saving is for short-term/emergencies and investing is for long-term wealth.",
                B: "Also reversed; saving is generally low-risk while investing involves taking risk for reward.",
                C: "Saving prioritizes liquidity and preserving capital, while investing seeks to grow capital despite market fluctuations.",
                D: "There are major differences in terms of risk, return, and time horizon."
            }
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
            correctAnswer: "A",
            explanations: {
                A: "Principle 1 directly addresses the fact that in a world of scarcity, getting one thing usually means giving up another.",
                B: "Principle 5 is about the benefits of market exchange, not the fundamental problem of trade-offs.",
                C: "Principle 9 explains inflation, which is a macro-economic phenomenon.",
                D: "Principle 3 is about how people make decisions by looking at small incremental changes, not the trade-off itself."
            }
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
            correctAnswer: "B",
            explanations: {
                A: "Investment decisions involve how to use funds to acquire assets, not how to obtain them.",
                B: "Financing decisions specifically address the sources and methods of raising capital for the business.",
                C: "Liquidity planning ensures the firm has enough cash to meet short-term obligations, but doesn't focus on long-term funding sources.",
                D: "Dividend distribution determines how much profit is shared with owners vs. retained, which is a post-earning decision."
            }
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
            correctAnswer: "B",
            explanations: {
                A: "This is backwards; money today can be invested to earn returns, making it more valuable than the same amount later.",
                B: "Due to earning potential and inflation, a dollar today is worth more than a dollar tomorrow because you can invest it now.",
                C: "Money has value both today and in the future, but today's value is higher due to opportunity cost.",
                D: "Money's value changes over time due to inflation, interest rates, and investment opportunities."
            }
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
            correctAnswer: "B",
            explanations: {
                A: "Liquidity ratio measures a company's ability to pay short-term obligations, not the balance of risk and return.",
                B: "The risk-return trade-off is the principle that potential return rises with an increase in risk.",
                C: "A price ceiling is a government-imposed limit on how high a price can be charged, unrelated to investment risk.",
                D: "Opportunity cost is the value of the next best alternative foregone, not specifically about balancing risk and return."
            }
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
            correctAnswer: "B",
            explanations: {
                A: "Long-term investments are non-current assets, not the day-to-day operational funds.",
                B: "Working capital = Current Assets - Current Liabilities, representing the funds available for daily operations.",
                C: "Equity is ownership interest, not the measure of short-term liquidity.",
                D: "Fixed assets are long-term physical assets, not the liquid capital for operations."
            }
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
            correctAnswer: "B",
            explanations: {
                A: "Liquidity is about how quickly assets can be converted to cash, not about spreading risk.",
                B: "Diversification reduces risk by spreading investments across different assets that don't all move in the same direction.",
                C: "Profit maximization is a goal, not a risk reduction strategy.",
                D: "Capital budgeting is the process of evaluating long-term investments, not specifically about risk spreading."
            }
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
            correctAnswer: "B",
            explanations: {
                A: "Cash-basis accounting would show income only when cash is received, so this wouldn't cause the discrepancy.",
                B: "Under accrual accounting, sales on credit increase Net Income immediately, but cash isn't collected until later.",
                C: "Having no liabilities doesn't explain why high profits don't translate to cash on hand.",
                D: "Not paying taxes would be illegal and wouldn't explain the accounting difference between profit and cash."
            }
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
            correctAnswer: "B",
            explanations: {
                A: "Higher input costs affect producers (supply), not consumer demand for the finished product.",
                B: "When production costs increase, producers supply less at each price point, shifting the supply curve left.",
                C: "Higher costs would decrease supply, not increase it.",
                D: "Higher production costs typically lead to higher prices, not lower ones."
            }
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
            correctAnswer: "B",
            explanations: {
                A: "Active management involves trying to beat the market through research and stock picking, which has higher fees.",
                B: "Passive management (index investing) tracks a market index to match its performance with minimal trading and lower costs.",
                C: "Capital preservation focuses on protecting the principal amount, not necessarily tracking an index.",
                D: "Tactical asset allocation involves actively shifting portfolio weights based on market conditions, not index tracking."
            }
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
            correctAnswer: "C",
            explanations: {
                A: "Installment credit involves fixed payments over a set period (like a car loan), not continuous borrowing.",
                B: "Service credit is when services are provided before payment (like utilities), but it's not a revolving line.",
                C: "Revolving credit allows continuous borrowing and repayment up to a credit limit, like credit cards.",
                D: "Trade credit is when suppliers allow businesses to buy now and pay later, typically for a single transaction."
            }
        },
        {
            id: 10,
            question: "In a company's Annual Report, which section provides the management's perspective on the previous year's performance and future strategic goals?",
            options: {
                A: "The Auditor's Report",
                B: "Management Discussion and Analysis (MD&A)",
                C: "Notes to Financial Statements",
                D: "The Balance Sheet"
            },
            correctAnswer: "B",
            explanations: {
                A: "The Auditor's Report provides an independent verification of financial statements, not management's perspective.",
                B: "MD&A is where management explains performance, discusses trends, and outlines future strategies in their own words.",
                C: "Notes provide detailed explanations of accounting policies and line items, not strategic commentary.",
                D: "The Balance Sheet is a financial statement showing assets and liabilities, not a narrative section."
            }
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
            correctAnswer: "C",
            explanations: {
                A: "Efficient production is represented by points ON the PPF curve, not inside it.",
                B: "Unattainable production levels are points OUTSIDE the curve, beyond current capacity.",
                C: "Points inside the curve show the economy is not using all available resources efficiently.",
                D: "Economic growth is shown by the entire PPF curve shifting outward, not by interior points."
            }
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
            correctAnswer: "C",
            explanations: {
                A: "Revolving credit allows you to carry a balance and make minimum payments, not full payment each period.",
                B: "Installment credit involves fixed payments over time, not full balance payment each period.",
                C: "Open credit (or charge credit) requires the full balance to be paid at the end of each billing cycle.",
                D: "Trade credit is business-to-business credit for purchasing goods, with varying payment terms."
            }
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
            correctAnswer: "B",
            explanations: {
                A: "Gold reserves are a measure of wealth but don't directly determine how efficiently a country produces goods and services.",
                B: "Productivity (output per worker) is the key determinant of living standards - more productive countries can produce more with less.",
                C: "Population size affects total GDP but not necessarily GDP per capita or quality of life.",
                D: "The number of banks is a financial infrastructure metric, not the root cause of living standard differences."
            }
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
            correctAnswer: "B",
            explanations: {
                A: "Tax regulations are applied to both cash and accrual accounting; they're not what the Cash Flow Statement reverses.",
                B: "The Cash Flow Statement converts accrual-based net income back to a cash basis by adjusting for non-cash items.",
                C: "Management salaries are actual expenses, not accounting adjustments that need to be undone.",
                D: "Marketing expenses are real costs, not accrual adjustments that the Cash Flow Statement reverses."
            }
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
            correctAnswer: "B",
            explanations: {
                A: "Pure capitalism has minimal government ownership; private enterprise dominates all sectors.",
                B: "Socialism combines elements of both systems, with government control of key industries and private ownership of smaller ones.",
                C: "Agricultural system describes an economy based on farming, not a mixed ownership structure.",
                D: "Traditional economy is based on customs and barter, not a deliberate mix of government and private control."
            }
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
            correctAnswer: "B",
            explanations: {
                A: "Stable cash flows do not eliminate interest rate risk if the loan has a variable rate or if the cost of capital changes.",
                B: "An increase in interest rates raises the cost of capital, making it necessary to re-evaluate the project's profitability using a higher discount rate.",
                C: "Increasing prices without analysis might alienate customers and doesn't address the underlying change in financial feasibility.",
                D: "Capital projects should always be evaluated based on the current and expected economic conditions, including interest rates."
            }
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
            correctAnswer: "C",
            explanations: {
                A: "Earning 8% while paying 10% interest results in a net loss of 2% - financially inefficient.",
                B: "The problem states only one option can be chosen due to limited cash, and splitting doesn't optimize the return.",
                C: "Paying off the 10% loan is equivalent to 'earning' a 10% return, which beats the 8% investment return.",
                D: "Holding cash earns no return while the company continues paying 10% interest on the loan."
            }
        },
        {
            id: 3,
            question: "A seasoned investor notice that the government has just imposed a Price Ceiling on basic commodities that is significantly below the current market equilibrium price. At the same time, the investor is considering increasing their stake in a retail company that sells these specific commodities. Based on economic principles and investment logic, what is the most likely outcome the investor should prepare for?",
            options: {
                A: "The retail company will likely face chronic shortages and a \"black market,\" potentially hurting its formal profit margins and stock value.",
                B: "The retail company will see a massive increase in profits due to higher consumer demand.",
                C: "The Supply and Demand curves will both shift to the right, creating a new, higher equilibrium.",
                D: "The investor should ignore the price ceiling because it only affects consumers, not the company's internal financial statements."
            },
            correctAnswer: "A",
            explanations: {
                A: "A price ceiling below equilibrium creates excess demand (shortage), leading to black markets and reduced legal sales.",
                B: "While demand may be high, the company cannot profit if it can't legally charge market prices or obtain sufficient supply.",
                C: "Price ceilings don't shift curves; they create disequilibrium at the artificially low price.",
                D: "Price controls directly impact a company's revenue, costs, and ability to operate profitably."
            }
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
            correctAnswer: "B",
            explanations: {
                A: "A 'Stiff' is indifferent to reputation, but this borrower clearly cares about image (name-dropping, appearing wealthy).",
                B: "The 'Paranoiac' debtor has delusions of grandeur and prioritizes maintaining an image of wealth over financial responsibility.",
                C: "A 'Deadbeat' intentionally defrauds; this person seems to genuinely believe in their own inflated status.",
                D: "A 'Cooperative' debtor works with creditors; this person's behavior suggests ego-driven denial rather than cooperation."
            }
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
            correctAnswer: "D",
            explanations: {
                A: "High profit with negative cash flow doesn't mean fraud - it's a common timing difference in accrual accounting.",
                B: "Assets must always equal liabilities plus equity by definition; this doesn't explain the profit-cash discrepancy.",
                C: "The number of shareholders doesn't affect operational cash flow - it's about cash collection timing.",
                D: "Under accrual accounting, revenue is recognized when earned (not when cash is received), creating this exact scenario."
            }
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
            correctAnswer: "C",
            explanations: {
                A: "Printing more money actually decreases purchasing power as each unit of currency becomes worth less.",
                B: "Deflation is the opposite - excessive money printing causes prices to rise, not fall.",
                C: "When money supply increases faster than goods/services, each unit loses value and prices rise (inflation).",
                D: "Inflation from excessive printing typically harms living standards by eroding savings and creating economic instability."
            }
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
            correctAnswer: "C",
            explanations: {
                A: "The E to S Link examines how environmental issues affect social factors, not governance's impact on environmental assessment.",
                B: "Greenwashing Detection identifies false environmental claims, not the governance-environment expertise connection.",
                C: "The G to E Link specifically addresses how governance quality (like board expertise) affects environmental risk assessment.",
                D: "Regulatory fines are a consequence of poor environmental management, not the governance-expertise link itself."
            }
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
            correctAnswer: "B",
            explanations: {
                A: "Both positive and normative economics can address growth or recession; the distinction is about facts vs. values.",
                B: "Positive economics describes reality objectively; normative economics makes value-based recommendations about policy.",
                C: "Both types apply to all economic actors - the difference is descriptive vs. prescriptive, not who it's for.",
                D: "There is a clear distinction: positive is testable and objective, normative involves opinions and values."
            }
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
            correctAnswer: "B",
            explanations: {
                A: "Scarcity and opportunity cost are related concepts, not a trade-off that policymakers actively manage.",
                B: "The Phillips Curve shows that reducing unemployment often leads to higher inflation in the short run, and vice versa.",
                C: "Taxes and subsidies are policy tools, not the fundamental short-term economic trade-off described in Principle 10.",
                D: "Supply and demand determine market equilibrium, not a policy trade-off that countries face."
            }
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
            correctAnswer: "B",
            explanations: {
                A: "Bangko Sentral ng Pilipinas was established in 1949, not during the 16th-century Spanish colonial period.",
                B: "Obras Pias were charitable institutions during Spanish colonial times that provided both credit and social services.",
                C: "PNB (1916) and BPI (1851) are modern banks established well after the 16th century.",
                D: "Microfinance institutions are a contemporary development, not 16th-century colonial institutions."
            }
        }
    ]
};
