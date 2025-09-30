import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from './Carousel';
import Navigation from './Navigation';
import { projects } from '../data/projects';

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Marcus Lee Studio';
  }, []);

  const handleImageClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <div className="h-screen overflow-hidden">
      <Navigation />
      <Carousel images={projects} onImageClick={handleImageClick} />
    </div>
  );
}

export default Home;
