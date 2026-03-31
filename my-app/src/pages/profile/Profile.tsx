
import { useState, useEffect } from 'react';
import { FaTrophy, FaDice, FaSave, FaUser, FaSmile, FaEye, FaTshirt, FaPalette } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Avatar, { genConfig } from 'react-nice-avatar';
import { AnimatedBackground } from '../games/MoneytaryMasteryComponents';
import { useUserContext } from '../../context/UserContext';
import { useAuth } from '../../context/AuthContext';
import { ACHIEVEMENTS, loadAchievements, getCompletionPercentage, CATEGORY_LABELS, type Achievement } from '../../utils/achievementSystem';
import { loadStreak } from '../../utils/streakSystem';

type ReactNiceAvatarConfig = ReturnType<typeof genConfig>;

const avatarConfigOptions = {
    sex: ['man', 'woman'],
    earSize: ['small', 'big'],
    hairStyle: ['normal', 'thick', 'mohawk', 'womanLong', 'womanShort'],
    hatStyle: ['beanie', 'turban', 'none'],
    eyeStyle: ['circle', 'oval', 'smile'],
    glassesStyle: ['round', 'square', 'none'],
    noseStyle: ['short', 'long', 'round'],
    mouthStyle: ['laugh', 'smile', 'peace'],
    shirtStyle: ['hoody', 'short', 'polo']
};

const GAME_MODES = [
    { name: 'Capital Cup', key: 'quizBeeHighScore', route: '/quiz-bee' },
    { name: 'Monetary Mastery', key: 'monetaryMasteryHighScore', route: '/monetary-mastery' },
    { name: 'Data Diver', key: 'wordHuntHighScore', route: '/word-hunt' },
    { name: 'Corporate Climb', key: 'crosswordHighScore', route: '/crossword' },
    { name: 'Speed Round', key: 'speedRoundHighScore', route: '/speed-round' },
    { name: 'Match Up', key: 'matchingGameHighScore', route: '/matching-game' },
    { name: 'Spot the Difference', key: 'spotDiffHighScore', route: '/spot-difference' },
];

function ProgressRing({ percent, size = 80, strokeWidth = 6, color = '#10b981' }: { percent: number; size?: number; strokeWidth?: number; color?: string }) {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percent / 100) * circumference;

    return (
        <svg width={size} height={size} className="transform -rotate-90">
            <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={strokeWidth} />
            <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} className="transition-all duration-1000 ease-out" />
        </svg>
    );
}

