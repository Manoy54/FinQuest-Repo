import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const heading = useScrollAnimation();
    const faq0 = useScrollAnimation(0.1);
    const faq1 = useScrollAnimation(0.1);
    const faq2 = useScrollAnimation(0.1);
    const faq3 = useScrollAnimation(0.1);
    const faqRefs = [faq0, faq1, faq2, faq3];

    const faqs = [
        {
            question: "Is it free to play?",
            answer: "Yes, FinQuest is completely free to play. You can access all game modes and features without any cost."
        },
        {
            question: "Can I play with friends?",
            answer: "Currently, we offer solo modes where you can compete for high scores on the leaderboard. Multiplayer features are coming soon!"
        },
        {
            question: "What devices are supported?",
            answer: "FinQuest is optimized for desktop and tablet devices for the best experience, but it also works on modern mobile browsers."
        },
        {
            question: "Do I need an account?",
            answer: "You can play as a guest, but creating an account allows you to save your progress, track your stats, and appear on leaderboards."
        }
    ];

    return (
        <section className="py-20 px-4 text-white">
            <div className="max-w-3xl mx-auto">
                <h2
                    ref={heading.ref}
                    className="text-4xl font-bold text-center mb-12 transition-all duration-700 ease-out"
                    style={{
                        opacity: heading.isVisible ? 1 : 0,
                        transform: heading.isVisible ? 'translateY(0)' : 'translateY(40px)',
                    }}
                >
                    FAQ
                </h2>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            ref={faqRefs[index].ref}
                            className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden transition-all duration-500 border border-white/10 ease-out"
                            style={{
                                opacity: faqRefs[index].isVisible ? 1 : 0,
                                transform: faqRefs[index].isVisible
                                    ? 'translateX(0)'
                                    : index % 2 === 0 ? 'translateX(-40px)' : 'translateX(40px)',
                                transitionDelay: `${index * 120}ms`,
                            }}
                        >
                            <button
                                className="w-full px-6 py-4 flex items-center justify-between text-left font-semibold hover:bg-white/5 transition-colors"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                {faq.question}
                                {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                            </button>

                            <div
                                className={`px-6 transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-40 py-4 opacity-100' : 'max-h-0 py-0 opacity-0'
                                    }`}
                            >
                                <p className="text-blue-100 text-sm leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
