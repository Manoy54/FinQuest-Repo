
import { HeroSection, GameModeSection } from '../pages/home';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { SmoothScroll } from './components/SmoothScroll';

export default function App() {
  return (
    <SmoothScroll>
      <div className="bg-white min-h-screen">
        <Header />
        <HeroSection />
        <GameModeSection />
        <Footer />
      </div>
    </SmoothScroll>
  );
}