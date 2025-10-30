
import React from 'react';
// FIX: Updated react-router-dom imports for v6. `Switch` is replaced by `Routes`, and `Redirect` by `Navigate`.
// FIX: Changed import to namespace import to resolve module resolution errors.
import * as ReactRouterDOM from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';

const AppContent: React.FC = () => {
  const location = ReactRouterDOM.useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className={`flex flex-col min-h-screen text-gray-800 ${!isHomePage ? 'bg-gray-50' : ''}`}>
      <Header />
      <main className={`flex-grow ${!isHomePage ? 'container mx-auto px-4 py-8' : ''}`}>
        {/* FIX: Replaced `Switch` with `Routes` and updated `Route` syntax for react-router-dom v6. */}
        <ReactRouterDOM.Routes>
          <ReactRouterDOM.Route path="/" element={<HomePage />} />
          <ReactRouterDOM.Route path="/about" element={<AboutPage />} />
          <ReactRouterDOM.Route path="/login" element={<LoginPage />} />
          <ReactRouterDOM.Route path="/signup" element={<SignupPage />} />
          <ReactRouterDOM.Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          {/* FIX: Replaced `Redirect` with a catch-all route using `Navigate` for v6. */}
          <ReactRouterDOM.Route path="*" element={<ReactRouterDOM.Navigate to="/" />} />
        </ReactRouterDOM.Routes>
      </main>
      <Footer />
    </div>
  );
};


const App: React.FC = () => {
  return (
    <AuthProvider>
      <ReactRouterDOM.HashRouter>
        <AppContent />
      </ReactRouterDOM.HashRouter>
    </AuthProvider>
  );
};

export default App;