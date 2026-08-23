# Nikhil Tadikonda — Personal Portfolio

[![Website](https://img.shields.io/badge/Live%20Site-nikhiltadikonda.github.io-10b981?style=flat-square&logo=safari&logoColor=white)](https://nikhiltadikonda.github.io)


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

## 🌿 Release Management & CI/CD Deployment

The repository uses automated multi-environment GitHub Actions routing:

| Environment | Trigger | Target URL |
| :--- | :--- | :--- |
| **Development** | Push to `main` / `master` | [`nikhiltadikonda.github.io/dev`](https://nikhiltadikonda.github.io/dev/) |
| **Staging** | Push to `release/v*.*.*` | [`nikhiltadikonda.github.io/stage`](https://nikhiltadikonda.github.io/stage/) |
| **Production** | Push SemVer tag `v*.*.*` | [`nikhiltadikonda.github.io`](https://nikhiltadikonda.github.io/) |

### 🚀 Creating a Release Branch Locally

Use the helper script to create a local release branch (without pushing to remote):

```bash
# 1. Using current version from VERSION file:
./create-release-branch.sh

# 2. Incrementing automatically (patch / minor / major):
./create-release-branch.sh patch
./create-release-branch.sh minor
./create-release-branch.sh major

# 3. Specifying an explicit version:
./create-release-branch.sh 0.2.0
# or
./create-release-branch.sh v0.2.0

# 4. Via npm shortcut:
npm run release:branch
```

> **Note**: The script creates and checks out `release/vX.Y.Z`, updates `VERSION` and `package.json`, and creates a local commit. When you are ready to deploy to staging, run `git push -u origin release/vX.Y.Z`.


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
