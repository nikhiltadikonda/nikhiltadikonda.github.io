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
