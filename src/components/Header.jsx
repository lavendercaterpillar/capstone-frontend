import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import apiLogo from '../assets/ApiLogo.png';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={apiLogo} alt="API Logo" className="logo-img" />
      </div>
      <nav className="nav-buttons">
        <Link to="/" className="nav-button-link">
          Home
        </Link>
        <Link to="/projects" className="nav-button-link">
          Projects
        </Link>
        <button>About</button>
      </nav>
    </header>
  );
};

export default Header;
