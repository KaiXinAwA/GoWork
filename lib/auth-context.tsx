'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  userid: number;
  username: string;
  email: string;
  profileImage?: string | null;
  bio?: string | null;
  role: string;
  token?: string;
  resume?: string | null;
  education?: string | null;
  language?: string | null;
}

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (username: string, email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch current user information
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          console.log('No token found in localStorage');
          setLoading(false);
          return;
        }

        console.log('Fetching user data with token');
        const response = await fetch('/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const userData = await response.json();
          console.log("Fetched user data:", userData);
          setUser(userData);
        } else {
          console.log('Token verification failed, clearing token');
          localStorage.removeItem('authToken');
          setUser(null);
        }
      } catch (error) {
        console.error('Failed to fetch user information:', error);
        localStorage.removeItem('authToken');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<User> => {
    try {
      console.log("Attempting to login:", email);
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      console.log("Login response status:", response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Login failed, please check your network connection' }));
        throw new Error(errorData.message || 'Login failed, please check your email and password');
      }
      
      const userData = await response.json();
      console.log("Login successful, user data:", userData);
      
      // Save token to localStorage
      if (userData.token) {
        localStorage.setItem('authToken', userData.token);
        console.log('Token saved to localStorage');
      } else {
        console.warn('Warning: No token in server response');
      }
      
      // Update user state with user data
      setUser(userData);
      setLoading(false);
      
      return userData;
    } catch (error) {
      console.error("Login error:", error);
      setUser(null);
      setLoading(false);
      throw error;
    }
  };

  // Register function
  const register = async (
    username: string,
    email: string,
    password: string,
  ): Promise<User> => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Registration failed' }));
        throw new Error(errorData.message || 'Registration failed, please try again later');
      }

      const userData = await response.json();
      return userData.user;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
    
    // Clear token from localStorage
    localStorage.removeItem('authToken');
    
    setUser(null);
  };

  // Refresh user data
  const refreshUser = async (): Promise<void> => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setUser(null);
        return;
      }

      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        localStorage.removeItem('authToken');
        setUser(null);
      }
    } catch (error) {
      console.error('Failed to refresh user information:', error);
      localStorage.removeItem('authToken');
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}