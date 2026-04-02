import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './features/homepage/components/Home';
import { LandingPage } from './features/landing/components/LandingPage';
import { MonetaryMastery } from './features/game-modes/components/MonetaryMastery';
import { QuizBee } from './features/game-modes/components/QuizBee';
import { Crossword } from './features/game-modes/components/Crossword';
import { SpeedRound } from './features/game-modes/components/SpeedRound';
import { MatchingGame } from './features/game-modes/components/MatchingGame';
import { SpotDifference } from './features/game-modes/components/SpotDifference';
import { WordHunt } from './features/game-modes/components/WordHunt';
import { Profile } from './features/profile/components/Profile';
import { LoginPage } from './features/auth/components/LoginPage';
import { RegisterPage } from './features/auth/components/RegisterPage';
import { AvatarSetupPage } from './features/auth/components/AvatarSetupPage';
import { LeaderboardPage } from './features/leaderboards/components/LeaderboardPage';
import { PricingPage } from './features/pricing/components/PricingPage';
import { EducatorHubPage } from './features/educator-hub/components/EducatorHubPage';
import { LibraryPage } from './features/library/components/LibraryPage';
import { useAuth } from './context/AuthContext';

// ─── Route Guards ────────────────────────────────────────────────────────────

/** Requires login + completed avatar setup to render children */
function ProtectedRoute({ children }: { children: React.ReactElement }) {
  const { isAuthenticated, hasCompletedAvatarSetup } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!hasCompletedAvatarSetup) return <Navigate to="/avatar-setup" replace />;

  return children;
}

/** Only accessible when logged in BUT avatar setup is NOT yet complete */
function AvatarSetupGuard({ children }: { children: React.ReactElement }) {
  const { isAuthenticated, hasCompletedAvatarSetup } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (hasCompletedAvatarSetup) return <Navigate to="/home" replace />;

  return children;
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* First-time avatar setup (requires auth, blocks if already done) */}
      <Route
        path="/avatar-setup"
        element={
          <AvatarSetupGuard>
            <AvatarSetupPage />
          </AvatarSetupGuard>
        }
      />

      {/* Protected (requires auth + avatar setup complete) */}
      <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/monetary-mastery" element={<ProtectedRoute><MonetaryMastery /></ProtectedRoute>} />
      <Route path="/word-hunt" element={<ProtectedRoute><WordHunt /></ProtectedRoute>} />
      <Route path="/quiz-bee" element={<ProtectedRoute><QuizBee /></ProtectedRoute>} />
      <Route path="/crossword" element={<ProtectedRoute><Crossword /></ProtectedRoute>} />
      <Route path="/speed-round" element={<ProtectedRoute><SpeedRound /></ProtectedRoute>} />
      <Route path="/matching-game" element={<ProtectedRoute><MatchingGame /></ProtectedRoute>} />
      <Route path="/spot-difference" element={<ProtectedRoute><SpotDifference /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/leaderboards" element={<ProtectedRoute><LeaderboardPage /></ProtectedRoute>} />
      <Route path="/educator-hub" element={<ProtectedRoute><EducatorHubPage /></ProtectedRoute>} />
      <Route path="/library" element={<ProtectedRoute><LibraryPage /></ProtectedRoute>} />

      {/* Public */}
      <Route path="/pricing" element={<PricingPage />} />
    </Routes>
  );
}
