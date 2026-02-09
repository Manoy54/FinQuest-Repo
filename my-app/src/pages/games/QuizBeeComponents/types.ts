
export type Difficulty = 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT';

export interface Question {
    id: number;
    question: string;
    options: { [key: string]: string };
    correctAnswer: string;
}

export interface GameState {
    currentTier: Difficulty;
    currentQuestionIndex: number;
    score: number;
    lives: number;
    status: 'START' | 'PLAYING' | 'TIER_COMPLETE' | 'GAME_OVER' | 'VICTORY';
    lifelines: {
        fiftyFifty: boolean;
        timeFreeze: boolean;
        skip: boolean;
    };
}
