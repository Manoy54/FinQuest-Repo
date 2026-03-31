import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaCheck, FaTimes } from 'react-icons/fa';
import { AnimatedBackground } from '../games/MoneytaryMasteryComponents';

type BillingCycle = 'monthly' | 'annual';

interface PlanFeature {
    label: string;
    studentBasic: string | boolean;
    studentPrime: string | boolean;
    educatorBasic: string | boolean;
    educatorPrime: string | boolean;
}

const features: PlanFeature[] = [
    { label: 'Basic Game Modes (4)', studentBasic: true, studentPrime: true, educatorBasic: true, educatorPrime: true },
    { label: 'Access to Library', studentBasic: 'Limited', studentPrime: true, educatorBasic: true, educatorPrime: true },
    { label: 'Access to Premium Game Modes', studentBasic: false, studentPrime: true, educatorBasic: false, educatorPrime: true },
    { label: 'EXP and Coin System', studentBasic: true, studentPrime: 'Double XP Events', educatorBasic: false, educatorPrime: false },
    { label: 'Progress Tracking', studentBasic: 'Basic', studentPrime: 'Advanced Analytics', educatorBasic: 'Class Overview', educatorPrime: 'Full Dashboard' },
    { label: 'Quiz Builder', studentBasic: false, studentPrime: false, educatorBasic: true, educatorPrime: true },
    { label: 'Downloadable Modules/Notes', studentBasic: false, studentPrime: true, educatorBasic: false, educatorPrime: true },
    { label: 'Ad-Free Experience', studentBasic: false, studentPrime: true, educatorBasic: false, educatorPrime: true },
];

const plans = [
    {
        key: 'studentBasic',
        name: 'Student Hub',
        tier: 'Basic',
        monthly: 0,
        annual: 0,
        color: 'from-gray-500/20 to-gray-600/20',
        borderColor: 'border-white/10',
        badge: null,
        icon: '📖',
    },
    {
        key: 'studentPrime',
        name: 'Student Hub',
        tier: 'Prime',
        monthly: 149,
        annual: 1499,
        color: 'from-emerald-500/20 to-teal-500/20',
        borderColor: 'border-emerald-500/30',
        badge: 'Popular',
        icon: '⚡',
    },
    {
        key: 'educatorBasic',
        name: 'Educator Hub',
        tier: 'Basic',
        monthly: 0,
        annual: 0,
        color: 'from-blue-500/20 to-indigo-500/20',
        borderColor: 'border-blue-500/20',
        badge: null,
        icon: '🎓',
    },
    {
        key: 'educatorPrime',
        name: 'Educator Hub',
        tier: 'Prime',
        monthly: 799,
        annual: 9499,
        color: 'from-purple-500/20 to-pink-500/20',
        borderColor: 'border-purple-500/30',
        badge: 'Best Value',
        icon: '👑',
    },
];

function FeatureCell({ value }: { value: string | boolean }) {
    if (value === true) return <FaCheck className="text-emerald-400 mx-auto" />;
    if (value === false) return <FaTimes className="text-red-400/60 mx-auto" />;
    return <span className="text-white/70 text-xs font-medium text-center block">{value}</span>;
}

