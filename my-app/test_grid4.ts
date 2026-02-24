import { clues } from './src/pages/games/CrosswordComponents/data.ts';

const grid = new Map();
let conflict = false;

// make copies
let hardClues = JSON.parse(JSON.stringify(clues.hard));

// apply previous move
const reserve = hardClues.find((c: any) => c.answer === 'RESERVE');
if (reserve) { reserve.row = 4; reserve.col = 13; }

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
    console.log('No conflicts found when moving RESERVE!');
} else {
    console.log('Conflicts exist.');
}
