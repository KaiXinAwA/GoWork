'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  profileImage?: string | null;
  bio?: string | null;
  role: string;
  token?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (name: string, email: string, password: string, role?: string) => Promise<User>;
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
        // Check token in local storage
        const token = localStorage.getItem('authToken');
        
        if (!token) {
          setLoading(false);
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
          // Clear token if invalid
          localStorage.removeItem('authToken');
        }
      } catch (error) {
        console.error('Failed to fetch user information:', error);
        localStorage.removeItem('authToken');
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
        credentials: 'include',
      });
      
      console.log("Login response status:", response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Login failed, please check your network connection' }));
        throw new Error(errorData.message || 'Login failed, please check your email and password');
      }
      
      const userData = await response.json();
      console.log("Login successful, user role:", userData.role);
      
      // Save token to localStorage
      if (userData.token) {
        localStorage.setItem('authToken', userData.token);
        console.log('Token saved to localStorage');
      } else {
        console.warn('Warning: No token in server response');
      }
      
      // Update user state
      setUser(userData);
      
      return userData;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  // Register function
  const register = async (
    name: string,
    email: string,
    password: string,
    role: string = 'JOBSEEKER'
  ): Promise<User> => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, role }),
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
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Error during logout:', error);
    }
    
    // Also clear token from localStorage
    localStorage.removeItem('authToken');
    
    setUser(null);
  };

  // Unified refreshUser function, prefers cookies, falls back to localStorage
  const refreshUser = async (): Promise<void> => {
    try {
      // First try with cookie authentication
      const response = await fetch('/api/auth/me', {
        credentials: 'include', // Ensure cookies are sent
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        // If cookie auth fails, try with token from localStorage
        const token = localStorage.getItem('authToken');
        if (!token) {
          setUser(null);
          return;
        }
  
        const tokenResponse = await fetch('/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (tokenResponse.ok) {
          const userData = await tokenResponse.json();
          setUser(userData);
        } else {
          localStorage.removeItem('authToken');
          setUser(null);
        }
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