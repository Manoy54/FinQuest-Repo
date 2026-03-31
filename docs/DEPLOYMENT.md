# Deployment Guide

> FinQuest — Production Deployment on Vercel

## 1. Overview

FinQuest is deployed as a **static SPA** on **Vercel**, with SPA routing handled via `vercel.json` rewrites. This guide covers the complete deployment pipeline.

---

## 2. Architecture

```
GitHub Repository
     │
     │  git push / PR merge
     ▼
Vercel (Auto-Deploy)
     │
     │  npm install + npm run build
     ▼
Vite Build Output (my-app/dist/)
     │
     │  CDN Distribution
     ▼
Users (Browser)
```

---

## 3. Prerequisites

| Requirement | Details |
|-------------|---------|
| **GitHub Account** | Repository host |
| **Vercel Account** | Free tier is sufficient |
| **Node.js** | ≥ 18.0 (Vercel runtime) |
| **npm** | ≥ 9.0 |

---

## 4. Vercel Configuration

### `vercel.json`

```json
{
    "buildCommand": "cd my-app && npm install && npm run build",
    "outputDirectory": "my-app/dist",
    "framework": "vite",
    "rewrites": [
        {
            "source": "/(.*)",
            "destination": "/index.html"
        }
    ]
}
```

**Key settings:**
- `buildCommand`: Installs dependencies and runs the Vite production build
- `outputDirectory`: Points to the Vite build output folder
- `framework`: Tells Vercel to use Vite-optimized settings
- `rewrites`: Catch-all rule for SPA client-side routing (sends all paths to `index.html`)

---

## 5. Deployment Steps

### 5.1 First-Time Setup

1. **Push to GitHub:**
   ```bash
   git init
   git remote add origin https://github.com/Manoy54/FinQuest-Repo.git
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects `vercel.json` configuration
   - Click "Deploy"

3. **Configure environment variables** (if using Supabase):
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiI...
   ```

### 5.2 Automatic Deployments

After initial setup, every push to `main` triggers an automatic deployment:

```
git push origin main → Vercel webhook → Build → Deploy → Live
```

### 5.3 Preview Deployments

Pull requests automatically get preview deployments:

```
git push origin feature-branch → PR created → Preview URL generated
```

---

## 6. Build Process

### Local Build Verification

```bash
cd my-app

# Install dependencies
npm install

# Type check
npx tsc --noEmit

# Lint
npm run lint

# Production build
npm run build

# Preview production build locally
npm run preview
```

### Build Output

```
my-app/dist/
├── index.html              # Entry point
├── assets/
│   ├── index-[hash].js     # Main bundle (code-split)
│   ├── index-[hash].css    # Compiled Tailwind CSS
│   └── [chunk]-[hash].js   # Lazy-loaded route chunks
└── vite.svg                # Static assets
```

### Expected Build Metrics

| Metric | Target | Actual |
|--------|--------|--------|
| Build Time | < 30s | ~15s |
| Bundle Size (gzip) | < 500KB | ~350KB |
| CSS Size (gzip) | < 50KB | ~25KB |
| Lighthouse Performance | > 90 | ~95 |

---

## 7. Environment Variables

### Client-Side Variables (Vite)

Variables prefixed with `VITE_` are embedded in the client bundle at build time:

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_SUPABASE_URL` | When backend enabled | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | When backend enabled | Supabase anonymous key |
| `VITE_APP_ENV` | Optional | 'development' / 'production' |

### Setting in Vercel Dashboard

1. Go to Project → Settings → Environment Variables
2. Add each variable with appropriate scope (Production / Preview / Development)
3. **Never** add `SUPABASE_SERVICE_ROLE_KEY` as a client-side variable

---

## 8. Domain Configuration

### Custom Domain Setup

1. Go to Vercel Project → Settings → Domains
2. Add your custom domain (e.g., `finquest.app`)
3. Update DNS records:
   ```
   Type: CNAME
   Name: @
   Value: cname.vercel-dns.com
   ```
4. SSL certificate is auto-provisioned by Vercel

### Recommended Domain Structure

| URL | Purpose |
|-----|---------|
| `finquest.app` | Production |
| `staging.finquest.app` | Staging/Preview |
| `finquest-repo.vercel.app` | Default Vercel domain |

---

## 9. Performance Optimization

### Vercel Edge Network

Vercel automatically distributes your static assets across its global CDN. No additional configuration needed.

### Cache Headers

Vite's content-hashed filenames enable aggressive caching:

```
assets/*.[hash].js  → Cache-Control: public, max-age=31536000, immutable
assets/*.[hash].css → Cache-Control: public, max-age=31536000, immutable
index.html          → Cache-Control: no-cache (always fresh)
```

### Image Optimization

For future image assets, enable Vercel's built-in image optimization:

```json
// vercel.json (optional)
{
    "images": {
        "domains": ["your-supabase-project.supabase.co"],
        "sizes": [640, 750, 828, 1080, 1200]
    }
}
```

---

## 10. Monitoring & Rollback

### Vercel Dashboard

- **Deployments tab**: View all deployments with status
- **Analytics tab**: Web Vitals (LCP, FID, CLS)
- **Logs tab**: Function invocation logs
- **Speed Insights**: Real-time performance monitoring

### Instant Rollback

If a deployment introduces bugs:

1. Go to Vercel Dashboard → Deployments
2. Find the last working deployment
3. Click "..." → "Promote to Production"
4. The previous version is live instantly (no rebuild)

---

## 11. CI/CD Pipeline (Optional)

### GitHub Actions Integration

```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: my-app/package-lock.json

      - name: Install dependencies
        run: cd my-app && npm ci

      - name: Type check
        run: cd my-app && npx tsc --noEmit

      - name: Lint
        run: cd my-app && npm run lint

      - name: Build
        run: cd my-app && npm run build

      # Vercel auto-deploys from GitHub, so no deploy step needed.
      # This workflow validates the build before Vercel picks it up.
```

---

## 12. Troubleshooting

| Issue | Solution |
|-------|----------|
| **404 on refresh** | Ensure `vercel.json` has the catch-all rewrite rule |
| **Build fails on Vercel** | Check Node.js version matches local; run `npm run build` locally first |
| **Env vars not available** | Ensure they're prefixed with `VITE_` and set in Vercel dashboard |
| **Stale cache after deploy** | Vercel auto-invalidates; clear browser cache if testing |
| **Large bundle size** | Run `npx vite-bundle-visualizer` to identify heavy dependencies |

---

*Last updated: March 2026*
