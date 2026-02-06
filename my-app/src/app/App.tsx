
import { HeroSection, GameModeSection } from '../pages/home';
import { FeaturesSection } from './components/FeaturesSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

export default function App() {
  return (
    <div className="bg-white min-h-screen">
      <Header />
      <HeroSection />
      <GameModeSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
}