import { Link } from 'react-router-dom';
import './InputPage.css';
import Header from '../components/Header'; // Adjust path if needed
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

// const API_BASE_URL = 'http://localhost:8080';
const API_BASE_URL = 'https://hvac-system-api.onrender.com';

const InputPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedProject = location.state?.project; // From useLocation()

  const [projectName, setProjectName] = useState('');
  const [city, setCity] = useState('');
  const [floorArea, setFloorArea] = useState('');
  const [northWallArea, setNorthWallArea] = useState('');
  const [northWindowCount, setNorthWindowCount] = useState('');
  const [southWallArea, setSouthWallArea] = useState('');
  const [southWindowCount, setSouthWindowCount] = useState('');
  const [eastWallArea, setEastWallArea] = useState('');
  const [eastWindowCount, setEastWindowCount] = useState('');
  const [westWallArea, setWestWallArea] = useState('');
  const [westWindowCount, setWestWindowCount] = useState('');

  // Pre-populate form if editing
  useEffect(() => {
    if (selectedProject) {
      setProjectName(selectedProject.projectName || '');
      setCity(selectedProject.location || '');
      setFloorArea(selectedProject.area || '');
      setNorthWallArea(selectedProject.northWallArea || '');
      setNorthWindowCount(selectedProject.northWindowCount || '');
      setSouthWallArea(selectedProject.southWallArea || '');
      setSouthWindowCount(selectedProject.southWindowCount || '');
      setEastWallArea(selectedProject.eastWallArea || '');
      setEastWindowCount(selectedProject.eastWindowCount || '');
      setWestWallArea(selectedProject.westWallArea || '');
      setWestWindowCount(selectedProject.westWindowCount || '');
    }
  }, [selectedProject]);

  const handleSubmit = async () => {
    const projectData = {
      projectName,
      location: city,
      area: parseFloat(floorArea),
      northWallArea: parseFloat(northWallArea),
      northWindowCount: parseInt(northWindowCount),
      southWallArea: parseFloat(southWallArea),
      southWindowCount: parseInt(southWindowCount),
      eastWallArea: parseFloat(eastWallArea),
      eastWindowCount: parseInt(eastWindowCount),
      westWallArea: parseFloat(westWallArea),
      westWindowCount: parseInt(westWindowCount),
      coolingLoad: null,
      heatingLoad: null,
    };

    try {
      if (selectedProject?.id) {
        // Update existing project
        await axios.put(`${API_BASE_URL}/api/projects/${selectedProject.id}`, {
          id: selectedProject.id,
          ...projectData,
        });
        console.log('Updated project:', projectData);
      } else {
        // Create new project
        await axios.post(`${API_BASE_URL}/api/projects`, projectData);
        console.log('Created new project:', projectData);
      }

      // Navigate back to ProjectsPage and trigger refresh
      navigate('/projects', { state: { refresh: true } });
    } catch (err) {
      console.error('Submit failed:', err);
    }
  };

  return (
    <div className="input-page">
      <Header />

      {/* MAIN CONTENT */}
      <main className="main-content">
        {/* LEFT: Input Form */}
        <section className="input-panel">
          <div className="panel-inner-box">
            <p className="location-title">Project Location Input:</p>
            <div className="location-input-container">
              <div className="location-inner-box">
                <label htmlFor="country" className="room-input-label">
                  Country:
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  className="room-text-input"
                  placeholder="Enter project country"
                />

                <label htmlFor="state" className="room-input-label">
                  State:
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  className="room-text-input"
                  placeholder="Enter project state"
                />

                <label htmlFor="city" className="room-input-label">
                  City:
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="room-text-input"
                  placeholder="Enter project city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>

            <p className="room-title">Space/Room Input:</p>
            <div className="room-input-container">
              <div className="room-inner-box">
                <label htmlFor="projectName" className="room-input-label">
                  Project name:
                </label>
                <input
                  type="text"
                  id="projectName"
                  name="projectName"
                  className="room-text-input"
                  placeholder="Enter project name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />

                <label htmlFor="floorArea" className="room-input-label">
                  Floor Area (m2):
                </label>
                <input
                  type="text"
                  id="floorArea"
                  name="floorArea"
                  className="room-text-input"
                  placeholder="Enter project name"
                  value={floorArea}
                  onChange={(e) => setFloorArea(e.target.value)}
                />

                <label className="wall-section-title">North wall:</label>
                <div className="wall-row">
                  <div className="wall-input-pair">
                    <label htmlFor="northWallArea" className="wall-input-label">
                      Area (m²):
                    </label>
                    <input
                      type="number"
                      id="northWallArea"
                      name="northWallArea"
                      className="wall-text-input"
                      placeholder="e.g. 12"
                      value={northWallArea}
                      onChange={(e) => setNorthWallArea(e.target.value)}
                    />
                  </div>

                  <div className="wall-input-pair">
                    <label
                      htmlFor="northWindowCount"
                      className="wall-input-label"
                    >
                      Number of windows:
                    </label>
                    <input
                      type="number"
                      id="northWindowCount"
                      name="northWindowCount"
                      className="wall-text-input"
                      placeholder="e.g. 2"
                      value={northWindowCount}
                      onChange={(e) => setNorthWindowCount(e.target.value)}
                    />
                  </div>
                </div>

                <label className="wall-section-title">South wall:</label>
                <div className="wall-row">
                  <div className="wall-input-pair">
                    <label htmlFor="southWallArea" className="wall-input-label">
                      Area (m²):
                    </label>
                    <input
                      type="number"
                      id="southWallArea"
                      name="southWallArea"
                      className="wall-text-input"
                      placeholder="e.g. 10"
                      value={southWallArea}
                      onChange={(e) => setSouthWallArea(e.target.value)}
                    />
                  </div>

                  <div className="wall-input-pair">
                    <label
                      htmlFor="southWindowCount"
                      className="wall-input-label"
                    >
                      Number of windows:
                    </label>
                    <input
                      type="number"
                      id="southWindowCount"
                      name="southWindowCount"
                      className="wall-text-input"
                      placeholder="e.g. 1"
                      value={southWindowCount}
                      onChange={(e) => setSouthWindowCount(e.target.value)}
                    />
                  </div>
                </div>

                <label className="wall-section-title">East wall:</label>
                <div className="wall-row">
                  <div className="wall-input-pair">
                    <label htmlFor="eastWallArea" className="wall-input-label">
                      Area (m²):
                    </label>
                    <input
                      type="number"
                      id="eastWallArea"
                      name="eastWallArea"
                      className="wall-text-input"
                      placeholder="e.g. 11"
                      value={eastWallArea}
                      onChange={(e) => setEastWallArea(e.target.value)}
                    />
                  </div>

                  <div className="wall-input-pair">
                    <label
                      htmlFor="eastWindowCount"
                      className="wall-input-label"
                    >
                      Number of windows:
                    </label>
                    <input
                      type="number"
                      id="eastWindowCount"
                      name="eastWindowCount"
                      className="wall-text-input"
                      placeholder="e.g. 3"
                      value={eastWindowCount}
                      onChange={(e) => setEastWindowCount(e.target.value)}
                    />
                  </div>
                </div>

                <label className="wall-section-title">West wall:</label>
                <div className="wall-row">
                  <div className="wall-input-pair">
                    <label htmlFor="westWallArea" className="wall-input-label">
                      Area (m²):
                    </label>
                    <input
                      type="number"
                      id="westWallArea"
                      name="westWallArea"
                      className="wall-text-input"
                      placeholder="e.g. 9"
                      value={westWallArea}
                      onChange={(e) => setWestWallArea(e.target.value)}
                    />
                  </div>

                  <div className="wall-input-pair">
                    <label
                      htmlFor="westWindowCount"
                      className="wall-input-label"
                    >
                      Number of windows:
                    </label>
                    <input
                      type="number"
                      id="westWindowCount"
                      name="westWindowCount"
                      className="wall-text-input"
                      placeholder="e.g. 0"
                      value={westWindowCount}
                      onChange={(e) => setWestWindowCount(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className="submit-button" onClick={handleSubmit}>
            OK
          </button>{' '}
        </section>

        {/* RIGHT: Output Display */}
        <section className="output-panel">
          <div className="panel-inner-box">
            <h3>Results</h3>
            {/* Output display will go here */}
          </div>
        </section>
      </main>
    </div>
  );
};

export default InputPage;
