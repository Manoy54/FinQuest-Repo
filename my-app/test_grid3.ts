import { clues } from './src/pages/games/CrosswordComponents/data.ts';

const grid = new Map();
let conflict = false;

// make copies
let hardClues = JSON.parse(JSON.stringify(clues.hard));

// Apply we want to move SUBSTITUTION to row 7, col 0
const sub = hardClues.find((c: any) => c.answer === 'SUBSTITUTION');
if (sub) { sub.row = 7; sub.col = 0; }

// Since SUBSTITUTION moved, let's move its intersecting down words down by 3 rows, left by 1 col
const dup = hardClues.find((c: any) => c.answer === 'DUPOINT');
if (dup) { dup.row += 3; dup.col -= 1; }  // to row 6, col 1

const trans = hardClues.find((c: any) => c.answer === 'TRANSFERS');
if (trans) { trans.row += 3; trans.col -= 1; } // to row 3, col 3

const debt = hardClues.find((c: any) => c.answer === 'DEBTOR');
if (debt) { debt.row += 3; debt.col -= 1; } // to row 4, col 6

hardClues.forEach((clue: any) => {
    for (let i = 0; i < clue.answer.length; i++) {
        const r = clue.direction === 'down' ? clue.row + i : clue.row;
        const c = clue.direction === 'across' ? clue.col + i : clue.col;
        const key = r + ',' + c;
        const char = clue.answer[i];
        if (grid.has(key) && grid.get(key) !== char) {
            console.log(`Conflict at (${r},${c}): ${grid.get(key)} vs ${char} (from ${clue.answer})`);
            conflict = true;
        }
        grid.set(key, char);
    }
});

if (!conflict) {
    console.log('No conflicts found with new layout!');
} else {
    console.log('Conflicts exist.');
}
