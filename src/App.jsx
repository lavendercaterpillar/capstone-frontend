import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InputPage from './pages/InputPage';
import ProjectsPage from './pages/ProjectsPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<InputPage />} />
      <Route path="/projects" element={<ProjectsPage />} />
    </Routes>
  );
};

export default App;
