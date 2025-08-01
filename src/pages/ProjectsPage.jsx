import React, { useState } from 'react';
import Header from '../components/Header'; // Adjust path if needed
import Projects from '../components/Projects';
import './ProjectsPage.css';
import { useNavigate } from 'react-router-dom';

const ProjectsPage = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const navigate = useNavigate();

  const mockProjects = [
    {
      id: 1,
      projectName: 'Capstone House',
      location: 'Atlanta',
      area: 120.5,
      northWallArea: 30.0,
      northWindowCount: 2,
      southWallArea: 30.0,
      southWindowCount: 1,
      eastWallArea: 25.0,
      eastWindowCount: 2,
      westWallArea: 35.5,
      westWindowCount: 3,
      coolingLoad: null,
      heatingLoad: null,
    },
    {
      id: 2,
      projectName: 'Sunny Villa',
      location: 'San Diego',
      area: 200,
      northWallArea: 40.0,
      northWindowCount: 4,
      southWallArea: 50.0,
      southWindowCount: 2,
      eastWallArea: 60.0,
      eastWindowCount: 3,
      westWallArea: 50.0,
      westWindowCount: 1,
      coolingLoad: null,
      heatingLoad: null,
    },
  ];

  const selectedProject = mockProjects.find((p) => p.id === selectedProjectId);

  const handleSelect = () => {
    if (selectedProject) {
      navigate('/', { state: { project: selectedProject } });
    }
  };

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
        <Projects
          projects={mockProjects}
          selectedProjectId={selectedProjectId}
          onSelect={setSelectedProjectId}
        />
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
        <button onClick={handleSelect} disabled={!selectedProject}>
          SELECT
        </button>
        <button onClick={() => navigate('/')}>EDIT</button>
        <button>DELETE</button>
        <button onClick={() => setShowSearch(true)}>SEARCH</button>
      </div>
    </div>
  );
};

export default ProjectsPage;
