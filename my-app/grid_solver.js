const fs = require('fs');
let output = '';
function log(s) { output += s + '\n'; }

const hardWords = {
    D1: { word: 'ACCRETION', len: 9, dir: 'down' },
    D2: { word: 'LESSEE', len: 6, dir: 'down' },
    A3: { word: 'ACCRUAL', len: 7, dir: 'across' },
    D4: { word: 'LEVERAGE', len: 8, dir: 'down' },
    D5: { word: 'SHARPE', len: 6, dir: 'down' },
    D6: { word: 'CAPITALGEARING', len: 14, dir: 'down' },
    D7: { word: 'THETA', len: 5, dir: 'down' },
    A8: { word: 'DEPRECIATION', len: 12, dir: 'across' },
    D9: { word: 'DEFLATIONARY', len: 12, dir: 'down' },
    A10: { word: 'ARBITRAGE', len: 9, dir: 'across' },
    D11: { word: 'DERIVATIVES', len: 11, dir: 'down' },
    D12: { word: 'ILLIQUID', len: 8, dir: 'down' },
    A13: { word: 'CAPITALIZATION', len: 14, dir: 'across' },
    A14: { word: 'PECUNIARY', len: 9, dir: 'across' },
    A15: { word: 'INSOLVENCY', len: 10, dir: 'across' },
};

for (const [aKey, aData] of Object.entries(hardWords)) {
    if (aData.dir !== 'across') continue;
    for (const [dKey, dData] of Object.entries(hardWords)) {
        if (dData.dir !== 'down') continue;
        const matches = [];
        for (let ai = 0; ai < aData.word.length; ai++) {
            for (let di = 0; di < dData.word.length; di++) {
                if (aData.word[ai] === dData.word[di]) {
                    matches.push('  ' + aKey + '[' + ai + ']=' + aData.word[ai] + ' = ' + dKey + '[' + di + ']=' + dData.word[di]);
                }
            }
        }
        if (matches.length > 0) {
            log(aKey + '(' + aData.word + ') x ' + dKey + '(' + dData.word + '):');
            matches.forEach(m => log(m));
            log('');
        }
    }
}

fs.writeFileSync('grid_intersections.txt', output, 'utf8');
console.log('Done! Written to grid_intersections.txt');
