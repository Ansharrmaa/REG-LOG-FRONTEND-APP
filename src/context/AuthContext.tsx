import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { User, LoginRequest } from '@/types/auth';
import { authService } from '@/services/authService';
import { apiClient } from '@/services/apiClient';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginRequest) => Promise<User>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  // Password recovery flow state (in-memory only, never persisted to disk)
  recoveryIdentifier: string | null;
  resetToken: string | null;
  setRecoveryIdentifier: (identifier: string | null) => void;
  setResetToken: (token: string | null) => void;
  clearRecoveryState: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // In-memory recovery state
  const [recoveryIdentifier, setRecoveryIdentifier] = useState<string | null>(null);
  const [resetToken, setResetToken] = useState<string | null>(null);

  const clearRecoveryState = useCallback(() => {
    setRecoveryIdentifier(null);
    setResetToken(null);
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      try {
        // Initialize CSRF token
        await apiClient.getCsrfToken();
        // Check current session
        const currentUser = await authService.getCurrentUser();
        if (isMounted) {
          setUser(currentUser);
        }
      } catch {
        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    initializeAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (credentials: LoginRequest): Promise<User> => {
    const authenticatedUser = await authService.login(credentials);
    setUser(authenticatedUser);
    return authenticatedUser;
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.warn('Backend logout call failed or was already revoked:', err);
    } finally {
      setUser(null);
      clearRecoveryState();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        refreshUser,
        recoveryIdentifier,
        resetToken,
        setRecoveryIdentifier,
        setResetToken,
        clearRecoveryState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
