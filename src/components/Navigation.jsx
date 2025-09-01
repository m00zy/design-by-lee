import React from 'react';

function Navigation() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 border-b border-gray-200">
      <div className="text-2xl font-light text-gray-900 tracking-wide">
        Design by Lee
      </div>
      
      <div className="flex items-center space-x-12">
        <div className="flex items-center space-x-6">
          <a 
            href="#instagram" 
            className="text-gray-600 hover:text-gray-900 transition-colors duration-200 p-2 hover:bg-gray-100 rounded-full"
            aria-label="Instagram"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.345 3.608 1.32.976.975 1.258 2.243 1.32 3.608.058 1.266.07 1.645.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.345 2.633-1.32 3.608-.975.976-2.243 1.258-3.608 1.32-1.266.058-1.645.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.345-3.608-1.32-.976-.975-1.258-2.243-1.32-3.608C2.175 15.584 2.163 15.205 2.163 12s.012-3.584.07-4.85c.062-1.366.345-2.633 1.32-3.608.975-.976 2.243-1.258 3.608-1.32C8.416 2.175 8.795 2.163 12 2.163M12 0C8.741 0 8.332.012 7.053.072 5.775.131 4.599.356 3.56 1.395 2.52 2.434 2.295 3.61 2.236 4.888 2.176 6.168 2.163 6.577 2.163 12s.013 5.832.073 7.112c.06 1.279.285 2.455 1.324 3.494 1.039 1.039 2.215 1.264 3.494 1.324 1.28.06 1.689.073 7.112.073s5.832-.013 7.112-.073c1.279-.06 2.455-.285 3.494-1.324 1.039-1.039 1.264-2.215 1.324-3.494.06-1.28.073-1.689.073-7.112s-.013-5.832-.073-7.112c-.06-1.279-.285-2.455-1.324-3.494C19.368.356 18.192.131 16.913.072 15.632.012 15.223 0 12 0Z"
              />
              <path
                d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z"
              />
              <circle cx="18.406" cy="5.594" r="1.44" />
            </svg>
          </a>

          <a 
            href="https://www.linkedin.com/in/marcus-lee-326b99156/" 
            className="text-gray-600 hover:text-gray-900 transition-colors duration-200 p-2 hover:bg-gray-100 rounded-full"
            aria-label="LinkedIn"
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