import Carousel from './Carousel3';
import Navigation from './Navigation';
import { useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';

export default function Home() {
  const navigate = useNavigate();

  const handleImageClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <div className="h-screen overflow-hidden">
      <Navigation />
      <div>
        <Carousel images={projects} onImageClick={handleImageClick} />
      </div>
    </div>
  );
}
