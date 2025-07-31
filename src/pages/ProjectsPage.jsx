import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header'; // Adjust path if needed

const ProjectsPage = () => {
  return (
    <div className="input-page">
      <Header />

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
