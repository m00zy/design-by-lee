import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from './Carousel';
import { projects } from '../data/projects';

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Marcus Lee Studio';
    
    // Only hide scrollbar on desktop (where everything fits on one screen)
    const checkAndSetOverflow = () => {
      const isMobile = window.innerWidth < 768;
      if (!isMobile) {
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
      } else {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
      }
    };
    
    checkAndSetOverflow();
    window.addEventListener('resize', checkAndSetOverflow);
    
    // Cleanup: restore scrollbar when leaving home page
    return () => {
      window.removeEventListener('resize', checkAndSetOverflow);
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
