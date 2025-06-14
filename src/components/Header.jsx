import React from "react";
import "./header.css";

const Header = ({ setCategory, category }) => {
  return (
    <nav className="navbar">
      <h1>CineVault</h1>
      <div className="navbar_links">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setCategory("popular");
          }}
          className={category === "popular" ? "active" : ""}
        >
          Trending Now
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setCategory("top_rated");
          }}
          className={category === "top_rated" ? "active" : ""}
        >
          Top-Rated
        </a>

        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setCategory("upcoming");
          }}
          className={category === "upcoming" ? "active" : ""}
        >
          Upcoming Releases
        </a>
      </div>
    </nav>
  );
};

export default Header;