export function PricingPage() {
    const [billing, setBilling] = useState<BillingCycle>('monthly');

    return (
        <div
            className="min-h-screen relative overflow-hidden flex flex-col items-center"
            style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #1a1a2e 100%)' }}
        >
            <AnimatedBackground />

            <div className="relative z-10 w-full max-w-6xl px-4 py-8 flex flex-col gap-8">
                {/* Back Button */}
                <Link
                    to="/home"
                    className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-bold uppercase tracking-wider w-fit"
                >
                    <FaArrowLeft className="w-3 h-3" /> Back to Home
                </Link>

                {/* Header */}
                <div className="text-center">
                    <h1 className="text-4xl font-black text-white mb-2 tracking-tight">
                        FinQuest
                        <span
                            className="ml-2"
                            style={{
                                background: 'linear-gradient(135deg, #ffd700 0%, #ff6b35 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Subscription Plans
                        </span>
                    </h1>
                    <p className="text-white/40 text-sm max-w-lg mx-auto">
                        Choose the plan that fits your learning journey. Upgrade anytime to unlock premium features.
                    </p>
                </div>

                {/* Billing Toggle */}
                <div className="flex justify-center">
                    <div className="flex gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
                        {(['monthly', 'annual'] as BillingCycle[]).map((cycle) => (
                            <button
                                key={cycle}
                                onClick={() => setBilling(cycle)}
                                className={`px-6 py-2 rounded-lg font-bold text-sm uppercase tracking-wider transition-all duration-300 ${
                                    billing === cycle
                                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                                        : 'text-white/40 hover:text-white/70'
                                }`}
                            >
                                {cycle === 'monthly' ? 'Monthly' : 'Annual'}
                                {cycle === 'annual' && <span className="ml-1 text-emerald-400 text-[10px]">Save 15%</span>}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Plan Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {plans.map((plan) => (
                        <div
                            key={plan.key}
                            className={`relative bg-gradient-to-b ${plan.color} backdrop-blur-xl border ${plan.borderColor} rounded-3xl p-6 flex flex-col gap-4 transition-transform hover:-translate-y-1 duration-300`}
                        >
                            {plan.badge && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-black uppercase tracking-wider shadow-lg">
                                        {plan.badge}
                                    </span>
                                </div>
                            )}

                            <div className="text-center pt-2">
                                <div className="text-3xl mb-2">{plan.icon}</div>
                                <h3 className="text-white font-black text-lg">{plan.name}</h3>
                                <span className="text-white/40 text-xs font-bold uppercase tracking-widest">{plan.tier}</span>
                            </div>

                            <div className="text-center py-3 border-y border-white/10">
                                {plan.monthly === 0 ? (
                                    <div className="text-3xl font-black text-emerald-400">FREE</div>
                                ) : (
                                    <>
                                        <div className="text-3xl font-black text-white">
                                            ₱{(billing === 'monthly' ? plan.monthly : plan.annual).toLocaleString()}
                                        </div>
                                        <div className="text-white/30 text-xs font-bold">
                                            per {billing === 'monthly' ? 'month' : 'year'}
                                        </div>
                                    </>
                                )}
                            </div>

                            <ul className="space-y-2 flex-1">
                                {features.map((feat) => {
                                    const val = feat[plan.key as keyof PlanFeature];
                                    return (
                                        <li key={feat.label} className="flex items-center gap-2 text-xs">
                                            {val === true ? (
                                                <FaCheck className="text-emerald-400 shrink-0 w-3 h-3" />
                                            ) : val === false ? (
                                                <FaTimes className="text-red-400/40 shrink-0 w-3 h-3" />
                                            ) : (
                                                <FaCheck className="text-emerald-400 shrink-0 w-3 h-3" />
                                            )}
                                            <span className={`${val === false ? 'text-white/30' : 'text-white/70'}`}>
                                                {typeof val === 'string' ? `${feat.label}: ${val}` : feat.label}
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>

                            <button
                                className={`w-full py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 ${
                                    plan.monthly === 0
                                        ? 'bg-white/10 text-white/60 border border-white/10 hover:bg-white/15'
                                        : 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:from-emerald-400 hover:to-cyan-400 shadow-lg shadow-emerald-500/20'
                                }`}
                            >
                                {plan.monthly === 0 ? 'Current Plan' : 'Subscribe'}
                            </button>
                        </div>
                    ))}
                </div>

                {/* Comparison Table (Desktop) */}
                <div className="hidden lg:block bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden">
                    <div className="p-6 border-b border-white/10">
                        <h2 className="text-xl font-black text-white text-center">Feature Comparison</h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="text-left text-xs text-white/40 font-bold uppercase tracking-wider p-4 w-1/3">Features</th>
                                    {plans.map((plan) => (
                                        <th key={plan.key} className="text-center text-xs text-white/60 font-bold uppercase tracking-wider p-4">
                                            {plan.name}<br /><span className="text-white/30">{plan.tier}</span>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {features.map((feat, i) => (
                                    <tr key={feat.label} className={i % 2 === 0 ? 'bg-white/[0.02]' : ''}>
                                        <td className="text-sm text-white/70 font-medium p-4">{feat.label}</td>
                                        <td className="p-4"><FeatureCell value={feat.studentBasic} /></td>
                                        <td className="p-4"><FeatureCell value={feat.studentPrime} /></td>
                                        <td className="p-4"><FeatureCell value={feat.educatorBasic} /></td>
                                        <td className="p-4"><FeatureCell value={feat.educatorPrime} /></td>
                                    </tr>
                                ))}
                                <tr className="border-t border-white/10">
                                    <td className="text-sm text-white/70 font-bold p-4">Monthly Price</td>
                                    {plans.map((plan) => (
                                        <td key={plan.key} className="text-center p-4">
                                            <span className="text-white font-black text-sm">
                                                {plan.monthly === 0 ? 'FREE' : `₱${plan.monthly}`}
                                            </span>
                                        </td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="text-sm text-white/70 font-bold p-4">Annual Price</td>
                                    {plans.map((plan) => (
                                        <td key={plan.key} className="text-center p-4">
                                            <span className="text-white font-black text-sm">
                                                {plan.annual === 0 ? 'FREE' : `₱${plan.annual.toLocaleString()}`}
                                            </span>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="text-center py-4">
                    <p className="text-white/20 text-xs">
                        All plans include access to the FinQuest community. Prices in Philippine Peso (₱).
                    </p>
                </div>
            </div>
        </div>
    );
}
