import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaLock, FaSearch, FaBookOpen, FaFilePowerpoint, FaStickyNote, FaVideo } from 'react-icons/fa';
import { AnimatedBackground } from '../games/MoneytaryMasteryComponents';

type ContentType = 'all' | 'modules' | 'notes' | 'presentations' | 'videos';

interface LibraryItem {
    id: string;
    title: string;
    author: string;
    type: 'module' | 'notes' | 'presentation' | 'video';
    category: string;
    isPremium: boolean;
    description: string;
    icon: string;
}

const libraryItems: LibraryItem[] = [
    { id: '1', title: 'Introduction to Philippine Banking', author: 'FinQuest Team', type: 'module', category: 'Banking', isPremium: false, description: 'Learn about the banking system in the Philippines, BSP, and how commercial banks operate.', icon: '🏦' },
    { id: '2', title: 'Understanding Taxes in the PH', author: 'Prof. Garcia', type: 'notes', category: 'Taxation', isPremium: false, description: 'Comprehensive notes covering BIR, TIN, income tax brackets, and VAT in the Philippines.', icon: '📋' },
    { id: '3', title: 'Stock Market 101', author: 'FinQuest Team', type: 'presentation', category: 'Investing', isPremium: true, description: 'Visual presentation covering PSEi, stock trading, and basic investment strategies.', icon: '📈' },
    { id: '4', title: 'Budgeting for Students', author: 'Maria Santos', type: 'module', category: 'Personal Finance', isPremium: false, description: 'Practical guide to budgeting with the 50-30-20 rule, expense tracking, and saving tips.', icon: '💰' },
    { id: '5', title: 'Social Security Systems Explained', author: 'FinQuest Team', type: 'notes', category: 'Social Security', isPremium: false, description: 'Overview of SSS, GSIS, Pag-IBIG, and PhilHealth — contributions, benefits, and claims.', icon: '🛡️' },
    { id: '6', title: 'Compound Interest Deep Dive', author: 'Prof. Reyes', type: 'video', category: 'Personal Finance', isPremium: true, description: 'Video lecture explaining compound interest with real-world examples and calculations.', icon: '📹' },
    { id: '7', title: 'Cryptocurrency & Digital Assets', author: 'Tech Finance PH', type: 'presentation', category: 'Investing', isPremium: true, description: 'Understanding crypto, blockchain, and digital asset regulation in the Philippines.', icon: '🪙' },
    { id: '8', title: 'Financial Statements Analysis', author: 'Prof. Bautista', type: 'module', category: 'Accounting', isPremium: true, description: 'Learn to read and analyze balance sheets, income statements, and cash flow statements.', icon: '📊' },
    { id: '9', title: 'Insurance Basics for Filipinos', author: 'FinQuest Team', type: 'notes', category: 'Insurance', isPremium: false, description: 'Types of insurance, coverage options, and how to choose the right insurance plan.', icon: '🏥' },
    { id: '10', title: 'Entrepreneurship & Business Planning', author: 'DTI Philippines', type: 'module', category: 'Business', isPremium: true, description: 'Business plan creation, DTI registration, and startup financing options in the Philippines.', icon: '🚀' },
    { id: '11', title: 'Real Estate Investment Guide', author: 'Property Expert PH', type: 'presentation', category: 'Investing', isPremium: true, description: 'Guide to real estate investing, property valuation, and REIT investing in the Philippines.', icon: '🏠' },
    { id: '12', title: 'Emergency Fund Planning', author: 'FinQuest Team', type: 'notes', category: 'Personal Finance', isPremium: false, description: 'How to build and maintain an emergency fund — why 3-6 months of expenses matters.', icon: '🆘' },
];

const typeIcons: Record<string, React.ReactNode> = {
    module: <FaBookOpen className="text-blue-400" />,
    notes: <FaStickyNote className="text-emerald-400" />,
    presentation: <FaFilePowerpoint className="text-orange-400" />,
    video: <FaVideo className="text-purple-400" />,
};

const typeLabels: Record<string, string> = {
    module: 'Module',
    notes: 'Notes',
    presentation: 'Presentation',
    video: 'Video',
};

