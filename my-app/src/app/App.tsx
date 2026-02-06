
import { Routes, Route } from 'react-router-dom';
import { HeroSection, GameModeSection } from '../pages/home';
import { MonetaryMastery } from '../pages/games/MonetaryMastery';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { SmoothScroll } from './components/SmoothScroll';

function HomePage() {
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

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MonetaryMastery />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
}

