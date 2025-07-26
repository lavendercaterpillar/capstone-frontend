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
                    <h2>Enter Project Details</h2>
                    {/* Form fields will go here */}
                </section>

                {/* RIGHT: Output Display */}
                <section className="output-panel">
                    <h2>Results</h2>
                    {/* Output display will go here */}
                </section>
            </main>
        </div>
    );
};

export default InputPage;
