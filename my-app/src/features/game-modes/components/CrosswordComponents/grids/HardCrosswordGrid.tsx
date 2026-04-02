import { useMemo } from 'react';
import { generateGrid } from '../data';
import { BaseGrid, type GridInteractionProps } from './BaseGrid';

/**
 * HardCrosswordGrid
 * Renders the Hard crossword — 25 rows × 27 cols, 14 verified intersections.
 * Words: TRANSFERS, DEBTOR, VELOCITY, DUPONT, WORKINGCAPITAL,
 *        QUICK, MONOPOLISTIC, COMPLEMENTS,
 *        RESERVE, SUBSTITUTION, FACTORING, COLLECTIBILITY,
 *        FIDUCIARY, PERPETUITY
 */
export function HardCrosswordGrid(props: GridInteractionProps) {
    const grid = useMemo(() => generateGrid('hard'), []);
    return <BaseGrid grid={grid} {...props} />;
}
