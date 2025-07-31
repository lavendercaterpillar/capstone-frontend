import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Optional styling

const Header = () => {
  return (
    <header className="header">
      <div className="logo">API LOGO</div>
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
