import { useNavigate } from 'react-router-dom';
import Carousel from './Carousel';
import Navigation from './Navigation';
import { projects } from '../data/projects';

function Home() {
  const navigate = useNavigate();

  const handleImageClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <Carousel images={projects} onImageClick={handleImageClick} />
    </div>
  );
}

export default Home;
