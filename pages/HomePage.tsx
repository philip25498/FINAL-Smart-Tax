
import React, { useState, useEffect } from 'react';
// FIX: Changed import to namespace import to resolve module resolution errors.
import * as ReactRouterDOM from 'react-router-dom';

const images = [
  'https://images.unsplash.com/photo-1589262812352-5111961756a0?q=80&w=1920&auto=format&fit=crop', // Kenyan Flag
  'https://images.unsplash.com/photo-1597823126231-641573c21a5a?q=80&w=1920&auto=format&fit=crop', // Kenyan youth with smartphone
  'https://images.unsplash.com/photo-1621235391557-4279001362e6?q=80&w=1920&auto=format&fit=crop' // KRA Headquarters (Times Tower)
];

const HomePage: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div 
      className="relative text-center overflow-hidden min-h-[calc(100vh-200px)] flex items-center justify-center"
    >
      {/* Background Image Slideshow */}
      {images.map((src, index) => (
        <img
          key={src}
          src={src}
          alt={`Background slide ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      {/* Content */}
      <div className="relative z-10 py-16 md:py-24 text-white">
        <h1 
          className="text-4xl md:text-6xl font-extrabold leading-tight"
          style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}
        >
          Welcome to Smart<span className="text-green-400">Tax</span>
        </h1>
        <p 
          className="text-xl md:text-2xl mt-4 font-light italic"
          style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}
        >
          "Lipa Ushuru Ujitegemee"
        </p>
        <p 
          className="mt-8 max-w-2xl mx-auto text-lg text-gray-200"
          style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}
        >
          Simplifying your KRA tax obligations with the power of AI. Get instant help, file your returns, and manage your taxes all in one secure place.
        </p>
        <div className="mt-12">
          <ReactRouterDOM.Link 
            to="/signup" 
            className="bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-green-700 transition duration-300 transform hover:scale-105"
          >
            Get Started
          </ReactRouterDOM.Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;