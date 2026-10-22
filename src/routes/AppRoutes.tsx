import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicOnlyRoute } from '@/components/layout/ProtectedRoute';
import { LoginPage } from '@/pages/Login/LoginPage';
import { RegisterPage } from '@/pages/Register/RegisterPage';
import { ForgotPasswordPage } from '@/pages/ForgotPassword/ForgotPasswordPage';
import { VerifyOtpPage } from '@/pages/VerifyOtp/VerifyOtpPage';
import { ResetPasswordPage } from '@/pages/ResetPassword/ResetPasswordPage';
import { HomePage } from '@/pages/Home/HomePage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Home Page — Luxury E-Commerce Storefront */}
      <Route path="/" element={<HomePage />} />

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

      {/* Protected routes redirect to Home Page */}
      <Route path="/dashboard" element={<Navigate to="/" replace />} />
      <Route path="/change-password" element={<Navigate to="/" replace />} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
