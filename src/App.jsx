import Header from "./components/Header";
import Footer from "./components/Footer";
import MovieList from "./components/MovieList";
import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [category, setCategory] = useState("popular");
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const nextQuery = query.trim();

    if (nextQuery === searchQuery) return;

    if (!nextQuery) {
      setSearchQuery("");
      return;
    }

    const timeoutId = setTimeout(() => {
      setSearchQuery(nextQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, searchQuery]);
  const handleCategoryChange = (nextCategory) => {
    setCategory(nextCategory);
    setQuery("");
    setSearchQuery("");
  };

  return (
    <>
      <Header setCategory={handleCategoryChange} category={category} />
      <main className="main-content">
        <MovieList
          category={category}
          query={query}
          setQuery={setQuery}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </main>
      <Footer />
    </>
  );
}

export default App;
