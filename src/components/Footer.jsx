import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div>
          <h1 className="footer-logo">CineVault</h1>
          <p className="footer-description">
            Your ultimate vault for movies. Dive into a world of cinematic
            wonders!
          </p>
        </div>
      </div>
      <div className="footer-copyright">
        &copy; 2025 CineVault. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
