import React from 'react';
import type { TargetWord } from './data';
import {
    FaMoneyBillWave,
    FaChartLine,
    FaUniversity,
    FaExclamationTriangle,
    FaGlobeAmericas,
    FaLayerGroup,
    FaFileContract,
    FaChartBar,
    FaCheckCircle,
    FaBalanceScale,
    FaFileInvoiceDollar,
    FaPercentage,
    FaTag,
    FaListOl,
    FaStopwatch,
    FaBook,
    FaEuroSign,
    FaLevelUpAlt,
    FaTicketAlt,
    FaExchangeAlt,
    FaHandshake,
    FaFileSignature,
    FaCalculator,
    FaChartPie,
    FaCalendarCheck,
    FaSeedling,
    // New Icons
    FaShoppingCart,
    FaLightbulb,
    FaHardHat,
    FaHandHoldingUsd,
    FaLaptopCode,
    FaArrowsAltH,
    FaShieldAlt,
    FaGem,
    FaTint,
    FaShoppingBasket,
    FaBoxOpen,
    FaShoppingBag,
    FaRulerHorizontal,
    FaCreditCard,
    FaSlidersH,
    FaInfinity,
    FaIndustry,
    FaBoxes,
    FaPuzzlePiece,
    FaTrophy,
    FaHourglassHalf,
    FaUserTie
} from 'react-icons/fa';

interface WordListProps {
    words: TargetWord[];
}

