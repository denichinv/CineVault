# 🎬 CineVault

![E2E Tests](https://github.com/denichinv/CineVault/actions/workflows/playwright.yml/badge.svg)
![Unit Tests](https://github.com/denichinv/CineVault/actions/workflows/test.yml/badge.svg)
![Coverage](https://img.shields.io/badge/coverage-95.52%25-brightgreen)

A modern movie discovery application built with **React** and the **TMDB API**.  
Browse popular, top-rated, and upcoming movies with filtering and sorting options.

🌐 **Live Demo:** https://cinevaultmoviesapp.netlify.app/

---

## 📝 Project Overview

CineVault is a refactored and production-ready rebuild of an earlier movie app.  
The focus of this version is **clean structure, realistic testing, and CI integration**.

The original repository (with full development history) is available here:  
👉 https://github.com/denichinv/movie-review

This rebuild resolves deployment issues, improves maintainability, and introduces a complete testing setup built incrementally over several weeks.

---

## ✨ Features

- Browse movies by category (Popular, Top-Rated, Upcoming)
- Filter movies by rating (6+, 7+, 8+)
- Sort movies by date, rating, or alphabetically
- Responsive layout
- Fast build and dev experience with Vite

---

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite

### Testing
- Vitest
- React Testing Library (95.52% coverage)
- Playwright (end-to-end testing)

### CI / Deployment
- GitHub Actions
- Netlify

### API
- TMDB

---

## 🚀 Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/denichinv/CineVault.git
cd CineVault
npm install
```

Create a `.env` file and add your TMDB API key:

```bash
VITE_TMDB_API_KEY=your_api_key_here
```

Run the app locally:

```bash
npm run dev
```

---

## 🧪 Testing

### Unit & Integration Tests
```bash
npm test
npm test -- --coverage
```

### End-to-End Tests
```bash
npx playwright test
```

### Continuous Integration
All tests run automatically via **GitHub Actions** on every push and pull request.

---

## 📌 Testing Approach

- Focus on **user-visible behaviour**, not implementation details
- Avoids over-testing API-driven views
- End-to-end tests cover key flows:
  - Home page load
  - Rating filter interaction
  - Sorting (order and type)

---

Made with ⚡ by **Vilizar**  
https://github.com/denichinv
