
import { writeFileSync } from 'fs';

const originals = {
    // Left Side
    A8: 'SUBSTITUTION',
    D5: 'DUPONT',
    D1: 'TRANSFERS',
    D2: 'DEBTOR',

    // Center
    D6: 'WORKINGCAPITAL',

    // Lower Left
    A13: 'COLLECTIBILITY',

    // Right Cluster
    A10: 'FACTORING',
    D9: 'MONOPOLISTIC',
    D11: 'COMPLEMENTS',
    D12: 'INFERIOR',

    // Lower Right
    A14: 'FIDUCIARY',
    A15: 'PERPETUITY',

    // Top Right
    A3: 'RESERVE',
    D4: 'VELOCITY',

    // Disjoint?
    D7: 'QUICK'
};

function getIntersections(k1, k2) {
    const w1 = originals[k1];
    const w2 = originals[k2];
    const res = [];
    for (let i = 0; i < w1.length; i++) {
        for (let j = 0; j < w2.length; j++) {
            if (w1[i] === w2[j]) res.push(`${k1}[${i}]x${k2}[${j}](${w1[i]})`);
        }
    }
    return res;
}

let out = '';
function log(s) { out += s + '\n'; }

log('--- A8 Backbone ---');
log('D5 x A8: ' + getIntersections('D5', 'A8').join(', '));
log('D1 x A8: ' + getIntersections('D1', 'A8').join(', '));
log('D2 x A8: ' + getIntersections('D2', 'A8').join(', '));
log('D6 x A8: ' + getIntersections('D6', 'A8').join(', '));

log('\n--- A13 Lower Backbone ---');
log('D6 x A13: ' + getIntersections('D6', 'A13').join(', '));
log('D11 x A13: ' + getIntersections('D11', 'A13').join(', '));

log('\n--- A10 Middle Backbone ---');
log('D9 x A10: ' + getIntersections('D9', 'A10').join(', '));
log('D11 x A10: ' + getIntersections('D11', 'A10').join(', '));
log('D12 x A10: ' + getIntersections('D12', 'A10').join(', '));
log('D7 x A10: ' + getIntersections('D7', 'A10').join(', '));

log('\n--- A14 Backbone ---');
log('D9 x A14: ' + getIntersections('D9', 'A14').join(', '));
log('D11 x A14: ' + getIntersections('D11', 'A14').join(', '));
log('D12 x A14: ' + getIntersections('D12', 'A14').join(', '));

log('\n--- A3 Top Right ---');
log('D4 x A3: ' + getIntersections('D4', 'A3').join(', '));

log('\n--- A15 Lower Right ---');
log('D11 x A15: ' + getIntersections('D11', 'A15').join(', '));

writeFileSync('grid_intersections.txt', out);
