
import { useState, useEffect } from 'react';
import { FaTrophy, FaStar, FaDice, FaSave, FaUser, FaSmile, FaEye, FaTshirt, FaPalette } from 'react-icons/fa';
import Avatar, { genConfig } from 'react-nice-avatar';
import { AnimatedBackground } from '../games/MoneytaryMasteryComponents';
import { useUserContext } from '../../context/UserContext';
import { useAuth } from '../../context/AuthContext';

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

export function Profile() {
    const { xp, coins } = useUserContext();
    const { displayName, level, rank, avatarConfig: contextAvatarConfig, completeAvatarSetup } = useAuth();

    const [config, setConfig] = useState<ReactNiceAvatarConfig>(() => {
        return (contextAvatarConfig as unknown as ReactNiceAvatarConfig) || genConfig();
    });

    // Local state for editing name
    const [editName, setEditName] = useState(displayName || 'Player');

    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState<'base' | 'face' | 'hair' | 'eyes' | 'mouth' | 'clothes' | 'bg'>('base');

    // Sync context changes to local state when not editing
    useEffect(() => {
        if (!isEditing && contextAvatarConfig) {
            setConfig(contextAvatarConfig as unknown as ReactNiceAvatarConfig);
        }
        if (!isEditing && displayName) {
            setEditName(displayName);
        }
    }, [contextAvatarConfig, displayName, isEditing]);

    const handleRandomize = () => {
        setConfig(genConfig());
    };

    const handleSave = () => {
        // Save both avatar and name
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
                <input
                    type="color"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-10 h-10 rounded-lg border border-white/20 p-1 bg-white/5 cursor-pointer"
                />
                <span className="text-sm font-mono text-white/70">{value}</span>
            </div>
        </div>
    );

    const renderSelect = (label: string, key: keyof typeof avatarConfigOptions, value: string, onChange: (val: string) => void) => (
        <div className="flex flex-col gap-2">
            <label className="text-xs uppercase font-bold text-white/50">{label}</label>
            <div className="flex flex-wrap gap-2">
                {avatarConfigOptions[key].map((opt) => (
                    <button
                        key={opt}
                        onClick={() => onChange(opt)}
                        className={`px-3 py-1.5 rounded-lg text-sm transition-colors border ${value === opt
                            ? 'bg-blue-500 text-white border-blue-400'
                            : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'
                            }`}
                    >
                        {opt}
                    </button>
                ))}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen relative overflow-hidden flex flex-col items-center"
            style={{
                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #1a1a2e 100%)'
            }}>

            <AnimatedBackground />



            {/* Profile Content */}
            <div className="relative z-10 w-full max-w-4xl px-4 py-20 flex flex-col gap-8">

                {/* Header Card */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-2xl">
                    <div className="relative group shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-tr from-amber-400 to-orange-500 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative bg-gray-900 rounded-full p-2 w-48 h-48">
                            <Avatar className="w-full h-full" {...config} />
                        </div>
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="absolute bottom-2 right-2 bg-blue-500 hover:bg-blue-600 w-12 h-12 rounded-full border-4 border-gray-900 flex items-center justify-center text-white transition-colors shadow-lg z-10"
                            title="Customize Avatar"
                        >
                            <FaPalette />
                        </button>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-4xl font-black text-white mb-2 tracking-tight">{displayName || 'Player'}</h1>
                        <p className="text-white/60 text-lg mb-4">{rank} • Level {level}</p>

                        <div className="flex flex-wrap justify-center md:justify-start gap-3">
                            <span className="px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-sm font-bold flex items-center gap-2">
                                <FaStar /> Pro Member
                            </span>
                            <span className="px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-sm font-bold">
                                📅 Joined Jan 2026
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="text-center p-4 bg-white/5 rounded-2xl min-w-[100px] border border-white/5">
                            <div className="text-2xl font-black text-amber-400 mb-1">{Math.floor(xp / 2).toLocaleString()}</div>
                            <div className="text-xs text-white/50 uppercase tracking-wider font-bold">XP</div>
                        </div>
                        <div className="text-center p-4 bg-white/5 rounded-2xl min-w-[100px] border border-white/5">
                            <div className="text-2xl font-black text-yellow-400 mb-1">{coins.toLocaleString()}</div>
                            <div className="text-xs text-white/50 uppercase tracking-wider font-bold">Coins</div>
                        </div>
                    </div>
                </div>

                {/* Avatar Editor (Collapsible) */}
                {isEditing && (
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 animate-fade-in text-white overflow-hidden">
                        <div className="flex flex-col gap-6 mb-6 border-b border-white/10 pb-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <span>🎨</span> Customize Profile
                                </h2>
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleRandomize}
                                        className="px-4 py-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30 font-bold text-sm flex items-center gap-2 transition-colors"
                                    >
                                        <FaDice /> Randomize
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="px-4 py-2 rounded-xl bg-green-500/20 text-green-300 border border-green-500/30 hover:bg-green-500/30 font-bold text-sm flex items-center gap-2 transition-colors"
                                    >
                                        <FaSave /> Save Changes
                                    </button>
                                </div>
                            </div>

                            {/* Name Edit Input */}
                            <div className="flex flex-col gap-2">
                                <label className="text-xs uppercase font-bold text-white/50 tracking-wider">Display Name</label>
                                <input
                                    type="text"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    maxLength={15}
                                    className="w-full max-w-md bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:border-blue-500 transition-all placeholder:text-white/20"
                                    placeholder="Enter your name"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Editor Tabs - Icons */}
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
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id as 'base' | 'face' | 'hair' | 'eyes' | 'mouth' | 'clothes' | 'bg')}
                                        className={`p-3 rounded-xl flex items-center gap-3 transition-all min-w-[100px] md:min-w-[140px] ${activeTab === tab.id
                                            ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                                            : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
                                            }`}
                                    >
                                        <span className="text-lg">{tab.icon}</span>
                                        <span className="font-bold text-sm">{tab.label}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Editor Controls */}
                            <div className="flex-1 bg-black/20 rounded-2xl p-6 min-h-[300px]">
                                {activeTab === 'base' && (
                                    <div className="space-y-6">
                                        {renderSelect('Sex', 'sex', config.sex || 'man', (v) => updateConfig('sex', v))}
                                        {renderSelect('Ear Size', 'earSize', config.earSize || 'small', (v) => updateConfig('earSize', v))}
                                    </div>
                                )}

                                {activeTab === 'face' && (
                                    <div className="space-y-6">
                                        {renderColorPicker('Skin Color', config.faceColor || '#F9C9B6', (v) => updateConfig('faceColor', v))}
                                    </div>
                                )}

                                {activeTab === 'hair' && (
                                    <div className="space-y-6">
                                        {renderSelect('Hair Style', 'hairStyle', config.hairStyle || 'normal', (v) => updateConfig('hairStyle', v))}
                                        {renderColorPicker('Hair Color', config.hairColor || '#000000', (v) => updateConfig('hairColor', v))}
                                        {renderSelect('Hat Style', 'hatStyle', config.hatStyle || 'none', (v) => updateConfig('hatStyle', v))}
                                        {config.hatStyle !== 'none' && renderColorPicker('Hat Color', config.hatColor || '#000000', (v) => updateConfig('hatColor', v))}
                                    </div>
                                )}

                                {activeTab === 'eyes' && (
                                    <div className="space-y-6">
                                        {renderSelect('Eye Style', 'eyeStyle', config.eyeStyle || 'oval', (v) => updateConfig('eyeStyle', v))}
                                        {renderSelect('Glasses', 'glassesStyle', config.glassesStyle || 'none', (v) => updateConfig('glassesStyle', v))}
                                    </div>
                                )}

                                {activeTab === 'mouth' && (
                                    <div className="space-y-6">
                                        {renderSelect('Nose Style', 'noseStyle', config.noseStyle || 'short', (v) => updateConfig('noseStyle', v))}
                                        {renderSelect('Mouth Style', 'mouthStyle', config.mouthStyle || 'smile', (v) => updateConfig('mouthStyle', v))}
                                    </div>
                                )}

                                {activeTab === 'clothes' && (
                                    <div className="space-y-6">
                                        {renderSelect('Shirt Style', 'shirtStyle', config.shirtStyle || 'hoody', (v) => updateConfig('shirtStyle', v))}
                                        {renderColorPicker('Shirt Color', config.shirtColor || '#fff', (v) => updateConfig('shirtColor', v))}
                                    </div>
                                )}

                                {activeTab === 'bg' && (
                                    <div className="space-y-6">
                                        {renderColorPicker('Background Color', config.bgColor || '#ff9090', (v) => updateConfig('bgColor', v))}
                                        <div className="flex items-center gap-3">
                                            <input
                                                title="Gradient toggle"
                                                type="checkbox"
                                                checked={config.isGradient}
                                                onChange={(e) => updateConfig('isGradient', e.target.checked)}
                                                className="w-5 h-5 rounded border-white/20 bg-white/5 checked:bg-blue-500"
                                            />
                                            <label className="text-sm font-bold text-white/70">Enable Gradient</label>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Recent Activity */}
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <span className="text-blue-400">📊</span> Recent Activity
                        </h2>
                        <div className="space-y-4">
                            {[
                                { game: 'Monetary Mastery', action: 'Completed Level 3', time: '2 mins ago', xp: '+150 XP' },
                                { game: 'Capital Crossword', action: 'Solved Daily Puzzle', time: '1 hour ago', xp: '+300 XP' },
                                { game: 'Data Diver', action: 'New High Score', time: 'Yesterday', xp: '+500 XP' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                                    <div>
                                        <div className="text-white font-medium">{item.game}</div>
                                        <div className="text-white/40 text-sm">{item.action} • {item.time}</div>
                                    </div>
                                    <div className="text-amber-400 font-bold text-sm bg-amber-400/10 px-3 py-1 rounded-full">
                                        {item.xp}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Achievements */}
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <span className="text-yellow-400"><FaTrophy /></span> Achievements
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { title: 'First Steps', icon: '🎯', status: 'unlocked' },
                                { title: 'Quiz Master', icon: '🧠', status: 'unlocked' },
                                { title: 'Speed Demon', icon: '⚡', status: 'locked' },
                                { title: 'Big Spender', icon: '💰', status: 'locked' },
                            ].map((ach, i) => (
                                <div key={i} className={`p-4 rounded-xl border ${ach.status === 'unlocked' ? 'bg-gradient-to-br from-green-500/20 to-emerald-600/20 border-green-500/30' : 'bg-white/5 border-white/5 grayscale opacity-50'} flex flex-col items-center text-center gap-2`}>
                                    <div className="text-3xl mb-1">{ach.icon}</div>
                                    <div className="text-white font-bold text-sm">{ach.title}</div>
                                    <div className={`text-[10px] uppercase tracking-widest font-bold ${ach.status === 'unlocked' ? 'text-green-400' : 'text-white/30'}`}>
                                        {ach.status}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Profile;
