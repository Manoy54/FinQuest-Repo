
const directions = [
    [0, 1],   // right
    [1, 0],   // down
    [1, 1],   // diagonal down-right
    [0, -1],  // left
    [-1, 0],  // up
    [-1, -1], // diagonal up-left
    [1, -1],  // diagonal down-left
    [-1, 1]   // diagonal up-right
];

function generateGrid(words, rows = 12, cols = 16) { // Increased size slightly for longer words like "MONETARY POLICY" if needed, but sticking to 14x10 or similar.
    // Let's use 12x16 to give a bit more space for "COUPON INTEREST" (15 chars) and "COST OF CAPITAL" (15 chars)
    // Actually, let's try 12 rows, 16 cols.

    let grid = Array(rows).fill(null).map(() => Array(cols).fill(''));
    let placedWords = [];

    // Sort words by length descending to place longest first
    // But we need to keep original word objects associated
    const sortedWords = [...words].sort((a, b) => b.word.length - a.word.length);

    for (const wordObj of sortedWords) {
        let placed = false;
        let attempts = 0;
        const cleanWord = wordObj.word.replace(/ /g, '').toUpperCase();

        while (!placed && attempts < 500) {
            const r = Math.floor(Math.random() * rows);
            const c = Math.floor(Math.random() * cols);
            const dir = directions[Math.floor(Math.random() * directions.length)];

            // Check if fits
            let fits = true;
            for (let i = 0; i < cleanWord.length; i++) {
                const newR = r + dir[0] * i;
                const newC = c + dir[1] * i;

                if (newR < 0 || newR >= rows || newC < 0 || newC >= cols) {
                    fits = false;
                    break;
                }

                if (grid[newR][newC] !== '' && grid[newR][newC] !== cleanWord[i]) {
                    fits = false;
                    break;
                }
            }

            if (fits) {
                // Place it
                for (let i = 0; i < cleanWord.length; i++) {
                    const newR = r + dir[0] * i;
                    const newC = c + dir[1] * i;
                    grid[newR][newC] = cleanWord[i];
                }

                placedWords.push({
                    word: wordObj.word,
                    description: wordObj.description,
                    isFound: false,
                    start: [r, c],
                    end: [r + dir[0] * (cleanWord.length - 1), c + dir[1] * (cleanWord.length - 1)],
                    color: wordObj.color // Preserve color if exists, or assign later
                });
                placed = true;
            }
            attempts++;
        }

        if (!placed) {
            console.error(`Could not place word: ${wordObj.word}`);
            return null; // Retry entire grid
        }
    }

    // Fill empty spots
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === '') {
                grid[r][c] = letters[Math.floor(Math.random() * letters.length)];
            }
        }
    }

    return { grid, words: placedWords };
}

const intermediateWords = [
    { word: "BOOK VALUE", description: "Value of an asset as shown in the balance sheet." },
    { word: "MARKET VALUE", description: "Observed value for the asset in the market place; intrinsic or economic value" },
    { word: "CURRENT YIELD", description: "Ratio of the annual interest payment to the bonds current market price." },
    { word: "LEVERAGE", description: "Magnification of earnings that results from having fixed costs in the company." },
    { word: "EUROBONDS", description: "Denominated in the issuer’s currency but sold outside of the issuer’s country." },
    { word: "SERIAL BONDS", description: "Bonds with serial payment provisions and are paid off in installments." },
    { word: "STRAIGHT BONDS", description: "Bonds that have a one-time maturity." },
    { word: "QUICK RATIO", description: "Indicates whether current liabilities could be paid without having to sell the inventory." },
    { word: "COST OF CAPITAL", description: "Represents the weighted average cost of permanent financing raised by a corporation." }
];

const expertWords = [
    { word: "CONVERTIBILITY", description: "A characteristic of Preferred Stock which allows its holder to convert it into common stock." },
    { word: "EBIT", description: "Shortened term for Earning Before Interest and Taxes; which talks about how much profit a company makes from its day-to-day operations, without factoring in interest payments on debt or income taxes." },
    { word: "EAR", description: "Shortened term for Effective Annual Rate; rate which would produce the same ending if annual compounding had been used." },
    { word: "CAPM", description: "Shortened term for Capital Asset Pricing Model; it compares to the shareholders return of the market" },
    { word: "COUPON INTEREST", description: "Percentage of the par value of the bond that will be paid out annually in the form of interest" },
    { word: "TRADE CREDIT", description: "Form of short-term financing common to businesses. It is spontaneous credit from regular purchase of goods." },
    { word: "DGM", description: "Shortened term for Dividend Growth Model. It is the price of the anticipated level of dividend payments" },
    { word: "INDENTURE", description: "A legal and binding contract specifying all the important features of a bond, such as its maturity date, timing of interest payments, method of interest calculation, and callable or convertible features." } // Added missing description for Indenture assuming standard def or user left blank. User said "INDENTURE" at end with empty line. I'll add a generic one.
];

// Colors to cycle through
const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#D4A5A5', '#9B59B6', '#3498DB', '#E67E22', '#2ECC71'];

function assignColors(words) {
    return words.map((w, i) => ({ ...w, color: colors[i % colors.length] }));
}

let intermediateGrid = null;
while (!intermediateGrid) {
    intermediateGrid = generateGrid(assignColors(intermediateWords), 12, 16);
}

let expertGrid = null;
while (!expertGrid) {
    expertGrid = generateGrid(assignColors(expertWords), 12, 16);
}

// Helper to format output
function formatGrid(grid) {
    return "[\n" + grid.map(row => "    ['" + row.join("', '") + "']").join(",\n") + "\n]";
}

console.log("INTERMEDIATE GRID:");
console.log(formatGrid(intermediateGrid.grid));
console.log("\nINTERMEDIATE WORDS:");
console.log(JSON.stringify(intermediateGrid.words, null, 2));

console.log("\n\nEXPERT GRID:");
console.log(formatGrid(expertGrid.grid));
console.log("\nEXPERT WORDS:");
console.log(JSON.stringify(expertGrid.words, null, 2));
