import { Routes, Route } from 'react-router-dom';
import { Home, LandingPage } from '../pages/landing';
import { MonetaryMastery, QuizBee, Crossword } from '../pages/games';
import { WordHunt } from '../pages/games/WordHunt';
import { Profile } from '../pages/profile/Profile';
import { LoginPage } from '../pages/login';
import { RegisterPage } from '../pages/register';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/monetary-mastery" element={<MonetaryMastery />} />
      <Route path="/word-hunt" element={<WordHunt />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/quiz-bee" element={<QuizBee />} />
      <Route path="/crossword" element={<Crossword />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}
