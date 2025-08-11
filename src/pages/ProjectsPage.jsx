import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Projects from '../components/Projects';
import './ProjectsPage.css';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// const API_BASE_URL = 'http://localhost:8080';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  const selectedProject = projects.find((p) => p.id === selectedProjectId);

  useEffect(() => {
    fetchProjects();
  }, [location.key]);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/projects`);
      setProjects(res.data);
    } catch (err) {
      console.error('Error fetching projects:', err);
    }
  };

  const handleSearch = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/projects`, {
        params: {
          projectName: searchTerm,
        },
      });
      setProjects(res.data);
      setShowSearch(false); // close popup after search
      setSelectedProjectId(null); // clear any selection
    } catch (err) {
      console.error('Search failed:', err);
      alert('No matching projects found.');
    }
  };

  const handleSelect = () => {
    const selectedProject = projects.find((p) => p.id === selectedProjectId);
    if (selectedProject) {
      navigate('/', { state: { project: selectedProject } });
    }
  };

  const handleDelete = async () => {
    const projectToDelete = projects.find((p) => p.id === selectedProjectId);
    if (!projectToDelete) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/projects/${projectToDelete.id}`);
      // Remove from local state after delete
      setProjects(projects.filter((p) => p.id !== projectToDelete.id));
      setSelectedProjectId(null);
    } catch (err) {
      console.error('Delete failed:', err);
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
          // projects={mockProjects}
          projects={projects}
          selectedProjectId={selectedProjectId}
          onSelect={setSelectedProjectId}
        />
      </main>

      {/* Search input popup */}
      {showSearch && (
        <div className="search-popup">
          <input
            type="text"
            placeholder="Search by project name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
          <button onClick={() => setShowSearch(false)}>Cancel</button>
        </div>
      )}

      {/* Action buttons at bottom */}
      <div className="project-buttons">
        <button onClick={handleSelect} disabled={!selectedProject}>
          SELECT
        </button>

        <button onClick={handleSelect} disabled={!selectedProjectId}>
          EDIT
        </button>

        <button onClick={handleDelete} disabled={!selectedProjectId}>
          DELETE
        </button>

        <button onClick={() => setShowSearch(true)}>SEARCH</button>
      </div>
    </div>
  );
};

export default ProjectsPage;
