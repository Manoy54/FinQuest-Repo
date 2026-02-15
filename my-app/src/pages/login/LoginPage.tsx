import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import FQLogo from '../../assets/images/FQlogo.PNG';
import { useAuth } from '../../context/AuthContext';

export function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
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

        // Simulate authentication
        const storedUser = localStorage.getItem('user_credentials');

        if (!storedUser) {
            // No user registered
            const authErrors = {
                email: "Incorrect username or email"
            };
            setErrors(authErrors);
            setTimeout(() => setErrors({}), 3000);
            return;
        }

        try {
            const userData = JSON.parse(storedUser);

            // Check if email matches (allow login with email or username)
            const isEmailMatch = userData.email === email || userData.username === email;

            if (!isEmailMatch) {
                const authErrors = {
                    email: "Incorrect username or email"
                };
                setErrors(authErrors);
                setTimeout(() => setErrors({}), 3000);
                return;
            }

            // Check password
            if (userData.password !== password) {
                const authErrors = {
                    password: "Incorrect password"
                };
                setErrors(authErrors);
                setTimeout(() => setErrors({}), 3000);
                return;
            }

            // Login successful — check avatar setup status
            const username = userData.username || userData.email;
            const { needsAvatarSetup } = login(username);
            console.log('Login successful, needsAvatarSetup:', needsAvatarSetup);
            navigate(needsAvatarSetup ? '/avatar-setup' : '/home');
        } catch (error) {
            console.error('Error parsing user data:', error);
            const authErrors = {
                email: "An error occurred. Please try again."
            };
            setErrors(authErrors);
            setTimeout(() => setErrors({}), 3000);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900 via-zinc-900 to-black relative overflow-hidden font-['Rajdhani']">
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
            <div className="relative z-10 w-full max-w-md p-8 bg-black/40 backdrop-blur-2xl border border-white/5 rounded-2xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] animate-fade-in-up">

                {/* Header */}
                <div className="text-center mb-8 flex flex-col items-center">
                    <div className="flex flex-col items-center justify-center mb-4">
                        <span className="text-lg font-bold tracking-[0.3em] text-zinc-400 uppercase mb-[-5px]">
                            WELCOME TO
                        </span>
                        <span
                            className="text-6xl font-bold tracking-tight uppercase"
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
                    <div className="relative w-24 h-24 mb-4 group mt-6">
                        <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl group-hover:bg-emerald-500/30 transition-all duration-500" />
                        <img
                            src={FQLogo}
                            alt="FinQuest Logo"
                            className="w-full h-full object-cover rounded-full relative z-10 ring-2 ring-white/10 group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                    <p className="text-white text-sm tracking-widest uppercase font-medium">Sign in to continue your journey</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-white uppercase tracking-wider ml-1">Email / Username</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                                <FaUser className={`w-5 h-5 transition-colors duration-300 ${errors.email ? 'text-red-400' : 'text-zinc-500 group-focus-within:text-indigo-400'}`} />
                            </div>
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
                                }}
                                className={`w-full bg-zinc-900/40 border rounded-xl py-3.5 pl-12 pr-4 text-white text-lg font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-all duration-300 ${errors.email
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

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-white uppercase tracking-wider ml-1">Password</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                                <FaLock className={`w-5 h-5 transition-colors duration-300 ${errors.password ? 'text-red-400' : 'text-zinc-500 group-focus-within:text-emerald-400'}`} />
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    if (errors.password) setErrors(prev => ({ ...prev, password: undefined }));
                                }}
                                className={`w-full bg-zinc-900/40 border rounded-xl py-3.5 pl-12 pr-4 text-white text-lg font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all duration-300 ${errors.password
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
                        className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-bold text-xl py-4 px-4 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transform hover:-translate-y-0.5 transition-all duration-300 mt-6 tracking-wider uppercase"
                    >
                        Sign In
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-white tracking-wide font-medium">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors ml-1 text-base">
                        Create account
                    </Link>
                </p>
            </div>
        </div>
    );
}
