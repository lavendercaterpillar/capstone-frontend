import React from 'react';
import './InputPage.css';
import { Link } from 'react-router-dom';

const InputPage = () => {
  return (
    <div className="input-page">
      {/* HEADER */}
      <header className="header">
        <div className="logo">API LOGO</div>
        <nav className="nav-buttons">
          <button>About</button>
          <Link to="/projects" className="nav-button-link">
            Projects
          </Link>
          <button>Help</button>
        </nav>
      </header>

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
                  // className="room-text-input"
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
                  // class="room-text-input"
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
                  // class="room-text-input"
                  placeholder="Enter project city"
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
                  // class="room-text-input"
                  placeholder="Enter project name"
                />

                <label htmlFor="floorArea" className="room-input-label">
                  Floor Area (m2):
                </label>
                <input
                  type="text"
                  id="floorArea"
                  name="floorArea"
                  className="room-text-input"
                  // class="room-text-input"
                  placeholder="Enter project name"
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
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className="submit-button">OK</button>
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
