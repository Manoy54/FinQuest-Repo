import { useMemo } from 'react';
import { generateGrid } from '../data';
import { BaseGrid, type GridInteractionProps } from './BaseGrid';

/**
 * ExtremeCrosswordGrid
 * Renders the Extreme crossword.
 */
export function ExtremeCrosswordGrid(props: GridInteractionProps) {
    const grid = useMemo(() => generateGrid('extreme'), []);
    return <BaseGrid grid={grid} {...props} />;
}
