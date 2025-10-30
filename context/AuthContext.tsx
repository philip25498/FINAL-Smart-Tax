
import React, { createContext, useState, useMemo, useCallback } from 'react';
import { User, AuthContextType } from '../types';

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('smarttax_user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('smarttax_token');
  });

  const login = useCallback((data: { user: User; token: string }) => {
    localStorage.setItem('smarttax_user', JSON.stringify(data.user));
    localStorage.setItem('smarttax_token', data.token);
    setUser(data.user);
    setToken(data.token);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('smarttax_user');
    localStorage.removeItem('smarttax_token');
    setUser(null);
    setToken(null);
  }, []);
  
  const isAuthenticated = !!token;

  const value = useMemo(() => ({
    user,
    login,
    logout,
    isAuthenticated,
  }), [user, token, login, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};