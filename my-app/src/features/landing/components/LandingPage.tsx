import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Goals } from './sections/Goals';
import { Features } from './sections/Features';
import { GameplayPreview } from './sections/GameplayPreview';
import { HowToPlay } from './sections/HowToPlay';

import { FAQ } from './sections/FAQ';
import { Footer } from './sections/Footer';

import { AnimatedBackground } from '../../game-modes/components/MoneytaryMasteryComponents';

export function LandingPage() {
    return (
        <div
            className="min-h-screen font-sans relative overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #1a1a2e 100%)'
            }}
        >
            <AnimatedBackground />
            <div className="relative z-10">

                <Hero />

                <div className="bg-black/30 backdrop-blur-sm">
                    <About />
                </div>

                <div className="bg-black/40 backdrop-blur-sm">
                    <Goals />
                </div>

                <div className="bg-black/30 backdrop-blur-sm">
                    <Features />
                </div>

                <div id="gameplay-preview" className="bg-black/20 backdrop-blur-sm">
                    <GameplayPreview />
                </div>

                <HowToPlay />



                <div className="bg-black/30 backdrop-blur-sm">
                    <FAQ />
                </div>

                <div className="bg-black/60 backdrop-blur-md">
                    <Footer />
                </div>
            </div>
        </div>
    );
}
