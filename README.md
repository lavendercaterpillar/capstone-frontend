# HVAC Design Application – API & Full Stack Setup

## Overview

The **HVAC Design Application** helps mechanical and civil engineers estimate single-zone space heating and cooling loads for residential projects.

In construction projects, mechanical system design—particularly HVAC load calculation and equipment sizing—is a critical part of the design documentation. These calculations are essential for:

- Securing permits from municipal or county authorities.
- Guiding building design, construction, and procurement.

This application simplifies the process by allowing users to input basic project data, integrate location-specific climate information, and generate an HVAC load report with recommended equipment sizing.

---

## Project Description

Users provide:

- **Project Details** – name, location, and specifications.
- **Building Specs** – area (sq. ft.), wall/window details, insulation, and design conditions.

The backend API:

- Stores and retrieves projects from a PostgreSQL database.
- Integrates with the [OpenWeatherMap API](https://openweathermap.org/) to pull climate data.
- Calculates estimated heating and cooling loads.
- Returns a detailed project report.

The frontend React application:

- Provides a user-friendly interface for entering inputs.
- Displays reports, lists projects, and allows project updates.

---

## Assumptions

- **Target Audience**: Engineers and technicians in the HVAC field.
- **Minimum Knowledge**: Basic understanding of HVAC system design principles.
- **Limitations**: This is **not** a replacement for professional multi-zone HVAC software and does not provide advanced psychrometric or CFD analysis.

---

## Feature Set

1. **Create a New HVAC Project**
   - Provide a unique project name.
   - Save the project to the database.
2. **Enter Residential Space Specifications**
   - Inputs include:
     - Total square footage
     - Number of windows
     - Wall areas and orientations
3. **Enter Project Location**
   - Select or type the city for the project.
4. **Calculate HVAC Load Estimates**
   - Uses building data + climate data from OpenWeatherMap.
5. **View Detailed Project Report**
6. **View and Retrieve Saved Projects**
   - List all projects.
   - View reports or edit project details.

---

## Dependencies

- **Backend**
  - Java 21
  - Spring Boot 3.5.x
  - PostgreSQL
  - Hibernate/JPA
  - Lombok
  - Maven
- **Frontend**
  - Node.js 18+
  - React (with Vite)
  - Axios
  - Bootstrap (for styling)
- **External API**
  - [OpenWeatherMap API](https://openweathermap.org/) (requires API key)

---

## Setup & Installation

### 1. Backend Setup (Spring Boot + MySQL)

#### Clone the backend repository

```bash
https://github.com/lavendercaterpillar/capstone_backend.git
```

#### Navigate to Backend

```bash
cd capstone_backend
```

#### Install Dependencies

```bash
mvn clean install
```

#### Environment Variables

Create a `.env` file or update `application.properties` with:

```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/hvac_db
spring.datasource.username=YOUR_DB_USERNAME
spring.datasource.password=YOUR_DB_PASSWORD

# JPA & Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# OpenWeatherMap API Key
openweathermap.api.key=YOUR_API_KEY
```

#### Database Setup

Ensure PostgreSQL is running locally or accessible remotely.
Create a database:

```sql
CREATE DATABASE hvac_db;
```

#### Run the Backend

```bash
mvn spring-boot:run
```

Backend will start at:
`http://localhost:8080`

---

### 2. Frontend Setup (React + Vite)

#### Clone the Frontend Repository

```bash
git clone https://github.com/lavendercaterpillar/capstone-frontend.git
```

#### Navigate to Frontend

```bash
cd capstone-frontend
```

#### Install Dependencies

```bash
npm install
```

#### Environment Variables

Create `.env` file in `frontend`:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

#### Run the Frontend

```bash
npm run dev
```

Frontend will start at:
`http://localhost:5173`

---

### 4. Connecting Frontend & Backend

- Ensure backend is running at `localhost:8080`.
- The frontend `.env` variable `VITE_API_BASE_URL` should match backend API base path.
- Example API endpoints:
  - `POST /api/projects` – Create new project
  - `GET /api/projects` – List all projects
  - `GET /api/projects/{id}` – Retrieve single project
  - `PUT /api/projects/{id}` – Update project
  - `DELETE /api/projects/{id}` – Delete project

---

## Example Workflow

1. Launch backend (`mvn spring-boot:run`).
2. Launch frontend (`npm run dev`).
3. Open `http://localhost:5173` in browser.
4. Create a project with location & building specs.
5. Click "Calculate" to view estimated heating/cooling loads.
6. Save project for future retrieval.

---

## License

This project is licensed under the MIT License – see the LICENSE file for details.
