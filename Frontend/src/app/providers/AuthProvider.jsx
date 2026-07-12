import React, { createContext, useState, useEffect } from 'react';
import { STORAGE_KEYS, ROLES } from '../../utils/constants';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    
    if (token && userData) {
      setUser(JSON.parse(userData));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Mock logic: Assign roles based on email keyword or default to OPERATOR
    let role = ROLES.OPERATOR;
    if (email.includes('super')) {
      role = ROLES.SUPER_ADMIN;
    } else if (email.includes('admin')) {
      role = ROLES.ADMIN;
    } else if (email.includes('viewer')) {
      role = ROLES.VIEWER;
    }

    const mockUser = {
      id: "usr-" + Math.floor(Math.random() * 1000),
      email,
      name: email.split('@')[0].toUpperCase(),
      role
    };

    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, "mock-jwt-token-xyz");
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(mockUser));
    
    setUser(mockUser);
    setIsAuthenticated(true);
    setLoading(false);
    return mockUser;
  };

  const signup = async (email, password, name = '', requestedRole = ROLES.OPERATOR) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    const mockUser = {
      id: "usr-" + Math.floor(Math.random() * 1000),
      email,
      name: name || email.split('@')[0].toUpperCase(),
      role: requestedRole
    };

    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, "mock-jwt-token-xyz");
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(mockUser));

    setUser(mockUser);
    setIsAuthenticated(true);
    setLoading(false);
    return mockUser;
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, signup, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
