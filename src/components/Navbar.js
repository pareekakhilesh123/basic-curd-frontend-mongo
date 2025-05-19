// src/components/Navbar.js
import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="navbar">
      <h3 className="logo">MyApp</h3>

      <ul className={isMobile ? "nav-links-mobile" : "nav-links"} onClick={() => setIsMobile(false)}>
        <li><a href="/">Home</a></li>
        <li><a href="/">About</a></li>
        <li 
          className="dropdown" 
          onClick={(e) => {
            e.stopPropagation();
            setIsDropdownOpen(!isDropdownOpen);
          }}
        >
          <a href="#">Services ▾</a>
          {isDropdownOpen && (
            <ul className="dropdown-menu">
              <li><a href="/">Web Development</a></li>
              <li><a href="/">App Development</a></li>
              <li><a href="/">SEO</a></li>
            </ul>
          )}
        </li>
        <li><a href="/">Contact</a></li>
      </ul>

      <button className="mobile-menu-icon" onClick={() => setIsMobile(!isMobile)}>
        {isMobile ? <span>&#10005;</span> : <span>&#9776;</span>}
      </button>
    </nav>
  );
};

export default Navbar;
