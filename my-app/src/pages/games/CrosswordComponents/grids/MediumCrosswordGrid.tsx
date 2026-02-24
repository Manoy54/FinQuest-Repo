import { useMemo } from 'react';
import { generateGrid } from '../data';
import { BaseGrid, type GridInteractionProps } from './BaseGrid';

/**
 * MediumCrosswordGrid
 * Renders the Intermediate (Medium) crossword.
 * Words: MARGIN, DIVIDEND, AMORTIZE, PORTFOLIO, ELASTICITY,
 *        OLIGOPOLY, UTILITY, ANNUITY, DEFAULT, SOLVENCY,
 *        LIQUIDITY, SURPLUS
 */
export function MediumCrosswordGrid(props: GridInteractionProps) {
    const grid = useMemo(() => generateGrid('intermediate'), []);
    return <BaseGrid grid={grid} {...props} />;
}
