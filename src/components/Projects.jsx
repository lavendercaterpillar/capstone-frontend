import './Projects.css';

const Projects = ({ projects, selectedProjectId, onSelect }) => {
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
          {projects.map((project) => (
            <tr
              key={project.id}
              onClick={() => onSelect(project.id)}
              className={selectedProjectId === project.id ? 'selected-row' : ''}
            >
              <td>{project.projectName}</td>
              <td>{project.location}</td>
              <td>{project.area}</td>
              <td>{project.coolingLoad ?? '-'}</td>
              <td>{project.heatingLoad ?? '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Projects;