export function LibraryPage() {
    const [filter, setFilter] = useState<ContentType>('all');
    const [search, setSearch] = useState('');

    const filtered = libraryItems.filter(item => {
        const matchesFilter = filter === 'all' || item.type === filter.replace(/s$/, '');
        const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.category.toLowerCase().includes(search.toLowerCase()) ||
            item.author.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div
            className="min-h-screen relative overflow-hidden flex flex-col items-center"
            style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #1a1a2e 100%)' }}
        >
            <AnimatedBackground />

            <div className="relative z-10 w-full max-w-6xl px-4 py-8 flex flex-col gap-6">
                {/* Back */}
                <Link
                    to="/home"
                    className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-bold uppercase tracking-wider w-fit"
                >
                    <FaArrowLeft className="w-3 h-3" /> Back to Home
                </Link>

                {/* Header */}
                <div className="text-center">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tight">
                        📚 The Vault of{' '}
                        <span
                            style={{
                                background: 'linear-gradient(135deg, #ffd700 0%, #ff6b35 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Knowledge
                        </span>
                    </h1>
                    <p className="text-white/40 text-sm max-w-lg mx-auto">
                        Browse modules, notes, presentations, and video lectures from educators and the FinQuest community.
                    </p>
                </div>

                {/* Search + Filters */}
                <div className="flex flex-col md:flex-row gap-3">
                    <div className="flex-1 relative">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-sm" />
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search modules, topics, authors..."
                            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-medium focus:outline-none focus:border-indigo-500 transition-all placeholder:text-white/20"
                        />
                    </div>
                    <div className="flex gap-1.5 bg-white/5 p-1 rounded-xl border border-white/10">
                        {(['all', 'modules', 'notes', 'presentations', 'videos'] as ContentType[]).map(type => (
                            <button
                                key={type}
                                onClick={() => setFilter(type)}
                                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                                    filter === type
                                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                                        : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                                }`}
                            >
                                {type === 'all' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map(item => (
                        <div
                            key={item.id}
                            className={`relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 flex flex-col gap-3 transition-transform hover:-translate-y-1 duration-300 ${
                                item.isPremium ? 'opacity-80' : ''
                            }`}
                        >
                            {item.isPremium && (
                                <div className="absolute top-3 right-3">
                                    <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-black uppercase tracking-wider border border-amber-500/30">
                                        <FaLock className="w-2.5 h-2.5" /> Premium
                                    </span>
                                </div>
                            )}

                            <div className="flex items-center gap-3 mb-1">
                                <div className="text-3xl">{item.icon}</div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-white font-black text-sm truncate">{item.title}</h3>
                                    <p className="text-white/40 text-[11px]">by {item.author}</p>
                                </div>
                            </div>

                            <p className="text-white/50 text-xs leading-relaxed flex-1">{item.description}</p>

                            <div className="flex items-center justify-between mt-1">
                                <div className="flex items-center gap-2">
                                    <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-white/40">
                                        {typeIcons[item.type]} {typeLabels[item.type]}
                                    </span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-300 bg-indigo-500/20 px-2 py-0.5 rounded-full border border-indigo-500/30">
                                        {item.category}
                                    </span>
                                </div>
                            </div>

                            <button
                                disabled={item.isPremium}
                                className={`w-full py-2.5 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 ${
                                    item.isPremium
                                        ? 'bg-white/5 text-white/30 border border-white/5 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-400 hover:to-purple-400 shadow-lg shadow-indigo-500/10'
                                }`}
                            >
                                {item.isPremium ? '🔒 Unlock with Prime' : 'Open'}
                            </button>
                        </div>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-4xl mb-3">📭</div>
                        <p className="text-white/40 text-sm">No results found for your search.</p>
                    </div>
                )}

                {/* Footer */}
                <div className="text-center py-4">
                    <p className="text-white/20 text-xs">
                        Premium content can be unlocked with a Student Prime or Educator Prime subscription.
                    </p>
                </div>
            </div>
        </div>
    );
}
