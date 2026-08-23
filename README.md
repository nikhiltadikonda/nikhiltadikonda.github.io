# Nikhil Tadikonda — Personal Portfolio

[![Production](https://img.shields.io/badge/Production-nikhiltadikonda.github.io-10b981?style=flat-square&logo=safari&logoColor=white)](https://nikhiltadikonda.github.io)
[![Stage](https://img.shields.io/badge/Stage-nikhiltadikonda.github.io%2Fstage-f59e0b?style=flat-square&logo=safari&logoColor=white)](https://nikhiltadikonda.github.io/stage)
[![Dev](https://img.shields.io/badge/Dev-nikhiltadikonda.github.io%2Fdev-3b82f6?style=flat-square&logo=safari&logoColor=white)](https://nikhiltadikonda.github.io/dev)


[![Vite 8](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Material UI 9](https://img.shields.io/badge/MUI-9-007FFF?style=flat-square&logo=mui&logoColor=white)](https://mui.com/)

A modern developer portfolio designed with **React**, **Vite**, and **Material-UI**. Styled with **Liquid Glass Skeuomorphism**, **SF Mono** typography, and a **Cyber Matrix Terminal Green** ambient aesthetic.

---

## 🛠️ Tech Stack

| Category | Tools & Libraries |
| :--- | :--- |
| **Core** | React 19, TypeScript, Vite 8 |
| **UI & Styling** | Material-UI (MUI 9), Emotion, Custom Glass Design Tokens |
| **Testing** | Vitest, React Testing Library, JSDOM |
| **Icons & Media** | Material-UI Icons, Socialify Dynamic GitHub Banners |
| **Deployment** | GitHub Pages (Automated CI/CD) |

---

## 🚀 Quick Start

### Prerequisites
- Node.js `>= 23.0.0`
- npm `>= 10.0.0`

### Setup & Development

```bash
# 1. Clone repository
git clone https://github.com/nikhiltadikonda/nikhiltadikonda.github.io.git
cd nikhiltadikonda.github.io

# 2. Install dependencies
npm install

# 3. Start local development server (runs on port 3000)
npm start
```

### Build & Testing

```bash
# Run unit & integration tests
npm test

# Run TypeScript type checks
npx tsc --noEmit

# Compile production build to /dist
npm run build
```

---

## 🚢 Release Management & Deployment

The automated CI/CD pipeline via GitHub Actions ([`.github/workflows/build-deploy.yml`](.github/workflows/build-deploy.yml)) deploys builds across three tiers: **Dev**, **Stage**, and **Prod**.

---

### 1️⃣ Development Release (`dev`)

Continuous deployment for active development and feature integration.

```bash
# 1. Checkout and update main
git checkout main
git pull origin main

# 2. Push commits or merge pull requests into main
git push origin main
```

> **Automated Pipeline**: Tests and builds the project, then deploys to [`nikhiltadikonda.github.io/dev`](https://nikhiltadikonda.github.io/dev).

---

### 2️⃣ Staging Release (`stage`)

Staging environment for pre-production verification. Triggered by pushing a release branch following SemVer format (`release/vX.Y.Z`).

#### Option A: Using the Release Branch Script (Recommended)

The helper script creates the release branch, updates `VERSION` and `package.json`, and creates a local commit:

```bash
# Bump SemVer level and cut release branch
npm run release:branch -- patch   # e.g., 0.1.0 -> 0.1.1 (branch: release/v0.1.1)
npm run release:branch -- minor   # e.g., 0.1.0 -> 0.2.0 (branch: release/v0.2.0)
npm run release:branch -- major   # e.g., 0.1.0 -> 1.0.0 (branch: release/v1.0.0)
npm run release:branch -- 0.2.0   # Explicit version target

# Or run the script directly:
./create-release-branch.sh minor

# Push the release branch to remote to trigger the Stage deployment:
git push -u origin release/v0.2.0
```

#### Option B: Manual Branch Creation

```bash
# 1. Create and checkout release branch
git checkout -b release/v0.2.0

# 2. Push release branch to trigger Stage deployment
git push -u origin release/v0.2.0
```

> **Automated Pipeline**: Tests and builds the project, then deploys to [`nikhiltadikonda.github.io/stage`](https://nikhiltadikonda.github.io/stage).

---

### 3️⃣ Production Release (`prod`)

Production deployment serving the live portfolio. Triggered by pushing an annotated Git tag with SemVer format (`vX.Y.Z`).

```bash
# 1. Switch to the verified release branch or main
git checkout release/v0.2.0
git pull origin release/v0.2.0

# 2. Create an annotated Git tag
git tag -a v0.2.0 -m "Release v0.2.0"

# 3. Push tag to trigger production deployment
git push origin v0.2.0
```

> **Automated Pipeline**:
> 1. Tests and builds the bundle, then deploys to root [`nikhiltadikonda.github.io`](https://nikhiltadikonda.github.io).
> 2. Automatically triggers post-production workflow to increment patch version on `main` (`[skip ci]`).

---

## 📁 Project Structure

```
nikhiltadikonda.github.io/
├── public/                 # Static assets, web manifest, and favicons
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── common/         # GlassCard, GlassPill, ScrollToTop, SectionHeader
│   │   ├── layout/         # AmbientBackground, MatrixRain canvas
│   │   ├── ImageIcon.tsx   # Crisp vector social media icons
│   │   ├── NavBar.tsx      # Symmetrical 3-column sticky glass header dock
│   │   ├── ProjectCard.tsx # 3D skeuomorphic project card with Socialify banner
│   │   ├── QuoteCard.tsx   # Interactive collapsible quote widget
│   │   └── SkillBadge.tsx  # Monospaced technology pill badge
│   ├── context/            # ThemeContext & color mode engine
│   ├── helpers/            # Skills, contact, and metadata datasets
│   ├── hooks/              # useGitHubProjects, useQuote, useScrollPosition
│   ├── sections/           # Top-level page sections (About, Skills, Projects, Contact)
│   ├── styles/             # Global CSS and liquid glass design tokens
│   ├── tests/              # Vitest test suite & setup
│   ├── theme/              # MUI theme, design tokens, and cyber green palette
│   └── App.tsx             # Root application component
├── vite.config.mjs         # Vite 8 build & vendor chunk splitting configuration
└── package.json            # Scripts and dependencies
```

---

## 📄 License

This project is open-source and licensed under the [MIT License](LICENSE).
