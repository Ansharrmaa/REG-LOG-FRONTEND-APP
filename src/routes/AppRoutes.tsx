import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute, PublicOnlyRoute } from '@/components/layout/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import { LoginPage } from '@/pages/Login/LoginPage';
import { RegisterPage } from '@/pages/Register/RegisterPage';
import { ForgotPasswordPage } from '@/pages/ForgotPassword/ForgotPasswordPage';
import { VerifyOtpPage } from '@/pages/VerifyOtp/VerifyOtpPage';
import { ResetPasswordPage } from '@/pages/ResetPassword/ResetPasswordPage';
import { DashboardPage } from '@/pages/Dashboard/DashboardPage';
import { ChangePasswordPage } from '@/pages/ChangePassword/ChangePasswordPage';

const RootRedirect: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) {
    return null;
  }
  return <Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />;
};

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Root */}
      <Route path="/" element={<RootRedirect />} />

      {/* Public Auth Routes */}
      <Route
        path="/login"
        element={
          <PublicOnlyRoute>
            <LoginPage />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicOnlyRoute>
            <RegisterPage />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <PublicOnlyRoute>
            <ForgotPasswordPage />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/verify-otp"
        element={
          <PublicOnlyRoute>
            <VerifyOtpPage />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/reset-password"
        element={
          <PublicOnlyRoute>
            <ResetPasswordPage />
          </PublicOnlyRoute>
        }
      />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/change-password"
        element={
          <ProtectedRoute>
            <ChangePasswordPage />
          </ProtectedRoute>
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
