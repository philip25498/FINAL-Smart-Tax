
import React from 'react';
// FIX: Changed import to namespace import to resolve module resolution errors.
import * as ReactRouterDOM from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div 
      className="bg-gradient-to-br from-green-700 to-green-900 text-center min-h-[calc(100vh-200px)] flex items-center justify-center"
    >
      {/* Content */}
      <div className="py-16 md:py-24 text-white">
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