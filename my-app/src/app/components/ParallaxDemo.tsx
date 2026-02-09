import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Parallax, ParallaxLayer, type IParallax } from '@react-spring/parallax';

// We'll use inline styles or standard class names since we added the CSS to index.css
// If you prefer modules, we can refactor, but for simplicity with the provided CSS:

interface PageProps {
    offset: number
    gradient: string
    onClick: () => void
}

const Page = ({ offset, gradient, onClick }: PageProps) => (
    <>
        <ParallaxLayer offset={offset} speed={0.2} onClick={onClick}>
            <div className="slopeBegin" />
        </ParallaxLayer>

        <ParallaxLayer offset={offset} speed={0.6} onClick={onClick}>
            <div className={`slopeEnd ${gradient}`} />
        </ParallaxLayer>

        <ParallaxLayer className="text number" offset={offset} speed={0.3}>
            <span>0{offset + 1}</span>
        </ParallaxLayer>
    </>
)

export function ParallaxDemo() {
    const parallax = useRef<IParallax>(null)

    const scroll = (to: number) => {
        if (parallax.current) {
            parallax.current.scrollTo(to)
        }
    }

    return (
        <div style={{ background: '#dfdfdf', height: '100vh', width: '100%' }}>
            <Parallax className="parallax-container" ref={parallax} pages={5} horizontal>
                <Page offset={0} gradient="pink" onClick={() => scroll(1)} />
                <Page offset={1} gradient="teal" onClick={() => scroll(2)} />
                <Page offset={2} gradient="tomato" onClick={() => scroll(3)} />
                <Page offset={3} gradient="purple" onClick={() => scroll(4)} />
                <Page offset={4} gradient="orange" onClick={() => scroll(0)} />

                <ParallaxLayer offset={1} speed={0.5} className="flex flex-col items-center justify-center pointer-events-none text-white">
                    <div className="pointer-events-auto text-center p-8 bg-black/20 backdrop-blur-sm rounded-3xl">
                        <h2 className="text-5xl font-bold mb-4 drop-shadow-md">Quiz Bee</h2>
                        <p className="text-xl mb-8 max-w-md">Test your financial knowledge in our exciting timed quiz mode!</p>
                        <Link to="/quiz-bee" className="px-8 py-3 bg-white text-teal-600 rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-lg inline-block">
                            Play Now
                        </Link>
                    </div>
                </ParallaxLayer>

                <ParallaxLayer offset={2} speed={0.5} className="flex flex-col items-center justify-center pointer-events-none text-white">
                    <div className="pointer-events-auto text-center p-8 bg-black/20 backdrop-blur-sm rounded-3xl">
                        <h2 className="text-5xl font-bold mb-4 drop-shadow-md">Monetary Mastery</h2>
                        <p className="text-xl mb-8 max-w-md">Master the art of finance with flashcards and challenges!</p>
                        <Link to="/" className="px-8 py-3 bg-white text-rose-600 rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-lg inline-block">
                            Play Now
                        </Link>
                    </div>
                </ParallaxLayer>

                <ParallaxLayer offset={3} speed={0.5} className="flex flex-col items-center justify-center pointer-events-none text-white">
                    <div className="pointer-events-auto text-center p-8 bg-black/20 backdrop-blur-sm rounded-3xl">
                        <h2 className="text-5xl font-bold mb-4 drop-shadow-md">Word Hunt</h2>
                        <p className="text-xl mb-8 max-w-md">Find hidden financial terms and expand your vocabulary!</p>
                        <Link to="/word-hunt" className="px-8 py-3 bg-white text-purple-600 rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-lg inline-block">
                            Play Now
                        </Link>
                    </div>
                </ParallaxLayer>

                <ParallaxLayer offset={4} speed={0.5} className="flex flex-col items-center justify-center pointer-events-none text-white">
                    <div className="pointer-events-auto text-center p-8 bg-black/20 backdrop-blur-sm rounded-3xl">
                        <h2 className="text-5xl font-bold mb-4 drop-shadow-md">Coming Soon</h2>
                        <p className="text-xl mb-8 max-w-md">More exciting financial games are on the way!</p>
                        <button disabled className="px-8 py-3 bg-white/50 text-gray-600 rounded-full font-bold text-xl cursor-not-allowed">
                            Stay Tuned
                        </button>
                    </div>
                </ParallaxLayer>
            </Parallax>
        </div>
    )
}
