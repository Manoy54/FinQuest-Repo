
import { HeroSection, GameModeSection } from '../pages/home';
import { FeaturesSection } from './components/FeaturesSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ParallaxDemo } from './components/ParallaxDemo';
import { SmoothScroll } from './components/SmoothScroll';

export default function App() {
  return (
    <SmoothScroll>
      <div className="bg-white min-h-screen">
        <Header />
        <HeroSection />
        <GameModeSection />
        <ParallaxDemo />
        <FeaturesSection />
        <Footer />
      </div>
    </SmoothScroll>
  );
}