
import { Routes, Route } from 'react-router-dom';
import { HeroSection, GameModeSection, Home } from '../pages/landing';
import { MonetaryMastery, QuizBee, Crossword } from '../pages/games';
import { WordHunt } from '../pages/games/WordHunt';
import { Profile } from '../pages/profile/Profile';
import { LoginPage } from '../pages/login';
import { RegisterPage } from '../pages/register';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { SmoothScroll } from './components/SmoothScroll';

function LandingPage() {
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
      <Route path="/" element={<Home />} />
      <Route path="/monetary-mastery" element={<MonetaryMastery />} />
      <Route path="/word-hunt" element={<WordHunt />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/quiz-bee" element={<QuizBee />} />
      <Route path="/crossword" element={<Crossword />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

