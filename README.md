# 🎬 CineVault

![Tests](https://github.com/YOUR_USERNAME/cinevault/actions/workflows/test.yml/badge.svg)
![Coverage](https://img.shields.io/badge/coverage-95.52%25-brightgreen)

A modern movie discovery app built with React and the TMDB API. Browse trending, top-rated, and upcoming movies with filtering and sorting.

**🌐 [Live Demo](https://your-netlify-url.netlify.app)**

---

## 📝 Project Note

This is a refactored version with improved structure and comprehensive testing. The [original repository]([link](https://github.com/denichinv/movie-review)) contains full development history. This rebuild fixed deployment issues and added a test suite (95%+ coverage) built over 3-4 weeks while learning React Testing Library.

---

## ✨ Features

- Browse movies by category (Popular, Top-Rated, Upcoming)
- Filter by rating (6+, 7+, 8+)
- Sort by date, rating, or alphabetically
- Responsive design
- Fast performance with Vite

---

## 🛠️ Tech Stack

**Frontend:** React 18, Vite  
**Testing:** Vitest, React Testing Library (95.52% coverage)  
**API:** TMDB  
**CI/CD:** GitHub Actions  
**Deployment:** Netlify

---

## 🚀 Quick Start
```bash
# Clone and install
git clone https://github.com/YOUR_USERNAME/cinevault.git
cd cinevault
npm install

# Add your TMDB API key to .env
echo "VITE_TMDB_API_KEY=your_key" > .env

# Run
npm run dev
```

---

## 🧪 Testing
```bash
npm test                # Run tests
npm test -- --coverage  # With coverage report
```

**Coverage: 95.52%** across all components. Tests run automatically via GitHub Actions on every push.

---

Made with ⚡ by [Vilizar](https://github.com/YOUR_USERNAME)
