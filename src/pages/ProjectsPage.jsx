import React, { useState } from 'react';
import Header from '../components/Header'; // Adjust path if needed
import Projects from '../components/Projects';
import './ProjectsPage.css';
import { useNavigate } from 'react-router-dom';

const ProjectsPage = () => {
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="projects-page">
      {/* Global shared header */}
      <Header />

      {/* Page-specific header */}
      <div className="projects-subheader">
        <div className="logo">API LOGO</div>
        <div className="title">Application Title</div>
        <div className="logo ada-logo">ADA LOGO</div>
      </div>

      <main className="projects-content">
        <Projects />
      </main>

      {/* Search input popup */}
      {showSearch && (
        <div className="search-popup">
          <input type="text" placeholder="Search by project name..." />
          <button onClick={() => setShowSearch(false)}>Close</button>
        </div>
      )}

      {/* Action buttons at bottom */}
      <div className="project-buttons">
        <button>SELECT</button>
        <button onClick={() => navigate('/')}>EDIT</button>
        <button>DELETE</button>
        <button onClick={() => setShowSearch(true)}>SEARCH</button>
      </div>
    </div>
  );
};

export default ProjectsPage;
