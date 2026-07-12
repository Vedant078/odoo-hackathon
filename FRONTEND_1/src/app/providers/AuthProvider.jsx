import React, { createContext, useState, useEffect } from 'react';
import { STORAGE_KEYS, ROLES } from '../../utils/constants';
import { loginUser, getMe } from '../../utils/api';

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
    try {
      const data = await loginUser(email, password);
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, data.access_token);
      
      const meUser = await getMe();
      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(meUser));
      
      setUser(meUser);
      setIsAuthenticated(true);
      setLoading(false);
      return meUser;
    } catch (err) {
      setLoading(false);
      throw err;
    }
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
