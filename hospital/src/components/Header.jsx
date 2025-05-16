// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src="HMS_logo.png" alt="Global Hospitals Logo" />
          {/* <span>GLOBAL HOSPITALS</span> */}
        </Link>
      </div>
      <nav className="nav-links">
        <Link to="/">HOME</Link>
        <Link to="/about">ABOUT US</Link>
        <Link to="/contact">CONTACT</Link>
      </nav>
    </header>
  );
};

export default Header;
