import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';

export default function ProjectPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const id = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);
  
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
          {/* Image */}
          <div className="aspect-[4/5] bg-gray-100 overflow-hidden">
            <img 
              src={project.src} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Project Details */}
          <div className="lg:pt-8">
            <h1 className="text-4xl font-light mb-4">{project.title}</h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {project.details.fullDescription}
            </p>

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
