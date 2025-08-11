import { Link } from 'react-router-dom';
import { calculateLoadsFromInputs } from '../utils/calculations';
import './InputPage.css';
import Header from '../components/Header';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// const API_BASE_URL = 'http://localhost:8080';

const InputPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedProject = location.state?.project; // From useLocation()

  const [currentProject, setCurrentProject] = useState(
    location.state?.project || {
      projectName: '',
      location: '',
      area: '',
      northWallArea: '',
      northWindowCount: '',
      southWallArea: '',
      southWindowCount: '',
      eastWallArea: '',
      eastWindowCount: '',
      westWallArea: '',
      westWindowCount: '',
      weather: {
        dryBulbTemp: '',
        wetBulbTemp: '',
      },
    }
  );

  // State variables
  const [projectName, setProjectName] = useState(currentProject.projectName);
  const [city, setCity] = useState(currentProject.city);
  const [floorArea, setFloorArea] = useState(currentProject.floorArea);
  const [northWallArea, setNorthWallArea] = useState(
    currentProject.northWallArea
  );
  const [northWindowCount, setNorthWindowCount] = useState(
    currentProject.northWindowCount
  );
  const [southWallArea, setSouthWallArea] = useState(
    currentProject.southWallArea
  );
  const [southWindowCount, setSouthWindowCount] = useState(
    currentProject.southWindowCount
  );
  const [eastWallArea, setEastWallArea] = useState(currentProject.eastWallArea);
  const [eastWindowCount, setEastWindowCount] = useState(
    currentProject.eastWindowCount
  );
  const [westWallArea, setWestWallArea] = useState(currentProject.westWallArea);
  const [westWindowCount, setWestWindowCount] = useState(
    currentProject.westWindowCount
  );
  const [dryBulbTemp, setDryBulbTemp] = useState(currentProject.dryBulbTemp);
  const [wetBulbTemp, setWetBulbTemp] = useState(currentProject.wetBulbTemp);
  const [showResults, setShowResults] = useState(false);
  const [coolingLoad, setCoolingLoad] = useState(null);
  const [heatingLoad, setHeatingLoad] = useState(null);

  // Fetch weather data when project is selected or city changes
  useEffect(() => {
    const fetchWeatherData = async () => {
      if (selectedProject?.weather) {
        // If we have a selected project with weather data
        setDryBulbTemp(
          selectedProject.weather.dryBulbTemp?.toFixed(1) || 'N/A'
        );
        setWetBulbTemp(
          selectedProject.weather.wetBulbTemp?.toFixed(1) || 'N/A'
        );
      } else if (city) {
        // If city changes but no project is selected (for new projects)
        try {
          const response = await axios.get(
            `${API_BASE_URL}/api/weather/location/${encodeURIComponent(city)}`
          );
          if (response.data) {
            setDryBulbTemp(response.data.dryBulbTemp?.toFixed(1) || 'N/A');
            setWetBulbTemp(response.data.wetBulbTemp?.toFixed(1) || 'N/A');
          }
        } catch (error) {
          console.error('Error fetching weather data:', error);
          setDryBulbTemp('N/A');
          setWetBulbTemp('N/A');
        }
      } else {
        // Reset if no city/project
        setDryBulbTemp('');
        setWetBulbTemp('');
      }
    };

    fetchWeatherData();
  }, [selectedProject, city]);

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

  // Handle Submit
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

  const handleCalculate = () => {
    try {
      // Validate essential inputs first
      if (!currentProject.area || isNaN(parseFloat(currentProject.area))) {
        throw new Error('Floor area must be a valid number');
      }
      if (!dryBulbTemp || isNaN(parseFloat(dryBulbTemp))) {
        throw new Error('Dry bulb temperature must be a valid number');
      }
      if (!wetBulbTemp || isNaN(parseFloat(wetBulbTemp))) {
        throw new Error('Wet bulb temperature must be a valid number');
      }

      // Prepare calculation inputs
      const calculationInputs = {
        floorArea: currentProject.area,
        dryBulbTemp,
        wetBulbTemp,
        northWallArea: currentProject.northWallArea || 0,
        northWindowCount: currentProject.northWindowCount || 0,
        southWallArea: currentProject.southWallArea || 0,
        southWindowCount: currentProject.southWindowCount || 0,
        eastWallArea: currentProject.eastWallArea || 0,
        eastWindowCount: currentProject.eastWindowCount || 0,
        westWallArea: currentProject.westWallArea || 0,
        westWindowCount: currentProject.westWindowCount || 0,
      };

      console.log('Calculation inputs:', calculationInputs);

      // Perform calculation
      const results = calculateLoadsFromInputs(calculationInputs);
      console.log('Calculation results:', results);

      // Update project state while preserving all existing fields
      setCurrentProject((prev) => ({
        ...prev, // Keep all existing project data
        coolingLoad: results.cooling,
        heatingLoad: results.heating,
        weather: {
          ...prev.weather, // Keep other weather data if exists
          dryBulbTemp: parseFloat(dryBulbTemp),
          wetBulbTemp: parseFloat(wetBulbTemp),
          // Add calculated values if needed
          coolingLoad: results.cooling,
          heatingLoad: results.heating,
        },
      }));

      // Update display state
      setCoolingLoad(results.cooling);
      setHeatingLoad(results.heating);
      setShowResults(true);
    } catch (error) {
      console.error('Calculation error:', {
        error: error.message,
        projectData: currentProject,
        temperatures: { dryBulbTemp, wetBulbTemp },
      });
      alert(
        `Calculation Error: ${error.message}\n\nPlease check:\n- Floor area is a valid number\n- Temperatures are provided\n- Wall areas are numbers`
      );
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
                <label htmlFor="Drybulb" className="room-input-label">
                  Dry Bulb Temperature (°F):
                </label>
                <input
                  type="text"
                  id="Drybulb"
                  name="Drybulb"
                  className="room-text-input"
                  placeholder="Select a project or enter city"
                  value={dryBulbTemp}
                  readOnly
                />

                <label htmlFor="Wetbulb" className="room-input-label">
                  Wet Bulb Temperature (°F):
                </label>
                <input
                  type="text"
                  id="Wetbulb"
                  name="Wetbulb"
                  className="room-text-input"
                  placeholder="Select a project or enter city"
                  value={wetBulbTemp}
                  readOnly
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
                  Floor Area (m²):
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

        {/* RIGHT: Output Display - Revised Layout */}
        <section className="output-panel">
          {/* UPPER SECTION: Image Display */}
          <div className="image-display-section">
            <div className="image-row">
              <div className="image-container">
                <img
                  src="/assets/Capstone.webp"
                  alt="Visualization 1"
                  className="output-image"
                />
              </div>
              <div className="image-container">
                <img
                  src="/asserts/buildings-13-02675-g006-550.jpg"
                  alt="Visualization 2"
                  className="output-image"
                />
              </div>
            </div>
          </div>

          {/* LOWER SECTION: Text Report */}
          <div className="results-section">
            <h3>Analysis Results</h3>
            {showResults ? (
              <div className="report-content">
                <div className="result-row highlight">
                  <span className="result-label">Cooling Load:</span>
                  <span className="result-value">
                    {coolingLoad
                      ? `${coolingLoad.toLocaleString()} BTU/hr`
                      : 'N/A'}
                  </span>
                </div>
                <div className="result-row highlight">
                  <span className="result-label">Heating Load:</span>
                  <span className="result-value">
                    {heatingLoad
                      ? `${heatingLoad.toLocaleString()} BTU/hr`
                      : 'N/A'}
                  </span>
                </div>
              </div>
            ) : (
              <div className="report-placeholder">
                <p>Enter project details and click Calculate</p>
              </div>
            )}
            <div className="calculate-button-container">
              <button
                className="calculate-button"
                onClick={handleCalculate}
                disabled={!floorArea || !dryBulbTemp || !wetBulbTemp}
              >
                Calculate Loads
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default InputPage;
