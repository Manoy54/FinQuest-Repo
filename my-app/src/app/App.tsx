
import { HeroSection } from './components/HeroSection';
import { ParallaxSection } from './components/ParallaxSection';
import { GameModeSection } from './components/GameModeSection';
import { FeaturesSection } from './components/FeaturesSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

export default function App() {
  return (
    <div className="bg-white min-h-screen">
      <Header />
      <HeroSection />
      <ParallaxSection />
      <GameModeSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
}