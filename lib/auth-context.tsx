'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  profileImage?: string | null;
  bio?: string | null;
  role: string;
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

  // 获取当前用户信息
  // Fetch current user information
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // 检查本地存储的token
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
          // 如果token无效，清除它
          // Clear token if invalid
          localStorage.removeItem('authToken');
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
        localStorage.removeItem('authToken');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);
  // 修改login函数
  const login = async (email: string, password: string): Promise<User> => {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
    
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Failed to log in');
      }
    
      const userData = await response.json();
      
      // 保存token到localStorage以便前端使用
      if (userData.token) {
        localStorage.setItem('authToken', userData.token);
      }
      
      setUser(userData);
      return userData;
    };
  
  const register = async (
    name: string,
    email: string,
    password: string,
    role: string = 'JOBSEEKER'
  ): Promise<User> => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, role }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Failed to register');
    }

    const userData = await response.json();
    return userData;
  };
  // 统一的 logout 函数，同时处理 cookie 和 localStorage
  const logout = async (): Promise<void> => {
    // 调用登出API以清除cookie
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('登出API调用失败:', error);
    }
    
    // 同时清除localStorage中的token
    localStorage.removeItem('authToken');
    
    setUser(null);
  };
  // 统一的 refreshUser 函数，优先使用 cookie，回退到 localStorage
  const refreshUser = async (): Promise<void> => {
    try {
      // 先尝试使用cookie认证
      const response = await fetch('/api/auth/me', {
        credentials: 'include', // 确保发送cookies
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        // 如果cookie认证失败，尝试使用localStorage中的token
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
      console.error('刷新用户信息失败:', error);
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