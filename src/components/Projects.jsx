import React from 'react';
import './Projects.css'; // Create a CSS file for styling table if needed

const Projects = () => {
  const mockProjects = [
    {
      id: 1,
      projectName: 'Capstone House',
      location: 'Atlanta',
      area: 120.5,
      coolingLoad: null,
      heatingLoad: null,
    },
    {
      id: 2,
      projectName: 'Sunny Villa',
      location: 'San Diego',
      area: 200,
      coolingLoad: null,
      heatingLoad: null,
    },
  ];

  return (
    <div className="projects-table-container">
      <table className="projects-table">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Location</th>
            <th>Area (m²)</th>
            <th>Cooling Load</th>
            <th>Heating Load</th>
          </tr>
        </thead>
        <tbody>
          {mockProjects.map((project) => (
            <tr key={project.id}>
              <td>{project.projectName}</td>
              <td>{project.location}</td>
              <td>{project.area}</td>
              <td>
                {project.coolingLoad !== null ? project.coolingLoad : '-'}
              </td>
              <td>
                {project.heatingLoad !== null ? project.heatingLoad : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Projects;
