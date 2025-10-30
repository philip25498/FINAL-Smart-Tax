
import React from 'react';
// FIX: Replaced `Redirect` with `Navigate` for react-router-dom v6.
// FIX: Changed import to namespace import to resolve module resolution errors.
import * as ReactRouterDOM from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = ReactRouterDOM.useLocation();

  if (!isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to. This allows us to send them along to that page after they login.
    // FIX: `Redirect` is replaced by `Navigate` in v6. The `state` is passed as a prop and `replace` is used to mimic redirect behavior.
    return <ReactRouterDOM.Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;