export const AI_SYSTEM_PROMPT = `I am conducting a UI/UX precision test. Please locate the two differences in the 'Edited' image relative to the 'Original' and provide the center point (x, y) of each change relative to the image frame.

Example (PNB Logo): Difference 1 is the missing star at the top center of the shield. Difference 2 is the thickened blue frame.
Example (Jollibee): Difference 1 is the blacked-out pupils (missing white glints). Difference 2 is the modified curve of the cheek line/color saturation.`;

/*


Rules:
- Only report deliberate edits, not JPEG compression artifacts or minor rendering noise
- Do not describe the images overall \u2014 only describe the differences
- If you find no differences, say so clearly
- Aim to find ALL differences before responding

After listing all differences, add a summary line:
"Total differences found: X"

Tone: friendly, encouraging, like a game show host revealing answers.`;
*/

export interface DifferenceZone {
    id: string;
    x: number; // percentage-based 0-100 left
    y: number; // percentage-based 0-100 top
    width: number; // percentage-based width
    height: number; // percentage-based height
    description: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface ImagePuzzle {
    id: string;
    title: string;
    category: string;
    description: string;
    originalImage: string;
    editedImage: string;
    differences: DifferenceZone[];
}

export const PUZZLES: ImagePuzzle[] = [
    {
        id: 'peso-100',
        title: '₱100 Bill Verification',
        category: 'Currency',
        description: 'Spot the counterfeit errors in this 100 Philippine Peso bill.',
        originalImage: '/spot-diff/Original - 100 Peso Bill.jpg',
        editedImage: '/spot-diff/Edited - 100 Peso Bill.jpg',
        differences: [
            { id: 'diff-1', x: 55, y: 25, width: 35, height: 20, description: 'Missing digit in top-right serial number', difficulty: 'Easy' },
            { id: 'diff-2', x: 25, y: 50, width: 25, height: 25, description: 'Missing spur on the bird\'s back leg', difficulty: 'Medium' },
            { id: 'diff-3', x: 45, y: 15, width: 15, height: 20, description: 'Altered eye of the bird (spiral pattern)', difficulty: 'Hard' },
            { id: 'diff-4', x: 0, y: 30, width: 15, height: 35, description: 'Two horizontal lines added below the vertical 100', difficulty: 'Hard' },
            { id: 'diff-5', x: 55, y: 48, width: 35, height: 25, description: 'Altered signature block', difficulty: 'Hard' }
        ]
    },
    {
        id: 'peso-1000',
        title: '₱1000 Bill Inspection',
        category: 'Currency',
        description: 'Compare the new ₱1000 polymer bill with a suspected fake.',
        originalImage: '/spot-diff/Original - 1k Bill.jpg',
        editedImage: '/spot-diff/Edited - 1k Bill.jpg',
        differences: [
            { id: 'diff-1', x: 35, y: 60, width: 25, height: 25, description: 'Black line striking across the pearl', difficulty: 'Easy' },
            { id: 'diff-2', x: 5, y: 55, width: 28, height: 25, description: 'Baybayin script has been altered/scrambled', difficulty: 'Medium' },
            { id: 'diff-3', x: 88, y: 15, width: 12, height: 75, description: 'Decreased thickness of the right vertical security band', difficulty: 'Hard' }
        ]
    },
    {
        id: 'starbucks-logo',
        title: 'Starbucks Logo Audit',
        category: 'Brand Recognition',
        description: 'Identify the subtle changes made to this well-known brand logo.',
        originalImage: '/spot-diff/Original - Starbucks.png',
        editedImage: '/spot-diff/Edited- Starbucks.jpg',
        differences: [
            { id: 'diff-1', x: 40, y: 5, width: 20, height: 20, description: 'Missing five-pointed star on the crown', difficulty: 'Easy' },
            { id: 'diff-2', x: 40, y: 35, width: 20, height: 20, description: 'Altered eyes and mouth details', difficulty: 'Medium' }
        ]
    },
    {
        id: 'jollibee-logo',
        title: 'Jollibee Mascot Verification',
        category: 'Brand Recognition',
        description: 'Find the differences in this classic fast-food mascot.',
        originalImage: '/spot-diff/Original _ Jollibee.png',
        editedImage: '/spot-diff/Edited - Jollibee.jpg',
        differences: [
            { id: 'diff-1', x: 30, y: 35, width: 40, height: 25, description: 'Solid black pupils missing white glint reflections', difficulty: 'Medium' },
            { id: 'diff-2', x: 45, y: 10, width: 30, height: 25, description: 'Color change on the horn part', difficulty: 'Easy' },
            { id: 'diff-3', x: 55, y: 75, width: 25, height: 20, description: 'Color change on the tongue', difficulty: 'Easy' }
        ]
    },
    {
        id: 'pnb-logo',
        title: 'PNB Logo Authenticity',
        category: 'Corporate Identity',
        description: 'Spot what has been changed in the bank\'s official visual identity.',
        originalImage: '/spot-diff/Original - PNB.jpg',
        editedImage: '/spot-diff/Edited - PNB.jpg',
        differences: [
            { id: 'diff-1', x: 40, y: 5, width: 20, height: 20, description: 'Missing middle gold star above shield', difficulty: 'Easy' },
            { id: 'diff-2', x: 55, y: 50, width: 20, height: 30, description: 'Altered front paws on the lion', difficulty: 'Medium' }
        ]
    }
];

export function getPuzzles(count: number = 5): ImagePuzzle[] {
    const shuffled = [...PUZZLES];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
}
