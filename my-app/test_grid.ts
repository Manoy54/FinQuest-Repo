import { clues } from './src/pages/games/CrosswordComponents/data.ts';

const grid = new Map();
let conflict = false;

// make copies
let hardClues = JSON.parse(JSON.stringify(clues.hard));

// apply moves
const mono = hardClues.find((c: any) => c.answer === 'MONOPOLISTIC');
if (mono) { mono.row = 8; mono.col = 16; }

const coll = hardClues.find((c: any) => c.answer === 'COLLECTIBILITY');
if (coll) { coll.row = 17; coll.col = 4; }

const comp = hardClues.find((c: any) => c.answer === 'COMPLEMENTS');
if (comp) { comp.row = 12; comp.col = 8; }

const perp = hardClues.find((c: any) => c.answer === 'PERPETUITY');
if (perp) { perp.row = 21; perp.col = 3; }

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
}
