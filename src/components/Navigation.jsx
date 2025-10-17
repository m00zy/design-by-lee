import { Link } from 'react-router-dom';

const SOCIAL_LINKS = {
  instagram: {
    url: 'https://www.instagram.com/marcuslee.design?igsh=aXF2MzFxMnhvYWg5',
    label: 'Instagram'
  },
  linkedin: {
    url: 'https://www.linkedin.com/in/marcus-lee-326b99156/',
    label: 'LinkedIn'
  }
};

const SOCIAL_LINK_CLASSES = "text-gray-600 hover:text-gray-900 transition-all duration-200 p-2 relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[1px] after:bg-gray-900 after:transition-all after:duration-200 hover:after:w-[80%]";

function Navigation() {
  return (
    <nav className="flex justify-end items-center px-8 py-8 md:py-4">
      <div className="flex items-center space-x-3">
        <Link
          to="/"
          className="text-gray-600 hover:text-gray-900 transition-all duration-200 px-3 py-1.5 uppercase tracking-[0.25em] relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[1px] after:bg-gray-900 after:transition-all after:duration-200 hover:after:w-[80%]"
        >
          Home
        </Link>
        
        <div className="flex items-center space-x-6">
          <a 
            href={SOCIAL_LINKS.instagram.url}
            className={SOCIAL_LINK_CLASSES}
            aria-label={SOCIAL_LINKS.instagram.label}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>

          <a 
            href={SOCIAL_LINKS.linkedin.url}
            className={SOCIAL_LINK_CLASSES}
            aria-label={SOCIAL_LINKS.linkedin.label}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.039-1.852-3.039-1.853 0-2.136 1.445-2.136 2.939v5.669H9.35V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.369-1.85 3.602 0 4.271 2.37 4.271 5.453v6.288ZM5.337 7.433a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14Zm1.777 13.019H3.56V9h3.554v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24H22.23c.978 0 1.77-.774 1.77-1.729V1.729C24 .774 23.203 0 22.225 0Z"
              />
            </svg>
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navigation; 