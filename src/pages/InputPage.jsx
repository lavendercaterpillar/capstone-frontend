import { Link } from 'react-router-dom';
import { calculateLoadsFromInputs } from '../utils/calculations';
import './InputPage.css';
import Header from '../components/Header';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import capstone1 from '../assets/Capstone1.jpg';
import capstone2 from '../assets/capstone2.jpg';
import Modal from '../components/Modal';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// const API_BASE_URL = 'http://localhost:8080';

const InputPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showResults, setShowResults] = useState(false);

  const selectedProject = location.state?.project; // From useLocation()

  // Project state
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
  const [dryBulbTemp, setDryBulbTemp] = useState('');
  const [wetBulbTemp, setWetBulbTemp] = useState('');
  const [coolingLoad, setCoolingLoad] = useState(null);
  const [heatingLoad, setHeatingLoad] = useState(null);

  // Show Error state
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);

  // Error Alerts
  const showError = (msg) => {
    setErrorMessage(msg);
    setShowErrorModal(true);
  };

  const closeErrorModal = () => {
    setShowErrorModal(false);
    setErrorMessage('');
  };

  // Populate form when editing
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

      // Weather comes only from project data
      if (selectedProject.weather) {
        setDryBulbTemp(
          selectedProject.weather.dryBulbTemp?.toFixed(1) || 'N/A'
        );
        setWetBulbTemp(
          selectedProject.weather.wetBulbTemp?.toFixed(1) || 'N/A'
        );
      }
    }
  }, [selectedProject]);

  // Handle form submit (no weather fetch for new projects)
  const handleSubmit = async () => {
    // Validation: required fields
    if (!projectName.trim()) {
      showError('Please enter a project name.');
      return;
    }
    if (!city.trim()) {
      showError('Please enter a city.');
      return;
    }

    // Validation: positive numbers for walls and windows
    const fieldsToCheck = [
      // Floor area can be zero or more (optional to check here if you want)
      { label: 'Floor area', value: floorArea, checkPositive: true },
      // Walls must be > 0
      { label: 'North wall area', value: northWallArea, checkPositive: true },
      { label: 'South wall area', value: southWallArea, checkPositive: true },
      { label: 'East wall area', value: eastWallArea, checkPositive: true },
      { label: 'West wall area', value: westWallArea, checkPositive: true },
      // Windows can be zero or more
      {
        label: 'North window count',
        value: northWindowCount,
        checkPositive: false,
      },
      {
        label: 'South window count',
        value: southWindowCount,
        checkPositive: false,
      },
      {
        label: 'East window count',
        value: eastWindowCount,
        checkPositive: false,
      },
      {
        label: 'West window count',
        value: westWindowCount,
        checkPositive: false,
      },
    ];

    for (const field of fieldsToCheck) {
      const numValue = Number(field.value);
      if (isNaN(numValue)) {
        showError(`${field.label} must be a number.`);
        return;
      }
      if (field.checkPositive && numValue <= 0) {
        showError(`${field.label} must be a positive number.`);
        return;
      }
      if (!field.checkPositive && numValue < 0) {
        showError(`${field.label} cannot be negative.`);
        return;
      }
    }

    // Prepare project data for API
    const projectData = {
      projectName: projectName.trim(),
      location: city.trim(),
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
        await axios.put(
          `${API_BASE_URL}/api/projects/${selectedProject.id}`,
          projectData
        );
      } else {
        await axios.post(`${API_BASE_URL}/api/projects`, projectData);
      }

      navigate('/projects', {
        state: { refresh: true },
        replace: true,
      });
    } catch (err) {
      showError(
        'Failed to save project: ' +
          (err.response?.data?.message || err.message)
      );
    }
  };

  const handleCalculate = () => {
    // Validate essential inputs first
    try {
      // Validate essential inputs first
      if (
        !floorArea ||
        isNaN(parseFloat(floorArea)) ||
        parseFloat(floorArea) <= 0
      ) {
        showError('Floor area must be a positive number.');
        return;
      }
      if (!dryBulbTemp || isNaN(parseFloat(dryBulbTemp))) {
        showError('Dry bulb temperature must be a valid number.');
        return;
      }
      if (!wetBulbTemp || isNaN(parseFloat(wetBulbTemp))) {
        showError('Wet bulb temperature must be a valid number.');
        return;
      }

      // Validate walls and windows are positive or zero numbers
      const numericFields = [
        { label: 'North wall area', value: northWallArea },
        { label: 'North window count', value: northWindowCount },
        { label: 'South wall area', value: southWallArea },
        { label: 'South window count', value: southWindowCount },
        { label: 'East wall area', value: eastWallArea },
        { label: 'East window count', value: eastWindowCount },
        { label: 'West wall area', value: westWallArea },
        { label: 'West window count', value: westWindowCount },
      ];

      for (const field of numericFields) {
        const numValue = Number(field.value);
        if (isNaN(numValue) || numValue < 0) {
          showError(`${field.label} must be a positive number.`);
          return;
        }
      }

      // Prepare calculation inputs
      const calculationInputs = {
        floorArea: parseFloat(floorArea),
        dryBulbTemp: parseFloat(dryBulbTemp),
        wetBulbTemp: parseFloat(wetBulbTemp),
        northWallArea: parseFloat(northWallArea) || 0,
        northWindowCount: parseInt(northWindowCount) || 0,
        southWallArea: parseFloat(southWallArea) || 0,
        southWindowCount: parseInt(southWindowCount) || 0,
        eastWallArea: parseFloat(eastWallArea) || 0,
        eastWindowCount: parseInt(eastWindowCount) || 0,
        westWallArea: parseFloat(westWallArea) || 0,
        westWindowCount: parseInt(westWindowCount) || 0,
      };

      // Perform calculation
      const results = calculateLoadsFromInputs(calculationInputs);

      // Update project state while preserving all existing fields
      // Update display state
      setCoolingLoad(results.cooling);
      setHeatingLoad(results.heating);
      setShowResults(true);
    } catch (error) {
      showError('Calculation error: ' + error.message);
    }
  };

  return (
    <div className="input-page">
      {/* Error Modal Popup */}
      {showErrorModal && (
        <Modal message={errorMessage} onClose={closeErrorModal} />
      )}

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
                  placeholder="Select a project"
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
                  placeholder="Select a project"
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
                  src={capstone1}
                  alt="HVAC System Visualization"
                  className="output-image"
                />
              </div>
              <div className="image-container">
                <img
                  src={capstone2} // Use imported variable
                  alt="Thermal Performance Analysis"
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
