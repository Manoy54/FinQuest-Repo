<p align="center">
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-7.2-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-4.1-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" />
</p>

# 🎮 FinQuest — Gamified Financial Literacy Platform

> **Learn Finance. Play Games. Level Up.**

FinQuest is an interactive, game-based web learning platform designed to make financial literacy accessible, engaging, and fun for Filipino students. Through gamification mechanics like XP progression, daily streaks, achievement badges, and competitive leaderboards, FinQuest transforms traditional financial education into an immersive experience.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Documentation](#documentation)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

FinQuest bridges the gap between traditional financial instruction and the learning preferences of digitally oriented students. The platform offers multiple interactive game modes that teach budgeting, investing, taxation, banking, and economic concepts through engaging gameplay.

### Target Users
- **Students** — Learn financial literacy through interactive games
- **Educators** — Monitor student progress, create quizzes, host quiz bees
- **Institutions** — Integrate FinQuest into financial literacy curricula

---

## Features

### 🕹️ Game Modes (7 Total)
| Game | Type | Description |
|------|------|-------------|
| **Capital Cup** | Timed Quiz | Multi-tier quiz with lives system and score multipliers |
| **Monetary Mastery** | Flashcards | Financial concept flashcard challenges |
| **Data Diver** | Word Hunt | Find hidden financial terms in a letter grid |
| **Corporate Climb** | Crossword | Solve crossword puzzles with financial terminology |
| **Speed Round** | Rapid Fire | Answer as many questions in 60 seconds |
| **Match Up** | Matching | Match financial terms with definitions |
| **Spot the Difference** | Document Audit | Compare financial documents for discrepancies |

### 📈 Progression System
- **6 Rank Tiers**: Apprentice → Analyst → Strategist → Investor → Capital Tycoon → FinQuest Grandmaster
- **XP & Coins**: Dual-currency reward system
- **21 Achievement Badges**: Across 5 categories (Gameplay, Streaks, Trivia, Social, Mastery)
- **Performance Dashboard**: Progress rings showing completion percentages

### 📅 Daily Engagement
- **Daily Financial Trivia**: 5 localized PH economic questions daily
- **Streak Tracker**: Daily check-in with milestone rewards (3-day, 7-day, 14-day, 30-day)

### 🏆 Social & Competitive
- **Leaderboards**: XP and Coins rankings with weekly rewards for top 3
- **Profile Customization**: Full avatar editor with 9 customization categories

### 📚 Content Hub
- **Library (Vault of Knowledge)**: Modules, notes, presentations, video lectures
- **Educator Hub**: Quiz builder, analytics dashboard, class management (Coming Soon)

### 💳 Subscription Plans
- **Student Hub Basic** (Free) / **Student Hub Prime** (₱149/mo)
- **Educator Hub Basic** (Free) / **Educator Hub Prime** (₱799/mo)

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Runtime** | React | 19.2 |
| **Language** | TypeScript | 5.9 |
| **Build Tool** | Vite | 7.2 |
| **Styling** | Tailwind CSS | 4.1 |
| **Routing** | React Router DOM | 7.13 |
| **State** | React Context API | — |
| **Animations** | GSAP, Motion, React Spring | Latest |
| **Avatar** | react-nice-avatar | 1.5 |
| **Icons** | react-icons | 5.5 |
| **Scroll** | Lenis | 1.3 |
| **Fonts** | @fontsource/nunito, @fontsource/literata | 5.x |
| **Deployment** | Vercel | — |
| **Backend (Planned)** | Supabase | 2.99 |

---

## Getting Started

### Prerequisites
- **Node.js** ≥ 18.0
- **npm** ≥ 9.0

### Installation

```bash
# Clone the repository
git clone https://github.com/Manoy54/FinQuest-Repo.git
cd FinQuest-Repo/my-app

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview
```

---

## Project Structure

```
FinQuest-Repo/
├── my-app/                          # Main application
│   ├── src/
│   │   ├── app/                     # App shell
│   │   │   ├── App.tsx              # Router + Route Guards
│   │   │   └── components/          # Shared UI components
│   │   │       ├── Header.tsx       # Navigation configuration
│   │   │       ├── Nav.tsx          # GSAP-animated card nav
│   │   │       ├── HUD.tsx          # In-game heads-up display
│   │   │       ├── ParallaxDemo.tsx # Parallax game carousel
│   │   │       ├── GameButton.tsx   # Game link button
│   │   │       ├── Footer.tsx       # Landing page footer
│   │   │       ├── ShinyText.tsx    # Animated text effect
│   │   │       └── SmoothScroll.tsx # Lenis scroll wrapper
│   │   ├── context/                 # React Context providers
│   │   │   ├── AuthContext.tsx      # Auth + Level + Rank
│   │   │   └── UserContext.tsx      # XP + Coins
│   │   ├── pages/                   # Route pages
│   │   │   ├── landing/             # Public landing page
│   │   │   ├── login/               # Login page
│   │   │   ├── register/            # Registration page
│   │   │   ├── avatar-setup/        # First-time avatar setup
│   │   │   ├── home/                # Dashboard (Streak + Trivia + Games)
│   │   │   ├── games/               # 7 game modes
│   │   │   ├── profile/             # Profile + Performance Dashboard
│   │   │   ├── leaderboards/        # XP & Coins rankings
│   │   │   ├── pricing/             # Subscription plans
│   │   │   ├── educator-hub/        # Educator tools (static)
│   │   │   └── library/             # Vault of Knowledge (static)
│   │   ├── utils/                   # Utility modules
│   │   │   ├── levelSystem.ts       # Rank tiers + level mapping
│   │   │   ├── streakSystem.ts      # Daily check-in logic
│   │   │   ├── triviaData.ts        # Trivia questions + seeding
│   │   │   └── achievementSystem.ts # 21 badges + persistence
│   │   ├── styles/                  # Global CSS
│   │   │   └── index.css            # Tailwind + custom animations
│   │   └── main.tsx                 # Application entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── docs/                            # Project documentation
│   ├── ARCHITECTURE.md              # System architecture overview
│   ├── FRONTEND.md                  # Frontend architecture
│   ├── BACKEND.md                   # Backend architecture (planned)
│   ├── DATABASE.md                  # Database schema design
│   ├── API.md                       # API specification
│   ├── DEPLOYMENT.md                # Deployment guide
│   └── CONTRIBUTING.md              # Contribution guidelines
├── vercel.json                      # Vercel deployment config
└── README.md                        # This file
```

---

## Documentation

Detailed architecture documentation is available in the [`/docs`](./docs/) directory:

| Document | Description |
|----------|-------------|
| [Architecture Overview](./docs/ARCHITECTURE.md) | System design, tech decisions, data flow |
| [Frontend Architecture](./docs/FRONTEND.md) | Components, state management, routing, styling |
| [Backend Architecture](./docs/BACKEND.md) | Planned API layer, auth, services |
| [Database Schema](./docs/DATABASE.md) | Entity relationships, table designs |
| [API Specification](./docs/API.md) | RESTful endpoints, request/response formats |
| [Deployment Guide](./docs/DEPLOYMENT.md) | Vercel deployment, environment setup |
| [Contributing Guide](./docs/CONTRIBUTING.md) | Code standards, workflow, PR process |

---

## Deployment

FinQuest is deployed on **Vercel**. See the full [Deployment Guide](./docs/DEPLOYMENT.md) for details.

```bash
# Production build
cd my-app && npm run build

# The output is in my-app/dist/
# Vercel handles SPA routing via vercel.json rewrites
```

---

## Contributing

We welcome contributions! Please read our [Contributing Guide](./docs/CONTRIBUTING.md) before submitting a pull request.

---

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.

---

<p align="center">
  <b>FinQuest</b> — Making Financial Literacy Fun 🚀
</p>