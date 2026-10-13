import Header from "./components/Header";
import Footer from "./components/Footer";
import MovieList from "./components/MovieList";
import "./App.css";
import React, { useState } from "react";

function App() {
  const [category, setCategory] = useState("popular");
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

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
