# 🎬 CineVault

A React-based movie discovery app showcasing modern front-end practices like API integration, filtering, sorting, skeleton loading, and responsive UI — powered by The Movie Database (TMDB).

---

## ✨ Features

- 🔥 Browse trending, top-rated, and upcoming movies
- 🎯 Filter movies by ratings (6+, 7+, 8+)
- 🔃 Sort by release date, rating, or alphabetically
- 💀 Skeleton loading placeholders for smooth UX
- 📱 Fully responsive layout
- 🧠 Clean code structure using reusable components

---

## 🛠 Tech Stack

- ⚛️ React (via Vite)
- 🎨 CSS (with gradients and hover effects)
- 🗂 Component-based architecture
- 🎞️ TMDB API (The Movie Database)

---

## 🚀 Getting Started

### 1. Clone and install dependencies

```bash
git clone https://github.com/denichinv/CineVault.git
cd CineVault
npm install
```

---

### 2. Create a `.env` file in the root folder

```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

> 💡 You can get your API key from [TMDB API Docs](https://developer.themoviedb.org/)

---

### 3. Start the development server

```bash
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)

---

## 🧱 Key Project Structure

```
📁 src
├── components/
│   ├── MovieCard.jsx          # Renders a movie's details
│   ├── MovieCardSkeleton.jsx  # Skeleton loader while fetching
│   ├── MovieList.jsx          # Core logic: fetch, filter, sort
│   ├── FilterMovies.jsx       # Filter by rating
│   ├── SortMovies.jsx         # Sort dropdown
│   └── Header.jsx             # Navigation menu (category switching)
├── App.jsx                    # Root component
└── main.jsx                   # Entry point
```

---

## 📸 Screenshot

![Initial View](/screenshots/initial-view.png)

> 📷 Place your screenshot image in the `public/screenshots/` folder

---

## 🌐 Live Demo

👉 [View Deployed Site on Netlify](https://your-netlify-link.netlify.app)

---

## 📦 Credits

- Data from [The Movie Database (TMDB)](https://www.themoviedb.org/)
- Developed with ❤️ by Vilizar Denichin

---

## 📄 License

MIT © 2025 Vilizar Denichin