const getIcon = (word: string) => {
    switch (word.toUpperCase()) {
        // Beginner
        case 'MONETARY POLICY': return <FaUniversity className="text-amber-400" />;
        case 'INVESTMENTS': return <FaChartLine className="text-blue-400" />;
        case 'CASH FLOW': return <FaMoneyBillWave className="text-green-400" />;
        case 'RISK RETURN': return <FaExclamationTriangle className="text-red-400" />;
        case 'ECONOMICS': return <FaGlobeAmericas className="text-indigo-400" />;
        case 'DIVERSIFY': return <FaLayerGroup className="text-purple-400" />;
        case 'BONDS': return <FaFileContract className="text-yellow-200" />;
        case 'STOCKS': return <FaChartBar className="text-pink-400" />;

        // Intermediate
        case 'COST OF CAPITAL': return <FaBalanceScale className="text-orange-400" />;
        case 'STRAIGHT BONDS': return <FaFileInvoiceDollar className="text-emerald-400" />;
        case 'CURRENT YIELD': return <FaPercentage className="text-cyan-400" />;
        case 'MARKET VALUE': return <FaTag className="text-rose-400" />;
        case 'SERIAL BONDS': return <FaListOl className="text-violet-400" />;
        case 'QUICK RATIO': return <FaStopwatch className="text-blue-500" />;
        case 'BOOK VALUE': return <FaBook className="text-amber-600" />;
        case 'EUROBONDS': return <FaEuroSign className="text-yellow-400" />;
        case 'LEVERAGE': return <FaLevelUpAlt className="text-green-500" />;

        // Expert
        case 'COUPON INTEREST': return <FaTicketAlt className="text-pink-500" />;
        case 'CONVERTIBILITY': return <FaExchangeAlt className="text-indigo-500" />;
        case 'TRADE CREDIT': return <FaHandshake className="text-teal-400" />;
        case 'INDENTURE': return <FaFileSignature className="text-gray-300" />;
        case 'EBIT': return <FaCalculator className="text-orange-500" />;
        case 'CAPM': return <FaChartPie className="text-purple-500" />;
        case 'EAR': return <FaCalendarCheck className="text-blue-300" />;
        case 'DGM': return <FaSeedling className="text-green-300" />;

        // Beginner 2 & 3
        case 'CONSUMERS': return <FaShoppingCart className="text-pink-400" />;
        case 'OPPORTUNITY': return <FaLightbulb className="text-yellow-300" />;
        case 'LABOR': return <FaHardHat className="text-orange-500" />;
        case 'LENDING': return <FaHandHoldingUsd className="text-green-400" />;
        case 'AVAILABLE': return <FaBoxes className="text-blue-300" />;
        case 'TECHNOLOGY': return <FaLaptopCode className="text-purple-400" />;
        case 'ELASTICITY': return <FaArrowsAltH className="text-indigo-400" />;
        case 'RISKFREE': return <FaShieldAlt className="text-teal-400" />;
        case 'ASSETS': return <FaGem className="text-emerald-400" />;
        case 'LIQUIDITY': return <FaTint className="text-cyan-400" />;
        case 'DEMAND': return <FaShoppingBasket className="text-rose-400" />;
        case 'INPUTS': return <FaBoxOpen className="text-amber-500" />;
        case 'LOAN': return <FaFileInvoiceDollar className="text-red-400" />;
        case 'YIELD': return <FaSeedling className="text-green-500" />;
        case 'TRUST': return <FaHandshake className="text-blue-400" />;
        case 'RISK': return <FaExclamationTriangle className="text-orange-400" />;
        case 'BUYERS': return <FaShoppingBag className="text-violet-400" />;

        // Intermediate 2 & 3
        case 'MARGINAL': return <FaRulerHorizontal className="text-gray-400" />;
        case 'CREDIT SCORE': return <FaCreditCard className="text-blue-500" />;
        case 'VARIABLE': return <FaSlidersH className="text-indigo-500" />;
        case 'UNLIMITED': return <FaInfinity className="text-purple-500" />;
        case 'CREDITORS': return <FaUserTie className="text-teal-500" />;
        case 'MACROECONOMICS': return <FaGlobeAmericas className="text-blue-600" />;
        case 'SHORTRUN': return <FaStopwatch className="text-red-500" />;
        case 'SHORTAGE': return <FaExclamationTriangle className="text-orange-500" />;
        case 'EQUITY': return <FaChartPie className="text-cyan-500" />;
        case 'PAYMENT': return <FaMoneyBillWave className="text-green-500" />;
        case 'LENDER': return <FaHandHoldingUsd className="text-yellow-500" />;
        case 'FUTURE': return <FaCalendarCheck className="text-pink-500" />;

        // Expert 2 & 3
        case 'SHAREHOLDER': return <FaUserTie className="text-blue-400" />;
        case 'OBLIGATION': return <FaFileContract className="text-gray-300" />;
        case 'EFFICIENT': return <FaStopwatch className="text-green-400" />;
        case 'VALUATION': return <FaTag className="text-yellow-400" />;
        case 'EXPECTATIONS': return <FaLightbulb className="text-purple-400" />;
        case 'PORTFOLIOS': return <FaLayerGroup className="text-indigo-400" />;
        case 'PRODUCTION': return <FaIndustry className="text-orange-400" />;
        case 'INVENTORY': return <FaBoxes className="text-amber-400" />;
        case 'MATCHING': return <FaPuzzlePiece className="text-teal-400" />;
        case 'INEFFICIENCY': return <FaExclamationTriangle className="text-red-500" />;
        case 'MANAGEMENT': return <FaUserTie className="text-blue-500" />;
        case 'SOCIAL': return <FaGlobeAmericas className="text-green-500" />;
        case 'RESOURCES': return <FaGem className="text-emerald-500" />;
        case 'RATIONALITY': return <FaBalanceScale className="text-indigo-500" />;
        case 'ACQUISITION': return <FaHandshake className="text-pink-500" />;
        case 'COMPETITION': return <FaTrophy className="text-yellow-500" />;
        case 'FISCAL': return <FaUniversity className="text-gray-500" />;
        case 'INVESTMENT': return <FaChartLine className="text-blue-500" />;
        case 'SCARCITY': return <FaHourglassHalf className="text-orange-500" />;
        case 'SUBSTITUTES': return <FaExchangeAlt className="text-purple-500" />;

        default: return <FaMoneyBillWave className="text-gray-400" />;
    }
};

