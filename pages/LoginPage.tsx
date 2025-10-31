
import React, { useState } from 'react';
// FIX: Changed import to namespace import to resolve module resolution errors.
import * as ReactRouterDOM from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  // FIX: `useHistory` is replaced by `useNavigate` in v6.
  const navigate = ReactRouterDOM.useNavigate();
  const location = ReactRouterDOM.useLocation();
  const from = (location.state as any)?.from?.pathname || '/dashboard';
  const successMessage = (location.state as any)?.successMessage;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('https://smarttaxbackend.cliffmutinda.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed.');
      }

      login({ user: data.user, token: data.token });
      // FIX: `history.replace` is replaced by `navigate` with the `replace` option.
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-12">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">Login to SmartTax</h2>
        {error && <p className="bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300 p-3 rounded mb-4">{error}</p>}
        {successMessage && !error && <p className="bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300 p-3 rounded mb-4">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white dark:bg-gray-700 dark:border-gray-600 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-green-500"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white dark:bg-gray-700 dark:border-gray-600 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-green-500"
              placeholder="******************"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full disabled:bg-gray-400"
              disabled={isLoading}
            >
              {isLoading ? 'Logging In...' : 'Log In'}
            </button>
          </div>
        </form>
        <p className="text-center text-gray-600 dark:text-gray-400 text-sm mt-6">
          Don't have an account?{' '}
          <ReactRouterDOM.Link to="/signup" className="font-bold text-green-600 hover:text-green-800">
            Sign up
          </ReactRouterDOM.Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
