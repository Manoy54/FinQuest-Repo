import { useMemo } from 'react';
import { generateGrid } from '../data';
import { BaseGrid, type GridInteractionProps } from './BaseGrid';

/**
 * EasyCrosswordGrid
 * Renders the Beginner (Easy) crossword.
 * Words: REVENUE, PROFIT, LIABILITY, EQUITY, DEBIT, CREDIT,
 *        BUDGET, AUDIT, CAPITAL, ASSET
 */
export function EasyCrosswordGrid(props: GridInteractionProps) {
    // Grid is stable — generated once and never changes for this difficulty
    const grid = useMemo(() => generateGrid('beginner'), []);
    return <BaseGrid grid={grid} {...props} />;
}
