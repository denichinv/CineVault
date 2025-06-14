import Header from "./components/Header";
import Footer from "./components/Footer";
import MovieList from "./components/MovieList";
import "./App.css";
import React, { useState } from "react";

function App() {
  const [category, setCategory] = useState("popular");

  return (
    <>
      <Header setCategory={setCategory} category={category} />
      <MovieList category={category} />
      <Footer />
    </>
  );
}

export default App;
