import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaDice, FaUser, FaSmile, FaEye, FaTshirt, FaPalette, FaArrowRight } from 'react-icons/fa';
import Avatar, { genConfig } from 'react-nice-avatar';
import { useAuth, type AvatarConfig } from '../../context/AuthContext';
import { AnimatedBackground } from '../games/MoneytaryMasteryComponents';

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

export function AvatarSetupPage() {
    const navigate = useNavigate();
    const { completeAvatarSetup } = useAuth();
    const [config, setConfig] = useState<ReactNiceAvatarConfig>(() => genConfig());
    const [activeTab, setActiveTab] = useState<'base' | 'face' | 'hair' | 'eyes' | 'mouth' | 'clothes' | 'bg'>('base');
    const [saving, setSaving] = useState(false);

    const handleRandomize = () => setConfig(genConfig());

    const updateConfig = (key: keyof ReactNiceAvatarConfig, value: string | boolean) => {
        setConfig(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = () => {
        setSaving(true);
        // Small delay for visual feedback
        setTimeout(() => {
            completeAvatarSetup(config as unknown as AvatarConfig);
            // Allow state to update across context
            setTimeout(() => {
                navigate('/home');
            }, 50);
        }, 600);
    };

    const renderColorPicker = (label: string, value: string, onChange: (val: string) => void) => (
        <div className="flex flex-col gap-2">
            <label className="text-xs uppercase font-bold text-white/50 tracking-wider">{label}</label>
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
            <label className="text-xs uppercase font-bold text-white/50 tracking-wider">{label}</label>
            <div className="flex flex-wrap gap-2">
                {avatarConfigOptions[key].map((opt) => (
                    <button
                        key={opt}
                        onClick={() => onChange(opt)}
                        className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-200 border cursor-pointer ${value === opt
                            ? 'bg-amber-500 text-white border-amber-400 shadow-lg shadow-amber-500/20'
                            : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:border-white/20'
                            }`}
                    >
                        {opt}
                    </button>
                ))}
            </div>
        </div>
    );

    const tabs = [
        { id: 'base', icon: <FaUser />, label: 'Base' },
        { id: 'face', icon: <FaSmile />, label: 'Face' },
        { id: 'hair', icon: <FaUser />, label: 'Hair' },
        { id: 'eyes', icon: <FaEye />, label: 'Eyes' },
        { id: 'mouth', icon: <FaSmile />, label: 'Mouth' },
        { id: 'clothes', icon: <FaTshirt />, label: 'Clothes' },
        { id: 'bg', icon: <FaPalette />, label: 'Background' },
    ];

    return (
        <div
            className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center"
            style={{
                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #1a1a2e 100%)'
            }}
        >
            <AnimatedBackground />

            <div className="relative z-10 w-full max-w-5xl px-4 py-12 flex flex-col gap-8">

                {/* Header */}
                <div className="text-center">
                    <p className="text-amber-400/80 text-sm font-bold uppercase tracking-[0.3em] mb-2">
                        Step 1 of 1
                    </p>
                    <h1
                        className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tight"
                    >
                        Create Your Avatar
                    </h1>
                    <p className="text-white/50 text-lg max-w-md mx-auto">
                        Customize your character before entering the world of FinQuest
                    </p>
                </div>

                {/* Main Content */}
                <div className="flex flex-col lg:flex-row gap-8 items-start">

                    {/* Avatar Preview Card */}
                    <div className="lg:w-[320px] shrink-0 mx-auto lg:mx-0">
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col items-center gap-6 shadow-2xl">

                            {/* Avatar */}
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-tr from-amber-400 to-orange-500 rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity scale-90" />
                                <div className="relative bg-gray-900 rounded-full p-2 w-48 h-48 ring-2 ring-white/10">
                                    <Avatar className="w-full h-full" {...config} />
                                </div>
                            </div>

                            {/* Randomize Button */}
                            <button
                                onClick={handleRandomize}
                                className="w-full px-5 py-3 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30 font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer"
                            >
                                <FaDice className="text-lg" /> Randomize
                            </button>

                            {/* Save Button */}
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className={`w-full px-5 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 cursor-pointer ${saving
                                    ? 'bg-green-500/50 text-white/70 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:-translate-y-0.5'
                                    }`}
                            >
                                {saving ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        Save & Continue
                                        <FaArrowRight />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Customization Panel */}
                    <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">

                        {/* Tabs */}
                        <div className="flex overflow-x-auto border-b border-white/10 scrollbar-hide">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                                    className={`flex items-center gap-2 px-5 py-4 text-sm font-bold transition-all duration-200 whitespace-nowrap border-b-2 cursor-pointer ${activeTab === tab.id
                                        ? 'text-amber-400 border-amber-400 bg-white/5'
                                        : 'text-white/40 border-transparent hover:text-white/70 hover:bg-white/5'
                                        }`}
                                >
                                    <span className="text-base">{tab.icon}</span>
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="p-6 md:p-8 min-h-[320px]">
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
                                            className="w-5 h-5 rounded border-white/20 bg-white/5 checked:bg-amber-500 accent-amber-500"
                                        />
                                        <label className="text-sm font-bold text-white/70">Enable Gradient</label>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AvatarSetupPage;