export const WordList: React.FC<WordListProps> = ({ words }) => {
    const [selectedWordIndex, setSelectedWordIndex] = React.useState<number | null>(null);
    const foundCount = words.filter(w => w.isFound).length;
    const progress = (foundCount / words.length) * 100;
    const isCompact = words.length > 5; // Use smaller cards when many words

    const handleCardClick = (index: number) => {
        if (selectedWordIndex === index) {
            setSelectedWordIndex(null);
        } else {
            setSelectedWordIndex(index);
        }
    };

    return (
        <div className="rounded-[2rem] p-4 flex flex-col max-h-full overflow-hidden relative"
            style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)'
            }}
        >
            <div className="mb-4 flex-shrink-0">
                <h2 className="text-2xl font-black mb-2 text-white tracking-wide border-b border-white/10 pb-2">
                    MISSIONS
                </h2>
                <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden mt-2">
                    <div
                        className="h-full transition-all duration-500 ease-out"
                        style={{
                            width: `${progress}%`,
                            background: 'linear-gradient(135deg, #ffd700 0%, #ff6b35 100%)'
                        }}
                    />
                </div>
                <div className="flex justify-between items-center mt-1 text-xs text-gray-400 font-medium">
                    <span>Progress</span>
                    <span className="text-amber-400">{foundCount} / {words.length}</span>
                </div>
            </div>

            <div className="flex flex-col gap-2 flex-1 min-h-0 relative">
                {/* Detail View */}
                <div className={`
                    absolute inset-0 z-20 flex flex-col items-center justify-center p-4 text-center
                    transition-all duration-300 transform
                    ${selectedWordIndex !== null ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}
                `}>
                    {selectedWordIndex !== null && (
                        <>
                            <div className={`
                                w-24 h-24 rounded-full flex items-center justify-center text-4xl mb-6 shadow-xl
                                ${words[selectedWordIndex].isFound ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-amber-400'}
                            `}>
                                {getIcon(words[selectedWordIndex].word)}
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-4">
                                {words[selectedWordIndex].word}
                            </h3>

                            <div className="bg-black/20 p-4 rounded-xl border border-white/5 w-full">
                                <p className="text-sm md:text-base leading-relaxed text-gray-300">
                                    {words[selectedWordIndex].description}
                                </p>
                            </div>

                            <button
                                onClick={() => setSelectedWordIndex(null)}
                                className="mt-6 px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-bold tracking-wide transition-colors"
                            >
                                BACK TO LIST
                            </button>
                        </>
                    )}
                </div>

                {/* List View */}
                <div className={`
                    flex flex-col gap-2 flex-1 min-h-0 transition-opacity duration-300 overflow-y-auto pr-2
                    ${selectedWordIndex !== null ? 'opacity-0 pointer-events-none' : 'opacity-100'}
                `}>
                    {/* Unfound Words */}
                    {words.filter(w => !w.isFound).map((word) => {
                        const originalIndex = words.indexOf(word);
                        return (
                            <div
                                key={originalIndex}
                                onClick={() => handleCardClick(originalIndex)}
                                className={`relative overflow-hidden rounded-xl px-3 border transition-all duration-300 group shrink-0 flex items-center cursor-pointer hover:scale-[1.02] active:scale-95 bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20 ${isCompact ? 'h-11 py-1' : 'h-16 py-2'}`}
                            >
                                <div className="flex items-center gap-2 w-full">
                                    <div className={`rounded-lg flex items-center justify-center flex-shrink-0 bg-gray-800/50 ${isCompact ? 'p-1.5 text-sm' : 'p-2 text-lg'}`}>
                                        {getIcon(word.word)}
                                    </div>
                                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                                        <h3 className={`font-bold truncate text-white ${isCompact ? 'text-xs' : 'text-sm'}`}>{word.word}</h3>
                                        <p className={`leading-tight truncate text-gray-400 group-hover:text-gray-300 ${isCompact ? 'text-[9px]' : 'text-[10px]'}`}>{word.description}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* Found Words Section */}
                    {foundCount > 0 && (
                        <>
                            <div className="flex items-center gap-2 mt-3 mb-1 flex-shrink-0">
                                <div className="h-px flex-1 bg-green-500/20" />
                                <span className="text-xs font-bold text-green-400/80 tracking-wider uppercase">Found ({foundCount})</span>
                                <div className="h-px flex-1 bg-green-500/20" />
                            </div>
                            {words.filter(w => w.isFound).map((word) => {
                                const originalIndex = words.indexOf(word);
                                return (
                                    <div
                                        key={originalIndex}
                                        onClick={() => handleCardClick(originalIndex)}
                                        className={`relative overflow-hidden rounded-xl px-3 border transition-all duration-300 group shrink-0 flex items-center cursor-pointer hover:scale-[1.02] active:scale-95 bg-green-500/10 border-green-500/30 shadow-[0_0_10px_rgba(34,197,94,0.1)] ${isCompact ? 'h-10 py-1' : 'h-14 py-2'}`}
                                    >
                                        <div className="flex items-center gap-2 w-full">
                                            <div className={`rounded-lg flex items-center justify-center flex-shrink-0 bg-green-500/20 ${isCompact ? 'p-1.5 text-sm' : 'p-2 text-lg'}`}>
                                                {getIcon(word.word)}
                                            </div>
                                            <div className="flex-1 min-w-0 flex flex-col justify-center">
                                                <h3 className={`font-bold truncate text-green-400 ${isCompact ? 'text-xs' : 'text-sm'}`}>{word.word}</h3>
                                                <p className={`leading-tight truncate text-green-200/70 ${isCompact ? 'text-[9px]' : 'text-[10px]'}`}>{word.description}</p>
                                            </div>
                                            <div className="text-green-400 flex-shrink-0">
                                                <FaCheckCircle size={isCompact ? 12 : 14} />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
