import './Projects.css';
import { calculateLoadsFromInputs } from '../utils/calculations';

const Projects = ({ projects, selectedProjectId, onSelect }) => {
  // Calculation function

  const calculateLoads = (project) => {
    if (!project || !project.weather) return project;

    try {
      const results = calculateLoadsFromInputs({
        floorArea: project.area,
        northWallArea: project.northWallArea,
        northWindowCount: project.northWindowCount,
        southWallArea: project.southWallArea,
        southWindowCount: project.southWindowCount,
        eastWallArea: project.eastWallArea,
        eastWindowCount: project.eastWindowCount,
        westWallArea: project.westWallArea,
        westWindowCount: project.westWindowCount,
        dryBulbTemp: project.weather.dryBulbTemp,
        wetBulbTemp: project.weather.wetBulbTemp,
      });

      return {
        ...project,
        coolingLoad: results.cooling,
        heatingLoad: results.heating,
      };
    } catch {
      return project; // Return unchanged if calculation fails
    }
  };

  return (
    <div className="projects-table-container">
      <table className="projects-table">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Location</th>
            <th>Area (m²)</th>
            <th>Cooling Load (BTU/hr)</th>
            <th>Heating Load (BTU/hr)</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => {
            const projectWithLoads = calculateLoads(project);
            return (
              <tr
                key={project.id}
                onClick={() => onSelect(project.id)}
                className={
                  selectedProjectId === project.id ? 'selected-row' : ''
                }
              >
                <td>{project.projectName}</td>
                <td>{project.location}</td>
                <td>{project.area}</td>
                <td>{projectWithLoads.coolingLoad || '-'}</td>
                <td>{projectWithLoads.heatingLoad || '-'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Projects;
