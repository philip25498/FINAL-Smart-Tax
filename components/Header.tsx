
import React from 'react';
// FIX: Replaced `useHistory` with `useNavigate` for react-router-dom v6.
// FIX: Changed import to namespace import to resolve module resolution errors.
import * as ReactRouterDOM from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  // FIX: `useHistory` is replaced by `useNavigate` in v6.
  const navigate = ReactRouterDOM.useNavigate();

  const handleLogout = () => {
    logout();
    // FIX: `history.push` is replaced by `navigate`.
    navigate('/login');
  };

  const navLinkClassName = "transition duration-300 hover:text-green-700 text-gray-600";
  const activeClassName = "text-green-700 font-bold";
  
  // FIX: `activeClassName` is deprecated in v6. Use a function in the `className` prop to apply active styles.
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) => 
    isActive ? `${navLinkClassName} ${activeClassName}` : navLinkClassName;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <ReactRouterDOM.NavLink to="/" className="relative inline-block text-2xl font-bold text-green-800">
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Kenya.svg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            aria-hidden="true"
          ></div>
          <span className="relative">
            Smart<span className="text-black">Tax</span>
          </span>
        </ReactRouterDOM.NavLink>
        <nav className="hidden md:flex items-center space-x-6">
          {/* FIX: Updated NavLink props for v6. `exact` is replaced by `end`, and `activeClassName` is handled by the `className` function. */}
          <ReactRouterDOM.NavLink to="/" end className={getNavLinkClass}>Home</ReactRouterDOM.NavLink>
          <ReactRouterDOM.NavLink to="/about" className={getNavLinkClass}>About</ReactRouterDOM.NavLink>
          {isAuthenticated ? (
            <>
              <ReactRouterDOM.NavLink to="/dashboard" className={getNavLinkClass}>Dashboard</ReactRouterDOM.NavLink>
              <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300">
                Logout
              </button>
            </>
          ) : (
            <ReactRouterDOM.NavLink to="/login" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300">
              Login / Signup
            </ReactRouterDOM.NavLink>
          )}
        </nav>
        {/* Mobile menu could be added here */}
      </div>
    </header>
  );
};

export default Header;