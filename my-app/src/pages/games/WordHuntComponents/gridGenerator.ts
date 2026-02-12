import type { TargetWord } from './data';

// Simple seeded RNG (Mulberry32)
class SeededRNG {
    private state: number;

    constructor(seed: number) {
        this.state = seed;
    }

    // Returns a float between 0 and 1
    next(): number {
        let t = this.state += 0x6D2B79F5;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }
}

export const createRNG = (seedStr: string) => {
    // Simple hash to convert string to number seed
    let hash = 0;
    for (let i = 0; i < seedStr.length; i++) {
        const char = seedStr.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0; // Convert to 32bit integer
    }
    const rng = new SeededRNG(Math.abs(hash));
    return () => rng.next();
};

const directions = [
    [0, 1],   // right
    [1, 0],   // down
];

export function generateGrid(words: TargetWord[], rows = 12, cols = 16, random: () => number = Math.random): { grid: string[][], placedWords: TargetWord[] } | null {
    let grid = Array(rows).fill(null).map(() => Array(cols).fill(''));
    let placedWords: TargetWord[] = [];

    // Sort words by length descending to place longest first to minimize collisions
    // We create a copy to not mutate the original array, but we want to return objects that match the original structure
    const sortedWords = [...words].sort((a, b) => b.word.length - a.word.length);

    for (const wordObj of sortedWords) {
        let placed = false;
        let attempts = 0;
        // Remove spaces for placement
        const cleanWord = wordObj.word.replace(/ /g, '').toUpperCase();

        // Count current orientation
        const vCount = placedWords.filter(w => w.start[1] === w.end[1]).length; // Col is same (Vertical)
        const hCount = placedWords.filter(w => w.start[0] === w.end[0]).length; // Row is same (Horizontal)

        let sortedDirections = [];

        if (vCount < hCount) {
            // Strictly force Vertical to catch up
            // We REMOVE Horizontal option so we don't accidentally place Horizontal just because the random spot favored it
            sortedDirections = [directions[1]]; // [1, 0] Down
        } else if (hCount < vCount) {
            // Strictly force Horizontal to catch up
            sortedDirections = [directions[0]]; // [0, 1] Right
        } else {
            // Equal counts: Allow both, randomized preference
            // This allows fallback if the preferred one doesn't fit at the specific spot
            if (random() < 0.5) {
                sortedDirections = [directions[1], directions[0]]; // V, H
            } else {
                sortedDirections = [directions[0], directions[1]]; // H, V
            }
        }

        while (!placed && attempts < 500) {
            const r = Math.floor(random() * rows);
            const c = Math.floor(random() * cols);

            // Try prioritized direction first
            for (const dir of sortedDirections) {
                if (placed) break; // Already placed

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
                        ...wordObj,
                        isFound: false,
                        start: [r, c],
                        end: [r + dir[0] * (cleanWord.length - 1), c + dir[1] * (cleanWord.length - 1)],
                    });
                    placed = true;
                }
            }
        }

        if (!placed) {
            // If we can't place a word, the grid generation failed for this configuration
            return null;
        }
    }

    // Fill empty spots with random letters
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === '') {
                grid[r][c] = letters[Math.floor(random() * letters.length)];
            }
        }
    }

    return { grid, placedWords };
}

export function generateLevel(words: TargetWord[], rows = 12, cols = 16, random: () => number = Math.random) {
    let result = null;
    let attempts = 0;
    while (!result && attempts < 100) {
        result = generateGrid(words, rows, cols, random);
        attempts++;
    }
    if (!result) {
        // Fallback or error handling if generation consistently fails (unlikely with these constraints)
        console.error("Failed to generate grid after multiple attempts");
        // Return a safe empty/default state to prevent crash, though ideally this shouldn't happen
        return {
            grid: Array(rows).fill(null).map(() => Array(cols).fill('A')),
            placedWords: []
        };
    }
    return result;
}
