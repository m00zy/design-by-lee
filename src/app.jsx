import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ProjectPage from './components/ProjectPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/project/:projectId" element={<ProjectPage />} />
    </Routes>
  );
}
