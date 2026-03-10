import { Routes, Route, Navigate } from 'react-router-dom';
import { Home, LandingPage } from '../pages/landing';
import { MonetaryMastery, QuizBee, Crossword } from '../pages/games';
import { WordHunt } from '../pages/games/WordHunt';
import { Profile } from '../pages/profile/Profile';
import { LoginPage } from '../pages/login';
import { RegisterPage } from '../pages/register';
import { AvatarSetupPage } from '../pages/avatar-setup';
import { useAuth } from '../context/AuthContext';

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
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
    </Routes>
  );
}
