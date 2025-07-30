import React from "react";
import "./InputPage.css"; // optional: styling

const InputPage = () => {
    return (
        <div className="input-page">
            {/* HEADER */}
            <header className="header">
                <div className="logo">API LOGO</div>
                <nav className="nav-buttons">
                    <button>About</button>
                    <button>Projects</button>
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
                                {/* Optional: inner content */}
                                </div>
                            </div>

                        <p className="room-title">Space/Room Input:</p>
                            <div className="room-input-container">
                                <div className="room-inner-box">
                                {/* Optional: inner content */}
                                </div>
                            </div>
                    </div>                            
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
