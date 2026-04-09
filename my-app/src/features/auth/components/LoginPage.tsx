import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaArrowLeft } from 'react-icons/fa';
const FQLogo = '/logo.png';
import { useAuth } from '../../../context/AuthContext';
import { supabase, isSupabaseConfigured } from '../../../lib/supabase/client';

export function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: { email?: string; password?: string } = {};
        if (!email.trim()) newErrors.email = 'Fill this area to sign in';
        if (!password.trim()) newErrors.password = 'Fill this area to sign in';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            // Clear errors after 3 seconds
            setTimeout(() => setErrors({}), 3000);
            return;
        }

        if (isSupabaseConfigured) {
            // Supabase Auth
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password
            });

            if (error) {
                setErrors({ email: error.message });
                setTimeout(() => setErrors({}), 3000);
                return;
            }

            if (data.user) {
                const usernameLabel = data.user.user_metadata?.username || data.user.email;
                const { needsAvatarSetup } = login(usernameLabel);
                setTimeout(() => {
                    navigate(needsAvatarSetup ? '/avatar-setup' : '/home');
                }, 0);
            }
        } else {
            // Fallback: localStorage-based login (demo/dev mode)
            const existingUsers = JSON.parse(localStorage.getItem('finquest_users') || '[]');
            const user = existingUsers.find(
                (u: { email: string; password: string }) => u.email === email && u.password === password
            );

            if (!user) {
                setErrors({ email: 'Invalid email or password' });
                setTimeout(() => setErrors({}), 3000);
                return;
            }

            const usernameLabel = user.username || email.split('@')[0];
            const { needsAvatarSetup } = login(usernameLabel);
            setTimeout(() => {
                navigate(needsAvatarSetup ? '/avatar-setup' : '/home');
            }, 0);
        }
    };

    return (
        <div className="h-[100dvh] md:min-h-screen w-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900 via-zinc-900 to-black relative overflow-hidden font-['Rajdhani']">
            {/* Back to Home Button */}
            <Link
                to="/"
                className="absolute top-4 left-4 lg:top-6 lg:left-6 z-50 flex items-center justify-center gap-2 p-2.5 lg:px-5 lg:py-2.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 group shadow-xl"
            >
                <FaArrowLeft className="w-3 h-3 md:w-4 md:h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                <span className="hidden lg:block text-sm font-bold uppercase tracking-widest">Back to Home</span>
            </Link>
            {/* Background Image using Logo - faint overlay */}
            <div
                className="absolute inset-0 z-0 opacity-[0.03]"
                style={{
                    backgroundImage: `url(${FQLogo})`,
                    backgroundSize: '120%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    filter: 'grayscale(100%)'
                }}
            />

            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -right-[10%] w-[700px] h-[700px] bg-indigo-500/10 rounded-full blur-[100px] animate-pulse-slow" />
                <div className="absolute -bottom-[20%] -left-[10%] w-[700px] h-[700px] bg-emerald-500/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
            </div>

            {/* Login Card */}
            <div className="relative z-10 w-[85%] md:w-full max-w-md p-5 md:p-8 bg-black/40 backdrop-blur-2xl border border-white/5 rounded-2xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] animate-fade-in-up">

                {/* Header */}
                <div className="text-center mb-6 md:mb-8 flex flex-col items-center">
                    <div className="flex flex-col items-center justify-center mb-2 md:mb-4">
                        <span className="text-[10px] md:text-sm lg:text-lg font-bold tracking-[0.3em] text-zinc-400 uppercase mb-[-5px]">
                            WELCOME TO
                        </span>
                        <span
                            className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight uppercase"
                            style={{
                                fontFamily: "'Literata', serif",
                                fontWeight: 700,
                                background: 'linear-gradient(135deg, #ffd700 0%, #ff6b35 50%, #ffd700 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.3))'
                            }}
                        >
                            FINQUEST
                        </span>
                    </div>
                    <div className="relative w-16 h-16 md:w-24 md:h-24 mb-2 md:mb-4 group mt-4 md:mt-6">
                        <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl group-hover:bg-emerald-500/30 transition-all duration-500" />
                        <img
                            src={FQLogo}
                            alt="FinQuest Logo"
                            className="w-full h-full object-cover rounded-full relative z-10 ring-2 ring-white/10 group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                    <p className="text-white text-[10px] md:text-sm tracking-widest uppercase font-medium">Sign in to continue your journey</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" autoComplete="off">

                    <div className="space-y-1.5 md:space-y-2">
                        <label className="text-[10px] md:text-sm font-bold text-white uppercase tracking-wider ml-1">Email / Username</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none z-10">
                                <FaUser className={`w-4 h-4 md:w-5 md:h-5 transition-colors duration-300 ${errors.email ? 'text-red-400' : 'text-zinc-500 group-focus-within:text-indigo-400'}`} />
                            </div>
                            <input
                                type="text"
                                value={email}
                                autoComplete="off"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
                                }}
                                className={`w-full bg-zinc-900/40 border rounded-xl py-2 md:py-3.5 pl-9 md:pl-12 pr-3 md:pr-4 text-white text-sm md:text-lg font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-all duration-300 ${errors.email
                                    ? 'border-red-500/30 focus:border-red-500'
                                    : 'border-white/10 focus:border-indigo-500'
                                    }`}
                            />
                            {/* Inline Error Popup */}
                            {errors.email && (
                                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 animate-fade-in">
                                    <div className="bg-red-900/80 backdrop-blur-md border border-red-500/50 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                        <span>{errors.email || 'Fill this area to sign in'}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-1.5 md:space-y-2">
                        <label className="text-[10px] md:text-sm font-bold text-white uppercase tracking-wider ml-1">Password</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none z-10">
                                <FaLock className={`w-4 h-4 md:w-5 md:h-5 transition-colors duration-300 ${errors.password ? 'text-red-400' : 'text-zinc-500 group-focus-within:text-emerald-400'}`} />
                            </div>
                            <input
                                type="password"
                                value={password}
                                autoComplete="new-password"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    if (errors.password) setErrors(prev => ({ ...prev, password: undefined }));
                                }}
                                className={`w-full bg-zinc-900/40 border rounded-xl py-2 md:py-3.5 pl-9 md:pl-12 pr-3 md:pr-4 text-white text-sm md:text-lg font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all duration-300 ${errors.password
                                    ? 'border-red-500/30 focus:border-red-500'
                                    : 'border-white/10 focus:border-emerald-500'
                                    }`}
                            />
                            {/* Inline Error Popup */}
                            {errors.password && (
                                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 animate-fade-in">
                                    <div className="bg-red-900/80 backdrop-blur-md border border-red-500/50 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                        <span>{errors.password || 'Fill this area to sign in'}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-bold text-sm md:text-xl py-2.5 md:py-4 px-4 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transform transition-all duration-300 mt-4 md:mt-6 tracking-wider uppercase"
                    >
                        Sign In
                    </button>
                </form>

                <p className="mt-5 md:mt-8 text-center text-xs md:text-sm text-white tracking-wide font-medium">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors ml-1 text-sm md:text-base">
                        Create account
                    </Link>
                </p>
            </div>
        </div>
    );
}