export function Profile() {
    const { xp, coins } = useUserContext();
    const { displayName, level, rank, avatarConfig: contextAvatarConfig, completeAvatarSetup } = useAuth();

    const [config, setConfig] = useState<ReactNiceAvatarConfig>(() => {
        return (contextAvatarConfig as unknown as ReactNiceAvatarConfig) || genConfig();
    });

    const [editName, setEditName] = useState(displayName || 'Player');
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState<'base' | 'face' | 'hair' | 'eyes' | 'mouth' | 'clothes' | 'bg'>('base');
    const [badgeFilter, setBadgeFilter] = useState<'all' | Achievement['category']>('all');

    const achievementProgress = loadAchievements();
    const achievementPercent = getCompletionPercentage();
    const streakData = loadStreak();

    const gamesPlayed = GAME_MODES.filter(g => localStorage.getItem(g.key)).length;
    const gameCompletionPercent = Math.round((gamesPlayed / GAME_MODES.length) * 100);

    const filteredAchievements = badgeFilter === 'all'
        ? ACHIEVEMENTS
        : ACHIEVEMENTS.filter(a => a.category === badgeFilter);

    useEffect(() => {
        if (!isEditing && contextAvatarConfig) {
            setConfig(contextAvatarConfig as unknown as ReactNiceAvatarConfig);
        }
        if (!isEditing && displayName) {
            setEditName(displayName);
        }
    }, [contextAvatarConfig, displayName, isEditing]);

    const handleRandomize = () => setConfig(genConfig());

    const handleSave = () => {
        completeAvatarSetup(config as any, editName);
        setIsEditing(false);
    };

    const updateConfig = (key: keyof ReactNiceAvatarConfig, value: string | boolean) => {
        setConfig(prev => ({ ...prev, [key]: value }));
    };

    const renderColorPicker = (label: string, value: string, onChange: (val: string) => void) => (
        <div className="flex flex-col gap-2">
            <label className="text-xs uppercase font-bold text-white/50">{label}</label>
            <div className="flex items-center gap-3">
                <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="w-10 h-10 rounded-lg border border-white/20 p-1 bg-white/5 cursor-pointer" />
                <span className="text-sm font-mono text-white/70">{value}</span>
            </div>
        </div>
    );

    const renderSelect = (label: string, key: keyof typeof avatarConfigOptions, value: string, onChange: (val: string) => void) => (
        <div className="flex flex-col gap-2">
            <label className="text-xs uppercase font-bold text-white/50">{label}</label>
            <div className="flex flex-wrap gap-2">
                {avatarConfigOptions[key].map((opt) => (
                    <button key={opt} onClick={() => onChange(opt)} className={`px-3 py-1.5 rounded-lg text-sm transition-colors border ${value === opt ? 'bg-blue-500 text-white border-blue-400' : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'}`}>
                        {opt}
                    </button>
                ))}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen relative overflow-hidden flex flex-col items-center"
            style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #1a1a2e 100%)' }}>
            <AnimatedBackground />

            <div className="relative z-10 w-full max-w-4xl px-4 py-20 flex flex-col gap-8">

                {/* Back link */}
                <Link to="/home" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-bold uppercase tracking-wider w-fit">
                    ← Back to Home
                </Link>

                {/* Header Card */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-2xl">
                    <div className="relative group shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-tr from-amber-400 to-orange-500 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative bg-gray-900 rounded-full p-2 w-48 h-48">
                            <Avatar className="w-full h-full" {...config} />
                        </div>
                        <button onClick={() => setIsEditing(!isEditing)} className="absolute bottom-2 right-2 bg-blue-500 hover:bg-blue-600 w-12 h-12 rounded-full border-4 border-gray-900 flex items-center justify-center text-white transition-colors shadow-lg z-10" title="Customize Avatar">
                            <FaPalette />
                        </button>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-4xl font-black text-white mb-2 tracking-tight">{displayName || 'Player'}</h1>
                        <p className="text-white/60 text-lg mb-4">{rank} • Level {level}</p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-3">
                            <span className="px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-sm font-bold">📅 Joined Jan 2026</span>
                            {streakData.currentStreak > 0 && (
                                <span className="px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-sm font-bold">🔥 {streakData.currentStreak}-Day Streak</span>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="text-center py-6 px-8 bg-white/5 rounded-2xl min-w-[160px] border border-white/5">
                            <div className="text-4xl font-black text-amber-400 mb-2">{Math.floor(xp / 2).toLocaleString()}</div>
                            <div className="text-sm text-white/50 uppercase tracking-wider font-bold">XP</div>
                        </div>
                        <div className="text-center py-6 px-8 bg-white/5 rounded-2xl min-w-[160px] border border-white/5">
                            <div className="text-4xl font-black text-yellow-400 mb-2">{coins.toLocaleString()}</div>
                            <div className="text-sm text-white/50 uppercase tracking-wider font-bold">Coins</div>
                        </div>
                    </div>
                </div>

                {/* Avatar Editor */}
                {isEditing && (
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 animate-fade-in text-white overflow-hidden">
                        <div className="flex flex-col gap-6 mb-6 border-b border-white/10 pb-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold flex items-center gap-2"><span>🎨</span> Customize Profile</h2>
                                <div className="flex gap-2">
                                    <button onClick={handleRandomize} className="px-4 py-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30 font-bold text-sm flex items-center gap-2 transition-colors"><FaDice /> Randomize</button>
                                    <button onClick={handleSave} className="px-4 py-2 rounded-xl bg-green-500/20 text-green-300 border border-green-500/30 hover:bg-green-500/30 font-bold text-sm flex items-center gap-2 transition-colors"><FaSave /> Save Changes</button>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs uppercase font-bold text-white/50 tracking-wider">Display Name</label>
                                <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} maxLength={15} className="w-full max-w-md bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:border-blue-500 transition-all placeholder:text-white/20" placeholder="Enter your name" />
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                                {[
                                    { id: 'base', icon: <FaUser />, label: 'Base' },
                                    { id: 'face', icon: <FaSmile />, label: 'Face' },
                                    { id: 'hair', icon: <FaUser />, label: 'Hair' },
                                    { id: 'eyes', icon: <FaEye />, label: 'Eyes' },
                                    { id: 'mouth', icon: <FaSmile />, label: 'Mouth' },
                                    { id: 'clothes', icon: <FaTshirt />, label: 'Clothes' },
                                    { id: 'bg', icon: <FaPalette />, label: 'Bg' },
                                ].map((tab) => (
                                    <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`p-3 rounded-xl flex items-center gap-3 transition-all min-w-[100px] md:min-w-[140px] ${activeTab === tab.id ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'}`}>
                                        <span className="text-lg">{tab.icon}</span>
                                        <span className="font-bold text-sm">{tab.label}</span>
                                    </button>
                                ))}
                            </div>

                            <div className="flex-1 bg-black/20 rounded-2xl p-6 min-h-[300px]">
                                {activeTab === 'base' && (<div className="space-y-6">{renderSelect('Sex', 'sex', config.sex || 'man', (v) => updateConfig('sex', v))}{renderSelect('Ear Size', 'earSize', config.earSize || 'small', (v) => updateConfig('earSize', v))}</div>)}
                                {activeTab === 'face' && (<div className="space-y-6">{renderColorPicker('Skin Color', config.faceColor || '#F9C9B6', (v) => updateConfig('faceColor', v))}</div>)}
                                {activeTab === 'hair' && (<div className="space-y-6">{renderSelect('Hair Style', 'hairStyle', config.hairStyle || 'normal', (v) => updateConfig('hairStyle', v))}{renderColorPicker('Hair Color', config.hairColor || '#000000', (v) => updateConfig('hairColor', v))}{renderSelect('Hat Style', 'hatStyle', config.hatStyle || 'none', (v) => updateConfig('hatStyle', v))}{config.hatStyle !== 'none' && renderColorPicker('Hat Color', config.hatColor || '#000000', (v) => updateConfig('hatColor', v))}</div>)}
                                {activeTab === 'eyes' && (<div className="space-y-6">{renderSelect('Eye Style', 'eyeStyle', config.eyeStyle || 'oval', (v) => updateConfig('eyeStyle', v))}{renderSelect('Glasses', 'glassesStyle', config.glassesStyle || 'none', (v) => updateConfig('glassesStyle', v))}</div>)}
                                {activeTab === 'mouth' && (<div className="space-y-6">{renderSelect('Nose Style', 'noseStyle', config.noseStyle || 'short', (v) => updateConfig('noseStyle', v))}{renderSelect('Mouth Style', 'mouthStyle', config.mouthStyle || 'smile', (v) => updateConfig('mouthStyle', v))}</div>)}
                                {activeTab === 'clothes' && (<div className="space-y-6">{renderSelect('Shirt Style', 'shirtStyle', config.shirtStyle || 'hoody', (v) => updateConfig('shirtStyle', v))}{renderColorPicker('Shirt Color', config.shirtColor || '#fff', (v) => updateConfig('shirtColor', v))}</div>)}
                                {activeTab === 'bg' && (<div className="space-y-6">{renderColorPicker('Background Color', config.bgColor || '#ff9090', (v) => updateConfig('bgColor', v))}<div className="flex items-center gap-3"><input title="Gradient toggle" type="checkbox" checked={config.isGradient} onChange={(e) => updateConfig('isGradient', e.target.checked)} className="w-5 h-5 rounded border-white/20 bg-white/5 checked:bg-blue-500" /><label className="text-sm font-bold text-white/70">Enable Gradient</label></div></div>)}
                            </div>
                        </div>
                    </div>
                )}

                {/* ─── Performance Dashboard ───────────────────────── */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <span className="text-indigo-400">📊</span> Performance Dashboard
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex flex-col items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                            <div className="relative">
                                <ProgressRing percent={gameCompletionPercent} color="#3b82f6" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-lg font-black text-blue-400">{gameCompletionPercent}%</span>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-white font-bold text-sm">Game Modes</div>
                                <div className="text-white/40 text-xs">{gamesPlayed}/{GAME_MODES.length} Played</div>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                            <div className="relative">
                                <ProgressRing percent={achievementPercent} color="#10b981" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-lg font-black text-emerald-400">{achievementPercent}%</span>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-white font-bold text-sm">Achievements</div>
                                <div className="text-white/40 text-xs">{achievementProgress.unlockedIds.length}/{ACHIEVEMENTS.length} Unlocked</div>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                            <div className="relative">
                                <ProgressRing percent={Math.min(100, (streakData.longestStreak / 30) * 100)} color="#f59e0b" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-lg font-black text-amber-400">{streakData.longestStreak}</span>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-white font-bold text-sm">Best Streak</div>
                                <div className="text-white/40 text-xs">{streakData.checkInHistory.length} Total Check-ins</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <span className="text-blue-400">📊</span> Recent Activity
                        </h2>
                        <div className="space-y-4">
                            {[
                                { game: 'Monetary Mastery', action: 'Completed Level 3', time: '2 mins ago', xp: '+150 XP' },
                                { game: 'Corporate Climb', action: 'Solved Daily Puzzle', time: '1 hour ago', xp: '+300 XP' },
                                { game: 'Data Diver', action: 'New High Score', time: 'Yesterday', xp: '+500 XP' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                                    <div>
                                        <div className="text-white font-medium">{item.game}</div>
                                        <div className="text-white/40 text-sm">{item.action} • {item.time}</div>
                                    </div>
                                    <div className="text-amber-400 font-bold text-sm bg-amber-400/10 px-3 py-1 rounded-full">{item.xp}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <span className="text-purple-400">🎮</span> Game Mode Progress
                        </h2>
                        <div className="space-y-3">
                            {GAME_MODES.map(game => {
                                const played = !!localStorage.getItem(game.key);
                                return (
                                    <Link key={game.key} to={game.route} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors border border-white/5 no-underline">
                                        <span className={`font-bold text-sm ${played ? 'text-white' : 'text-white/40'}`}>{game.name}</span>
                                        <span className={`text-[10px] uppercase tracking-widest font-black px-2.5 py-1 rounded-full ${played ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-white/5 text-white/30 border border-white/10'}`}>
                                            {played ? '✓ Played' : 'Not Played'}
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* ─── Achievement Badges ───────────────────────── */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <span className="text-yellow-400"><FaTrophy /></span> Achievement Badges
                        </h2>
                        <span className="text-white/40 text-xs font-bold">
                            {achievementProgress.unlockedIds.length}/{ACHIEVEMENTS.length} Unlocked
                        </span>
                    </div>

                    <div className="flex gap-1.5 mb-6 overflow-x-auto pb-1 scrollbar-hide">
                        <button
                            onClick={() => setBadgeFilter('all')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shrink-0 ${
                                badgeFilter === 'all' ? 'bg-white/15 text-white border border-white/20' : 'bg-white/5 text-white/40 border border-white/5 hover:text-white/60'
                            }`}
                        >
                            All
                        </button>
                        {(Object.keys(CATEGORY_LABELS) as Achievement['category'][]).map(cat => (
                            <button
                                key={cat}
                                onClick={() => setBadgeFilter(cat)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shrink-0 ${
                                    badgeFilter === cat ? 'bg-white/15 text-white border border-white/20' : 'bg-white/5 text-white/40 border border-white/5 hover:text-white/60'
                                }`}
                            >
                                {CATEGORY_LABELS[cat].icon} {CATEGORY_LABELS[cat].label}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {filteredAchievements.map(achievement => {
                            const isUnlocked = achievementProgress.unlockedIds.includes(achievement.id);
                            return (
                                <div
                                    key={achievement.id}
                                    className={`p-4 rounded-xl border flex flex-col items-center text-center gap-2 transition-all duration-200 ${
                                        isUnlocked
                                            ? 'bg-gradient-to-br from-emerald-500/15 to-teal-500/15 border-emerald-500/30 hover:scale-[1.02]'
                                            : 'bg-white/5 border-white/5 grayscale opacity-50'
                                    }`}
                                    title={achievement.description}
                                >
                                    <div className="text-3xl mb-1">{achievement.icon}</div>
                                    <div className="text-white font-bold text-xs">{achievement.title}</div>
                                    <div className="text-white/40 text-[10px] leading-tight">{achievement.description}</div>
                                    <div className={`text-[9px] uppercase tracking-widest font-black mt-1 ${isUnlocked ? 'text-emerald-400' : 'text-white/20'}`}>
                                        {isUnlocked ? '✓ Unlocked' : achievement.requirement}
                                    </div>
                                    {isUnlocked && (
                                        <div className="flex gap-1.5 mt-1">
                                            <span className="text-[9px] font-bold text-amber-400">+{achievement.xpReward} XP</span>
                                            {achievement.coinReward > 0 && <span className="text-[9px] font-bold text-yellow-400">+{achievement.coinReward} 🪙</span>}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
