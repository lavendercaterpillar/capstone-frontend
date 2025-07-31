import React from 'react';
import { Link } from 'react-router-dom';

const ProjectsPage = () => {
  return (
    <div className="input-page">
      <header className="header">
        <div className="logo">API LOGO</div>
        <nav className="nav-buttons">
          <Link to="/">Input</Link>
        </nav>
      </header>

      <main className="main-content">
        <section className="output-panel">
          <div className="panel-inner-box">
            <h3>Saved Projects</h3>
            {/* You'll fetch and display project list here */}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProjectsPage;
