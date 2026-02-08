import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { authApi } from '../../services/api';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (email: string, password: string, name: string, role: 'customer' | 'vendor') => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check localStorage for saved user and token
    const savedUser = localStorage.getItem('kalavpp_user');
    const token = localStorage.getItem('kalavpp_token');

    if (savedUser && token) {
      // Set initial state from local storage for speed
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse user from local storage", e);
      }

      // Verify with backend and get fresh data
      authApi.getProfile()
        .then(user => {
          setUser(user);
          localStorage.setItem('kalavpp_user', JSON.stringify(user));
        })
        .catch(() => {
          // Token invalid or expired
          logout();
        });
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { user, token } = await authApi.login(email, password);
      setUser(user);
      localStorage.setItem('kalavpp_user', JSON.stringify(user));
      localStorage.setItem('kalavpp_token', token);
    } catch (error: any) {
      console.error("Login failed", error);
      throw new Error(error.response?.data?.message || 'Invalid credentials');
    }
  };

  const loginWithGoogle = async () => {
    // Simulate Google OAuth
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock Google login - create a customer account
    const googleUser: User = {
      id: 'google_' + Date.now(),
      email: 'user@gmail.com',
      name: 'Google User',
      role: 'customer',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GoogleUser',
      createdAt: new Date().toISOString(),
    };

    setUser(googleUser);
    localStorage.setItem('kalavpp_user', JSON.stringify(googleUser));
    // Note: No token for mock google login yet
  };

  const register = async (email: string, password: string, name: string, role: 'customer' | 'vendor') => {
    try {
      const { user, token } = await authApi.register(name, email, password, role);
      setUser(user);
      localStorage.setItem('kalavpp_user', JSON.stringify(user));
      localStorage.setItem('kalavpp_token', token);
    } catch (error: any) {
      console.error("Registration failed", error);
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      const updatedUser = await authApi.updateProfile(data);
      setUser(updatedUser);
      localStorage.setItem('kalavpp_user', JSON.stringify(updatedUser));
    } catch (error: any) {
      console.error("Profile update failed", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('kalavpp_user');
    localStorage.removeItem('kalavpp_token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        loginWithGoogle,
        register,
        logout,
        updateProfile,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
