import { FaChalkboardTeacher, FaChartBar, FaPlusCircle, FaUsers, FaClipboardList, FaCog } from 'react-icons/fa';
import { BackToHomeButton } from '../../../components/ui/BackToHomeButton';
import { AnimatedBackground } from '../../game-modes/components/MoneytaryMasteryComponents';

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    status: 'available' | 'coming-soon';
    gradient: string;
}

const features: FeatureCardProps[] = [
    {
        icon: <FaChalkboardTeacher />,
        title: 'Host Quiz Bees',
        description: 'Create and manage live quiz bee sessions for your class. Set topics, time limits, and track participation in real time.',
        status: 'coming-soon',
        gradient: 'from-blue-500/20 to-indigo-500/20',
    },
    {
        icon: <FaChartBar />,
        title: 'Game Data Analytics',
        description: 'Access detailed analytics on student performance. Identify which topics need more focus and instruction.',
        status: 'coming-soon',
        gradient: 'from-emerald-500/20 to-teal-500/20',
    },
    {
        icon: <FaPlusCircle />,
        title: 'Quiz Builder',
        description: 'Create your own custom quizzes with multiple question types. Add explanations and categorize by topic.',
        status: 'coming-soon',
        gradient: 'from-purple-500/20 to-pink-500/20',
    },
    {
        icon: <FaUsers />,
        title: 'Class Management',
        description: 'Organize students into classes and sections. Monitor progress, assign activities, and send announcements.',
        status: 'coming-soon',
        gradient: 'from-amber-500/20 to-orange-500/20',
    },
    {
        icon: <FaClipboardList />,
        title: 'Performance Reports',
        description: 'Generate detailed reports on class and individual performance. Export data for record keeping.',
        status: 'coming-soon',
        gradient: 'from-cyan-500/20 to-blue-500/20',
    },
    {
        icon: <FaCog />,
        title: 'Custom Settings',
        description: 'Configure difficulty levels, time limits, and scoring systems. Tailor the platform to your curriculum.',
        status: 'coming-soon',
        gradient: 'from-rose-500/20 to-red-500/20',
    },
];

function FeatureCard({ feature }: { feature: FeatureCardProps }) {
    return (
        <div className={`relative bg-gradient-to-b ${feature.gradient} backdrop-blur-xl border border-white/10 rounded-2xl p-3 flex flex-col gap-2 transition-transform duration-300`}>
            {feature.status === 'coming-soon' && (
                <div className="absolute -top-2 right-3">
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[8px] font-black uppercase tracking-wide border border-amber-500/30">
                        Coming Soon
                    </span>
                </div>
            )}

            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-sm text-white/80 border border-white/10">
                {feature.icon}
            </div>

            <h3 className="text-white font-black text-sm">{feature.title}</h3>
            <p className="text-white/50 text-xs leading-snug flex-1">{feature.description}</p>

            <button
                disabled={feature.status === 'coming-soon'}
                className={`w-full py-1.5 rounded-lg font-bold text-[10px] uppercase tracking-wider transition-all duration-300 ${
                    feature.status === 'coming-soon'
                        ? 'bg-white/5 text-white/30 border border-white/5 cursor-not-allowed'
                        : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-400 hover:to-purple-400'
                }`}
            >
                {feature.status === 'coming-soon' ? 'Coming Soon' : 'Open'}
            </button>
        </div>
    );
}

export function EducatorHubPage() {
    return (
        <div
            className="min-h-screen relative overflow-hidden flex flex-col items-center"
            style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #1a1a2e 100%)' }}
        >
            <AnimatedBackground />

            <div className="relative z-10 w-full max-w-6xl px-4 py-4 flex flex-col gap-4">
                {/* Back Button */}
                <BackToHomeButton />

                {/* Header */}
                <div className="text-center">
                    <h1 className="text-xl md:text-2xl font-black text-white mb-1 tracking-tight">
                        🎓 Educator{' '}
                        <span
                            style={{
                                background: 'linear-gradient(135deg, #ffd700 0%, #ff6b35 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Hub
                        </span>
                    </h1>
                    <p className="text-white/40 text-xs max-w-lg mx-auto">
                        A dedicated space for professors and instructors to manage classes, create quizzes, and track student performance on FinQuest.
                    </p>
                </div>

                {/* Educator CTA */}
                <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-xl border border-indigo-500/20 rounded-2xl p-4 text-center">
                    <div className="text-2xl mb-1">👨‍🏫</div>
                    <h2 className="text-sm font-black text-white mb-1">Are you an Educator?</h2>
                    <p className="text-white/50 text-xs mb-3 max-w-md mx-auto">
                        The Educator Hub provides tools to integrate FinQuest into your financial literacy curriculum. Create quizzes, monitor student progress, and host live quiz bees.
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                        <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-[10px] font-bold uppercase tracking-wider">
                            📊 Analytics Dashboard
                        </div>
                        <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-[10px] font-bold uppercase tracking-wider">
                            📝 Quiz Builder
                        </div>
                        <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-[10px] font-bold uppercase tracking-wider">
                            👥 Class Management
                        </div>
                    </div>
                </div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {features.map((feature) => (
                        <FeatureCard key={feature.title} feature={feature} />
                    ))}
                </div>

                {/* Footer */}
                <div className="text-center py-4">
                    <p className="text-white/20 text-xs">
                        Educator Hub features are currently in development. Stay tuned for updates!
                    </p>
                </div>
            </div>
        </div>
    );
}
