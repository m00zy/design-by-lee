import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from './Carousel';
import { projects } from '../data/projects';

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Marcus Lee Studio';
    // Hide scrollbar on home page
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    
    // Cleanup: restore scrollbar when leaving home page
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, []);

  const handleImageClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <div className="min-h-screen">
      <Carousel images={projects} onImageClick={handleImageClick} />
    </div>
  );
}

export default Home;
