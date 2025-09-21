import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';

// Component to render text with links
function TextWithLinks({ text, links = [] }) {
  const renderTextWithLinks = (text) => {
    if (!links.length) return text;
    
    let result = text;
    links.forEach((link) => {
      const linkElement = (
        <a 
          key={link.text}
          href={link.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer border-b border-gray-300 hover:border-gray-600"
        >
          {link.text}
        </a>
      );
      
      // Split text by the link text and insert the link element
      const parts = result.split(link.text);
      result = parts.reduce((acc, part, index) => {
        if (index === 0) return [part];
        return [...acc, linkElement, part];
      }, []);
    });
    
    return result;
  };

  return (
    <div className="text-lg text-gray-600 mb-8 leading-relaxed">
      {text.split('\n').map((paragraph, index) => (
        paragraph.trim() && (
          <p key={index} className="mb-4 last:mb-0">
            {renderTextWithLinks(paragraph)}
          </p>
        )
      ))}
    </div>
  );
}

function ProjectPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Scroll to top when component mounts or projectId changes
    window.scrollTo(0, 0);
    
    const id = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(id);
  }, [projectId]);
  
  const project = projects.find(p => p.id === projectId);
  
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light mb-4">Project not found</h1>
          <button 
            onClick={() => navigate('/')}
            className="text-blue-600 hover:underline"
          >
            Return home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-white transition-opacity duration-1000 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Portfolio
          </button>
        </div>
      </div>

      {/* Project Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Image Gallery */}
          <div className="space-y-4">
            {project.images.map((image, index) => (
              <div key={index} className="bg-gray-100 overflow-hidden">
                <img 
                  src={image} 
                  alt={`${project.title} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Project Details */}
          <div className="lg:pt-8">
            <h1 className="text-3xl font-normal mb-4">{project.title}</h1>
            <TextWithLinks 
              text={project.details.fullDescription} 
              links={project.details.links}
            />

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-2">
                  Material
                </h3>
                <p className="text-gray-700">{project.details.materials}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide mb-2">
                  Year
                </h3>
                <p className="text-gray-700">{project.details.year}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectPage;
