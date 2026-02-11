

import type { Question } from './types';

interface QuestionCardProps {
    question: Question;
    selectedOption: string | null;
    onSelectOption: (option: string) => void;
    disabled: boolean;
    hiddenOptions: string[]; // For 50/50
    showFeedback: boolean; // True after answer is locked
}

export function QuestionCard({
    question,
    selectedOption,
    onSelectOption,
    disabled,
    hiddenOptions,
    showFeedback
}: QuestionCardProps) {

    const getOptionStyle = (key: string) => {
        const isSelected = selectedOption === key;
        const isCorrect = key === question.correctAnswer;

        // Base style
        let style = {
            background: 'rgba(255, 255, 255, 0.05)',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            transform: 'scale(1)',
            boxShadow: 'none'
        };

        if (showFeedback) {
            if (isCorrect) {
                // Correct answer (whether selected or not)
                style = {
                    background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                    borderColor: '#4ade80',
                    transform: 'scale(1.02)',
                    boxShadow: '0 4px 15px rgba(34, 197, 94, 0.4)'
                };
            } else if (isSelected && !isCorrect) {
                // Wrong selection
                style = {
                    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                    borderColor: '#f87171',
                    transform: 'scale(0.98)',
                    boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4)'
                };
            } else {
                // Other unselected options
                style.background = 'rgba(255, 255, 255, 0.03)';
                style.borderColor = 'transparent';
            }
        } else if (isSelected) {
            // Just selected, no feedback yet
            style = {
                background: 'rgba(255, 215, 0, 0.2)',
                borderColor: '#ffd700',
                transform: 'scale(1.02)',
                boxShadow: '0 4px 15px rgba(255, 215, 0, 0.2)'
            };
        }

        return style;
    };

    return (
        <div className="w-full max-w-3xl backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden flex flex-col max-h-[65vh] md:max-h-[70vh]">
            {/* Glow effect */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar relative z-10">
                <h2
                    className={`font-bold text-white mb-6 leading-relaxed relative z-10 text-center ${question.question.length > 200 ? 'text-lg' :
                        question.question.length > 100 ? 'text-xl' :
                            'text-2xl'
                        }`}
                    style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
                >
                    {question.question}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 relative z-10">
                    {Object.entries(question.options).map(([key, value]) => {
                        if (hiddenOptions.includes(key)) return <div key={key} className="invisible" />;

                        const style = getOptionStyle(key);

                        return (
                            <button
                                key={key}
                                onClick={() => !disabled && onSelectOption(key)}
                                disabled={disabled || showFeedback}
                                className="group relative flex items-start p-4 rounded-xl text-left transition-all duration-300 hover:bg-white/10 active:scale-98 border-2"
                                style={style}
                            >
                                <div
                                    className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 text-xl font-bold shrink-0 transition-colors ${showFeedback && key === question.correctAnswer ? 'bg-white/20 text-white' :
                                        selectedOption === key ? 'bg-amber-400 text-black' : 'bg-white/10 text-white/70 group-hover:bg-white/20 group-hover:text-white'
                                        }`}
                                >
                                    {key}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <span className="text-lg font-medium text-white/90 group-hover:text-white block break-words">{value}</span>
                                    {showFeedback && question.explanations?.[key] && (
                                        <div className={`mt-3 p-3 rounded-lg text-sm leading-relaxed animate-in fade-in slide-in-from-top-2 duration-500 ${key === question.correctAnswer
                                                ? 'bg-green-500/20 text-green-100 border border-green-500/30'
                                                : selectedOption === key
                                                    ? 'bg-red-500/20 text-red-100 border border-red-500/30'
                                                    : 'bg-white/5 text-white/60 border border-white/10'
                                            }`}>
                                            <span className="font-bold mr-1">{key === question.correctAnswer ? '✓ Why it’s correct:' : '✗ Why it’s incorrect:'}</span>
                                            {question.explanations[key]}
                                        </div>
                                    )}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
