import React from "react";
import "./header.css";

const Header = () => {
  return (
    <nav className="navbar">
      <h1>CineVault</h1>
      <div className="navbar_links">
        <a href="">Trending Now</a>
        <a href="">Top-Rated</a>
        <a href="">Upcoming Releses</a>
      </div>
    </nav>
  );
};

export default Header;
