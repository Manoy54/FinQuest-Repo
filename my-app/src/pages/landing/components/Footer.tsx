import { FaFacebook, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export function Footer() {
    const content = useScrollAnimation(0.2);

    return (
        <footer className="py-20 px-4 text-white">
            <div className="max-w-4xl mx-auto text-center">
                <div
                    ref={content.ref}
                    className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20 shadow-xl max-w-lg mx-auto transition-all duration-700 ease-out"
                    style={{
                        opacity: content.isVisible ? 1 : 0,
                        transform: content.isVisible ? 'translateY(0) scale(1)' : 'translateY(0) scale(0.9)',
                    }}
                >
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <FaEnvelope className="text-3xl" />
                    </div>

                    <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
                    <p className="text-blue-100 mb-8">
                        Have questions or feedback? We'd love to hear from you.
                    </p>

                    <div className="flex flex-row gap-6 justify-center">
                        <a
                            href="https://www.facebook.com/profile.php?id=61587675674831"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#1877F2] text-white p-4 rounded-full transition-transform hover:scale-110 shadow-lg hover:shadow-blue-500/30"
                            aria-label="Facebook"
                        >
                            <FaFacebook className="text-white text-3xl" />
                        </a>
                        <a
                            href="https://www.instagram.com/learnwithfinquest?igsh=Z3prbjczdGJsNXVv"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white p-4 rounded-full transition-transform hover:scale-110 shadow-lg hover:shadow-pink-500/30"
                            aria-label="Instagram"
                        >
                            <FaInstagram className="text-white text-3xl" />
                        </a>
                    </div>
                </div>

                <div className="mt-12 text-sm text-blue-200">
                    © {new Date().getFullYear()} FinQuest. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
